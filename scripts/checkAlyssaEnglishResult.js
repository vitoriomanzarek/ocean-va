/**
 * Script para consultar el English Result de Alyssa
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Consultando English Result de Alyssa...\n');
  
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
  
  const alyssa = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('alyssa');
  });
  
  if (!alyssa) {
    console.error('❌ Alyssa no encontrado en CMS');
    return;
  }
  
  console.log('✅ Alyssa encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 ENGLISH RESULT - DATOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const typeOfEnglishTest = alyssa.fieldData['type-of-english-test'] || '';
  const englishScore = alyssa.fieldData['english-score-3'] || '';
  const englishDescription = alyssa.fieldData['english-description'] || '';
  
  console.log('📝 Type of English Test:');
  console.log(`   ${typeOfEnglishTest || '(vacío)'}\n`);
  
  console.log('📊 English Score:');
  console.log(`   ${englishScore || '(vacío)'}\n`);
  
  console.log('📄 English Description:');
  if (englishDescription) {
    console.log(`   ${englishDescription}`);
    console.log(`   Longitud: ${englishDescription.length} caracteres\n`);
  } else {
    console.log(`   (vacío)\n`);
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
