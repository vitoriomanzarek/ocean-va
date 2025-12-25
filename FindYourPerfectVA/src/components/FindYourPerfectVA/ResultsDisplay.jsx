/**
 * Results Display Component
 * Shows VA recommendations with match scores and reasons
 */

import './styles.css';

export default function ResultsDisplay({ recommendations, onReset }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="fypva-results">
        <h2>No matches found</h2>
        <p>We couldn't find perfect matches based on your criteria. Please contact us for personalized assistance.</p>
        <button onClick={onReset} className="fypva-button">
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="fypva-results">
      <div className="fypva-results-header">
        <h1>We found your perfect matches!</h1>
        <p>Based on your needs, here are our top recommendations:</p>
      </div>

      <div className="fypva-recommendations">
        {recommendations.map((rec, index) => (
          <div key={rec.va.id} className="fypva-va-card">
            <div className="fypva-va-card-header">
              {rec.va.image && (
                <img 
                  src={rec.va.image} 
                  alt={rec.va.name}
                  className="fypva-va-image"
                />
              )}
              <div className="fypva-va-info">
                <h3>{rec.va.name}</h3>
                {rec.va.mainCategory && (
                  <p className="fypva-va-category">{rec.va.mainCategory}</p>
                )}
              </div>
              <div className="fypva-match-score">
                <div className="fypva-score-value">{rec.matchScore}%</div>
                <div className="fypva-score-label">Match</div>
              </div>
            </div>

            <div className="fypva-va-card-body">
              {rec.reasons && rec.reasons.length > 0 && (
                <div className="fypva-match-reasons">
                  <h4>Why this match:</h4>
                  <ul>
                    {rec.reasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {rec.strengths && rec.strengths.length > 0 && (
                <div className="fypva-va-strengths">
                  <h4>Key Strengths:</h4>
                  <div className="fypva-strengths-tags">
                    {rec.strengths.map((strength, i) => (
                      <span key={i} className="fypva-tag">{strength}</span>
                    ))}
                  </div>
                </div>
              )}

              {rec.va.tagline && (
                <p className="fypva-va-tagline">{rec.va.tagline}</p>
              )}
            </div>

            <div className="fypva-va-card-actions">
              {rec.va.profileSlug && (
                <a
                  href={`/${rec.va.profileSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fypva-button fypva-button-secondary"
                >
                  View Profile
                </a>
              )}
              <button className="fypva-button fypva-button-primary">
                Schedule Call
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fypva-results-footer">
        <button onClick={onReset} className="fypva-button fypva-button-secondary">
          Start Over
        </button>
      </div>
    </div>
  );
}

