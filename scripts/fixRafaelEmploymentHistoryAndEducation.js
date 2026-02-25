/**
 * Script para recargar el Employment History y corregir la educación duplicada de Rafael (slug: rafael)
 * usando los datos de src/pages/RafaelProfile.jsx y el formato de acordeón.
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
  console.log('🔧 Recargando Employment History y corrigiendo educación duplicada de Rafael (rafael)...\n');

  // Definir las entradas de empleo basadas en RafaelProfile.jsx
  const employmentEntries = [
    {
      company: 'STRACHAN NOVAK INSURANCE SERVICES',
      position: 'Insurance Virtual Assistant',
      period: 'JUNE 2024 - APRIL 2025',
      description: '• Most recent and comprehensive role, where he managed insurance verification, authorizations, and client relationship tasks across personal lines.',
    },
    {
      company: 'OFFICE BEACON PHILIPPINES, INC.',
      position: 'Insurance Virtual Assistant',
      period: 'JAN 2023 - APR 2024',
      description: '• Provided general support for insurance operations including verification, authorization, and email management.',
    },
    {
      company: 'CORNERSTONE INSURANCE GROUP',
      position: 'Insurance Virtual Assistant',
      period: 'SEPT 2023 - JAN 2024',
      description: '• Focused on Healthcare/Medicare insurance support tasks like patient follow-ups, prescription refills, and scheduling.',
    },
    {
      company: 'AFFINITY INSURANCE GROUP',
      position: 'Insurance Virtual Assistant',
      period: 'JUL 2023 - SEPT 2023',
      description: '• Supported Auto and Home Insurance processes such as quotes, cancellations, renewals, and data entry.',
    },
    {
      company: 'HEALTH WEALTH ADVOCATES',
      position: 'Insurance Virtual Assistant',
      period: 'MAR 2023 - JUN 2023',
      description: '• Worked on Health Insurance policy terminations, enrollments, data entry, and quoting.',
    },
    {
      company: 'BOOMERING, INC.',
      position: 'Insurance Virtual Assistant',
      period: 'OCT 2021 - SEPT 2022',
      description: '• Supported Farmers Insurance clients in Personal Auto and Home Lines, offering policy options and assisting clients through the insurance process.',
    },
  ];

  const employmentHTML = generateEmploymentAccordionHTML(employmentEntries);

  // Educación corregida (solo una entrada, sin duplicados)
  const educationHTML = `
<div class="va-education-item">
  <h3 class="va-education-school">Holy Angel University</h3>
  <p class="va-education-degree">Bachelor of Science in Psychology</p>
  <p class="va-education-year">2019 - 2022</p>
</div>`.trim();

  console.log('════════ EMPLOYMENT HTML (preview) ════════\n');
  console.log(employmentHTML.substring(0, 800) + (employmentHTML.length > 800 ? '...\n' : '\n'));

  console.log('════════ EDUCATION HTML ════════\n');
  console.log(educationHTML + '\n');

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

  const rafael = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'rafael';
  });

  if (!rafael) {
    console.error('❌ No se encontró a Rafael (rafael) en la colección de VAs');
    return;
  }

  console.log(`✅ Rafael encontrado: ${rafael.fieldData.name}`);
  console.log(`   Slug: ${rafael.fieldData.slug}`);
  console.log(`   ID: ${rafael.id}\n`);

  const currentEmployment = rafael.fieldData['employment-richtext'] || '';
  const currentEducation = rafael.fieldData['education-richtext'] || '';
  console.log('════════ ESTADO ACTUAL ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}`);
  console.log(`Education-richtext length: ${currentEducation.length}\n`);

  const updates = {
    'employment-richtext': employmentHTML,
    'education-richtext': educationHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, rafael.id, updates);
    console.log('✅ Rafael actualizado exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: recargado con 6 entradas en formato acordeón.');
    console.log('  - Education: corregida la duplicación, ahora solo hay una entrada con el año 2019 - 2022.');
    console.log('  - El título "EMPLOYMENT HISTORY" está en el template, no en este campo.');
  } catch (error) {
    console.error('❌ Error al actualizar a Rafael:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
