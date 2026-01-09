/**
 * Automated Supabase Table Setup
 * 
 * This script attempts to create the table programmatically
 * Note: You may need to run the SQL manually in Supabase Dashboard
 * 
 * Usage: node scripts/setup-supabase-table.js
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupTable() {
  console.log('🚀 Setting up Supabase table...\n');
  console.log('='.repeat(60));
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set');
    process.exit(1);
  }
  
  // Note: Creating tables via the JS client requires service_role key
  // For security, we'll just show the SQL that needs to be run
  console.log('\n📋 SQL Script to Run in Supabase Dashboard:\n');
  console.log('─'.repeat(60));
  
  try {
    const sqlPath = join(__dirname, 'setup-supabase-table.sql');
    const sql = readFileSync(sqlPath, 'utf-8');
    console.log(sql);
  } catch (error) {
    console.log('Could not read SQL file, but you can find it at:');
    console.log('scripts/setup-supabase-table.sql');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📝 Instructions:');
  console.log('1. Go to Supabase Dashboard → SQL Editor');
  console.log('2. Click "New Query"');
  console.log('3. Paste the SQL above');
  console.log('4. Click "Run"');
  console.log('5. Verify the table was created');
  console.log('\n💡 Alternatively, you can test the connection first:');
  console.log('   node scripts/test-supabase-connection.js');
}

setupTable();

