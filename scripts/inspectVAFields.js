/**
 * Script para inspeccionar campos específicos de VAs problemáticos
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// VAs a inspeccionar (ejemplos del diagnóstico)
const VAs_TO_INSPECT = ['ac', 'mina', 'abigail', 'alejandro', 'albert', 'aaron'];

async function main() {
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
  
  for (const vaSlug of VAs_TO_INSPECT) {
    const va = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === vaSlug.toLowerCase());
    if (!va) {
      console.log(`\n❌ ${vaSlug.toUpperCase()} no encontrado\n`);
      continue;
    }
    
    const vaName = va.fieldData.name || 'Sin nombre';
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📋 ${vaName.toUpperCase()} (${vaSlug})`);
    console.log(`${'='.repeat(80)}\n`);
    
    // Employment History
    const employment = va.fieldData['employment-richtext'] || '';
    console.log('EMPLOYMENT HISTORY:');
    console.log(`   Longitud: ${employment.length} caracteres`);
    console.log(`   Preview (primeros 300 chars): ${employment.substring(0, 300)}...`);
    console.log(`   Tiene accordion: ${employment.includes('va-employment-accordion')}`);
    console.log(`   Tiene <ul>: ${employment.includes('<ul>')}`);
    console.log(`   Tiene JSON: ${employment.trim().startsWith('[')}`);
    console.log('');
    
    // Education
    const education = va.fieldData['education-richtext'] || '';
    console.log('EDUCATION:');
    console.log(`   Longitud: ${education.length} caracteres`);
    console.log(`   Preview (primeros 300 chars): ${education.substring(0, 300)}...`);
    console.log(`   Tiene va-education-item: ${education.includes('va-education-item')}`);
    console.log(`   Tiene <ul>: ${education.includes('<ul>')}`);
    console.log('');
    
    // Employment Summary
    const summary = va.fieldData['employment-summary'] || '';
    console.log('EMPLOYMENT SUMMARY:');
    console.log(`   Longitud: ${summary.length} caracteres`);
    console.log(`   Preview (primeros 200 chars): ${summary.substring(0, 200)}...`);
    console.log(`   Tiene HTML: ${summary.includes('<') || summary.includes('&')}`);
    console.log('');
  }
}

main().catch(console.error);
