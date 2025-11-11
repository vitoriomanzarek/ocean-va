#!/usr/bin/env node

/**
 * Script to update Webflow page with VA Grid component
 * Updates the /ovas-current-vas page with the new HTML component
 * 
 * Usage: node update-webflow-vas-page.js
 * 
 * Requirements:
 * - WEBFLOW_API_TOKEN environment variable set
 * - Webflow site ID
 */

const fs = require('fs');
const path = require('path');

// Configuration
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const SITE_ID = '66e9b3f71eb321a17e92218a'; // Ocean VA site ID
const PAGE_SLUG = 'ovas-current-vas';

// Validate token
if (!WEBFLOW_API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN environment variable not set');
  console.error('Set it with: export WEBFLOW_API_TOKEN="your-token-here"');
  process.exit(1);
}

// Read the HTML component
const htmlPath = path.join(__dirname, 'webflow-components', '200-our-current-vas-grid-complete.html');
if (!fs.existsSync(htmlPath)) {
  console.error(`❌ Error: HTML file not found at ${htmlPath}`);
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

/**
 * Fetch from Webflow API
 */
async function webflowFetch(endpoint, options = {}) {
  const url = `https://api.webflow.com/v2${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ API Error: ${error.message}`);
    throw error;
  }
}

/**
 * Get all pages from the site
 */
async function getPages() {
  console.log('📄 Fetching pages from Webflow...');
  try {
    const data = await webflowFetch(`/sites/${SITE_ID}/pages`);
    return data.pages || [];
  } catch (error) {
    throw new Error(`Failed to fetch pages: ${error.message}`);
  }
}

/**
 * Find page by slug
 */
async function findPageBySlug(slug) {
  const pages = await getPages();
  const page = pages.find(p => p.slug === slug);
  
  if (!page) {
    console.error(`❌ Page with slug "${slug}" not found`);
    console.log('Available pages:');
    pages.forEach(p => console.log(`  - ${p.slug} (${p.title})`));
    throw new Error(`Page not found: ${slug}`);
  }
  
  return page;
}

/**
 * Update page with HTML content
 */
async function updatePageContent(pageId, htmlContent) {
  console.log(`🔄 Updating page ${pageId}...`);
  
  try {
    // Note: Webflow API doesn't directly support updating HTML content
    // We need to use a different approach - creating/updating elements
    
    // For now, we'll log the information needed
    console.log('\n⚠️  Note: Webflow API has limitations for direct HTML updates');
    console.log('Recommended approach:');
    console.log('1. Manually add an HTML Embed element to the page');
    console.log('2. Or use Webflow Designer to add the component');
    console.log('\nHTML content ready to paste:');
    console.log('─'.repeat(80));
    console.log(htmlContent.substring(0, 500) + '...');
    console.log('─'.repeat(80));
    
    return true;
  } catch (error) {
    throw new Error(`Failed to update page: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('🚀 Webflow VA Grid Update Script');
    console.log('═'.repeat(80));
    console.log(`Site ID: ${SITE_ID}`);
    console.log(`Page Slug: ${PAGE_SLUG}`);
    console.log('═'.repeat(80));
    console.log();

    // Find the page
    console.log(`🔍 Looking for page: /${PAGE_SLUG}`);
    const page = await findPageBySlug(PAGE_SLUG);
    console.log(`✅ Found page: "${page.title}" (ID: ${page.id})`);
    console.log();

    // Update the page
    await updatePageContent(page.id, htmlContent);
    console.log();

    console.log('✅ Script completed successfully!');
    console.log();
    console.log('📋 Next steps:');
    console.log('1. Go to Webflow Designer');
    console.log('2. Open the page: https://webflow.com/dashboard/sites/66e9b3f71eb321a17e92218a');
    console.log('3. Find the page "' + page.title + '"');
    console.log('4. Add an HTML Embed element');
    console.log('5. Paste the HTML content from: webflow-components/200-our-current-vas-grid-complete.html');
    console.log('6. Publish the changes');
    console.log();

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
