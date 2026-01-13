/**
 * Test without language field to see if other fields work
 */

import 'dotenv/config';

const API_ENDPOINT = 'https://ocean-va.vercel.app/api/webflow/va-submit';

const testData = {
  name: 'Test Without Language - ' + Date.now(),
  slug: 'test-no-language-' + Date.now(),
  summary: 'Test summary',
  tagline: 'Test tagline',
  'main-category': 'Test Category',
  'experience-years': '1+ years',
  'availability': 'Full Time',
  'disc-type': 'S',
  'english-score': 'B2'
};

async function test() {
  console.log('🧪 Testing without language field\n');
  console.log('Data:', JSON.stringify(testData, null, 2));
  console.log('');

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const responseText = await response.text();
    console.log('Status:', response.status);
    
    if (response.ok) {
      console.log('✅ SUCCESS! Language field is the problem.');
      const result = JSON.parse(responseText);
      console.log('Result:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Still fails');
      console.log('Response:', responseText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();

