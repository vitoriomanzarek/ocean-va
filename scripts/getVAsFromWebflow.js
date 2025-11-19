/**
 * Fetch all VAs from the Virtual Assistants collection in Webflow
 * Run with: node scripts/getVAsFromWebflow.js
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

async function main() {
  try {
    console.log('🔗 Fetching Virtual Assistants from Webflow...\n');

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
      console.log('\nAvailable collections:');
      collectionsResponse.collections.forEach((col) => {
        console.log(`  - ${col.displayName || col.name} (slug: ${col.slug})`);
      });
      process.exit(1);
    }

    console.log(`📍 Collection: ${vaCollection.displayName || vaCollection.name}`);
    console.log(`   ID: ${vaCollection.id}`);
    console.log(`   Slug: ${vaCollection.slug}\n`);

    // Get collection fields
    const collectionDetails = await client.getCollection(vaCollection.id);
    console.log(`📋 Collection Fields (${collectionDetails.fields.length}):`);
    collectionDetails.fields.forEach((field) => {
      console.log(`   - ${field.displayName} (slug: ${field.slug}, type: ${field.type})`);
    });
    console.log();

    // Fetch all items with pagination
    let allItems = [];
    let offset = 0;
    const limit = 100; // Webflow typically allows up to 100 per request
    let hasMore = true;

    console.log('📥 Fetching items...');

    while (hasMore) {
      const itemsResponse = await client.getCollectionItems(vaCollection.id, {
        limit,
        offset,
      });

      allItems = allItems.concat(itemsResponse.items);
      console.log(`   Fetched ${itemsResponse.items.length} items (total: ${allItems.length})`);

      // Check if there are more items
      hasMore = itemsResponse.items.length === limit;
      offset += limit;
    }

    console.log(`\n✅ Total VAs found: ${allItems.length}\n`);

    // Display summary
    console.log('📊 VAs Summary:');
    console.log('─'.repeat(80));

    allItems.forEach((item, index) => {
      const name = item.fieldData.name || 'Unnamed';
      const slug = item.fieldData.slug || 'no-slug';
      const status = item.isDraft ? '📝 Draft' : '✅ Published';
      console.log(`${index + 1}. ${name.padEnd(25)} | Slug: ${slug.padEnd(35)} | ${status}`);
    });

    console.log('─'.repeat(80));

    // Export as JSON for reference
    const exportData = {
      timestamp: new Date().toISOString(),
      siteId: site.id,
      collectionId: vaCollection.id,
      totalVAs: allItems.length,
      vas: allItems.map((item) => ({
        id: item.id,
        name: item.fieldData.name,
        slug: item.fieldData.slug,
        isDraft: item.isDraft,
        isArchived: item.isArchived,
        fieldData: item.fieldData,
      })),
    };

    console.log('\n💾 Full data saved to: webflow-vas-export.json');
    console.log('   (Check this file for complete field data)\n');

    // Save to file
    import('fs').then((fs) => {
      fs.writeFileSync(
        'webflow-vas-export.json',
        JSON.stringify(exportData, null, 2)
      );
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
