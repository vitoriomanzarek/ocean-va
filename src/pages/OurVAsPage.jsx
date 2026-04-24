import React, { useState, useMemo } from 'react';
import VAGrid from '../components/OurVAs/VAGrid';
import VAStickyCTA from '../components/OurVAs/VAStickyCTA';
import { useVasData } from '../hooks/useVasData';

const CATEGORY_CONFIG = {
  insurance: {
    title: 'Insurance Virtual Assistants',
    subtitle: 'Specialists in personal lines, commercial, health, and life insurance.',
    match: va => va.mainCategory?.toLowerCase().includes('insurance'),
  },
  executive: {
    title: 'Executive & Admin Virtual Assistants',
    subtitle: 'Organized, detail-oriented VAs for executive and administrative support.',
    match: va => va.mainCategory?.toLowerCase().includes('executive'),
  },
  property: {
    title: 'Property Management Assistants',
    subtitle: 'Experienced VAs for property management and real estate operations.',
    match: va => va.mainCategory?.toLowerCase().includes('property management') || va.mainCategory?.toLowerCase().includes('real estate'),
  },
  mortgage: {
    title: 'Mortgage Processing Assistants',
    subtitle: 'Specialists in loan processing, underwriting support, and mortgage operations.',
    match: va => va.mainCategory?.toLowerCase().includes('mortgage'),
  },
  medical: {
    title: 'Healthcare Virtual Assistants',
    subtitle: 'VAs trained in healthcare administration and patient support.',
    match: va => va.mainCategory?.toLowerCase().includes('healthcare'),
  },
}

export default function OurVAsPage({ type }) {
  const vasData = useVasData();
  const config = CATEGORY_CONFIG[type] || {
    title: 'All Virtual Assistants',
    subtitle: 'Meet the full Ocean VA team.',
    match: () => true,
  };

  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('All');

  const filtered = useMemo(() => {
    return vasData
      .filter(va => va.availability !== 'Not Active')
      .filter(config.match)
      .filter(va => {
        if (availability !== 'All' && va.availability !== availability) return false;
        if (search) {
          const term = search.toLowerCase();
          const text = [va.name, va.title, va.mainCategory, va.experience, va.languages, ...(va.specialization || [])].join(' ').toLowerCase();
          if (!text.includes(term)) return false;
        }
        return true;
      });
  }, [type, search, availability, vasData]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center text-white py-20 md:py-28"
        style={{
          backgroundImage: 'url(/images/VAs/our-va-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{config.title}</h1>
          <p className="text-lg text-white/80 max-w-xl">{config.subtitle}</p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search by name, skill, category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-52 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
          />
          <select
            value={availability}
            onChange={e => setAvailability(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
          >
            <option value="All">All Availability</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
          <span className="text-sm text-gray-500">{filtered.length} VA{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8 our-current-vas-page">
        <VAGrid vas={filtered} isLoading={false} />
      </div>

      <VAStickyCTA />
    </div>
  );
}
