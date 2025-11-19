/**
 * Publish all VAs in Webflow CMS
 * Run with: node scripts/publishVAsToWebflow.js
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
    console.log('🔗 Publishing VAs to Webflow...\n');

    // Get sites and collection ID
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}`);
    console.log(`📍 Collection ID: ${vaCollection.id}\n`);

    // Read the webflow export file to get all VA IDs
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    const itemIds = webflowExport.vas.map((va) => va.id);

    console.log(`📊 Publishing ${itemIds.length} VAs...\n`);

    // Publish in batches (Webflow API might have limits)
    const batchSize = 50;
    let publishedCount = 0;
    let failCount = 0;

    for (let i = 0; i < itemIds.length; i += batchSize) {
      const batch = itemIds.slice(i, i + batchSize);
      console.log(`📤 Publishing batch ${Math.floor(i / batchSize) + 1} (${batch.length} items)...`);

      try {
        const result = await client.publishItems(vaCollection.id, batch);
        publishedCount += batch.length;
        console.log(`   ✅ Batch published successfully\n`);
      } catch (error) {
        console.error(`   ❌ Error publishing batch: ${error.message}\n`);
        failCount += batch.length;
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Successfully published: ${publishedCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Total: ${publishedCount + failCount}\n`);

    if (failCount === 0) {
      console.log('✅ All VAs published successfully!\n');
    } else {
      console.log('⚠️  Some VAs failed to publish. Review the errors above.\n');
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
