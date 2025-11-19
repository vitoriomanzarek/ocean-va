/**
 * Get all fields from Virtual Assistants collection
 * Run with: node scripts/getVAsCollectionFields.js
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
    console.log('🔗 Getting Virtual Assistants collection fields...\n');

    // Get sites
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    // Get collections
    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    // Get collection details
    const collectionDetails = await client.getCollection(vaCollection.id);

    console.log('═'.repeat(100));
    console.log('\n📋 ALL FIELDS IN VIRTUAL ASSISTANTS COLLECTION:\n');

    collectionDetails.fields.forEach((field, index) => {
      const required = field.required ? '🔴 REQUIRED' : '⚪ Optional';
      console.log(`${index + 1}. ${field.displayName}`);
      console.log(`   Slug: "${field.slug}"`);
      console.log(`   Type: ${field.type}`);
      console.log(`   Status: ${required}\n`);
    });

    console.log('═'.repeat(100));
    console.log('\n📝 FIELD SLUGS FOR API CALLS:\n');

    collectionDetails.fields.forEach((field) => {
      console.log(`'${field.slug}': value`);
    });

    console.log('\n═'.repeat(100));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
