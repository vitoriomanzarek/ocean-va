/**
 * Script para recargar el Employment History de Vicente (slug: vicente-penaflor)
 * usando los datos del HTML minificado y el formato de acordeón.
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
  console.log('🔧 Recargando Employment History de Vicente (vicente-penaflor)...\n');

  // Definir las entradas de empleo basadas en el HTML minificado
  const employmentEntries = [
    {
      company: 'COVERDESK',
      position: 'Virtual Assistant',
      period: 'Feb 2023 - June 2025',
      description:
        '• Responsible for generating accurate and competitive insurance quotes for personal lines clients including home, auto, Dp3, flood and umbrella.<br>' +
        '• Communicated with clients via chat and email to clarify information and deliver quotes.<br>' +
        '• Utilized AMS360 and Applied Epic to manage client information, policy processing, and documentation efficiently.<br>' +
        '• Prepared accurate insurance quotes using multiple raters, including EZLynx, QuoteRush, and Applied Rater.<br>' +
        '• Ensured accuracy and consistency across multiple quoting platforms while maintaining compliance with underwriting guidelines.',
    },
    {
      company: 'VXI GLOBAL SOLUTIONS',
      position: 'Account Associate and Quality Analyst',
      period: 'Nov 2019 - Jan 2023',
      description:
        '• Account associates deal with customers\' concerns about their international order.<br>' +
        '• Check, approve/reject agent escalation and send it to clients.<br>' +
        '• Quality analysts provide immediate feedback on how agents handle their calls.<br>' +
        '• Monitor on how agents process making sure that all are compliant to avoid fraud.<br>' +
        '• Provide weekly coaching and a week meeting with clients, team leaders and co quality analysts.',
    },
    {
      company: 'SITEL PHILIPPINES',
      position: 'Customer Service / Technical Support / Billing Support',
      period: 'May 2017 - Sept 2019',
      description:
        '<strong>Customer service</strong> - Handled customer inquiries through phone providing prompt and courteous assistance on account issues, service updates and general product information. Ensured high levels of customer satisfaction by resolving concerns efficiently and maintaining a positive brand experience.<br><br>' +
        '<strong>Technical Support</strong> - Provided first-level technical assistance for software and hardware-related concerns, troubleshooting issues remotely and guiding users through solutions. Documented problems, escalated complex cases and ensured timely resolution while maintaining detailed case notes.<br><br>' +
        '<strong>Billing Support</strong> - Assisted customers with billing inquiries, payment issues and account adjustments. Reviewed transactions, processed refunds and clarified charges while adhering to company policies and maintaining accuracy in financial records.',
    },
  ];

  const employmentHTML = generateEmploymentAccordionHTML(employmentEntries);

  console.log('════════ EMPLOYMENT HTML (preview) ════════\n');
  console.log(employmentHTML.substring(0, 800) + (employmentHTML.length > 800 ? '...\n' : '\n'));

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

  const vicente = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'vicente-penaflor' || slug === 'vicente';
  });

  if (!vicente) {
    console.error('❌ No se encontró a Vicente (vicente-penaflor) en la colección de VAs');
    return;
  }

  console.log(`✅ Vicente encontrado: ${vicente.fieldData.name}`);
  console.log(`   Slug: ${vicente.fieldData.slug}`);
  console.log(`   ID: ${vicente.id}\n`);

  const currentEmployment = vicente.fieldData['employment-richtext'] || '';
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, vicente.id, updates);
    console.log('✅ Vicente actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: recargado con 3 entradas en formato acordeón.');
    console.log('  - COVERDESK (Feb 2023 - June 2025)');
    console.log('  - VXI GLOBAL SOLUTIONS (Nov 2019 - Jan 2023)');
    console.log('  - SITEL PHILIPPINES (May 2017 - Sept 2019)');
    console.log('  - El título "EMPLOYMENT HISTORY" está en el template, no en este campo.');
  } catch (error) {
    console.error('❌ Error al actualizar a Vicente:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
