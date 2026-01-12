/**
 * Update Andrea and Maximiliano to add BILINGUAL VA to title and update languages field
 * Run with: node scripts/updateAndreaAndMaximilianoBilingual.js
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

const ANDREA_ITEM_ID = '696555612dfbf9d11af64b06';
const MAXIMILIANO_ITEM_ID = '696558d15898b33774b8e0f5';

async function main() {
  try {
    console.log('🔗 Updating Andrea and Maximiliano for bilingual status...\n');

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

    // Update Andrea
    console.log('🔄 Updating Andrea...\n');
    const andreaFieldData = {
      'languages': 'Bilingual (EN-ES)',
      'summary': 'Andrea is a bilingual Virtual Assistant with over 7 years of experience supporting insurance, financial services, and commercial operations across multinational organizations. With a strong background in risk analysis, portfolio management, and business development, Andrea brings a highly analytical and strategic mindset to virtual support roles, excelling in client communication, proposal development, market analysis, and CRM management.',
    };

    await client.updateCollectionItem(vaCollection.id, ANDREA_ITEM_ID, andreaFieldData, {
      isDraft: false,
    });

    console.log(`✅ Andrea updated successfully!`);
    console.log(`   Item ID: ${ANDREA_ITEM_ID}`);
    console.log(`   Languages: Bilingual (EN-ES)`);
    console.log(`   Summary: Updated (removed last names)\n`);

    // Update Maximiliano
    console.log('🔄 Updating Maximiliano...\n');
    const maximilianoFieldData = {
      'languages': 'Bilingual (EN-ES)',
    };

    await client.updateCollectionItem(vaCollection.id, MAXIMILIANO_ITEM_ID, maximilianoFieldData, {
      isDraft: false,
    });

    console.log(`✅ Maximiliano updated successfully!`);
    console.log(`   Item ID: ${MAXIMILIANO_ITEM_ID}`);
    console.log(`   Languages: Bilingual (EN-ES)\n`);

    console.log('═'.repeat(80));
    console.log('\n✅ Both VAs updated successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

