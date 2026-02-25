/**
 * Script para quitar "Faith" del nombre de Abigail en:
 * - name (campo principal)
 * - summary
 * - employment-summary
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function removeFaith(text) {
  if (!text) return text;
  // Remover "Faith" del texto, incluyendo variaciones con espacios y guiones
  return String(text)
    .replace(/\bAbigail\s+Faith\b/gi, 'Abigail')
    .replace(/\bAbigail\s*-\s*Faith\b/gi, 'Abigail')
    .replace(/\bFaith\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  console.log('🔧 Quitando "Faith" del nombre de Abigail...\n');
  
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
  
  const abigail = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('abigail');
  });
  
  if (!abigail) {
    console.error('❌ Abigail no encontrado en CMS');
    return;
  }
  
  console.log('✅ Abigail encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES ACTUALES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentName = abigail.fieldData.name || '';
  const currentSummary = abigail.fieldData.summary || '';
  const currentEmploymentSummary = abigail.fieldData['employment-summary'] || '';
  
  console.log(`Name: ${currentName}`);
  console.log(`Summary: ${currentSummary.substring(0, 100)}...`);
  console.log(`Employment Summary: ${currentEmploymentSummary.substring(0, 100)}...\n`);
  
  // Preparar actualizaciones
  const updates = {};
  let hasChanges = false;
  
  const newName = removeFaith(currentName);
  if (newName !== currentName) {
    updates['name'] = newName;
    hasChanges = true;
    console.log(`✓ Name será actualizado: "${currentName}" → "${newName}"`);
  }
  
  const newSummary = removeFaith(currentSummary);
  if (newSummary !== currentSummary) {
    updates['summary'] = newSummary;
    hasChanges = true;
    console.log(`✓ Summary será actualizado (primeros 100 chars): "${currentSummary.substring(0, 100)}" → "${newSummary.substring(0, 100)}"`);
  }
  
  const newEmploymentSummary = removeFaith(currentEmploymentSummary);
  if (newEmploymentSummary !== currentEmploymentSummary) {
    updates['employment-summary'] = newEmploymentSummary;
    hasChanges = true;
    console.log(`✓ Employment Summary será actualizado (primeros 100 chars): "${currentEmploymentSummary.substring(0, 100)}" → "${newEmploymentSummary.substring(0, 100)}"`);
  }
  
  if (!hasChanges) {
    console.log('⚠️  No se encontraron cambios necesarios. "Faith" ya fue removido o no existe en los campos.');
    return;
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, abigail.id, updates);
    
    console.log('✅ Abigail actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   Campos actualizados: ${Object.keys(updates).length}`);
    Object.keys(updates).forEach(field => {
      console.log(`   ✓ ${field}`);
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
