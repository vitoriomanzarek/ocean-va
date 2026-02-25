/**
 * Script para verificar el valor de DISC Type de Aaron en el CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando DISC Type de Aaron...\n');
  
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
  
  if (!aaron) {
    console.error('❌ Aaron no encontrado');
    return;
  }
  
  const discType = aaron.fieldData['disc-type-2'] || '';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DISC TYPE DE AARON');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log('Valor en CMS:', discType);
  console.log('Tipo:', typeof discType);
  console.log('Longitud:', discType.length);
  console.log('');
  
  // Verificar si es un ID (hash largo) o un valor de texto
  if (discType.length > 20 && /^[a-f0-9]+$/i.test(discType)) {
    console.log('⚠️  PROBLEMA DETECTADO:');
    console.log('   El valor es un ID (hash), no el texto del Option.');
    console.log('   Esto significa que el campo es un Option field y Webflow está devolviendo el ID.');
    console.log('');
    console.log('💡 SOLUCIÓN:');
    console.log('   Necesitamos obtener el valor del Option usando el ID.');
    console.log('   O cambiar el campo a Plain Text en Webflow Designer.');
    console.log('   O usar JavaScript en el template para resolver el ID a su valor.');
  } else {
    console.log('✅ El valor parece ser texto legible:', discType);
  }
  
  // Verificar la estructura del campo en la colección
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 ESTRUCTURA DEL CAMPO EN LA COLECCIÓN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const field = vaCollection.fields?.find(f => f.slug === 'disc-type-2');
  if (field) {
    console.log('Campo encontrado:');
    console.log('   Slug:', field.slug);
    console.log('   Tipo:', field.type);
    console.log('   Nombre:', field.displayName);
    if (field.type === 'Option') {
      console.log('   ⚠️  Es un campo Option');
      if (field.validations?.options) {
        console.log('   Opciones disponibles:', field.validations.options.length);
        console.log('   Primeras opciones:', field.validations.options.slice(0, 5).map(o => o.name || o.id));
      }
    }
  } else {
    console.log('⚠️  Campo no encontrado en la estructura de la colección');
  }
}

main().catch(console.error);
