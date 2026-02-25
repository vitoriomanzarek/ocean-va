/**
 * Script para comparar valores de DISC Type entre VAs que funcionan y Aaron
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Comparando valores de DISC Type...\n');
  
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
  
  // Buscar Aaron y Drue (que funciona)
  const aaron = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'aaron-a0d16' || (v.fieldData.name || '').toLowerCase() === 'aaron');
  const drue = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'drue');
  
  // Buscar otros VAs con DISC Type para comparar
  const vasWithDiscType = allVAs
    .filter(v => v.fieldData['disc-type-2'])
    .slice(0, 10); // Primeros 10 con DISC Type
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 AARON (NO FUNCIONA)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (aaron) {
    const aaronDiscType = aaron.fieldData['disc-type-2'] || '';
    console.log('Nombre:', aaron.fieldData.name);
    console.log('Slug:', aaron.fieldData.slug);
    console.log('DISC Type valor:', aaronDiscType);
    console.log('Tipo:', typeof aaronDiscType);
    console.log('Longitud:', aaronDiscType.length);
    console.log('Es ID (hash)?', /^[a-f0-9]{32}$/i.test(aaronDiscType));
    console.log('');
  } else {
    console.log('❌ Aaron no encontrado\n');
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DRUE (FUNCIONA - REFERENCIA)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (drue) {
    const drueDiscType = drue.fieldData['disc-type-2'] || '';
    console.log('Nombre:', drue.fieldData.name);
    console.log('Slug:', drue.fieldData.slug);
    console.log('DISC Type valor:', drueDiscType);
    console.log('Tipo:', typeof drueDiscType);
    console.log('Longitud:', drueDiscType.length);
    console.log('Es ID (hash)?', /^[a-f0-9]{32}$/i.test(drueDiscType));
    console.log('Es texto legible?', /^[A-Z][+][A-Z]$/.test(drueDiscType));
    console.log('');
  } else {
    console.log('❌ Drue no encontrado\n');
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 OTROS VAs CON DISC TYPE (MUESTRA)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const discTypePatterns = {
    id: 0,
    text: 0,
    empty: 0
  };
  
  vasWithDiscType.forEach(va => {
    const discType = va.fieldData['disc-type-2'] || '';
    const isId = /^[a-f0-9]{32}$/i.test(discType);
    const isText = /^[A-Z][+][A-Z]$/.test(discType);
    
    if (isId) {
      discTypePatterns.id++;
      console.log(`   ${va.fieldData.name}: ID (${discType.substring(0, 8)}...) - NO SE MOSTRARÁ`);
    } else if (isText) {
      discTypePatterns.text++;
      console.log(`   ${va.fieldData.name}: ${discType} - SE MOSTRARÁ ✓`);
    } else if (discType === '') {
      discTypePatterns.empty++;
      console.log(`   ${va.fieldData.name}: (vacío)`);
    } else {
      console.log(`   ${va.fieldData.name}: ${discType} (formato desconocido)`);
    }
  });
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`VAs con ID (no se muestran): ${discTypePatterns.id}`);
  console.log(`VAs con texto (se muestran): ${discTypePatterns.text}`);
  console.log(`VAs vacíos: ${discTypePatterns.empty}`);
  console.log('');
  
  // Verificar la estructura del campo Option
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 ESTRUCTURA DEL CAMPO OPTION');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Intentar obtener información del campo desde la colección
  if (vaCollection.fields) {
    const discTypeField = vaCollection.fields.find(f => f.slug === 'disc-type-2');
    if (discTypeField) {
      console.log('Campo encontrado:');
      console.log('   Slug:', discTypeField.slug);
      console.log('   Tipo:', discTypeField.type);
      console.log('   Nombre:', discTypeField.displayName);
      
      if (discTypeField.type === 'Option') {
        console.log('   ⚠️  Es un campo Option');
        if (discTypeField.validations && discTypeField.validations.options) {
          console.log('   Opciones disponibles:', discTypeField.validations.options.length);
          console.log('\n   Opciones:');
          discTypeField.validations.options.forEach((opt, idx) => {
            console.log(`      ${idx + 1}. ID: ${opt.id || 'N/A'}, Nombre: ${opt.name || 'N/A'}`);
          });
          
          // Buscar la opción que corresponde al ID de Aaron
          if (aaron) {
            const aaronId = aaron.fieldData['disc-type-2'];
            const matchingOption = discTypeField.validations.options.find(opt => opt.id === aaronId);
            if (matchingOption) {
              console.log(`\n   ✅ Opción de Aaron encontrada: "${matchingOption.name}" (ID: ${matchingOption.id})`);
            } else {
              console.log(`\n   ❌ El ID de Aaron (${aaronId}) no coincide con ninguna opción disponible`);
            }
          }
        }
      }
    } else {
      console.log('⚠️  Campo disc-type-2 no encontrado en la estructura de la colección');
    }
  } else {
    console.log('⚠️  No se pudo obtener la estructura de campos de la colección');
  }
}

main().catch(console.error);
