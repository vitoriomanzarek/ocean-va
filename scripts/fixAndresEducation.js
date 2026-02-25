/**
 * Script para corregir Education History de Angel con coursework
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo Education History de Angel...\n');
  
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
  
  const angel = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'angel' || name.startsWith('angel ');
  });
  
  if (!angel) {
    console.error('❌ Angel no encontrado en CMS');
    return;
  }
  
  console.log('✅ Angel encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION RICHTEXT ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentEducation = angel.fieldData['education-richtext'] || '';
  console.log('HTML actual:');
  console.log(currentEducation || '(vacío)');
  console.log('\n');
  
  // Formato correcto basado en la imagen y el template dinámico
  // La estructura debe ser:
  // - va-education-school: Nombre de la universidad (blanco, bold)
  // - va-education-degree: "BACHELOR OF MARKETING AND DIGITAL MEDIA" (teal, bold)
  // - va-education-year: "2019 - 2024" (blanco, regular)
  // - va-education-period: "Relevant Coursework: ..." (blanco, regular) - usando el mismo estilo que en Angel
  
  const correctEducation = `<div class="va-education-item">
  <h3 class="va-education-school">University Name</h3>
  <p class="va-education-degree">BACHELOR OF MARKETING AND DIGITAL MEDIA</p>
  <p class="va-education-year">2019 - 2024</p>
  <p class="va-education-period" style="margin-top: 8px; font-size: 14px; color: rgba(255, 255, 255, 0.9);">Relevant Coursework: Advertising Strategy, Consumer Behavior, Web Analytics</p>
</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 FORMATO CORRECTO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(correctEducation);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, angel.id, {
      'education-richtext': correctEducation
    });
    
    console.log('✅ Education History de Angel actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Education History: Actualizado con coursework');
    console.log('   ✅ Incluye: BACHELOR OF MARKETING AND DIGITAL MEDIA');
    console.log('   ✅ Incluye: 2019 - 2024');
    console.log('   ✅ Incluye: Relevant Coursework: Advertising Strategy, Consumer Behavior, Web Analytics');
    console.log('\n   💡 El Education History ahora debería mostrarse correctamente con el coursework.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
