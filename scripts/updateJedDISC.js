/**
 * Update Jed's DISC Type to S
 * Run with: node scripts/updateJedDISC.js
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

async function getDISCOptionId(collectionId, discTypeName) {
  try {
    const collection = await client.getCollection(collectionId);
    const discField = collection.fields.find(f => f.slug === 'disc-type-2');

    if (!discField || !discField.validations || !discField.validations.options) {
      console.warn('⚠️  DISC field not found or has no options');
      return null;
    }

    const option = discField.validations.options.find(
      opt => (opt.name || '').toLowerCase() === discTypeName.toLowerCase()
    );

    if (option) return option.id;
    console.warn(`⚠️  DISC option "${discTypeName}" not found`);
    console.log('   Available:', discField.validations.options.map(o => o.name).join(', '));
    return null;
  } catch (error) {
    console.error('Error getting DISC option ID:', error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('🔧 Updating Jed\'s DISC Type to S...\n');

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

    const jed = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'jed' || name.includes('jed');
    });

    if (!jed) {
      console.error('❌ Jed not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 25).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Jed: ${jed.fieldData.name}`);
    console.log(`   Item ID: ${jed.id}\n`);

    const discTypeName = 'S';
    const discTypeId = await getDISCOptionId(vaCollection.id, discTypeName);
    if (!discTypeId) {
      console.error('❌ DISC option "S" not found. Cannot update.');
      process.exit(1);
    }
    console.log(`✅ DISC Type ID for "S": ${discTypeId}\n`);

    const updates = { 'disc-type-2': discTypeId };

    console.log('🔄 Updating Jed in Webflow...');
    const result = await client.updateCollectionItem(vaCollection.id, jed.id, updates, {
      isDraft: false,
    });

    console.log('✅ Jed updated successfully!');
    console.log(`   DISC Type: ${discTypeName}`);

    const itemId = result.item?.id || result.id || jed.id;
    console.log('🔄 Publishing item...');
    try {
      await client.publishItems(vaCollection.id, [itemId]);
      console.log('✅ Item published.\n');
    } catch (publishError) {
      console.warn('⚠️  Could not publish:', publishError.message);
    }

    console.log('🎉 Jed\'s DISC Type set to "S" successfully.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) console.error('API:', JSON.stringify(error.response, null, 2));
    process.exit(1);
  }
}

main();
