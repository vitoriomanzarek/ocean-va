/**
 * Update Bernadette's video URL in Webflow CMS
 * Run with: node scripts/updateBernadetteVideo.js
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

// Bernadette's video URL
const videoUrl = 'https://youtu.be/I20XQPhenIQ';

// Bernadette's item ID from when we created her
const BERNADETTE_ITEM_ID = '694b0260096a55e446df421e';

async function main() {
  try {
    console.log('🔗 Updating Bernadette\'s video URL in Webflow CMS...\n');

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

    // Get current Bernadette item to preserve other fields
    console.log('📥 Fetching current Bernadette item...');
    const currentItem = await client.getCollectionItem(vaCollection.id, BERNADETTE_ITEM_ID);
    console.log(`✅ Found Bernadette: ${currentItem.fieldData.name}`);
    console.log(`   Current video URL: ${currentItem.fieldData.video || '(empty)'}\n`);

    // Update only the video field
    const fieldData = {
      'video': videoUrl,
    };

    console.log('🔄 Updating Bernadette\'s video URL...');
    console.log(`   New video URL: ${videoUrl}\n`);

    await client.updateCollectionItem(vaCollection.id, BERNADETTE_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Bernadette updated successfully!`);
    console.log(`   Item ID: ${BERNADETTE_ITEM_ID}`);
    console.log(`   Video URL: ${videoUrl}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

