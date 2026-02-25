/**
 * Update Jed's DISC Description (type S) in Webflow CMS
 * Run: node scripts/updateJedDiscDescription.js
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

const DISC_S_DESCRIPTION =
  'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.';

async function main() {
  try {
    console.log('🔧 Updating Jed\'s DISC Description...\n');

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

    let allVAs = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      const response = await client.getCollectionItems(vaCollection.id, { limit, offset });
      if (!response.items || response.items.length === 0) break;
      allVAs = allVAs.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }

    const jed = allVAs.find((va) => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'jed' || name.includes('jed');
    });

    if (!jed) {
      console.error('❌ Jed not found in Webflow CMS');
      process.exit(1);
    }

    console.log(`✅ Found Jed: ${jed.fieldData.name} (${jed.id})\n`);

    const updates = { 'disc-description': DISC_S_DESCRIPTION };
    await client.updateCollectionItem(vaCollection.id, jed.id, updates, { isDraft: false });
    console.log('✅ DISC Description updated.');

    await client.publishItems(vaCollection.id, [jed.id]);
    console.log('✅ Item published.\n');
    console.log('🎉 Done.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) console.error('API:', JSON.stringify(error.response, null, 2));
    process.exit(1);
  }
}

main();
