/**
 * Update Profile Slugs to Webflow
 * Run with: node scripts/updateProfileSlugsToWebflow.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { vasData } from '../src/data/vasData.js';
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
    console.log('🔗 Updating Profile Slugs to Webflow...\n');

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

    // Read the webflow export file
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    console.log(`📤 Updating ${vasData.length} VAs with Profile Slugs...\n`);

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    for (const va of vasData) {
      // Find corresponding Webflow VA
      const webflowVA = webflowExport.vas.find((wva) => wva.fieldData.name === va.nombre);

      if (!webflowVA) {
        console.log(`⚠️  ${va.nombre} not found in Webflow (skipping)`);
        skippedCount++;
        continue;
      }

      console.log(`📤 Updating ${va.nombre}...`);

      try {
        // Update profile-slug as Link field - try with object format
        const fieldData = {
          'profile-slug': {
            url: va.slug,
          },
        };

        await client.updateCollectionItem(vaCollection.id, webflowVA.id, fieldData, {
          isDraft: false, // Keep published
        });

        console.log(`   ✅ Updated successfully\n`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        failCount++;
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Successfully updated: ${successCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Skipped: ${skippedCount}`);
    console.log(`  Total: ${successCount + failCount + skippedCount}\n`);

    if (failCount === 0) {
      console.log('✅ All profile slugs updated successfully!\n');
    } else {
      console.log('⚠️  Some VAs failed to update. Review the errors above.\n');
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
