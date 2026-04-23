import React, { useState, useMemo } from 'react';
import VAFilters from '../../components/OurVAs/VAFilters';
import VAGrid from '../../components/OurVAs/VAGrid';
import VAStickyCTA from '../../components/OurVAs/VAStickyCTA';
import { useVasData } from '../../hooks/useVasData';
import './OurCurrentVAs.css';

// Insurance VAs page — shows all active (non-assigned, non-inactive) VAs
export default function OurCurrentVAs() {
  const vasData = useVasData();
  const [filters, setFilters] = useState({
    availability: 'All',
    language: 'All',
    search: ''
  });

  const filteredVAs = useMemo(() => {
    return vasData
      .filter(va => va.availability !== 'Not Active')
      .filter(va => {
        if (filters.availability !== 'All' && va.availability !== filters.availability) return false;
        if (filters.language !== 'All' && va.languages !== filters.language) return false;
        if (filters.search) {
          const term = filters.search.toLowerCase();
          const text = [
            va.name, va.mainCategory, va.title,
            va.availability, va.languages, va.experience,
            ...(va.specialization || []),
            ...(va.skills || []),
          ].join(' ').toLowerCase();
          if (!text.includes(term)) return false;
        }
        return true;
      });
  }, [filters, vasData]);

  return (
    <div className="our-current-vas-page">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center text-white py-20 md:py-32"
        style={{
          backgroundImage: 'url(/images/VAs/our-va-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Virtual Assistants</h1>
          <p className="text-lg text-white/80">Meet the talent behind Ocean VA</p>
        </div>
      </section>

      {/* Filters */}
      <VAFilters filters={filters} onFilterChange={(k, v) => setFilters(p => ({ ...p, [k]: v }))} />

      {/* Count */}
      <div className="va-results-info">
        <p>Showing {filteredVAs.length} virtual assistant{filteredVAs.length !== 1 ? 's' : ''}</p>
      </div>

      <VAGrid vas={filteredVAs} isLoading={false} />
      <VAStickyCTA />
    </div>
  );
}
