import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

/**
 * VAShowcase Code Component for Webflow
 * 
 * Props:
 * - title: string - Section title
 * - subtitle: string - Section subtitle
 * - vas: array - Virtual Assistants data
 * - itemsPerPage: number - Items to show per page
 */
export const VAShowcase = ({ 
  title = 'Meet Our Virtual Assistants',
  subtitle = 'Expert professionals ready to support your business',
  vas = [
    {
      id: 1,
      name: 'Maria Garcia',
      image: 'https://via.placeholder.com/180',
      specialization: 'Insurance Processing',
      languages: ['English', 'Spanish'],
      experience: '5+ years',
      rating: 4.9,
      reviews: 24,
      available: true
    },
    {
      id: 2,
      name: 'John Smith',
      image: 'https://via.placeholder.com/180',
      specialization: 'Customer Support',
      languages: ['English'],
      experience: '3+ years',
      rating: 4.8,
      reviews: 18,
      available: true
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      image: 'https://via.placeholder.com/180',
      specialization: 'Data Entry',
      languages: ['English', 'Spanish'],
      experience: '4+ years',
      rating: 5.0,
      reviews: 32,
      available: false
    }
  ],
  itemsPerPage = 3
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  
  const totalPages = Math.ceil(vas.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const currentVAs = vas.slice(startIdx, startIdx + itemsPerPage)

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* VA Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentVAs.map((va) => (
            <div
              key={va.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-200 h-64">
                <img
                  src={va.image}
                  alt={va.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
                    va.available 
                      ? 'bg-green-500' 
                      : 'bg-gray-500'
                  }`}>
                    {va.available ? 'Available' : 'Assigned'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {va.name}
                </h3>

                {/* Specialization */}
                <p className="text-ocean-600 font-semibold text-sm mb-3">
                  {va.specialization}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(va.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {va.rating} ({va.reviews} reviews)
                  </span>
                </div>

                {/* Experience & Languages */}
                <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-semibold">Experience:</span>
                    <span>{va.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-semibold">Languages:</span>
                    <span>{va.languages.join(', ')}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-ocean-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-ocean-700 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentPage
                      ? 'bg-ocean-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-lg border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Info Text */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, vas.length)} of {vas.length} Virtual Assistants
          </p>
        </div>
      </div>
    </section>
  )
}

VAShowcase.displayName = 'VAShowcase'
VAShowcase.defaultProps = {
  title: 'Meet Our Virtual Assistants',
  subtitle: 'Expert professionals ready to support your business',
  itemsPerPage: 3
}
