/**
 * Update Federico's Skills and Tools in Webflow CMS
 * Run with: node scripts/updateFedericoSkillsTools.js
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
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function generateToolsHTML(toolsList) {
  if (!toolsList || toolsList.length === 0) return '';

  const items = toolsList
    .map(
      (tool) =>
        `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(
          tool,
        )}</span></div>`,
    )
    .join('');

  const listClass =
    toolsList.length > 6 ? 'va-tools-list two-column' : 'va-tools-list';

  return `<div class="${listClass}">${items}</div>`;
}

function generateSkillsHTML(skillsList) {
  if (!skillsList || skillsList.length === 0) return '';

  const tags = skillsList
    .map(
      (skill) =>
        `<span class="va-skill-tag">${escapeHtml(skill)}</span>`,
    )
    .join('');

  return tags;
}

async function main() {
  try {
    console.log("🔧 Updating Federico's Skills and Tools...\n");

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
      (col) => col.slug === 'virtual-assistants',
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(
      `📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`,
    );

    // Find Federico
    console.log('📥 Searching for Federico...');
    let allVAs = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const response = await client.getCollectionItems(vaCollection.id, {
        limit,
        offset,
      });
      if (!response.items || response.items.length === 0) break;
      allVAs = allVAs.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }

    const federico = allVAs.find((va) => {
      const slug = (va.fieldData.slug || '').toLowerCase();
      const name = (va.fieldData.name || '').toLowerCase();
      return slug === 'federico' || name === 'federico';
    });

    if (!federico) {
      console.error('❌ Federico not found in Webflow CMS');
      console.log(
        'Available VAs:',
        allVAs.map((v) => v.fieldData.name).slice(0, 10).join(', '),
        '...',
      );
      process.exit(1);
    }

    console.log(`✅ Found Federico: ${federico.fieldData.name}`);
    console.log(`   Item ID: ${federico.id}`);
    console.log(`   Slug: ${federico.fieldData.slug}\n`);

    // Reduced Skills (10)
    const skills = [
      'Maintenance Coordination',
      'Vendor Management',
      'Emergency Response',
      'Work Order Management',
      'Repair Troubleshooting',
      'Renovation Projects',
      'Tenant Communication',
      'Guest Support',
      'Lease Administration',
      'Move-in Support',
    ];

    // Reduced Tools (10)
    const tools = [
      'Airbnb Dashboard',
      'Booking.com',
      'AppFolio',
      'Buildium',
      'Property Meld',
      'Propertyware',
      'QuickBooks',
      'Monday.com',
      'Canva',
      'DocuSign',
    ];

    const skillsHTML = generateSkillsHTML(skills);
    const toolsHTML = generateToolsHTML(tools);

    // Prepare updates
    const updates = {
      'skills-richtext': `<div class="va-skills-container">${skillsHTML}</div>`,
      'tools-richtext': toolsHTML,
      'skills-tags': skills.join(', '),
      'tools-tags': tools.join(', '),
    };

    console.log('📤 Updating Skills and Tools:');
    console.log(`   Skills (${skills.length}): ${skills.join(', ')}`);
    console.log(`   Tools (${tools.length}): ${tools.join(', ')}\n`);

    // Update VA item
    console.log('🔄 Updating Federico in Webflow...\n');

    await client.updateCollectionItem(vaCollection.id, federico.id, updates, {
      isDraft: false,
    });

    console.log('✅ Federico updated successfully!');
    console.log(`   Item ID: ${federico.id}`);
    console.log(`   Skills count: ${skills.length}`);
    console.log(`   Tools count: ${tools.length}\n`);

    // Publish the item
    console.log('🔄 Publishing item...');
    try {
      await client.publishItems(vaCollection.id, [federico.id]);
      console.log('✅ Item published successfully!\n');
    } catch (publishError) {
      console.warn(
        '⚠️  Could not publish item automatically:',
        publishError.message,
      );
      console.log('   You may need to publish it manually in Webflow.\n');
    }

    console.log('🎉 Update complete!');
    console.log(
      `   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${federico.fieldData.slug}\n`,
    );
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

