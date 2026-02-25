/**
 * Script para verificar y corregir Education History de Andres
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando Education History de Andres...\n');
  
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
  
  const andres = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'andres' || name.startsWith('andres ');
  });
  
  if (!andres) {
    console.error('❌ Andres no encontrado en CMS');
    return;
  }
  
  console.log('✅ Andres encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION RICHTEXT ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentEducation = andres.fieldData['education-richtext'] || '';
  console.log('HTML completo:');
  console.log(currentEducation);
  console.log('\n');
  
  // El formato correcto debería ser:
  // <div class="va-education-item">
  //   <h3 class="va-education-school">School Name</h3>
  //   <p class="va-education-degree">BACHELOR OF MARKETING AND DIGITAL MEDIA</p>
  //   <p class="va-education-year">2019 - 2024</p>
  //   <p class="va-education-coursework">Relevant Coursework: Advertising Strategy, Consumer Behavior, Web Analytics</p>
  // </div>
  
  const correctEducation = `<div class="va-education-item">
  <h3 class="va-education-school">University Name</h3>
  <p class="va-education-degree">BACHELOR OF MARKETING AND DIGITAL MEDIA</p>
  <p class="va-education-year">2019 - 2024</p>
  <p class="va-education-coursework">Relevant Coursework: Advertising Strategy, Consumer Behavior, Web Analytics</p>
</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 FORMATO CORRECTO ESPERADO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(correctEducation);
  console.log('\n');
  
  // Verificar si tiene coursework
  const hasCoursework = currentEducation.includes('Relevant Coursework') || currentEducation.includes('coursework');
  console.log(`¿Tiene coursework?: ${hasCoursework ? '✅ Sí' : '❌ No'}\n`);
}

main().catch(console.error);
