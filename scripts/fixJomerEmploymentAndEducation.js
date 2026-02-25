/**
 * Script para recargar Employment History y Education de Jomer
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
  console.log('🔧 Corrigiendo Employment History y Education de Jomer...\n');

  const htmlPath = path.join(__dirname, '..', 'webflow-components-minified', '285-jomer-daniel-profile.html');

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ No se encontró el archivo HTML: ${htmlPath}`);
    return;
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Extraer Employment List completo
  const employmentMatch = html.match(/<div class="va-employment-list">([\s\S]*?)<\/div><\/div><\/section>/);

  if (!employmentMatch) {
    console.error('❌ No se encontró el bloque de va-employment-list en el HTML');
    return;
  }

  const employmentListHTML = `<div class="va-employment-list">${employmentMatch[1]}</div>`;

  console.log('════════ EMPLOYMENT LIST (preview) ════════\n');
  console.log(employmentListHTML.substring(0, 500) + (employmentListHTML.length > 500 ? '...\n' : '\n'));

  // Extraer Education
  const educationMatch = html.match(/<h2 class="va-section-title">EDUCATION<\/h2>([\s\S]*?)<\/div><\/section>/);

  if (!educationMatch) {
    console.error('❌ No se encontró el bloque de EDUCATION en el HTML');
    return;
  }

  const educationHTML = educationMatch[1].trim();

  console.log('════════ EDUCATION (preview) ════════\n');
  console.log(educationHTML.substring(0, 400) + (educationHTML.length > 400 ? '...\n' : '\n'));

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

  const jomer = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name.includes('jomer') || slug.includes('jomer-daniel');
  });

  if (!jomer) {
    console.error('❌ No se encontró a Jomer en la colección de VAs');
    return;
  }

  console.log(`✅ Jomer encontrado: ${jomer.fieldData.name}\n`);

  const currentEmployment = jomer.fieldData['employment-richtext'] || '';
  const currentEducation = jomer.fieldData['education-richtext'] || '';

  console.log('════════ ESTADO ACTUAL (preview) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}`);
  console.log(`Education-richtext preview: ${currentEducation.substring(0, 200)}${currentEducation.length > 200 ? '...' : ''}\n`);

  const updates = {
    'employment-richtext': employmentListHTML,
    'education-richtext': educationHTML
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, jomer.id, updates);
    console.log('✅ Jomer actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se recargó el acordeón completo desde el HTML original (4 empleos).');
    console.log('  - Education: se reemplazó por el bloque correcto con estilos de "Universidad Autónoma de Bucaramanga".');
  } catch (error) {
    console.error('❌ Error al actualizar a Jomer:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);

