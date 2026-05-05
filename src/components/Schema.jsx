import React from 'react'

export default function Schema() {
  const schemas = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WAGS",
      "url": "https://hirewags.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Stuart",
        "addressRegion": "FL",
        "addressCountry": "US"
      }
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Insurance Virtual Assistant",
      "provider": {
        "@type": "Organization",
        "name": "WAGS"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Full Time Plan",
          "price": "1300",
          "priceCurrency": "USD"
        }
      ]
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }} />
    </>
  )
}
