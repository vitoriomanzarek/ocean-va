#!/usr/bin/env node

/**
 * Webflow API Helper - Advanced Operations
 * 
 * This script provides utilities to interact with Webflow API
 * including creating collections, items, and updating pages
 * 
 * Usage:
 * - List pages: node webflow-api-helper.js --list-pages
 * - Get page details: node webflow-api-helper.js --get-page ovas-current-vas
 * - List collections: node webflow-api-helper.js --list-collections
 * - Create collection: node webflow-api-helper.js --create-collection
 */

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const SITE_ID = '66e9b3f71eb321a17e92218a'; // Ocean VA site ID

if (!WEBFLOW_API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN environment variable not set');
  console.error('Set it with: export WEBFLOW_API_TOKEN="your-token-here"');
  process.exit(1);
}

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

  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`API Error: ${response.status}`, error);
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
}

/**
 * List all pages
 */
async function listPages() {
  console.log('📄 Fetching pages...\n');
  try {
    const data = await webflowFetch(`/sites/${SITE_ID}/pages`);
    const pages = data.pages || [];
    
    console.log(`Found ${pages.length} pages:\n`);
    pages.forEach(page => {
      console.log(`  📌 ${page.slug}`);
      console.log(`     Title: ${page.title}`);
      console.log(`     ID: ${page.id}`);
      console.log(`     URL: https://webflow.com/dashboard/sites/${SITE_ID}/pages/${page.id}`);
      console.log();
    });
    
    return pages;
  } catch (error) {
    console.error('Error fetching pages:', error.message);
    process.exit(1);
  }
}

/**
 * Get page details
 */
async function getPageDetails(slug) {
  console.log(`🔍 Getting details for page: /${slug}\n`);
  try {
    const pages = await webflowFetch(`/sites/${SITE_ID}/pages`);
    const page = pages.pages.find(p => p.slug === slug);
    
    if (!page) {
      console.error(`❌ Page not found: ${slug}`);
      return null;
    }
    
    console.log(`✅ Page found:\n`);
    console.log(`  Title: ${page.title}`);
    console.log(`  Slug: ${page.slug}`);
    console.log(`  ID: ${page.id}`);
    console.log(`  Status: ${page.status}`);
    console.log(`  Created: ${page.createdOn}`);
    console.log(`  Updated: ${page.lastUpdated}`);
    console.log(`  Published: ${page.lastPublished}`);
    console.log(`\n  Edit URL: https://webflow.com/dashboard/sites/${SITE_ID}/pages/${page.id}`);
    
    return page;
  } catch (error) {
    console.error('Error fetching page:', error.message);
    process.exit(1);
  }
}

/**
 * List all collections
 */
async function listCollections() {
  console.log('📚 Fetching collections...\n');
  try {
    const data = await webflowFetch(`/sites/${SITE_ID}/collections`);
    const collections = data.collections || [];
    
    if (collections.length === 0) {
      console.log('No collections found in this site.');
      return [];
    }
    
    console.log(`Found ${collections.length} collections:\n`);
    collections.forEach(collection => {
      console.log(`  📦 ${collection.displayName}`);
      console.log(`     Slug: ${collection.slug}`);
      console.log(`     ID: ${collection.id}`);
      console.log(`     Fields: ${collection.fields.length}`);
      console.log();
    });
    
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error.message);
    process.exit(1);
  }
}

/**
 * Get collection details
 */
async function getCollectionDetails(collectionId) {
  console.log(`🔍 Getting collection details: ${collectionId}\n`);
  try {
    const data = await webflowFetch(`/collections/${collectionId}`);
    const collection = data.collection;
    
    console.log(`✅ Collection found:\n`);
    console.log(`  Name: ${collection.displayName}`);
    console.log(`  Slug: ${collection.slug}`);
    console.log(`  ID: ${collection.id}`);
    console.log(`\n  Fields:`);
    collection.fields.forEach(field => {
      console.log(`    - ${field.displayName} (${field.type})`);
    });
    
    return collection;
  } catch (error) {
    console.error('Error fetching collection:', error.message);
    process.exit(1);
  }
}

/**
 * List collection items
 */
async function listCollectionItems(collectionId) {
  console.log(`📋 Fetching items from collection: ${collectionId}\n`);
  try {
    const data = await webflowFetch(`/collections/${collectionId}/items`);
    const items = data.items || [];
    
    console.log(`Found ${items.length} items:\n`);
    items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.fieldData.name || item.id}`);
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching items:', error.message);
    process.exit(1);
  }
}

/**
 * Main CLI
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const param = args[1];

  console.log('🌐 Webflow API Helper');
  console.log('═'.repeat(80));
  console.log();

  try {
    switch (command) {
      case '--list-pages':
        await listPages();
        break;
      
      case '--get-page':
        if (!param) {
          console.error('❌ Please provide a page slug');
          console.error('Usage: node webflow-api-helper.js --get-page ovas-current-vas');
          process.exit(1);
        }
        await getPageDetails(param);
        break;
      
      case '--list-collections':
        await listCollections();
        break;
      
      case '--get-collection':
        if (!param) {
          console.error('❌ Please provide a collection ID');
          process.exit(1);
        }
        await getCollectionDetails(param);
        break;
      
      case '--list-items':
        if (!param) {
          console.error('❌ Please provide a collection ID');
          process.exit(1);
        }
        await listCollectionItems(param);
        break;
      
      default:
        console.log('Available commands:\n');
        console.log('  --list-pages              List all pages');
        console.log('  --get-page <slug>         Get page details');
        console.log('  --list-collections        List all collections');
        console.log('  --get-collection <id>     Get collection details');
        console.log('  --list-items <id>         List collection items');
        console.log('\nExample:');
        console.log('  node webflow-api-helper.js --list-pages');
        console.log('  node webflow-api-helper.js --get-page ovas-current-vas');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
