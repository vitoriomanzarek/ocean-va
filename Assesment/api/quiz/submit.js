/**
 * API Endpoint: Submit Quiz Results
 * POST /api/quiz/submit
 * 
 * Captures quiz results and saves them to Supabase (or local storage as fallback)
 */

import 'dotenv/config';
import { saveQuizResultToSupabase } from '../../lib/supabase-leads.js';
import { saveQuizResultToLocal } from '../../lib/webflow-leads.js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    // Validate request body
    const {
      contact,
      answers,
      scores,
      profile,
      savings
    } = req.body;

    // Basic validation
    if (!contact || !contact.email) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Contact information (including email) is required'
      });
    }

    if (!scores || !profile) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Quiz scores and profile are required'
      });
    }

    // Prepare quiz data
    const quizData = {
      contact: {
        name: contact.name || '',
        email: contact.email,
        phone: contact.phone || '',
        industry: contact.industry || ''
      },
      answers: answers || {},
      scores: {
        operational: scores.operational || 0,
        intent: scores.intent || 0,
        urgency: scores.urgency || 0
      },
      profile: {
        profile: profile.profile || 'D',
        name: profile.name || 'ICE COLD',
        priority: profile.priority || 4,
        action: profile.action || 'passive-nurture'
      },
      savings: {
        currentCost: savings?.currentCost || 0,
        vaCost: savings?.vaCost || 0,
        monthlySavings: savings?.monthlySavings || 0,
        annualSavings: savings?.annualSavings || 0
      },
      submittedAt: new Date().toISOString()
    };

    // Try to save to Supabase first
    let savedResult;
    let savedTo = 'local';
    let supabaseError = null;
    
    // Log environment variables status (without exposing values)
    const hasSupabaseUrl = !!process.env.SUPABASE_URL;
    const hasSupabaseKey = !!process.env.SUPABASE_ANON_KEY;
    
    console.log('🔍 Supabase Configuration Check:', {
      hasSupabaseUrl,
      hasSupabaseKey,
      allConfigured: hasSupabaseUrl && hasSupabaseKey
    });
    
    try {
      savedResult = await saveQuizResultToSupabase(quizData);
      savedTo = 'supabase';
      console.log('✅ Quiz results saved to Supabase successfully', {
        itemId: savedResult.id,
        email: quizData.contact.email,
        profile: quizData.profile.profile
      });
    } catch (error) {
      // If Supabase fails, save locally as fallback
      supabaseError = error;
      
      // Log detailed error information
      const isNetworkError = error.message.includes('Network') || 
                            error.message.includes('timeout') ||
                            error.message.includes('connection') ||
                            error.message.includes('ECONNREFUSED') ||
                            error.message.includes('ETIMEDOUT');
      
      if (isNetworkError) {
        console.error('❌ Network error connecting to Supabase:', {
          message: error.message,
          type: 'Network Error',
          timestamp: new Date().toISOString(),
          stack: error.stack
        });
      } else {
        console.error('⚠️  Failed to save to Supabase:', {
          message: error.message,
          type: 'Database Error',
          timestamp: new Date().toISOString(),
          stack: error.stack,
          errorDetails: error.toString()
        });
      }
      
      // Fallback to local storage
      console.log('🔄 Falling back to local storage...');
      savedResult = await saveQuizResultToLocal(quizData);
    }

    // Return success response
    const response = {
      success: true,
      message: 'Quiz results saved successfully',
      savedTo: savedTo,
      data: {
        id: savedResult.id || savedResult._id || `quiz_${Date.now()}`,
        profile: quizData.profile,
        scores: quizData.scores
      }
    };
    
    // Include warning if saved locally due to Supabase error
    if (savedTo === 'local' && supabaseError) {
      response.warning = 'Results saved locally. Supabase was unavailable.';
      if (supabaseError.message.includes('Network')) {
        response.warning += ' Network connection issue detected.';
      } else if (supabaseError.message.includes('42P01')) {
        response.warning += ' Database table does not exist. Please run the setup script.';
      }
    }
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('Error submitting quiz results:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to save quiz results'
    });
  }
}
