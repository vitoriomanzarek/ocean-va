/**
 * Update Ella's tools-richtext field in Webflow CMS
 * Run with: node scripts/updateEllaTools.js
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

// Ella's tools from the image
const tools = [
  'Salesforce',
  'Veruna',
  'NowCerts',
  'EZlynx',
  'Citrix',
  'SAP',
  'DOS Programs',
  'O\'Dash',
  'Avaya',
  'Zoom'
];

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Generate tools HTML with proper formatting
function generateToolsHTML(toolsList) {
  if (!toolsList || toolsList.length === 0) return '';
  
  const items = toolsList.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  
  // Use two-column class if more than 6 tools
  const listClass = toolsList.length > 6 ? 'va-tools-list two-column' : 'va-tools-list';
  
  return `<div class="${listClass}">${items}</div>`;
}

async function main() {
  try {
    console.log('🔧 Updating Ella\'s tools-richtext field in Webflow CMS...\n');
    console.log(`📋 Tools to add (${tools.length}):`);
    tools.forEach((tool, idx) => {
      console.log(`   ${idx + 1}. ${tool}`);
    });
    console.log();

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

    // Fetch all VAs to find Ella
    console.log('📥 Searching for Ella...');
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

    // Find Ella by name (case insensitive)
    const ella = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'ella' || name.includes('ella');
    });

    if (!ella) {
      console.error('❌ Ella not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Ella: ${ella.fieldData.name}`);
    console.log(`   Item ID: ${ella.id}`);
    console.log(`   Current tools-richtext: ${ella.fieldData['tools-richtext'] ? '(has content)' : '(empty)'}\n`);

    // Generate the HTML
    const toolsHTML = generateToolsHTML(tools);
    
    console.log('📝 Generated HTML:');
    console.log(toolsHTML);
    console.log();

    // Update tools-richtext field
    const fieldData = {
      'tools-richtext': toolsHTML,
    };

    console.log('🔄 Updating Ella\'s tools-richtext field...\n');

    await client.updateCollectionItem(vaCollection.id, ella.id, fieldData, {
      isDraft: false,
    });

    console.log('✅ Ella\'s tools-richtext updated successfully!');
    console.log(`   Item ID: ${ella.id}`);
    console.log(`   Tools count: ${tools.length}`);
    console.log(`   HTML format: ${tools.length > 6 ? 'two-column' : 'single-column'}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
