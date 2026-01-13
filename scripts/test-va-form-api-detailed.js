/**
 * Test Script for VA Form API - Detailed Version
 * This version shows more details and tries to get the actual error from Webflow
 */

import 'dotenv/config';

const API_ENDPOINT = 'https://ocean-va.vercel.app/api/webflow/va-submit';

// Test data with minimal required fields first
const minimalTestData = {
  name: 'Test VA Minimal - ' + Date.now(),
  slug: 'test-va-minimal-' + Date.now(),
  summary: 'Test summary',
  tagline: 'Test tagline'
};

async function testAPI() {
  console.log('🧪 Testing VA Form API (Minimal Data)...\n');
  console.log('Endpoint:', API_ENDPOINT);
  console.log('Test Data:', JSON.stringify(minimalTestData, null, 2));
  console.log('');

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(minimalTestData)
    });

    const responseText = await response.text();
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    console.log('Response Text:', responseText);
    console.log('');

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Parsed Response:', JSON.stringify(responseData, null, 2));
    } catch (e) {
      console.log('Could not parse response as JSON');
    }

    if (response.ok) {
      console.log('✅ SUCCESS!');
    } else {
      console.log('❌ ERROR');
    }

  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

testAPI();

