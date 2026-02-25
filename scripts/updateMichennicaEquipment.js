/**
 * Update Michennica's Equipment in Webflow CMS
 * Run with: node scripts/updateMichennicaEquipment.js
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

// Helper functions
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function generateEquipmentHTML(equipmentList) {
  if (!equipmentList || equipmentList.length === 0) return '';
  
  const equipmentIcons = {
    'Two-Monitor Setup': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-Cancelling Headset': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
    'Two monitors': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-canceling headset': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`
  };
  
  const items = equipmentList.map(equip => {
    const icon = equipmentIcons[equip] || equipmentIcons[equip.replace(/[^a-zA-Z0-9\s-]/g, '')] || '';
    return `<div class="va-equipment-item">${icon}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
}

async function main() {
  try {
    console.log('🔧 Updating Michennica\'s Equipment...\n');

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

    // Find Michennica
    console.log('📥 Searching for Michennica...');
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

    const michennica = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name.includes('michennica');
    });

    if (!michennica) {
      console.error('❌ Michennica not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Michennica: ${michennica.fieldData.name}`);
    console.log(`   Item ID: ${michennica.id}`);
    console.log(`   Slug: ${michennica.fieldData.slug}\n`);

    // Equipment
    const equipment = [
      'Noise-canceling headset',
      'Two monitors'
    ];

    const equipmentHTML = generateEquipmentHTML(equipment);

    // Prepare updates
    const updates = {
      'equipment-richtext': equipmentHTML,
      'equipment-tags': equipment.join(', ')
    };

    console.log('📤 Updating Equipment:');
    console.log(`   Equipment: ${equipment.join(', ')}`);
    console.log(`   Equipment HTML: Generated (${equipmentHTML.length} chars)\n`);

    // Update VA item
    console.log('🔄 Updating Michennica in Webflow...\n');

    await client.updateCollectionItem(vaCollection.id, michennica.id, updates, {
      isDraft: false,
    });

    console.log('✅ Michennica updated successfully!');
    console.log(`   Item ID: ${michennica.id}`);
    console.log(`   Equipment: ${equipment.join(', ')}\n`);

    // Publish the item
    console.log('🔄 Publishing item...');
    try {
      await client.publishItems(vaCollection.id, [michennica.id]);
      console.log('✅ Item published successfully!\n');
    } catch (publishError) {
      console.warn('⚠️  Could not publish item automatically:', publishError.message);
      console.log('   You may need to publish it manually in Webflow.\n');
    }

    console.log('🎉 Update complete!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${michennica.fieldData.slug}\n`);

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
