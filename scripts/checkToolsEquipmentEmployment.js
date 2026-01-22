import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;

// VAs a verificar
const VAS_TO_CHECK = ['moises', 'jerome'];

async function main() {
  console.log('🔍 Verificando Tools, Equipment y Employment History en CMS...\n');
  
  const apiClient = new WebflowApiClient(process.env.WEBFLOW_API_TOKEN);
  
  try {
    // Obtener el sitio
    const site = await apiClient.getSite(SITE_ID);
    console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
    
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
    
    // Filtrar VAs a verificar
    const itemsToCheck = allItems.filter(item => {
      const slug = item.fieldData?.slug || '';
      return VAS_TO_CHECK.includes(slug.toLowerCase());
    });
    
    console.log(`📊 VAs encontrados: ${itemsToCheck.length}\n`);
    console.log('═'.repeat(80));
    console.log('');
    
    for (const item of itemsToCheck) {
      const name = item.fieldData?.name || 'Unnamed';
      const slug = item.fieldData?.slug || '';
      
      console.log(`\n📋 ${name.toUpperCase()} (${slug})`);
      console.log(`   CMS ID: ${item.id}`);
      console.log('');
      
      // Verificar Tools Richtext
      const toolsRichtext = item.fieldData?.['tools-richtext'] || '';
      console.log(`🔧 TOOLS RICHTEXT:`);
      if (!toolsRichtext || toolsRichtext.trim() === '') {
        console.log(`   ❌ VACÍO`);
      } else {
        const preview = toolsRichtext.substring(0, 200);
        console.log(`   ✅ Tiene contenido (${toolsRichtext.length} caracteres)`);
        console.log(`   Preview: ${preview}...`);
        // Verificar si tiene la estructura HTML correcta
        if (toolsRichtext.includes('va-tool-item')) {
          console.log(`   ✅ Contiene estructura HTML correcta (va-tool-item)`);
        } else {
          console.log(`   ⚠️  NO contiene estructura HTML esperada (va-tool-item)`);
        }
      }
      console.log('');
      
      // Verificar Equipment Richtext
      const equipmentRichtext = item.fieldData?.['equipment-richtext'] || '';
      console.log(`⚙️  EQUIPMENT RICHTEXT:`);
      if (!equipmentRichtext || equipmentRichtext.trim() === '') {
        console.log(`   ❌ VACÍO`);
      } else {
        const preview = equipmentRichtext.substring(0, 200);
        console.log(`   ✅ Tiene contenido (${equipmentRichtext.length} caracteres)`);
        console.log(`   Preview: ${preview}...`);
        // Verificar si tiene la estructura HTML correcta
        if (equipmentRichtext.includes('va-equipment-item')) {
          console.log(`   ✅ Contiene estructura HTML correcta (va-equipment-item)`);
        } else {
          console.log(`   ⚠️  NO contiene estructura HTML esperada (va-equipment-item)`);
        }
      }
      console.log('');
      
      // Verificar Employment Richtext
      const employmentRichtext = item.fieldData?.['employment-richtext'] || '';
      console.log(`💼 EMPLOYMENT RICHTEXT:`);
      if (!employmentRichtext || employmentRichtext.trim() === '') {
        console.log(`   ❌ VACÍO`);
      } else {
        const preview = employmentRichtext.substring(0, 300);
        console.log(`   ✅ Tiene contenido (${employmentRichtext.length} caracteres)`);
        console.log(`   Preview: ${preview}...`);
        // Verificar si tiene la estructura HTML correcta
        if (employmentRichtext.includes('va-employment-accordion')) {
          console.log(`   ✅ Contiene estructura HTML correcta (va-employment-accordion)`);
        } else {
          console.log(`   ⚠️  NO contiene estructura HTML esperada (va-employment-accordion)`);
        }
        // Verificar clases específicas
        const hasHeader = employmentRichtext.includes('va-employment-accordion-header');
        const hasIcon = employmentRichtext.includes('va-employment-accordion-icon');
        const hasContent = employmentRichtext.includes('va-employment-accordion-content');
        console.log(`   Estructura: header=${hasHeader}, icon=${hasIcon}, content=${hasContent}`);
      }
      
      console.log('');
      console.log('─'.repeat(80));
    }
    
    console.log('\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Detalles:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
