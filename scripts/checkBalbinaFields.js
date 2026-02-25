/**
 * Script para verificar los nombres correctos de los campos de Balbina
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando nombres de campos en el schema...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  console.log('📋 Campos disponibles en el schema:\n');
  
  if (vaCollection && vaCollection.fields) {
    const fieldNames = vaCollection.fields.map(f => ({
      slug: f.slug,
      name: f.name,
      type: f.type
    }));
    
    // Buscar campos relacionados con thumbnail, disc, etc.
    const relevantFields = fieldNames.filter(f => 
      f.slug.includes('thumbnail') || 
      f.slug.includes('disc') || 
      f.slug.includes('description') ||
      f.slug.includes('english') ||
      f.slug.includes('cerf') ||
      f.slug.includes('skills')
    );
    
    console.log('Campos relevantes encontrados:');
    relevantFields.forEach(f => {
      console.log(`  - ${f.slug} (${f.name}) - Tipo: ${f.type}`);
    });
    
    console.log('\n');
    console.log('Todos los campos:');
    fieldNames.forEach(f => {
      console.log(`  - ${f.slug} (${f.name})`);
    });
  }
}

main().catch(console.error);
