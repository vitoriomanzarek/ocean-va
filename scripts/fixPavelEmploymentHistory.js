/**
 * Script para corregir los saltos de línea en el Employment History de Pavel (slug: pavel)
 * usando los datos de src/pages/PavelProfile.jsx y el formato de acordeón.
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
  console.log('🔧 Corrigiendo saltos de línea en Employment History de Pavel (pavel)...\n');

  // Definir las entradas de empleo basadas en PavelProfile.jsx
  const employmentEntries = [
    {
      company: 'JAVA PLANET COFFEE ROASTERS',
      position: 'Content Creator & Marketing Strategist Assistant',
      period: '2024 - 2025',
      description:
        '• Developed storytelling-driven marketing campaigns to highlight sustainable coffee practices<br>' +
        '• Redesigned and managed the online store, improving UX/UI and integrating e-commerce solutions.<br>' +
        '• Implemented on-page and technical SEO strategies to boost organic traffic to the website and blog.<br>' +
        '• Wrote optimized copy and managed the brand\'s presence across search engines and social platforms.<br>' +
        '• Produced high-quality audiovisual content that increased engagement and conversions on social media.',
    },
    {
      company: 'SANDUNGA',
      position: 'Content Creator & Marketing Strategist',
      period: '2022 - 2025',
      description:
        '• Designed visual content and digital campaigns for concerts and cultural events featuring national and international artists.<br>' +
        '• Created social media campaigns, promotional videos, and branding materials to increase event attendance and online engagement.<br>' +
        '• Led the digital marketing strategy for medical business, including SEO and AEO (Answer Engine Optimization) to improve online discoverability.<br>' +
        '• Built and optimized professional websites, implementing accessibility standards, legal compliance, and user-friendly design.<br>' +
        '• Produced blog posts, landing pages, and audiovisual content for social media and patient outreach.<br>' +
        '• Developed a tiered digital service model for professionals, combining content creation, SEO, and web design solutions.',
    },
    {
      company: 'PROPOSITIVE AGENCY',
      position: 'Audiovisual Content Creator',
      period: '2020 - 2022',
      description:
        '• Produced tailored content for restaurants, e-commerce brands, and small businesses.<br>' +
        '• Managed full cycle video production including scripting, shooting, editing, and post-production.<br>' +
        '• Enhanced content performance based on data analytics and audience insights',
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

  const pavel = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'pavel';
  });

  if (!pavel) {
    console.error('❌ No se encontró a Pavel (pavel) en la colección de VAs');
    return;
  }

  console.log(`✅ Pavel encontrado: ${pavel.fieldData.name}`);
  console.log(`   Slug: ${pavel.fieldData.slug}`);
  console.log(`   ID: ${pavel.id}\n`);

  const currentEmployment = pavel.fieldData['employment-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, pavel.id, updates);
    console.log('✅ Pavel actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se corrigieron los saltos de línea entre bullet points.');
    console.log('  - Se cargaron 3 entradas en formato acordeón con descripciones completas.');
    console.log('  - El título "EMPLOYMENT HISTORY" está en el template, no en este campo.');
  } catch (error) {
    console.error('❌ Error al actualizar a Pavel:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
