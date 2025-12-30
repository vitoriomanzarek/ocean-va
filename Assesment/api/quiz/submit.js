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
    
    try {
      savedResult = await saveQuizResultToWebflow(quizData);
      savedTo = 'webflow';
    } catch (webflowError) {
      // If Webflow fails, save locally as fallback
      console.warn('Failed to save to Webflow CMS, falling back to local storage:', webflowError.message);
      savedResult = await saveQuizResultToLocal(quizData);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Quiz results saved successfully',
      savedTo: savedTo,
      data: {
        id: savedResult.id || savedResult._id || `quiz_${Date.now()}`,
        profile: quizData.profile,
        scores: quizData.scores
      }
    });

  } catch (error) {
    console.error('Error submitting quiz results:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to save quiz results'
    });
  }
}
