/**
 * Add Andres to Webflow CMS
 * Run with: node scripts/addAndresToWebflow.js
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

// Andres data
const andresData = {
  name: 'Andres',
  title: 'BILINGUAL VA | INSURANCE VA & RETENTION SUPPORT',
  experienceYears: '5 years',
  summary: 'Andres is a bilingual Virtual Assistant with hands-on experience supporting U.S. insurance agencies, specializing in customer retention, policy servicing, billing assistance, and administrative support. He is known for his adaptability, problem-solving skills, and ability to manage high call volumes while maintaining detailed documentation and compliance with carrier requirements.',
  thumbnail: '5 yrs of Insurance Experience, Auto, Home and Renters, QUOTING (FL & PA), ENDORSEMENTS & RENEWALS',
  tagline: 'Andres is the ideal Virtual Assistant for insurance agencies needing a reliable bilingual professional who can manage policy servicing, resolve billing concerns, and provide consistent client support. His strong administrative discipline, clear communication, and accuracy in documentation make him a dependable asset.',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69419bea8e264eb8117ea0b9_Andres.webp',
  videoUrl: 'https://youtu.be/uoZyHjqKUf0',
  profileSlug: 'andres-ocean-va-profile',
  slug: 'andres',
  languages: ['English', 'Spanish'],
  specializations: [
    'Personal Lines',
    'Quoting Support',
    'Endorsements',
    'Renewals',
    'Policy Servicing',
    'Client Retention',
    'Document Review',
    'Claims Support',
    'Admin Tasks',
    'Scheduling',
    'Billing Support',
    'Multichannel Communication'
  ],
  tools: [
    'Hawksoft',
    'Agency Zoom',
    'Applied Rater',
    'RingCentral',
    'WeConnect',
    'Teams',
    'Google Workspace',
    'Microsoft Office'
  ],
  mainCategory: 'Insurance Virtual Assistant',
  availability: 'Available',
  discResult: 'S+C',
  englishTest: '80/B1',
  englishLevel: 'B1'
};

async function main() {
  try {
    console.log('🔗 Adding Andres to Webflow CMS...\n');

    // Get sites
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    // Get collections
    const collectionsResponse = await client.getCollections(site.id);
    
    // Find Virtual Assistants collection
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    // Find Specializations collection
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    // Find Main Category collection
    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories'
    );

    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found');
      process.exit(1);
    }

    console.log(`📍 Main Category Collection ID: ${mainCategoryCollection.id}\n`);

    // Get all specializations to find IDs
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

    // Get specialization IDs for Andres
    const specializationIds = andresData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to link: ${specializationIds.length}`);
    andresData.specializations.forEach((spec) => {
      const id = specializationMap[spec];
      console.log(`   ${spec}: ${id ? '✅' : '❌'}`);
    });
    console.log('');

    // Get main category ID
    console.log('📥 Fetching main categories...');
    const mainCategoryResponse = await client.getCollectionItems(mainCategoryCollection.id, { limit: 50 });
    const mainCategoryMap = {};
    mainCategoryResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['category-name'];
      if (name) {
        mainCategoryMap[name] = item.id;
      }
    });

    const mainCategoryId = mainCategoryMap[andresData.mainCategory];
    console.log(`✅ Main Category "${andresData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`);

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${andresData.mainCategory}" not found`);
      console.log('Available categories:', Object.keys(mainCategoryMap));
      process.exit(1);
    }

    // Prepare field data using correct field slugs from Webflow
    const fieldData = {
      'name': andresData.name,
      'experience-years': andresData.experienceYears,
      'languages': andresData.languages.join(', '),
      'availability': andresData.availability,
      'main-category': andresData.mainCategory, // PlainText field
      'summary': andresData.summary,
      'tagline': andresData.tagline,
      'thumbnail-description': andresData.thumbnail,
      'image': andresData.imageUrl, // Image field accepts URL
      'profile-slug-2': andresData.profileSlug,
      'slug': andresData.slug,
      'video': andresData.videoUrl || '',
      'tools-tags': andresData.tools.join(', '),
      'skills-tags': andresData.specializations.join(', '),
      'disc-type': andresData.discResult,
      'english-score': andresData.englishTest,
      'english-level': andresData.englishLevel,
    };

    // Add main-categories as multi-reference if we have the ID
    if (mainCategoryId) {
      fieldData['main-categories'] = [mainCategoryId];
    }

    // Add specializations as multi-reference if we have IDs
    if (specializationIds.length > 0) {
      fieldData['specialization'] = specializationIds;
    }

    console.log('➕ Creating Andres in Webflow CMS...\n');
    console.log('Field Data:', JSON.stringify(fieldData, null, 2));
    console.log('');

    // Create item
    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false, // Publish immediately
    });

    const itemId = result.item?.id || result.id;
    console.log(`✅ Andres added successfully!`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Slug: ${andresData.slug}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/${andresData.profileSlug}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    if (error.status) {
      console.error('Status:', error.status);
    }
    process.exit(1);
  }
}

main();

