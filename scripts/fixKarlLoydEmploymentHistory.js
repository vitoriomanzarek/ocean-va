/**
 * Script para recargar Employment History de Karl Loyd
 * usando el HTML minificado del template viejo.
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo Employment History de Karl Loyd...\n');

  const htmlPath = path.join(__dirname, '..', 'webflow-components-minified', '307-karl-profile.html');

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ No se encontró el archivo HTML: ${htmlPath}`);
    return;
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Extraer Employment List completo (accordion)
  const employmentMatch = html.match(/<div class="va-employment-list">([\s\S]*?)<\/div><\/div><\/section>/);

  if (!employmentMatch) {
    console.error('❌ No se encontró el bloque de va-employment-list en el HTML');
    return;
  }

  const employmentListHTML = `<div class="va-employment-list">${employmentMatch[1]}</div>`;

  console.log('════════ EMPLOYMENT LIST (preview) ════════\n');
  console.log(employmentListHTML.substring(0, 500) + (employmentListHTML.length > 500 ? '...\n' : '\n'));

  // Conectar con Webflow
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');

  if (!vaCollection) {
    console.error('❌ Colección "virtual-assistants" no encontrada');
    return;
  }

  let allVAs = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
    if (!res.items || res.items.length === 0) break;
    allVAs = allVAs.concat(res.items);
    if (res.items.length < limit) break;
    offset += limit;
  }

  const karlLoyd = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name.includes('karl loyd') || slug.includes('karl-loyd');
  });

  if (!karlLoyd) {
    console.error('❌ No se encontró a Karl Loyd en la colección de VAs');
    return;
  }

  console.log(`✅ Karl Loyd encontrado: ${karlLoyd.fieldData.name}\n`);

  const currentEmployment = karlLoyd.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentListHTML
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, karlLoyd.id, updates);
    console.log('✅ Karl Loyd actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se recargó el acordeón completo desde el HTML original (Lava Automation, Pines Insurance Group, OutsourcedDoers, Maria Assumpta Seminary).');
  } catch (error) {
    console.error('❌ Error al actualizar a Karl Loyd:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);

