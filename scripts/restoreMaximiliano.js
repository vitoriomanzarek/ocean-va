/**
 * Restore Maximiliano's complete information in Webflow CMS
 * Run with: node scripts/restoreMaximiliano.js
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

// Maximiliano Item ID (from previous scripts)
const MAXIMILIANO_ITEM_ID = '696558d15898b33774b8e0f5';

// Complete Maximiliano data
const maximilianoData = {
  name: 'Maximiliano',
  slug: 'maximiliano',
  title: 'BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT',
  experienceYears: '4 years',
  summary: 'Maximiliano is a bilingual Virtual Assistant (English–Spanish) with solid experience in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries. His ability to multitask, listen attentively, and resolve issues efficiently makes him a reliable VA for fast-paced, customer-facing teams.',
  thumbnail: '4 yrs of Insurance Experience, COMMERCIAL INSURANCE, Personal & Commercial Lines, Quote Generation, Payment Assistance',
  tagline: 'Maximiliano is an excellent Virtual Assistant for insurance agencies who can support sales operations, client communication, and daily administrative tasks with reliability and efficiency.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696558c75dd9f74307a5a6e8_Maximiliano.webp',
  videoUrl: 'https://youtu.be/I2rs6jISN4E',
  profileSlug: 'maximiliano-ocean-va-profile',
  languages: 'Bilingual (EN-ES)',
  // All specializations (for filtering/relations - used in specialization field)
  allSpecializations: [
    'Commercial Insurance',
    'Personal and Commercial Lines',
    'Quote Generation',
    'Payment Assistance',
    'Insurance Sales Assistance',
    'Quoting',
    'Lead Follow-Up',
    'Order Placement & Tracking',
    'E-Signature Coordination',
    'Document Support',
    'Data Collection',
    'Record Updates'
  ],
  // Top 4 specializations for cards (max 4 to keep cards clean - used in skills-tags)
  cardSpecializations: [
    'Commercial Insurance',
    'Personal & Commercial Lines',
    'Quote Generation',
    'Payment Assistance'
  ],
  tools: [
    'CRM',
    'EZLynx',
    'TurboRater',
    'Applied Epic',
    'Microsoft Office'
  ],
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Full Time',
  // DISC Assessment (using D+I format as per Webflow options)
  discType: 'D+I',
  discDescription: 'Influence (I) – Enthusiastic and people-oriented, I-type VAs excel at communication, building rapport, and creating positive client experiences. Dominance (D) – Assertive and results-driven, D-type VAs take initiative, drive projects forward, and deliver outcomes efficiently.',
  // English Assessment
  englishScore: 'C1',
  englishDescription: 'Shows confident and fluent communication with clear pronunciation and a natural flow of speech. Uses advanced vocabulary and well-structured grammar effectively to express complex ideas with clarity and precision.',
  englishTest: '100/C1'
};

async function main() {
  try {
    console.log('🔗 Restoring Maximiliano\'s information in Webflow CMS...\n');

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

    const specializationIds = maximilianoData.allSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    maximilianoData.allSpecializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[maximilianoData.mainCategory];
    console.log(`✅ Main Category "${maximilianoData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${maximilianoData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    // Prepare field data (only card fields, not RichText fields)
    const fieldData = {
      'name': maximilianoData.name,
      'slug': maximilianoData.slug,
      'experience-years': maximilianoData.experienceYears,
      'languages': maximilianoData.languages,
      'availability': maximilianoData.availability,
      'main-category': maximilianoData.mainCategory,
      'summary': maximilianoData.summary,
      'tagline': maximilianoData.tagline,
      'thumbnail-description': maximilianoData.thumbnail,
      'image': maximilianoData.imageUrl,
      'profile-slug-2': maximilianoData.profileSlug,
      'video': maximilianoData.videoUrl,
      'tools-tags': maximilianoData.tools.join(', '),
      'skills-tags': maximilianoData.cardSpecializations.join(', '),
      'equipment-tags': maximilianoData.equipment.join(', '),
      'disc-type-2': maximilianoData.discType,
      'disc-description': maximilianoData.discDescription,
      'english-score-2': maximilianoData.englishScore,
      'english-description': maximilianoData.englishDescription
      // Note: Not updating employment-richtext or education-richtext (HTML minified)
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('🔄 Updating Maximiliano in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.updateCollectionItem(vaCollection.id, MAXIMILIANO_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Maximiliano restored successfully!`);
    console.log(`   Item ID: ${MAXIMILIANO_ITEM_ID}`);
    console.log(`   Slug: ${maximilianoData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${maximilianoData.profileSlug}\n`);

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

