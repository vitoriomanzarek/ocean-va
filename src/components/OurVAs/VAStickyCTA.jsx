import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function VAStickyCTA() {
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const content = (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '2px solid #1eb8a6',
      padding: '16px',
      zIndex: 9999,
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)',
      width: '100%'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <p style={{
          textAlign: 'center',
          color: '#374151',
          fontSize: '14px',
          fontWeight: '500',
          margin: 0
        }}>
          Meet with one or more VAs
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfMTLuUz2zGYGYgapBoxur4g5W1TYNqYD96SaT0Z_itmJxqXg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#0d7377',
            color: 'white',
            fontWeight: 'bold',
            padding: '8px 24px',
            borderRadius: '9999px',
            textAlign: 'center',
            transition: 'all 0.2s',
            fontSize: '14px',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#055d63'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#0d7377'}
        >
          Schedule a meeting
        </a>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
