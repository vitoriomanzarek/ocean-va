/**
 * Script maestro para corregir todos los problemas identificados
 * Basado en la comparación con Drue como referencia
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Función para remover duplicados de Education
function removeDuplicateEducation(educationHTML) {
  if (!educationHTML || !educationHTML.includes('va-education-item')) {
    return educationHTML;
  }
  
  // Extraer todos los items
  const itemRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  const items = [];
  let match;
  
  while ((match = itemRegex.exec(educationHTML)) !== null) {
    const itemHtml = match[0];
    const schoolMatch = itemHtml.match(/<h3[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h3>/i);
    const degreeMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-degree[^"]*"[^>]*>([^<]+)<\/p>/i);
    
    const school = schoolMatch ? schoolMatch[1].trim().toLowerCase() : '';
    const degree = degreeMatch ? degreeMatch[1].trim().toLowerCase() : '';
    const key = `${school}-${degree}`;
    
    // Solo agregar si no existe
    if (key && !items.find(i => i.key === key)) {
      items.push({ key, html: itemHtml });
    }
  }
  
  // Reconstruir HTML sin duplicados
  return items.map(i => i.html).join('');
}

// Función para verificar y corregir Employment History
function fixEmploymentHistory(employmentHTML) {
  if (!employmentHTML || !employmentHTML.includes('va-employment-accordion')) {
    return employmentHTML;
  }
  
  // Verificar si hay descripciones vacías
  const emptyDescRegex = /<p class="va-employment-accordion-description"><\/p>/g;
  if (emptyDescRegex.test(employmentHTML)) {
    console.log('      ⚠️  Encontradas descripciones vacías en Employment History');
    // Por ahora solo reportamos, no corregimos automáticamente
    // porque necesitaríamos la data original
  }
  
  // Verificar si falta company
  const hasCompany = employmentHTML.includes('va-employment-accordion-company');
  if (!hasCompany) {
    console.log('      ⚠️  Falta campo company en Employment History');
  }
  
  return employmentHTML;
}

// Función para extraer English Score de página web
async function extractEnglishScoreFromWeb(slug) {
  const url = `https://www.oceanvirtualassistant.com/${slug}-ocean-va-profile`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    const englishScoreMatch = html.match(/<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>([^<]+)<\/div>/i);
    
    if (englishScoreMatch) {
      return englishScoreMatch[1].trim();
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Función para extraer Video Thumbnail de video URL
function getThumbnailFromVideo(videoUrl) {
  if (!videoUrl) return null;
  
  const youtubeIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (youtubeIdMatch) {
    return `https://img.youtube.com/vi/${youtubeIdMatch[1]}/maxresdefault.jpg`;
  }
  
  return null;
}

async function main() {
  console.log('🔧 Corrigiendo problemas identificados...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener todos los VAs
  let allVAs = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const response = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
    if (!response.items || response.items.length === 0) break;
    allVAs = allVAs.concat(response.items);
    if (response.items.length < limit) break;
    offset += limit;
  }
  
  console.log(`✅ Total VAs en CMS: ${allVAs.length}\n`);
  console.log('═'.repeat(80));
  console.log('');
  
  const stats = {
    educationFixed: 0,
    employmentChecked: 0,
    englishScoreAdded: 0,
    videoThumbnailAdded: 0,
    errors: 0
  };
  
  // VAs problemáticos específicos
  const problematicSlugs = ['ac', 'aaron-a0d16', 'abigail', 'albert', 'alejandro'];
  
  for (const va of allVAs) {
    const vaName = va.fieldData.name || 'Sin nombre';
    const vaSlug = va.fieldData.slug || '';
    
    // Solo procesar VAs problemáticos o todos si no se especifica
    if (problematicSlugs.length > 0 && !problematicSlugs.includes(vaSlug.toLowerCase())) {
      continue;
    }
    
    console.log(`📋 ${vaName.toUpperCase()} (${vaSlug})`);
    console.log(`   CMS ID: ${va.id}`);
    
    const updates = {};
    let needsUpdate = false;
    
    // 1. Corregir Education duplicado
    const educationRichtext = va.fieldData['education-richtext'] || '';
    if (educationRichtext) {
      const fixedEducation = removeDuplicateEducation(educationRichtext);
      if (fixedEducation !== educationRichtext) {
        updates['education-richtext'] = fixedEducation;
        needsUpdate = true;
        stats.educationFixed++;
        console.log('   ✓ Education duplicado corregido');
      }
    }
    
    // 2. Verificar Employment History
    const employmentRichtext = va.fieldData['employment-richtext'] || '';
    if (employmentRichtext) {
      fixEmploymentHistory(employmentRichtext);
      stats.employmentChecked++;
    }
    
    // 3. Agregar English Score si falta
    const englishScore = va.fieldData['english-score-3'] || '';
    const video = va.fieldData['video'] || '';
    
    if (!englishScore && vaSlug) {
      console.log(`   🔍 Extrayendo English Score de página web...`);
      const extractedScore = await extractEnglishScoreFromWeb(vaSlug);
      if (extractedScore) {
        updates['english-score-3'] = extractedScore;
        needsUpdate = true;
        stats.englishScoreAdded++;
        console.log(`   ✓ English Score agregado: ${extractedScore}`);
      } else {
        console.log(`   ⚠️  No se pudo extraer English Score`);
      }
    }
    
    // 4. Agregar Video Thumbnail si falta
    const videoThumbnail = va.fieldData['video-thumbnail-2'] || '';
    if (!videoThumbnail && video) {
      const thumbnail = getThumbnailFromVideo(video);
      if (thumbnail) {
        updates['video-thumbnail-2'] = thumbnail;
        needsUpdate = true;
        stats.videoThumbnailAdded++;
        console.log(`   ✓ Video Thumbnail agregado: ${thumbnail}`);
      }
    }
    
    // Aplicar actualizaciones
    if (needsUpdate) {
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, updates);
        console.log(`   ✅ Actualizado exitosamente\n`);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        stats.errors++;
      }
    } else {
      console.log(`   ⚠️  No hay cambios para actualizar\n`);
    }
    
    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   Education duplicado corregido: ${stats.educationFixed}`);
  console.log(`   Employment History verificado: ${stats.employmentChecked}`);
  console.log(`   English Scores agregados: ${stats.englishScoreAdded}`);
  console.log(`   Video Thumbnails agregados: ${stats.videoThumbnailAdded}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
