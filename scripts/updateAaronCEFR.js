/**
 * Script para actualizar la tabla CEFR de Aaron a C2
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// HTML correcto para CEFR con C2 activo
const CEFR_C2_HTML = `<div class="va-cefr-grid">

        <div class="va-cefr-item">
          <div class="va-cefr-bubble va-cefr-bubble-inactive">A1</div>
          <p class="va-cefr-description">Can understand and use familiar everyday expressions and basic questions about personal details.</p>
        </div>

        <div class="va-cefr-item">
          <div class="va-cefr-bubble va-cefr-bubble-inactive">A2</div>
          <p class="va-cefr-description">Can have very short social exchanges and give information on familiar and routine matters when traveling.</p>
        </div>

        <div class="va-cefr-item">
          <div class="va-cefr-bubble va-cefr-bubble-inactive">B1</div>
          <p class="va-cefr-description">Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.</p>
        </div>

        <div class="va-cefr-item">
          <div class="va-cefr-bubble va-cefr-bubble-inactive">B2</div>
          <p class="va-cefr-description">Can communicate confidently in a variety of academic and professional environments.</p>
        </div>

        <div class="va-cefr-item">
          <div class="va-cefr-bubble va-cefr-bubble-inactive">C1</div>
          <p class="va-cefr-description">Can use the language flexibly and effectively for social, academic and professional purposes.</p>
        </div>

        <div class="va-cefr-item">
          <div class="va-cefr-bubble va-cefr-bubble-active">C2</div>
          <p class="va-cefr-description">Can understand with ease virtually everything heard or read and can summarize information from different sources.</p>
        </div>
      </div>`;

async function main() {
  console.log('🔧 Actualizando tabla CEFR de Aaron a C2...\n');
  
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
  
  const aaron = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'aaron-a0d16' || (v.fieldData.name || '').toLowerCase() === 'aaron');
  
  if (!aaron) {
    console.error('❌ Aaron no encontrado');
    return;
  }
  
  const currentCefr = aaron.fieldData['cerf-result'] || '';
  
  console.log('CEFR actual:');
  console.log(currentCefr.substring(0, 200) + '...\n');
  
  console.log('Actualizando a C2...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, aaron.id, {
      'cerf-result': CEFR_C2_HTML
    });
    
    console.log('✅ CEFR de Aaron actualizado exitosamente a C2\n');
    console.log('Nuevo CEFR (primeros 300 caracteres):');
    console.log(CEFR_C2_HTML.substring(0, 300) + '...\n');
    console.log('✅ C2 está marcado como activo (va-cefr-bubble-active)');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }
}

main().catch(console.error);
