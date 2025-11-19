/**
 * Delete specific VAs from Webflow CMS
 * Run with: node scripts/deleteVAsFromWebflow.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

async function main() {
  try {
    console.log('🔗 Deleting VAs from Webflow...\n');

    // Get sites and collection ID
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

    console.log(`📍 Collection ID: ${vaCollection.id}\n`);

    // Read the webflow export file to find IDs
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    // Find Yojaira and Adrian Test
    const yojaira = webflowExport.vas.find((va) => va.fieldData.name === 'Yojaira');
    const adrianTest = webflowExport.vas.find((va) => va.fieldData.name === 'Adrian Test');

    if (!yojaira) {
      console.error('❌ Yojaira not found in Webflow');
    } else {
      console.log(`🗑️  Deleting Yojaira (ID: ${yojaira.id})...`);
      try {
        await client.deleteCollectionItem(vaCollection.id, yojaira.id);
        console.log(`✅ Yojaira deleted successfully\n`);
      } catch (error) {
        console.error(`❌ Error deleting Yojaira: ${error.message}\n`);
      }
    }

    if (!adrianTest) {
      console.error('❌ Adrian Test not found in Webflow');
    } else {
      console.log(`🗑️  Deleting Adrian Test (ID: ${adrianTest.id})...`);
      try {
        await client.deleteCollectionItem(vaCollection.id, adrianTest.id);
        console.log(`✅ Adrian Test deleted successfully\n`);
      } catch (error) {
        console.error(`❌ Error deleting Adrian Test: ${error.message}\n`);
      }
    }

    console.log('✅ Deletion complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
