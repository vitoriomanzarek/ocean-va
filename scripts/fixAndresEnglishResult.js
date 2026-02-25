/**
 * Script para agregar English Result y Employment Summary de Andres
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Agregando English Result y Employment Summary de Andres...\n');
  
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
  
  const andres = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'andres' || name.startsWith('andres ');
  });
  
  if (!andres) {
    console.error('❌ Andres no encontrado en CMS');
    return;
  }
  
  console.log('✅ Andres encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES ACTUALES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentEnglishScore = andres.fieldData['english-score-3'] || '';
  const currentSummary = andres.fieldData['employment-summary'] || '';
  
  console.log(`English Score: ${currentEnglishScore || '(vacío)'}`);
  console.log(`Employment Summary: ${currentSummary ? currentSummary.substring(0, 100) + '...' : '(vacío)'}\n`);
  
  const correctEnglishScore = '80/B1';
  const correctSummary = `Andres has over 5 years of experience in Auto, Home, and Renters Insurance, gained through roles with Driscoll Insurance Services and Leslie Kays Insurance via Edge. He handled customer communications, processed endorsements, managed renewals, and ensured policy retention with accuracy and compliance. Bilingual in English and Spanish, he supported clients across Florida's insurance markets and contributed to cross-selling and retention efforts. At Teleperformance, he provided billing support for Turo and helped train new agents. Andres is detail-oriented, reliable, and highly organized, with strong communication and technical skills. His ability to thrive in fast-paced, high-volume environments makes him a strong asset to any insurance team.`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES CORRECTOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`English Score: ${correctEnglishScore}`);
  console.log(`Employment Summary: ${correctSummary.substring(0, 100)}...\n`);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, andres.id, {
      'english-score-3': correctEnglishScore,
      'employment-summary': correctSummary
    });
    
    console.log('✅ Andres actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   ✅ English Score: Actualizado a "${correctEnglishScore}"`);
    console.log(`   ✅ Employment Summary: Actualizado (${correctSummary.length} caracteres)`);
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
