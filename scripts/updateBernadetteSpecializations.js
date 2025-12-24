/**
 * Update Bernadette's specializations in Webflow CMS
 * Run with: node scripts/updateBernadetteSpecializations.js
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

// Bernadette's specializations (from her profile)
const bernadetteSpecializations = [
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
];

// Bernadette's item ID from when we created her
const BERNADETTE_ITEM_ID = '694b0260096a55e446df421e';

async function main() {
  try {
    console.log('🔗 Updating Bernadette\'s specializations in Webflow CMS...\n');

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

    console.log('📥 Fetching all specializations...');
    const specializationsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 });
    const specializationMap = {};
    specializationsResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name'];
      if (name) {
        specializationMap[name] = item.id;
      }
    });

    console.log(`✅ Found ${Object.keys(specializationMap).length} specializations\n`);

    // Find which of Bernadette's specializations exist in the CMS
    console.log('🔍 Checking which specializations exist for Bernadette...\n');
    const availableSpecializations = [];
    const missingSpecializations = [];

    bernadetteSpecializations.forEach((spec) => {
      const id = specializationMap[spec];
      if (id) {
        availableSpecializations.push({ name: spec, id });
        console.log(`   ✅ ${spec}`);
      } else {
        missingSpecializations.push(spec);
        console.log(`   ❌ ${spec} (not found in CMS)`);
      }
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Available: ${availableSpecializations.length}`);
    console.log(`   Missing: ${missingSpecializations.length}\n`);

    // Use all available specializations (prioritize at least 4)
    const specializationsToLink = availableSpecializations.slice(0, 11);
    
    if (specializationsToLink.length === 0) {
      console.log('❌ No specializations found to link!\n');
      process.exit(1);
    }

    const specializationIds = specializationsToLink.map(s => s.id);

    console.log(`📋 Specializations to link (${specializationIds.length}):`);
    specializationsToLink.forEach(s => {
      console.log(`   - ${s.name}`);
    });
    console.log('');

    // Get current Bernadette item to preserve other fields
    console.log('📥 Fetching current Bernadette item...');
    const currentItem = await client.getCollectionItem(vaCollection.id, BERNADETTE_ITEM_ID);
    console.log(`✅ Found Bernadette: ${currentItem.fieldData.name}\n`);

    // Update only the specialization field
    const fieldData = {
      'specialization': specializationIds,
    };

    console.log('🔄 Updating Bernadette\'s specializations...\n');

    await client.updateCollectionItem(vaCollection.id, BERNADETTE_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Bernadette updated successfully with ${specializationIds.length} specializations!`);
    console.log(`   Item ID: ${BERNADETTE_ITEM_ID}\n`);

    if (missingSpecializations.length > 0) {
      console.log('⚠️  Note: The following specializations are not in the CMS:');
      missingSpecializations.forEach(spec => {
        console.log(`   - ${spec}`);
      });
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

