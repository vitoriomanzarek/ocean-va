/**
 * Script para cargar Employment Summary y English Score de Brandon
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Cargando datos faltantes de Brandon...\n');
  
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
  
  const brandon = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'brandon' || name.startsWith('brandon ');
  });
  
  if (!brandon) {
    console.error('❌ Brandon no encontrado en CMS');
    return;
  }
  
  console.log('✅ Brandon encontrado en CMS\n');
  
  // Employment Summary
  const employmentSummary = `Brandon L. is a highly resourceful and analytical Virtual Assistant with two years experience in the real estate and home-improvement industries gained through his roles at Porch and True Work. He excelled as a Lead Verification Agent at Porch, where he verified home-improvement leads and effectively de-escalated customer concerns. At True Work, he strengthened his logistics and coordination skills by managing service requests, communicating with residents, and tracking unit turnovers. His background reflects strong problem-solving abilities, precision in task execution, and exceptional communication skills. Brandon consistently demonstrates adaptability, critical thinking, and a proactive approach in remote environments. Overall, he brings a solid blend of real estate knowledge, customer support expertise, and operational efficiency.`;
  
  const englishScore = '7.2';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS A CARGAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Employment Summary: ${employmentSummary.length} caracteres`);
  console.log(`✅ English Score: "${englishScore}"`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'employment-summary': employmentSummary,
    'english-score-3': englishScore
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, brandon.id, updates);
    
    console.log('✅ Brandon actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Employment Summary: Cargado');
    console.log('   ✅ English Score: Cargado ("7.2")');
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
