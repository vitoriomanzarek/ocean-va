/**
 * Test script to verify Webflow API connection and explore collections
 * Run with: node scripts/testWebflowApi.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

// Load environment variables
dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

async function main() {
  try {
    console.log('🔗 Testing Webflow API Connection...\n');

    // Step 1: Get sites
    console.log('📍 Step 1: Fetching sites...');
    const sitesResponse = await client.getSites();
    console.log(`✅ Found ${sitesResponse.sites.length} site(s)\n`);

    const site = sitesResponse.sites[0];
    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`Site: ${site.displayName || site.name || 'Unnamed'}`);
    console.log(`Site ID: ${site.id}\n`);

    // Step 2: Get collections
    console.log('📍 Step 2: Fetching collections...');
    const collectionsResponse = await client.getCollections(site.id);
    console.log(`✅ Found ${collectionsResponse.collections.length} collection(s)\n`);

    // Find Virtual Assistants collection
    console.log('Available collections:');
    collectionsResponse.collections.forEach((col) => {
      console.log(`  - ${col.displayName || col.name} (ID: ${col.id}, Slug: ${col.slug})`);
    });
    console.log();

    // Look for the main Virtual Assistants collection (not General)
    let vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    // Fallback to any Virtual Assistants collection
    if (!vaCollection) {
      vaCollection = collectionsResponse.collections.find(
        (col) => (col.displayName || col.name || '').toLowerCase().includes('virtual assistant')
      );
    }

    if (!vaCollection) {
      console.error('\n❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`✅ Found VA Collection: ${vaCollection.displayName || vaCollection.name}`);
    console.log(`Collection ID: ${vaCollection.id}`);
    console.log(`Collection Slug: ${vaCollection.slug}\n`);

    // Step 3: Get collection details (fields)
    console.log('📍 Step 3: Fetching collection fields...');
    const collectionDetails = await client.getCollection(vaCollection.id);
    console.log(`✅ Collection has ${collectionDetails.fields.length} field(s):\n`);

    collectionDetails.fields.forEach((field) => {
      console.log(`  - ${field.displayName} (slug: ${field.slug}, type: ${field.type})`);
    });

    // Step 4: Get items in collection
    console.log('\n📍 Step 4: Fetching items in VA collection...');
    const itemsResponse = await client.getCollectionItems(vaCollection.id, { limit: 10 });
    console.log(`✅ Found ${itemsResponse.items.length} item(s)\n`);

    if (itemsResponse.items.length > 0) {
      console.log('Sample items:');
      itemsResponse.items.slice(0, 3).forEach((item) => {
        console.log(`  - ${item.fieldData.name || 'Unnamed'} (ID: ${item.id})`);
      });
    }

    // Summary
    console.log('\n✅ API Connection Successful!\n');
    console.log('📋 Summary:');
    console.log(`  Site ID: ${site.id}`);
    console.log(`  VA Collection ID: ${vaCollection.id}`);
    console.log(`  Total Items: ${itemsResponse.items.length}`);
    console.log(`  Total Fields: ${collectionDetails.fields.length}`);

    // Save config for future use
    console.log('\n💾 Save this info for your .env or config:');
    console.log(`WEBFLOW_SITE_ID=${site.id}`);
    console.log(`WEBFLOW_VA_COLLECTION_ID=${vaCollection.id}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
