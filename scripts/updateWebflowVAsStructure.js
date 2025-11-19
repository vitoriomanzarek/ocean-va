/**
 * Update Webflow CMS VAs with new structure
 * - Add category-principal field
 * - Update image-url field type (manual in Webflow UI)
 * - Prepare specializations for multi-select
 * Run with: node scripts/updateWebflowVAsStructure.js
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
    console.log('🔗 Updating Webflow CMS structure...\n');

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

    console.log(`📊 Updating ${vasData.length} VAs...\n`);

    let successCount = 0;
    let failCount = 0;

    for (const va of vasData) {
      // Find corresponding Webflow VA
      const webflowVA = webflowExport.vas.find((wva) => wva.fieldData.name === va.nombre);

      if (!webflowVA) {
        console.log(`⚠️  ${va.nombre} not found in Webflow (skipping)`);
        continue;
      }

      console.log(`📤 Updating ${va.nombre}...`);

      try {
        const fieldData = {
          'name': va.nombre,
          'category-principal': va.categoría_principal,
          'title': va.categoría_principal,
          'experience-years': `${va.años_experiencia} years`,
          'languages': va.idiomas,
          'specializations': va.especialización.join(', '),
          'availability': va.disponibilidad,
          'image-url': va.imagen,
          'profile-slug': va.slug,
          'slug': va.slug.split('-')[0],
          'video-url': va.videoUrl || null,
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
    console.log(`  Total: ${successCount + failCount}\n`);

    if (failCount === 0) {
      console.log('✅ All VAs updated successfully!\n');
    } else {
      console.log('⚠️  Some VAs failed to update. Review the errors above.\n');
    }

    console.log('═'.repeat(80));
    console.log('\n📌 NEXT STEPS:\n');
    console.log('1. In Webflow CMS, change "Image URL" field type from PlainText to Image');
    console.log('2. Create a new collection "Specializations" for multi-select support');
    console.log('3. Add many-to-many relationship between VAs and Specializations\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
