/**
 * Update Ruel's specializations in Webflow CMS
 * Run with: node scripts/updateRuelSpecializations.js
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

// Ruel's specializations (from his profile)
const ruelSpecializations = [
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
];

// Ruel's item ID from when we created him
const RUEL_ITEM_ID = '6944849cae55ce44765a5c64';

async function main() {
  try {
    console.log('🔗 Updating Ruel\'s specializations in Webflow CMS...\n');

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

    // Find which of Ruel's specializations exist in the CMS
    console.log('🔍 Checking which specializations exist for Ruel...\n');
    const availableSpecializations = [];
    const missingSpecializations = [];

    ruelSpecializations.forEach((spec) => {
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

    // Select up to 4 specializations (user wants 4)
    // Prioritize: Commercial Lines, Quoting, Policy Servicing, Renewals (or Customer Support if Renewals not available)
    const priorityOrder = ['Commercial Lines', 'Quoting', 'Policy Servicing', 'Renewals', 'Customer Support'];
    const ordered = priorityOrder
      .map(name => availableSpecializations.find(s => s.name === name))
      .filter(Boolean)
      .slice(0, 4);
    
    const specializationsToLink = ordered.length >= 4 ? ordered : availableSpecializations.slice(0, 4);
    
    if (specializationsToLink.length < 4) {
      console.log(`⚠️  Only found ${availableSpecializations.length} specializations, will use all available.\n`);
    } else {
      console.log(`✅ Found ${specializationsToLink.length} specializations to link.\n`);
    }

    const specializationIds = specializationsToLink.map(s => s.id);

    console.log(`📋 Specializations to link (${specializationIds.length}):`);
    specializationsToLink.forEach(s => {
      console.log(`   - ${s.name}`);
    });
    console.log('');

    // Get current Ruel item to preserve other fields
    console.log('📥 Fetching current Ruel item...');
    const currentItem = await client.getCollectionItem(vaCollection.id, RUEL_ITEM_ID);
    console.log(`✅ Found Ruel: ${currentItem.fieldData.name}\n`);

    // Update only the specialization field
    const fieldData = {
      'specialization': specializationIds,
    };

    console.log('🔄 Updating Ruel\'s specializations...\n');

    await client.updateCollectionItem(vaCollection.id, RUEL_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Ruel updated successfully with ${specializationIds.length} specializations!`);
    console.log(`   Item ID: ${RUEL_ITEM_ID}\n`);

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

