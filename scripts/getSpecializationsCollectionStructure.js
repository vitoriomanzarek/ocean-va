/**
 * Get the structure of VAs Specializations collection
 * Run with: node scripts/getSpecializationsCollectionStructure.js
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
    console.log('🔗 Getting VAs Specializations collection structure...\n');

    // Get sites
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    // Get all collections
    const collectionsResponse = await client.getCollections(site.id);
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!specializationsCollection) {
      console.error('❌ VAs Specializations collection not found');
      process.exit(1);
    }

    console.log(`📍 Collection: ${specializationsCollection.displayName || specializationsCollection.name}`);
    console.log(`📍 Collection ID: ${specializationsCollection.id}\n`);

    // Get collection details
    const collectionDetails = await client.getCollection(specializationsCollection.id);

    console.log('═'.repeat(80));
    console.log('\n📋 COLLECTION FIELDS:\n');

    collectionDetails.fields.forEach((field, index) => {
      const required = field.required ? '🔴 REQUIRED' : '⚪ Optional';
      console.log(`${index + 1}. ${field.displayName}`);
      console.log(`   Slug: ${field.slug}`);
      console.log(`   Type: ${field.type}`);
      console.log(`   Status: ${required}\n`);
    });

    console.log('═'.repeat(80));

    // Get a sample item to see the structure
    const itemsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 1 });
    
    if (itemsResponse.items && itemsResponse.items.length > 0) {
      console.log('\n📝 SAMPLE ITEM:\n');
      console.log(JSON.stringify(itemsResponse.items[0], null, 2));
    }

    console.log('\n═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
