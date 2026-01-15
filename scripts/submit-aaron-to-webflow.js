/**
 * Script to submit Aaron's VA data to Webflow CMS
 * Using the old process (direct Webflow client) for specializations and profile-slug
 * 
 * Run with: node scripts/submit-aaron-to-webflow.js
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

// Helper functions to generate HTML (matching form logic)
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function generateSkillsHTML(skillsString) {
  if (!skillsString || typeof skillsString !== 'string') return '';
  const skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);
  if (skills.length === 0) return '';
  const tags = skills.map(skill => 
    `<span class="va-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');
  return `<div class="va-skills-container">${tags}</div>`;
}

function generateToolsHTML(toolsString) {
  if (!toolsString || typeof toolsString !== 'string') return '';
  const tools = toolsString.split(',').map(t => t.trim()).filter(Boolean);
  if (tools.length === 0) return '';
  const items = tools.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  return `<div class="va-tools-list">${items}</div>`;
}

function generateEquipmentHTML(equipmentArray) {
  if (!equipmentArray || !Array.isArray(equipmentArray) || equipmentArray.length === 0) return '';
  const monitorSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
  const headsetSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;
  const items = equipmentArray.map(equip => {
    const isMonitor = equip.toLowerCase().includes('monitor');
    const svg = isMonitor ? monitorSVG : headsetSVG;
    return `<div class="va-equipment-item">${svg}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  return `<div class="va-equipment-list">${items}</div>`;
}

function generateCEFRHTML(activeLevel) {
  const CEFR_DESCRIPTIONS = {
    'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details.',
    'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    'B2': 'Can communicate confidently in a variety of academic and professional environments.',
    'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'C2': 'Can understand with ease virtually everything heard or read and can summarize information from different sources.'
  };
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const items = levels.map(level => {
    const isActive = level === activeLevel;
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    const description = CEFR_DESCRIPTIONS[level] || '';
    return `
        <div class="va-cefr-item">
          <div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div>
          <p class="va-cefr-description">${escapeHtml(description)}</p>
        </div>`;
  }).join('\n');
  return `<div class="va-cefr-grid">
${items}
      </div>`;
}

// Aaron's complete data
const aaronData = {
  name: 'Aaron',
  slug: 'aaron',
  profileSlug: 'aaron-ocean-va-profile', // For profile-slug-2 field
  mainCategory: 'Insurance Virtual Assistant',
  experienceYears: '5+',
  languages: ['English'],
  availability: 'Full Time',
  title: 'INSURANCE VIRTUAL ASSISTANT',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69694f6db810ddc0f62aa111_Aaron1.webp',
  videoUrl: '',
  summary: 'Aaron is an Insurance Virtual Assistant with over five years of experience supporting U.S. personal lines property and casualty insurance with Travelers. He has worked in both agent-facing and direct-to-customer environments, handling high-volume policy servicing and insurance quoting. His experience covers auto, homeowners, personal articles floaters, and umbrella policies. He has managed the full policy lifecycle, including quotes, endorsements, and renewals. His background reflects strong attention to detail, regulatory awareness, and clear communication with agents and insureds.',
  tagline: 'Aaron brings a strong balance of technical insurance knowledge and customer-facing communication, making him a reliable support professional for personal lines operations. His long-term experience within a major U.S. insurance carrier environment enables him to manage policy changes, state-specific requirements, and customer guidance with confidence.',
  thumbnail: '5+ Years Insurance Experience (Personal Lines Support, Insurance Quoting, Policy Endorsements)',
  // All specializations (for filtering/relations - used in specialization field)
  allSpecializations: [
    'Personal Lines',
    'Quoting',
    'Policy Servicing',
    'Endorsements',
    'Renewals',
    'DMV Compliance',
    'Umbrella',
    'Document Handling',
    'Carrier Navigation',
    'Risk Review'
  ],
  // Top 4 specializations for cards (max 4 to keep cards clean - used in skills-tags)
  cardSpecializations: [
    'Personal Lines',
    'Quoting',
    'Policy Servicing',
    'Endorsements'
  ],
  tools: [
    'Salesforce',
    'Zendesk',
    'Oracle',
    'Siebel',
    'HubSpot',
    'Pipedrive',
    'Microsoft Office',
    'Google Workspace'
  ],
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  discType: 'S+C', // Webflow allows: D, I, S, C, D+I, S+I, S+C
  discDescription: 'Conscientious + Steadiness (C+S) - Analytical, detail-oriented, and dependable. C+S VAs combine precision and reliability to deliver accurate work while maintaining strong client relationships and consistent performance.',
  englishTestType: 'EF ENGLISH TEST RESULT',
  englishScore: 'C1', // Option field: A1, A2, B1, B2, C1, C2
  englishDescription: 'Advanced proficiency. Demonstrates strong command of English with high accuracy, clear communication, and professional fluency in both written and spoken contexts.',
  cefrResult: 'C1',
  // Employment entries
  employmentEntries: [
    {
      company: 'TAGUIG CITY - INSURANCE ACCOUNT',
      position: 'Senior CSR - Insurance Account',
      period: 'OCT 2020 - JAN 2026',
      description: '• Quoting & Risk Comparison: Performed market research and risk assessments to deliver detailed quotes and coverage comparisons for Auto, Home, PLUS (Umbrella), and Personal Articles Floater (PAF) policies.<br>• Policy Issuance & Binding: Managed the end-to-end policy lifecycle, from educating clients on complex insurance terms (deductibles, exclusions, and limits) to final binding and DMV requirement reviews.<br>• Mortgagee & Lienholder Management: Executed precise updates to mortgagee and lienholder information, including adding new lenders, modifying existing loan details, and deleting outdated interest holders to ensure continuous escrow compliance and accurate Evidence of Insurance (EOI) delivery.<br>• Account Administration & Endorsements: Processed mid-term policy changes and endorsements, such as driver/vehicle updates and coverage limit adjustments, while maintaining strict regulatory compliance.<br>• Documentation & Compliance: Facilitated real-time delivery of essential documents including EOIs, Certificates of Insurance (COIs), and digital ID cards to satisfy legal and lender requirements.<br>• Retention & Growth Strategy: Conducted proactive renewal reviews and identified cross-selling opportunities for high-value asset protection (PAF) and supplemental liability (PLUS).<br>• Claims & Service Coordination: Acted as the primary point of contact for claims intake and transfers, while coordinating third-party services for roadside assistance and glass repair.'
    }
  ],
  // Education entries (if any)
  educationEntries: []
};

async function main() {
  try {
    console.log('🔗 Adding Aaron to Webflow CMS...\n');

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

    // Fetch specializations
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    console.log('📥 Fetching specializations...');
    const specializationsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 });
    const specializationMap = {};
    specializationsResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name'];
      if (name) {
        specializationMap[name] = item.id;
      }
    });

    console.log(`✅ Found ${Object.keys(specializationMap).length} specializations\n`);

    const specializationIds = aaronData.allSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    aaronData.allSpecializations.forEach((spec) => {
      const id = specializationMap[spec];
      console.log(`   ${spec}: ${id ? '✅' : '❌'}`);
    });
    console.log('');

    // Fetch main categories
    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories'
    );

    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found');
      process.exit(1);
    }

    console.log('📥 Fetching main categories...');
    const mainCategoryResponse = await client.getCollectionItems(mainCategoryCollection.id, { limit: 50 });
    const mainCategoryMap = {};
    mainCategoryResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['category-name'];
      if (name) {
        mainCategoryMap[name] = item.id;
      }
    });

    const mainCategoryId = mainCategoryMap[aaronData.mainCategory];
    console.log(`✅ Main Category "${aaronData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${aaronData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    // Prepare field data (old process - card fields only)
    const fieldData = {
      'name': aaronData.name,
      'slug': aaronData.slug,
      'experience-years': aaronData.experienceYears,
      'languages': aaronData.languages.join(', '),
      'availability': aaronData.availability,
      'main-category': aaronData.mainCategory,
      'summary': aaronData.summary,
      'tagline': aaronData.tagline,
      'thumbnail-description': aaronData.thumbnail,
      'image': aaronData.imageUrl,
      'profile-slug-2': aaronData.profileSlug,
      'video': aaronData.videoUrl || '',
      'tools-tags': aaronData.tools.join(', '),
      'skills-tags': aaronData.cardSpecializations.join(', '), // Max 4 for cards
      'equipment-tags': aaronData.equipment.join(', '),
      'disc-type-2': aaronData.discType,
      'disc-description': aaronData.discDescription,
      'english-score-2': aaronData.englishScore,
      'english-description': aaronData.englishDescription,
      'type-of-english-test': aaronData.englishTestType,
      'cerf-result': generateCEFRHTML(aaronData.cefrResult),
      'employment-summary': aaronData.employmentEntries[0]?.description || ''
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Aaron in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: true,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Aaron added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${aaronData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${aaronData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

main();
