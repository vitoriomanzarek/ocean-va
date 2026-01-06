/**
 * API Endpoint: Submit Quiz Results
 * POST /api/quiz/submit
 * 
 * Captures quiz results and saves them to Webflow CMS (or local storage as fallback)
 */

import 'dotenv/config';
import { saveQuizResultToWebflow, saveQuizResultToLocal } from '../../lib/webflow-leads.js';

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

    // Try to save to Webflow CMS first
    let savedResult;
    let savedTo = 'local';
    let webflowError = null;
    
    // Log environment variables status (without exposing values)
    const hasApiToken = !!process.env.WEBFLOW_API_TOKEN;
    const hasSiteId = !!process.env.WEBFLOW_SITE_ID;
    const hasCollectionId = !!process.env.WEBFLOW_LEADS_COLLECTION_ID;
    
    console.log('🔍 Webflow API Configuration Check:', {
      hasApiToken,
      hasSiteId,
      hasCollectionId,
      allConfigured: hasApiToken && hasSiteId && hasCollectionId
    });
    
    try {
      savedResult = await saveQuizResultToWebflow(quizData);
      savedTo = 'webflow';
      console.log('✅ Quiz results saved to Webflow CMS successfully', {
        itemId: savedResult.id || savedResult._id,
        email: quizData.contact.email,
        profile: quizData.profile.profile
      });
    } catch (error) {
      // If Webflow fails, save locally as fallback
      webflowError = error;
      
      // Log detailed error information
      const isNetworkError = error.message.includes('Network') || 
                            error.message.includes('timeout') ||
                            error.message.includes('connection');
      
      if (isNetworkError) {
        console.error('❌ Network error connecting to Webflow API:', {
          message: error.message,
          type: 'Network Error',
          timestamp: new Date().toISOString(),
          stack: error.stack
        });
      } else {
        console.error('⚠️  Failed to save to Webflow CMS:', {
          message: error.message,
          type: 'API Error',
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
    
    // Include warning if saved locally due to Webflow error
    if (savedTo === 'local' && webflowError) {
      response.warning = 'Results saved locally. Webflow API was unavailable.';
      if (webflowError.message.includes('Network')) {
        response.warning += ' Network connection issue detected.';
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
