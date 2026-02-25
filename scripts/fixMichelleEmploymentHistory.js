/**
 * Script para recargar el Employment History de Michelle (slug: michelle)
 * usando los datos de src/pages/MichelleProfile.jsx y el formato de acordeón.
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

function generateEmploymentAccordionHTML(entries) {
  const iconSvg = `<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

  const accordions = entries.map((entry) => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    const descriptionRaw = entry.description || '';
    
    // Procesar la descripción: convertir \n a <br> y preservar <br> existentes
    // NO escapar los tags HTML <br> ya que son válidos y necesarios
    let description = descriptionRaw;
    
    // Si tiene saltos de línea, convertirlos a <br>
    if (description.includes('\n')) {
      description = description.replace(/\n/g, '<br>');
    }
    
    // Solo escapar & si no es parte de una entidad HTML válida
    description = description.replace(/&(?!amp;|lt;|gt;|quot;|#39;|nbsp;|#\d+;)/g, '&amp;');

    return `
<div class="va-employment-accordion">
  <div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
    <div class="va-employment-accordion-title">
      <h4 class="va-employment-accordion-company">${company}</h4>
      <p class="va-employment-accordion-position">${position}</p>
      <p class="va-employment-accordion-period">${period}</p>
    </div>
    ${iconSvg}
  </div>
  <div class="va-employment-accordion-content">
    <p class="va-employment-accordion-description">${description}</p>
  </div>
</div>`.trim();
  });

  return `<div class="va-employment-list">\n${accordions.join('\n')}\n</div>`;
}

async function main() {
  console.log('🔧 Corrigiendo Employment History de Michelle (michelle)...\n');

  // Definir las entradas de empleo basadas en MichelleProfile.jsx
  const employmentEntries = [
    {
      company: 'COVERDESK',
      position: 'Office-Based Virtual Assistant',
      period: 'AUG 2024 - SEPT 2025',
      description:
        '• Quote remarket insurance Auto, Home, Umbrella, Package (Home and Auto)<br>' +
        '• Handles and organizes emails.<br>' +
        '• Assists inbound and outbound calls regarding documents, billing questions, endorsement requests, and general policy questions or concerns. Calls carriers regarding insured policy information.<br>' +
        '• Send cancellation forms for e-signature and processes policy cancellation in carrier.<br>' +
        '• Assists with processing of payments in the carrier and send receipt and updates billing schedule.<br>' +
        '• Perform manual downloads, as well as updating of insured\'s personal information to utilize management systems.',
    },
    {
      company: 'LINGOSTAR',
      position: 'Online ESL Tutor',
      period: 'MAR 2024 - APR 2024',
      description:
        '• Teach basic English to children aged 5-8 years old',
    },
    {
      company: 'CITIGLOBAL REALTY AND DEVELOPMENT INCORPORATION',
      position: 'Marketing Specialist',
      period: 'SEPT 2022 - OCT 2022',
      description:
        '• Rendered 200-hr immersion<br>' +
        '• Create Facebook posts<br>' +
        '• Answer Facebook chat and comment inquiries',
    },
  ];

  const employmentHTML = generateEmploymentAccordionHTML(employmentEntries);

  console.log('════════ EMPLOYMENT HTML (preview) ════════\n');
  console.log(employmentHTML.substring(0, 600) + (employmentHTML.length > 600 ? '...\n' : '\n'));

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

  const michelle = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'michelle';
  });

  if (!michelle) {
    console.error('❌ No se encontró a Michelle (michelle) en la colección de VAs');
    return;
  }

  console.log(`✅ Michelle encontrada: ${michelle.fieldData.name}`);
  console.log(`   Slug: ${michelle.fieldData.slug}`);
  console.log(`   ID: ${michelle.id}\n`);

  const currentEmployment = michelle.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, michelle.id, updates);
    console.log('✅ Michelle actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 3 entradas en formato acordeón con descripciones completas.');
    console.log('  - El título "EMPLOYMENT HISTORY" está en el template, no en este campo.');
  } catch (error) {
    console.error('❌ Error al actualizar a Michelle:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
