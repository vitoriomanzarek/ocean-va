/**
 * Script para consultar todas las opciones disponibles de DISC Type en Webflow
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Consultando opciones de DISC Type en Webflow CMS...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  if (!vaCollection) {
    console.error('❌ Collection "Virtual Assistants" no encontrada');
    return;
  }
  
  console.log(`✅ Collection encontrada: ${vaCollection.name} (${vaCollection.id})\n`);
  
  // Obtener el schema completo de la colección
  const collectionSchema = await apiClient.getCollection(vaCollection.id);
  
  // Buscar el campo disc-type-2
  const discField = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
  
  if (!discField) {
    console.error('❌ Campo "disc-type-2" no encontrado');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 OPCIONES DE DISC TYPE EN WEBFLOW CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (discField.type !== 'Option') {
    console.error(`❌ El campo disc-type-2 no es de tipo Option, es: ${discField.type}`);
    return;
  }
  
  if (!discField.validations || !discField.validations.options) {
    console.error('❌ No se encontraron opciones en el campo');
    return;
  }
  
  const options = discField.validations.options;
  console.log(`Total de opciones: ${options.length}\n`);
  
  options.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt.displayName || opt.name} (ID: ${opt.id})`);
  });
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 LISTA PARA EL FORM (en orden alfabético)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const sortedOptions = [...options].sort((a, b) => {
    const nameA = (a.displayName || a.name || '').toUpperCase();
    const nameB = (b.displayName || b.name || '').toUpperCase();
    return nameA.localeCompare(nameB);
  });
  
  sortedOptions.forEach(opt => {
    const name = opt.displayName || opt.name;
    console.log(`  <option value="${name}">${name}</option>`);
  });
  
  console.log('\n✅ Consulta completada\n');
}

main().catch(console.error);
