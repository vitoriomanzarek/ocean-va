import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import VAFilters from '../../components/OurVAs/VAFilters';
import VAGrid from '../../components/OurVAs/VAGrid';
import VAStickyCTA from '../../components/OurVAs/VAStickyCTA';
import { vasData } from '../../data/vasData';
import './OurCurrentVAs.css';

export default function OurCurrentVAs() {
  const [filters, setFilters] = useState({
    availability: 'All',
    language: 'All',
    search: ''
  });

  // Filter the VAs based on selected filters
  const filteredVAs = useMemo(() => {
    return vasData.filter((va) => {
      // Availability filter
      if (filters.availability !== 'All' && va.disponibilidad !== filters.availability) {
        return false;
      }

      // Language filter
      if (filters.language !== 'All' && va.idiomas !== filters.language) {
        return false;
      }

      // Search filter - search in ALL fields
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase().trim();
        
        // Build searchable text from all VA fields
        const searchableFields = [
          va.nombre || '',                           // Name
          va.categoría_principal || '',              // Main Category
          va.años_experiencia?.toString() || '',     // Experience years
          va.idiomas || '',                          // Language
          va.disponibilidad || '',                   // Availability
          va.título || '',                           // Title (if exists)
        ];
        
        // Add specializations (array or string)
        if (va.especialización) {
          if (Array.isArray(va.especialización)) {
            searchableFields.push(...va.especialización);
          } else if (typeof va.especialización === 'string') {
            searchableFields.push(va.especialización);
          }
        }
        
        // Add skills (if exists)
        if (va.habilidades) {
          if (Array.isArray(va.habilidades)) {
            searchableFields.push(...va.habilidades);
          } else if (typeof va.habilidades === 'string') {
            searchableFields.push(va.habilidades);
          }
        }
        
        // Combine all fields and search
        const searchableText = searchableFields
          .map(field => field.toLowerCase())
          .join(' ');
        
        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="our-current-vas-page">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white py-20 md:py-32"
        style={{
          backgroundImage: 'url(/images/VAs/our-va-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Insurance Virtual Assistants</h1>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <VAFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Results count */}
      <div className="va-results-info">
        <p>Showing {filteredVAs.length} virtual assistant{filteredVAs.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Grid Section */}
      <VAGrid vas={filteredVAs} isLoading={false} />

      {/* Sticky CTA */}
      <VAStickyCTA />
    </div>
  );
}
