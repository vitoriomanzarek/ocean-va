/**
 * Get Virtual Assistants collection fields structure
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
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log('📋 Getting collection structure...\n');
    const collectionDetails = await client.getCollection(vaCollection.id);

    console.log('Collection Fields:\n');
    collectionDetails.fields.forEach((field) => {
      console.log(`  - ${field.displayName || field.name}`);
      console.log(`    Slug: ${field.slug}`);
      console.log(`    Type: ${field.type}`);
      console.log(`    Required: ${field.required || false}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

