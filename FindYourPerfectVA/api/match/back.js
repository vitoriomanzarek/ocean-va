/**
 * API Endpoint: Go Back to Previous Question
 * POST /api/match/back
 * 
 * Allows user to go back to the previous question and modify their answer
 */

import { getSession, setSession } from '../../../lib/session-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    // Get session
    const session = getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Find the last answered question
    const answeredQuestions = session.conversationHistory.filter(q => q.answer !== null);
    
    if (answeredQuestions.length === 0) {
      return res.status(400).json({ error: 'No previous question to go back to' });
    }

    // Find the index of the last answered question
    let lastAnsweredIndex = -1;
    for (let i = session.conversationHistory.length - 1; i >= 0; i--) {
      if (session.conversationHistory[i].answer !== null) {
        lastAnsweredIndex = i;
        break;
      }
    }

    if (lastAnsweredIndex === -1) {
      return res.status(400).json({ error: 'Could not find previous question' });
    }

    // Get the question that was answered
    const previousQuestion = session.conversationHistory[lastAnsweredIndex];
    
    // Remove the answer (set to null) to make it the current question again
    session.conversationHistory[lastAnsweredIndex].answer = null;
    session.conversationHistory[lastAnsweredIndex].answeredAt = undefined;

    // Remove any unanswered questions that came after this one
    session.conversationHistory = session.conversationHistory.slice(0, lastAnsweredIndex + 1);

    // Update matching criteria - we'll need to recalculate, but for now just keep what we have
    // In a more sophisticated implementation, we could remove criteria extracted from this answer

    setSession(sessionId, session);

    // Return the previous question
    return res.status(200).json({
      sessionId,
      question: {
        id: lastAnsweredIndex + 1,
        text: previousQuestion.question,
        type: 'text',
        options: null
      },
      previousAnswer: previousQuestion.answer, // Include previous answer so user can see/edit it
      progress: {
        current: answeredQuestions.length, // Current question number (before going back)
        total: 8
      }
    });
  } catch (error) {
    console.error('Error going back:', error);
    return res.status(500).json({ 
      error: 'Failed to go back to previous question',
      message: error.message 
    });
  }
}

