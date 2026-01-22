import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;

async function main() {
  console.log('🔍 Verificando Employment History de Angel...\n');
  
  const apiClient = new WebflowApiClient(process.env.WEBFLOW_API_TOKEN);
  
  try {
    // Obtener el sitio
    const site = await apiClient.getSite(SITE_ID);
    
    // Obtener la colección
    const collectionsResponse = await apiClient.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    
    // Obtener todos los items
    let allItems = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const response = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
      if (!response.items || response.items.length === 0) break;
      allItems = allItems.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }
    
    // Buscar Angel
    const angel = allItems.find(item => {
      const slug = item.fieldData?.slug || '';
      const name = item.fieldData?.name || '';
      return slug.toLowerCase() === 'angel' || name.toLowerCase() === 'angel';
    });
    
    if (!angel) {
      console.error('❌ Angel no encontrado en CMS');
      process.exit(1);
    }
    
    console.log(`📋 ${angel.fieldData?.name?.toUpperCase()} (${angel.fieldData?.slug})`);
    console.log(`   CMS ID: ${angel.id}`);
    console.log('');
    
    const employmentRichtext = angel.fieldData?.['employment-richtext'] || '';
    
    console.log(`💼 EMPLOYMENT RICHTEXT:`);
    console.log(`   Longitud: ${employmentRichtext.length} caracteres`);
    console.log('');
    console.log(`   CONTENIDO COMPLETO:`);
    console.log('─'.repeat(80));
    console.log(employmentRichtext);
    console.log('─'.repeat(80));
    console.log('');
    
    // Verificar formato
    if (employmentRichtext.trim().startsWith('[') && employmentRichtext.trim().endsWith(']')) {
      console.log(`   ⚠️  FORMATO DETECTADO: JSON (necesita conversión)`);
      
      try {
        const jsonData = JSON.parse(employmentRichtext);
        console.log(`   ✅ Es JSON válido`);
        console.log(`   📊 Entradas: ${jsonData.length}`);
        console.log('');
        jsonData.forEach((entry, index) => {
          console.log(`   Entrada ${index + 1}:`);
          console.log(`      Company: ${entry.company || '(vacío)'}`);
          console.log(`      Position: ${entry.position || '(vacío)'}`);
          console.log(`      Period: ${entry.period || '(vacío)'}`);
          console.log(`      Description: ${entry.description ? entry.description.substring(0, 50) + '...' : '(vacío)'}`);
        });
      } catch (e) {
        console.log(`   ❌ Error al parsear JSON: ${e.message}`);
      }
    } else if (employmentRichtext.includes('va-employment-accordion')) {
      console.log(`   ✅ FORMATO DETECTADO: HTML con accordions (correcto)`);
    } else if (employmentRichtext.includes('<ul>') || employmentRichtext.includes('<li>')) {
      console.log(`   ⚠️  FORMATO DETECTADO: HTML antiguo (<ul><li>)`);
    } else {
      console.log(`   ⚠️  FORMATO DETECTADO: Desconocido o vacío`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Detalles:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
