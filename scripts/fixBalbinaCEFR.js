/**
 * Script para corregir el CEFR Result de Balbina
 * Genera el HTML completo de la tabla CEFR con B2 como nivel activo
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function generateCEFRHTML(activeLevel) {
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const cefrDescriptions = [
    'Can understand and use familiar everyday expressions and basic questions about personal details.',
    'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    'Can communicate confidently in a variety of academic and professional environments.',
    'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'Can understand with ease virtually everything heard or read and can summarize information from different sources.'
  ];
  
  const items = cefrLevels.map((level, idx) => {
    const isActive = level.toUpperCase() === activeLevel.toUpperCase();
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    
    return `<div class="va-cefr-item">
  <div class="va-cefr-bubble ${bubbleClass}">${level}</div>
  <p class="va-cefr-description">${cefrDescriptions[idx]}</p>
</div>`;
  }).join('\n');
  
  return items;
}

async function main() {
  console.log('🔧 Corrigiendo CEFR Result de Balbina...\n');
  
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
  
  const balbina = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'balbina' || name.startsWith('balbina ');
  });
  
  if (!balbina) {
    console.error('❌ Balbina no encontrado en CMS');
    return;
  }
  
  console.log('✅ Balbina encontrado en CMS\n');
  
  const currentCerf = balbina.fieldData['cerf-result'] || '';
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALOR ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`CEFR Result: "${currentCerf}"`);
  console.log('\n');
  
  // El nivel activo es B2 según el HTML original
  const activeLevel = 'B2';
  const cefrHTML = generateCEFRHTML(activeLevel);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 HTML GENERADO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(cefrHTML.substring(0, 300) + '...');
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, balbina.id, {
      'cerf-result': cefrHTML
    });
    
    console.log('✅ CEFR Result de Balbina actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   ✅ CEFR Table: HTML generado con ${activeLevel} como nivel activo`);
    console.log('   ✅ Incluye todos los 6 niveles (A1, A2, B1, B2, C1, C2)');
    console.log('   ✅ B2 marcado como activo (va-cefr-bubble-active)');
    console.log('   ✅ Resto de niveles marcados como inactivos (va-cefr-bubble-inactive)');
    console.log('\n   💡 El CEFR Result Table ahora debería mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
