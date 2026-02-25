/**
 * Script para corregir el education de Grace
 * Dejar solo el texto del degree (verde/teal), eliminar placeholders
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo education de Grace...\n');
  
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
  
  const grace = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'grace' || name.startsWith('grace ');
  });
  
  if (!grace) {
    console.error('❌ Grace no encontrado en CMS');
    return;
  }
  
  console.log('✅ Grace encontrado en CMS\n');
  
  // Verificar education actual
  const currentEducation = grace.fieldData['education-richtext'] || '';
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log('Contenido actual:');
  console.log(currentEducation);
  console.log('\n');
  
  // El texto verde/teal es el degree: "INSURANCE / BUSINESS / CUSTOMER SERVICE-RELATED BACKGROUND"
  // Dejar solo el degree, sin school ni year (que son placeholders)
  const correctEducation = `<div class="va-education-item">
  <p class="va-education-degree">INSURANCE / BUSINESS / CUSTOMER SERVICE-RELATED BACKGROUND</p>
</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION CORREGIDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(correctEducation);
  console.log('\n');
  console.log('✅ Solo se deja el texto del degree (verde/teal)');
  console.log('❌ Se eliminan los placeholders: "(CLIENT TO PROVIDE)" y "(YEAR)"');
  console.log('❌ Se elimina el school (va-education-school)');
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, grace.id, {
      'education-richtext': correctEducation
    });
    
    console.log('✅ Education de Grace actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Education: Corregido');
    console.log('   ✅ Solo contiene: "INSURANCE / BUSINESS / CUSTOMER SERVICE-RELATED BACKGROUND"');
    console.log('   ✅ Placeholders eliminados: "(CLIENT TO PROVIDE)" y "(YEAR)"');
    console.log('   ✅ School eliminado');
    console.log('\n   💡 El Education ahora debería mostrarse solo con el texto verde/teal.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
