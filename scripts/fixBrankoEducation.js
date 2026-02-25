/**
 * Script para corregir el formato de Education de Branko
 * Asegurar que el año tenga el estilo correcto
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo formato de Education de Branko...\n');
  
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
  
  const branko = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'branko' || name.startsWith('branko ');
  });
  
  if (!branko) {
    console.error('❌ Branko no encontrado en CMS');
    return;
  }
  
  console.log('✅ Branko encontrado en CMS\n');
  
  // Education corregido con ambos items y año con estilo correcto
  // El año debe estar en <p class="va-education-year"> según el template
  const correctEducation = `<div class="va-education-item">
  <h3 class="va-education-school">Universidad de Los Andes Mérida, Venezuela</h3>
  <p class="va-education-degree">Business Administration</p>
  <p class="va-education-year">2013</p>
</div>
<div class="va-education-item">
  <h3 class="va-education-school">Universidad de Los Andes Mérida, Venezuela</h3>
  <p class="va-education-degree">Fundaidiomas - Level O to VI – Language English</p>
  <p class="va-education-year">2012</p>
</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION CORREGIDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(correctEducation);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, branko.id, {
      'education-richtext': correctEducation
    });
    
    console.log('✅ Education de Branko actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Education: Corregido con ambos items');
    console.log('   ✅ Item 1: Business Administration (2013)');
    console.log('   ✅ Item 2: Fundaidiomas - Level O to VI – Language English (2012)');
    console.log('   ✅ Años con estilo correcto: <p class="va-education-year">');
    console.log('\n   💡 El Education ahora debería mostrarse correctamente con los estilos aplicados.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
