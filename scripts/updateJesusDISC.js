/**
 * Update Jesus's DISC Type to S+D and DISC Description
 * Run with: node scripts/updateJesusDISC.js
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

// Get DISC Type option ID from collection field
async function getDISCOptionId(collectionId, discTypeName) {
  try {
    const collection = await client.getCollection(collectionId);
    const discField = collection.fields.find(f => f.slug === 'disc-type-2');
    
    if (!discField || !discField.validations || !discField.validations.options) {
      console.warn('⚠️  DISC field not found or has no options');
      return null;
    }
    
    // Find option by name (case insensitive)
    const option = discField.validations.options.find(
      opt => opt.name.toLowerCase() === discTypeName.toLowerCase()
    );
    
    if (option) {
      return option.id;
    }
    
    console.warn(`⚠️  DISC option "${discTypeName}" not found`);
    console.log('   Available options:', discField.validations.options.map(o => o.name).join(', '));
    return null;
  } catch (error) {
    console.error('Error getting DISC option ID:', error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('🔧 Updating Jesus\'s DISC Type to S+D...\n');

    // Get sites and collection
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

    // Find Jesus
    console.log('📥 Searching for Jesus...');
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

    const jesus = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'jesus' || name.includes('jesus');
    });

    if (!jesus) {
      console.error('❌ Jesus not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 20).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Jesus: ${jesus.fieldData.name}`);
    console.log(`   Item ID: ${jesus.id}`);
    console.log(`   Slug: ${jesus.fieldData.slug || 'N/A'}\n`);

    // Get DISC Type option ID
    console.log('📋 Getting DISC Type option ID for "S+D"...');
    const discTypeName = 'S+D';
    const discTypeId = await getDISCOptionId(vaCollection.id, discTypeName);
    
    if (!discTypeId) {
      console.warn('⚠️  DISC option "S+D" not found in Webflow CMS.');
      console.log('   Attempting to update with text value "S+D" directly...');
      console.log('   Note: If this fails, you need to add "S+D" as an option in Webflow Designer first.\n');
      // We'll try to use the text directly, but this may not work for Option fields
    } else {
      console.log(`✅ DISC Type ID found: ${discTypeId} (${discTypeName})\n`);
    }

    // DISC Description for S+D
    const discDescription = 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nDominance (D) - Direct, decisive, and results-oriented. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.';

    // Prepare updates
    const updates = {
      'disc-description': discDescription
    };
    
    // Only add disc-type-2 if we have an ID, otherwise try with text
    if (discTypeId) {
      updates['disc-type-2'] = discTypeId;
    } else {
      // Try with text value (may not work for Option fields)
      updates['disc-type-2'] = 'S+D';
      console.warn('   ⚠️  Using text value "S+D" - this may fail if the field requires an option ID.\n');
    }

    console.log('📤 Updating fields:');
    console.log(`   - DISC Type: ${discTypeName} (ID: ${discTypeId})`);
    console.log(`   - DISC Description: ${discDescription.length} characters\n`);

    // Update VA item
    console.log('🔄 Updating Jesus in Webflow...\n');

    const result = await client.updateCollectionItem(vaCollection.id, jesus.id, updates, {
      isDraft: false,
    });

    console.log('✅ Jesus updated successfully!');
    console.log(`   Item ID: ${result.item?.id || result.id || jesus.id}`);
    console.log(`   Name: ${result.fieldData?.name || jesus.fieldData.name}`);
    console.log(`   DISC Type: ${discTypeName}`);
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${jesus.fieldData.slug || 'jesus'}\n`);

    // Publish the item
    if (result.item?.id || result.id) {
      console.log('🔄 Publishing item...');
      try {
        await client.publishItems(vaCollection.id, [result.item?.id || result.id]);
        console.log('✅ Item published successfully!\n');
      } catch (publishError) {
        console.warn('⚠️  Could not publish item automatically:', publishError.message);
        console.log('   You may need to publish it manually in Webflow.\n');
      }
    }

    console.log('🎉 Jesus\'s DISC Type and Description updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main();
