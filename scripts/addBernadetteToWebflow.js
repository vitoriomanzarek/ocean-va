/**
 * Add Bernadette Abellana to Webflow CMS
 * Run with: node scripts/addBernadetteToWebflow.js
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

// Bernadette Abellana data
const bernadetteData = {
  name: 'Bernadette Abellana',
  title: 'U.S. MORTGAGE VIRTUAL ASSISTANT',
  experienceYears: '8 years',
  summary: 'Bernadette is a highly skilled Compliance Virtual Assistant with extensive experience in U.S. mortgage compliance, loan documentation review, and financial regulations across both U.S. and Philippine banking environments. Her background in Information Technology further strengthens her ability to work efficiently with loan origination systems and digital documentation workflows.',
  thumbnail: '8 yrs of Mortgage Experience, U.S. MORTGAGE COMPLIANCE, LOAN DOCUMENTATION REVIEW, FINANCIAL REGULATIONS',
  tagline: 'Bernadette is an excellent Virtual Assistant for mortgage lenders, who can confidently manage regulatory reviews, loan documentation, and quality assurance with consistency and accuracy.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/694afc3e354b9f27643f60df_Bernadette.webp',
  videoUrl: '', // Will be added later
  profileSlug: 'bernadette-abellana-ocean-va-profile',
  slug: 'bernadette-abellana',
  languages: ['English'],
  specializations: [
    'U.S. Mortgage Compliance',
    'Regulatory Review',
    'Loan Documentation Validation',
    'Pre-Underwriting',
    'Compliance Checklists',
    'Credit & Loan Processing Support',
    'Mortgage Documentation Review',
    'Digital Archiving',
    'Loan File Management',
    'Quality Control & Accuracy Audits',
    'Customer & Stakeholder Communication'
  ],
  tools: [
    'Loan Origination Systems (LOS)',
    'Mortgage Compliance Platforms',
    'Document Management & Archiving Systems',
    'Microsoft Office Suite',
    'Internal Banking & Financial Systems'
  ],
  mainCategory: 'Mortgage Specialist',
  availability: 'Full Time',
  discResult: 'C+S',
  englishTest: '75/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Bernadette Abellana to Webflow CMS...\n');

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

    const specializationIds = bernadetteData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    bernadetteData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[bernadetteData.mainCategory];
    console.log(`✅ Main Category "${bernadetteData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${bernadetteData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': bernadetteData.name,
      'experience-years': bernadetteData.experienceYears,
      'languages': bernadetteData.languages.join(', '),
      'availability': bernadetteData.availability,
      'main-category': bernadetteData.mainCategory,
      'summary': bernadetteData.summary,
      'tagline': bernadetteData.tagline,
      'thumbnail-description': bernadetteData.thumbnail,
      'image': bernadetteData.imageUrl,
      'profile-slug-2': bernadetteData.profileSlug,
      'slug': bernadetteData.slug,
      'video': bernadetteData.videoUrl || '',
      'tools-tags': bernadetteData.tools.join(', '),
      'skills-tags': bernadetteData.specializations.join(', '),
      'disc-type': bernadetteData.discResult,
      'english-score': bernadetteData.englishTest,
      'english-level': bernadetteData.englishLevel,
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Bernadette Abellana in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Bernadette Abellana added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${bernadetteData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${bernadetteData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

