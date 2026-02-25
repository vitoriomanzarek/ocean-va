/**
 * Script para corregir skill tags, CEFR table y education de Ellen
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Función para generar HTML de skills (sin contenedor)
function generateSkillsHTML(skills) {
  return skills.map(skill => `<span class="va-skill-tag">${skill}</span>`).join('');
}

// Función para generar HTML de CEFR
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
  console.log('🔧 Corrigiendo skill tags, CEFR table y education de Ellen...\n');
  
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
  
  const ellen = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'ellen' || name.includes('ellen');
  });
  
  if (!ellen) {
    console.error('❌ Ellen no encontrado en CMS');
    return;
  }
  
  console.log('✅ Ellen encontrado en CMS\n');
  
  // Skills extraídos del HTML
  const skills = [
    'Endorsements',
    'PPC Insurance Support',
    'Email & Calendar Management',
    'COIs Generation',
    'Customer Service',
    'Quoting Ezlynx & Carrier Portals',
    'Claims Coordination',
    'Cancellations',
    'Inbound & Outbound Calls',
    'Underwriting Support',
    'Document Preparation',
    'Renewals'
  ];
  
  const skillsHTML = generateSkillsHTML(skills);
  
  // CEFR: B1 es el nivel activo según el HTML
  const cefrHTML = generateCEFRHTML('B1');
  
  // Education: Corregir duplicado y agregar año 2022
  const correctEducation = `<div class="va-education-item">
  <h3 class="va-education-school">Quezon City University</h3>
  <p class="va-education-degree">Bachelor of Science in Entrepreneurship</p>
  <p class="va-education-year">2022</p>
</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS A CARGAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Skills: ${skills.length} skills`);
  console.log(`✅ CEFR: HTML generado con B1 como nivel activo`);
  console.log(`✅ Education: Corregido (removido duplicado, agregado año 2022)`);
  console.log('\n');
  
  // Verificar education actual
  const currentEducation = ellen.fieldData['education-richtext'] || '';
  const educationItemMatches = currentEducation.match(/<div class="va-education-item">/g);
  const duplicateCount = educationItemMatches ? educationItemMatches.length : 0;
  
  if (duplicateCount > 1) {
    console.log(`⚠️  Se detectaron ${duplicateCount} items de education (duplicado)`);
  }
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'skills-richtext': skillsHTML,
    'cerf-result': cefrHTML,
    'education-richtext': correctEducation
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, ellen.id, updates);
    
    console.log('✅ Ellen actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Skills: Cargado (12 skills)');
    console.log('   ✅ CEFR Table: HTML generado con B1 activo');
    console.log('   ✅ Education: Corregido');
    console.log('      - Removido duplicado');
    console.log('      - Agregado año 2022 con estilo correcto');
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
