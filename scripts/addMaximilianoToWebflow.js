/**
 * Add Maximiliano to Webflow CMS
 * Run with: node scripts/addMaximilianoToWebflow.js
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

// Maximiliano data
const maximilianoData = {
  name: 'Maximiliano',
  title: 'BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT',
  experienceYears: '4 years',
  summary: 'Maximiliano is a bilingual Virtual Assistant (English–Spanish) with solid experience in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries. His ability to multitask, listen attentively, and resolve issues efficiently makes him a reliable VA for fast-paced, customer-facing teams.',
  thumbnail: '4 yrs of Insurance Experience, COMMERCIAL INSURANCE, Personal & Commercial Lines, Quote Generation, Payment Assistance',
  tagline: 'Maximiliano is an excellent Virtual Assistant for insurance agencies who can support sales operations, client communication, and daily administrative tasks with reliability and efficiency.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696558c75dd9f74307a5a6e8_Maximiliano.webp',
  videoUrl: 'https://youtu.be/I2rs6jISN4E',
  profileSlug: 'maximiliano-ocean-va-profile',
  slug: 'maximiliano',
  languages: ['Bilingual (EN-ES)'],
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
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Full Time',
  discResult: 'I+D',
  englishTest: '100/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Maximiliano to Webflow CMS...\n');

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

    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories'
    );

    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found');
      process.exit(1);
    }

    console.log(`📍 Main Category Collection ID: ${mainCategoryCollection.id}\n`);

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

    const fieldData = {
      'name': maximilianoData.name,
      'experience-years': maximilianoData.experienceYears,
      'languages': maximilianoData.languages.join(', '),
      'availability': maximilianoData.availability,
      'main-category': maximilianoData.mainCategory,
      'summary': maximilianoData.summary,
      'tagline': maximilianoData.tagline,
      'thumbnail-description': maximilianoData.thumbnail,
      'image': maximilianoData.imageUrl,
      'profile-slug-2': maximilianoData.profileSlug,
      'slug': maximilianoData.slug,
      'video': maximilianoData.videoUrl || '',
      'tools-tags': maximilianoData.tools.join(', '),
      'skills-tags': maximilianoData.cardSpecializations.join(', '),
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Maximiliano in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Maximiliano added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${maximilianoData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${maximilianoData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

