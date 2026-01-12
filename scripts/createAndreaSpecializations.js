/**
 * Create missing specializations for Andrea in Webflow CMS
 * Run with: node scripts/createAndreaSpecializations.js
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

// 4 specializations for Andrea's cards
const specializationsToCreate = [
  'Property and Liability Insurance',
  'Commercial Insurance',
  'Quote Analysis',
  'Financial Support'
];

async function main() {
  try {
    console.log('🔗 Creating missing specializations for Andrea...\n');

    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    const collectionsResponse = await client.getCollections(site.id);
    
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    // Get existing specializations to check if they already exist
    console.log('📥 Fetching existing specializations...');
    const existingResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 });
    const existingNames = new Set();
    const existingMap = {};
    existingResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name'];
      if (name) {
        existingNames.add(name);
        existingMap[name] = item.id;
      }
    });

    console.log(`✅ Found ${existingNames.size} existing specializations\n`);

    // Create missing specializations
    const created = [];
    const skipped = [];
    const allSpecializationMap = { ...existingMap };

    for (const specName of specializationsToCreate) {
      if (existingNames.has(specName)) {
        console.log(`⏭️  Skipping "${specName}" (already exists)`);
        skipped.push(specName);
        continue;
      }

      console.log(`➕ Creating "${specName}"...`);

      try {
        const slug = specName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '');

        const fieldData = {
          'name': specName,
          'slug': slug,
        };

        const result = await client.createCollectionItem(specializationsCollection.id, fieldData, {
          isDraft: false,
        });

        const itemId = result.item?.id || result.id;
        console.log(`   ✅ Created successfully (ID: ${itemId})\n`);
        created.push({ name: specName, id: itemId });
        allSpecializationMap[specName] = itemId;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
      }
    }

    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Created: ${created.length}`);
    console.log(`  Skipped (already exist): ${skipped.length}`);
    console.log(`  Total: ${specializationsToCreate.length}\n`);

    if (created.length > 0) {
      console.log('✅ Specializations created successfully!\n');
    } else {
      console.log('ℹ️  All specializations already exist in Webflow.\n');
    }

    // Now assign them to Andrea
    console.log('═'.repeat(80));
    console.log('\n🔗 Assigning specializations to Andrea...\n');

    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    // Find Andrea
    console.log('📥 Fetching Andrea from Webflow...');
    const vasResponse = await client.getCollectionItems(vaCollection.id, { limit: 200 });
    const andrea = vasResponse.items.find(
      (va) => va.fieldData.name === 'Andrea' || va.fieldData.name === 'ANDREA'
    );

    if (!andrea) {
      console.error('❌ Andrea not found in Webflow CMS');
      console.log('💡 Make sure Andrea has been added to Webflow first.\n');
      process.exit(1);
    }

    console.log(`✅ Found Andrea (ID: ${andrea.id})\n`);

    // Get specialization IDs for all 4 specializations
    const specializationIds = specializationsToCreate
      .map((spec) => allSpecializationMap[spec])
      .filter((id) => id);

    console.log(`📋 Specializations to assign (${specializationIds.length}):`);
    specializationsToCreate.forEach((spec) => {
      const id = allSpecializationMap[spec];
      console.log(`   ${spec}: ${id ? '✅' : '❌'}`);
    });
    console.log('');

    if (specializationIds.length === 0) {
      console.error('❌ No specialization IDs found to assign');
      process.exit(1);
    }

    // Update Andrea with specializations
    const fieldData = {
      'specialization': specializationIds,
    };

    console.log('🔄 Updating Andrea with specializations...\n');

    await client.updateCollectionItem(vaCollection.id, andrea.id, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Andrea updated successfully with ${specializationIds.length} specializations!`);
    console.log(`   Item ID: ${andrea.id}`);
    console.log(`   Specializations: ${specializationsToCreate.join(', ')}\n`);

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

