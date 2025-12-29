/**
 * API Endpoint: Process Answer
 * POST /api/match/answer
 * 
 * Processes user's answer and returns next question or recommendation
 */

import { generateQuestion, analyzeAnswer } from '../../../lib/gemini.js';
import { getSession, setSession } from '../../../lib/session-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, questionId, answer } = req.body;

    if (!sessionId || !answer) {
      return res.status(400).json({ error: 'Missing sessionId or answer' });
    }

    // Get session
    const session = getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Find current question in history
    const currentQuestionIndex = session.conversationHistory.findIndex(
      q => q.answer === null
    );

    if (currentQuestionIndex === -1) {
      return res.status(400).json({ error: 'No pending question found' });
    }

    // Update answer
    session.conversationHistory[currentQuestionIndex].answer = answer;
    session.conversationHistory[currentQuestionIndex].answeredAt = new Date().toISOString();

    // Analyze answer and update matching criteria
    const currentQuestion = session.conversationHistory[currentQuestionIndex].question;
    const extractedCriteria = await analyzeAnswer(
      currentQuestion,
      answer,
      session.matchingCriteria
    );

    // Merge extracted criteria with existing
    session.matchingCriteria = {
      ...session.matchingCriteria,
      ...extractedCriteria
    };

    // Check if we have enough information (5-8 questions)
    const answeredQuestions = session.conversationHistory.filter(q => q.answer !== null).length;
    
    if (answeredQuestions >= 5) {
      // We have enough info, signal that recommendations are ready
      setSession(sessionId, session);
      
      return res.status(200).json({
        sessionId,
        readyForRecommendations: true,
        matchingCriteria: session.matchingCriteria,
        progress: {
          current: answeredQuestions,
          total: 8
        }
      });
    }

    // Generate next question
    const nextQuestion = await generateQuestion(
      session.matchingCriteria,
      session.conversationHistory.filter(q => q.answer !== null).map(q => ({
        question: q.question,
        answer: q.answer
      }))
    );

    // Add next question to history
    session.conversationHistory.push({
      question: nextQuestion,
      answer: null,
      timestamp: new Date().toISOString()
    });

    setSession(sessionId, session);

    return res.status(200).json({
      sessionId,
      nextQuestion: {
        id: questionId + 1,
        text: nextQuestion,
        type: 'text',
        options: null
      },
      progress: {
        current: answeredQuestions + 1,
        total: 8
      },
      matchingCriteria: session.matchingCriteria
    });
  } catch (error) {
    console.error('Error processing answer:', error);
    return res.status(500).json({ 
      error: 'Failed to process answer',
      message: error.message 
    });
  }
}

