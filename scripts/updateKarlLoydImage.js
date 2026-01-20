/**
 * Update Karl Loyd's image in Webflow CMS
 * Run with: node scripts/updateKarlLoydImage.js
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

// Karl Loyd's item ID from when we created him
const KARL_LOYD_ITEM_ID = '696ea434305edbe6e53f7358';

// New image URL
const newImageUrl = 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/696ea978f5021565c2695600_Karl.webp';

async function main() {
  try {
    console.log('🔗 Updating Karl Loyd\'s image in Webflow CMS...\n');

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

    // Get current Karl Loyd item to verify
    console.log('📥 Fetching current Karl Loyd item...');
    const currentItem = await client.getCollectionItem(vaCollection.id, KARL_LOYD_ITEM_ID);
    console.log(`✅ Found: ${currentItem.fieldData.name}`);
    console.log(`   Current image: ${currentItem.fieldData.image || '(empty)'}\n`);

    // Update only the image field
    const fieldData = {
      'image': newImageUrl,
    };

    console.log('🔄 Updating Karl Loyd\'s image...');
    console.log(`   New image URL: ${newImageUrl}\n`);

    await client.updateCollectionItem(vaCollection.id, KARL_LOYD_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Karl Loyd updated successfully!`);
    console.log(`   Item ID: ${KARL_LOYD_ITEM_ID}`);
    console.log(`   New image URL: ${newImageUrl}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
