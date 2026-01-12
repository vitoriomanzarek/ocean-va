/**
 * Add Andrea to Webflow CMS
 * Run with: node scripts/addAndreaToWebflow.js
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

// Andrea data
const andreaData = {
  name: 'Andrea',
  title: 'BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT',
  experienceYears: '7 years',
  summary: 'Andrea is a bilingual Virtual Assistant with over 7 years of experience supporting insurance, financial services, and commercial operations across multinational organizations. With a strong background in risk analysis, portfolio management, and business development, Andrea brings a highly analytical and strategic mindset to virtual support roles, excelling in client communication, proposal development, market analysis, and CRM management.',
  thumbnail: '7 yrs of Insurance Experience, PROPERTY AND LIABILITY INSURANCE, COMMERCIAL INSURANCE, QUOTE ANALYSIS, FINANCIAL SUPPORT',
  tagline: 'Andrea is an excellent Virtual Assistant for insurance agencies seeking a strategic, detail-oriented professional who can support administrative operations with confidence and precision.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69654ee699f9691cf3753b67_Andrea.webp',
  videoUrl: 'https://youtu.be/t9ltQNUVG7U',
  profileSlug: 'andrea-ocean-va-profile',
  slug: 'andrea',
  languages: ['Bilingual (EN-ES)'],
  // All specializations (for filtering/relations - used in specialization field)
  allSpecializations: [
    'Commercial Insurance',
    'Quote Analysis',
    'Financial Support',
    'Risk Assessment',
    'Portfolio Analysis',
    'Client Acquisition',
    'Retention Support',
    'Proposal Development',
    'Pricing Analysis',
    'Market Research',
    'Account Profitability',
    'Performance Tracking'
  ],
  // Top 4 specializations for cards (max 4 to keep cards clean - used in skills-tags)
  cardSpecializations: [
    'Property and Liability Insurance',
    'Commercial Insurance',
    'Quote Analysis',
    'Financial Support'
  ],
  tools: [
    'Microsoft Office Suite',
    'Salesforce',
    'Power BI',
    'CRM & Reporting Platforms',
    'Email',
    'Calendar'
  ],
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Full Time',
  discResult: 'I+D',
  englishTest: '90/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Andrea to Webflow CMS...\n');

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

    const specializationIds = andreaData.allSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    andreaData.allSpecializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[andreaData.mainCategory];
    console.log(`✅ Main Category "${andreaData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${andreaData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': andreaData.name,
      'experience-years': andreaData.experienceYears,
      'languages': andreaData.languages.join(', '),
      'availability': andreaData.availability,
      'main-category': andreaData.mainCategory,
      'summary': andreaData.summary,
      'tagline': andreaData.tagline,
      'thumbnail-description': andreaData.thumbnail,
      'image': andreaData.imageUrl,
      'profile-slug-2': andreaData.profileSlug,
      'slug': andreaData.slug,
      'video': andreaData.videoUrl || '',
      'tools-tags': andreaData.tools.join(', '),
      'skills-tags': andreaData.cardSpecializations.join(', '),
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Andrea in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Andrea added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${andreaData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${andreaData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

