import React, { useState } from 'react'
import { declareComponent } from '@webflow/react'
import vasData from '../../data/vasData'

/**
 * VA Showcase Code Component for Webflow
 * 
 * Displays a paginated grid of Virtual Assistants with their information.
 * Data comes from vasData.js (source of truth).
 * 
 * This component is wrapped with @webflow/react for use in Webflow Designer
 */
const VAShowcase = ({ 
  title = 'Meet Our Virtual Assistants',
  subtitle = 'Expert professionals ready to support your business',
  itemsPerPage = 12,
  showFilters = true,
  highlightColor = '#049d98',
  ctaText = 'View All Available VAs',
  ctaLink = '/ovas-current-vas'
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterAvailability, setFilterAvailability] = useState('all')
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter VAs based on criteria
  const filteredVAs = vasData.filter(va => {
    const matchesSearch = va.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAvailability = filterAvailability === 'all' || va.disponibilidad === filterAvailability
    const matchesLanguage = filterLanguage === 'all' || va.idiomas.includes(filterLanguage)
    return matchesSearch && matchesAvailability && matchesLanguage
  })

  // Paginate
  const totalPages = Math.ceil(filteredVAs.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedVAs = filteredVAs.slice(startIdx, startIdx + itemsPerPage)

  // Get unique values for filters
  const availabilityOptions = ['Full Time', 'Part Time', 'Assigned']
  const languageOptions = ['English', 'Bilingual (EN-ES)']

  const getAvailabilityBadgeColor = (availability) => {
    switch(availability) {
      case 'Full Time': return '#049d98'
      case 'Part Time': return '#0fb5a3'
      case 'Assigned': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getAvailabilityBadgeText = (availability) => {
    switch(availability) {
      case 'Full Time': return '✓ Full Time'
      case 'Part Time': return '✓ Part Time'
      case 'Assigned': return '✓ Assigned'
      default: return availability
    }
  }

  return (
    <section style={{ backgroundColor: '#f9fafb', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '12px'
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '24px'
          }}>
            {subtitle}
          </p>

          {/* Filters */}
          {showFilters && (
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '24px'
            }}>
              {/* Search */}
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  minWidth: '150px'
                }}
              />

              {/* Availability Filter */}
              <select
                value={filterAvailability}
                onChange={(e) => {
                  setFilterAvailability(e.target.value)
                  setCurrentPage(1)
                }}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Availability</option>
                {availabilityOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Language Filter */}
              <select
                value={filterLanguage}
                onChange={(e) => {
                  setFilterLanguage(e.target.value)
                  setCurrentPage(1)
                }}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Languages</option>
                {languageOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Clear Filters */}
              {(searchTerm || filterAvailability !== 'all' || filterLanguage !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setFilterAvailability('all')
                    setFilterLanguage('all')
                    setCurrentPage(1)
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '24px'
          }}>
            Showing {paginatedVAs.length > 0 ? startIdx + 1 : 0} - {Math.min(startIdx + itemsPerPage, filteredVAs.length)} of {filteredVAs.length} VAs
          </p>
        </div>

        {/* VA Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {paginatedVAs.map((va, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                backgroundColor: '#f3f4f6',
                paddingBottom: '100%',
                overflow: 'hidden'
              }}>
                <img
                  src={va.imagen || `https://api.dicebear.com/7.x/avataaars/svg?seed=${va.nombre}`}
                  alt={va.nombre}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  loading="lazy"
                />

                {/* Availability Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: getAvailabilityBadgeColor(va.disponibilidad),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  zIndex: 10
                }}>
                  {getAvailabilityBadgeText(va.disponibilidad)}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                {/* Name */}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  {va.nombre}
                </h3>

                {/* Role */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '12px',
                  fontWeight: '500'
                }}>
                  ⊙ {va.categorías?.[0] || 'Virtual Assistant'}
                </p>

                {/* Info */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '13px'
                }}>
                  <div>
                    <div style={{ color: '#6b7280', fontWeight: '500' }}>Experience</div>
                    <div style={{ color: '#111827', fontWeight: '600' }}>📅 {va.años_experiencia} years</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontWeight: '500' }}>Language</div>
                    <div style={{ color: '#111827', fontWeight: '600' }}>🌐 {va.idiomas}</div>
                  </div>
                </div>

                {/* Specialization */}
                {va.especialización && va.especialización.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      fontWeight: '500',
                      marginBottom: '6px'
                    }}>
                      Specialization
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      {va.especialización.map((spec, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: '#d1fae5',
                            color: '#047857',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <a
                    href={`/${va.slug}`}
                    style={{
                      flex: 1,
                      backgroundColor: highlightColor,
                      color: 'white',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                  >
                    View Profile →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {paginatedVAs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#6b7280'
          }}>
            <p style={{ fontSize: '16px' }}>No VAs found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: currentPage === page ? highlightColor : '#e5e7eb',
                  color: currentPage === page ? 'white' : '#111827',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = '#d1d5db'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb'
                  }
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: `2px solid ${highlightColor}`
        }}>
          <p style={{
            fontSize: '18px',
            color: '#111827',
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            Want to see all of our available VAs?
          </p>
          <a
            href={ctaLink}
            style={{
              display: 'inline-block',
              backgroundColor: highlightColor,
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}

// Declare component for Webflow
declareComponent(VAShowcase, {
  name: 'VA Showcase',
  description: 'Display Virtual Assistants in a paginated, filterable grid with dynamic data from vasData.js',
  props: {
    title: {
      type: 'string',
      defaultValue: 'Meet Our Virtual Assistants',
      description: 'Main heading text'
    },
    subtitle: {
      type: 'string',
      defaultValue: 'Expert professionals ready to support your business',
      description: 'Subheading text'
    },
    itemsPerPage: {
      type: 'number',
      defaultValue: 12,
      description: 'Number of VAs to show per page'
    },
    showFilters: {
      type: 'boolean',
      defaultValue: true,
      description: 'Show search and filter controls'
    },
    highlightColor: {
      type: 'string',
      defaultValue: '#049d98',
      description: 'Primary color for buttons and badges (hex code)'
    },
    ctaText: {
      type: 'string',
      defaultValue: 'View All Available VAs',
      description: 'Call-to-action button text'
    },
    ctaLink: {
      type: 'string',
      defaultValue: '/ovas-current-vas',
      description: 'Call-to-action button link'
    }
  }
})

export default VAShowcase
