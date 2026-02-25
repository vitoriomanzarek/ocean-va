/**
 * Script para recargar TODA la información de Ximena G (slug: ximena)
 * usando los datos de src/pages/XimenaGProfile.jsx
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

function generateSkillsHTML(skills) {
  // El template ya proporciona <div class="va-skills-container">, solo generar los span tags
  return skills.map(skill => `<span class="va-skill-tag">${escapeHtml(skill)}</span>`).join('');
}

function generateToolsHTML(tools) {
  return tools.map(tool => `
<div class="va-tool-item">
  <span class="va-tool-checkmark">✓</span>
  <span>${escapeHtml(tool)}</span>
</div>`.trim()).join('');
}

function generateEquipmentHTML(equipment) {
  const equipmentIcons = {
    'Two-Monitor Setup': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-Cancelling Headset': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`
  };

  return equipment.map(item => {
    const icon = equipmentIcons[item] || '';
    return `
<div class="va-equipment-item">
  ${icon}
  <span>${escapeHtml(item)}</span>
</div>`.trim();
  }).join('');
}

function generateEmploymentAccordionHTML(entries) {
  const iconSvg = `<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

  const accordions = entries.map((entry) => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    const descriptionRaw = entry.description || '';
    
    // Procesar la descripción: convertir \n a <br>
    let description = descriptionRaw;
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

function generateCEFRHTML(activeLevel) {
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const cefrDescriptions = [
    'Can understand and use familiar everyday expressions and basic questions about personal details.',
    'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    'Can communicate confidently in a variety of academic and professional environments.',
    'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'Can understand with ease virtually everything heard or read and can summarize information from different sources.'
  ];
  
  const items = cefrLevels.map((level, idx) => {
    const isActive = level.toUpperCase() === activeLevel.toUpperCase();
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    
    return `<div class="va-cefr-item">
  <div class="va-cefr-bubble ${bubbleClass}">${level}</div>
  <p class="va-cefr-description">${cefrDescriptions[idx]}</p>
</div>`;
  }).join('\n');
  
  return items;
}

async function main() {
  console.log('🔧 Recargando TODA la información de Ximena G (slug: ximena)...\n');

  // Datos de Ximena G desde XimenaGProfile.jsx
  const ximenaGData = {
    skills: [
      'Home & Auto Policy Management',
      'Cross-Selling & Client Retention',
      'Back-Office Support',
      'Customer Service',
      'Billing Resolution',
      'Carrier Communication',
      'Quoting on Existing Policies',
      'Payments & Cancellations',
      'Underwriting',
      'Renewals',
      'Documentation Requests'
    ],
    tools: [
      'Microsoft Office Suite',
      'Google Workspace',
      'Insurance Carrier Platforms',
      'CRM & Communication Tools',
      'Email & Calendar Management Systems'
    ],
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    employmentSummary: 'Ximena G. has 2 years of insurance experience, gained through her roles at Qualfon, where she worked on the Allstate Insurance Campaign, and Ocean Virtual Assistant Solutions. At Qualfon, she specialized in home and auto insurance policies, providing bilingual customer service to U.S. clients. Her expertise includes managing policy changes, renewals, cancellations, billing, and coordinating with carriers for issue resolution. Additionally, she has strong skills in customer service, training new agents, and cross-selling insurance products to enhance client coverage. She also has experience in educational advisement, demonstrating her ability to provide guidance and manage detailed processes effectively.',
    employmentHistory: [
      {
        company: 'OCEAN VIRTUAL ASSISTANT SOLUTIONS',
        position: 'Virtual Assistant',
        period: '2023 - 2025',
        description: '• Provide remote support to U.S. insurance agencies in policy management, client services, and administrative processes.\n• Manage policies (renewals, endorsements, cancellations, billing).\n• Offer customer service via email, phone, and text.\n• Communicate with carriers for issue resolution.\n• Cross-sell products and train new team members.\n• Oversee payment processing and documentation management.'
      },
      {
        company: 'QUALFON - ALLSTATE INSURANCE CAMPAIGN',
        position: 'Bilingual Customer Service Agent & Training Support',
        period: '2021 - 2023',
        description: '• Delivered bilingual customer service to U.S. clients for home and auto insurance policies.\n• Assisted in training new agents and maintained service quality standards.\n• Managed policy changes, renewals, cancellations, and billing.\n• Coordinated with carriers to resolve client issues.\n• Trained and mentored new agents.\n• Cross-sold insurance products to strengthen client coverage.'
      },
      {
        company: 'UNIVERSIDAD CUGS',
        position: 'Educational Advisor / Call Center',
        period: '2018 - 2019',
        description: '• Provided guidance to prospective students on admissions and enrollment processes.\n• Handled calls, answered inquiries, and maintained accurate student records while ensuring excellent customer service.\n• Supported students with academic program details and documentation.\n• Managed inbound/outbound calls and follow-ups.\n• Assisted in orientations and enrollment support.'
      }
    ],
    discType: 'S+C', // ID: 6e45ac02de98a68482a875d8646ab49e
    discDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    englishScore: '7.6',
    englishDescription: 'Speaks fluently with natural pronunciation and minimal pauses, making communication clear and engaging. Uses advanced vocabulary and complex grammar structures effectively to express nuanced ideas.',
    cefrLevel: 'C1',
    videoUrl: 'https://youtu.be/UQ2JcPPjEnE',
    videoThumbnail: 'https://img.youtube.com/vi/UQ2JcPPjEnE/maxresdefault.jpg',
    thumbnailDescription: 'Insurance expertise, Policy servicing, Customer communication'
  };

  // Generar HTML
  const skillsHTML = generateSkillsHTML(ximenaGData.skills);
  const toolsHTML = `<div class="va-tools-list">${generateToolsHTML(ximenaGData.tools)}</div>`;
  const equipmentHTML = `<div class="va-equipment-list">${generateEquipmentHTML(ximenaGData.equipment)}</div>`;
  const employmentHTML = generateEmploymentAccordionHTML(ximenaGData.employmentHistory);
  const cefrHTML = generateCEFRHTML(ximenaGData.cefrLevel);
  const discDescriptionHTML = `<p>${ximenaGData.discDescription.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
  const englishDescriptionHTML = `<p>${ximenaGData.englishDescription}</p>`;

  console.log('════════ DATOS GENERADOS ════════\n');
  console.log(`✅ Skills: ${ximenaGData.skills.length} skills`);
  console.log(`✅ Tools: ${ximenaGData.tools.length} tools`);
  console.log(`✅ Equipment: ${ximenaGData.equipment.length} items`);
  console.log(`✅ Employment History: ${ximenaGData.employmentHistory.length} entries`);
  console.log(`✅ DISC Type: ${ximenaGData.discType}`);
  console.log(`✅ English Score: ${ximenaGData.englishScore}/9`);
  console.log(`✅ CEFR Level: ${ximenaGData.cefrLevel}\n`);

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

  const ximena = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'ximena';
  });

  if (!ximena) {
    console.error('❌ No se encontró a Ximena G (slug: ximena) en la colección de VAs');
    return;
  }

  console.log(`✅ Ximena G encontrada: ${ximena.fieldData.name}`);
  console.log(`   Slug: ${ximena.fieldData.slug}`);
  console.log(`   ID: ${ximena.id}\n`);

  // Preparar updates
  const updates = {
    'skills-richtext': skillsHTML,
    'tools-tags': ximenaGData.tools.join('; '),
    'tools-richtext': toolsHTML,
    'equipment-tags': ximenaGData.equipment.join('; '),
    'equipment-richtext': equipmentHTML,
    'employment-summary': ximenaGData.employmentSummary,
    'employment-richtext': employmentHTML,
    'disc-type-2': '6e45ac02de98a68482a875d8646ab49e', // S+C
    'disc-description': discDescriptionHTML,
    'english-score-3': ximenaGData.englishScore,
    'english-description': englishDescriptionHTML,
    'cerf-result': cefrHTML,
    'video': ximenaGData.videoUrl,
    'video-thumbnail-2': ximenaGData.videoThumbnail,
    'thumbnail-description': ximenaGData.thumbnailDescription,
    'education-richtext': '' // Not provided
  };

  console.log('📤 Actualizando CMS...\n');

  try {
    await apiClient.updateCollectionItem(vaCollection.id, ximena.id, updates);
    console.log('✅ Ximena G actualizada exitosamente.\n');
    console.log('Resumen:');
    console.log('  - Skills: recargados (11 skills)');
    console.log('  - Tools: recargados (5 tools)');
    console.log('  - Equipment: recargado (2 items)');
    console.log('  - Employment Summary: recargado');
    console.log('  - Employment History: recargado (3 entradas en formato acordeón)');
    console.log('  - DISC Type: S+C');
    console.log('  - DISC Description: recargada');
    console.log('  - English Score: 7.6/9');
    console.log('  - English Description: recargada');
    console.log('  - CEFR Result: C1 activo');
    console.log('  - Video: recargado');
    console.log('  - Video Thumbnail: recargado');
    console.log('  - Thumbnail Description: recargado');
    console.log('  - Education: vacío (Not provided)');
  } catch (error) {
    console.error('❌ Error al actualizar a Ximena G:', error.message);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
