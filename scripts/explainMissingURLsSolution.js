/**
 * Script para explicar el problema y las soluciones
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

const missingSlugs = [
  'aaron-a0d16',
  'karl-bd0a3',
  'bernadette-abellana',
  'vicente-penaflor',
  'louise-a-siloterio',
  'ximena-4e77d',
  'grace',
  'maria-d',
  'ellen',
  'brandon',
  'ana',
  'rona',
  'joji',
  'jay',
  'cherry'
];

async function main() {
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 DIAGNÓSTICO DEL PROBLEMA');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('PROBLEMA IDENTIFICADO:');
  console.log('   Estos 15 VAs NO están en el CSV carga-vas-2026.csv');
  console.log('   Por eso el script no puede encontrar sus URLs para extraer Tools/Equipment\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener todos los VAs del CMS
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
  
  console.log('VERIFICANDO EN CMS:');
  console.log(`   Total VAs en CMS: ${allVAs.length}\n`);
  
  const foundInCMS = [];
  const notFoundInCMS = [];
  
  missingSlugs.forEach(slug => {
    const va = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === slug.toLowerCase());
    if (va) {
      foundInCMS.push({
        slug,
        name: va.fieldData.name || 'Sin nombre',
        cmsId: va.id
      });
    } else {
      notFoundInCMS.push(slug);
    }
  });
  
  console.log(`✅ VAs encontrados en CMS: ${foundInCMS.length}`);
  foundInCMS.forEach(va => {
    console.log(`   - ${va.name} (${va.slug})`);
  });
  
  if (notFoundInCMS.length > 0) {
    console.log(`\n❌ VAs NO encontrados en CMS: ${notFoundInCMS.length}`);
    notFoundInCMS.forEach(slug => {
      console.log(`   - ${slug}`);
    });
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 SOLUCIONES POSIBLES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('OPCIÓN 1: Agregar URLs al CSV (RECOMENDADO)');
  console.log('   - Abrir carga-vas-2026.csv');
  console.log('   - Agregar una fila para cada VA con:');
  console.log('     * slug: el slug del VA');
  console.log('     * profile-slug-2: la URL completa de la página del VA');
  console.log('   - Ejemplo:');
  console.log('     slug,profile-slug-2');
  console.log('     aaron-a0d16,https://oceanvirtualassistant.com/vas/aaron-a0d16');
  console.log('   - Luego re-ejecutar: node scripts/extractMissingDataForReview.js\n');
  
  console.log('OPCIÓN 2: Construir URLs automáticamente');
  console.log('   - Si las URLs siguen un patrón estándar, puedo modificar el script');
  console.log('   - Ejemplo: https://oceanvirtualassistant.com/vas/{slug}');
  console.log('   - El script intentaría construir la URL automáticamente\n');
  
  console.log('OPCIÓN 3: Extraer desde páginas web actuales');
  console.log('   - Si estos VAs ya tienen páginas en Webflow, puedo extraer desde ahí');
  console.log('   - URL base: https://oceanvirtualassistant.com/ovas-current-vas/{slug}');
  console.log('   - Modificar el script para usar esta URL base\n');
  
  console.log('OPCIÓN 4: Extracción manual');
  console.log('   - Visitar cada página manualmente');
  console.log('   - Copiar Tools/Equipment');
  console.log('   - Actualizar en Webflow CMS manualmente\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🎯 RECOMENDACIÓN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('1. Verificar si estos VAs tienen páginas web activas');
  console.log('2. Si tienen páginas, usar OPCIÓN 2 o 3 (construir URLs automáticamente)');
  console.log('3. Si no tienen páginas, usar OPCIÓN 1 (agregar URLs al CSV)');
  console.log('4. Si prefieres, puedo modificar el script para intentar múltiples fuentes de URLs\n');
}

main().catch(console.error);
