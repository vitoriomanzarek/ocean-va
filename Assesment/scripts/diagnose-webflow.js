/**
 * Diagnostic script to check Webflow API configuration
 * Run this to verify that environment variables are set correctly
 */

import 'dotenv/config';
import { saveQuizResultToWebflow } from '../lib/webflow-leads.js';

async function diagnoseWebflow() {
  console.log('🔍 Webflow API Configuration Diagnostic\n');
  console.log('=' .repeat(50));
  
  // Check environment variables
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  const siteId = process.env.WEBFLOW_SITE_ID;
  const collectionId = process.env.WEBFLOW_LEADS_COLLECTION_ID;
  
  console.log('\n📋 Environment Variables Check:');
  console.log('─'.repeat(50));
  console.log(`WEBFLOW_API_TOKEN: ${apiToken ? '✅ Set (' + apiToken.substring(0, 10) + '...)' : '❌ Missing'}`);
  console.log(`WEBFLOW_SITE_ID: ${siteId ? '✅ Set (' + siteId + ')' : '❌ Missing'}`);
  console.log(`WEBFLOW_LEADS_COLLECTION_ID: ${collectionId ? '✅ Set (' + collectionId + ')' : '❌ Missing'}`);
  
  if (!apiToken || !siteId || !collectionId) {
    console.log('\n❌ ERROR: Missing required environment variables!');
    console.log('\nPlease set the following in your .env file or Vercel environment variables:');
    if (!apiToken) console.log('  - WEBFLOW_API_TOKEN');
    if (!siteId) console.log('  - WEBFLOW_SITE_ID');
    if (!collectionId) console.log('  - WEBFLOW_LEADS_COLLECTION_ID');
    process.exit(1);
  }
  
  // Test API connection with a sample request
  console.log('\n🧪 Testing Webflow API Connection:');
  console.log('─'.repeat(50));
  
  const testData = {
    contact: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '',
      industry: 'Insurance'
    },
    answers: { test: 'value' },
    scores: {
      operational: 5,
      intent: 7,
      urgency: 3
    },
    profile: {
      profile: 'B',
      name: 'WARM',
      priority: 2,
      action: 'active-nurture'
    },
    savings: {
      currentCost: 5000,
      vaCost: 2000,
      monthlySavings: 3000,
      annualSavings: 36000
    }
  };
  
  try {
    console.log('Sending test request to Webflow API...');
    const result = await saveQuizResultToWebflow(testData);
    console.log('✅ SUCCESS! Test data saved to Webflow CMS');
    console.log('Item ID:', result.id || result._id);
    console.log('\n✅ All checks passed! Webflow integration is working correctly.');
  } catch (error) {
    console.log('❌ ERROR: Failed to save test data to Webflow');
    console.log('\nError Details:');
    console.log('─'.repeat(50));
    console.log('Message:', error.message);
    
    if (error.message.includes('credentials not configured')) {
      console.log('\n💡 Solution: Make sure all environment variables are set correctly.');
    } else if (error.message.includes('Network') || error.message.includes('timeout')) {
      console.log('\n💡 Solution: Check your internet connection and Webflow API status.');
    } else if (error.message.includes('400') || error.message.includes('401') || error.message.includes('403')) {
      console.log('\n💡 Solution: Verify your API token and collection ID are correct.');
      console.log('   - API Token should be a valid Webflow API token');
      console.log('   - Collection ID should match the "Quiz Leads" collection in Webflow');
    } else if (error.message.includes('404')) {
      console.log('\n💡 Solution: Verify your Site ID and Collection ID are correct.');
      console.log('   - Site ID should match your Webflow site');
      console.log('   - Collection ID should match the "Quiz Leads" collection');
    } else {
      console.log('\n💡 Solution: Check the error message above for specific issues.');
      console.log('Full error:', error);
    }
    
    process.exit(1);
  }
}

// Run diagnostic
diagnoseWebflow().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

