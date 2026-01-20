import React from 'react';
import './VAFilters.css';

export default function VAFilters({ filters, onFilterChange }) {
  const availabilityOptions = ['All', 'Full Time', 'Part Time', 'Assigned'];
  const languageOptions = ['All', 'Bilingual (EN-ES)', 'English'];

  return (
    <div className="va-filters">
      <div className="va-filters-container">
        {/* Availability filter */}
        <div className="va-filter-group">
          <label className="va-filter-label">Availability</label>
          <div className="va-filter-options">
            {availabilityOptions.map((option) => (
              <button
                key={option}
                className={`va-filter-button ${filters.availability === option ? 'active' : ''}`}
                onClick={() => onFilterChange('availability', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Language filter */}
        <div className="va-filter-group">
          <label className="va-filter-label">Language</label>
          <div className="va-filter-options">
            {languageOptions.map((option) => (
              <button
                key={option}
                className={`va-filter-button ${filters.language === option ? 'active' : ''}`}
                onClick={() => onFilterChange('language', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="va-filter-group">
          <label className="va-filter-label">Search VAs</label>
          <input
            type="text"
            className="va-search-input"
            placeholder="Search by name, specialization, category, experience..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
