import React from 'react'

/**
 * Hero Code Component for Webflow
 * 
 * Props:
 * - title: string - Main heading
 * - subtitle: string - Subheading
 * - backgroundImage: string - Background image URL
 * - ctaText: string - Call-to-action button text
 * - ctaLink: string - Call-to-action button link
 * - ctaStyle: 'primary' | 'secondary' - Button style
 */
export const Hero = ({ 
  title = 'Welcome to Ocean VA',
  subtitle = 'Expert Virtual Assistants for Your Business',
  backgroundImage = null,
  ctaText = 'Book a Free Call',
  ctaLink = '#contact',
  ctaStyle = 'primary'
}) => {
  return (
    <section 
      className="hero relative w-full overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundAttachment: 'fixed',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-ocean-700 via-ocean-600 to-transparent opacity-90"
        style={{ zIndex: 1 }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-100 mb-12 leading-relaxed">
          {subtitle}
        </p>
        
        {/* CTA Button */}
        <a 
          href={ctaLink}
          className={`inline-block px-8 sm:px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            ctaStyle === 'primary' 
              ? 'bg-white text-ocean-600 hover:bg-gray-100 shadow-lg hover:shadow-xl' 
              : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-ocean-600'
          }`}
        >
          {ctaText}
        </a>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 768px) {
          .hero {
            min-height: 400px;
          }
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero p {
            font-size: 1.125rem;
          }
        }
        
        @media (max-width: 640px) {
          .hero {
            min-height: 350px;
            background-attachment: scroll;
          }
          .hero h1 {
            font-size: 2rem;
          }
          .hero p {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

Hero.displayName = 'Hero'
Hero.defaultProps = {
  title: 'Welcome to Ocean VA',
  subtitle: 'Expert Virtual Assistants for Your Business',
  backgroundImage: null,
  ctaText: 'Book a Free Call',
  ctaLink: '#contact',
  ctaStyle: 'primary'
}
