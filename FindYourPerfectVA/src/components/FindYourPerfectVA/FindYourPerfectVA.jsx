/**
 * Main Component: Find Your Perfect VA
 * 
 * Manages the matching flow state and coordinates sub-components
 */

import { useState, useEffect } from 'react';
import QuestionFlow from './QuestionFlow';
import ResultsDisplay from './ResultsDisplay';
import './styles.css';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export default function FindYourPerfectVA() {
  const [state, setState] = useState('idle'); // idle, questioning, processing, results, error
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 8 });
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [previousAnswer, setPreviousAnswer] = useState(null);

  // Start matching session
  const handleStart = async () => {
    try {
      setState('processing');
      setError(null);

      const response = await fetch(`${API_BASE}/match/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error('Failed to start session');
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      setCurrentQuestion(data.question);
      setProgress(data.progress);
      setPreviousAnswer(null);
      setState('questioning');
    } catch (err) {
      setError(err.message);
      setState('error');
    }
  };

  // Handle answer submission
  const handleAnswer = async (answer) => {
    try {
      setState('processing');

      const response = await fetch(`${API_BASE}/match/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          questionId: currentQuestion.id,
          answer
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process answer');
      }

      const data = await response.json();

      if (data.readyForRecommendations) {
        // Get recommendations
        await fetchRecommendations();
      } else {
        // Continue with next question
        setCurrentQuestion(data.nextQuestion);
        setProgress(data.progress);
        setPreviousAnswer(null);
        setState('questioning');
      }
    } catch (err) {
      setError(err.message);
      setState('error');
    }
  };

  // Fetch recommendations
  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`${API_BASE}/match/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setState('results');
    } catch (err) {
      setError(err.message);
      setState('error');
    }
  };

  // Handle going back to previous question
  const handleBack = async () => {
    try {
      setState('processing');
      setError(null);

      const response = await fetch(`${API_BASE}/match/back`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error('Failed to go back');
      }

      const data = await response.json();
      setCurrentQuestion(data.question);
      setProgress(data.progress);
      setPreviousAnswer(data.previousAnswer || null);
      setState('questioning');
    } catch (err) {
      setError(err.message);
      setState('error');
    }
  };

  // Reset to start over
  const handleReset = () => {
    setState('idle');
    setSessionId(null);
    setCurrentQuestion(null);
    setProgress({ current: 0, total: 8 });
    setRecommendations([]);
    setError(null);
    setPreviousAnswer(null);
  };

  return (
    <div className="find-your-perfect-va">
      {state === 'idle' && (
        <div className="fypva-hero">
          <h1>Find Your Perfect VA</h1>
          <p>Let's find your ideal Virtual Assistant in just a few questions</p>
          <button onClick={handleStart} className="fypva-button fypva-button-primary">
            Get Started
          </button>
        </div>
      )}

      {state === 'questioning' && currentQuestion && (
        <QuestionFlow
          question={currentQuestion}
          progress={progress}
          onAnswer={handleAnswer}
          onBack={progress.current > 1 ? handleBack : null}
          previousAnswer={previousAnswer}
        />
      )}

      {state === 'processing' && (
        <div className="fypva-loading">
          <div className="fypva-spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {state === 'results' && (
        <ResultsDisplay
          recommendations={recommendations}
          onReset={handleReset}
        />
      )}

      {state === 'error' && (
        <div className="fypva-error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleReset} className="fypva-button">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

