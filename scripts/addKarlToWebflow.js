/**
 * Add Karl Loyd to Webflow CMS
 * Run with: node scripts/addKarlToWebflow.js
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

// Karl Loyd's data - Updated information
const karlData = {
  name: 'Karl Loyd',
  title: 'INSURANCE VIRTUAL ASSISTANT | TRAINING MANAGER',
  experienceYears: '3 years',
  languages: 'English',
  availability: 'Full Time',
  mainCategory: 'Insurance Virtual Assistant',
  
  // Summary
  summary: 'Karl Loyd is an insurance-focused Virtual Assistant with 3 years of experience across personal, commercial, medical, and life & health insurance. He supports U.S.-based agencies with policy servicing, renewals, endorsements, COIs, EOIs, and direct carrier quoting through carrier portals. His background combines hands-on insurance operations with training and leadership experience, supporting both clients and virtual assistants in multi-line insurance environments.',
  
  // Tagline
  tagline: 'Karl Loyd brings a rare combination of multi-line insurance experience and training leadership. He manages daily insurance servicing while creating SOPs and training virtual assistants to ensure consistency and efficiency. This balance makes him an excellent fit for agencies seeking operational stability and scalable team development.',
  
  // Thumbnail Description
  thumbnailDescription: '3 YEARS INSURANCE EXPERIENCE, PERSONAL LINES SUPPORT, COMMERCIAL LINES, INSURANCE QUOTING',
  
  // Image
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696ea978f5021565c2695600_Karl.webp',
  
  // Video (placeholder - will be updated when video is provided)
  videoUrl: '', // TODO: Add video URL when available
  videoThumbnail: '', // Will be auto-generated from video URL
  
  // Profile slug
  profileSlug: 'karl-loyd-ocean-va-profile',
  slug: 'karl-loyd',
  
  // Specializations (multi-reference - top 4 for cards)
  specializations: [
    'Personal Lines',
    'Commercial Lines',
    'Insurance Quoting'
  ],
  
  // All skills for display (skills-tags field)
  allSkills: [
    'Commercial Lines',
    'Home & Auto',
    'Umbrella',
    'Trailers',
    'Quoting',
    'Endorsements',
    'Renewals',
    'COIs',
    'EOIs',
    'Workers Comp',
    'Cyber Liability'
  ],
  
  // Tools
  tools: [
    'GoHighLevel',
    'AgencyZoom',
    'InsuredMine',
    'Monday',
    'HubSpot',
    'AMS360',
    'HawkSoft',
    'Applied Epic',
    'EZLynx',
    'Carrier Portals'
  ],
  
  // Equipment
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  
  // DISC
  discType: 'C',
  discDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
  
  // English
  englishTestType: 'EF English Test',
  englishScore: '95/C1',
  englishDescription: 'Demonstrates strong professional proficiency, with the ability to communicate fluently and effectively in complex work environments.',
  cefrResult: 'C1',
  
  // Employment Summary
  employmentSummary: 'Karl Loyd has <strong>3 years of insurance experience</strong> across personal, commercial, medical, and life & health insurance. He supports U.S.-based agencies with policy servicing, renewals, endorsements, COIs, EOIs, and direct carrier quoting through carrier portals. His background combines hands-on insurance operations with training and leadership experience, supporting both clients and virtual assistants in multi-line insurance environments. Karl Loyd\'s unique combination of operational expertise and training capabilities allows him to not only manage daily insurance tasks but also develop standard operating procedures and train other virtual assistants, ensuring consistency and efficiency across teams.'
};

async function main() {
  try {
    console.log('🔗 Adding Karl Loyd to Webflow CMS...\n');

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

    // Get specialization IDs for Karl Loyd
    const specializationIds = karlData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link for Karl Loyd (${specializationIds.length}):`);
    karlData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[karlData.mainCategory];
    console.log(`✅ Main Category for Karl Loyd "${karlData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${karlData.mainCategory}" not found`);
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
      return `<div class="va-skills-container">${tags}</div>`;
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
      }).join('\n');
      return `<div class="va-cefr-grid">\n${items}\n</div>`;
    }

    // Generate Rich Text HTML
    const skillsHTML = generateSkillsHTML(karlData.allSkills);
    const toolsHTML = generateToolsHTML(karlData.tools);
    const equipmentHTML = generateEquipmentHTML(karlData.equipment);
    const cefrHTML = generateCEFRHTML(karlData.cefrResult);

    console.log('📋 Preparing field data...\n');

    // Prepare field data
    const fieldData = {
      'name': karlData.name,
      'slug': karlData.slug,
      'title-2': karlData.title,
      'experience-years': karlData.experienceYears,
      'languages': karlData.languages,
      'availability': karlData.availability,
      'main-category': karlData.mainCategory,
      'main-categories': [mainCategoryId],
      'image': karlData.imageUrl,
      'video': karlData.videoUrl || '',
      'video-thumbnail-2': karlData.videoThumbnail || '', // Will be auto-generated if video URL provided
      'profile-slug-2': `https://www.oceanvirtualassistant.com/${karlData.profileSlug}`,
      'summary': karlData.summary,
      'tagline': karlData.tagline,
      'thumbnail-description': karlData.thumbnailDescription,
      'skills-tags': karlData.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': karlData.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': karlData.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': karlData.employmentSummary,
      'disc-type-2': karlData.discType,
      'disc-description': karlData.discDescription.replace(/<br>/g, '\n'), // Convert <br> to newlines for Rich Text
      'type-of-english-test': karlData.englishTestType,
      'english-score-3': karlData.englishScore,
      'english-description': karlData.englishDescription.replace(/<br>/g, '\n'), // Convert <br> to newlines for Rich Text
      'cerf-result': cefrHTML
    };

    // Add specializations as multi-reference
    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    // Generate video thumbnail if video URL is provided
    if (karlData.videoUrl && !karlData.videoThumbnail) {
      const videoId = karlData.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      if (videoId && videoId[1]) {
        fieldData['video-thumbnail-2'] = `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg`;
        console.log(`📹 Auto-generated video thumbnail: ${fieldData['video-thumbnail-2']}\n`);
      }
    }

    console.log('📤 Creating Karl Loyd in Webflow CMS...\n');
    console.log('Field Data Preview:');
    console.log(`  Name: ${fieldData.name}`);
    console.log(`  Title: ${fieldData['title-2']}`);
    console.log(`  Experience: ${fieldData['experience-years']}`);
    console.log(`  Specializations: ${specializationIds.length} linked`);
    console.log(`  Tools: ${karlData.tools.length}`);
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false, // Create as published
    });

    const itemId = result.item?.id || result.id || result.success;
    console.log(`✅ Karl Loyd added successfully!\n`);
    console.log(`📌 Item ID: ${itemId}`);
    console.log(`📌 Slug: ${karlData.slug}`);
    console.log(`📌 Profile URL: https://www.oceanvirtualassistant.com/${karlData.profileSlug}\n`);
    console.log('═'.repeat(80));
    console.log('\n✨ Next steps:');
    console.log('1. Verify all fields in Webflow CMS');
    console.log('2. Verify Main Categories and Specializations are linked correctly');
    console.log('3. Add schema markup to the profile page');
    if (!karlData.videoUrl) {
      console.log('4. ⚠️  Add video URL when available and run script again to update');
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
