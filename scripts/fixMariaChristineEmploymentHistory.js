/**
 * Script para recargar el Employment History de Maria Christine (slug: maria-christine)
 * usando los datos de webflow-components/296-maria-christine-profile.html
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
  console.log('🔧 Corrigiendo Employment History de Maria Christine (maria-christine)...\n');

  // Definir las entradas de empleo basadas en 296-maria-christine-profile.html
  const employmentEntries = [
    {
      company: 'PORT X',
      position: 'Human Resource Coordinator (Freelance)',
      period: 'Jan 2024 - Sep 2025',
      description:
        '• Spearheaded workforce management as a VA for 300+ employees using BambooHR and Rippling, ensuring 100% HRIS precision and smooth data migration.<br>' +
        '• Boosted employee engagement by 40% through improved communication (Slack and Teams) and digital branding (LinkedIn, Canva, and Meta).',
    },
    {
      company: 'REAL ESTATE AGENT',
      position: 'Transaction Coordinator (Freelance)',
      period: '2023',
      description:
        '• Executed transaction coordination and lease management as a VA, leveraging AppFolio, Skyslope, Jobber, and Paragon.<br>' +
        '• Ensured 100% documentation integrity using AuthentiSIGN and CREA WebForms while coordinating with 20+ vendors weekly to guarantee timely closings.',
    },
    {
      company: 'TRINET – ZENEFITS HUMAN RESOURCE MANAGEMENT',
      position: 'U.S. Tax & Payroll Compliance',
      period: '2018 - 2023',
      description:
        '• Directed end-to-end HR operations, including multi-state payroll and U.S. tax reporting, for clients (10- 1,000+ employees) through Zenefits, Zendesk, and Salesforce.<br>' +
        '• Resolved discrepancies using advanced Excel/Google Sheets and payroll software (QuickBooks, Gusto, ADP), resulting in a 20% reduction in errors and 30% improved turnaround time.',
    },
    {
      company: 'PRUDENTIAL FINANCIAL INC.',
      position: 'Insurance Financial Officer',
      period: '2017 - 2018',
      description:
        '• Processed and reviewed 300+ insurance policies monthly, ensuring data integrity and compliance, while simultaneously cutting turnaround times by 25% through documentation streamlining.',
    },
    {
      company: 'COMCAST XFINITY',
      position: 'Billing & Collection Representative',
      period: '2015 - 2016',
      description:
        '• Managed billing, collections, and basic technical support for hundreds of U.S. customer accounts, handling 80–100+ daily interactions across phone, chat, and email while maintaining a high 4.8/5 CSAT.',
    },
    {
      company: 'SPRINT & BOOST MOBILE',
      position: 'Number Porting Specialist',
      period: '2012 - 2015',
      description:
        '• Coordinated porting and account transfers for 500+ users weekly, maintaining a 98% success rate.',
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

  const mariaChristine = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'maria-christine';
  });

  if (!mariaChristine) {
    console.error('❌ No se encontró a Maria Christine (maria-christine) en la colección de VAs');
    return;
  }

  console.log(`✅ Maria Christine encontrada: ${mariaChristine.fieldData.name}`);
  console.log(`   Slug: ${mariaChristine.fieldData.slug}`);
  console.log(`   ID: ${mariaChristine.id}\n`);

  const currentEmployment = mariaChristine.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, mariaChristine.id, updates);
    console.log('✅ Maria Christine actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 6 entradas en formato acordeón con descripciones completas.');
  } catch (error) {
    console.error('❌ Error al actualizar a Maria Christine:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
