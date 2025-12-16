/**
 * Update Andres item in Webflow CMS to add main-category and availability
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

const ANDRES_ITEM_ID = '69419d749b64a30b91b74eea';

async function main() {
  try {
    console.log('🔗 Updating Andres in Webflow CMS...\n');

    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Collection ID: ${vaCollection.id}`);
    console.log(`📍 Item ID: ${ANDRES_ITEM_ID}\n`);

    // Update fields
    const fieldData = {
      'main-category': 'Insurance Virtual Assistant', // PlainText field
      'availability': 'Available',
    };

    console.log('📝 Updating fields:');
    console.log(JSON.stringify(fieldData, null, 2));
    console.log('');

    const result = await client.updateCollectionItem(
      vaCollection.id,
      ANDRES_ITEM_ID,
      fieldData,
      { isDraft: false }
    );

    console.log('✅ Andres updated successfully!');
    console.log(`   Item ID: ${ANDRES_ITEM_ID}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

