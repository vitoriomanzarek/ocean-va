/**
 * Script para recargar el Employment History de Marco (slug: marco)
 * usando los datos de webflow-components/293-marco-profile.html
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
    // Convertir saltos de línea a <br> y mantener los bullets
    const description = escapeHtml(descriptionRaw).replace(/\n/g, '<br>');

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
  console.log('🔧 Corrigiendo Employment History de Marco (marco)...\n');

  // Definir las entradas de empleo basadas en 293-marco-profile.html
  const employmentEntries = [
    {
      company: 'DIFRENTT COMPANY – REMOTE',
      position: 'Marketing & Project Manager',
      period: 'April 2025 - 2025',
      description:
        '• Manage campaign planning and marketing operations for digital transformation and brand growth projects.<br>' +
        '• Coordinate content calendars, deliverables, and cross-functional communication between marketing, design, and development teams.<br>' +
        '• Analyze campaign performance to identify engagement and retention opportunities, improving LTV across client accounts.<br>' +
        '• Collaborate with agencies on SEO, paid media, and creative execution ensuring brand consistency and on-time delivery.<br>' +
        '• Oversee process documentation and implement SOPs to improve campaign efficiency by 25%.',
    },
    {
      company: 'ZEGNIO DIGITAL AGENCY – SONORA, MEXICO',
      position: 'Senior Project Manager',
      period: 'May 2020 - Apr 2025',
      description:
        '• Led over 300 digital campaigns for e-commerce, lifestyle, and service brands, managing timelines, creative briefs, and analytics reports.<br>' +
        '• Supervised marketing calendars, promotional launches, and retention campaigns across social, web, and paid channels.<br>' +
        '• Worked closely with paid media and SEO teams to track conversions (CVR, CTR, AOV) and optimize ad spend.<br>' +
        '• Maintained agency relationships and coordinated deliverables between client teams, designers, and developers.<br>' +
        '• Improved cross-departmental workflow visibility using ClickUp and Google Workspace dashboards.',
    },
    {
      company: 'ZEGNIO DIGITAL AGENCY – SONORA, MEXICO',
      position: 'Operations Director',
      period: 'Jul 2018 - Apr 2020',
      description:
        '• Oversaw 15+ concurrent marketing and website projects, ensuring high quality and deadline compliance.<br>' +
        '• Implemented Kanban methodology and reporting systems, reducing turnaround times by 20%.<br>' +
        '• Supported campaign performance analysis, client reporting, and strategy recommendations for e-commerce clients.',
    },
    {
      company: 'ZEGNIO DIGITAL AGENCY – SONORA, MEXICO',
      position: 'Project Coordinator',
      period: 'Jul 2014 - Jun 2018',
      description:
        '• Coordinated social media and marketing campaigns, managing timelines and creative approvals.<br>' +
        '• Prepared analytics and performance summaries to guide client decision-making.<br>' +
        '• Facilitated Agile meetings and maintained project documentation standards.',
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

  const marco = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name === 'marco' || slug === 'marco';
  });

  if (!marco) {
    console.error('❌ No se encontró a Marco (marco) en la colección de VAs');
    return;
  }

  console.log(`✅ Marco encontrado: ${marco.fieldData.name}\n`);

  const currentEmployment = marco.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, marco.id, updates);
    console.log('✅ Marco actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 4 entradas en formato acordeón con descripciones completas.');
  } catch (error) {
    console.error('❌ Error al actualizar a Marco:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
