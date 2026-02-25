/**
 * Script para verificar el estado actual de AC en el CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
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
  
  const ac = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'ac');
  
  if (!ac) {
    console.error('❌ AC no encontrado');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 AC - ESTADO ACTUAL EN CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const employment = ac.fieldData['employment-richtext'] || '';
  const education = ac.fieldData['education-richtext'] || '';
  
  console.log('EMPLOYMENT HISTORY:');
  console.log(`   Longitud: ${employment.length} caracteres`);
  console.log(`   Tiene accordion: ${employment.includes('va-employment-accordion')}`);
  console.log(`   Tiene header: ${employment.includes('va-employment-accordion-header')}`);
  console.log(`   Tiene content: ${employment.includes('va-employment-accordion-content')}`);
  console.log(`   Tiene description: ${employment.includes('va-employment-accordion-description')}`);
  
  // Contar accordions
  const accordionCount = (employment.match(/va-employment-accordion/g) || []).length;
  console.log(`   Número de accordions: ${accordionCount}`);
  
  // Verificar estructura del primer accordion
  const firstAccordionMatch = employment.match(/<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/i);
  if (firstAccordionMatch) {
    const firstAccordion = firstAccordionMatch[0];
    console.log(`\n   Primer accordion (primeros 800 caracteres):`);
    console.log(`   ${firstAccordion.substring(0, 800)}...\n`);
    
    // Verificar si tiene la estructura header/content
    const hasHeader = firstAccordion.includes('va-employment-accordion-header');
    const hasContent = firstAccordion.includes('va-employment-accordion-content');
    const hasDescription = firstAccordion.includes('va-employment-accordion-description');
    
    console.log(`   Estructura del primer accordion:`);
    console.log(`      Header: ${hasHeader ? '✓' : '✗'}`);
    console.log(`      Content: ${hasContent ? '✓' : '✗'}`);
    console.log(`      Description: ${hasDescription ? '✓' : '✗'}`);
    
    // Verificar si description tiene <p> tags
    if (hasDescription) {
      const descMatch = firstAccordion.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
      if (descMatch) {
        console.log(`      Descripción tiene ${descMatch.length} párrafo(s)`);
        console.log(`      Primer párrafo: ${descMatch[0].substring(0, 100)}...`);
      }
    }
  }
  
  console.log('\nEDUCATION:');
  console.log(`   Longitud: ${education.length} caracteres`);
  console.log(`   Tiene items: ${education.includes('va-education-item')}`);
  const itemCount = (education.match(/va-education-item/g) || []).length;
  console.log(`   Número de items: ${itemCount}`);
  
  if (education) {
    console.log(`\n   HTML completo:`);
    console.log(`   ${education.substring(0, 500)}...\n`);
  }
}

main().catch(console.error);
