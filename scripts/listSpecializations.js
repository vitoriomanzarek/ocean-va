/**
 * List all available specializations in Webflow
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

async function main() {
  try {
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    const collectionsResponse = await client.getCollections(site.id);
    
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log('📥 Fetching specializations...\n');
    const specializationsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 });
    
    console.log(`✅ Found ${specializationsResponse.items.length} specializations:\n`);
    
    const specializations = specializationsResponse.items.map((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name'];
      return { name, id: item.id };
    }).sort((a, b) => a.name.localeCompare(b.name));

    specializations.forEach((spec, index) => {
      console.log(`${index + 1}. ${spec.name} (${spec.id})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

