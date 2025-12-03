import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import VAStickyCTA from '../components/OurVAs/VAStickyCTA';

const OurVAsPage = () => {
  const { type } = useParams();
  
  // Sample VA data - in a real app, this would come from an API
  const allVAs = [
    // ===== BILINGUAL ENGLISH-SPANISH VAs (Tiempo Completo) =====
    {
      id: 1,
      name: 'Alejandro',
      position: 'Bilingual Insurance Specialist',
      experience: '5+ years',
      skills: ['Bilingual Support', 'Policy Management', 'Customer Service', 'Claims Assistance'],
      image: '/img/VAs/alejandro.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Branko',
      position: 'Bilingual Customer Service Rep',
      experience: '4+ years',
      skills: ['Bilingual Support', 'Client Relations', 'Policy Information', 'Data Entry'],
      image: '/img/VAs/branko.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Dafne',
      position: 'Bilingual Insurance Agent',
      experience: '6+ years',
      skills: ['Bilingual Support', 'Policy Sales', 'Client Consultations', 'Renewals'],
      image: '/img/VAs/dafne.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Ivan',
      position: 'Bilingual Claims Specialist',
      experience: '5+ years',
      skills: ['Bilingual Support', 'Claims Processing', 'Documentation', 'Customer Service'],
      image: '/img/VAs/ivan.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 5,
      name: 'Joana',
      position: 'Bilingual Customer Support',
      experience: '3+ years',
      skills: ['Bilingual Support', 'Customer Service', 'Policy Information', 'Appointment Setting'],
      image: '/img/VAs/joana.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.6
    },
    {
      id: 6,
      name: 'Sophia Nicole',
      position: 'Bilingual Insurance Assistant',
      experience: '4+ years',
      skills: ['Bilingual Support', 'Policy Management', 'Client Communication', 'Documentation'],
      image: '/img/VAs/sophia.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 7,
      name: 'Ximena G.',
      position: 'Bilingual Insurance Coordinator',
      experience: '7+ years',
      skills: ['Bilingual Support', 'Policy Administration', 'Client Relations', 'Team Coordination'],
      image: '/img/VAs/ximena.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.9
    },

    // ===== ENGLISH-SPEAKING VAs (Tiempo Completo) =====
    {
      id: 8,
      name: 'Abigail',
      position: 'Insurance Customer Service Rep',
      experience: '4+ years',
      skills: ['Customer Support', 'Policy Information', 'Claims Assistance', 'Data Entry'],
      image: '/img/VAs/abigail.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 9,
      name: 'Adrian',
      position: 'Insurance Specialist',
      experience: '5+ years',
      skills: ['Policy Management', 'Client Consultations', 'Renewals', 'Customer Service'],
      image: '/img/VAs/adrian.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 10,
      name: 'Angelica',
      position: 'Customer Support Representative',
      experience: '3+ years',
      skills: ['Client Communication', 'Policy Information', 'Appointment Setting', 'Data Management'],
      image: '/img/VAs/angelica.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.6
    },
    {
      id: 11,
      name: 'Antonio',
      position: 'Insurance Agent',
      experience: '6+ years',
      skills: ['Policy Sales', 'Client Acquisition', 'Market Research', 'Customer Relations'],
      image: '/img/VAs/antonio.jpg',
      status: 'Available',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 12,
      name: 'Cherry Mae',
      position: 'Claims Processor',
      experience: '4+ years',
      skills: ['Claims Processing', 'Documentation', 'Customer Service', 'Data Analysis'],
      image: '/img/VAs/cherry.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 13,
      name: 'Geraldine',
      position: 'Policy Administrator',
      experience: '5+ years',
      skills: ['Policy Management', 'Documentation', 'Client Communication', 'Renewals'],
      image: '/img/VAs/geraldine.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 14,
      name: 'Jimmy',
      position: 'Insurance Sales Representative',
      experience: '7+ years',
      skills: ['Sales', 'Client Acquisition', 'Policy Presentation', 'Market Research'],
      image: '/img/VAs/jimmy.jpg',
      status: 'Available',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 15,
      name: 'Joel',
      position: 'Insurance Advisor',
      experience: '8+ years',
      skills: ['Client Consultations', 'Policy Recommendations', 'Risk Assessment', 'Customer Service'],
      image: '/img/VAs/joel.jpg',
      status: 'Available',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 5.0
    },
    {
      id: 16,
      name: 'Joji Marie',
      position: 'Customer Service Representative',
      experience: '4+ years',
      skills: ['Customer Support', 'Policy Information', 'Claims Assistance', 'Data Entry'],
      image: '/img/VAs/joji.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 17,
      name: 'Lorenz',
      position: 'Insurance Coordinator',
      experience: '5+ years',
      skills: ['Policy Administration', 'Client Communication', 'Document Management', 'Team Support'],
      image: '/img/VAs/lorenz.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 18,
      name: 'Ma. Venus',
      position: 'Senior Insurance Specialist',
      experience: '9+ years',
      skills: ['Policy Management', 'Client Relations', 'Team Leadership', 'Process Improvement'],
      image: '/img/VAs/venus.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 19,
      name: 'Naidene',
      position: 'Insurance Support Specialist',
      experience: '4+ years',
      skills: ['Customer Support', 'Policy Information', 'Claims Assistance', 'Documentation'],
      image: '/img/VAs/naidene.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 20,
      name: 'Rainier',
      position: 'Insurance Sales Agent',
      experience: '6+ years',
      skills: ['Sales', 'Client Acquisition', 'Policy Presentation', 'Customer Relations'],
      image: '/img/VAs/rainier.jpg',
      status: 'Available',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 21,
      name: 'Rochelle',
      position: 'Customer Service Manager',
      experience: '7+ years',
      skills: ['Team Leadership', 'Customer Support', 'Process Improvement', 'Training'],
      image: '/img/VAs/rochelle.jpg',
      status: 'Available',
      type: 'executive',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 22,
      name: 'Rona Mae',
      position: 'Insurance Administrator',
      experience: '5+ years',
      skills: ['Policy Administration', 'Document Management', 'Client Communication', 'Data Entry'],
      image: '/img/VAs/rona.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },

    // ===== PART TIME AVAILABILITY VAs (Tiempo Parcial) =====
    {
      id: 23,
      name: 'Carolina',
      position: 'Part-time Insurance Assistant',
      experience: '4+ years',
      skills: ['Policy Support', 'Customer Service', 'Data Entry', 'Documentation'],
      image: '/img/VAs/carolina.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Part-time',
      rating: 4.6
    },
    {
      id: 24,
      name: 'Gizelle',
      position: 'Part-time Customer Support',
      experience: '3+ years',
      skills: ['Customer Service', 'Policy Information', 'Client Communication', 'Appointment Setting'],
      image: '/img/VAs/gizelle.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Part-time',
      rating: 4.5
    },
    {
      id: 25,
      name: 'Jasmine',
      position: 'Part-time Administrative Assistant',
      experience: '4+ years',
      skills: ['Administrative Support', 'Data Entry', 'Document Management', 'Scheduling'],
      image: '/img/VAs/jasmine.jpg',
      status: 'Available',
      type: 'executive',
      languages: ['English'],
      availability: 'Part-time',
      rating: 4.6
    },
    {
      id: 26,
      name: 'Pavel',
      position: 'Part-time Insurance Specialist',
      experience: '5+ years',
      skills: ['Policy Support', 'Customer Service', 'Claims Assistance', 'Data Analysis'],
      image: '/img/VAs/pavel.jpg',
      status: 'Available',
      type: 'insurance',
      languages: ['English'],
      availability: 'Part-time',
      rating: 4.7
    },

    // ===== RECENTLY ASSIGNED TO A CLIENT VAs (Asignados) =====
    {
      id: 27,
      name: 'Ana',
      position: 'Insurance Specialist',
      experience: '5+ years',
      skills: ['Policy Management', 'Customer Service', 'Claims Support', 'Documentation'],
      image: '/img/VAs/ana1.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 28,
      name: 'Ana Victoria',
      position: 'Customer Service Representative',
      experience: '4+ years',
      skills: ['Customer Support', 'Policy Information', 'Client Communication', 'Appointment Setting'],
      image: '/img/VAs/ana_victoria.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 29,
      name: 'Balbina',
      position: 'Insurance Administrator',
      experience: '6+ years',
      skills: ['Policy Administration', 'Document Management', 'Client Support', 'Data Entry'],
      image: '/img/VAs/balbina.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 30,
      name: 'Brandon',
      position: 'Insurance Agent',
      experience: '5+ years',
      skills: ['Policy Sales', 'Client Acquisition', 'Market Research', 'Customer Relations'],
      image: '/img/VAs/brandon.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 31,
      name: 'Christine',
      position: 'Customer Service Manager',
      experience: '7+ years',
      skills: ['Team Leadership', 'Customer Support', 'Process Improvement', 'Training'],
      image: '/img/VAs/christine.jpg',
      status: 'On Assignment',
      type: 'executive',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 32,
      name: 'Dawn',
      position: 'Insurance Coordinator',
      experience: '6+ years',
      skills: ['Policy Coordination', 'Client Communication', 'Document Management', 'Team Support'],
      image: '/img/VAs/dawn.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 33,
      name: 'Dayana',
      position: 'Bilingual Insurance Specialist',
      experience: '5+ years',
      skills: ['Bilingual Support', 'Policy Management', 'Customer Service', 'Claims Assistance'],
      image: '/img/VAs/dayana.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 34,
      name: 'Ellen',
      position: 'Senior Insurance Advisor',
      experience: '10+ years',
      skills: ['Policy Consultation', 'Risk Assessment', 'Client Relations', 'Team Leadership'],
      image: '/img/VAs/ellen.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 5.0
    },
    {
      id: 35,
      name: 'Fernanda',
      position: 'Bilingual Customer Service Rep',
      experience: '4+ years',
      skills: ['Bilingual Support', 'Customer Service', 'Policy Information', 'Client Communication'],
      image: '/img/VAs/fernanda.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 36,
      name: 'Francis',
      position: 'Insurance Specialist',
      experience: '6+ years',
      skills: ['Policy Management', 'Client Support', 'Claims Processing', 'Documentation'],
      image: '/img/VAs/francis.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 37,
      name: 'Gonzalo',
      position: 'Bilingual Insurance Agent',
      experience: '7+ years',
      skills: ['Bilingual Support', 'Policy Sales', 'Client Consultations', 'Market Research'],
      image: '/img/VAs/gonzalo.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 38,
      name: 'Guillermo',
      position: 'Bilingual Insurance Specialist',
      experience: '5+ years',
      skills: ['Bilingual Support', 'Policy Management', 'Customer Service', 'Claims Assistance'],
      image: '/img/VAs/guillermo.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 39,
      name: 'Israel',
      position: 'Insurance Agent',
      experience: '6+ years',
      skills: ['Policy Sales', 'Client Acquisition', 'Market Research', 'Customer Relations'],
      image: '/img/VAs/israel.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 40,
      name: 'Janice',
      position: 'Customer Service Representative',
      experience: '4+ years',
      skills: ['Customer Support', 'Policy Information', 'Claims Assistance', 'Data Entry'],
      image: '/img/VAs/janice.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 41,
      name: 'Javier',
      position: 'Bilingual Insurance Agent',
      experience: '7+ years',
      skills: ['Bilingual Support', 'Policy Sales', 'Client Consultations', 'Renewals'],
      image: '/img/VAs/javier.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 42,
      name: 'Jill',
      position: 'Senior Insurance Specialist',
      experience: '9+ years',
      skills: ['Policy Management', 'Client Relations', 'Team Leadership', 'Process Improvement'],
      image: '/img/VAs/jill.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 43,
      name: 'Karen',
      position: 'Insurance Coordinator',
      experience: '5+ years',
      skills: ['Policy Coordination', 'Client Communication', 'Document Management', 'Team Support'],
      image: '/img/VAs/karen.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 44,
      name: 'Kevin',
      position: 'Insurance Sales Agent',
      experience: '6+ years',
      skills: ['Sales', 'Client Acquisition', 'Policy Presentation', 'Customer Relations'],
      image: '/img/VAs/kevin.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 45,
      name: 'Lois',
      position: 'Customer Service Manager',
      experience: '8+ years',
      skills: ['Team Leadership', 'Customer Support', 'Process Improvement', 'Training'],
      image: '/img/VAs/lois.jpg',
      status: 'On Assignment',
      type: 'executive',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 46,
      name: 'Maria',
      position: 'Bilingual Insurance Specialist',
      experience: '5+ years',
      skills: ['Bilingual Support', 'Policy Management', 'Customer Service', 'Claims Assistance'],
      image: '/img/VAs/maria.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 47,
      name: 'Melissa',
      position: 'Customer Service Representative',
      experience: '4+ years',
      skills: ['Customer Support', 'Policy Information', 'Claims Assistance', 'Data Entry'],
      image: '/img/VAs/melissa.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.7
    },
    {
      id: 48,
      name: 'Rafael',
      position: 'Bilingual Insurance Agent',
      experience: '7+ years',
      skills: ['Bilingual Support', 'Policy Sales', 'Client Consultations', 'Market Research'],
      image: '/img/VAs/rafael.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.9
    },
    {
      id: 49,
      name: 'Rejean',
      position: 'Insurance Specialist',
      experience: '6+ years',
      skills: ['Policy Management', 'Client Support', 'Claims Processing', 'Documentation'],
      image: '/img/VAs/rejean.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 50,
      name: 'Sandra',
      position: 'Bilingual Customer Service Rep',
      experience: '5+ years',
      skills: ['Bilingual Support', 'Customer Service', 'Policy Information', 'Client Communication'],
      image: '/img/VAs/sandra.jpg',
      status: 'On Assignment',
      type: 'insurance',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.8
    },
    {
      id: 51,
      name: 'Santiago',
      position: 'Bilingual Insurance Agent',
      experience: '7+ years',
      skills: ['Bilingual Support', 'Policy Sales', 'Client Consultations', 'Renewals'],
      image: '/img/VAs/santiago.jpg',
      status: 'On Assignment',
      type: 'licensed',
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      rating: 4.9
    }
  ];
  
  // State for filters
  const [filters, setFilters] = React.useState({
    availability: 'all',
    experience: 'all',
    languages: [],
    rating: 0
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
          ? [...prev[name], value]
          : prev[name].filter(lang => lang !== value)
        : value
    }));
  };

  // Filter VAs based on type and selected filters
  const filteredVAs = allVAs.filter(va => {
    // Filter by type if specified
    if (type && va.type !== type) return false;
    
    // Filter by availability
    if (filters.availability !== 'all' && va.availability !== filters.availability) return false;
    
    // Filter by minimum experience
    if (filters.experience !== 'all') {
      const minExp = parseInt(filters.experience);
      const vaExp = parseInt(va.experience);
      if (vaExp < minExp) return false;
    }
    
    // Filter by languages
    if (filters.languages.length > 0 && 
        !filters.languages.some(lang => va.languages.includes(lang))) {
      return false;
    }
    
    // Filter by minimum rating
    if (filters.rating > 0 && va.rating < filters.rating) return false;
    
    return true;
  });
    
  // Page title and description based on type
  const pageTitles = {
    'insurance': 'Insurance Virtual Assistants',
    'executive': 'Executive & Admin Virtual Assistants',
    'default': 'Meet Our Virtual Assistants'
  };
  
  const pageDescriptions = {
    'insurance': 'Our specialized insurance VAs are trained to handle policy management, claims processing, and customer service for insurance agencies.',
    'executive': 'Professional executive and administrative VAs ready to support your business operations and management needs.',
    'default': 'Our VAs are highly skilled professionals ready to support your business needs. Each assistant is pre-vetted and trained to deliver exceptional service.'
  };

  const pageTitle = pageTitles[type] || pageTitles['default'];
  const pageDescription = pageDescriptions[type] || pageDescriptions['default'];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header 
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
                  to="/our-vas"
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
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 pb-40">
          {/* Filters */}
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Find Your Perfect VA Match</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Availability</label>
              <select 
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="all">All Availabilities</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Minimum Experience</label>
              <select 
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="all">Any Experience</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="7">7+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Minimum Rating</label>
              <select 
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="0">Any Rating</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Languages</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="languages"
                    value="Spanish"
                    checked={filters.languages.includes('Spanish')}
                    onChange={handleFilterChange}
                    className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
                  />
                  <span className="ml-2">Spanish</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="languages"
                    value="French"
                    checked={filters.languages.includes('French')}
                    onChange={handleFilterChange}
                    className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
                  />
                  <span className="ml-2">French</span>
                </label>
              </div>
            </div>
          </div>
          </div>

          {/* VA Grid */}
          {filteredVAs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVAs.map((va) => (
            <div key={va.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={va.image} 
                  alt={va.name}
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute top-4 right-4 ${va.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'} text-white text-sm font-bold px-3 py-1 rounded-full flex items-center`}>
                  <CheckCircle size={16} className="mr-1" />
                  {va.status}
                </div>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 text-yellow-600 font-bold px-3 py-1 rounded-full flex items-center text-sm">
                  ⭐ {va.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{va.name}</h3>
                  <span className="bg-ocean-100 text-ocean-800 text-sm font-medium px-3 py-1 rounded-full">
                    {va.experience} experience
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">{va.position}</p>
                  <p className="text-sm text-gray-500">{va.experience} experience • {va.availability}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {va.languages.map((lang, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {va.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button className="flex items-center text-ocean-600 hover:text-ocean-700">
                    <MessageSquare size={18} className="mr-2" />
                    Message
                  </button>
                  <button className="bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                    Hire Now
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No VAs found matching your criteria. Please try different filters or contact us for custom VA matching.</p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-ocean-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-ocean-200 mb-8 max-w-3xl mx-auto">
            We have more VAs with diverse skills. Let us help you find the perfect match for your specific needs.
          </p>
          <button className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-full text-lg transition-colors">
            Contact Us for Custom VA Matching
          </button>
        </div>
      </section>
      </div>

      {/* Sticky CTA */}
      <VAStickyCTA />
    </>
  );
};

export default OurVAsPage;
