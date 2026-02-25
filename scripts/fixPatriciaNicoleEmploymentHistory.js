/**
 * Script para recargar el Employment History de Patricia Nicole (slug: patricia-nicole)
 * usando los datos de webflow-components/298-patricia-nicole-profile.html
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
  console.log('🔧 Corrigiendo Employment History de Patricia Nicole (patricia-nicole)...\n');

  // Definir las entradas de empleo basadas en 298-patricia-nicole-profile.html
  const employmentEntries = [
    {
      company: 'JP MORGAN CHASE & CO. – TOWER MANILA',
      position: 'Operations Senior Specialist II – Escrow Analysis',
      period: 'Jun 2023 – Aug 2025',
      description:
        '• Maintained and updated escrow records with accuracy.<br>' +
        '• Conducted escrow account analysis, handling shortages and surpluses.',
    },
    {
      company: 'JP MORGAN CHASE & CO. – TOWER MANILA',
      position: 'Account Specialist II – Customer Service',
      period: 'Jul 2022 – Jun 2023',
      description:
        '• Assisted customers with mortgage, home equity loans, and lines of credit.<br>' +
        '• Processed account maintenance, payments, and loan modifications.',
    },
    {
      company: 'JP MORGAN CHASE & CO. – TOWER MANILA',
      position: 'Operations Senior Specialist I – Title Analyst',
      period: 'May 2021 – Jun 2022',
      description:
        '• Analyzed supporting documents for mortgage loan applications in line with bank policies.<br>' +
        '• Verified property values and financial records to ensure compliance.<br>' +
        '• Prepared accurate documents for loan processing and closing.',
    },
    {
      company: 'PRU LIFE UK',
      position: 'Financial Advisor',
      period: 'Jul 2020 – May 2021',
      description:
        '• Developed financial plans for clients, including wealth-building and risk management.<br>' +
        '• Provided retirement and educational investment solutions.',
    },
    {
      company: 'SITEL PHILIPPINES CORPORATION (BPO)',
      position: 'Customer Service Specialist',
      period: 'Jun 2020 – May 2021',
      description:
        '• Resolved customer inquiries regarding products and services.<br>' +
        '• Processed billing disputes and account concerns.',
    },
    {
      company: 'SUTHERLAND GLOBAL SERVICES (BPO)',
      position: 'Associate I.T. Helpdesk',
      period: 'Sep 2017 – Feb 2020',
      description:
        '• Provided technical support for Microsoft Windows and Office applications.<br>' +
        '• Delivered accurate troubleshooting steps and ensured customer satisfaction.',
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

  const patriciaNicole = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'patricia-nicole';
  });

  if (!patriciaNicole) {
    console.error('❌ No se encontró a Patricia Nicole (patricia-nicole) en la colección de VAs');
    return;
  }

  console.log(`✅ Patricia Nicole encontrada: ${patriciaNicole.fieldData.name}`);
  console.log(`   Slug: ${patriciaNicole.fieldData.slug}`);
  console.log(`   ID: ${patriciaNicole.id}\n`);

  const currentEmployment = patriciaNicole.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, patriciaNicole.id, updates);
    console.log('✅ Patricia Nicole actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 6 entradas en formato acordeón con descripciones completas.');
    console.log('  - El título "EMPLOYMENT HISTORY" está en el template, no en este campo.');
  } catch (error) {
    console.error('❌ Error al actualizar a Patricia Nicole:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
