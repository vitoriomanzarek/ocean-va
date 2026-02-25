/**
 * Script to add new employment history entry to Patricio's profile
 * Adds: Influencer Marketing Manager (Mexico) | 2018 – 2020
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

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return '';
  
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = entry.description || '';
    
    // Preserve <br> tags by temporarily replacing them, then escaping, then restoring
    const brPlaceholder = '___BR_TAG___';
    description = description.replace(/<br\s*\/?>/gi, brPlaceholder);
    
    // Escape HTML
    description = escapeHtml(description);
    
    // Restore <br> tags (they should not be escaped)
    description = description.replace(new RegExp(brPlaceholder, 'g'), '<br>');
    
    // Also handle newlines if they exist
    description = description.replace(/\n/g, '<br>');
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
  }).join('');
}

// New employment entry
const newEmploymentEntry = {
  company: 'INFLUENCER MARKETING AGENCY (MEXICO)',
  position: 'Influencer Marketing Manager (Mexico)',
  period: '2018 – 2020',
  description: `• Brand Portfolio Management: I led influencer marketing strategies for a premium portfolio including Heineken, Dos Equis (XX), Amstel Light, and Miller High Life.<br>• Performance-Driven Negotiations: I managed direct outreach and negotiations with influencers and talent agencies, aligning content deliverables and usage rights with specific budget and ROI targets.<br>• Contractual Compliance & Oversight: I personally oversaw contract reviews to ensure all legal terms, exclusivity clauses, and brand guidelines were fully met before execution.<br>• On-Site Brand Activation: I accompanied selected influencers to brand events to ensure real-time fulfillment of contracted deliverables, including live stories and on-site content creation.<br>• High-Conversion Sourcing: I scaled influencer prospecting via Instagram, maintaining a 20% conversion rate by successfully converting 60 live posts from 300 monthly outreach contacts.<br>• Full-Cycle Execution: I handled the entire collaboration workflow, from initial seeding and gifting to final content approval and KPI reporting using Social Snowball, Google Sheets, and Archive.`
};

async function getVAByName(name) {
  try {
    const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';
    const response = await client.getCollectionItems(VA_COLLECTION_ID);
    
    if (response.items && Array.isArray(response.items)) {
      const va = response.items.find(item => 
        item.fieldData?.name?.toLowerCase() === name.toLowerCase()
      );
      return va;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching VA:', error);
    return null;
  }
}

async function main() {
  try {
    console.log('🚀 Updating Patricio\'s Employment History...\n');

    // Find Patricio
    const vaName = 'Patricio';
    console.log(`🔍 Searching for ${vaName}...`);
    
    const va = await getVAByName(vaName);
    
    if (!va) {
      console.error(`❌ VA "${vaName}" not found`);
      process.exit(1);
    }

    console.log(`✅ Found VA: ${va.fieldData?.name} (ID: ${va.id})`);
    console.log(`   Slug: ${va.fieldData?.slug || 'N/A'}\n`);

    // Get current employment HTML
    let currentEmploymentHTML = va.fieldData?.['employment-richtext'] || '';
    console.log(`📄 Current Employment HTML length: ${currentEmploymentHTML.length} characters\n`);

    // Check if the entry already exists
    const hasEntry = currentEmploymentHTML.includes('INFLUENCER MARKETING AGENCY (MEXICO)');
    
    if (hasEntry) {
      console.log('🔧 Found existing entry, fixing escaped <br> tags...\n');
      
      // Simply replace all escaped <br> tags with proper <br> tags
      // This will fix the entry we just added incorrectly
      currentEmploymentHTML = currentEmploymentHTML.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
      currentEmploymentHTML = currentEmploymentHTML.replace(/&lt;br&gt;/gi, '<br>');
      
      var updatedEmploymentHTML = currentEmploymentHTML;
    } else {
      // Generate HTML for new entry with correct formatting
      const newEntryHTML = generateEmploymentHTML([newEmploymentEntry]);
      
      // Append the new entry to the existing HTML
      var updatedEmploymentHTML = currentEmploymentHTML + newEntryHTML;
    }
    
    console.log('📝 New Employment Entry:');
    console.log(`   Company: ${newEmploymentEntry.company}`);
    console.log(`   Position: ${newEmploymentEntry.position}`);
    console.log(`   Period: ${newEmploymentEntry.period}`);
    console.log(`   Description length: ${newEmploymentEntry.description.length} characters\n`);

    // Update the VA item
    const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';
    
    console.log('🔄 Updating VA item in Webflow...\n');
    
    const fieldData = {
      'employment-richtext': updatedEmploymentHTML
    };

    const result = await client.updateCollectionItem(
      VA_COLLECTION_ID,
      va.id,
      fieldData,
      {
        isDraft: false // Keep published
      }
    );

    console.log('✅ Successfully updated Patricio\'s employment history!');
    console.log(`   Item ID: ${result.item?.id || result.id}`);
    console.log(`   Name: ${result.fieldData?.name || va.fieldData?.name}`);
    console.log(`   Updated Employment HTML length: ${updatedEmploymentHTML.length} characters\n`);

    // Publish the item
    if (result.item?.id || result.id) {
      console.log('🔄 Publishing item...');
      try {
        await client.publishItems(VA_COLLECTION_ID, [result.item?.id || result.id]);
        console.log('✅ Item published successfully!\n');
      } catch (publishError) {
        console.warn('⚠️  Could not publish item automatically:', publishError.message);
        console.log('   You may need to publish it manually in Webflow.\n');
      }
    }

    console.log('🎉 Patricio\'s employment history updated successfully!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${va.fieldData?.slug || 'patricio'}\n`);

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
