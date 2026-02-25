/**
 * Script para inspeccionar el HTML de Employment History de AC
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
  const drue = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'drue');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 COMPARACIÓN: AC vs DRUE');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (!ac || !drue) {
    console.error('❌ AC o Drue no encontrados');
    return;
  }
  
  const acEmployment = ac.fieldData['employment-richtext'] || '';
  const drueEmployment = drue.fieldData['employment-richtext'] || '';
  
  // Extraer primer accordion de cada uno
  const acAccordionMatch = acEmployment.match(/<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/i);
  const drueAccordionMatch = drueEmployment.match(/<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/i);
  
  console.log('DRUE - PRIMER ACCORDION (REFERENCIA):');
  console.log('─'.repeat(80));
  if (drueAccordionMatch) {
    const accordion = drueAccordionMatch[0];
    console.log(accordion);
    console.log('');
    
    // Analizar estructura
    const hasHeader = accordion.includes('va-employment-accordion-header');
    const hasContent = accordion.includes('va-employment-accordion-content');
    const descMatch = accordion.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
    console.log(`   Estructura: Header=${hasHeader}, Content=${hasContent}, Description paragraphs=${descMatch ? descMatch.length : 0}`);
    if (descMatch) {
      console.log(`   Primer párrafo de descripción: ${descMatch[0].substring(0, 150)}...`);
    }
  } else {
    console.log('   No se encontró accordion');
  }
  
  console.log('\n');
  console.log('AC - PRIMER ACCORDION (ACTUAL):');
  console.log('─'.repeat(80));
  if (acAccordionMatch) {
    const accordion = acAccordionMatch[0];
    console.log(accordion);
    console.log('');
    
    // Analizar estructura
    const hasHeader = accordion.includes('va-employment-accordion-header');
    const hasContent = accordion.includes('va-employment-accordion-content');
    const descMatch = accordion.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
    console.log(`   Estructura: Header=${hasHeader}, Content=${hasContent}, Description paragraphs=${descMatch ? descMatch.length : 0}`);
    if (descMatch) {
      console.log(`   Primer párrafo de descripción: ${descMatch[0].substring(0, 150)}...`);
      
      // Verificar si los párrafos están dentro de otro <p>
      const descContent = descMatch[0];
      const nestedP = descContent.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*><p>/);
      if (nestedP) {
        console.log(`   ⚠️  PROBLEMA: Hay <p> anidados dentro de va-employment-accordion-description`);
      }
    }
  } else {
    console.log('   No se encontró accordion');
  }
}

main().catch(console.error);
