/**
 * Script para cargar Employment Summary, English Score y corregir Education duplicado de Branko
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Cargando datos faltantes y corrigiendo Education de Branko...\n');
  
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
  
  const branko = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'branko' || name.startsWith('branko ');
  });
  
  if (!branko) {
    console.error('❌ Branko no encontrado en CMS');
    return;
  }
  
  console.log('✅ Branko encontrado en CMS\n');
  
  // Verificar Education actual
  const currentEducation = branko.fieldData['education-richtext'] || '';
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log('Contenido actual:');
  console.log(currentEducation.substring(0, 500) + (currentEducation.length > 500 ? '...' : ''));
  console.log('\n');
  
  // Detectar duplicados - buscar si hay múltiples va-education-item
  const educationItemMatches = currentEducation.match(/<div class="va-education-item">/g);
  const duplicateCount = educationItemMatches ? educationItemMatches.length : 0;
  
  console.log(`Número de items de education encontrados: ${duplicateCount}`);
  
  let fixedEducation = currentEducation;
  
  if (duplicateCount > 1) {
    console.log('⚠️  Se detectaron duplicados. Extrayendo solo el primer item...\n');
    
    // Extraer solo el primer item de education
    const firstItemMatch = currentEducation.match(/<div class="va-education-item">[\s\S]*?<\/div>\s*(?=<div class="va-education-item">|$)/);
    
    if (firstItemMatch) {
      fixedEducation = firstItemMatch[0].trim();
      console.log('✅ Education corregido (solo primer item):');
      console.log(fixedEducation.substring(0, 300) + '...');
      console.log('\n');
    } else {
      console.log('⚠️  No se pudo extraer el primer item automáticamente. Revisar manualmente.\n');
    }
  } else {
    console.log('✅ No se detectaron duplicados en Education.\n');
  }
  
  // Employment Summary
  const employmentSummary = `Branko has over 4 years of experience in Marketing and Social Media Management. He also possess experience in Mortgage and Lead Generation. His marketing and social media expertise was developed through roles at Highlevel Solutions LLC and as a freelancer, where he managed content, built websites with Wix, edited videos using Capcut, and crafted email campaigns with Brevo. For mortgage and lead generation, he specialized in cold calling, appointment setting, and CRM management across positions with Bloominari LLC, Highlevel Solutions, and real estate companies. Branko also completed insurance training with OVAS. He excels in creating SOPs, client onboarding, calendar management, and leveraging tools like Notion, demonstrating strong organizational, SEO, and communication skills.`;
  
  const englishScore = '7.4';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS A CARGAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Employment Summary: ${employmentSummary.length} caracteres`);
  console.log(`✅ English Score: "${englishScore}"`);
  if (duplicateCount > 1) {
    console.log(`✅ Education: Corregido (removidos duplicados)`);
  }
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'employment-summary': employmentSummary,
    'english-score-3': englishScore
  };
  
  // Solo actualizar education si se detectaron duplicados
  if (duplicateCount > 1 && fixedEducation !== currentEducation) {
    updates['education-richtext'] = fixedEducation;
  }
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, branko.id, updates);
    
    console.log('✅ Branko actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Employment Summary: Cargado');
    console.log('   ✅ English Score: Cargado ("7.4")');
    if (duplicateCount > 1) {
      console.log(`   ✅ Education: Corregido (${duplicateCount} items → 1 item)`);
    } else {
      console.log('   ℹ️  Education: No se detectaron duplicados');
    }
    console.log('\n   💡 Todos los campos ahora deberían mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
