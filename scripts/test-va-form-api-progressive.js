/**
 * Progressive test - Add fields one by one to identify the problematic field
 */

import 'dotenv/config';

const API_ENDPOINT = 'https://ocean-va.vercel.app/api/webflow/va-submit';

// Base data that we know works
const baseData = {
  name: 'Test Progressive - ' + Date.now(),
  slug: 'test-progressive-' + Date.now(),
  summary: 'Test summary',
  tagline: 'Test tagline'
};

// Fields to test
const testFields = [
  { 'language': 'English' },
  { 'languages': 'English' },
  { 'main-category': 'Test Category' },
  { 'experience-years': '1+ years' },
  { 'availability': 'Full Time' },
  { 'video': 'https://youtu.be/test' },
  { 'thumbnail-description': 'Test description' },
  { 'skills-tags': 'Customer Service' },
  { 'tools-tags': 'Microsoft Office' },
  { 'equipment-tags': 'Laptop' },
  { 'disc-type': 'S' },
  { 'disc-description': 'Test DISC description' },
  { 'english-score': 'B2' },
  { 'english-description': 'Test English description' },
  { 'employment-richtext': '<div>Test employment</div>' },
  { 'education-richtext': '<div>Test education</div>' }
];

async function testProgressive() {
  console.log('🧪 Progressive Test - Adding fields one by one\n');
  console.log('Base data:', JSON.stringify(baseData, null, 2));
  console.log('');

  let workingData = { ...baseData };

  for (const fieldSet of testFields) {
    const fieldName = Object.keys(fieldSet)[0];
    const fieldValue = fieldSet[fieldName];
    
    console.log(`\n📝 Testing field: ${fieldName} = ${fieldValue}`);
    
    const testData = {
      ...workingData,
      ...fieldSet
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const responseText = await response.text();
      
      if (response.ok) {
        console.log(`✅ ${fieldName} - OK`);
        workingData = testData; // Keep this field
      } else {
        const error = JSON.parse(responseText);
        console.log(`❌ ${fieldName} - FAILED`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${error.message || JSON.stringify(error)}`);
        console.log(`\n🚨 PROBLEMATIC FIELD FOUND: ${fieldName}`);
        break;
      }
    } catch (error) {
      console.log(`❌ ${fieldName} - ERROR: ${error.message}`);
      console.log(`\n🚨 PROBLEMATIC FIELD FOUND: ${fieldName}`);
      break;
    }
  }

  console.log('\n\n✅ Working fields:', Object.keys(workingData).join(', '));
}

testProgressive();

