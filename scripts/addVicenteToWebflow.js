/**
 * Add Vicente Peñaflor to Webflow CMS
 * Run with: node scripts/addVicenteToWebflow.js
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

// Vicente Peñaflor data
const vicenteData = {
  name: 'Vicente Peñaflor',
  title: 'ENGLISH SPEAKING VA | INSURANCE BACK-END SUPPORT',
  experienceYears: '2.4 years',
  summary: 'Vicente is an Insurance Virtual Assistant with 2.4 years of U.S. personal lines insurance experience, specialized in back-end operations and quoting support for Florida-based agencies. He assists licensed agents with quote preparation, and document management across AMS platforms and carrier portals. His experience includes homeowners, auto, flood, umbrella, motorcycle, DP3, and condo insurance, working with multiple U.S. carriers. Detail-oriented and reliable, Vicente provides consistent administrative support that strengthens operational efficiency.',
  thumbnail: '2.4 YEARS OF INSURANCE EXPERIENCE, PERSONAL LINES, INSURANCE QUOTING, FLORIDA MARKET',
  tagline: 'Vicente is a strong fit for insurance agencies seeking accurate back-end support, reliable quoting assistance, and consistent AMS management within the Florida personal lines market.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/694afc3ef8f4e918aed74231_Vicente.webp',
  videoUrl: 'https://youtu.be/SPTGcnSro0c',
  profileSlug: 'vicente-penaflor-ocean-va-profile',
  slug: 'vicente-penaflor',
  languages: ['English'],
  specializations: [
    'Personal Lines',
    'Insurance Quoting',
    'Document Upload',
    'AMS Management',
    'Carrier Portals',
    'Back-End Support',
    'Data Entry',
    'Quote Preparation'
  ],
  tools: [
    'AMS360',
    'Applied Epic',
    'EZLynx',
    'Quote Rush',
    'Applied Rater',
    'Microsoft Teams',
    'Outlook',
    'Excel',
    'Avaya'
  ],
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Full Time',
  discResult: 'S+C',
  englishTest: '90/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Vicente Peñaflor to Webflow CMS...\n');

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

    const specializationIds = vicenteData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    vicenteData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[vicenteData.mainCategory];
    console.log(`✅ Main Category "${vicenteData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${vicenteData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': vicenteData.name,
      'experience-years': vicenteData.experienceYears,
      'languages': vicenteData.languages.join(', '),
      'availability': vicenteData.availability,
      'main-category': vicenteData.mainCategory,
      'summary': vicenteData.summary,
      'tagline': vicenteData.tagline,
      'thumbnail-description': vicenteData.thumbnail,
      'image': vicenteData.imageUrl,
      'profile-slug-2': vicenteData.profileSlug,
      'slug': vicenteData.slug,
      'video': vicenteData.videoUrl || '',
      'tools-tags': vicenteData.tools.join(', '),
      'skills-tags': vicenteData.specializations.join(', '),
      'disc-type': vicenteData.discResult,
      'english-score': vicenteData.englishTest,
      'english-level': vicenteData.englishLevel,
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Vicente Peñaflor in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Vicente Peñaflor added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${vicenteData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${vicenteData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

