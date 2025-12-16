/**
 * Add Juname to Webflow CMS
 * Run with: node scripts/addJunameToWebflow.js
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

// Juname data
const junameData = {
  name: 'Juname',
  title: 'ENGLISH-SPEAKING VA | MORTGAGE OPERATIONS',
  experienceYears: '4 years',
  summary: 'Junamae is a Mortgage Virtual Assistant with nearly four years of experience supporting U.S. lenders, brokers, and loan officers across initial setup, processing, and underwriting assistance. She is skilled in documentation review, borrower verification, appraisal ordering, disclosures, and coordinating with title and escrow partners. Her background includes handling loan file registration, AUS support, and managing conditions to ensure complete and compliant submissions. She is proficient in major LOS platforms and follows a structured, deadline-driven approach.',
  thumbnail: '4 yrs of U.S. MORTGAGE Experience, INITIAL SETUP & PROCESSING, ARRIVE, ENCOMPASS, LENDINGPAD',
  tagline: 'Junamae is an ideal hire for mortgage teams needing fast, accurate, and reliable loan file support. Her experience across submission, underwriting assistance, and borrower documentation ensures a streamlined workflow from intake to approval. She brings consistency, precision, and strong familiarity with U.S. lending requirements.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69419beae8f25b613039f00b_Juname.webp',
  videoUrl: 'https://youtu.be/XOGqxYdZUQo',
  profileSlug: 'juname-ocean-va-profile',
  slug: 'juname',
  languages: ['English'],
  specializations: [
    'Initial Setup',
    'Loan Processing',
    'Doc Collection',
    'Borrower Review',
    'VOE Handling',
    'Appraisal Orders',
    'Disclosure Sending',
    'Underwriting Support',
    'AUS Review',
    'File Registration',
    'Title Coordination',
    'Pipeline Tracking'
  ],
  tools: [
    'Arrive',
    'Encompass',
    'LendingPad',
    'AUS Systems',
    'DocuSign',
    'Adobe Sign',
    'HubSpot',
    'Dropbox',
    'Google Suite',
    'MS Office',
    'Zoom'
  ],
  mainCategory: 'Mortgage Specialist',
  availability: 'Available',
  discResult: 'C+S',
  englishTest: '95/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Juname to Webflow CMS...\n');

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

    const specializationIds = junameData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    junameData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[junameData.mainCategory];
    console.log(`✅ Main Category "${junameData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${junameData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': junameData.name,
      'experience-years': junameData.experienceYears,
      'languages': junameData.languages.join(', '),
      'availability': junameData.availability,
      'main-category': junameData.mainCategory,
      'summary': junameData.summary,
      'tagline': junameData.tagline,
      'thumbnail-description': junameData.thumbnail,
      'image': junameData.imageUrl,
      'profile-slug-2': junameData.profileSlug,
      'slug': junameData.slug,
      'video': junameData.videoUrl || '',
      'tools-tags': junameData.tools.join(', '),
      'skills-tags': junameData.specializations.join(', '),
      'disc-type': junameData.discResult,
      'english-score': junameData.englishTest,
      'english-level': junameData.englishLevel,
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Juname in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Juname added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${junameData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${junameData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

