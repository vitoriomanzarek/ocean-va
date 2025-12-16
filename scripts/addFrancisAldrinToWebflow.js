/**
 * Add Francis Aldrin to Webflow CMS
 * Run with: node scripts/addFrancisAldrinToWebflow.js
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

// Francis Aldrin data
const francisData = {
  name: 'Francis Aldrin',
  title: 'MORTGAGE VIRTUAL ASSISTANT',
  experienceYears: '5 years',
  summary: 'Francis Aldrin is a highly experienced Virtual Assistant with over 7 years of hands-on experience in loan processing, mortgage operations, and administrative support for both Australian and U.S.-based lending teams. He has worked extensively with Positive Lending Solutions and U.S. mortgage companies, supporting credit, underwriting, and settlement teams by ensuring loan applications are accurate, complete, and processed within strict KPI timelines.',
  thumbnail: '5 yrs of Mortgage Experience, Assistant Underwriter, Full Loan Lifecycle Support',
  tagline: 'Francis is the ideal Virtual Assistant for mortgage lenders seeking a detail-driven professional with strong experience in submission processing and end-to-end loan administration.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69419bea1295e8b25745b2a1_Francis%20Aldrin.webp',
  videoUrl: 'https://youtu.be/j7mlXZIEMx4',
  profileSlug: 'francis-aldrin-ocean-va-profile',
  slug: 'francis-aldrin',
  languages: ['English'],
  specializations: [
    'Loan Application Processing',
    'Mortgage & Asset Loan Documentation Review',
    'Credit & Underwriting Support',
    'Final Modifications',
    'Settlement Coordination',
    'Lender Portal System Data Entry',
    'Document Accuracy',
    'Validation & Compliance',
    'Insurance & Third-Party Orders',
    'Loan Closing'
  ],
  tools: [
    'Lender Portals & Loan Processing Systems',
    'Mortgage & Credit Team Platforms',
    'Document Management Systems',
    'Microsoft Office (Word, Excel, Outlook)',
    'Internal Communication & Workflow Tools'
  ],
  mainCategory: 'Mortgage Specialist',
  availability: 'Available',
  discResult: 'C+S',
  englishTest: '90/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Francis Aldrin to Webflow CMS...\n');

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

    const specializationIds = francisData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    francisData.specializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[francisData.mainCategory];
    console.log(`✅ Main Category "${francisData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${francisData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': francisData.name,
      'experience-years': francisData.experienceYears,
      'languages': francisData.languages.join(', '),
      'availability': francisData.availability,
      'main-category': francisData.mainCategory,
      'summary': francisData.summary,
      'tagline': francisData.tagline,
      'thumbnail-description': francisData.thumbnail,
      'image': francisData.imageUrl,
      'profile-slug-2': francisData.profileSlug,
      'slug': francisData.slug,
      'video': francisData.videoUrl || '',
      'tools-tags': francisData.tools.join(', '),
      'skills-tags': francisData.specializations.join(', '),
      'disc-type': francisData.discResult,
      'english-score': francisData.englishTest,
      'english-level': francisData.englishLevel,
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Francis Aldrin in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Francis Aldrin added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${francisData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${francisData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

