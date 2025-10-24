import React from 'react'

export default function ClientLogos() {
  const logos = [
    '/logos/675c1c8aef521779174c48ef_Pathway.png',
    '/logos/675c1c8b1babe50d26799c80_Level Up.png',
    '/logos/675c1c8b1bd8b8f3abf24794_McGarr.png',
    '/logos/675c1c8b2a076b8d38831029_Bis.png',
    '/logos/675c1c8b2db29a4ae865b059_Fiesta.png',
    '/logos/675c1c8b7a0cfb0322650795_GIG.png',
    '/logos/675c1c8b98afbfcdd3f5941d_Ascend.png'
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Proud to Work with the Best
        </h2>
        
      </div>
      
      {/* Carousel Container - Full Width */}
      <div className="relative overflow-hidden mt-8">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Infinite Scroll Animation */}
          <div className="flex animate-infinite-scroll">
            {/* First Set */}
            {logos.map((logo, idx) => (
              <div
                key={`first-${idx}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={logo}
                  alt={`Client logo ${idx + 1}`}
                  className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100"
                />
              </div>
            ))}
            {/* Duplicate Set for Seamless Loop */}
            {logos.map((logo, idx) => (
              <div
                key={`second-${idx}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={logo}
                  alt={`Client logo ${idx + 1}`}
                  className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}