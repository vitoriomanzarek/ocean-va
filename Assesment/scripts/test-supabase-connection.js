/**
 * Test Supabase Connection
 * 
 * Verifies that Supabase is configured correctly and the table exists
 * 
 * Usage: node scripts/test-supabase-connection.js
 */

import 'dotenv/config';
import { testSupabaseConnection, saveQuizResultToSupabase } from '../lib/supabase-leads.js';

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...\n');
  console.log('='.repeat(60));
  
  // Check environment variables
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_ANON_KEY;
  
  console.log('\n📋 Environment Variables Check:');
  console.log('─'.repeat(60));
  console.log(`SUPABASE_URL: ${hasUrl ? '✅ Set' : '❌ Missing'}`);
  if (hasUrl) {
    console.log(`   URL: ${process.env.SUPABASE_URL}`);
  }
  console.log(`SUPABASE_ANON_KEY: ${hasKey ? '✅ Set' : '❌ Missing'}`);
  if (hasKey) {
    console.log(`   Key: ${process.env.SUPABASE_ANON_KEY.substring(0, 20)}...`);
  }
  
  if (!hasUrl || !hasKey) {
    console.log('\n❌ ERROR: Missing required environment variables!');
    console.log('\nPlease set the following in your .env file:');
    if (!hasUrl) console.log('  - SUPABASE_URL');
    if (!hasKey) console.log('  - SUPABASE_ANON_KEY');
    process.exit(1);
  }
  
  // Test connection
  console.log('\n🔌 Testing Connection...');
  console.log('─'.repeat(60));
  
  const connectionOk = await testSupabaseConnection();
  
  if (!connectionOk) {
    console.log('\n❌ Connection test failed!');
    process.exit(1);
  }
  
  // Test inserting a record
  console.log('\n📝 Testing Insert Operation...');
  console.log('─'.repeat(60));
  
  const testData = {
    contact: {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phone: '(555) 123-4567',
      industry: 'insurance'
    },
    answers: { test: 'value' },
    scores: {
      operational: 7,
      intent: 10,
      urgency: 3
    },
    profile: {
      profile: 'A',
      name: 'HOT LEAD',
      priority: 1,
      action: 'immediate-sales-call'
    },
    savings: {
      currentCost: 5000,
      vaCost: 2000,
      monthlySavings: 3000,
      annualSavings: 36000
    }
  };
  
  try {
    console.log('Inserting test record...');
    const result = await saveQuizResultToSupabase(testData);
    console.log('✅ SUCCESS! Test record inserted');
    console.log(`   Record ID: ${result.id}`);
    console.log(`   Email: ${testData.contact.email}`);
    console.log('\n✅ All tests passed! Supabase is configured correctly.');
    console.log('\n💡 You can now:');
    console.log('   1. View the test record in Supabase Dashboard');
    console.log('   2. Delete it if you want (it\'s just for testing)');
    console.log('   3. Start using the API endpoint');
  } catch (error) {
    console.log('❌ ERROR: Failed to insert test record');
    console.log('\nError Details:');
    console.log('─'.repeat(60));
    console.log('Message:', error.message);
    
    if (error.message.includes('42P01')) {
      console.log('\n💡 Solution: The table "quiz_leads" does not exist.');
      console.log('   Run the SQL script in Supabase SQL Editor:');
      console.log('   scripts/setup-supabase-table.sql');
    } else if (error.message.includes('permission denied') || error.message.includes('RLS')) {
      console.log('\n💡 Solution: Check Row Level Security (RLS) policies.');
      console.log('   Make sure the "Allow anonymous inserts" policy exists.');
    } else {
      console.log('\n💡 Solution: Check the error message above for specific issues.');
      console.log('Full error:', error);
    }
    
    process.exit(1);
  }
}

// Run test
testConnection().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

