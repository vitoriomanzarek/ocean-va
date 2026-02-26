/**
 * Add Angel Enrique to Webflow CMS (all fields from resume + image).
 * Video can be added later via update script.
 * Run with: node scripts/addAngelEnriqueToWebflow.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}
if (!siteId) {
  console.error('❌ WEBFLOW_SITE_ID not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Angel Enrique's data (from resume PDF + provided image)
const angelEnriqueData = {
  name: 'Angel Enrique',
  title: 'BILINGUAL VA | PROPERTY MANAGEMENT VIRTUAL ASSISTANT',
  experienceYears: '6+ years',
  languages: 'Bilingual (EN-ES)',
  availability: 'Full Time',
  mainCategory: 'Property Management Virtual Assistant',

  summary:
    'Angel Enrique is a property management professional with experience in bilingual communication, tenant relations, and process coordination. He is skilled in incident resolution, technical documentation, and workflow management. He has supported U.S.-based property management operations with work orders, tenant and pet screenings, lead follow-up, contract translation, and property viewings using AppFolio, Buildium, and Rentvine.',

  tagline:
    'Bilingual property management VA with strong experience in work orders, tenant relations, and operations coordination.',

  thumbnailDescription:
    'Property management VA: work orders, tenant screening, AppFolio, Buildium, Rentvine, bilingual support.',

  imageUrl:
    'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/699f5397dd266a039c2a10ed_Angel%20Enrique.webp',
  videoUrl: '',
  videoThumbnail: '',

  slug: 'angel-enrique',
  profileSlug: 'angel-enrique-ocean-va-profile',
  specializations: [],

  allSkills: [
    'Bilingual Communication (Spanish-English)',
    'Property Management',
    'Work Orders',
    'Tenant & Pet Screening',
    'Lead Follow-up',
    'Contract Translation',
    'Property Viewings',
    'AppFolio',
    'Buildium',
    'Rentvine',
    'Vendor Dispatch',
    'Invoicing',
    'Team Collaboration',
    'Organization & Time Management',
    'Customer Service',
    'Data Entry',
    'Scheduling',
    'Reporting',
  ],

  tools: [
    'AppFolio',
    'Buildium',
    'Rentvine',
    'Microsoft Office',
    'Email & phone communication',
  ],

  equipment: ['Noise-canceling headset', 'Two monitors'],

  discType: 'S',
  discDescription:
    'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',

  englishTestType: 'Internal Assessment',
  englishScore: 'B2',
  englishDescription:
    'Strong bilingual (English-Spanish) communication in professional and customer-facing contexts, including tenant relations and property management operations.',
  cefrResult: 'B2',

  employmentSummary:
    'Angel Enrique has over six years of experience in property management and operations. At Rentifi Property Management he created and managed work orders, conducted tenant and pet screenings, followed up with leads, translated contracts, and coordinated property viewings using AppFolio, Buildium, and Rentvine. He has also worked in maintenance, administration, and applications departments with work orders, vendor dispatch, and invoicing. Previously he supervised night shift operations at Budget Rental Car Mexico, overseeing contracts, vehicle records, service schedules, and payroll.',

  employmentHistory: [
    {
      company: 'Yes Virtual Mexico – Rentifi Property Management',
      position: 'Property Management Virtual Assistant',
      period: 'Feb 2025 – Dec 2025',
      description:
        'Created and managed work orders, conducted tenant and pet screenings, followed up with new leads, translated contracts, and coordinated property viewings, among other administrative tasks. Used property management applications such as AppFolio, Buildium, and Rentvine.',
    },
    {
      company: 'Yes Virtual Mexico – Maintenance Department',
      position: 'Maintenance, Administration & Applications Support',
      period: 'Oct 2023 – Feb 2025',
      description:
        'Rotated through Maintenance, Administration, and Applications departments. Gained hands-on experience in creating and following up on work orders, dispatching vendors, generating invoices, and supporting various operational tasks across departments.',
    },
    {
      company: 'Budget Rental Car Mexico',
      position: 'Night Shift Supervisor',
      period: 'Feb 2019 – Oct 2023',
      description:
        'Supervised the night shift, overseeing all operational and sales activities. Ensured contracts were complete with proper documentation, verified that vehicles had updated records, tracked service schedules, and managed payroll for employees under supervision.',
    },
  ],

  education: [
    {
      school: 'Instituto Politécnico Nacional',
      degree: 'Economics',
      year: '2007',
    },
  ],
};

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateSkillsHTML(skills) {
  if (!skills || skills.length === 0) return '';
  const tags = skills
    .map((skill) => `<span class="va-skill-tag">${escapeHtml(skill)}</span>`)
    .join('');
  return `<div class="va-skills-container">${tags}</div>`;
}

function generateToolsHTML(tools) {
  if (!tools || tools.length === 0) return '';
  const items = tools
    .map(
      (tool) =>
        `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(
          tool,
        )}</span></div>`,
    )
    .join('');
  return `<div class="va-tools-list two-column">${items}</div>`;
}

function generateEquipmentHTML(equipment) {
  if (!equipment || equipment.length === 0) return '';
  const monitorSVG =
    '<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
  const headsetSVG =
    '<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a9 9 0 00-9 9v7a3 3 0 003 3h1a2 2 0 002-2v-4a2 2 0 00-2-2H5v-2a7 7 0 0114 0v2h-2a2 2 0 00-2 2v4a2 2 0 002 2h1a3 3 0 003-3v-7a9 9 0 00-9-9z"></path></svg>';
  const items = equipment
    .map((eq) => {
      const lower = eq.toLowerCase();
      const isMonitor = lower.includes('monitor');
      const svg = isMonitor ? monitorSVG : headsetSVG;
      return `<div class="va-equipment-item">${svg}<span>${escapeHtml(eq)}</span></div>`;
    })
    .join('');
  return `<div class="va-equipment-list">${items}</div>`;
}

function generateCEFRHTML(activeLevel) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const descriptions = {
    A1: 'Can understand and use familiar everyday expressions and basic questions about personal details.',
    A2: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    B1: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    B2: 'Can communicate confidently in a variety of academic and professional environments.',
    C1: 'Can use the language flexibly and effectively for social, academic and professional purposes.',
    C2: 'Can interact with ease and can differentiate their shades of meaning.',
  };
  const items = levels
    .map((level) => {
      const isActive = level === activeLevel;
      const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
      return `<div class="va-cefr-item"><div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(
        level,
      )}</div><p class="va-cefr-description">${escapeHtml(descriptions[level])}</p></div>`;
    })
    .join('\n');
  return `<div class="va-cefr-grid">\n${items}\n</div>`;
}

function generateEmploymentAccordionHTML(entries) {
  if (!entries || entries.length === 0) return '';
  const iconSvg = `<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
  const accordions = entries.map((entry) => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = entry.description || '';
    if (description.includes('\n')) description = description.replace(/\n/g, '<br>');
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

function generateEducationHTML(educationEntries) {
  if (!educationEntries || educationEntries.length === 0) return '';
  return educationEntries
    .map((entry, index) => {
      const school = escapeHtml(entry.school || '');
      const degree = escapeHtml(entry.degree || '');
      const year = entry.year != null && entry.year !== '' ? escapeHtml(String(entry.year)) : '';
      const yearHtml = year ? `<p class="va-education-year">${year}</p>` : '';
      const margin = index > 0 ? ' style="margin-top: 16px;"' : '';
      return `<div class="va-education-item"${margin}><h3 class="va-education-school">${school}</h3><p class="va-education-degree">${degree}</p>${yearHtml}</div>`;
    })
    .join('\n');
}

async function main() {
  const data = angelEnriqueData;
  try {
    console.log('🔗 Adding Angel Enrique to Webflow CMS (all fields)...\n');

    const site = await client.getSite(siteId);
    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    const collectionsResponse = await client.getCollections(siteId);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants',
    );
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations',
    );
    let specializationIds = [];
    if (specializationsCollection && data.specializations.length > 0) {
      const specializationsResponse = await client.getCollectionItems(
        specializationsCollection.id,
        { limit: 200 },
      );
      const specializationMap = {};
      specializationsResponse.items.forEach((item) => {
        const name = item.fieldData.name || item.fieldData['specialization-name'];
        if (name) specializationMap[name] = item.id;
      });
      specializationIds = data.specializations
        .map((spec) => specializationMap[spec])
        .filter((id) => id);
    }

    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories',
    );
    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found');
      process.exit(1);
    }
    console.log(`📍 Main Category Collection ID: ${mainCategoryCollection.id}\n`);

    const mainCategoryResponse = await client.getCollectionItems(mainCategoryCollection.id, {
      limit: 50,
    });
    const mainCategoryMap = {};
    mainCategoryResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['category-name'];
      if (name) mainCategoryMap[name] = item.id;
    });

    // Try exact name first; fallback to similar if needed
    let mainCategoryId = mainCategoryMap[data.mainCategory];
    if (!mainCategoryId) {
      const similar = Object.keys(mainCategoryMap).find(
        (k) =>
          k.toLowerCase().includes('property') ||
          k.toLowerCase().includes('real estate') ||
          k.toLowerCase().includes('executive'),
      );
      if (similar) {
        console.log(
          `⚠️ "${data.mainCategory}" not found. Using "${similar}" instead. (Available: ${Object.keys(mainCategoryMap).join(', ')})`,
        );
        data.mainCategory = similar;
        mainCategoryId = mainCategoryMap[similar];
      }
    }
    if (!mainCategoryId) {
      console.error(`❌ Main Category "${data.mainCategory}" not found`);
      console.log('Available:', Object.keys(mainCategoryMap).join(', '));
      process.exit(1);
    }
    console.log(`✅ Main Category: "${data.mainCategory}"\n`);

    const skillsHTML = generateSkillsHTML(data.allSkills);
    const toolsHTML = generateToolsHTML(data.tools);
    const equipmentHTML = generateEquipmentHTML(data.equipment);
    const cefrHTML = generateCEFRHTML(data.cefrResult);
    const employmentHTML = generateEmploymentAccordionHTML(data.employmentHistory);
    const educationHTML = generateEducationHTML(data.education);
    const discDescriptionHTML = data.discDescription
      ? `<p>${escapeHtml(data.discDescription)}</p>`
      : '';
    const englishDescriptionHTML = data.englishDescription
      ? `<p>${escapeHtml(data.englishDescription)}</p>`
      : '';

    const fieldData = {
      name: data.name,
      slug: data.slug,
      'title-2': data.title,
      'experience-years': data.experienceYears,
      languages: data.languages,
      availability: data.availability,
      'main-category': data.mainCategory,
      'main-categories': [mainCategoryId],
      image: data.imageUrl,
      video: data.videoUrl || '',
      'video-thumbnail-2': data.videoThumbnail || '',
      'profile-slug-2': `https://www.oceanvirtualassistant.com/${data.profileSlug}`,
      summary: data.summary,
      tagline: data.tagline,
      'thumbnail-description': data.thumbnailDescription,
      'skills-tags': data.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': data.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': data.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': data.employmentSummary,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
      'disc-type-2': data.discType,
      'disc-description': discDescriptionHTML,
      'type-of-english-test': data.englishTestType,
      'english-score-3': data.englishScore,
      'english-description': englishDescriptionHTML,
      'cerf-result': cefrHTML,
    };
    if (specializationIds.length > 0) {
      fieldData.specialization = specializationIds;
    }

    console.log('📤 Creating Angel Enrique in Webflow CMS...\n');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log(`  Image: ${data.imageUrl ? '✅' : '—'}`);
    console.log(`  Video: ${data.videoUrl ? '✅' : '— (add later)'}\n`);

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Angel Enrique added successfully!\n`);
    console.log(`📌 Item ID: ${itemId}`);
    console.log(`📌 Slug: ${data.slug}`);
    console.log(`📌 Profile URL: https://www.oceanvirtualassistant.com/${data.profileSlug}\n`);
    console.log('═'.repeat(80));
    console.log('✨ When you have the video URL, run an update script to set video + video-thumbnail-2.');
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
