/**
 * Script para corregir la estructura de Education History de Angel
 * Estructura correcta:
 * - Título: BACHELOR OF MARKETING AND DIGITAL MEDIA (va-education-degree)
 * - Subtítulo: Relevant Coursework: ... (va-education-period)
 * - Año: 2019 - 2024 (va-education-year)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo estructura de Education History de Angel...\n');
  
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
  
  // Estructura correcta según el usuario:
  // - va-education-school: Nombre de la universidad (necesitamos obtenerlo)
  // - va-education-degree: BACHELOR OF MARKETING AND DIGITAL MEDIA (título)
  // - va-education-period: Relevant Coursework: ... (subtítulo)
  // - va-education-year: 2019 - 2024 (año)
  
  // Por ahora, voy a buscar si hay información de la universidad en otros campos
  // o dejar un placeholder que el usuario pueda corregir
  
  // Basándome en el template, el nombre de la universidad debería ir en va-education-school
  // Pero no tengo esa información. Voy a usar una estructura sin el nombre de la universidad
  // o buscar en el HTML original
  
  // Revisando el HTML original, no había nombre de universidad específico
  // El usuario mencionó que debe ir el nombre de la universidad, pero no lo especificó
  // Voy a crear la estructura sin el nombre de la universidad por ahora, o usar un placeholder
  
  // Estructura según lo que el usuario pidió:
  // - Título: BACHELOR OF MARKETING AND DIGITAL MEDIA (va-education-degree, color teal)
  // - Subtítulo: Relevant Coursework: ... (va-education-period, blanco)
  // - Año: 2019 - 2024 (va-education-year, blanco)
  
  // Nota: El nombre de la universidad debería ir en va-education-school, pero no lo tenemos
  // Por ahora, voy a omitirlo o usar un placeholder que el usuario pueda corregir
  
  const correctEducation = `<div class="va-education-item">
  <p class="va-education-degree">BACHELOR OF MARKETING AND DIGITAL MEDIA</p>
  <p class="va-education-period" style="margin-top: 8px; font-size: 14px; color: rgba(255, 255, 255, 0.9);">Relevant Coursework: Advertising Strategy, Consumer Behavior, Web Analytics</p>
  <p class="va-education-year">2019 - 2024</p>
</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 FORMATO CORRECTO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(correctEducation);
  console.log('\n');
  console.log('⚠️  NOTA: El nombre de la universidad no está incluido. Si necesitas agregarlo,');
  console.log('   debería ir en un elemento <h3 class="va-education-school">Nombre Universidad</h3>');
  console.log('   antes del va-education-degree.\n');
  
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
    console.log('   ✅ Título: BACHELOR OF MARKETING AND DIGITAL MEDIA (va-education-degree)');
    console.log('   ✅ Subtítulo: Relevant Coursework: ... (va-education-period)');
    console.log('   ✅ Año: 2019 - 2024 (va-education-year)');
    console.log('\n   💡 El Education History ahora debería mostrarse con la estructura correcta.');
    console.log('   ⚠️  Si necesitas agregar el nombre de la universidad, avísame y lo agrego.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
