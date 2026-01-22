/**
 * Add Drue to Webflow CMS
 * Run with: node scripts/addDrewToWebflow.js
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

// Drue's data
const drueData = {
  name: 'Drue',
  title: 'INSURANCE VIRTUAL ASSISTANT | PERSONAL LINES',
  experienceYears: '2 years', // Based on personal lines insurance experience
  languages: 'English',
  availability: 'Full Time',
  mainCategory: 'Insurance Virtual Assistant',
  
  // Summary
  summary: 'Drue is an insurance support professional with hands-on experience in personal auto and home insurance, providing internal service support for U.S. agencies. He has worked with endorsements, renewals, and quoting assistance across multiple states, using carrier portals and agency management systems to maintain accurate policy records and workflows.',
  
  // Tagline
  tagline: 'Drue brings structured insurance support experience focused on accuracy, consistency, and carrier compliance. His background in personal lines servicing, endorsements, renewals tracking, and quoting assistance makes him a strong fit for agencies seeking reliable back-office insurance support without client-facing dependency.',
  
  // Thumbnail Description
  thumbnailDescription: 'PERSONAL LINES INSURANCE, POLICY ENDORSEMENTS, HOME & AUTO QUOTING',
  
  // Image
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696fe2d9e6c37fd7601119eb_Drew.webp',
  
  // Video
  videoUrl: 'https://youtu.be/wAn-WpR-5Jw',
  videoThumbnail: '', // Will be auto-generated from video URL
  
  // Profile slug
  profileSlug: 'drue-ocean-va-profile',
  slug: 'drue',
  
  // Specializations (multi-reference - top 4 for cards)
  specializations: [
    'Personal Lines'
    // Can add more if they exist in CMS
  ],
  
  // All skills for display (skills-tags field)
  allSkills: [
    'Personal Lines',
    'Policy Endorsements',
    'Home Quoting',
    'Auto Quoting',
    'Renewals Support',
    'Carrier Portals',
    'Policy Changes'
  ],
  
  // Tools
  tools: [
    'Agency Zoom',
    'HawkSoft',
    'Better Agency',
    'Erie',
    'Safeco',
    'Openly',
    'Spreadsheets'
  ],
  
  // Equipment
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  
  // DISC
  discType: 'S+I', // Webflow allows: D, I, S, C, D+I, S+I, S+C
  discDescription: 'Steadiness (S) - Patient and reliable. S-type VAs provide stable, consistent support and build long-term relationships with clients. Influence (I) - Enthusiastic and collaborative. I-type VAs excel at communication, build rapport easily, and contribute positively to team dynamics.',
  
  // English
  englishTestType: 'EF English Test',
  englishScore: '80/B1',
  englishDescription: 'Demonstrates solid English proficiency. Able to communicate effectively in professional settings and handle everyday work-related interactions with confidence.',
  cefrResult: 'B1',
  
  // Employment Summary
  employmentSummary: 'Drue is an insurance support professional with hands-on experience in personal auto and home insurance, providing internal service support for U.S. agencies. He has worked with endorsements, renewals, and quoting assistance across multiple states, using carrier portals and agency management systems to maintain accurate policy records and workflows. With extensive experience in training, quality assurance, customer service, and data management, Drue brings structured support focused on accuracy, consistency, and carrier compliance to help insurance agencies manage personal lines operations efficiently.',
  
  // Employment History
  employmentEntries: [
    {
      company: 'The Insurance Artist',
      position: 'Service Agent and Data Management Specialist',
      period: 'Current',
      description: '• Provided internal service support for U.S. insurance agencies\n• Managed policy endorsements, renewals, and quoting assistance\n• Worked with carrier portals and agency management systems\n• Maintained accurate policy records and workflows\n• Supported personal auto and home insurance operations'
    },
    {
      company: 'ALG Services',
      position: 'Team Leader – Handyman and Technician Bookings',
      period: 'Previous',
      description: '• Led team operations for service bookings and scheduling\n• Coordinated handyman and technician assignments\n• Ensured efficient service delivery and client satisfaction'
    },
    {
      company: 'ONYX – Support Zebra',
      position: 'Foundations Trainer / Quality Analyst',
      period: 'Nov 2020 – Apr 2021',
      description: '• Delivered foundational training programs for new team members\n• Conducted quality assurance reviews and performance analysis\n• Ensured training standards and operational compliance\n• Supported team development and skill building'
    },
    {
      company: 'Support Zebra',
      position: 'Language Skills Development Trainer',
      period: 'Feb 2018 – Nov 2020',
      description: '• Developed and delivered language skills training programs\n• Focused on English communication for professional settings\n• Supported team members in improving communication effectiveness\n• Created training materials and assessment tools'
    }
  ],
  
  // Education
  educationEntries: [
    {
      school: 'The International University',
      degree: 'B.S. Computer Science',
      year: '1988 – 1991'
    }
  ]
};

async function main() {
  try {
    console.log('🔗 Adding Drue to Webflow CMS...\n');

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

    // Get specialization IDs for Drue
    const specializationIds = drueData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link for Drue (${specializationIds.length}):`);
    drueData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[drueData.mainCategory];
    console.log(`✅ Main Category for Drue "${drueData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${drueData.mainCategory}" not found`);
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
    const skillsHTML = generateSkillsHTML(drueData.allSkills);
    const toolsHTML = generateToolsHTML(drueData.tools);
    const equipmentHTML = generateEquipmentHTML(drueData.equipment);
    const employmentHTML = generateEmploymentHTML(drueData.employmentEntries);
    const educationHTML = generateEducationHTML(drueData.educationEntries);
    const cefrHTML = generateCEFRHTML(drueData.cefrResult);

    console.log('📋 Preparing field data...\n');

    // Prepare field data
    const fieldData = {
      'name': drueData.name,
      'slug': drueData.slug,
      'title-2': drueData.title,
      'experience-years': drueData.experienceYears,
      'languages': drueData.languages,
      'availability': drueData.availability,
      'main-category': drueData.mainCategory,
      'main-categories': [mainCategoryId],
      'image': drueData.imageUrl || '',
      'video': drueData.videoUrl || '',
      'video-thumbnail-2': drueData.videoThumbnail || '', // Will be auto-generated if video URL provided
      'profile-slug-2': `https://www.oceanvirtualassistant.com/${drueData.profileSlug}`,
      'summary': drueData.summary,
      'tagline': drueData.tagline,
      'thumbnail-description': drueData.thumbnailDescription,
      'skills-tags': drueData.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': drueData.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': drueData.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': drueData.employmentSummary,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
      'disc-type-2': drueData.discType,
      'disc-description': drueData.discDescription.replace(/<br>/g, '\n'),
      'type-of-english-test': drueData.englishTestType,
      'english-score-3': drueData.englishScore,
      'english-description': drueData.englishDescription.replace(/<br>/g, '\n'),
      'cerf-result': cefrHTML
    };

    // Add specializations as multi-reference
    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    // Generate video thumbnail if video URL is provided
    if (drueData.videoUrl && !drueData.videoThumbnail) {
      const videoId = drueData.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      if (videoId && videoId[1]) {
        fieldData['video-thumbnail-2'] = `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg`;
        console.log(`📹 Auto-generated video thumbnail: ${fieldData['video-thumbnail-2']}\n`);
      }
    }

    console.log('📤 Creating Drue in Webflow CMS...\n');
    console.log('Field Data Preview:');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log(`  Specializations: ${specializationIds.length} linked`);
    console.log(`  Tools: ${drueData.tools.length}`);
    console.log(`  Employment Entries: ${drueData.employmentEntries.length}`);
    console.log(`  Education Entries: ${drueData.educationEntries.length}`);
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false, // Create as published
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Drue added successfully!\n`);
    console.log(`📌 Item ID: ${itemId}`);
    console.log(`📌 Slug: ${drueData.slug}`);
    console.log(`📌 Profile URL: https://www.oceanvirtualassistant.com/${drueData.profileSlug}\n`);
    console.log('═'.repeat(80));
    console.log('\n✨ Next steps:');
    console.log('1. Verify all fields in Webflow CMS');
    console.log('2. Verify Main Categories and Specializations are linked correctly');
    console.log('3. Add schema markup to the profile page');
    if (!drueData.imageUrl) {
      console.log('4. ⚠️  Add image URL when available and run script again to update');
    }
    if (!drueData.videoUrl) {
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
