/**
 * Add Ricardo to Webflow CMS (full profile, following Angel scripts pattern).
 * Run with: node scripts/addRicardoToWebflow.js
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

// Ricardo's data (based on resume and draft profile)
export const ricardoData = {
  name: 'Ricardo',
  title: 'INSURANCE VIRTUAL ASSISTANT | VERIFICATIONS & POLICY PROCESSING',
  experienceYears: '8+ years',
  languages: 'Bilingual (EN-ES)',
  availability: 'Full Time',
  mainCategory: 'Insurance Virtual Assistant',

  summary:
    'Ricardo is an Insurance Virtual Assistant with experience in employment and education verifications, personal auto insurance operations, and customer service. He has processed background-check requests, handled policy quoting and processing, managed billing, cancellations, and renewals, and served as a point of contact between carriers, agents, and insureds. His background also includes public relations, sales, and branch management roles, giving him strong communication, organization, and leadership skills.',

  tagline:
    'Detail-oriented insurance virtual assistant specialized in verifications, policy processing, and high-volume customer support.',

  thumbnailDescription:
    'Insurance virtual assistant focused on background checks, policy processing, billing, and client support.',

  imageUrl:
    'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69a5a6f827f65d043960270e_Ricardo.webp',
  videoUrl: 'https://youtu.be/IpxlmU8Ibk0',
  videoThumbnail: 'https://img.youtube.com/vi/IpxlmU8Ibk0/hqdefault.jpg',

  slug: 'ricardo',
  profileSlug: 'ricardo-ocean-va-profile',
  specializations: [],

  allSkills: [
    'Employment & education verifications',
    'Insurance policy processing',
    'Customer service & client support',
    'Billing & cancellations',
    'Underwriting support',
    'Renewals reports',
    'Sales support & follow-up',
    'Public relations & campaign planning',
    'Inbound & outbound calls (80–100 per day)',
    'Team leadership & branch management',
    'Problem solving & time management',
    'Database and report lookups',
  ],

  tools: [
    'Background check and HR verification platforms',
    'Email & fax systems',
    'CRM & databases',
    'Microsoft Office',
    'Google Workspace',
    'Call center / phone systems',
  ],

  equipment: ['Noise-canceling headset', 'Two monitors'],

  // DISC & English (approximated from profile; can be refined later)
  discType: 'C',
  discDescription:
    'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work. Ricardo brings strong attention to detail and consistency across verifications, policy processing, and client communication.',

  englishTestType: 'TOEIC / CELE English Certificate',
  englishScore: 'B2',
  englishDescription:
    'Communicates confidently in English in professional and customer-facing environments. Can handle high-volume calls, explain processes clearly, and document information accurately, supported by formal English training and certification (CELE and TOEIC).',
  cefrResult: 'B2',

  employmentSummary:
    'Ricardo has over eight years of experience across insurance operations, verifications, public relations, and sales. At Mitratech he processed employment and education verifications as part of HR background checks, handling requests by phone, fax, and email. Previously at Alinsco & Al Boenker Insurance he supported the sales, processing, and customer service departments with quoting, new business processing, billing, cancellations, underwriting support, and renewals. His earlier roles in public relations, events, and branch management further strengthened his communication, leadership, and client-facing skills.',

  employmentHistory: [
    {
      company: 'Mitratech',
      position: 'Verifications Specialist',
      period: 'April 2023 – February 2026',
      // Work experience kept with "- " bullets as in resume
      description:
        '-Processed employment and education verifications via phone calls, fax and emails. Providing services to third-party verifiers and applicants.\n-HR Solution for background checks',
    },
    {
      company: 'Alinsco & Al Boenker Insurance',
      position: 'Insurance Operations Support (Sales, Processing & Customer Service)',
      period: 'August 2022 – April 2023',
      description:
        'Sales department:\n-Taking all information for an insurance quote and provide to sales agents.\n-Completing follow up process for new quotes.\n-Assisting customers to e-sign applications so they can be ready to process.\n\nProcessor:\n-Processing new policies.\n-Review e-signatures and payment information.\n-Review documents to match the guidelines for each company.\n\nCustomer service:\n-Working emails and fax from customers and companies.\n-Being point of contact for different companies, sales agents, and insureds.\n-Billing.\n-Cancellations\n-Inbound and Outbound calls.\n-Underwriting.\n-Renewals reports.',
    },
    {
      company: 'Habitar con Dios',
      position: 'Public Relations Executive',
      period: 'January 2018 – June 2022',
      description:
        '-Prospecting new customers.\n-Creation of public campaigns.\n-Planning special events.\n-Social media management.\n-Research for marketing assets.',
    },
    {
      company: 'Casa #6 Centro Histórico',
      position: 'Branch Manager',
      period: 'January 2017 – November 2018',
      description:
        '-Staff management.\n-Customer service.\n-Translations.\n-Sales.\n-Implementation of ideas for the Casa #6 Museum.',
    },
    {
      company: 'Mi Cielo Artesanal',
      position: 'Sales Representative',
      period: 'January 2016 – January 2017',
      description:
        '-Customer service.\n-Translations.\n-Store sales (Mexican crafs)',
    },
  ],

  education: [
    {
      school: 'CNCI University',
      degree: 'High School Diploma',
      year: '',
    },
    {
      school: 'CELE / TOEIC',
      degree: 'English Certificate',
      year: '',
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
  if (!activeLevel) return '';
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
  const data = ricardoData;

  try {
    console.log('🔗 Adding Ricardo to Webflow CMS (full profile)...\n');

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
      console.error(`❌ Main Category "${data.mainCategory}" not found`);
      console.log('Available:', Object.keys(mainCategoryMap).join(', '));
      process.exit(1);
    }
    console.log(`✅ Main Category: "${data.mainCategory}"\n`);

    const skillsHTML = generateSkillsHTML(data.allSkills);
    const toolsHTML = generateToolsHTML(data.tools);
    const equipmentHTML = generateEquipmentHTML(data.equipment);
    const cefrHTML = data.cefrResult ? generateCEFRHTML(data.cefrResult) : '';
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
    };

    if (data.discType) {
      fieldData['disc-type-2'] = data.discType;
    }
    if (discDescriptionHTML) {
      fieldData['disc-description'] = discDescriptionHTML;
    }
    if (data.englishTestType) {
      fieldData['type-of-english-test'] = data.englishTestType;
    }
    if (data.englishScore) {
      fieldData['english-score-3'] = data.englishScore;
    }
    if (englishDescriptionHTML) {
      fieldData['english-description'] = englishDescriptionHTML;
    }
    if (cefrHTML) {
      fieldData['cerf-result'] = cefrHTML;
    }
    if (specializationIds.length > 0) {
      fieldData.specialization = specializationIds;
    }

    console.log('📤 Creating Ricardo in Webflow CMS...\n');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log(`  Image: ${data.imageUrl ? '✅' : '—'}`);
    console.log(`  Video: ${data.videoUrl ? '✅' : '— (add later)'}\n`);

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Ricardo added successfully!\n`);
    console.log(`📌 Item ID: ${itemId}`);
    console.log(`📌 Slug: ${data.slug}`);
    console.log(`📌 Profile URL: https://www.oceanvirtualassistant.com/${data.profileSlug}\n`);
    console.log('═'.repeat(80));
    console.log('✨ Verify the new VA profile in Webflow CMS and on the live site.');
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

