/**
 * Update Sheila Marie's card skills (skills-tags) to only 4 for cards
 * Note: skills-tags is used for displaying in cards, max 4 to keep cards clean
 * Run with: node scripts/updateSheilaMarieCardSkills.js
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

// Top 4 specializations for cards (max 4 to keep cards clean)
const cardSpecializations = [
  'Loan Review',
  'Underwriting Support',
  'File Auditing',
  'Quality Control'
];

// Sheila Marie's item ID
const SHEILA_MARIE_ITEM_ID = '6954416b4c4f5993f14b3c0e';

async function main() {
  try {
    console.log('🔗 Updating Sheila Marie\'s card skills (skills-tags) in Webflow CMS...\n');
    console.log('📌 Note: Only using 4 specializations for cards to keep them clean\n');

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

    // Get current Sheila Marie item
    console.log('📥 Fetching current Sheila Marie item...');
    const currentItem = await client.getCollectionItem(vaCollection.id, SHEILA_MARIE_ITEM_ID);
    console.log(`✅ Found Sheila Marie: ${currentItem.fieldData.name}\n`);

    console.log(`📋 Card Skills (skills-tags) to update (${cardSpecializations.length}):`);
    cardSpecializations.forEach(skill => {
      console.log(`   - ${skill}`);
    });
    console.log('');

    // Update only the skills-tags field (for cards display)
    const fieldData = {
      'skills-tags': cardSpecializations.join(', '),
    };

    console.log('🔄 Updating Sheila Marie\'s card skills...\n');

    await client.updateCollectionItem(vaCollection.id, SHEILA_MARIE_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Sheila Marie's card skills updated successfully!`);
    console.log(`   Updated skills-tags: ${cardSpecializations.join(', ')}`);
    console.log(`   Item ID: ${SHEILA_MARIE_ITEM_ID}\n`);
    console.log('💡 Note: The specialization field (for filtering) still has all 12 specializations.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

