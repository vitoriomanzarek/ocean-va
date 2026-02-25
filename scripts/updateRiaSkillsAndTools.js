/**
 * Script para actualizar los skills y tools de Ria con la nueva información
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

function generateSkillsHTML(skills) {
  // El template ya proporciona <div class="va-skills-container">, solo generar los span tags
  return skills.map(skill => `<span class="va-skill-tag">${escapeHtml(skill)}</span>`).join('');
}

function generateToolsHTML(tools) {
  return tools.map(tool => `
<div class="va-tool-item">
  <span class="va-tool-checkmark">✓</span>
  <span>${escapeHtml(tool)}</span>
</div>`.trim()).join('');
}

async function main() {
  console.log('🔧 Actualizando skills y tools de Ria...\n');

  // Skills de la imagen
  const newSkills = [
    'LOAN PROCESSING',
    'UNDERWRITING SUPPORT',
    'AUS SUPPORT',
    'DTI ANALYSIS',
    'CREDIT REVIEW',
    'INCOME VERIFICATION',
    'ASSET REVIEW',
    'LOAN PREQUALIFICATION',
    'FILE PREPARATION',
    'LENDER COORDINATION',
    'POST CLOSING',
    'COMPLIANCE REVIEW'
  ];

  // Tools de la imagen
  const newTools = [
    'ARRIVE',
    'UWM',
    'TOP PRODUCER',
    'SKYSLOPE',
    'DOTLOOP',
    'BROKERMINT',
    'DOCUSIGN',
    'HUBSPOT',
    'SALESFORCE',
    'MLS'
  ];

  const skillsHTML = generateSkillsHTML(newSkills);
  const toolsHTML = `<div class="va-tools-list">${generateToolsHTML(newTools)}</div>`;
  const toolsTags = newTools.join(', ');

  console.log('════════ DATOS A ACTUALIZAR ════════\n');
  console.log(`✅ Skills: ${newSkills.length} skills`);
  console.log(`✅ Tools: ${newTools.length} tools\n`);

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

  console.log(`✅ Ria encontrada: ${ria.fieldData.name}`);
  console.log(`   Slug: ${ria.fieldData.slug}`);
  console.log(`   ID: ${ria.id}\n`);

  const currentSkills = ria.fieldData['skills-richtext'] || '';
  const currentTools = ria.fieldData['tools-richtext'] || '';
  
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Skills-richtext length: ${currentSkills.length}`);
  console.log(`Tools-richtext length: ${currentTools.length}\n`);

  const updates = {
    'skills-richtext': skillsHTML,
    'tools-tags': toolsTags,
    'tools-richtext': toolsHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, ria.id, updates);
    console.log('✅ Ria actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log(`  - Skills: actualizados con ${newSkills.length} skills de mortgage/loan processing`);
    console.log(`  - Tools: actualizados con ${newTools.length} tools de mortgage/real estate`);
    console.log('\nSkills actualizados:');
    newSkills.forEach((skill, idx) => {
      console.log(`  ${idx + 1}. ${skill}`);
    });
    console.log('\nTools actualizados:');
    newTools.forEach((tool, idx) => {
      console.log(`  ${idx + 1}. ${tool}`);
    });
  } catch (error) {
    console.error('❌ Error al actualizar a Ria:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
