/**
 * Update Maximiliano's summary in Webflow CMS (remove last names)
 * Run with: node scripts/updateMaximilianoName.js
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
const UPDATED_SUMMARY = 'Maximiliano is a bilingual Virtual Assistant (English–Spanish) with solid experience in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries. His ability to multitask, listen attentively, and resolve issues efficiently makes him a reliable VA for fast-paced, customer-facing teams.';

async function main() {
  try {
    console.log('🔗 Updating Maximiliano\'s summary in Webflow CMS...\n');

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
      'summary': UPDATED_SUMMARY,
    };

    console.log('🔄 Updating Maximiliano\'s summary (removing last names)...\n');

    await client.updateCollectionItem(vaCollection.id, MAXIMILIANO_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Maximiliano's summary updated successfully!`);
    console.log(`   Item ID: ${MAXIMILIANO_ITEM_ID}`);
    console.log(`   Summary now starts with: "Maximiliano is a bilingual..."\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

