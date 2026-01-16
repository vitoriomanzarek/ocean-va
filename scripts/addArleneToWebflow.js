/**
 * Add Arlene to Webflow CMS
 * Run with: node scripts/addArleneToWebflow.js
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

// Arlene data
const arleneData = {
  name: 'Arlene',
  title: 'MORTGAGE LOAN PROCESSOR',
  experienceYears: '13 years',
  summary: 'Arlene is a mortgage support professional with experience assisting international brokers throughout the residential mortgage process. Her background is focused on loan preparation, document review, compliance readiness, and broker coordination. She has direct exposure to U.S. mortgage pre-submission workflows and supports structured, accurate loan file management across multiple markets.',
  thumbnail: 'US MORTGAGE SUPPORT, DOCUMENT COMPLIANCE, BROKER WORKFLOWS',
  tagline: 'Arlene brings reliable mortgage workflow support with a clear understanding of broker requirements, borrower documentation, and pre-submission compliance standards. Her experience supporting U.S. and international mortgage files makes her a dependable resource for teams seeking consistency, accuracy, and organized loan processing.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696a85fc56c2e4a099af1d72_Arlene.webp',
  videoUrl: 'https://youtu.be/Ewu0AMz9zAY',
  profileSlug: 'arlene-ocean-va-profile',
  slug: 'arlene',
  languages: ['English'],
  // All specializations (for filtering/relations - used in specialization field)
  allSpecializations: [
    'US Mortgage Support',
    'Document Compliance',
    'Broker Workflows',
    'Mortgage Processing',
    'Document Review',
    'Loan Preparation',
    'Loan Submission',
    'Lender Research',
    'Compliance Checks',
    'Residential Loans',
    'File Management',
    'Client Follow Ups'
  ],
  // Top 4 specializations for cards (max 4 to keep cards clean - used in skills-tags)
  cardSpecializations: [
    'US Mortgage Support',
    'Document Compliance',
    'Broker Workflows',
    'Mortgage Processing'
  ],
  tools: [
    'MyCRM',
    'Apply Online',
    'Infinity',
    'Encompass',
    'Flex',
    'Mercury',
    'Zoho',
    'DocuSign',
    'RingCentral',
    'Zoom'
  ],
  mainCategory: 'Mortgage Specialist',
  availability: 'Full Time',
  discResult: 'S+C',
  englishTest: '6.6/9 B1',
  englishLevel: 'B1'
};

async function main() {
  try {
    console.log('🔗 Adding Arlene to Webflow CMS...\n');

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

    const specializationIds = arleneData.allSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    arleneData.allSpecializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[arleneData.mainCategory];
    console.log(`✅ Main Category "${arleneData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${arleneData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': arleneData.name,
      'experience-years': arleneData.experienceYears,
      'languages': arleneData.languages.join(', '),
      'availability': arleneData.availability,
      'main-category': arleneData.mainCategory,
      'summary': arleneData.summary,
      'tagline': arleneData.tagline,
      'thumbnail-description': arleneData.thumbnail,
      'image': arleneData.imageUrl,
      'profile-slug-2': arleneData.profileSlug,
      'slug': arleneData.slug,
      'video': arleneData.videoUrl || '',
      'tools-tags': arleneData.tools.join(', '),
      'skills-tags': arleneData.cardSpecializations.join(', '),
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Arlene in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Arlene added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${arleneData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${arleneData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

