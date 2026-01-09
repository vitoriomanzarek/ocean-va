/**
 * Supabase Leads Integration
 * Saves quiz results to Supabase PostgreSQL database
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Get Supabase client
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  // Use service_role key if available (bypasses RLS, good for server-side)
  // Otherwise fall back to anon key
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    const missing = [];
    if (!supabaseUrl) missing.push('SUPABASE_URL');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_ANON_KEY) {
      missing.push('SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)');
    }
    throw new Error(`Supabase credentials not configured. Missing: ${missing.join(', ')}`);
  }

  // Create client with explicit auth configuration
  // service_role key bypasses RLS (for server-side inserts)
  // anon key uses RLS (for client-side)
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    },
    db: {
      schema: 'public'
    }
  });
}

/**
 * Save quiz result to Supabase
 * @param {Object} quizData - Complete quiz data
 * @returns {Promise<Object>} Created record from Supabase
 */
export async function saveQuizResultToSupabase(quizData) {
  const {
    contact,
    answers,
    scores,
    profile,
    savings
  } = quizData;

  // Get Supabase client
  const supabase = getSupabaseClient();

  // Log configuration status
  console.log('🔍 Supabase Configuration:', {
    hasUrl: !!process.env.SUPABASE_URL,
    hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
    url: process.env.SUPABASE_URL || 'NOT SET'
  });

  // Prepare data for Supabase (matching table schema)
  const supabaseData = {
    // Contact Info
    name: contact.name || null,
    email: contact.email,
    phone: contact.phone || null,
    industry: contact.industry || null,
    
    // Scores
    operational_score: scores.operational || 0,
    intent_score: scores.intent || 0,
    urgency_score: scores.urgency || 0,
    
    // Profile
    profile: profile.profile || 'D',
    profile_name: profile.name || 'ICE COLD',
    priority: profile.priority || 4,
    action: profile.action || 'passive-nurture',
    
    // Savings
    current_cost: savings.currentCost || 0,
    va_cost: savings.vaCost || 0,
    monthly_savings: savings.monthlySavings || 0,
    annual_savings: savings.annualSavings || 0,
    
    // Answers (as JSONB)
    answers: answers || {},
    
    // Timestamp
    submitted_at: new Date().toISOString()
  };

  try {
    console.log('📤 Inserting quiz result into Supabase:', {
      email: contact.email,
      profile: profile.profile,
      table: 'quiz_leads'
    });

    // Insert into Supabase
    const { data, error } = await supabase
      .from('quiz_leads')
      .insert([supabaseData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase Error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw new Error(`Supabase error: ${error.message} - ${error.details || ''}`);
    }

    console.log('✅ Quiz result saved to Supabase successfully:', {
      id: data.id,
      email: contact.email,
      profile: profile.profile
    });

    return {
      id: data.id,
      ...data
    };
  } catch (error) {
    // Handle network errors
    if (error.message.includes('fetch failed') || 
        error.message.includes('ECONNREFUSED') || 
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('ENOTFOUND') ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND') {
      throw new Error(`Network connection error: Unable to connect to Supabase. ${error.message}. Please check your internet connection.`);
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * Test Supabase connection
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testSupabaseConnection() {
  try {
    const supabase = getSupabaseClient();
    
    // Try a simple query to test connection
    const { data, error } = await supabase
      .from('quiz_leads')
      .select('count')
      .limit(1);

    if (error) {
      // If table doesn't exist, that's okay - we just want to test connection
      if (error.code === '42P01') {
        console.log('⚠️  Table "quiz_leads" does not exist yet. Connection to Supabase is working.');
        return true;
      }
      throw error;
    }

    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    return false;
  }
}

export default {
  saveQuizResultToSupabase,
  testSupabaseConnection
};

