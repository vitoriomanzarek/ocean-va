/**
 * Script para limpiar la educación de Yvette (slug: yvette)
 * Quita el texto entre paréntesis y deja solo el contenido válido
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Limpiando educación de Yvette (slug: yvette)...\n');

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

  const yvette = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'yvette';
  });

  if (!yvette) {
    console.error('❌ No se encontró a Yvette (slug: yvette) en la colección de VAs');
    return;
  }

  console.log(`✅ Yvette encontrada: ${yvette.fieldData.name}`);
  console.log(`   Slug: ${yvette.fieldData.slug}`);
  console.log(`   ID: ${yvette.id}\n`);

  const currentEducation = yvette.fieldData['education-richtext'] || '';
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Education-richtext: ${currentEducation}\n`);

  // Limpiar: quitar duplicados y texto entre paréntesis
  // Dejar solo una entrada con el degree "ACCOUNTING / FINANCE-RELATED BACKGROUND"
  // Sin el h3.va-education-school (que tenía "(CLIENT TO PROVIDE)")
  // Sin el p.va-education-year (que tenía "(YEAR)")
  const cleanedEducation = `
<div class="va-education-item">
  <p class="va-education-degree">ACCOUNTING / FINANCE-RELATED BACKGROUND</p>
</div>`.trim();

  console.log('════════ EDUCACIÓN LIMPIA ════════\n');
  console.log(cleanedEducation + '\n');

  const updates = {
    'education-richtext': cleanedEducation,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, yvette.id, updates);
    console.log('✅ Yvette actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Education: limpiada');
    console.log('  - Removido texto entre paréntesis: "(CLIENT TO PROVIDE)" y "(YEAR)"');
    console.log('  - Removida duplicación');
    console.log('  - Dejado solo el degree: "ACCOUNTING / FINANCE-RELATED BACKGROUND"');
  } catch (error) {
    console.error('❌ Error al actualizar a Yvette:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
