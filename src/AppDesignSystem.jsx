import React from 'react'
import '../webflow-components-design-system/design-system.css'
import HeroHome from './components/HeroHome'
import ClientLogos from './components/ClientLogos'
import Stats from './components/Stats'
import ComparisonTable from './components/ComparisonTable'
import Timeline from './components/Timeline'
import Pricing from './components/Pricing'
import VAShowcase from './components/VAShowcase'
import ServicesIndustriesShowcase from './components/ServicesIndustriesShowcase'
import Testimonials from './components/Testimonials'
import BookingDemo from './components/BookingDemo'
import FAQMini from './components/FAQMini'
import ServicesGrid from './components/ServicesGrid'
import MediaGallery from './components/MediaGallery'

function AppDesignSystem() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Hero Section with Design System */}
      <section className="ds-gradient-primary ds-text-white ds-section">
        <div className="ds-container">
          <div className="ds-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Column - Image */}
            <div style={{ order: 2 }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--ds-shadow-xl)', minHeight: '500px' }}>
                <img 
                  src="/img/positive-woman.jpg" 
                  alt="Ocean Virtual Assistant" 
                  style={{ width: '100%', height: '100%', minHeight: '500px', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div style={{ order: 1 }}>
              <h1 className="ds-text-7xl ds-font-bold ds-mb-6 ds-leading-tight">
                Outsource Smarter
                <span className="ds-block" style={{ color: 'var(--ds-color-primary-50)' }}>Achieve More</span>
              </h1>
              <p className="ds-text-xl ds-mb-8" style={{ color: 'var(--ds-color-primary-50)' }}>
                Boost productivity, save time, cut costs, and focus on what matters with expert support from Ocean Virtual Assistants.
              </p>
              
              {/* Trust Badges */}
              <div className="ds-grid ds-grid-4 ds-mb-8" style={{ gap: '12px' }}>
                {[
                  { icon: '⭐', text: 'Top 1% Talent' },
                  { icon: '⚡', text: 'Start in 2-3 Days' },
                  { icon: '💰', text: 'No Setup Fees' },
                  { icon: '🌐', text: '10+ Languages' }
                ].map((badge, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      padding: '12px',
                      borderRadius: 'var(--ds-radius-base)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{badge.icon}</span>
                    <span className="ds-text-sm ds-font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexWrap: 'wrap' }}>
                <a 
                  href="#booking" 
                  onClick={(e) => handleScroll(e, 'booking')}
                  className="ds-button ds-button-white ds-button-lg"
                  style={{ textAlign: 'center' }}
                >
                  Contact us
                </a>
                <a 
                  href="#pricing" 
                  onClick={(e) => handleScroll(e, 'pricing')}
                  className="ds-button ds-button-outline ds-button-lg"
                  style={{ 
                    textAlign: 'center',
                    borderColor: 'var(--ds-color-white)',
                    color: 'var(--ds-color-white)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--ds-color-white)'
                    e.target.style.color = 'var(--ds-color-primary-700)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = 'var(--ds-color-white)'
                  }}
                >
                  Plans & Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ds-bg-primary-dark ds-text-white ds-section-sm">
        <div className="ds-container">
          <div className="ds-text-center ds-mb-12">
            <h2 className="ds-text-4xl ds-font-bold ds-mb-4">
              Expert Virtual Assistants for Your Business
            </h2>
            <p className="ds-text-xl" style={{ color: 'var(--ds-color-primary-50)' }}>
              Specialized professionals ready to help your business grow and succeed.
            </p>
          </div>

          <div className="ds-grid ds-grid-4" style={{ gap: '32px' }}>
            {[
              { value: '70%', label: 'Cost Savings', description: 'Save up to 70% on staffing costs' },
              { value: '95%', label: 'Retention Rate', description: 'Industry-leading employee retention' },
              { value: '100+', label: 'Businesses Served', description: 'Clients across multiple industries' },
              { value: '10+', label: 'Languages', description: 'English & Spanish Native VAs' }
            ].map((stat, idx) => (
              <div key={idx} className="ds-text-center">
                <div className="ds-text-5xl ds-font-bold ds-mb-2">{stat.value}</div>
                <div className="ds-text-xl ds-font-semibold ds-mb-2" style={{ color: 'var(--ds-color-primary-50)' }}>{stat.label}</div>
                <p className="ds-text-sm" style={{ color: 'var(--ds-color-primary-100)' }}>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Media Gallery */}
      <MediaGallery />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Services & Industries Showcase */}
      <ServicesIndustriesShowcase />

      {/* Timeline */}
      <Timeline />

      {/* Pricing */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* Booking Demo */}
      <section id="booking">
        <BookingDemo />
      </section>

      {/* VA Showcase */}
      <VAShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Mini */}
      <FAQMini />

      {/* Services Grid */}
      <ServicesGrid />
      
      {/* Final CTA Section with Design System */}
      <section className="ds-gradient-primary ds-text-white ds-section">
        <div className="ds-container-narrow ds-text-center">
          <h2 className="ds-text-4xl ds-font-bold ds-mb-6">
            Ready to save ON TIME & up to 70% on costs?
          </h2>
          <p className="ds-text-xl ds-mb-8" style={{ color: 'var(--ds-color-primary-50)' }}>
            Get started with Ocean Virtual Assistant today and transform your business operations.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://www.oceanvirtualassistant.com/contact-us" 
              className="ds-button ds-button-white ds-button-lg"
            >
              Book a Free Call
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleScroll(e, 'pricing')}
              className="ds-button ds-button-outline ds-button-lg"
              style={{ 
                borderColor: 'var(--ds-color-white)',
                color: 'var(--ds-color-white)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--ds-color-white)'
                e.target.style.color = 'var(--ds-color-primary-700)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = 'var(--ds-color-white)'
              }}
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default AppDesignSystem

