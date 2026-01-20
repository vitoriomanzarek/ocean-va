/**
 * Update Maximiliano Profile in Webflow CMS
 * 
 * Extract data from HTML profile and update CMS with complete information
 * Run with: node scripts/updateMaximilianoProfile.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Helper functions (Node.js compatible)
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateSkillsHTML(skillsArray) {
  if (!skillsArray || skillsArray.length === 0) return '';
  const tags = skillsArray.map(skill => 
    `<span class="va-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');
  return `<div class="va-skills-container">${tags}</div>`;
}

function generateToolsHTML(toolsArray) {
  if (!toolsArray || toolsArray.length === 0) return '';
  const items = toolsArray.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  return `<div class="va-tools-list two-column">${items}</div>`;
}

function generateEquipmentHTML(equipmentArray) {
  if (!equipmentArray || equipmentArray.length === 0) return '';
  const monitorSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
  const headsetSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;
  const items = equipmentArray.map(equip => {
    const isMonitor = equip.toLowerCase().includes('monitor');
    const svg = isMonitor ? monitorSVG : headsetSVG;
    return `<div class="va-equipment-item">${svg}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  return `<div class="va-equipment-list">${items}</div>`;
}

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return '';
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    // Description already contains HTML (<br> tags), don't escape it completely
    // Only escape if it's plain text
    const description = entry.description || '';
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
  }).join('');
}

function generateEducationHTML(entries) {
  if (!entries || entries.length === 0) return '';
  return entries.map(entry => {
    const school = escapeHtml(entry.school || '');
    const degree = escapeHtml(entry.degree || '');
    const year = escapeHtml(entry.year || '');
    return `<div class="va-education-item"><h3 class="va-education-school">${school}</h3><p class="va-education-degree">${degree}</p><p class="va-education-year">${year}</p></div>`;
  }).join('');
}

function generateCEFRHTML(activeLevel) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const CEFR_DESCRIPTIONS = {
    'A1': 'Can understand and use familiar everyday phrases and answer basic questions about personal details.',
    'A2': 'Can have very short social exchanges and give information on familiar and routine matters.',
    'B1': 'Can briefly describe past events and future plans, give reasons for opinions and use the language when traveling.',
    'B2': 'Can communicate confidently in a variety of academic and professional environments.',
    'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'C2': 'Can interact with ease and can differentiate their shades of meaning.'
  };
  const items = levels.map(level => {
    const isActive = level === activeLevel;
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    const description = CEFR_DESCRIPTIONS[level] || '';
    return `<div class="va-cefr-item"><div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div><p class="va-cefr-description">${escapeHtml(description)}</p></div>`;
  }).join('\n');
  return `<div class="va-cefr-grid">\n${items}\n</div>`;
}

// Maximiliano data extracted from HTML profile
const maximilianoData = {
  name: 'Maximiliano',
  slug: 'maximiliano',
  title: 'BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT',
  mainCategory: 'Insurance Virtual Assistant',
  experienceYears: '4 years',
  languages: 'Bilingual (EN-ES)',
  availability: 'Full Time',
  image: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696558c75dd9f74307a5a6e8_Maximiliano.webp',
  video: 'https://youtu.be/I2rs6jISN4E',
  videoThumbnail: 'https://img.youtube.com/vi/I2rs6jISN4E/hqdefault.jpg',
  summary: 'Maximiliano is a bilingual Virtual Assistant (English–Spanish) with solid experience in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries. His ability to multitask, listen attentively, and resolve issues efficiently makes him a reliable VA for fast-paced, customer-facing teams.',
  tagline: 'Maximiliano is an excellent Virtual Assistant for insurance agencies who can support sales operations, client communication, and daily administrative tasks with reliability and efficiency.',
  thumbnailDescription: '4 yrs of Insurance Experience, COMMERCIAL INSURANCE, Personal & Commercial Lines, Quote Generation, Payment Assistance',
  skills: [
    'Insurance Sales Assistance',
    'Personal and Commercial Lines',
    'Quoting',
    'Lead Follow-Up',
    'Order Placement & Tracking',
    'E-Signature Coordination',
    'Document Support',
    'Data Collection',
    'Record Updates',
    'Payment Assistance'
  ],
  tools: ['CRM', 'EZLynx', 'TurboRater', 'Applied Epic', 'Microsoft Office'],
  equipment: ['Two-Monitor Setup', 'Noise-Cancelling Headset'],
  employmentSummary: 'Maximiliano has <strong>over 4 years of experience</strong> in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries. His experience includes assisting customers in resolving inquiries and issues related to sales transactions and insurance information, generating detailed sales quotes, successfully closing transactions with new clients, and coordinating the preparation and delivery of electronic signature documents. Maximiliano\'s strengths include strong customer service skills, sales assistance expertise, ability to multitask effectively, attentive listening, and efficient problem-solving.',
  employmentEntries: [
    {
      company: 'UNITY - SOUTHWEST INDIAN FOUNDATION',
      position: 'Customer Service Representative',
      period: 'Nov 2025 – Present',
      description: '• Update customer mailing information<br>• Provide telephone assistance and support to customers regarding placing new orders, tracking existing orders, and browsing website'
    },
    {
      company: 'AL BOENKER INSURANCE AGENCY',
      position: 'Customer Services Representative, Sales Assistance',
      period: 'Jan 2022 – Oct 2025',
      description: '• Assist customers in resolving inquiries and issues related to sales transactions and current insurance information<br>• Follow up on leads generated through customer interactions<br>• Generate detailed sales quotes and successfully close transactions with new clients<br>• Coordinate the preparation and delivery of electronic signature documents and assist customer over the phone to completed'
    },
    {
      company: 'CHEROKEE COUNTRY CLUB',
      position: 'Greenkeeper',
      period: 'Apr 2021 – Nov 2021',
      description: '• Maintenance staff and area cleaning<br>• Performed daily care and maintenance of golf course greens, fairways, and grounds'
    },
    {
      company: 'KILLINGTON/PICO SKI RESORT',
      position: 'Lift Operator',
      period: 'Oct 2018 – Apr 2019',
      description: '• Conduct daily safety inspections and maintenance checks on lift machinery to ensure operational efficiency<br>• Assist passengers in boarding and disembarking lifts, ensuring safety protocols are followed'
    },
    {
      company: 'HOTEL CEO',
      position: 'Receptionist',
      period: 'Oct 2018 – Apr 2019',
      description: '• Front desk Check In and Check Out and collect payments<br>• Schedule and confirm reservations efficiently'
    }
  ],
  educationEntries: [
    {
      school: 'Universidad Autónoma de Campeche',
      degree: 'Bachelor\'s Degree - Political Science',
      year: 'Aug 2014 – Dec 2018'
    },
    {
      school: 'Séptimo Perez Palacios High School',
      degree: 'High School Degree',
      year: 'Aug 2011 – Jul 2014'
    }
  ],
  discType: 'D+I',
  discDescription: 'Influence (I) – Enthusiastic and people-oriented, I-type VAs excel at communication, building rapport, and creating positive client experiences. Dominance (D) – Assertive and results-driven, D-type VAs take initiative, drive projects forward, and deliver outcomes efficiently.',
  englishTestType: 'EF ENGLISH TEST RESULT',
  englishScore: '100/C1',
  englishDescription: 'Shows confident and fluent communication with clear pronunciation and a natural flow of speech. Uses advanced vocabulary and well-structured grammar effectively to express complex ideas with clarity and precision.',
  cefrResult: 'C1'
};

/**
 * Find VA by name or slug
 */
