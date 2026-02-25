/**
 * Script para renombrar Jellie a Ellie y actualizar skills, tools y summary
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
  console.log('🔧 Actualizando Ellie (skills, tools y summary)...\n');

  // Nuevos datos
  const newName = 'Ellie';
  const newTitle = 'PROPERTY MANAGEMENT VIRTUAL ASSISTANT';
  const newSummary = 'Ellie is a seasoned Property Management Virtual Assistant with over five years of U.S. experience supporting American clients across residential, commercial, long-term, and short-term rentals. She brings strong operational and financial expertise, combining leasing, tenant and guest coordination, maintenance management, and full-cycle accounting support. Her background allows her to manage properties end to end while maintaining accuracy, compliance, and clear communication with tenants, vendors, and owners.';

  const newSkills = [
    'PROPERTY MANAGEMENT',
    'LEASING COORDINATION',
    'TENANT SCREENING',
    'GUEST COMMUNICATION',
    'MAINTENANCE COORDINATION',
    'VENDOR MANAGEMENT',
    'RENT COLLECTION',
    'FINANCIAL REPORTING',
    'BANK RECONCILIATION',
    'ACCOUNTS PAYABLE',
    'ACCOUNTS RECEIVABLE',
    'SHORT TERM RENTALS'
  ];

  const newTools = [
    'APPFOLIO',
    'BUILDIUM',
    'RENT MANAGER',
    'AIRBNB & VRBO',
    'HOSTAWAY',
    'QUICKBOOKS',
    'YARDI',
    'VANTACA',
    'ZILLOW',
    'ZOIPER',
    'ASANA',
    'TRELLO'
  ];

  const skillsHTML = generateSkillsHTML(newSkills);
  const toolsHTML = `<div class="va-tools-list">${generateToolsHTML(newTools)}</div>`;
  const toolsTags = newTools.join(', ');

  console.log('════════ DATOS A ACTUALIZAR ════════\n');
  console.log(`✅ Nombre: ${newName}`);
  console.log(`✅ Título: ${newTitle}`);
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

  const ellie = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name === 'ellie' || slug === 'ellie' || name === 'jellie' || slug === 'jellie';
  });

  if (!ellie) {
    console.error('❌ No se encontró a Ellie/Jellie en la colección de VAs');
    return;
  }

  console.log(`✅ Ellie encontrada: ${ellie.fieldData.name}`);
  console.log(`   Slug: ${ellie.fieldData.slug}`);
  console.log(`   ID: ${ellie.id}\n`);

  const currentName = ellie.fieldData.name || '';
  const currentTitle = ellie.fieldData['title-2'] || '';
  const currentSummary = ellie.fieldData.summary || '';
  const currentEmployment = ellie.fieldData['employment-richtext'] || '';
  const currentEmploymentSummary = ellie.fieldData['employment-summary'] || '';
  const currentProfileSlug = ellie.fieldData['profile-slug-2'] || '';
  
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Nombre: ${currentName}`);
  console.log(`Título: ${currentTitle}`);
  console.log(`Summary length: ${currentSummary.length}`);
  console.log(`Profile Slug: ${currentProfileSlug}\n`);

  // Actualizar summary removiendo referencias a "Jellie"
  const updatedSummary = newSummary.replace(/Jellie/g, 'Ellie');
  
  // Actualizar employment history y summary removiendo "Jellie"
  let updatedEmployment = currentEmployment.replace(/Jellie/gi, 'Ellie');
  let updatedEmploymentSummary = currentEmploymentSummary.replace(/Jellie/gi, 'Ellie');
  
  // Actualizar profile-slug-2 si contiene "jellie"
  let updatedProfileSlug = currentProfileSlug;
  if (currentProfileSlug.includes('jellie')) {
    updatedProfileSlug = currentProfileSlug.replace(/jellie/gi, 'ellie');
  }
  
  const updates = {
    'name': newName,
    'title-2': newTitle,
    'summary': `<p>${updatedSummary}</p>`,
    'skills-richtext': skillsHTML,
    'tools-tags': toolsTags,
    'tools-richtext': toolsHTML,
    'employment-richtext': updatedEmployment,
    'employment-summary': updatedEmploymentSummary,
  };
  
  // Solo actualizar profile-slug-2 si cambió
  if (updatedProfileSlug !== currentProfileSlug) {
    updates['profile-slug-2'] = updatedProfileSlug;
  }

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, ellie.id, updates);
    console.log('✅ Ellie actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log(`  - Nombre: "${newName}" (ya estaba como Ellie)`);
    console.log(`  - Título: actualizado a "${newTitle}"`);
    console.log(`  - Summary: actualizado con nueva descripción (removidas referencias a Jellie)`);
    console.log(`  - Skills: actualizados con ${newSkills.length} skills de property management`);
    console.log(`  - Tools: actualizados con ${newTools.length} tools`);
    console.log(`  - Employment History: actualizado (removidas referencias a Jellie)`);
    console.log(`  - Employment Summary: actualizado (removidas referencias a Jellie)`);
    if (updatedProfileSlug !== currentProfileSlug) {
      console.log(`  - Profile Slug: actualizado de "${currentProfileSlug}" a "${updatedProfileSlug}"`);
    }
    console.log('\nSkills actualizados:');
    newSkills.forEach((skill, idx) => {
      console.log(`  ${idx + 1}. ${skill}`);
    });
    console.log('\nTools actualizados:');
    newTools.forEach((tool, idx) => {
      console.log(`  ${idx + 1}. ${tool}`);
    });
    console.log('\n⚠️  NOTA: El slug puede seguir siendo "jellie". Si necesitas cambiarlo,');
    console.log('   deberás hacerlo manualmente en Webflow o crear un nuevo item.');
  } catch (error) {
    console.error('❌ Error al actualizar a Ellie:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
