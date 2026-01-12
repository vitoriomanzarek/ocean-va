/**
 * Add Lady Ann to Webflow CMS
 * Run with: node scripts/addLadyAnnToWebflow.js
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

// Lady Ann data
const ladyAnnData = {
  name: 'Lady Ann',
  title: 'INSURANCE VIRTUAL ASSISTANT',
  experienceYears: '4 years',
  summary: 'Lady Ann is a dedicated Virtual Assistant with over 4 years of experience providing high-quality administrative, customer service, and insurance support to U.S.-based clients. She currently supports an insurance agency in Dallas, TX. Her background across insurance, executive assistance, e-commerce, and telecommunications allows her to adapt quickly to fast-paced, client-facing environments.',
  thumbnail: '3 yrs of Insurance Experience, PERSONAL & COMMERCIAL LINES, INSURANCE QUOTE SUPPORT, CRM MANAGEMENT',
  tagline: 'Lady Ann is an excellent Virtual Assistant for insurance agencies and service-based organizations seeking a reliable, detail-focused professional.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69654ede163902496111d72d_Lady%20Ann.webp',
  videoUrl: '', // No video URL yet
  profileSlug: 'lady-ann-aguirre-ocean-va-profile',
  slug: 'lady-ann-aguirre',
  languages: ['English', 'Filipino'],
  // All specializations (for filtering/relations - used in specialization field)
  allSpecializations: [
    'Insurance Quote Support',
    'Client Follow-Up',
    'Personal Lines Insurance Assistance',
    'Insurance Quoting',
    'Endorsements',
    'Policy Updates',
    'CRM Management',
    'Accurate Data Entry',
    'Phone & Text-Based Customer Service',
    'Policy & Quote Documentation',
    'KPI-Driven Task Completion',
    'Cross-Department Coordination'
  ],
  // Top 4 specializations for cards (max 4 to keep cards clean - used in skills-tags)
  cardSpecializations: [
    'Personal & Commercial Lines',
    'Insurance Quote Support',
    'CRM Management'
  ],
  tools: [
    'Zywave',
    'AgencyMatrix',
    'CRM Systems',
    'Microsoft Office (Word, Excel, Outlook, Teams)',
    'Google Workspace',
    'Slack',
    'RingCentral',
    'Trello',
    'Canva'
  ],
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Full Time',
  discResult: 'S+I',
  englishTest: '80/B2',
  englishLevel: 'B2'
};

async function main() {
  try {
    console.log('🔗 Adding Lady Ann to Webflow CMS...\n');

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

    const specializationIds = ladyAnnData.allSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    ladyAnnData.allSpecializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[ladyAnnData.mainCategory];
    console.log(`✅ Main Category "${ladyAnnData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${ladyAnnData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': ladyAnnData.name,
      'experience-years': ladyAnnData.experienceYears,
      'languages': ladyAnnData.languages.join(', '),
      'availability': ladyAnnData.availability,
      'main-category': ladyAnnData.mainCategory,
      'summary': ladyAnnData.summary,
      'tagline': ladyAnnData.tagline,
      'thumbnail-description': ladyAnnData.thumbnail,
      'image': ladyAnnData.imageUrl,
      'profile-slug-2': ladyAnnData.profileSlug,
      'slug': ladyAnnData.slug,
      'video': ladyAnnData.videoUrl || '',
      'tools-tags': ladyAnnData.tools.join(', '),
      'skills-tags': ladyAnnData.cardSpecializations.join(', '),
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Lady Ann in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Lady Ann added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${ladyAnnData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${ladyAnnData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

