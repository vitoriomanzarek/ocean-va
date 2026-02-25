/**
 * Script to check Language field slugs in Webflow CMS
 * This will query the API to get the exact slugs for "Languages" and "Language" fields
 */

import 'dotenv/config';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';

async function getCollectionFields() {
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  
  if (!apiToken) {
    console.error('❌ WEBFLOW_API_TOKEN not configured');
    process.exit(1);
  }

  try {
    const response = await fetch(
      `${WEBFLOW_API_BASE}/collections/${VA_COLLECTION_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept-Version': '1.0.0',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const collection = await response.json();
    
    console.log('📋 Collection Fields:\n');
    console.log(`Collection: ${collection.displayName} (${collection.id})\n`);
    
    // Find Language-related fields
    const languageFields = collection.fields.filter(field => 
      field.displayName.toLowerCase().includes('language') ||
      field.slug.toLowerCase().includes('language')
    );

    if (languageFields.length === 0) {
      console.log('⚠️  No Language-related fields found');
    } else {
      console.log('🔍 Language-related fields found:\n');
      languageFields.forEach(field => {
        console.log(`  Field: "${field.displayName}"`);
        console.log(`  Slug: "${field.slug}"`);
        console.log(`  Type: ${field.type}`);
        console.log(`  ID: ${field.id}`);
        console.log('');
      });
    }

    // Show ALL fields to find Language (Option) field
    console.log('\n📋 ALL fields in collection (searching for Language Option):\n');
    collection.fields.forEach(field => {
      const displayName = field.displayName.toLowerCase();
      const slug = field.slug.toLowerCase();
      
      // Show language-related fields
      if (displayName.includes('language') || slug.includes('language')) {
        console.log(`  🔍 ${field.displayName} → slug: "${field.slug}" (${field.type})`);
      }
    });

    // Also search for Option fields that might be Language
    console.log('\n📋 All Option fields:\n');
    const optionFields = collection.fields.filter(f => f.type === 'Option');
    optionFields.forEach(field => {
      console.log(`  Option: "${field.displayName}" → slug: "${field.slug}"`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getCollectionFields();
