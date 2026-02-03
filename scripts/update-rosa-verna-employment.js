/**
 * Script to update Rosa Verna's Employment History and Summary in Webflow
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';

// Employment Summary
const employmentSummary = `Rosa Verna has over 8 years of experience in property management and customer service, with recent specialized roles at RayWhite and Song Properties as an Assistant Property Manager, where she coordinated property management tasks, prepared CMA reports, managed rental applications, and ensured compliance with Australian tenancy legislation. Her earlier experience at Goldilocks BakeShop as a Customer Service & Inventory Coordinator developed her skills in customer service, inventory management, and operations coordination.`;

// Employment History HTML
const employmentHTML = `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">RayWhite</h4><p class="va-employment-accordion-position">Assistant Property Manager</p><p class="va-employment-accordion-period">August 2024 – Sept 2025</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">• Assisted with daily property management, coordinated tasks related to listings, contracts preparation, and property documentation.<br>• Processing new renter applications from rental reference for rental providers' approval, to systematically creating and or adding the renter details in the system.<br>• Prepare Comparative Market Analysis (CMA) reports to support decision-making in property acquisition and pricing strategies.<br>• Assisted in the preparation of the Lease Agreement and other documents needed for new renters.<br>• Ensuring accurate allocation of rent payments and recording of receipts and daily reconciliation of bank transactions.<br>• Maintain an up-to-date record of rental arrears and regularly notify renters of arrears.<br>• Processing Invoices and bills for the renter and rental provider.<br>• Assisting in managing, scheduling, and overseeing all maintenance and repair activities for a property, specifically residential property.<br>• Creating templates and other correspondence for all communication needs of the office.<br>• Assisted with lease renewals, maintenance coordination, and property compliance aligned with relevant state laws and regulations.<br>• Assisting in ensuring compliance with Australian tenancy legislation across multiple states (QLD, NSW, VIC, WA,TAS).<br>• Complete and file relevant paperwork to maintain an organized and systematic work environment.<br>• Managed Statement of Account (SOA) and helped prepare Healthy Homes Standards (HHS) reports and compliance.<br>• Supported listing processes using OneAgency contracts and the Sphere of Influence (SOI) method'<br>• Ensured seamless communication between clients, agents, and internal teams to keep projects on track.</p></div></div><div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">Song Properties</h4><p class="va-employment-accordion-position">Assistant Property Manager</p><p class="va-employment-accordion-period">January 2024 – May 2025</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">• Assisted with daily property management, coordinated tasks related to listings, contracts preparation, and property documentation.<br>• Prepare Comparative Market Analysis (CMA) reports to support decision-making in property acquisition and pricing strategies.<br>• Assisted in the preparation of the Lease Agreement and other documents needed for new renters.</p></div></div><div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">Goldilocks BakeShop</h4><p class="va-employment-accordion-position">Customer Service &amp; Inventory Coordinator</p><p class="va-employment-accordion-period">August 2009 - September 2017</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">• Delivered excellent customer service during high-traffic hours, maintaining a friendly and professional atmosphere.<br>• Monitored daily inventory levels, coordinated with suppliers, and ensured timely replenishment of stock.<br>• Assisted in organizing and managing monthly stock takes, minimizing losses through accurate documentation.<br>• Collaborated with the branch manager to plan product displays and seasonal promotions.<br>• Handled cash register operations, balanced end-of-day sales reports, and ensured cash accountability.<br>• Trained new staff on store procedures, customer service standards, and safety guidelines.<br>• Demonstrated multitasking and time management in a fast paced environment, ensuring smooth store operations.</p></div></div>`;

async function webflowRequest(endpoint, method = 'GET', body = null) {
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('WEBFLOW_API_TOKEN not configured');
  }

  const url = `${WEBFLOW_API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Accept-Version': '1.0.0',
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const responseText = await response.text();

  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(responseText);
    } catch (e) {
      error = { message: responseText || response.statusText };
    }
    throw new Error(`Webflow API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  return JSON.parse(responseText);
}

async function findVAByName(name) {
  try {
    // Try to find by exact name match
    const response = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items?filter=${encodeURIComponent(JSON.stringify({ field: 'name', operator: 'equals', value: name }))}`
    );
    
    if (response.items && response.items.length > 0) {
      return response.items[0];
    }
    
    // Try partial match
    const allItems = await webflowRequest(`/collections/${VA_COLLECTION_ID}/items`);
    if (allItems.items) {
      const found = allItems.items.find(item => 
        item.fieldData?.name?.toLowerCase().includes(name.toLowerCase()) ||
        item.fieldData?.name?.toLowerCase().includes('verna')
      );
      return found;
    }
    
    return null;
  } catch (error) {
    console.error('Error finding VA:', error);
    return null;
  }
}

async function main() {
  try {
    console.log('🔍 Searching for Rosa Verna in Webflow...\n');
    
    // Try different name variations
    const nameVariations = ['Rosa Verna', 'Verna', 'rosa-verna', 'verna'];
    let va = null;
    
    for (const name of nameVariations) {
      va = await findVAByName(name);
      if (va) {
        console.log(`✅ Found VA: ${va.fieldData?.name} (ID: ${va.id})`);
        console.log(`   Slug: ${va.fieldData?.slug || 'N/A'}\n`);
        break;
      }
    }
    
    if (!va) {
      console.log('❌ VA not found. Listing all VAs to help identify...\n');
      const allItems = await webflowRequest(`/collections/${VA_COLLECTION_ID}/items`);
      console.log(`Total VAs in collection: ${allItems.items?.length || 0}\n`);
      console.log('Recent VAs (last 10):');
      allItems.items?.slice(-10).forEach(item => {
        console.log(`  - ${item.fieldData?.name} (slug: ${item.fieldData?.slug})`);
      });
      process.exit(1);
    }
    
    console.log('📤 Updating Employment Summary and Employment History...\n');
    
    const fieldData = {
      'employment-summary': employmentSummary,
      'employment-richtext': employmentHTML
    };
    
    console.log('Field Data to update:');
    console.log(`  - Employment Summary: ${employmentSummary.substring(0, 100)}...`);
    console.log(`  - Employment HTML: ${employmentHTML.length} characters\n`);
    
    const result = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items/${va.id}`,
      'PATCH',
      {
        fieldData,
        isDraft: false // Keep published
      }
    );
    
    console.log('✅ Successfully updated Rosa Verna\'s employment data!');
    console.log(`   Item ID: ${result.id}`);
    console.log(`   Name: ${result.fieldData?.name || va.fieldData?.name}`);
    console.log(`   Slug: ${result.fieldData?.slug || va.fieldData?.slug}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
