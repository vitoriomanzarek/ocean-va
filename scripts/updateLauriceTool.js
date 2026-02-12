/**
 * Update Laurice's tool from "Quouosh" to "QuoteRush" in tools-tags field
 * Run with: node scripts/updateLauriceTool.js
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
    console.log('🔧 Updating Laurice\'s tool from "Quoush"/"Quouosh" to "QuoteRush"...\n');

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

    // Fetch all VAs to find Laurice
    console.log('📥 Searching for Laurice...');
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

    // Find Laurice by name (case insensitive)
    const laurice = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'laurice' || name.includes('laurice');
    });

    if (!laurice) {
      console.error('❌ Laurice not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Laurice: ${laurice.fieldData.name}`);
    console.log(`   Item ID: ${laurice.id}`);
    
    // Get current tools-tags
    const currentToolsTags = laurice.fieldData['tools-tags'] || '';
    console.log(`   Current tools-tags: "${currentToolsTags}"\n`);

    // Correct list of tools (replacing Quoush with QuoteRush)
    const correctTools = [
      'QuoteRush',
      'Ezlynx',
      'InsuredMine',
      'Salesforce',
      'Microsoft 365',
      'Google Workspace',
      'Zoom Workplace'
    ];
    
    // Join with semicolon separator (matching original format)
    const updatedToolsTags = correctTools.join('; ');

    console.log(`📝 Updated tools-tags: "${updatedToolsTags}"\n`);

    // Update tools-tags field
    const fieldData = {
      'tools-tags': updatedToolsTags,
    };

    console.log('🔄 Updating Laurice\'s tools-tags field...\n');

    await client.updateCollectionItem(vaCollection.id, laurice.id, fieldData, {
      isDraft: false, // Keep published
    });

    console.log('✅ Laurice\'s tools-tags updated successfully!');
    console.log(`   Item ID: ${laurice.id}`);
    console.log(`   Old: "${currentToolsTags}"`);
    console.log(`   New: "${updatedToolsTags}"\n`);

    // Also update tools-richtext if it contains Quoush or Quouosh
    const currentToolsRichtext = laurice.fieldData['tools-richtext'] || '';
    if (currentToolsRichtext.includes('Quoush') || currentToolsRichtext.includes('quoush') ||
        currentToolsRichtext.includes('Quouosh') || currentToolsRichtext.includes('quouosh')) {
      console.log('📝 Also updating tools-richtext field...');
      let updatedToolsRichtext = currentToolsRichtext.replace(/quoush/gi, 'QuoteRush');
      updatedToolsRichtext = updatedToolsRichtext.replace(/quouosh/gi, 'QuoteRush');
      
      await client.updateCollectionItem(vaCollection.id, laurice.id, {
        'tools-richtext': updatedToolsRichtext,
      }, {
        isDraft: false,
      });
      
      console.log('✅ tools-richtext also updated!\n');
    }

    // Re-publish the item to ensure changes are live
    console.log('🔄 Publishing item...');
    await client.publishItems(vaCollection.id, [laurice.id]);
    console.log('✅ Item published successfully!\n');

    console.log('🎉 Update complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
