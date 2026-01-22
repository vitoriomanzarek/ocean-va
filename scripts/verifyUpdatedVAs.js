import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;

// VAs que acabamos de actualizar
const UPDATED_VAS = [
  { name: 'Fabiola', slug: 'fabiola' },
  { name: 'Melissa', slug: 'melissa' },
  { name: 'Maria', slug: 'maria' },
  { name: 'Guillermo', slug: 'guillermo' },
  { name: 'Fernanda', slug: 'fernanda' },
  { name: 'Christine', slug: 'christine' },
  { name: 'Maria Paula', slug: 'maria-paula' }
];

// Campos que actualizamos
const FIELDS_TO_CHECK = [
  'title-2',
  'summary',
  'tagline',
  'thumbnail-description',
  'skills-richtext',
  'employment-summary',
  'employment-richtext',
  'disc-description',
  'type-of-english-test',
  'english-description',
  'english-score-3',
  'cerf-result',
  'skills-tags'
];

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

async function main() {
  console.log('🔍 Verificando estado de VAs actualizados en Webflow CMS...\n');
  
  const apiClient = new WebflowApiClient(process.env.WEBFLOW_API_TOKEN);
  
  try {
    // Obtener el sitio primero
    console.log('📥 Obteniendo sitio de Webflow...');
    const site = await apiClient.getSite(SITE_ID);
    console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
    
    // Obtener la colección de Virtual Assistants
    console.log('📥 Obteniendo colección de Virtual Assistants...');
    const collectionsResponse = await apiClient.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    
    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
    
    // Obtener todos los items
    console.log('📥 Obteniendo VAs del CMS...');
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
    
    console.log(`✅ Total VAs en CMS: ${allItems.length}\n`);
    
    const items = allItems;
    
    // Filtrar solo los VAs que actualizamos
    const updatedItems = items.filter(item => {
      const slug = item.fieldData?.slug || '';
      const name = item.fieldData?.name || '';
      return UPDATED_VAS.some(va => 
        va.slug === slug || 
        va.name.toLowerCase() === name.toLowerCase()
      );
    });
    
    console.log(`📊 VAs encontrados para verificar: ${updatedItems.length}\n`);
    console.log('═'.repeat(80));
    console.log('');
    
    let totalFieldsChecked = 0;
    let totalFieldsPopulated = 0;
    
    for (const item of updatedItems) {
      const name = item.fieldData?.name || 'Unnamed';
      const slug = item.fieldData?.slug || '';
      
      console.log(`\n📋 ${name.toUpperCase()} (${slug})`);
      console.log(`   CMS ID: ${item.id}`);
      console.log(`   Estado: ${item.isDraft ? 'Draft' : 'Published'}`);
      console.log('');
      
      // Verificar cada campo que debería haber sido actualizado
      const populatedFields = [];
      const emptyFields = [];
      
      for (const field of FIELDS_TO_CHECK) {
        const value = item.fieldData?.[field];
        const isValueEmpty = isEmpty(value);
        
        if (!isValueEmpty) {
          populatedFields.push(field);
          totalFieldsPopulated++;
        } else {
          emptyFields.push(field);
        }
        totalFieldsChecked++;
      }
      
      // Mostrar campos poblados
      if (populatedFields.length > 0) {
        console.log(`   ✅ Campos poblados (${populatedFields.length}):`);
        populatedFields.forEach(field => {
          const value = item.fieldData[field];
          let preview = '';
          if (typeof value === 'string') {
            preview = value.substring(0, 50);
            if (value.length > 50) preview += '...';
          } else if (Array.isArray(value)) {
            preview = `[${value.length} items]`;
          } else {
            preview = String(value);
          }
          console.log(`      • ${field}: ${preview}`);
        });
      }
      
      // Mostrar campos vacíos
      if (emptyFields.length > 0) {
        console.log(`   ⚠️  Campos vacíos (${emptyFields.length}):`);
        emptyFields.forEach(field => {
          console.log(`      • ${field}`);
        });
      }
      
      // Verificar DISC Type (que debería estar vacío o esperando actualización manual)
      const discType = item.fieldData?.['disc-type-2'];
      console.log('');
      if (isEmpty(discType)) {
        console.log(`   ⚠️  DISC Type: VACÍO (pendiente de actualización manual)`);
      } else {
        console.log(`   ℹ️  DISC Type: ${discType} (ya tiene valor)`);
      }
      
      console.log('');
      console.log('─'.repeat(80));
    }
    
    console.log('\n');
    console.log('═'.repeat(80));
    console.log('📊 RESUMEN GENERAL');
    console.log('═'.repeat(80));
    console.log(`   VAs verificados: ${updatedItems.length}`);
    console.log(`   Campos verificados: ${totalFieldsChecked}`);
    console.log(`   Campos poblados: ${totalFieldsPopulated}`);
    console.log(`   Campos vacíos: ${totalFieldsChecked - totalFieldsPopulated}`);
    console.log(`   Tasa de éxito: ${((totalFieldsPopulated / totalFieldsChecked) * 100).toFixed(1)}%`);
    console.log('═'.repeat(80));
    console.log('');
    
    // Verificar si hay algún VA que no encontramos
    const foundSlugs = updatedItems.map(item => item.fieldData?.slug).filter(Boolean);
    const missingVAs = UPDATED_VAS.filter(va => !foundSlugs.includes(va.slug));
    
    if (missingVAs.length > 0) {
      console.log('⚠️  VAs no encontrados en CMS:');
      missingVAs.forEach(va => {
        console.log(`   • ${va.name} (${va.slug})`);
      });
      console.log('');
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
