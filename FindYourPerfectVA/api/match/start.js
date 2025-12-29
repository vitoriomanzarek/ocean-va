/**
 * API Endpoint: Start Matching Session
 * POST /api/match/start
 * 
 * Initializes a new matching session and returns the first question
 */

import { generateQuestion } from '../../../lib/gemini.js';
import { getVAs } from '../../../lib/webflow-sync.js';
import { createSession, setSession } from '../../../lib/session-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create new session
    const session = createSession(req.body.sessionId);
    const sessionId = session.sessionId;

    // Generate first question
    const firstQuestion = await generateQuestion(
      session.matchingCriteria,
      session.conversationHistory
    );

    // Update session
    session.conversationHistory.push({
      question: firstQuestion,
      answer: null,
      timestamp: new Date().toISOString()
    });

    setSession(sessionId, session);

    return res.status(200).json({
      sessionId,
      question: {
        id: 1,
        text: firstQuestion,
        type: 'text',
        options: null
      },
      progress: {
        current: 1,
        total: 8 // Estimated total questions
      }
    });
  } catch (error) {
    console.error('Error starting session:', error);
    return res.status(500).json({ 
      error: 'Failed to start matching session',
      message: error.message 
    });
  }
}

