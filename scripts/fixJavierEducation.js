/**
 * Script para corregir el education de Javier
 * Eliminar fecha duplicada
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo education de Javier...\n');
  
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
  
  const javier = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'javier' || name.startsWith('javier ');
  });
  
  if (!javier) {
    console.error('❌ Javier no encontrado en CMS');
    return;
  }
  
  console.log('✅ Javier encontrado en CMS\n');
  
  // Verificar education actual
  const currentEducation = javier.fieldData['education-richtext'] || '';
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log('Contenido actual:');
  console.log(currentEducation);
  console.log('\n');
  
  // Corregir el education: el problema es que tiene la fecha duplicada
  // En el HTML original, la fecha está en el degree, pero en el CMS está duplicada en degree y year
  // Según el template, el year debe tener la fecha y el degree debe tener el nombre del grado
  // Como no tenemos el nombre del grado, dejaremos el degree vacío y la fecha solo en el year
  
  const schoolMatch = currentEducation.match(/<h3[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h3>/);
  const degreeMatch = currentEducation.match(/<p[^>]*class="[^"]*va-education-degree[^"]*"[^>]*>([^<]+)<\/p>/);
  const yearMatch = currentEducation.match(/<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)<\/p>/);
  
  let school = schoolMatch ? schoolMatch[1].trim() : '';
  let year = '';
  
  // Si el degree tiene la fecha, usarla para el year
  if (degreeMatch) {
    const degreeContent = degreeMatch[1].trim();
    // Si el degree contiene una fecha (formato 2016 - 2022 o similar)
    if (/\d{4}/.test(degreeContent)) {
      year = degreeContent;
    }
  }
  
  // Si también hay un year, usar ese (pero solo uno)
  if (yearMatch) {
    year = yearMatch[1].trim();
  }
  
  // Si no encontramos año, usar el del degree
  if (!year && degreeMatch && /\d{4}/.test(degreeMatch[1].trim())) {
    year = degreeMatch[1].trim();
  }
  
  // Construir el HTML correcto: school, degree vacío (o placeholder), y year con la fecha
  const correctEducation = `<div class="va-education-item">
  <h3 class="va-education-school">${school}</h3>
  <p class="va-education-degree"></p>
  <p class="va-education-year">${year}</p>
</div>`;
  
  console.log('✅ Education corregido (fecha duplicada eliminada):');
  console.log(correctEducation);
  console.log('\n');
  
  if (correctEducation === currentEducation) {
    console.log('✅ El education ya está correcto, no necesita corrección.\n');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, javier.id, {
      'education-richtext': correctEducation
    });
    
    console.log('✅ Education de Javier actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Education: Corregido');
    console.log('   ✅ Fecha duplicada eliminada');
    console.log('   ✅ Solo contiene una fecha en va-education-year');
    console.log('\n   💡 El Education ahora debería mostrarse correctamente sin fecha duplicada.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
