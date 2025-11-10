import React from 'react';
import { ArrowRight, Play, Calendar, Globe, Building2, Shield } from 'lucide-react';
import './VACard.css';

export default function VACard({ va }) {
  const getAvailabilityBadgeColor = (disponibilidad) => {
    switch (disponibilidad) {
      case 'Full Time':
        return 'badge-full-time';
      case 'Part Time':
        return 'badge-part-time';
      case 'Assigned':
        return 'badge-assigned';
      default:
        return 'badge-full-time';
    }
  };

  const getExperienceText = (years) => {
    if (years === null || years === undefined) return 'Trained';
    if (years < 1) return `${Math.round(years * 12)} months`;
    return `${years} years`;
  };

  return (
    <div className="va-card">
      {/* Image Section - Left side with circular image */}
      <div className="va-card-image-section">
        <div className="va-card-image-container">
          <img
            src={va.imagen || `https://api.dicebear.com/7.x/avataaars/svg?seed=${va.nombre}`}
            alt={va.nombre}
            className="va-card-image"
          />
          <span className={`va-availability-badge ${getAvailabilityBadgeColor(va.disponibilidad)}`}>
            {va.disponibilidad}
          </span>
        </div>
      </div>

      {/* Content Section - Right side */}
      <div className="va-card-content">
        <div className="va-card-header">
          <div className="va-text-content">
            <h3 className="va-card-name">{va.nombre}</h3>
            
            <div className="va-role-badge">
              {va.categorías[0] === 'Healthcare VA' ? (
                <>
                  <Building2 size={14} />
                  <span>Healthcare Virtual Assistant</span>
                </>
              ) : (
                <>
                  <Shield size={14} />
                  <span>Insurance Virtual Assistant</span>
                </>
              )}
            </div>

            <div className="va-info-row">
              <div className="va-info-item">
                <div className="va-info-label">Experience</div>
                <div className="va-info-value">
                  <Calendar size={16} />
                  {getExperienceText(va.años_experiencia)}
                </div>
              </div>
              <div className="va-info-item">
                <div className="va-info-label">Language</div>
                <div className="va-info-value">
                  <Globe size={16} />
                  {va.idiomas}
                </div>
              </div>
            </div>

            <div className="va-specialization">
              <div className="va-specialization-title">Specialization</div>
              <div className="va-tags-container">
                {va.especialización.map((spec, idx) => (
                  <span key={idx} className="va-tag">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="va-buttons-container">
          <a
            href={`/${va.slug}`}
            className="va-button va-button-primary"
          >
            View Profile
            <ArrowRight size={16} />
          </a>
          <button className="va-button va-button-secondary" title="Watch Video">
            <Play size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
