/**
 * Script para recargar el Employment History de Karl (slug: karl-bd0a3)
 * usando los datos de src/pages/KarlProfile.jsx y el formato de acordeón.
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
  console.log('🔧 Corrigiendo Employment History de Karl (karl-bd0a3)...\n');

  // Definir las entradas de empleo basadas en KarlProfile.jsx
  const employmentEntries = [
    {
      company: 'Agency Strong MA',
      position: 'Insurance Agent Virtual Assistant',
      period: '2024 - 2025',
      description:
        'Insurance Virtual Assistant with 1 year and 8 months of experience handling Personal and Commercial Lines accounts in the states of Massachusetts, New Hampshire, and Maine.',
    },
    {
      company: 'Valor Global',
      position: 'Customer Service Representative (TSR/CSR, Voice Account)',
      period: '2023 - 2024',
      description:
        'Customer Service Representative with 1 year of experience handling the U.S.-based Home Security campaign.',
    },
    {
      company: 'Agency VA',
      position: 'Insurance Agent Virtual Assistant',
      period: '2022 - 2023',
      description:
        'Insurance Virtual Assistant with 2 years of experience handling Personal and Commercial Lines accounts in the state of Florida.',
    },
    {
      company: 'Home Defense Technology Corporation',
      position: 'Emergency Rapid Assistant "ERA" Application SaaS (Inhouse IT Generalist)',
      period: '2020 - 2022',
      description:
        'Emergency Rapid Assistant (ERA) Application SaaS. 2 years of experience as an In-House IT Generalist, providing system administration and technical support.',
    },
    {
      company: 'Filweb Asia Inc.',
      position: 'Customer Service Representative',
      period: '2017 - 2018',
      description:
        'Customer Service Representative. Monitoring Application SaaS (U.S.-based account) with 1 year and 6 months of experience providing technical support via chat, email, and live calls.',
    },
    {
      company: 'Iproximity Offshore Inc.',
      position: 'Customer Service Representative',
      period: '2016',
      description:
        'Customer Service Representative. U.S.-based Campaign with 1 year of experience as Sales/Customer Service Representative.',
    },
    {
      company: 'Crosspoint Computers Inc. Head Office',
      position: 'Technical Staff/IT Support',
      period: '2015 - 2016',
      description:
        'Etrade Ent. Sister Company (Technical Staff/IT Support). Promoted as IT/Technical Support Admin (2015-2016) at Crosspoint Computers Inc.',
    },
    {
      company: 'Games And Gadgets Ent.',
      position: 'Customer Support Representative',
      period: '2014 - 2015',
      description: 'Promoted as Store/Branch Asst. OIC.',
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

  const karl = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name === 'karl' || slug === 'karl-bd0a3';
  });

  if (!karl) {
    console.error('❌ No se encontró a Karl (karl-bd0a3) en la colección de VAs');
    return;
  }

  console.log(`✅ Karl encontrado: ${karl.fieldData.name}\n`);

  const currentEmployment = karl.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, karl.id, updates);
    console.log('✅ Karl actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 8 entradas en formato acordeón con descripciones completas.');
  } catch (error) {
    console.error('❌ Error al actualizar a Karl:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);

