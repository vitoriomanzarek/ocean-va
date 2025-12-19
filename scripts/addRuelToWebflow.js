/**
 * Add Ruel to Webflow CMS
 * Run with: node scripts/addRuelToWebflow.js
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

// Ruel data
const ruelData = {
  name: 'Ruel',
  title: 'ENGLISH-SPEAKING VA | INSURANCE VA',
  experienceYears: '1.2 years',
  summary: 'Ruel is an experienced Virtual Assistant with nine years across customer service, technical support, B2B sales, and U.S. insurance operations. He brings hands-on expertise creating auto, home, P&C, and commercial auto quotes, comparing multi-carrier premiums, updating policies, processing endorsements, and verifying renewal pricing. Ruel has worked with various states, supporting agents by preparing accurate quotes, generating COIs, and coordinating directly with carriers.',
  thumbnail: '1.2 yrs of Insurance Experience, AUTO & HOME INSURANCE, COMMERCIAL LINES SUPPORT, P&C SERVICING, CARRIER COMMUNICATION',
  tagline: 'Ruel brings strong multi-state insurance experience across quoting, servicing, and policy updates, consistently delivering fast and accurate results in high-volume environments. He demonstrates reliability, initiative, and solid problem-solving skills across multiple carriers and agents. Adaptable and clear in communication, he manages backend insurance workflows with minimal supervision.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/694483dcd07cb4e2aef988a6_Ruel.webp',
  videoUrl: 'https://youtu.be/_JZ0165Vy7I',
  profileSlug: 'ruel-ocean-va-profile',
  slug: 'ruel',
  languages: ['English'],
  specializations: [
    'Commercial Lines',
    'Quoting',
    'Policy Servicing',
    'Customer Support',
    'Carrier Coordination',
    'COIs',
    'Endorsements',
    'Renewals',
    'Billing Inquiries',
    'P&C Operation',
    'Data Accuracy'
  ],
  tools: [
    'PL Rater',
    'NOWCERTS',
    'Asana',
    'Carrier Websites',
    'Dynamics',
    'Vonage',
    'RingCentral',
    'Slack',
    'Teams'
  ],
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Full Time',
  discResult: 'D',
  englishTest: '90/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Ruel to Webflow CMS...\n');

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

    const specializationIds = ruelData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    ruelData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[ruelData.mainCategory];
    console.log(`✅ Main Category "${ruelData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${ruelData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': ruelData.name,
      'experience-years': ruelData.experienceYears,
      'languages': ruelData.languages.join(', '),
      'availability': ruelData.availability,
      'main-category': ruelData.mainCategory,
      'summary': ruelData.summary,
      'tagline': ruelData.tagline,
      'thumbnail-description': ruelData.thumbnail,
      'image': ruelData.imageUrl,
      'profile-slug-2': ruelData.profileSlug,
      'slug': ruelData.slug,
      'video': ruelData.videoUrl || '',
      'tools-tags': ruelData.tools.join(', '),
      'skills-tags': ruelData.specializations.join(', '),
      'disc-type': ruelData.discResult,
      'english-score': ruelData.englishTest,
      'english-level': ruelData.englishLevel,
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Ruel in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Ruel added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${ruelData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${ruelData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

