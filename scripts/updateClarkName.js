/**
 * Update Clark Chua's name to just "Clark" (remove last name)
 * Run with: node scripts/updateClarkName.js
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

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  try {
    console.log('🔧 Updating Clark Chua\'s name to "Clark"...\n');

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

    // Find Clark Chua
    console.log('📥 Searching for Clark Chua...');
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

    const clark = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name.includes('clark');
    });

    if (!clark) {
      console.error('❌ Clark not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found: ${clark.fieldData.name}`);
    console.log(`   Item ID: ${clark.id}`);
    console.log(`   Current Slug: ${clark.fieldData.slug}\n`);

    // New name and slug
    const newName = 'Clark';
    const newSlug = generateSlug(newName);
    const newProfileSlug = `/virtual-assistants/${newSlug}`;

    // Check all fields that might contain the name
    console.log('📋 Checking fields that may contain the name...\n');
    
    const currentName = clark.fieldData.name || '';
    const currentSlug = clark.fieldData.slug || '';
    const currentProfileSlug = clark.fieldData['profile-slug-2'] || '';
    const currentSummary = clark.fieldData.summary || '';
    const currentEmploymentSummary = clark.fieldData['employment-summary'] || '';

    console.log('Current values:');
    console.log(`   Name: "${currentName}"`);
    console.log(`   Slug: "${currentSlug}"`);
    console.log(`   Profile Slug: "${currentProfileSlug}"`);
    if (currentSummary.includes('Clark Chua')) {
      console.log(`   Summary: Contains "Clark Chua"`);
    }
    if (currentEmploymentSummary.includes('Clark Chua')) {
      console.log(`   Employment Summary: Contains "Clark Chua"`);
    }
    console.log();

    // Prepare updates
    const updates = {
      name: newName,
      slug: newSlug,
      'profile-slug-2': newProfileSlug
    };

    // Update summary if it contains the full name
    if (currentSummary.includes('Clark Chua')) {
      updates.summary = currentSummary.replace(/Clark Chua/g, 'Clark');
      console.log('   ✓ Summary will be updated');
    }

    // Update employment summary if it contains the full name
    if (currentEmploymentSummary.includes('Clark Chua')) {
      updates['employment-summary'] = currentEmploymentSummary.replace(/Clark Chua/g, 'Clark');
      console.log('   ✓ Employment Summary will be updated');
    }

    console.log('\n📤 Updating fields:');
    console.log(`   - Name: "${currentName}" → "${newName}"`);
    console.log(`   - Slug: "${currentSlug}" → "${newSlug}"`);
    console.log(`   - Profile Slug: "${currentProfileSlug}" → "${newProfileSlug}"`);
    if (updates.summary) {
      console.log(`   - Summary: Updated to remove "Chua"`);
    }
    if (updates['employment-summary']) {
      console.log(`   - Employment Summary: Updated to remove "Chua"`);
    }
    console.log();

    // Update VA item
    console.log('🔄 Updating Clark in Webflow...\n');

    await client.updateCollectionItem(vaCollection.id, clark.id, updates, {
      isDraft: false,
    });

    console.log('✅ Clark updated successfully!');
    console.log(`   Item ID: ${clark.id}`);
    console.log(`   New Name: ${newName}`);
    console.log(`   New Slug: ${newSlug}`);
    console.log(`   New Profile URL: https://www.oceanvirtualassistant.com${newProfileSlug}\n`);

    // Publish the item
    console.log('🔄 Publishing item...');
    try {
      await client.publishItems(vaCollection.id, [clark.id]);
      console.log('✅ Item published successfully!\n');
    } catch (publishError) {
      console.warn('⚠️  Could not publish item automatically:', publishError.message);
      console.log('   You may need to publish it manually in Webflow.\n');
    }

    console.log('🎉 Update complete!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com${newProfileSlug}\n`);

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
