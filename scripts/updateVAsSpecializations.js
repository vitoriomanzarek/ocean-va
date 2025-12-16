/**
 * Update VAs to add more specializations (3-4 each)
 * Run with: node scripts/updateVAsSpecializations.js
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

// VA items to update
const vasToUpdate = {
  'Andres': {
    itemId: '69419d749b64a30b91b74eea',
    specializations: [
      'Personal Lines',
      'Personal Lines Insurance',
      'Home Insurance',
      'Auto Insurance'
    ]
  },
  'Juname': {
    itemId: '69419ee97eecfa8aad625e47',
    specializations: [
      'Loan Processing',
      'Loan Underwriting',
      'Mortgage Processing',
      'Mortgage Operations'
    ]
  },
  'Francis Aldrin': {
    itemId: '6941a0258c4a748fe6939f7e',
    specializations: [
      'Loan Processing',
      'Loan Underwriting',
      'Mortgage Processing',
      'Mortgage Operations'
    ]
  }
};

async function main() {
  try {
    console.log('🔗 Updating VAs Specializations...\n');

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

    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log('📥 Fetching specializations...');
    const specializationsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 });
    const specializationMap = {};
    specializationsResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name'];
      if (name) {
        specializationMap[name] = item.id;
      }
    });

    console.log(`✅ Found ${Object.keys(specializationMap).length} specializations\n`);

    // Update each VA
    for (const [vaName, vaData] of Object.entries(vasToUpdate)) {
      console.log(`\n📝 Updating ${vaName}...`);
      
      const specializationIds = vaData.specializations
        .map((spec) => specializationMap[spec])
        .filter((id) => id);

      console.log(`   Specializations to link: ${specializationIds.length}`);
      vaData.specializations.forEach((spec) => {
        const id = specializationMap[spec];
        console.log(`   ${spec}: ${id ? '✅' : '❌'}`);
      });

      if (specializationIds.length === 0) {
        console.log(`   ⚠️  No specializations found for ${vaName}, skipping...`);
        continue;
      }

      const fieldData = {
        'specialization': specializationIds,
      };

      try {
        await client.updateCollectionItem(
          vaCollection.id,
          vaData.itemId,
          fieldData,
          { isDraft: false }
        );

        console.log(`   ✅ ${vaName} updated successfully with ${specializationIds.length} specializations`);
      } catch (error) {
        console.error(`   ❌ Error updating ${vaName}: ${error.message}`);
      }
    }

    console.log('\n✅ All updates completed!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

