/**
 * Add Albert Carpio to Webflow CMS
 * Run with: node scripts/addAlbertToWebflow.js
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

async function main() {
  try {
    console.log('🔗 Adding Albert Carpio to Webflow CMS...\n');

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

    // Find Albert in vasData
    const albert = vasData.find((v) => v.nombre === 'Albert John D. Carpio');

    if (!albert) {
      console.error('❌ Albert John D. Carpio not found in vasData.js');
      process.exit(1);
    }

    console.log(`➕ Adding Albert John D. Carpio...\n`);

    try {
      const fieldData = {
        'name': albert.nombre,
        'title': albert.categoría_principal || 'Insurance Virtual Assistant',
        'experience-years': `${albert.años_experiencia} years`,
        'languages': albert.idiomas,
        'specializations': albert.especialización.join('; '),
        'availability': albert.disponibilidad,
        'image-url': albert.imagen,
        'profile-slug': albert.profileSlug,
        'slug': albert.slug,
        'video-url': albert.videoUrl || '',
      };

      console.log('📋 Field Data:');
      console.log(JSON.stringify(fieldData, null, 2));
      console.log('\n');

      const result = await client.createCollectionItem(vaCollection.id, fieldData, {
        isDraft: true, // Create as draft
      });

      // Handle different response structures
      const itemId = result.item?.id || result.id || result.success;
      console.log(`✅ Albert John D. Carpio added successfully!\n`);
      console.log(`📌 Item ID: ${itemId}`);
      console.log(`📌 Status: Draft\n`);
      console.log('═'.repeat(80));
      console.log('\n✨ Next steps:');
      console.log('1. Upload image to Webflow CDN');
      console.log('2. Update image URL in Webflow CMS');
      console.log('3. Review and publish the item\n');

    } catch (error) {
      console.error(`❌ Error adding Albert: ${error.message}`);
      if (error.response) {
        console.error('Response:', JSON.stringify(error.response, null, 2));
      }
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
