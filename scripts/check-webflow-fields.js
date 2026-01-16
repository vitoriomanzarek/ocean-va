/**
 * Script to check Webflow CMS fields and their slugs
 * Run with: node scripts/check-webflow-fields.js
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

async function main() {
  try {
    console.log('🔍 Checking Webflow CMS fields...\n');

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

    // Get collection details to see all fields (schema is included in collection response)
    const collectionDetails = await client.getCollection(vaCollection.id);
    
    console.log('📋 Collection Fields:\n');
    console.log('='.repeat(80));
    
    // Get fields from collection schema
    const fields = collectionDetails.fields || [];
    
    // Group fields by category
    const fieldsByType = {};
    
    fields.forEach(field => {
      const type = field.type || 'unknown';
      if (!fieldsByType[type]) {
        fieldsByType[type] = [];
      }
      fieldsByType[type].push(field);
    });

    // Display all fields, focusing on English-related fields
    console.log('\n🔍 All Fields (looking for English Score):\n');
    
    fields.forEach(field => {
      const name = field.displayName || field.name || 'Unknown';
      const slug = field.slug || 'no-slug';
      const type = field.type || 'unknown';
      const isEnglish = name.toLowerCase().includes('english') || 
                       slug.toLowerCase().includes('english') ||
                       slug.toLowerCase().includes('score');
      
      const marker = isEnglish ? '⭐' : '  ';
      console.log(`${marker} ${name.padEnd(40)} | Slug: ${slug.padEnd(30)} | Type: ${type}`);
    });

    // Specifically look for English Score fields
    console.log('\n\n⭐ ENGLISH-RELATED FIELDS:\n');
    console.log('='.repeat(80));
    
    const englishFields = fields.filter(field => {
      const name = (field.displayName || field.name || '').toLowerCase();
      const slug = (field.slug || '').toLowerCase();
      return name.includes('english') || 
             name.includes('score') || 
             slug.includes('english') || 
             slug.includes('score');
    });

    if (englishFields.length === 0) {
      console.log('❌ No English-related fields found');
    } else {
      englishFields.forEach(field => {
        console.log(`\n📌 Field: ${field.displayName || field.name}`);
        console.log(`   Slug: ${field.slug}`);
        console.log(`   Type: ${field.type}`);
        if (field.options) {
          console.log(`   Options: ${JSON.stringify(field.options)}`);
        }
      });
    }

    console.log('\n\n📊 Field Summary by Type:\n');
    console.log('='.repeat(80));
    Object.keys(fieldsByType).sort().forEach(type => {
      console.log(`\n${type}: ${fieldsByType[type].length} field(s)`);
      fieldsByType[type].forEach(field => {
        console.log(`  - ${field.displayName || field.name} (${field.slug})`);
      });
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

main();
