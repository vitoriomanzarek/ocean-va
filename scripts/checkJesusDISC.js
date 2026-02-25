/**
 * Check Jesus's DISC Type value in Webflow CMS
 * Run with: node scripts/checkJesusDISC.js
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
    console.log('🔍 Checking Jesus\'s DISC Type in Webflow CMS...\n');

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

    // Get collection schema to see DISC field options
    console.log('📋 Getting collection schema...');
    const collection = await client.getCollection(vaCollection.id);
    const discField = collection.fields.find(f => f.slug === 'disc-type-2');
    
    if (discField) {
      console.log(`\n✅ DISC Field found: ${discField.displayName}`);
      console.log(`   Type: ${discField.type}`);
      if (discField.validations && discField.validations.options) {
        console.log(`   Available options:`);
        discField.validations.options.forEach(opt => {
          console.log(`     - ${opt.name} (ID: ${opt.id})`);
        });
      }
    } else {
      console.log('❌ DISC field not found');
    }

    // Find Jesus
    console.log('\n📥 Searching for Jesus...');
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
      console.error('❌ Jesus not found');
      process.exit(1);
    }

    console.log(`\n✅ Found Jesus: ${jesus.fieldData.name}`);
    console.log(`   Item ID: ${jesus.id}`);
    
    // Check DISC Type value
    const discTypeValue = jesus.fieldData['disc-type-2'];
    console.log(`\n📊 DISC Type Field Value:`);
    console.log(`   Raw value: ${JSON.stringify(discTypeValue)}`);
    console.log(`   Type: ${typeof discTypeValue}`);
    
    if (discTypeValue) {
      // If it's an ID, try to find the option name
      if (typeof discTypeValue === 'string' && discField && discField.validations && discField.validations.options) {
        const option = discField.validations.options.find(opt => opt.id === discTypeValue);
        if (option) {
          console.log(`   ✅ Matched option: "${option.name}" (ID: ${discTypeValue})`);
        } else {
          console.log(`   ⚠️  Value is an ID but doesn't match any option: ${discTypeValue}`);
        }
      } else {
        console.log(`   Value: ${discTypeValue}`);
      }
    } else {
      console.log(`   ❌ Field is empty or null`);
    }
    
    // Check DISC Description
    const discDescription = jesus.fieldData['disc-description'];
    console.log(`\n📝 DISC Description:`);
    console.log(`   Value: ${discDescription ? discDescription.substring(0, 100) + '...' : '(empty)'}`);
    console.log(`   Length: ${discDescription ? discDescription.length : 0} characters`);

    console.log('\n💡 Troubleshooting:');
    if (!discTypeValue) {
      console.log('   - The disc-type-2 field is empty. You need to set it.');
    } else if (typeof discTypeValue === 'string' && discField && discField.validations && discField.validations.options) {
      const option = discField.validations.options.find(opt => opt.id === discTypeValue);
      if (!option) {
        console.log('   - The ID in the field doesn\'t match any available option.');
        console.log('   - You may need to re-select the option in Webflow Designer.');
      } else {
        console.log('   - The field has a valid value.');
        console.log('   - If it shows "N/A" on the page, check that:');
        console.log('     1. The element with ID "va-disc-type-source" is connected to "disc-type-2" in Webflow Designer');
        console.log('     2. The template is using the correct field binding');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
