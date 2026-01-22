/**
 * Fetch Drue's data from Webflow CMS as a reference model
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

async function main() {
  try {
    console.log('🔗 Fetching Drue\'s data from Webflow CMS...\n');

    // Get sites
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}`);
    console.log(`   ID: ${site.id}\n`);

    // Get collections
    const collectionsResponse = await client.getCollections(site.id);

    // Find the main Virtual Assistants collection
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Collection: ${vaCollection.displayName || vaCollection.name}`);
    console.log(`   ID: ${vaCollection.id}\n`);

    // Get collection fields to understand structure
    const collectionDetails = await client.getCollection(vaCollection.id);
    console.log(`📋 Collection Fields (${collectionDetails.fields.length}):`);
    collectionDetails.fields.forEach((field) => {
      console.log(`   - ${field.displayName} (slug: ${field.slug}, type: ${field.type})`);
    });
    console.log();

    // Fetch all items and find Drue
    let allItems = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    console.log('📥 Fetching all VAs to find Drue...\n');

    while (hasMore) {
      const itemsResponse = await client.getCollectionItems(vaCollection.id, {
        limit,
        offset,
      });

      allItems = allItems.concat(itemsResponse.items);
      hasMore = itemsResponse.items.length === limit;
      offset += limit;
    }

    // Find Drue by name or slug
    const drue = allItems.find(
      (item) =>
        item.fieldData.name?.toLowerCase().includes('drue') ||
        item.fieldData.slug?.toLowerCase().includes('drue')
    );

    if (!drue) {
      console.error('❌ Drue not found in collection');
      console.log('\nAvailable VAs:');
      allItems.forEach((item) => {
        console.log(`   - ${item.fieldData.name} (slug: ${item.fieldData.slug})`);
      });
      process.exit(1);
    }

    console.log('✅ Found Drue!\n');
    console.log('📊 Drue\'s Complete Data:');
    console.log('═'.repeat(80));
    console.log(JSON.stringify(drue, null, 2));
    console.log('═'.repeat(80));

    // Save to file
    const exportData = {
      timestamp: new Date().toISOString(),
      siteId: site.id,
      collectionId: vaCollection.id,
      collectionFields: collectionDetails.fields,
      drueData: {
        id: drue.id,
        name: drue.fieldData.name,
        slug: drue.fieldData.slug,
        isDraft: drue.isDraft,
        isArchived: drue.isArchived,
        fieldData: drue.fieldData,
      },
    };

    const filename = 'data/drue-reference-model.json';
    fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
    console.log(`\n💾 Data saved to: ${filename}\n`);

    // Display key fields
    console.log('🔑 Key Fields Summary:');
    console.log('─'.repeat(80));
    Object.keys(drue.fieldData).forEach((key) => {
      const value = drue.fieldData[key];
      if (value !== null && value !== undefined && value !== '') {
        const displayValue =
          typeof value === 'object' ? JSON.stringify(value).substring(0, 100) : String(value).substring(0, 100);
        console.log(`   ${key.padEnd(30)}: ${displayValue}`);
      }
    });
    console.log('─'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
