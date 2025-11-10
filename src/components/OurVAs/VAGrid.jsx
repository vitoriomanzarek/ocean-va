import React from 'react';
import VACard from './VACard';
import './VAGrid.css';

export default function VAGrid({ vas, isLoading }) {
  if (isLoading) {
    return (
      <div className="va-grid-loading">
        <p>Loading virtual assistants...</p>
      </div>
    );
  }

  if (vas.length === 0) {
    return (
      <div className="va-grid-empty">
        <p>No virtual assistants found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="va-grid">
      {vas.map((va) => (
        <VACard key={va.id} va={va} />
      ))}
    </div>
  );
}
