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

      // Search filter
      if (filters.search && !va.nombre.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet our Virtual Assistants</h1>
            
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link 
                to="/ovas-current-vas"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-full text-sm transition-all shadow-lg hover:shadow-xl"
              >
                Insurance Virtual Assistants
              </Link>
              <Link 
                to="/executive-admin-vas"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-full text-sm transition-all shadow-lg hover:shadow-xl"
              >
                Executive / Admin VAs
              </Link>
              <Link 
                to="/ovas-mortgage-processing-assistant"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-full text-sm transition-all shadow-lg hover:shadow-xl"
              >
                Mortgage Processing Assistant
              </Link>
              <Link 
                to="/ovas-medical-assistant"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-full text-sm transition-all shadow-lg hover:shadow-xl"
              >
                Medical Assistant Specialist
              </Link>
            </div>
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
