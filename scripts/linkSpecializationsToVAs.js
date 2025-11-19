/**
 * Link Specializations to VAs using multi-reference
 * Run with: node scripts/linkSpecializationsToVAs.js
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
    console.log('🔗 Linking Specializations to VAs...\n');

    // Get sites and collection IDs
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
    
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    if (!specializationsCollection) {
      console.error('❌ VAs Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}`);
    console.log(`📍 VAs Collection ID: ${vaCollection.id}`);
    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    // Get all specializations from Webflow
    console.log('📥 Fetching specializations from Webflow...');
    const specializationsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 100 });
    
    const specializationMap = {};
    specializationsResponse.items.forEach((spec) => {
      specializationMap[spec.fieldData.name] = spec.id;
    });

    console.log(`✅ Found ${Object.keys(specializationMap).length} specializations\n`);

    // Read the webflow export file
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    console.log(`📤 Linking specializations to ${vasData.length} VAs...\n`);

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

      console.log(`📤 Linking ${va.nombre}...`);

      try {
        // Get specialization IDs for this VA
        const specializationIds = va.especialización
          .map((spec) => specializationMap[spec])
          .filter((id) => id !== undefined);

        if (specializationIds.length === 0) {
          console.log(`   ⚠️  No specializations found for ${va.nombre}`);
          skippedCount++;
          continue;
        }

        // Update VA with specializations multi-reference
        const fieldData = {
          'specialization': specializationIds,
        };

        await client.updateCollectionItem(vaCollection.id, webflowVA.id, fieldData, {
          isDraft: false, // Keep published
        });

        console.log(`   ✅ Linked ${specializationIds.length} specialization(s)\n`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        failCount++;
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Successfully linked: ${successCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Skipped: ${skippedCount}`);
    console.log(`  Total: ${successCount + failCount + skippedCount}\n`);

    if (failCount === 0) {
      console.log('✅ All specializations linked successfully!\n');
    } else {
      console.log('⚠️  Some VAs failed to link. Review the errors above.\n');
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
