/**
 * Add Alejandra to Webflow CMS (all fields from resume PDF + image).
 * Video can be added later via update script.
 * Run with: node scripts/addAlejandraToWebflow.js
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

// Alejandra's data (from resume PDF + provided image)
const alejandraData = {
  name: 'Alejandra',
  title: 'EXECUTIVE VA | HR & ADMINISTRATIVE VIRTUAL ASSISTANT',
  experienceYears: '10+ years',
  languages: 'Bilingual (EN-ES)',
  availability: 'Full Time',
  mainCategory: 'Executive Virtual Assistant',

  summary:
    'Alejandra is a Business Administration professional with 2 years of experience as Human Resources Manager and 8 years as State Investigator. She is adept at managing human capital, implementing policies for optimized performance, and excelling in analytical approach and efficient resolution of complex situations. Strong communication skills in professional and interpersonal contexts, with logistic and administrative support across various work areas.',

  tagline:
    'Executive and HR VA with leadership versatility, strategic formulation, and experience in personnel management and analytical problem-solving.',

  thumbnailDescription:
    'Executive VA: HR, personnel management, administrative support, strategic planning, B1 English.',

  imageUrl:
    'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/699f59a62a26f78659491c42_Alejandra%20Ana%20Karen.webp',
  videoUrl: '',
  videoThumbnail: '',

  slug: 'alejandra',
  profileSlug: 'alejandra-ocean-va-profile',
  specializations: [],

  allSkills: [
    'Human Resources Management',
    'Personnel Analysis & Selection',
    'Hiring & Training',
    'Psychometric Assessments',
    'Strategic Formulation',
    'Problem Tracking & Resolution',
    'Administrative Support',
    'Logistic Support',
    'Teamwork & Leadership',
    'Task Prioritization',
    'Multitasking',
    'Conflict Resolution',
    'Supplier Communication',
    'Decision-Making',
    'Written & Oral Communication',
    'Adaptability',
    'Working Under Pressure',
  ],

  tools: [
    'Microsoft Office',
    'Email & phone communication',
    'HR and recruitment platforms',
  ],

  equipment: ['Noise-canceling headset', 'Two monitors'],

  discType: 'C',
  discDescription:
    'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',

  englishTestType: 'Internal Assessment',
  englishScore: 'B1',
  englishDescription:
    'Can deal with most situations likely to arise while traveling or in work contexts. Can produce simple connected text and describe experiences, events, and goals.',
  cefrResult: 'B1',

  employmentSummary:
    'Alejandra has over 10 years of combined experience in HR management and investigative roles. As Human Resources Manager at Administración Soriana she was responsible for personnel analysis, selection, hiring, training, and retention, implementing initiatives for candidate selection, interviews, knowledge tests, and psychometric assessments. As State Investigator at Fiscalía General del Estado she has investigated and followed up on criminal incidents with adherence to legal frameworks. She has also served as Assistant Manager at Costco Wholesale with merchandise registration, customer service, decision-making, and supplier communication.',

  employmentHistory: [
    {
      company: 'Fiscalía General del Estado',
      position: 'State Investigator',
      period: 'Feb 2016 – Present',
      description:
        'Investigate, follow up, and clarify reported criminal incidents, adhering to legal frameworks with respect for citizens\' fundamental rights and principles of efficiency, professionalism, and integrity.',
    },
    {
      company: 'Administración Soriana SA de CV',
      position: 'Human Resources Manager',
      period: 'Dec 2012 – Jan 2015',
      description:
        'Responsible for personnel analysis, selection, hiring, training, and retention. Implemented initiatives to find the best-suited candidates, conducted interviews, knowledge tests, and psychometric assessments. Fostered a positive work environment and individual employee development to achieve organizational goals.',
    },
    {
      company: 'Costco Wholesale',
      position: 'Assistant Manager',
      period: 'June 2011 – July 2012',
      description:
        'Managed merchandise registration, value handling, and direct customer service activities. Involved in decision-making, conflict resolution, strategic thinking, planning, organization, and information control. Supported managerial administrative situations and logistic assistance. Responsible for supplier communication and follow-up, both national and international.',
    },
  ],

  education: [
    {
      school: 'UABC – Ensenada, B.C.',
      degree: "Bachelor's degree in Business Administration",
      year: 'Feb 2007 – Aug 2011',
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
  const data = alejandraData;
  try {
    console.log('🔗 Adding Alejandra to Webflow CMS (all fields)...\n');

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

    let mainCategoryId = mainCategoryMap[data.mainCategory];
    if (!mainCategoryId) {
      const similar = Object.keys(mainCategoryMap).find((k) =>
        k.toLowerCase().includes('executive'),
      );
      if (similar) {
        console.log(
          `⚠️ "${data.mainCategory}" not found. Using "${similar}". (Available: ${Object.keys(mainCategoryMap).join(', ')})`,
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

    console.log('📤 Creating Alejandra in Webflow CMS...\n');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log(`  Image: ${data.imageUrl ? '✅' : '—'}`);
    console.log(`  Video: ${data.videoUrl ? '✅' : '— (add later)'}\n`);

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Alejandra added successfully!\n`);
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
