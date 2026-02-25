/**
 * Script para verificar qué campos existen realmente en el CMS
 * Revisando otros VAs para ver qué nombres de campos usan
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando nombres de campos en el CMS...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener algunos VAs de ejemplo
  const response = await apiClient.getCollectionItems(vaCollection.id, { limit: 10 });
  const sampleVAs = response.items || [];
  
  if (sampleVAs.length === 0) {
    console.error('❌ No se encontraron VAs');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 CAMPOS DISPONIBLES EN EL CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Obtener todos los campos únicos de los VAs
  const allFields = new Set();
  sampleVAs.forEach(va => {
    Object.keys(va.fieldData).forEach(field => allFields.add(field));
  });
  
  const sortedFields = Array.from(allFields).sort();
  
  console.log(`Total de campos encontrados: ${sortedFields.length}\n`);
  sortedFields.forEach(field => {
    console.log(`   - ${field}`);
  });
  
  // Buscar campos relacionados con lo que necesitamos
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 BÚSQUEDA DE CAMPOS ESPECÍFICOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const searchTerms = ['language', 'title', 'tool', 'equipment', 'skill', 'english', 'test', 'level'];
  
  searchTerms.forEach(term => {
    const matchingFields = sortedFields.filter(f => f.toLowerCase().includes(term.toLowerCase()));
    if (matchingFields.length > 0) {
      console.log(`Campos con "${term}":`);
      matchingFields.forEach(field => {
        // Mostrar un ejemplo de valor
        const exampleVA = sampleVAs.find(v => v.fieldData[field]);
        const exampleValue = exampleVA ? (typeof exampleVA.fieldData[field] === 'string' ? exampleVA.fieldData[field].substring(0, 50) : String(exampleVA.fieldData[field])) : 'N/A';
        console.log(`   - ${field} (ejemplo: ${exampleValue}${typeof exampleValue === 'string' && exampleValue.length > 50 ? '...' : ''})`);
      });
      console.log('');
    }
  });
  
  // Verificar Arlene específicamente
  const arlene = sampleVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'arlene');
  if (arlene) {
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 ARLENE - CAMPOS CON VALORES');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    
    Object.keys(arlene.fieldData).forEach(field => {
      const value = arlene.fieldData[field];
      if (value && value !== '' && (typeof value !== 'string' || value.trim() !== '')) {
        const preview = typeof value === 'string' ? value.substring(0, 80) : String(value);
        console.log(`   ${field}: ${preview}${typeof value === 'string' && value.length > 80 ? '...' : ''}`);
      }
    });
  }
}

main().catch(console.error);
