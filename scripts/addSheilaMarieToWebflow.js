/**
 * Add Sheila Marie Rogador to Webflow CMS
 * Run with: node scripts/addSheilaMarieToWebflow.js
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

// Sheila Marie Rogador data
const sheilaMarieData = {
  name: 'Sheila Marie',
  title: 'ENGLISH SPEAKING VA | MORTGAGE UNDERWRITING SUPPORT',
  experienceYears: '15 years',
  summary: 'Sheila Marie is a highly experienced Virtual Assistant and Underwriting Support Specialist with more than 14 years of background in mortgage operations, quality assurance, documentation review, and loan processing. She has a proven history with JP Morgan Chase and TCLS Mortgage Processing Center, where she completed detailed underwriting support, audited loan files for accuracy, analyzed credit and income documents, and ensured strict adherence to investor guidelines.',
  thumbnail: '15 YEARS OF MORTGAGE EXPERIENCE, UNDERWRITING SUPPORT, VA LOAN FILES, U.S. RESIDENTIAL MORTGAGE, ENGLISH LEVEL: Advanced',
  tagline: 'Sheila brings deep, hands-on expertise in document-intensive mortgage workflows, making her a reliable back-office specialist for lenders handling complex residential loan files. Her long-term experience with U.S. investor guidelines, loan audits, and system accuracy allows teams to reduce errors, maintain compliance, and move files efficiently through underwriting and modification stages.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69543f851a07b33b8e852147_Sheila%20Marie.webp',
  videoUrl: 'https://youtu.be/BoMYNQUMono',
  profileSlug: 'sheila-marie-ocean-va-profile',
  slug: 'sheila-marie',
  languages: ['English'],
  // All specializations (for filtering/relations - used in specialization field)
  allSpecializations: [
    'Loan Review',
    'Document Validation',
    'Underwriting Support',
    'AUS Preparation',
    'File Auditing',
    'Loss Mitigation',
    'Loan Modifications',
    'VA Loans',
    'Quality Control',
    'Data Accuracy',
    'Process Compliance',
    'System Updates'
  ],
  // Top 4 specializations for cards (max 4 to keep cards clean - used in skills-tags)
  cardSpecializations: [
    'Loan Review',
    'Underwriting Support',
    'File Auditing',
    'Quality Control'
  ],
  tools: [
    'MeridianLink',
    'Loan Product Advisor',
    'Financial Documentation Platforms',
    'Proprietary LOS',
    'MS Office Suite',
    'Email'
  ],
  mainCategory: 'Mortgage Specialist',
  availability: 'Full Time',
  discResult: 'S',
  englishTest: '90/C1',
  englishLevel: 'C1'
};

async function main() {
  try {
    console.log('🔗 Adding Sheila Marie Rogador to Webflow CMS...\n');

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

    // Use all specializations for filtering/relations
    const specializationIds = sheilaMarieData.allSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link (for filtering): ${specializationIds.length}`);
    sheilaMarieData.allSpecializations.forEach((spec) => {
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

    const mainCategoryId = mainCategoryMap[sheilaMarieData.mainCategory];
    console.log(`✅ Main Category "${sheilaMarieData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${sheilaMarieData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    const fieldData = {
      'name': sheilaMarieData.name,
      'experience-years': sheilaMarieData.experienceYears,
      'languages': sheilaMarieData.languages.join(', '),
      'availability': sheilaMarieData.availability,
      'main-category': sheilaMarieData.mainCategory,
      'summary': sheilaMarieData.summary,
      'tagline': sheilaMarieData.tagline,
      'thumbnail-description': sheilaMarieData.thumbnail,
      'image': sheilaMarieData.imageUrl,
      'profile-slug-2': sheilaMarieData.profileSlug,
      'slug': sheilaMarieData.slug,
      'video': sheilaMarieData.videoUrl || '',
      'tools-tags': sheilaMarieData.tools.join(', '),
      'skills-tags': sheilaMarieData.cardSpecializations.join(', '), // Max 4 for cards
      'disc-type': sheilaMarieData.discResult,
      'english-score': sheilaMarieData.englishTest,
      'english-level': sheilaMarieData.englishLevel,
    };

    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Sheila Marie Rogador in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false,
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Sheila Marie Rogador added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${sheilaMarieData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${sheilaMarieData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

