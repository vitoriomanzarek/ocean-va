/**
 * Script para eliminar la educación de Raydon (slug: raydon)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Eliminando educación de Raydon (raydon)...\n');

  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find((c) => c.slug === 'virtual-assistants');

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

  const raydon = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'raydon';
  });

  if (!raydon) {
    console.error('❌ No se encontró a Raydon (raydon) en la colección de VAs');
    return;
  }

  console.log(`✅ Raydon encontrado: ${raydon.fieldData.name}`);
  console.log(`   Slug: ${raydon.fieldData.slug}`);
  console.log(`   ID: ${raydon.id}\n`);

  const currentEducation = raydon.fieldData['education-richtext'] || '';
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Education-richtext length: ${currentEducation.length}`);
  console.log(`Education-richtext content: ${currentEducation.substring(0, 200)}...\n`);

  // Establecer el campo como cadena vacía para eliminar la educación
  const updates = {
    'education-richtext': '',
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, raydon.id, updates);
    console.log('✅ Raydon actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Education: eliminada completamente (campo vacío).');
    console.log('  - La sección de educación no se mostrará en el frontend.');
  } catch (error) {
    console.error('❌ Error al actualizar a Raydon:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
