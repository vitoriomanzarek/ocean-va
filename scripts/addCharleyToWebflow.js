/**
 * Add Charley to Webflow CMS
 * Run with: node scripts/addCharleyToWebflow.js
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

// Charley's data
const charleyData = {
  name: 'Charley',
  title: 'MORTGAGE VIRTUAL ASSISTANT | CLIENT SUCCESS SPECIALIST',
  experienceYears: '2 years',
  languages: 'English',
  availability: 'Full Time',
  mainCategory: 'Mortgage Specialist',
  
  // Summary
  summary: 'Charley is a Mortgage Virtual Assistant with 2 years of mortgage experience, supporting pre-underwriting, loan processing, and appraisal coordination while managing loan files from borrower onboarding through funding, ensuring document completeness, income and asset verification, timeline tracking, accuracy, consistency, strong attention to detail, and clear borrower communication.',
  
  // Tagline
  tagline: 'Building on solid mortgage experience, Charley supports pre-underwriting and loan processing with strong documentation control, timeline management, and loan file completeness, helping teams reduce rework, meet SLAs, and keep loan pipelines moving efficiently.',
  
  // Thumbnail Description
  thumbnailDescription: 'PRE-UNDERWRITING & LOAN FILE REVIEW, END-TO-END LOAN ASSISTANCE, ENCOMPASS | FANNIE MAE',
  
  // Image
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696fcd639dfcc769e09314c8_Charley.webp',
  
  // Video
  videoUrl: 'https://youtu.be/qSeLs2Hg2EQ',
  videoThumbnail: '', // Will be auto-generated from video URL
  
  // Profile slug
  profileSlug: 'charley-ocean-va-profile',
  slug: 'charley',
  
  // Specializations (multi-reference - top 4 for cards)
  specializations: [
    'Pre-Underwriting'
    // Note: 'Loan Processing' and 'Mortgage Support' don't exist in CMS yet
    // They can be added to CMS later if needed
  ],
  
  // All skills for display (skills-tags field)
  allSkills: [
    'Pre-Underwriting',
    'Loan Processing',
    'Document Review',
    'Borrower Support',
    'Appraisal Support',
    'Client Communication',
    'File Management',
    'Credit Review',
    'Income Verification',
    'SLA Tracking'
  ],
  
  // Tools
  tools: [
    'Encompass',
    'Fannie Mae',
    'Mercury',
    'Solidifi',
    'Salesforce',
    'Trello',
    'HubSpot',
    'DocuSign',
    'ClickUp',
    'Clear Capital'
  ],
  
  // Equipment
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  
  // DISC
  discType: 'S+C', // Webflow allows: D, I, S, C, D+I, S+I, S+C (not C+S)
  discDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work. Steadiness (S) - Patient and reliable. S-type VAs provide stable, consistent support and build long-term relationships with clients.',
  
  // English
  englishTestType: 'EF English Test',
  englishScore: '100/C2',
  englishDescription: 'Demonstrates near-native fluency with exceptional accuracy, clarity, and confidence in professional communication.',
  cefrResult: 'C2',
  
  // Employment Summary
  employmentSummary: 'Charley has <strong>2 years of mortgage experience</strong> supporting pre-underwriting, loan processing, and appraisal coordination while managing loan files from borrower onboarding through funding, ensuring document completeness, income and asset verification, timeline tracking, accuracy, consistency, strong attention to detail, and clear borrower communication. With additional experience in client account management and financial services, Charley brings a comprehensive understanding of mortgage operations, compliance, and client relationship management to support U.S. and Australian mortgage teams.',
  
  // Employment History
  employmentEntries: [
    {
      company: 'Mortgage Scout Australia',
      position: 'Client Success Manager',
      period: 'Mar 2023 – Dec 2025',
      description: '• Acted as primary point of contact for clients throughout the loan journey\n• Guided clients through onboarding, documentation submission, and portal navigation\n• Reviewed supporting documents for completeness and eligibility\n• Liaised with brokers, lenders, and conveyancers to progress applications\n• Provided proactive updates and set expectations for turnaround times\n• Coordinated settlements and ensured client readiness for first repayment\n• Conducted post-settlement rate reviews and retention conversations\n• Nurtured long-term relationships to drive repeat and referral business\n• Successfully handled multiple concurrent loan files with strict deadlines\n• Improved client satisfaction through proactive communication\n• Helped reduce delays by identifying incomplete documentation early'
    },
    {
      company: 'Newfi / Finance Forward',
      position: 'Mortgage Virtual Assistant III / Pre-Underwriter',
      period: 'Feb 2021 – Mar 2023',
      description: '• Reviewed loan files for accuracy and completeness before underwriting\n• Verified income, assets, employment, and credit documentation\n• Identified missing conditions and coordinated with clients for submission\n• Assisted in appraisal order scheduling and status follow-ups\n• Entered property and comparable data into appraisal systems\n• Performed quality control checks on appraisal and loan documents\n• Managed emails, timelines, and digital document organization\n• Reduced underwriting resubmissions through accurate pre-review\n• Improved appraisal turnaround times through effective scheduling\n• Supported processing teams in meeting service-level agreements'
    },
    {
      company: 'JP Morgan Chase & Co.',
      position: 'Account Specialist II',
      period: 'Dec 2017 – Feb 2021',
      description: '• Resolved client account inquiries and transaction concerns\n• Ensured confidentiality and adherence to regulatory guidelines\n• Conducted basic financial analysis and error resolution\n• Developed strong communication and customer-care skills\n• Maintained accurate records and documentation'
    }
  ],
  
  // Education
  educationEntries: [
    {
      school: 'Cebu Technological University',
      degree: 'Bachelor of Science in Industrial Technology',
      year: '2012 – 2016'
    }
  ]
};

async function main() {
  try {
    console.log('🔗 Adding Charley to Webflow CMS...\n');

    // Get sites and collection ID
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

    // Find Specializations collection
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    // Find Main Category collection
    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories'
    );

    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found');
      process.exit(1);
    }

    console.log(`📍 Main Category Collection ID: ${mainCategoryCollection.id}\n`);

    // Get all specializations to find IDs
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

    // Get specialization IDs for Charley
    const specializationIds = charleyData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link for Charley (${specializationIds.length}):`);
    charleyData.specializations.forEach((spec) => {
      const id = specializationMap[spec];
      console.log(`   ${spec}: ${id ? '✅' : '❌'}`);
    });
    console.log('');

    // Get main category ID
    console.log('📥 Fetching main categories...');
    const mainCategoryResponse = await client.getCollectionItems(mainCategoryCollection.id, { limit: 50 });
    const mainCategoryMap = {};
    mainCategoryResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['category-name'];
      if (name) {
        mainCategoryMap[name] = item.id;
      }
    });

    const mainCategoryId = mainCategoryMap[charleyData.mainCategory];
    console.log(`✅ Main Category for Charley "${charleyData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${charleyData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    // Helper functions for HTML generation (Node.js compatible - no DOM)
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
      const tags = skills.map(skill => `<span class="va-skill-tag">${escapeHtml(skill)}</span>`).join('');
      return tags; // Return only tags, no wrapper div
    }

    function generateToolsHTML(tools) {
      if (!tools || tools.length === 0) return '';
      const items = tools.map(tool => `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`).join('');
      return `<div class="va-tools-list two-column">${items}</div>`;
    }

    function generateEquipmentHTML(equipment) {
      if (!equipment || equipment.length === 0) return '';
      const monitorSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
      const headsetSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;
      const items = equipment.map(eq => {
        const isMonitor = eq.toLowerCase().includes('monitor');
        const svg = isMonitor ? monitorSVG : headsetSVG;
        return `<div class="va-equipment-item">${svg}<span>${escapeHtml(eq)}</span></div>`;
      }).join('');
      return `<div class="va-equipment-list">${items}</div>`;
    }

    function generateEmploymentHTML(employmentEntries) {
      if (!employmentEntries || employmentEntries.length === 0) return '';
      const entries = employmentEntries.map(entry => {
        const descriptionHtml = entry.description.replace(/\n/g, '<br>');
        return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${escapeHtml(entry.company.toUpperCase())}</h4><p class="va-employment-accordion-position">${escapeHtml(entry.position)}</p><p class="va-employment-accordion-period">${escapeHtml(entry.period)}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${descriptionHtml}</p></div></div>`;
      }).join('');
      return entries;
    }

    function generateEducationHTML(educationEntries) {
      if (!educationEntries || educationEntries.length === 0) return '';
      const items = educationEntries.map((entry, index) => {
        return `<div class="va-education-item" ${index > 0 ? 'style="margin-top: 16px;"' : ''}><h3 class="va-education-school">${escapeHtml(entry.school)}</h3><p class="va-education-degree">${escapeHtml(entry.degree)}</p><p class="va-education-year">${escapeHtml(entry.year)}</p></div>`;
      }).join('');
      return items;
    }

    function generateCEFRHTML(activeLevel) {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const descriptions = {
        'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details.',
        'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
        'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
        'B2': 'Can communicate confidently in a variety of academic and professional environments.',
        'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
        'C2': 'Can interact with ease and can differentiate their shades of meaning.'
      };
      const items = levels.map(level => {
        const isActive = level === activeLevel;
        const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
        return `<div class="va-cefr-item"><div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div><p class="va-cefr-description">${escapeHtml(descriptions[level])}</p></div>`;
      }).join('');
      return items; // Return only items, no wrapper div
    }

    // Generate Rich Text HTML
    const skillsHTML = generateSkillsHTML(charleyData.allSkills);
    const toolsHTML = generateToolsHTML(charleyData.tools);
    const equipmentHTML = generateEquipmentHTML(charleyData.equipment);
    const employmentHTML = generateEmploymentHTML(charleyData.employmentEntries);
    const educationHTML = generateEducationHTML(charleyData.educationEntries);
    const cefrHTML = generateCEFRHTML(charleyData.cefrResult);

    console.log('📋 Preparing field data...\n');

    // Prepare field data
    const fieldData = {
      'name': charleyData.name,
      'slug': charleyData.slug,
      'title-2': charleyData.title,
      'experience-years': charleyData.experienceYears,
      'languages': charleyData.languages,
      'availability': charleyData.availability,
      'main-category': charleyData.mainCategory,
      'main-categories': [mainCategoryId],
      'image': charleyData.imageUrl || '',
      'video': charleyData.videoUrl || '',
      'video-thumbnail-2': charleyData.videoThumbnail || '', // Will be auto-generated if video URL provided
      'profile-slug-2': `https://www.oceanvirtualassistant.com/${charleyData.profileSlug}`,
      'summary': charleyData.summary,
      'tagline': charleyData.tagline,
      'thumbnail-description': charleyData.thumbnailDescription,
      'skills-tags': charleyData.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': charleyData.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': charleyData.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': charleyData.employmentSummary,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
      'disc-type-2': charleyData.discType,
      'disc-description': charleyData.discDescription.replace(/<br>/g, '\n'),
      'type-of-english-test': charleyData.englishTestType,
      'english-score-3': charleyData.englishScore,
      'english-description': charleyData.englishDescription.replace(/<br>/g, '\n'),
      'cerf-result': cefrHTML
    };

    // Add specializations as multi-reference
    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    // Generate video thumbnail if video URL is provided
    if (charleyData.videoUrl && !charleyData.videoThumbnail) {
      const videoId = charleyData.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      if (videoId && videoId[1]) {
        fieldData['video-thumbnail-2'] = `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg`;
        console.log(`📹 Auto-generated video thumbnail: ${fieldData['video-thumbnail-2']}\n`);
      }
    }

    console.log('📤 Creating Charley in Webflow CMS...\n');
    console.log('Field Data Preview:');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log(`  Specializations: ${specializationIds.length} linked`);
    console.log(`  Tools: ${charleyData.tools.length}`);
    console.log(`  Employment Entries: ${charleyData.employmentEntries.length}`);
    console.log(`  Education Entries: ${charleyData.educationEntries.length}`);
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false, // Create as published
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Charley added successfully!\n`);
    console.log(`📌 Item ID: ${itemId}`);
    console.log(`📌 Slug: ${charleyData.slug}`);
    console.log(`📌 Profile URL: https://www.oceanvirtualassistant.com/${charleyData.profileSlug}\n`);
    console.log('═'.repeat(80));
    console.log('\n✨ Next steps:');
    console.log('1. Verify all fields in Webflow CMS');
    console.log('2. Verify Main Categories and Specializations are linked correctly');
    console.log('3. Add schema markup to the profile page');
    if (!charleyData.imageUrl) {
      console.log('4. ⚠️  Add image URL when available and run script again to update');
    }
    if (!charleyData.videoUrl) {
      console.log('5. ⚠️  Add video URL when available and run script again to update');
    }
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
