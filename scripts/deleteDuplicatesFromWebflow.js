/**
 * Delete duplicate VAs from Webflow CMS (keep the clean ones)
 * Run with: node scripts/deleteDuplicatesFromWebflow.js
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
    console.log('🔗 Deleting duplicate VAs from Webflow...\n');

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

    console.log(`📍 Collection ID: ${vaCollection.id}\n`);

    // Read the webflow export file
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    // Identify duplicates: keep clean slugs, delete ones with hash suffixes
    const duplicates = [];
    const seen = new Map();

    webflowExport.vas.forEach((va) => {
      const name = va.fieldData.name;
      const slug = va.fieldData.slug;

      // Check if slug has a hash suffix (e.g., "anahi-175da", "grace-bbbfc")
      const hasHashSuffix = /-[a-f0-9]{5}$/.test(slug);

      if (!seen.has(name)) {
        seen.set(name, { va, hasHashSuffix });
      } else {
        // We've seen this name before
        const existing = seen.get(name);

        // If current has hash suffix and existing doesn't, mark current as duplicate
        if (hasHashSuffix && !existing.hasHashSuffix) {
          duplicates.push(va);
        }
        // If existing has hash suffix and current doesn't, mark existing as duplicate
        else if (!hasHashSuffix && existing.hasHashSuffix) {
          duplicates.push(existing.va);
          seen.set(name, { va, hasHashSuffix });
        }
        // If both have hash suffix or both don't, keep the first one
        else if (hasHashSuffix && existing.hasHashSuffix) {
          duplicates.push(va);
        }
      }
    });

    console.log(`📊 Found ${duplicates.length} duplicate(s) to delete:\n`);

    let successCount = 0;
    let failCount = 0;

    for (const duplicate of duplicates) {
      const name = duplicate.fieldData.name;
      const slug = duplicate.fieldData.slug;
      const id = duplicate.id;

      console.log(`🗑️  Deleting ${name} (slug: ${slug}, ID: ${id})...`);

      try {
        await client.deleteCollectionItem(vaCollection.id, id);
        console.log(`   ✅ Deleted successfully\n`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        failCount++;
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Successfully deleted: ${successCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Total: ${successCount + failCount}\n`);

    if (failCount === 0 && successCount > 0) {
      console.log('✅ All duplicates deleted successfully!\n');
    } else if (successCount === 0) {
      console.log('ℹ️  No duplicates found or all deletions failed.\n');
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
