/**
 * Create Specializations collection and sync all specializations from vasData.js
 * Run with: node scripts/syncSpecializationsToWebflow.js
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
    console.log('🔗 Syncing Specializations to Webflow...\n');

    // Get sites
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    // Get all collections
    const collectionsResponse = await client.getCollections(site.id);
    let specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.log('⚠️  VAs Specializations collection not found in Webflow');
      console.log('📌 Please create it manually with fields: name, slug\n');
      process.exit(1);
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`);

    // Extract all unique specializations from vasData
    const allSpecializations = new Set();
    vasData.forEach((va) => {
      va.especialización.forEach((spec) => {
        allSpecializations.add(spec);
      });
    });

    const specializationsList = Array.from(allSpecializations).sort();

    console.log(`📊 Found ${specializationsList.length} unique specializations:\n`);
    specializationsList.forEach((spec) => {
      console.log(`   • ${spec}`);
    });
    console.log();

    // Get existing specializations in Webflow
    const existingItems = await client.getCollectionItems(specializationsCollection.id);
    const existingNames = new Set(existingItems.items.map((item) => item.fieldData.name));

    console.log(`\n📥 Existing specializations in Webflow: ${existingNames.size}\n`);

    // Add missing specializations
    let addedCount = 0;
    let skippedCount = 0;

    for (const spec of specializationsList) {
      if (existingNames.has(spec)) {
        console.log(`⏭️  Skipping ${spec} (already exists)`);
        skippedCount++;
        continue;
      }

      console.log(`➕ Adding ${spec}...`);

      try {
        const slug = spec
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '');

        const fieldData = {
          'name': spec,
          'slug': slug,
        };

        await client.createCollectionItem(specializationsCollection.id, fieldData, {
          isDraft: false,
        });

        console.log(`   ✅ Added successfully\n`);
        addedCount++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Total specializations: ${specializationsList.length}`);
    console.log(`  Added: ${addedCount}`);
    console.log(`  Skipped (already exist): ${skippedCount}\n`);

    if (addedCount > 0) {
      console.log('✅ Specializations synced successfully!\n');
    } else {
      console.log('ℹ️  All specializations already exist in Webflow.\n');
    }

    console.log('═'.repeat(80));
    console.log('\n📌 NEXT STEP:\n');
    console.log('Run: node scripts/updateVAsWithNewFields.js\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
