/**
 * Script para recargar el Employment History y corregir la Education de Maria (slug: maria)
 * usando los datos de src/pages/MariaFernandaProfile.jsx y el formato de acordeón.
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
    
    // La descripción puede contener HTML válido (<br>), así que NO la escapamos
    // Solo convertimos \n a <br> si es necesario
    // El contenido es controlado por nosotros, así que es seguro
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
  console.log('🔧 Corrigiendo Employment History y Education de Maria (maria)...\n');

  // Definir las entradas de empleo basadas en MariaFernandaProfile.jsx
  const employmentEntries = [
    {
      company: 'SEGUROS SURA',
      position: 'Customer Service',
      period: '2017',
      description:
        '• I was in charge of customer service, recruitment and management of personnel, database monitoring, hiring management.',
    },
    {
      company: 'SERIGAS DEL CARIBE S.A',
      position: 'Human Resource',
      period: '2018 - 2021',
      description:
        '• Worked closely with clients and members of the Human Resources team, for hiring and payroll management.',
    },
    {
      company: 'MOSAIC S.A',
      position: 'Reception Manager',
      period: '2021 - 2022',
      description:
        '• I worked as a bilingual Reception Manager, leading the management and attention to international clientele, ensuring exceptional service and facilitating fluid communication in two languages.',
    },
    {
      company: 'FRCONTENT LLC',
      position: 'Executive Assistant',
      period: '2022 - 2024',
      description:
        '• I worked as an executive assistant and leader of the Culture and HR department in a bilingual international company, supervising executive administrative functions and managing initiatives related to corporate culture and human resources to ensure an efficient and collaborative work environment.',
    },
    {
      company: 'OCEAN VA SOLUTIONS',
      position: 'Customer Service & Administrative Assistant',
      period: 'AUG 2024 - JUN 2025',
      description:
        '• Managed inbound/outbound calls, email and calendar coordination, and quote generation for insurance clients.<br>' +
        '• Handled policy changes and client records using Ezlynx, Neptune, TWIA, TFPA, and Wellington platforms.<br>' +
        '• Created branded content, presentations, and short videos using Canva and Adobe; supported social media management.<br>' +
        '• Assisted with billing, HR-related tasks, and data organization using advanced Excel skills.',
    },
  ];

  const employmentHTML = generateEmploymentAccordionHTML(employmentEntries);

  // Educación basada en MariaFernandaProfile.jsx (solo una entrada, sin duplicados)
  const education = {
    school: 'IE Centro Inca / U. Autónoma del Caribe',
    degree: 'Commercial Banking Technique / Maritime and River Administrator',
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

  // Buscar específicamente a Maria con slug exacto "maria" (sin guiones ni otros caracteres)
  const maria = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'maria';
  });

  if (!maria) {
    console.error('❌ No se encontró a Maria (maria) en la colección de VAs');
    return;
  }

  console.log(`✅ Maria encontrada: ${maria.fieldData.name}`);
  console.log(`   Slug: ${maria.fieldData.slug}`);
  console.log(`   ID: ${maria.id}\n`);

  const currentEmployment = maria.fieldData['employment-richtext'] || '';
  const currentEducation = maria.fieldData['education-richtext'] || '';
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
    await apiClient.updateCollectionItem(vaCollection.id, maria.id, updates);
    console.log('✅ Maria actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Employment History: se cargaron 5 entradas en formato acordeón con descripciones completas.');
    console.log('  - Education: se corrigió la duplicación, dejando solo una entrada.');
    console.log('  - El título "EMPLOYMENT HISTORY" está en el template, no en este campo.');
  } catch (error) {
    console.error('❌ Error al actualizar a Maria:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