async function findVA(collectionId, name, slug) {
  try {
    // Try by name
    const nameFilter = { field: 'name', operator: 'equals', value: name };
    const nameResponse = await client.getCollectionItems(collectionId, { 
      filter: JSON.stringify(nameFilter)
    });
    
    if (nameResponse.items && nameResponse.items.length > 0) {
      return nameResponse.items[0];
    }

    // Try by slug
    const slugFilter = { field: 'slug', operator: 'equals', value: slug };
    const slugResponse = await client.getCollectionItems(collectionId, { 
      filter: JSON.stringify(slugFilter)
    });
    
    if (slugResponse.items && slugResponse.items.length > 0) {
      return slugResponse.items[0];
    }

    return null;
  } catch (error) {
    console.error('Error finding VA:', error);
    return null;
  }
}

/**
 * Update VA in Webflow CMS
 */
async function updateMaximiliano() {
  try {
    console.log('🔍 Searching for Maximiliano in Webflow CMS...\n');

    // Get site and collection
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    const va = await findVA(vaCollection.id, 'Maximiliano', 'maximiliano');

    if (!va) {
      console.error('❌ Maximiliano not found in Webflow CMS');
      console.log('💡 You may need to create him first using the form or addMaximilianoToWebflow.js');
      process.exit(1);
    }

    console.log(`✅ Found Maximiliano (ID: ${va.id})\n`);

    // Generate HTML content
    const skillsHTML = generateSkillsHTML(maximilianoData.skills);
    const toolsHTML = generateToolsHTML(maximilianoData.tools);
    const equipmentHTML = generateEquipmentHTML(maximilianoData.equipment);
    const employmentHTML = generateEmploymentHTML(maximilianoData.employmentEntries);
    const educationHTML = generateEducationHTML(maximilianoData.educationEntries);
    const cefrHTML = generateCEFRHTML(maximilianoData.cefrResult);

    // Build field data
    // Note: slug is omitted because it already exists and cannot be updated
    const fieldData = {
      name: maximilianoData.name,
      'title-2': maximilianoData.title,
      'main-category': maximilianoData.mainCategory,
      'experience-years': maximilianoData.experienceYears,
      languages: maximilianoData.languages,
      availability: maximilianoData.availability,
      image: maximilianoData.image,
      video: maximilianoData.video,
      summary: maximilianoData.summary,
      tagline: maximilianoData.tagline,
      'thumbnail-description': maximilianoData.thumbnailDescription,
      'skills-tags': maximilianoData.skills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': maximilianoData.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': maximilianoData.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': maximilianoData.employmentSummary,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
      'disc-type-2': maximilianoData.discType,
      'disc-description': maximilianoData.discDescription,
      'type-of-english-test': maximilianoData.englishTestType,
      'english-score-3': maximilianoData.englishScore,
      'english-description': maximilianoData.englishDescription,
      'cerf-result': cefrHTML
    };

    console.log('📤 Updating Maximiliano profile...\n');
    console.log('Fields to update:');
    Object.keys(fieldData).forEach(key => {
      const value = fieldData[key];
      const preview = typeof value === 'string' && value.length > 100 
        ? value.substring(0, 100) + '...' 
        : value;
      console.log(`   ${key}: ${preview}`);
    });
    console.log('');

    // Update the item
    const result = await client.updateCollectionItem(vaCollection.id, va.id, fieldData, {
      isDraft: true // Keep as draft for review
    });

    console.log('✅ Maximiliano profile updated successfully!');
    console.log(`   Item ID: ${result.id || va.id}`);
    console.log(`   Name: ${result.fieldData?.name || maximilianoData.name}`);
    console.log(`   Status: ${result.isDraft ? 'Draft' : 'Published'}\n`);
    console.log('💡 Note: Profile is saved as DRAFT. Publish it in Webflow Designer when ready.\n');

  } catch (error) {
    console.error('❌ Error updating Maximiliano:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

// Run update
updateMaximiliano();
