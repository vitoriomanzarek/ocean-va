import React, { useEffect } from 'react'
import '../../webflow-components-design-system/design-system.css'

const HomepageDemo = () => {
  useEffect(() => {
    // Aplicar estilos adicionales
    const style = document.createElement('style')
    style.textContent = `
      /* Additional styles for homepage demo */
      .homepage-hero {
        min-height: 600px;
        display: flex;
        align-items: center;
      }

      .homepage-hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        align-items: center;
      }

      .homepage-hero-image {
        order: 1;
      }

      .homepage-hero-content {
        order: 2;
      }

      .homepage-trust-badges {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 32px;
      }

      .homepage-trust-badge {
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 12px;
        border-radius: var(--ds-radius-base);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .homepage-trust-badge-icon {
        font-size: 20px;
      }

      .homepage-trust-badge-text {
        font-size: var(--ds-font-size-sm);
        font-weight: var(--ds-font-weight-medium);
      }

      .homepage-hero-buttons {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }

      .homepage-button-white {
        background-color: var(--ds-color-white);
        color: var(--ds-color-primary-700);
        padding: 16px 32px;
        border-radius: var(--ds-radius-base);
        font-size: var(--ds-font-size-base);
        font-weight: var(--ds-font-weight-bold);
        text-decoration: none;
        transition: all var(--ds-transition-base);
        text-align: center;
        border: 2px solid transparent;
        display: inline-block;
      }

      .homepage-button-white:hover {
        background-color: var(--ds-color-gray-100);
        transform: translateY(-2px);
        box-shadow: var(--ds-shadow-lg);
      }

      .homepage-button-outline {
        background-color: transparent;
        color: var(--ds-color-white);
        padding: 16px 32px;
        border-radius: var(--ds-radius-base);
        font-size: var(--ds-font-size-base);
        font-weight: var(--ds-font-weight-bold);
        text-decoration: none;
        transition: all var(--ds-transition-base);
        text-align: center;
        border: 2px solid var(--ds-color-white);
        display: inline-block;
      }

      .homepage-button-outline:hover {
        background-color: var(--ds-color-white);
        color: var(--ds-color-primary-700);
        transform: translateY(-2px);
        box-shadow: var(--ds-shadow-lg);
      }

      .homepage-hero-title-main {
        color: var(--ds-color-white);
        margin-bottom: 24px;
      }

      .homepage-hero-title-accent {
        color: var(--ds-color-primary-50);
        display: block;
      }

      .homepage-hero-description {
        color: var(--ds-color-primary-50);
        margin-bottom: 32px;
      }

      .homepage-stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
      }

      .homepage-stat-value {
        font-size: var(--ds-font-size-5xl);
        font-weight: var(--ds-font-weight-bold);
        color: var(--ds-color-white);
        margin-bottom: 8px;
      }

      .homepage-stat-label {
        font-size: var(--ds-font-size-xl);
        font-weight: var(--ds-font-weight-semibold);
        color: var(--ds-color-primary-50);
        margin-bottom: 8px;
      }

      .homepage-stat-description {
        font-size: var(--ds-font-size-sm);
        color: var(--ds-color-primary-100);
      }

      .homepage-cta-title {
        color: var(--ds-color-white);
        margin-bottom: 24px;
      }

      .homepage-cta-description {
        color: var(--ds-color-primary-50);
        margin-bottom: 32px;
      }

      .homepage-cta-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      @media (max-width: 1024px) {
        .homepage-hero-grid {
          grid-template-columns: 1fr;
        }

        .homepage-hero-image {
          order: 2;
        }

        .homepage-hero-content {
          order: 1;
        }

        .homepage-trust-badges {
          grid-template-columns: repeat(2, 1fr);
        }

        .homepage-stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        .homepage-hero-grid {
          gap: 32px;
        }

        .homepage-trust-badges {
          grid-template-columns: 1fr;
        }

        .homepage-stats-grid {
          grid-template-columns: 1fr;
        }

        .homepage-hero-buttons {
          flex-direction: column;
        }

        .homepage-button-white,
        .homepage-button-outline {
          width: 100%;
        }

        .homepage-cta-buttons {
          flex-direction: column;
        }

        .homepage-cta-buttons .homepage-button-white,
        .homepage-cta-buttons .homepage-button-outline {
          width: 100%;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="ds-gradient-primary ds-text-white ds-section homepage-hero">
        <div className="ds-container">
          <div className="homepage-hero-grid">
            {/* Left Column - Image */}
            <div className="homepage-hero-image">
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--ds-shadow-xl)', minHeight: '500px' }}>
                <img 
                  src="/img/positive-woman.jpg" 
                  alt="Ocean Virtual Assistant" 
                  style={{ width: '100%', height: '100%', minHeight: '500px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/600x600/049d98/ffffff?text=Ocean+VA'
                  }}
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="homepage-hero-content">
              <h1 className="ds-text-7xl ds-font-bold homepage-hero-title-main ds-leading-tight">
                Outsource Smarter
                <span className="homepage-hero-title-accent">Achieve More</span>
              </h1>
              <p className="ds-text-xl homepage-hero-description">
                Boost productivity, save time, cut costs, and focus on what matters with expert support from Ocean Virtual Assistants.
              </p>
              
              {/* Trust Badges */}
              <div className="homepage-trust-badges">
                <div className="homepage-trust-badge">
                  <span className="homepage-trust-badge-icon">⭐</span>
                  <span className="homepage-trust-badge-text">Top 1% Talent</span>
                </div>
                <div className="homepage-trust-badge">
                  <span className="homepage-trust-badge-icon">⚡</span>
                  <span className="homepage-trust-badge-text">Start in 2-3 Days</span>
                </div>
                <div className="homepage-trust-badge">
                  <span className="homepage-trust-badge-icon">💰</span>
                  <span className="homepage-trust-badge-text">No Setup Fees</span>
                </div>
                <div className="homepage-trust-badge">
                  <span className="homepage-trust-badge-icon">🌐</span>
                  <span className="homepage-trust-badge-text">10+ Languages</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="homepage-hero-buttons">
                <a href="#contact" className="homepage-button-white">
                  Contact us
                </a>
                <a href="#pricing" className="homepage-button-outline">
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
            <h2 className="ds-text-4xl ds-font-bold ds-mb-4" style={{ color: 'var(--ds-color-white)' }}>
              Expert Virtual Assistants for Your Business
            </h2>
            <p className="ds-text-xl" style={{ color: 'var(--ds-color-primary-50)' }}>
              Specialized professionals ready to help your business grow and succeed.
            </p>
          </div>

          <div className="homepage-stats-grid">
            <div className="ds-text-center">
              <div className="homepage-stat-value">70%</div>
              <div className="homepage-stat-label">Cost Savings</div>
              <p className="homepage-stat-description">Save up to 70% on staffing costs</p>
            </div>
            <div className="ds-text-center">
              <div className="homepage-stat-value">95%</div>
              <div className="homepage-stat-label">Retention Rate</div>
              <p className="homepage-stat-description">Industry-leading employee retention</p>
            </div>
            <div className="ds-text-center">
              <div className="homepage-stat-value">100+</div>
              <div className="homepage-stat-label">Businesses Served</div>
              <p className="homepage-stat-description">Clients across multiple industries</p>
            </div>
            <div className="ds-text-center">
              <div className="homepage-stat-value">10+</div>
              <div className="homepage-stat-label">Languages</div>
              <p className="homepage-stat-description">English & Spanish Native VAs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="ds-gradient-primary ds-text-white ds-section">
        <div className="ds-container-narrow ds-text-center">
          <h2 className="ds-text-4xl ds-font-bold homepage-cta-title" style={{ color: 'var(--ds-color-white)' }}>
            Ready to save ON TIME & up to 70% on costs?
          </h2>
          <p className="ds-text-xl homepage-cta-description">
            Get started with Ocean Virtual Assistant today and transform your business operations.
          </p>
          <div className="homepage-cta-buttons">
            <a href="https://www.oceanvirtualassistant.com/contact-us" className="homepage-button-white">
              Book a Free Call
            </a>
            <a href="#pricing" className="homepage-button-outline">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomepageDemo


