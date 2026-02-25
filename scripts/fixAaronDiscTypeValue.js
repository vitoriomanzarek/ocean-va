/**
 * Script para corregir el valor de DISC Type de Aaron
 * El problema: Aaron tiene un ID en lugar del texto del Option
 * Solución: Actualizar con el valor correcto del Option (C+S)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo valor de DISC Type de Aaron...\n');
  
  if (!WEBFLOW_API_TOKEN) {
    console.error('❌ WEBFLOW_API_TOKEN no encontrado en .env');
    return;
  }
  
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
  
  const aaron = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'aaron-a0d16' || (v.fieldData.name || '').toLowerCase() === 'aaron');
  const drue = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'drue');
  
  if (!aaron) {
    console.error('❌ Aaron no encontrado');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 ESTADO ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const aaronDiscType = aaron.fieldData['disc-type-2'] || '';
  console.log('Aaron DISC Type:', aaronDiscType);
  console.log('Es ID?', /^[a-f0-9]{32}$/i.test(aaronDiscType));
  console.log('');
  
  if (drue) {
    const drueDiscType = drue.fieldData['disc-type-2'] || '';
    console.log('Drue DISC Type (referencia):', drueDiscType);
    console.log('Es ID?', /^[a-f0-9]{32}$/i.test(drueDiscType));
    console.log('Es texto?', /^[A-Z][+][A-Z]$/.test(drueDiscType));
    console.log('');
  }
  
  // Obtener las opciones del campo Option
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 OPCIONES DISPONIBLES EN EL CAMPO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Intentar obtener la estructura del campo
  // Nota: La API v2 puede no devolver las opciones directamente
  // Necesitamos buscar el ID correcto para "C+S"
  
  // El usuario quiere C+S, pero el campo Option requiere el ID de la opción
  // Intentemos actualizar con "C+S" directamente (texto)
  // Si falla, necesitaremos el ID correcto
  
  console.log('Intentando actualizar con "C+S" (texto)...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, aaron.id, {
      'disc-type-2': 'C+S'
    });
    console.log('✅ DISC Type actualizado exitosamente a "C+S"\n');
  } catch (error) {
    console.error('❌ Error al actualizar:', error.message);
    console.log('\n⚠️  El campo Option requiere el ID de la opción, no el texto.');
    console.log('💡 SOLUCIÓN:');
    console.log('   1. Ve a Webflow Designer');
    console.log('   2. Abre la colección "Virtual Assistants"');
    console.log('   3. Edita el campo "DISC Type 2"');
    console.log('   4. Busca la opción "C+S" y copia su ID');
    console.log('   5. O cambia el campo a Plain Text en lugar de Option');
    console.log('   6. O actualiza manualmente el valor de Aaron a "C+S" en el CMS\n');
  }
}

main().catch(console.error);
