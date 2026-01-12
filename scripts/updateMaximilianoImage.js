/**
 * Update Maximiliano's image URL in Webflow CMS
 * Run with: node scripts/updateMaximilianoImage.js
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

const MAXIMILIANO_ITEM_ID = '696558d15898b33774b8e0f5';
const NEW_IMAGE_URL = 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696558c75dd9f74307a5a6e8_Maximiliano.webp';

async function main() {
  try {
    console.log('🔗 Updating Maximiliano\'s image in Webflow CMS...\n');

    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    const fieldData = {
      'image': NEW_IMAGE_URL,
    };

    console.log('🔄 Updating Maximiliano\'s image URL...\n');

    await client.updateCollectionItem(vaCollection.id, MAXIMILIANO_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Maximiliano's image updated successfully!`);
    console.log(`   Item ID: ${MAXIMILIANO_ITEM_ID}`);
    console.log(`   New Image URL: ${NEW_IMAGE_URL}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

