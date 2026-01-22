import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const ANGEL_ITEM_ID = '69260eeb002e11654a362d68';

// Función para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function main() {
  const apiClient = new WebflowApiClient(process.env.WEBFLOW_API_TOKEN);
  
  try {
    const site = await apiClient.getSite(SITE_ID);
    const collectionsResponse = await apiClient.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    // Obtener Angel
    const angel = await apiClient.getCollectionItem(vaCollection.id, ANGEL_ITEM_ID);
    const oldHTML = angel.fieldData?.['employment-richtext'] || '';
    
    console.log('📋 Datos originales (JSON):');
    console.log(oldHTML);
    console.log('');
    
    // Parsear JSON
    const jsonData = JSON.parse(oldHTML);
    console.log('📊 Entradas JSON:');
    jsonData.forEach((entry, i) => {
      console.log(`  ${i + 1}. ${entry.company} - ${entry.position}`);
    });
    console.log('');
    
    // Convertir a HTML
    const accordions = jsonData.map(entry => {
      const company = escapeHtml(entry.company || '');
      const position = escapeHtml(entry.position || '');
      const period = escapeHtml(entry.period || '');
      let description = entry.description || '';
      description = escapeHtml(description).replace(/\n/g, '<br>');
      
      return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
    }).join('');
    
    console.log('🔧 HTML generado:');
    console.log(accordions.substring(0, 200) + '...');
    console.log('');
    console.log(`   Longitud: ${accordions.length} caracteres`);
    console.log('');
    
    // Intentar actualizar
    console.log('🔄 Intentando actualizar...');
    const fieldData = {
      'employment-richtext': accordions
    };
    
    try {
      await apiClient.updateCollectionItem(vaCollection.id, ANGEL_ITEM_ID, fieldData);
      console.log('✅ Actualizado exitosamente!');
    } catch (error) {
      console.error('❌ Error:', error.message);
      if (error.response) {
        console.error('   Response:', JSON.stringify(error.response, null, 2));
        if (error.response.details && Array.isArray(error.response.details)) {
          console.error('   Detalles:');
          error.response.details.forEach(detail => {
            console.error(`     - Campo: ${detail.param || 'unknown'}`);
            console.error(`     - Error: ${detail.description || detail.message || 'unknown'}`);
          });
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
