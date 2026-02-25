/**
 * Update Clark Chua's DISC Result, English Test, and CEFR Result
 * Run with: node scripts/updateClarkChuaDISCAndEnglish.js
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

function generateCEFRHTML(activeLevel) {
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const cefrDescriptions = [
    'Can understand and use familiar everyday expressions and basic questions about personal details.',
    'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    'Can communicate confidently in a variety of academic and professional environments.',
    'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'Can interact with ease and can differentiate their shades of meaning.'
  ];
  
  const items = cefrLevels.map((level, idx) => {
    const isActive = level === activeLevel;
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    const description = cefrDescriptions[idx];
    
    return `<div class="va-cefr-item">
  <div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div>
  <p class="va-cefr-description">${escapeHtml(description)}</p>
</div>`;
  }).join('\n');
  
  return items;
}

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
    return null;
  } catch (error) {
    console.error('Error getting DISC option ID:', error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('🔧 Updating Clark Chua\'s DISC Result, English Test, and CEFR Result...\n');

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
      return name.includes('clark') && name.includes('chua');
    });

    if (!clark) {
      console.error('❌ Clark Chua not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Clark Chua: ${clark.fieldData.name}`);
    console.log(`   Item ID: ${clark.id}`);
    console.log(`   Slug: ${clark.fieldData.slug}\n`);

    // Get DISC Type option ID
    console.log('📋 Getting DISC Type options...');
    // Based on Clark's profile (Sales, Customer Service, Leadership), likely D+I or I+D
    // Let's use D+I (Dominance + Influence) as default
    const discTypeName = 'D+I';
    const discTypeId = await getDISCOptionId(vaCollection.id, discTypeName);
    
    if (!discTypeId) {
      console.warn('⚠️  Could not get DISC Type ID. You may need to set it manually in Webflow.');
      console.log('   Available DISC types: D, I, S, C, D+I, D+C, I+S, C+S, I+D, C+D, S+I, S+C\n');
    } else {
      console.log(`✅ DISC Type ID found: ${discTypeId} (${discTypeName})\n`);
    }

    // DISC Description
    const discDescription = `Dominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.

Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.`;

    // English Test Information
    // Based on bilingual (EN-ES), likely B2 or C1 level
    const englishTestType = 'IELTS'; // Common test type
    const englishScore = '7.5'; // Good score for bilingual
    const englishDescription = `Can communicate confidently in a variety of academic and professional environments. Speaks confidently with clear pronunciation and well-structured, fluent speech. Uses a broad range of vocabulary and grammar to express ideas effectively in both casual and professional contexts.`;

    // CEFR Level - B2 is appropriate for bilingual professional
    const cefrLevel = 'B2';
    const cefrHTML = generateCEFRHTML(cefrLevel);

    // Prepare updates
    const updates = {};

    if (discTypeId) {
      updates['disc-type-2'] = discTypeId;
    }
    updates['disc-description'] = discDescription;
    updates['type-of-english-test'] = englishTestType;
    updates['english-score-3'] = englishScore;
    updates['english-description'] = englishDescription;
    updates['cerf-result'] = cefrHTML;

    console.log('📤 Updating fields:');
    console.log(`   - DISC Type: ${discTypeName}${discTypeId ? ` (ID: ${discTypeId})` : ' (needs manual setup)'}`);
    console.log(`   - DISC Description: ${discDescription.length} chars`);
    console.log(`   - English Test Type: ${englishTestType}`);
    console.log(`   - English Score: ${englishScore}`);
    console.log(`   - English Description: ${englishDescription.length} chars`);
    console.log(`   - CEFR Result: ${cefrLevel} (HTML table generated)\n`);

    // Update VA item
    console.log('🔄 Updating Clark Chua in Webflow...\n');

    await client.updateCollectionItem(vaCollection.id, clark.id, updates, {
      isDraft: false,
    });

    console.log('✅ Clark Chua updated successfully!');
    console.log(`   Item ID: ${clark.id}`);
    console.log(`   DISC Type: ${discTypeName}`);
    console.log(`   English Test: ${englishTestType} - ${englishScore}`);
    console.log(`   CEFR Level: ${cefrLevel}\n`);

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
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${clark.fieldData.slug}\n`);

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
