/**
 * Script para recargar Education + Certifications de Joana
 * usando el HTML del template viejo, sin modificar la educación existente.
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo Education + Certifications de Joana...\n');

  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);

  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');

  if (!vaCollection) {
    console.error('❌ Colección "virtual-assistants" no encontrada');
    return;
  }

  // Traer todos los VAs y encontrar a Joana
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

  const joana = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'joana' || name.startsWith('joana ');
  });

  if (!joana) {
    console.error('❌ No se encontró a Joana en la colección de VAs');
    return;
  }

  console.log(`✅ Joana encontrada: ${joana.fieldData.name}\n`);

  const currentEducation = joana.fieldData['education-richtext'] || '';
  console.log('════════ EDUCATION ACTUAL (preview) ════════\n');
  console.log(currentEducation.substring(0, 400) + (currentEducation.length > 400 ? '...\n' : '\n'));

  // HTML de Education + Certifications usando las mismas clases del template
  const newEducationHTML = `
    <div class="va-education-item">
      <h3 class="va-education-school">Universidad Interamericana para el Desarrollo</h3>
      <p class="va-education-degree">Law Degree</p>
      <p class="va-education-year">2016 - 2019</p>
    </div>
    <div class="va-education-item" style="margin-top: 16px;">
      <h3 class="va-education-school">Certifications</h3>
      <p class="va-education-degree">
        - Harvard Business School Online's Financial Analysis and Valuation for Lawyers Program<br>
        - Certification Six Sigma: White Belt - Yellow Belt<br>
        - Diplomado "Juicio de Amparo" - Casas de la Cultura Jurídica, SCJN Edición 2022
      </p>
    </div>
  `.trim();

  console.log('\n════════ NUEVO EDUCATION + CERTIFICATIONS (preview) ════════\n');
  console.log(newEducationHTML.substring(0, 400) + (newEducationHTML.length > 400 ? '...\n' : '\n'));

  const updates = {
    'education-richtext': newEducationHTML
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, joana.id, updates);
    console.log('✅ Joana actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Education: se mantuvo la misma universidad y grado (Law Degree, 2016-2019).');
    console.log('  - Certifications: se agregaron las 3 certificaciones debajo del bloque de educación.');
  } catch (error) {
    console.error('❌ Error actualizando a Joana:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);

