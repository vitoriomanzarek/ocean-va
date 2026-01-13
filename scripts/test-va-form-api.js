/**
 * Test Script for VA Form API
 * 
 * This script tests the VA form API endpoint to verify it's working correctly.
 * 
 * Usage:
 *   node scripts/test-va-form-api.js
 * 
 * Make sure you have:
 *   1. WEBFLOW_API_TOKEN in your .env file
 *   2. The API route deployed to Vercel (or running locally)
 */

import 'dotenv/config';

// Use native fetch (Node 18+)
// Node 24 has native fetch support

const API_ENDPOINT = process.env.API_ENDPOINT || 'https://ocean-va.vercel.app/api/webflow/va-submit';
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Test data
const testVAData = {
  name: 'Test VA - ' + new Date().toISOString(),
  slug: 'test-va-' + Date.now(),
  summary: 'This is a test VA created to verify the API is working correctly. This entry can be deleted after testing.',
  tagline: 'Test Virtual Assistant',
  language: 'English',
  'main-category': 'Test Category',
  'experience-years': '1+ years',
  availability: 'Full Time',
  video: 'https://youtu.be/test',
  'thumbnail-description': 'Test thumbnail description',
  'skills-tags': 'Customer Service, Data Entry, Communication',
  'tools-tags': 'Microsoft Office, Google Workspace',
  'equipment-tags': 'Laptop, Headset',
  'disc-type': 'S',
  'disc-description': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support.',
  'english-score': 'B2',
  'english-description': 'Can communicate confidently in a variety of academic and professional environments.',
  'employment-richtext': '<div class="va-employment-entry"><h4 class="company">Test Company</h4><p class="position"><strong>Test Position</strong></p><p class="period">2024 - 2025</p></div>',
  'education-richtext': '<div class="va-education-entry"><h4 class="school">Test University</h4><p class="degree"><strong>Test Degree</strong></p><p class="year">2024</p></div>'
};

async function testAPI() {
  console.log('🧪 Testing VA Form API...\n');
  console.log('Endpoint:', API_ENDPOINT);
  console.log('API Token configured:', WEBFLOW_API_TOKEN ? '✅ Yes' : '❌ No');
  console.log('');

  if (!WEBFLOW_API_TOKEN) {
    console.error('❌ ERROR: WEBFLOW_API_TOKEN not found in environment variables');
    console.log('\nPlease add WEBFLOW_API_TOKEN to your .env file or environment variables.');
    process.exit(1);
  }

  try {
    console.log('📤 Sending test request...');
    console.log('Test data:', JSON.stringify(testVAData, null, 2));
    console.log('');

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testVAData)
    });

    const responseData = await response.json();

    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Data:', JSON.stringify(responseData, null, 2));
    console.log('');

    if (response.ok) {
      console.log('✅ SUCCESS! API is working correctly.');
      console.log('Action:', responseData.action || 'unknown');
      console.log('Message:', responseData.message || 'No message');
      
      if (responseData.item) {
        console.log('Item ID:', responseData.item.id || 'N/A');
        console.log('Item Slug:', responseData.item.fieldData?.slug || 'N/A');
      }
      
      console.log('\n💡 Next steps:');
      console.log('   1. Check Webflow CMS to verify the test VA was created');
      console.log('   2. Delete the test VA from Webflow CMS if desired');
      console.log('   3. Test the form in Webflow with real data');
    } else {
      console.log('❌ ERROR: API returned an error');
      console.log('Error:', responseData.error || 'Unknown error');
      console.log('Message:', responseData.message || 'No message');
      
      if (response.status === 401) {
        console.log('\n💡 This might be an authentication issue. Check your WEBFLOW_API_TOKEN.');
      } else if (response.status === 404) {
        console.log('\n💡 The endpoint might not be deployed. Check Vercel deployment.');
      } else if (response.status === 500) {
        console.log('\n💡 This might be a server error. Check Vercel logs.');
      }
    }

  } catch (error) {
    console.error('❌ ERROR: Failed to connect to API');
    console.error('Error:', error.message);
    console.log('');
    console.log('💡 Possible issues:');
    console.log('   1. The endpoint might not be deployed to Vercel');
    console.log('   2. The URL might be incorrect');
    console.log('   3. Network connectivity issues');
    console.log('   4. CORS issues (if testing from browser)');
  }
}

// Run the test
testAPI();

