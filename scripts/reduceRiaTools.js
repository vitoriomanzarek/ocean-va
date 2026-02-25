/**
 * Script para reducir los tools de Ria a la mitad (de 31 a ~15-16)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateToolsHTML(tools) {
  return tools.map(tool => `
<div class="va-tool-item">
  <span class="va-tool-checkmark">✓</span>
  <span>${escapeHtml(tool)}</span>
</div>`.trim()).join('');
}

async function main() {
  console.log('🔧 Reduciendo tools de Ria a la mitad...\n');

  // Tools actuales: 31
  // Tools seleccionados (15-16): manteniendo los más importantes y relevantes
  const selectedTools = [
    // Real Estate Tools (los más importantes)
    'Arrive',
    'Top Producer',
    'SkySlope',
    'Dotloop',
    'DocuSign',
    'ZipForm Plus',
    'Paragon',
    'Bright MLS',
    'Lone Wolf',
    // CRM/Management
    'Salesforce',
    'HubSpot',
    // Microsoft Office (consolidado)
    'Microsoft Office',
    // Cloud Storage (consolidado)
    'Google Drive',
    // Communication
    'VOIP'
  ];

  const toolsHTML = `<div class="va-tools-list">${generateToolsHTML(selectedTools)}</div>`;
  const toolsTags = selectedTools.join(', ');

  console.log('════════ TOOLS REDUCIDOS ════════\n');
  console.log(`Total anterior: 31 tools`);
  console.log(`Total nuevo: ${selectedTools.length} tools\n`);
  console.log('Tools seleccionados:');
  selectedTools.forEach((tool, idx) => {
    console.log(`${idx + 1}. ${tool}`);
  });

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

  const ria = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name === 'ria' || slug === 'ria';
  });

  if (!ria) {
    console.error('❌ No se encontró a Ria en la colección de VAs');
    return;
  }

  console.log(`\n✅ Ria encontrada: ${ria.fieldData.name}`);
  console.log(`   Slug: ${ria.fieldData.slug}`);
  console.log(`   ID: ${ria.id}\n`);

  const updates = {
    'tools-tags': toolsTags,
    'tools-richtext': toolsHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, ria.id, updates);
    console.log('✅ Ria actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log(`  - Tools reducidos de 31 a ${selectedTools.length}`);
    console.log(`  - Se mantuvieron los tools más relevantes de cada categoría`);
    console.log(`  - Se consolidaron herramientas similares (Microsoft Office, Google Drive)`);
  } catch (error) {
    console.error('❌ Error al actualizar a Ria:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
