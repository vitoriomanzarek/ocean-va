/**
 * Add Angel Alberto to Webflow CMS
 * Run with: node scripts/addAngelAlbertoToWebflow.js
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

// Angel Alberto's data
const angelData = {
  name: 'Angel Alberto',
  title: 'BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT',
  experienceYears: '4+ years',
  languages: 'Bilingual (EN-ES)',
  availability: 'Full Time',
  mainCategory: 'Insurance Virtual Assistant',

  // Summary
  summary:
    'Angel is a multilingual Virtual Assistant with strong experience in insurance customer service, sales support, client retention, and portfolio management in international environments. He has supported U.S.-based insurance clients, handling policy inquiries, endorsements, billing support, quoting, and relationship management. Angel is focused on delivering professional, empathetic support that helps maintain client loyalty and drive revenue growth.',

  // Tagline
  tagline:
    'Multilingual insurance virtual assistant supporting client relationships, policy servicing, and revenue growth with professionalism and empathy.',

  // Thumbnail Description
  thumbnailDescription:
    'Bilingual executive support with CEO and HR assistance, calendar, payroll, and operations.',

  // Media (image/video will be added later)
  imageUrl: '',
  videoUrl: '',
  videoThumbnail: '',

  // Profile slug
  slug: 'angel-alberto',
  profileSlug: 'angel-alberto-ocean-va-profile',

  // Specializations (optional – can be wired later)
  specializations: [],

  // Skills (for tags + rich text)
  allSkills: [
    'Insurance Customer Service',
    'Policy Support',
    'Endorsements',
    'Billing',
    'Quoting Assistance',
    'Client Retention',
    'Cancellation Prevention',
    'Sales & Portfolio Management',
    'Account Recovery',
    'Collections Negotiation',
    'Customer Onboarding',
    'Relationship Management',
    'Administrative Documentation',
    'Cross-Department Coordination',
  ],

  // Tools & Platforms
  tools: [
    'Microsoft Office (Advanced)',
    'CRM & Customer Management Platforms',
    'Insurance Systems & Client Portals',
    'Email and phone communication tools',
  ],

  // Equipment
  equipment: ['Noise-canceling headset', 'Two monitors'],

  // DISC
  discType: 'S',
  discDescription:
    'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',

  // English
  englishTestType: 'Internal Assessment',
  englishScore: 'C1',
  englishDescription:
    'Demonstrates strong fluency, excellent comprehension, and confident professional communication in complex business environments.',
  cefrResult: 'C1',

  // Employment History (for employment-richtext)
  employmentHistory: [
    {
      company: 'Royal Holiday | Vacations Club',
      position: 'New Members Department/Recovery/Collections/Portfolio Conversion/Sales',
      period: 'SEP 15, 2024 – DEC 4, 2025',
      description:
        'Strengthened client relationships following the recent sale of their membership. Delivered immediate onboarding for membership usage, consistently promoting and closing sales of associated services (travel destinations, insurance products, and other benefits). Supported clients by addressing a wide range of needs, from general inquiries to complex cases.\nSpecialized in client retention and cancellation management, implementing strategies to recover accounts and maintain loyalty. Managed client portfolios by ensuring payment follow-up and leading the recovery of delinquent accounts through effective negotiation.\nHandled and supported client portfolios in both English and French. Recovered previously cancelled accounts through effective negotiation strategies. Performed portfolio conversions between different companies to expand the client base, particularly through the sale of new products. Conducted direct product sales to prospects.\nDeveloped efficient internal communication across company departments to resolve member needs. Proficient in Microsoft Office (Advanced Level).',
    },
    {
      company: 'Landing | Premium Furnished Apartment Rentals | Start-Up',
      position: 'Member Support Analyst',
      period: 'JUN 10, 2024 – JUL 19, 2024',
      description:
        'Member Support Analyst Responsibilities: I was responsible for assisting clients with both general and complex inquiries regarding their Landing leaseholder memberships. My role included supporting immediate reservation changes, resolving emergency and maintenance unit requests, and quoting new stays by analyzing variables such as unit and building characteristics. I also provided guidance on billing issues while fostering strong relationships with clients, ensuring their concerns and emotions were addressed to create an excellent customer experience. Additionally, I developed efficient internal communication across departments to report and resolve member issues, while leveraging advanced iOS software and hardware tools to support daily operations.',
    },
    {
      company: 'Allstate Insurance Company-Qualfon Mexico',
      position: 'Insurance Customer Care Representative | Unlicensed Agent and Roadside Assistance Department',
      period: 'AUG 21 – JUN 4',
      description:
        "Unlicensed Agent Key Responsibilities: Assisting general and elaborated inquiries about client's insurance products in each USA state. Explaining and educating how policy holder's insurance or policy works. Supporting and following up customers´ endorsements and billings critical scenarios. Endorsing and quoting policies. Developing relations with customers and taking care their thoughts and emotions. Creating a splendid customer experience | Coaching partner and Floor Support: Assisting and educating internal Allstate agents about insurance product´s processes.\nRoadside Assistance Key Responsibilities: Assisting motor vehicles emergency scenes by offering different services as towing, winch, tire change, jump start and fuel delivery support. Quoting and dealing with providers to obtain the best inquired services: Price-Quality-ETA. Explaining and Educating how Roadside services work. Developing relations with customers and taking care their thoughts and emotions in any situation. Creating a splendid customer experience.\nAdvanced Microsoft software and hardware usage: Office most used package apps.",
    },
    {
      company:
        'CILEC or Centro Internacional de Lenguas Extranjeras y Educación Continua (International Center for Foreign Languages and Continuing Education)',
      position: 'English and French Teacher',
      period: 'JAN 22 – DEC 22',
      description:
        'Key Responsibilities: Educating English and French Languages divided in three ways of teaching: Grammar, Listening and Speaking. Developing pedagogy strategies for language learning. Creating relations with students and taking care of their thoughts and emotions to ameliorate the quality of education.',
    },
    {
      company: 'MDK Narvarte or Moo Du Kwan Narvarte',
      position: 'Tae Kwon Do Teacher',
      period: 'JAN 15 – OCT 21',
      description:
        'Key Responsibilities: Educating children, teenagers and adults about Tae Kwon Do Martial Art divided in three ways of teaching: Philosophy, Martial and Sportive practice. Preparing for belt upgrade and tournaments. Refereeing national and international tournaments. Developing strategies for motor and psychological skills to ameliorate the learning of ethical and moral values. Creating relations with students and taking care of their thoughts and emotions to ameliorate the quality of education.',
    },
    {
      company: 'Galia Chef',
      position: 'Restaurant Customer Care',
      period: 'MAY 18 – AUG 18',
      description:
        "Key Responsibilities: Assisting client's inquiries. Facilitating the translate of customer's needs in different languages, commonly in English, French and Portuguese. Developing communication skills to provide a splendid customer experience and increase the business sales. Administrating the business' bills and supplies.",
    },
  ],

  // Education (for education-richtext)
  education: [
    { school: 'CNSF or Comision Nacional de Seguros y Fianzas', degree: 'Insurance Agent A1.', year: '' },
    {
      school: 'UNAM or National Autonomous University of Mexico',
      degree: 'Modern Literature and Letters in French Language | French Level C1-C2.',
      year: '',
    },
    {
      school: "Bachelor's degree in CCH SUR-UNAM or Colegio de Ciencias y Humanidades",
      degree: 'DELF-DALF French Diplomas | Foreign Exchange to France-Paris.',
      year: '',
    },
    { school: 'CEI or Centro de Capacitación Ejecutiva en Idiomas', degree: 'Advanced B2 English Diploma.', year: '' },
  ],

  // Employment Summary
  employmentSummary:
    'Angel has worked in client-facing roles focused on onboarding, customer support, retention, and sales across multiple industries. His experience includes insurance customer care and policy support for U.S.-based clients, as well as portfolio follow-up, collections negotiation, and account recovery. He has also supported members by resolving complex inquiries and coordinating across internal teams to deliver strong customer experiences.',
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
  try {
    console.log('🔗 Adding Angel Alberto to Webflow CMS...\n');

    // Get site and collections
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

    // Find Specializations collection (optional)
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations',
    );

    let specializationIds = [];

    if (specializationsCollection && angelData.specializations.length > 0) {
      console.log('📥 Fetching specializations...');
      const specializationsResponse = await client.getCollectionItems(
        specializationsCollection.id,
        { limit: 200 },
      );
      const specializationMap = {};
      specializationsResponse.items.forEach((item) => {
        const name = item.fieldData.name || item.fieldData['specialization-name'];
        if (name) {
          specializationMap[name] = item.id;
        }
      });

      specializationIds = angelData.specializations
        .map((spec) => specializationMap[spec])
        .filter((id) => id);

      console.log(
        `📋 Specializations to link for Angel (${specializationIds.length}): ${angelData.specializations.join(
          ', ',
        )}`,
      );
      console.log('');
    }

    // Find Main Category collection
    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories',
    );

    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found');
      process.exit(1);
    }

    console.log(`📍 Main Category Collection ID: ${mainCategoryCollection.id}\n`);

    console.log('📥 Fetching main categories...');
    const mainCategoryResponse = await client.getCollectionItems(mainCategoryCollection.id, {
      limit: 50,
    });
    const mainCategoryMap = {};
    mainCategoryResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['category-name'];
      if (name) {
        mainCategoryMap[name] = item.id;
      }
    });

    const mainCategoryId = mainCategoryMap[angelData.mainCategory];
    console.log(
      `✅ Main Category for Angel "${angelData.mainCategory}": ${
        mainCategoryId ? '✅' : '❌'
      }\n`,
    );

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${angelData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    // Generate Rich Text HTML
    const skillsHTML = generateSkillsHTML(angelData.allSkills);
    const toolsHTML = generateToolsHTML(angelData.tools);
    const equipmentHTML = generateEquipmentHTML(angelData.equipment);
    const cefrHTML = generateCEFRHTML(angelData.cefrResult);
    const employmentHTML = generateEmploymentAccordionHTML(angelData.employmentHistory);
    const educationHTML = generateEducationHTML(angelData.education);
    const discDescriptionHTML = angelData.discDescription
      ? `<p>${escapeHtml(angelData.discDescription)}</p>`
      : '';
    const englishDescriptionHTML = angelData.englishDescription
      ? `<p>${escapeHtml(angelData.englishDescription)}</p>`
      : '';

    console.log('📋 Preparing field data...\n');

    // Prepare field data for Webflow CMS (field slugs match CMS collection)
    const fieldData = {
      name: angelData.name,
      slug: angelData.slug,
      'title-2': angelData.title,
      'experience-years': angelData.experienceYears,
      languages: angelData.languages,
      availability: angelData.availability,
      'main-category': angelData.mainCategory,
      'main-categories': [mainCategoryId],
      image: angelData.imageUrl,
      video: angelData.videoUrl || '',
      'video-thumbnail-2': angelData.videoThumbnail || '',
      'profile-slug-2': `https://www.oceanvirtualassistant.com/${angelData.profileSlug}`,
      summary: angelData.summary,
      tagline: angelData.tagline,
      'thumbnail-description': angelData.thumbnailDescription,
      'skills-tags': angelData.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': angelData.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': angelData.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': angelData.employmentSummary,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
      'disc-type-2': angelData.discType,
      'disc-description': discDescriptionHTML,
      'type-of-english-test': angelData.englishTestType,
      'english-score-3': angelData.englishScore,
      'english-description': englishDescriptionHTML,
      'cerf-result': cefrHTML,
    };

    if (specializationIds.length > 0) {
      fieldData.specialization = specializationIds;
    }

    console.log('📤 Creating Angel Alberto in Webflow CMS...\n');
    console.log('Field Data Preview:');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Angel Alberto added successfully!\n`);
    console.log(`📌 Item ID: ${itemId}`);
    console.log(`📌 Slug: ${angelData.slug}`);
    console.log(
      `📌 Profile URL: https://www.oceanvirtualassistant.com/${angelData.profileSlug}\n`,
    );
    console.log('═'.repeat(80));
    console.log('\n✨ Next steps:');
    console.log('1. Verify all fields in Webflow CMS');
    console.log('2. Verify Main Category and (if any) Specializations are linked correctly');
    console.log('3. Add image and video URL when available and rerun an update script if needed');
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

