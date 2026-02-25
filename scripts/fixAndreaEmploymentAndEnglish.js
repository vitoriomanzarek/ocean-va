/**
 * Script para corregir Employment Summary y English Test Result de Andrea
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo Employment Summary y English Test Result de Andrea...\n');
  
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
  
  const andrea = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'andrea' || name.startsWith('andrea ');
  });
  
  if (!andrea) {
    console.error('❌ Andrea no encontrado en CMS');
    return;
  }
  
  console.log('✅ Andrea encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES ACTUALES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentSummary = andrea.fieldData['employment-summary'] || '';
  const currentEnglishScore = andrea.fieldData['english-score-3'] || '';
  const currentEnglishTestType = andrea.fieldData['type-of-english-test'] || '';
  
  console.log(`Employment Summary: ${currentSummary ? currentSummary.substring(0, 100) + '...' : '(vacío)'}`);
  console.log(`English Score: ${currentEnglishScore || '(vacío)'}`);
  console.log(`Type of English Test: ${currentEnglishTestType || '(vacío)'}\n`);
  
  const correctSummary = `Andrea has over 7 years of experience in commercial strategy, risk analysis, and business development across insurance and financial services. Her background spans roles at GNP Mexico, AIG Mexico, Interproteccion, and Zurich Mexico, where she has supported client acquisition, portfolio growth, commercial strategy development, and risk management. She currently works as a Financial Advisor at GNP Mexico, providing personalized advisory in insurance, investment, and financial planning. Andrea's experience includes designing and implementing commercial strategies, conducting market and portfolio analysis, managing client relationships, and developing tailored proposals. Her strengths include strong analytical skills, strategic thinking, client relationship management, and the ability to identify business opportunities.`;
  
  const correctEnglishScore = '90/C1';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES CORRECTOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Employment Summary: ${correctSummary.substring(0, 100)}...`);
  console.log(`English Score: ${correctEnglishScore}\n`);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'employment-summary': correctSummary,
    'english-score-3': correctEnglishScore
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, andrea.id, updates);
    
    console.log('✅ Andrea actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   ✅ Employment Summary: Actualizado (${correctSummary.length} caracteres)`);
    console.log(`   ✅ English Score: Actualizado a "${correctEnglishScore}"`);
    console.log('\n   💡 Los campos ahora deberían mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
