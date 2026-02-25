/**
 * Script to fix Christian's Employment History
 * Cleans up unnecessary line breaks and formats correctly
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

function cleanDescription(text) {
  if (!text) return '';
  
  // Remove unnecessary line breaks and clean up spacing
  return text
    .replace(/\n+/g, ' ')  // Replace newlines with spaces
    .replace(/\s+/g, ' ')   // Replace multiple spaces with single space
    .trim();
}

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return '';
  
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = cleanDescription(entry.description || '');
    
    // Escape HTML but preserve bullet points
    description = escapeHtml(description);
    
    // Convert bullet points to proper format with line breaks
    description = description.replace(/•\s*/g, '<br>• ');
    
    // Remove leading <br> if present
    description = description.replace(/^<br>\s*/, '');
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
  }).join('');
}

// Employment entries for Christian (cleaned and formatted)
const employmentEntries = [
  {
    company: 'RKPM',
    position: 'SHORT-TERM RENTAL (VIRTUAL ASSISTANT)',
    period: '2024-2025',
    description: '• Provided specialized support for short-term rental platforms including Airbnb, VRBO, and Booking.com. • Assisted clients with onboarding, coordination, and contract-related processes. • Delivered tailored customer solutions to enhance client experience and satisfaction.'
  },
  {
    company: 'Smiles On Demand Outsourcing',
    position: 'CUSTOMER SERVICE REPRESENTATIVE',
    period: '2019-2025',
    description: '• Provided specialized support for short-term rental platforms including Airbnb, HVMI, VRBO, Booking.com, and VACASA. • Assisted clients with onboarding, coordination, and contract processes. • Delivered tailored solutions to maximize client satisfaction. • Collaborated with multiple teams to streamline operations.'
  },
  {
    company: 'Orient Living Realty Inc.',
    position: 'REAL ESTATE SALESPERSON',
    period: '2024',
    description: '• Provided real estate guidance for long- and short-term goals. • Coordinated with inspectors and lenders to meet contract conditions. • Conducted property inspections and ensured client satisfaction.'
  },
  {
    company: 'More Than Realty and Brokerage',
    position: 'REAL ESTATE SALESPERSON',
    period: '2020-2024',
    description: '• Advised clients on real estate investments and estate planning. • Coordinated inspections and loan processing for smooth closing transactions. • Assisted buyers during property viewings and negotiations.'
  },
  {
    company: 'Mactan Rural Bank',
    position: 'LOAN PROCESSOR OFFICER / BANK TELLER',
    period: '2018–2019',
    description: '• Assisted clients with loan applications and documentation. • Ensured accuracy in financial transactions and delivered customer support.'
  },
  {
    company: 'Sun Cellular',
    position: 'SALES INVENTORY OFFICER',
    period: '2017-2018',
    description: '• Promoted and sold products and services. • Managed inventory and assisted customers in product selection.'
  }
];

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
    console.log('🚀 Fixing Christian\'s Employment History...\n');

    // Find Christian
    const vaName = 'Christian';
    console.log(`🔍 Searching for ${vaName}...`);
    
    const va = await getVAByName(vaName);
    
    if (!va) {
      console.error(`❌ VA "${vaName}" not found`);
      process.exit(1);
    }

    console.log(`✅ Found VA: ${va.fieldData?.name} (ID: ${va.id})`);
    console.log(`   Slug: ${va.fieldData?.slug || 'N/A'}\n`);

    // Generate HTML for all employment entries
    const employmentHTML = generateEmploymentHTML(employmentEntries);
    
    console.log('📝 Employment Entries to Update:');
    employmentEntries.forEach((entry, index) => {
      console.log(`\n   ${index + 1}. ${entry.company}`);
      console.log(`      Position: ${entry.position}`);
      console.log(`      Period: ${entry.period}`);
      console.log(`      Description: ${entry.description.substring(0, 80)}...`);
    });
    
    console.log(`\n📄 Generated Employment HTML length: ${employmentHTML.length} characters\n`);

    // Update the VA item
    const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';
    
    console.log('🔄 Updating VA item in Webflow...\n');
    
    const fieldData = {
      'employment-richtext': employmentHTML
    };

    const result = await client.updateCollectionItem(
      VA_COLLECTION_ID,
      va.id,
      fieldData,
      {
        isDraft: false // Keep published
      }
    );

    console.log('✅ Successfully updated Christian\'s employment history!');
    console.log(`   Item ID: ${result.item?.id || result.id}`);
    console.log(`   Name: ${result.fieldData?.name || va.fieldData?.name}`);
    console.log(`   Updated Employment HTML length: ${employmentHTML.length} characters\n`);

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

    console.log('🎉 Christian\'s employment history updated successfully!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${va.fieldData?.slug || 'christian'}\n`);

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
