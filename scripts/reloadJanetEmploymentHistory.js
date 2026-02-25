/**
 * Script para recargar el Employment History de Janet desde su HTML original
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Recargando Employment History de Janet...\n');
  
  // Leer el HTML minificado
  const htmlPath = path.join(__dirname, '..', 'webflow-components-minified', '214-janet-profile.html');
  console.log(`📄 Leyendo HTML desde: ${htmlPath}\n`);
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Archivo no encontrado: ${htmlPath}`);
    return;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extraer el employment list completo
  const employmentListMatch = html.match(/<div class="va-employment-list">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  
  if (!employmentListMatch) {
    console.error('❌ No se encontró el employment list en el HTML');
    return;
  }
  
  const employmentListHTML = `<div class="va-employment-list">${employmentListMatch[1]}</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EMPLOYMENT LIST EXTRAÍDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(employmentListHTML.substring(0, 500) + '...\n');
  
  // Conectar con Webflow API
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
  
  const janet = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'janet' || name.includes('janet');
  });
  
  if (!janet) {
    console.error('❌ Janet no encontrado en CMS');
    return;
  }
  
  console.log('✅ Janet encontrado en CMS\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EMPLOYMENT RICHTEXT ACTUAL (primeros 400 chars)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  const currentEmployment = janet.fieldData['employment-richtext'] || '';
  console.log(currentEmployment.substring(0, 400) + (currentEmployment.length > 400 ? '...' : '') + '\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, janet.id, {
      'employment-richtext': employmentListHTML
    });
    
    console.log('✅ Employment History de Janet actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Employment History: Recargado desde 214-janet-profile.html');
    console.log('   ✅ Estructura: <div class="va-employment-list"> con accordions internos');
    console.log('   ✅ Incluye todos los trabajos con descripciones completas');
    console.log('\n   💡 El dropdown de Employment History debería mostrarse ahora con el contenido y estilos correctos.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
