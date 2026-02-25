/**
 * Script para recargar el Employment History de Christine
 * desde el HTML minificado original (248-christine-profile.html)
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Recargando Employment History de Christine...\n');

  const htmlPath = path.join(process.cwd(), 'webflow-components-minified', '248-christine-profile.html');
  console.log(`📄 Leyendo HTML desde: ${htmlPath}\n`);

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extraer solo el bloque de employment list
  const match = html.match(/<div class="va-employment-list">([\s\S]*?)<\/div><\/div><\/section>/);

  if (!match) {
    console.error('❌ No se pudo extraer el bloque de employment list de Christine');
    return;
  }

  const employmentInner = match[1];
  const employmentHTML = `<div class="va-employment-list">${employmentInner}</div>`;

  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EMPLOYMENT LIST EXTRAÍDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(employmentHTML.substring(0, 500) + (employmentHTML.length > 500 ? '...' : ''));
  console.log('\n');

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

  const christine = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name === 'christine' || slug === 'christine';
  });

  if (!christine) {
    console.error('❌ Christine no encontrada en la colección de Virtual Assistants');
    return;
  }

  console.log('✅ Christine encontrada en CMS\n');

  const currentEmployment = christine.fieldData['employment-richtext'] || '';

  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EMPLOYMENT RICHTEXT ACTUAL (primeros 400 chars)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(currentEmployment.substring(0, 400) + (currentEmployment.length > 400 ? '...' : ''));
  console.log('\n');

  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, christine.id, {
      'employment-richtext': employmentHTML
    });

    console.log('✅ Employment History de Christine actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Employment History: Recargado desde 248-christine-profile.html');
    console.log('   ✅ Estructura: <div class="va-employment-list"> con accordions internos\n');
    console.log('   💡 El dropdown de Employment History debería mostrarse ahora con el contenido y estilos correctos.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }

  console.log();
}

main().catch(console.error);

