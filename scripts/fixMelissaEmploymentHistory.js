/**
 * Script para recargar el Employment History y corregir la Education de Melissa (slug: melissa)
 * usando los datos de src/pages/MelissaProfile.jsx y el formato de acordeón.
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

function generateEducationHTML(education) {
  if (!education || !education.school) {
    return '';
  }

  const school = escapeHtml(education.school || '');
  const degree = escapeHtml(education.degree || '');

  return `
<div class="va-education-item">
  <h3 class="va-education-school">${school}</h3>
  <p class="va-education-degree">${degree}</p>
</div>`.trim();
}

async function main() {
  console.log('🔧 Corrigiendo Employment History y Education de Melissa (melissa)...\n');

  // Definir las entradas de empleo basadas en MelissaProfile.jsx
  const employmentEntries = [
    {
      company: 'TRANSLATIONZ',
      position: 'Project Manager',
      period: 'APR 2022 - CURRENT',
      description:
        '• Manages and coordinates interpreters or translators and the client\'s language service request.<br>' +
        '• Ensures that projects adhere to frameworks and all documentations are maintained appropriately.<br>' +
        '• Provides administrative support when and as needed.',
    },
    {
      company: 'COGNIZANT TECHNOLOGY SOLUTIONS',
      position: 'Process Specialist / Process Trainer / Quality Analyst',
      period: 'FEB 2016 - MAR 2022',
      description:
        '• Coordinated with the appropriate department during pre-process and process training to discuss training preparations including the timeline and the agenda.<br>' +
        '• Facilitated domain and process training for insurance accounts - voice and chat support.<br>' +
        '• Helped the team in meeting the service level targets by taking chats as needed, reviewing the recorded chats and provide feedback as deemed necessary.<br>' +
        '• Conducted huddlesessions to discussthe challenges of the team and how to improve them.',
    },
    {
      company: 'ALTISOURCE BUSINESS SOLUTIONS',
      position: 'Customer Service Representative',
      period: 'OCT 2015 - JAN 2016',
      description:
        '• Met inbound customer needs while maintaining strict performance targets.<br>' +
        '• Provided solutions that fit those individualized situations and prioritize the customer\'s needs at each step of the process.<br>' +
        '• Protected the company and customers information with strict use of established security procedures.',
    },
    {
      company: 'CONVERGYS',
      position: 'Insurance Service Representative',
      period: 'NOV 2014 - SEP 2015',
      description:
        '• Provided billing assistance like processing payments and discussed billing activities on the account.<br>' +
        '• Assisted callers with their queries about the policyholder\'s personal insurance and sent appropriate documents as needed',
    },
    {
      company: 'EXL SERVICES',
      position: 'Insurance Service Representative',
      period: 'JAN 2010 - OCT 2014',
      description:
        '• Processed insurance payments and discussed billing activities on the account.<br>' +
        '• Assisted callers with their queries about the policy holder\'s personal insurance and sort appropriate documents as needed',
    },
  ];

  const employmentHTML = generateEmploymentAccordionHTML(employmentEntries);

  // Educación basada en MelissaProfile.jsx (solo una entrada, sin duplicados)
  const education = {
    school: 'Philippine Normal University, Manila / National Teachers College, Manila',
    degree: 'Bachelor of Science in Biology / Certificate in Teaching Program Education',
  };
  const educationHTML = generateEducationHTML(education);

  console.log('════════ EMPLOYMENT HTML (preview) ════════\n');
  console.log(employmentHTML.substring(0, 600) + (employmentHTML.length > 600 ? '...\n' : '\n'));
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

  const melissa = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'melissa';
  });

  if (!melissa) {
    console.error('❌ No se encontró a Melissa (melissa) en la colección de VAs');
    return;
  }

  console.log(`✅ Melissa encontrada: ${melissa.fieldData.name}`);
  console.log(`   Slug: ${melissa.fieldData.slug}`);
  console.log(`   ID: ${melissa.id}\n`);

  const currentEmployment = melissa.fieldData['employment-richtext'] || '';
  const currentEducation = melissa.fieldData['education-richtext'] || '';
  console.log('════════ EMPLOYMENT ACTUAL (length) ════════\n');
  console.log(`Employment-richtext length: ${currentEmployment.length}\n`);
  console.log('════════ EDUCATION ACTUAL ════════\n');
  console.log(`Education-richtext: ${currentEducation.substring(0, 200)}...\n`);

  const updates = {
    'employment-richtext': employmentHTML,
    'education-richtext': educationHTML,
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, melissa.id, updates);
    console.log('✅ Melissa actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 5 entradas en formato acordeón con descripciones completas.');
    console.log('  - Education: se corrigió la duplicación, dejando solo una entrada.');
  } catch (error) {
    console.error('❌ Error al actualizar a Melissa:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
