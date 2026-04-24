import React from 'react';
import { ArrowRight, Play, Calendar, Globe } from 'lucide-react';
import './VACard.css';

export default function VACard({ va }) {
  const profileUrl = va.profileSlug || `/virtual-assistants/${va.slug}`;

  return (
    <div className="va-card">
      {/* Image */}
      <div className="va-card-image-section">
        <div className="va-card-image-container">
          <img
            src={va.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${va.name}`}
            alt={va.name}
            className="va-card-image"
          />
        </div>
      </div>

      {/* Content */}
      <div className="va-card-content">
        <div className="va-card-header">
          <div className="va-text-content">
            <h3 className="va-card-name">{va.name}</h3>

            {va.title && (
              <p className="va-card-title text-xs text-gray-500 uppercase tracking-wide mb-2">
                {va.title}
              </p>
            )}

            <div className="va-info-row">
              <div className="va-info-item">
                <div className="va-info-label">Experience</div>
                <div className="va-info-value">
                  <Calendar size={16} />
                  {va.experience || '—'}
                </div>
              </div>
              <div className="va-info-item">
                <div className="va-info-label">Language</div>
                <div className="va-info-value">
                  <Globe size={16} />
                  {va.languages || '—'}
                </div>
              </div>
            </div>

            {va.specialization && va.specialization.length > 0 && (
              <div className="va-specialization">
                <div className="va-specialization-title">Specialization</div>
                <div className="va-tags-container">
                  {va.specialization.slice(0, 4).map((spec, idx) => (
                    <span key={idx} className="va-tag">{spec}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="va-buttons-container">
          <a href={profileUrl} className="va-button va-button-primary">
            View Profile
            <ArrowRight size={16} />
          </a>
          {va.video && (
            <a
              href={va.video}
              target="_blank"
              rel="noopener noreferrer"
              className="va-button va-button-secondary"
              title="Watch Video"
            >
              <Play size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
