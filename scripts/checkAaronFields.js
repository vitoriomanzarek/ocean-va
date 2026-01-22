/**
 * Script para verificar los campos de Aaron y ver por qué no se muestran Tools/Equipment
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
  
  // Obtener Aaron
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
  
  const aaron = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'aaron-a0d16');
  
  if (!aaron) {
    console.log('❌ Aaron no encontrado');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 AARON - CAMPOS EN CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`Nombre: ${aaron.fieldData.name}`);
  console.log(`Slug: ${aaron.fieldData.slug}`);
  console.log(`CMS ID: ${aaron.id}\n`);
  
  // Verificar campos de Tools
  console.log('TOOLS:');
  console.log(`  tools-tags: "${aaron.fieldData['tools-tags'] || '(vacío)'}"`);
  console.log(`  tools-richtext: "${(aaron.fieldData['tools-richtext'] || '').substring(0, 200)}..."`);
  console.log(`  tools-richtext length: ${(aaron.fieldData['tools-richtext'] || '').length} caracteres\n`);
  
  // Verificar campos de Equipment
  console.log('EQUIPMENT:');
  console.log(`  equipment-tags: "${aaron.fieldData['equipment-tags'] || '(vacío)'}"`);
  console.log(`  equipment-richtext: "${(aaron.fieldData['equipment-richtext'] || '').substring(0, 200)}..."`);
  console.log(`  equipment-richtext length: ${(aaron.fieldData['equipment-richtext'] || '').length} caracteres\n`);
  
  // Verificar si tiene tags pero no richtext
  const hasToolsTags = aaron.fieldData['tools-tags'] && aaron.fieldData['tools-tags'].trim() !== '';
  const hasToolsRichtext = aaron.fieldData['tools-richtext'] && aaron.fieldData['tools-richtext'].trim() !== '';
  const hasEquipmentTags = aaron.fieldData['equipment-tags'] && aaron.fieldData['equipment-tags'].trim() !== '';
  const hasEquipmentRichtext = aaron.fieldData['equipment-richtext'] && aaron.fieldData['equipment-richtext'].trim() !== '';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (hasToolsTags && !hasToolsRichtext) {
    console.log('⚠️  PROBLEMA: Aaron tiene tools-tags pero NO tiene tools-richtext');
    console.log('   El template necesita tools-richtext (HTML) para mostrar los Tools\n');
  }
  
  if (hasEquipmentTags && !hasEquipmentRichtext) {
    console.log('⚠️  PROBLEMA: Aaron tiene equipment-tags pero NO tiene equipment-richtext');
    console.log('   El template necesita equipment-richtext (HTML) para mostrar el Equipment\n');
  }
  
  if (hasToolsTags && !hasToolsRichtext) {
    console.log('💡 SOLUCIÓN: Convertir tools-tags a tools-richtext (HTML)');
    const tools = aaron.fieldData['tools-tags'].split(',').map(t => t.trim()).filter(Boolean);
    console.log(`   Tools encontrados: ${tools.join(', ')}\n`);
  }
  
  if (hasEquipmentTags && !hasEquipmentRichtext) {
    console.log('💡 SOLUCIÓN: Convertir equipment-tags a equipment-richtext (HTML)');
    const equipment = aaron.fieldData['equipment-tags'].split(',').map(e => e.trim()).filter(Boolean);
    console.log(`   Equipment encontrado: ${equipment.join(', ')}\n`);
  }
}

main().catch(console.error);
