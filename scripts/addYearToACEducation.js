/**
 * Script para agregar el año 2023 a Education de AC
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Agregando año 2023 a Education de AC...\n');
  
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
  
  const ac = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'ac');
  
  if (!ac) {
    console.error('❌ AC no encontrado');
    return;
  }
  
  const currentEducation = ac.fieldData['education-richtext'] || '';
  
  console.log('Education actual:');
  console.log(currentEducation);
  console.log('');
  
  // Buscar el item de education y agregar el año
  // El formato debería ser:
  // <div class="va-education-item">
  //   <h3 class="va-education-school">JP MORGAN CHASE</h3>
  //   <p class="va-education-degree">Home Lending Onboarding Program</p>
  //   <p class="va-education-year"></p>  <- Aquí está vacío, necesitamos agregar 2023
  // </div>
  
  const updatedEducation = currentEducation.replace(
    /<p class="va-education-year"><\/p>/,
    '<p class="va-education-year">2023</p>'
  );
  
  if (updatedEducation === currentEducation) {
    console.log('⚠️  No se encontró el campo va-education-year vacío. Buscando otra estructura...\n');
    
    // Intentar otra estructura
    const updatedEducation2 = currentEducation.replace(
      /<p class="va-education-year">\s*<\/p>/,
      '<p class="va-education-year">2023</p>'
    );
    
    if (updatedEducation2 !== currentEducation) {
      console.log('✅ Año agregado (segunda estructura)\n');
      await apiClient.updateCollectionItem(vaCollection.id, ac.id, {
        'education-richtext': updatedEducation2
      });
      console.log('✅ AC actualizado exitosamente\n');
      console.log('Education actualizado:');
      console.log(updatedEducation2);
    } else {
      console.log('❌ No se pudo encontrar el campo para actualizar');
      console.log('Estructura actual:');
      console.log(currentEducation);
    }
  } else {
    console.log('✅ Año agregado\n');
    await apiClient.updateCollectionItem(vaCollection.id, ac.id, {
      'education-richtext': updatedEducation
    });
    console.log('✅ AC actualizado exitosamente\n');
    console.log('Education actualizado:');
    console.log(updatedEducation);
  }
}

main().catch(console.error);
