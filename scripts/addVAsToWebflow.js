/**
 * Add missing VAs from vasData.js to Webflow CMS
 * Run with: node scripts/addVAsToWebflow.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { vasData } from '../src/data/vasData.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// VAs to add (the 5 missing ones)
const vasToAdd = ['Anahi', 'Yvette', 'Grace', 'AC', 'Mina'];

async function main() {
  try {
    console.log('🔗 Adding VAs to Webflow CMS...\n');

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

    // Get collection fields to understand the structure
    const collectionDetails = await client.getCollection(vaCollection.id);
    console.log(`📋 Collection Fields: ${collectionDetails.fields.length}\n`);

    // Add each VA
    let successCount = 0;
    let failCount = 0;

    for (const vaName of vasToAdd) {
      const va = vasData.find((v) => v.nombre === vaName);

      if (!va) {
        console.error(`❌ ${vaName} not found in vasData.js`);
        failCount++;
        continue;
      }

      console.log(`➕ Adding ${vaName}...`);

      try {
        const fieldData = {
          'name': va.nombre,
          'title': va.categorías[0] || 'Virtual Assistant',
          'experience-years': `${va.años_experiencia} years`,
          'languages': va.idiomas,
          'specializations': va.especialización.join(', '),
          'availability': va.disponibilidad,
          'image-url': va.imagen,
          'profile-slug': va.slug,
          'slug': va.slug.split('-')[0], // Use first part of slug as simple slug
          'video-url': va.videoUrl || null,
        };

        const result = await client.createCollectionItem(vaCollection.id, fieldData, {
          isDraft: true, // Create as draft
        });

        // Handle different response structures
        console.log(`   Response:`, JSON.stringify(result, null, 2));
        const itemId = result.item?.id || result.id || result.success;
        console.log(`   ✅ ${vaName} added successfully (ID: ${itemId})\n`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error adding ${vaName}: ${error.message}\n`);
        failCount++;
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Successfully added: ${successCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Total: ${successCount + failCount}\n`);

    if (failCount === 0) {
      console.log('✅ All VAs added successfully!\n');
    } else {
      console.log('⚠️  Some VAs failed to add. Review the errors above.\n');
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
