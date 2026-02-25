/**
 * Script para corregir el Employment Summary de Ana
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo Employment Summary de Ana...\n');
  
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
  
  const ana = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'ana' || name.startsWith('ana ');
  });
  
  if (!ana) {
    console.error('❌ Ana no encontrado en CMS');
    return;
  }
  
  console.log('✅ Ana encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALOR ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentSummary = ana.fieldData['employment-summary'] || '';
  console.log(`Campo: employment-summary`);
  console.log(`Longitud: ${currentSummary.length} caracteres`);
  console.log(`Contenido actual (primeros 200 chars):`);
  console.log(`${currentSummary.substring(0, 200)}...\n`);
  
  const correctSummary = `Ana is a customer-centric administrative professional with 4 years of Executive Assistant-level experience gained while supporting senior management and coordinating operations at Hilton Dublin Hotel, Gibson Hotel, and Smart Fit Dublin. At Gibson Hotel, she managed end-to-end reservations, maintained the sales/events calendar, and improved workflows by adopting new software. At Hilton Dublin, she aligned front-office operations with leadership objectives, handling check-ins/outs, escalations, and cross-department coordination. Earlier at Smart Fit Dublin, she produced detailed sales reports, reconciled accounts, managed payments, and strengthened customer relationships. Previously at AMEX Assurance, she assessed claims with accuracy, compliance, and on-time delivery. Her strengths include project management, executive support, calendar management, stakeholder communication, cross-cultural rapport, process control, multitasking under pressure, and high digital fluency.`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALOR CORRECTO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Campo: employment-summary`);
  console.log(`Longitud: ${correctSummary.length} caracteres`);
  console.log(`Contenido correcto (primeros 200 chars):`);
  console.log(`${correctSummary.substring(0, 200)}...\n`);
  
  if (currentSummary === correctSummary) {
    console.log('✅ El Employment Summary ya está correcto. No se requiere actualización.');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, ana.id, {
      'employment-summary': correctSummary
    });
    
    console.log('✅ Employment Summary actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   Campo actualizado: employment-summary`);
    console.log(`   Longitud anterior: ${currentSummary.length} caracteres`);
    console.log(`   Longitud nueva: ${correctSummary.length} caracteres`);
    console.log(`   Diferencia: ${correctSummary.length - currentSummary.length} caracteres`);
    console.log('\n   💡 El Employment Summary ahora debería mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
