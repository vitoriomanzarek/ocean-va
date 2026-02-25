/**
 * Script para actualizar los tools de Jellie, agregar CEFR Result (C2) y English Test Result (95/C2)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateToolsHTML(tools) {
  return tools.map(tool => `
<div class="va-tool-item">
  <span class="va-tool-checkmark">✓</span>
  <span>${escapeHtml(tool)}</span>
</div>`.trim()).join('');
}

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
  console.log('🔧 Actualizando tools, CEFR y English Test Result de Jellie...\n');

  // Tools de la imagen proporcionada
  const newTools = [
    'APPFOLIO',
    'BUILDIUM',
    'RENT MANAGER',
    'AIRBNB & VRBO',
    'HOSTAWAY',
    'QUICKBOOKS',
    'YARDI',
    'VANTACA',
    'ZILLOW',
    'ZOIPER',
    'ASANA',
    'TRELLO'
  ];

  const toolsHTML = `<div class="va-tools-list">${generateToolsHTML(newTools)}</div>`;
  const toolsTags = newTools.join('; ');
  const cefrHTML = generateCEFRHTML('C2');
  const englishScore = '95';
  const englishDescription = '<p>Demonstrates exceptional fluency and mastery of the English language with native-like pronunciation and natural flow. Uses highly advanced vocabulary and complex grammar structures effortlessly to express nuanced ideas with precision and sophistication.</p>';

  console.log('════════ DATOS A ACTUALIZAR ════════\n');
  console.log(`✅ Tools: ${newTools.length} tools`);
  console.log(`✅ CEFR Level: C2 (activo)`);
  console.log(`✅ English Score: 95/C2\n`);

  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find((c) => c.slug === 'virtual-assistants');

  if (!vaCollection) {
    console.error('❌ Colección "virtual-assistants" no encontrada');
    return;
  }

  let allVAs = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
    if (!res.items || res.items.length === 0) break;
    allVAs = allVAs.concat(res.items);
    if (res.items.length < limit) break;
    offset += limit;
  }

  // Buscar Jellie por diferentes variaciones del nombre
  const jellie = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name.includes('jellie') || slug.includes('jellie') || name.includes('jellie mar');
  });

  if (!jellie) {
    console.error('❌ No se encontró a Jellie en la colección de VAs');
    console.log('\nVAs encontrados con nombres similares:');
    allVAs.forEach(v => {
      const name = (v.fieldData.name || '').toLowerCase();
      if (name.includes('j') || name.includes('ell')) {
        console.log(`  - ${v.fieldData.name} (slug: ${v.fieldData.slug})`);
      }
    });
    return;
  }

  console.log(`✅ Jellie encontrada: ${jellie.fieldData.name}`);
  console.log(`   Slug: ${jellie.fieldData.slug}`);
  console.log(`   ID: ${jellie.id}\n`);

  const currentTools = jellie.fieldData['tools-richtext'] || '';
  const currentCEFR = jellie.fieldData['cerf-result'] || '';
  const currentEnglish = jellie.fieldData['english-score-3'] || '';
  
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Tools-richtext length: ${currentTools.length}`);
  console.log(`CEFR Result length: ${currentCEFR.length}`);
  console.log(`English Score: ${currentEnglish}\n`);

  const updates = {
    'tools-tags': toolsTags,
    'tools-richtext': toolsHTML,
    'cerf-result': cefrHTML,
    'english-score-3': englishScore,
    'english-description': englishDescription
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, jellie.id, updates);
    console.log('✅ Jellie actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Tools: reemplazados con 12 tools de property management');
    console.log('  - CEFR Result: tabla generada con C2 como nivel activo');
    console.log('  - English Score: 95/C2');
    console.log('  - English Description: actualizada');
  } catch (error) {
    console.error('❌ Error al actualizar a Jellie:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
