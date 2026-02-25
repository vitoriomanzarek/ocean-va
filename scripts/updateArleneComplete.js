/**
 * Script para actualizar Arlene con todos los datos faltantes
 * Extrae de la página web y del CSV para completar el perfil
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const ARLENE_URL = 'https://www.oceanvirtualassistant.com/arlene-ocean-va-profile';
const CSV_FILE_PATH = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

function extractTools(html) {
  const tools = [];
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = toolItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    const spanMatch = itemHtml.match(/<span[^>]*(?!checkmark)[^>]*>([^<]+)<\/span>/i);
    if (spanMatch && spanMatch[1]) {
      const toolText = spanMatch[1].trim();
      if (toolText && !toolText.match(/^✓|✓$/)) {
        tools.push(toolText);
      }
    }
  }
  
  return [...new Set(tools)];
}

function generateToolsHTML(tools) {
  if (!tools || tools.length === 0) return '';
  
  const items = tools.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  
  return `<div class="va-tools-list">${items}</div>`;
}

function extractSkills(html) {
  const skills = [];
  const skillTagRegex = /<span[^>]*class="[^"]*va-skill-tag[^"]*"[^>]*>([^<]+)<\/span>/gi;
  let match;
  
  while ((match = skillTagRegex.exec(html)) !== null) {
    const skill = match[1].trim();
    if (skill) {
      skills.push(skill);
    }
  }
  
  return [...new Set(skills)];
}

function generateSkillsHTML(skills) {
  if (!skills || skills.length === 0) return '';
  
  const tags = skills.map(skill => 
    `<span class="va-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');
  
  return tags;
}

function extractDiscDescription(html) {
  const descMatch = html.match(/<div[^>]*class="[^"]*va-disc-description[^"]*"[^>]*>(.*?)<\/div>/gis);
  if (descMatch) {
    return descMatch[0]
      .replace(/<div[^>]*class="[^"]*va-disc-description[^"]*"[^>]*>/i, '')
      .replace(/<\/div>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .trim();
  }
  return '';
}

function formatDiscDescription(description) {
  if (!description) return '';
  return description
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${escapeHtml(p)}</p>`)
    .join('');
}

function extractEnglishDescription(html) {
  const descMatch = html.match(/<div[^>]*class="[^"]*va-english-description[^"]*"[^>]*>(.*?)<\/div>/gis);
  if (descMatch) {
    return descMatch[0]
      .replace(/<div[^>]*class="[^"]*va-english-description[^"]*"[^>]*>/i, '')
      .replace(/<\/div>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .trim();
  }
  return '';
}

function extractImage(html) {
  const imgMatch = html.match(/<img[^>]*src=['"]([^'"]*arlene[^'"]*\.(webp|jpg|jpeg|png))['"]/i);
  if (imgMatch) {
    return imgMatch[1];
  }
  return null;
}

function extractCEFR(html) {
  // Buscar la tabla CEFR completa
  const cefrMatch = html.match(/<div[^>]*class="[^"]*va-cefr-grid[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis);
  if (cefrMatch) {
    return cefrMatch[0];
  }
  return '';
}

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

function getThumbnailUrl(videoUrl) {
  const videoId = getYoutubeId(videoUrl);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
}

async function main() {
  console.log('🔧 Actualizando Arlene con datos faltantes...\n');
  
  // Leer CSV
  let csvData = [];
  try {
    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    csvData = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.error(`Error reading CSV: ${error.message}`);
  }
  
  const arleneCSV = csvData.find(r => (r.name || '').toUpperCase() === 'ARLENE');
  
  // Obtener Arlene del CMS
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
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
  
  const arlene = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'arlene');
  
  if (!arlene) {
    console.error('❌ Arlene no encontrado en CMS');
    return;
  }
  
  console.log('✅ Arlene encontrado en CMS\n');
  console.log(`🌐 Visitando: ${ARLENE_URL}\n`);
  
  // Extraer data de la página web
  const html = await fetchPage(ARLENE_URL);
  
  if (!html) {
    console.error('❌ No se pudo obtener HTML de la página');
    return;
  }
  
  console.log('✅ HTML obtenido, extrayendo datos...\n');
  
  // Extraer datos faltantes
  const extracted = {
    tools: extractTools(html),
    skills: extractSkills(html),
    discDescription: extractDiscDescription(html),
    englishDescription: extractEnglishDescription(html),
    image: extractImage(html),
    cefr: extractCEFR(html)
  };
  
  console.log('📊 DATOS EXTRAÍDOS:');
  console.log(`   Tools: ${extracted.tools.length} items`);
  console.log(`   Skills: ${extracted.skills.length} items`);
  console.log(`   DISC Description: ${extracted.discDescription ? 'Sí' : 'No'}`);
  console.log(`   English Description: ${extracted.englishDescription ? 'Sí' : 'No'}`);
  console.log(`   Image: ${extracted.image || 'No'}`);
  console.log(`   CEFR: ${extracted.cefr ? 'Sí' : 'No'}\n`);
  
  // Preparar actualizaciones
  const updates = {};
  
  // Nota: title, experience-years, languages pueden no existir como campos separados
  // Verificamos si existen en el CMS antes de actualizarlos
  // Por ahora, solo actualizamos los campos que sabemos que existen
  
  // 1. Experience Years (del CSV) - solo si el campo existe
  if (arleneCSV && arleneCSV['experience-years'] && arlene.fieldData.hasOwnProperty('experience-years')) {
    updates['experience-years'] = arleneCSV['experience-years'];
    console.log('✓ Experience Years será actualizado');
  }
  
  // 2. Languages (del CSV) - solo si el campo existe
  if (arleneCSV && arleneCSV.language && arlene.fieldData.hasOwnProperty('languages')) {
    updates['languages'] = arleneCSV.language;
    console.log('✓ Languages será actualizado');
  }
  
  // 4. Image (de la página web o CSV)
  if (extracted.image) {
    updates['image'] = extracted.image;
    console.log('✓ Image será actualizado');
  } else if (arleneCSV && arleneCSV.image) {
    updates['image'] = arleneCSV.image;
    console.log('✓ Image será actualizado (desde CSV)');
  }
  
  // 5. Tools Richtext
  if (extracted.tools.length > 0) {
    updates['tools-richtext'] = generateToolsHTML(extracted.tools);
    console.log('✓ Tools Richtext será actualizado');
  }
  
  // 6. Skills Richtext
  if (extracted.skills.length > 0) {
    updates['skills-richtext'] = generateSkillsHTML(extracted.skills);
    console.log('✓ Skills Richtext será actualizado');
  }
  
  // 7. DISC Description
  if (extracted.discDescription) {
    updates['disc-description'] = formatDiscDescription(extracted.discDescription);
    console.log('✓ DISC Description será actualizado');
  }
  
  // 8. English Description
  if (extracted.englishDescription) {
    updates['english-description'] = extracted.englishDescription;
    console.log('✓ English Description será actualizado');
  }
  
  // 9. CEFR Result
  if (extracted.cefr) {
    updates['cerf-result'] = extracted.cefr;
    console.log('✓ CEFR Result será actualizado');
  }
  
  if (Object.keys(updates).length === 0) {
    console.log('⚠️  No hay datos para actualizar\n');
    return;
  }
  
  console.log('\n📤 Actualizando CMS...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, arlene.id, updates);
    console.log('✅ Arlene actualizado exitosamente\n');
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 CAMPOS ACTUALIZADOS');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    Object.keys(updates).forEach(field => {
      const value = updates[field];
      const preview = typeof value === 'string' ? value.substring(0, 100) : String(value);
      console.log(`   ✓ ${field}: ${preview}${typeof value === 'string' && value.length > 100 ? '...' : ''}`);
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }
}

main().catch(console.error);
