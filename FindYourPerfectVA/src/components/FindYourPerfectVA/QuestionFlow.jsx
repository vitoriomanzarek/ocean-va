/**
 * Question Flow Component
 * Displays current question and handles answer input
 */

import { useState, useEffect } from 'react';
import './styles.css';

export default function QuestionFlow({ question, progress, onAnswer, onBack, previousAnswer }) {
  const [answer, setAnswer] = useState(previousAnswer || '');

  // Update answer when previousAnswer changes (when going back)
  useEffect(() => {
    if (previousAnswer !== undefined) {
      setAnswer(previousAnswer || '');
    }
  }, [previousAnswer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <div className="fypva-question-flow">
      <div className="fypva-progress">
        <div className="fypva-progress-bar">
          <div 
            className="fypva-progress-fill"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          ></div>
        </div>
        <p className="fypva-progress-text">
          Question {progress.current} of {progress.total}
        </p>
      </div>

      <div className="fypva-question-container">
        <h2 className="fypva-question-text">{question.text}</h2>

        <form onSubmit={handleSubmit} className="fypva-answer-form">
          <textarea
            className="fypva-answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows={4}
            required
          />

          <div className="fypva-answer-actions">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="fypva-button fypva-button-secondary"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="fypva-button fypva-button-primary"
              disabled={!answer.trim()}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

