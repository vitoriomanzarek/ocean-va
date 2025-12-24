/**
 * Create missing specializations for Vicente in Webflow CMS
 * Run with: node scripts/createVicenteSpecializations.js
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

// Specializations to create for Vicente
const specializationsToCreate = [
  'Insurance Quoting',
  'Document Upload',
  'AMS Management',
  'Carrier Portals',
  'Back-End Support',
  'Data Entry',
  'Quote Preparation'
];

async function main() {
  try {
    console.log('🔗 Creating missing specializations for Vicente...\n');

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
    existingResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name'];
      if (name) {
        existingNames.add(name);
      }
    });

    console.log(`✅ Found ${existingNames.size} existing specializations\n`);

    // Create missing specializations
    const created = [];
    const skipped = [];

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
      console.log('📌 Next step: Run node scripts/updateVicenteSpecializations.js\n');
    } else {
      console.log('ℹ️  All specializations already exist in Webflow.\n');
    }

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

