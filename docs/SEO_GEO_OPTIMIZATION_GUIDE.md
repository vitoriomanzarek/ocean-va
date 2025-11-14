# SEO/GEO Optimization Guide - Ocean VA

**Prioridad**: 🔴 MÁXIMA
**Responsable**: Tú (SEO/GEO Lead)

---

## 📊 AUDITORÍA SEO ACTUAL

### Paso 1: Diagnóstico Inicial

```bash
# Herramientas recomendadas
- Google Search Console (verificar indexación)
- Google PageSpeed Insights (Core Web Vitals)
- Screaming Frog (crawl del sitio)
- SEMrush o Ahrefs (análisis competitivo)
- Schema.org Validator (validar structured data)
```

### Paso 2: Checklist de Auditoría

```
INDEXACIÓN:
├── [ ] Verificar en Google Search Console
├── [ ] Revisar robots.txt
├── [ ] Validar sitemap.xml
├── [ ] Buscar errores de rastreo
└── [ ] Revisar URL canonicals

CONTENIDO:
├── [ ] Revisar meta titles (55-60 chars)
├── [ ] Revisar meta descriptions (155-160 chars)
├── [ ] Validar H1 tags (1 por página)
├── [ ] Revisar heading hierarchy
├── [ ] Auditar alt text en imágenes
├── [ ] Revisar internal linking
└── [ ] Validar URL structure

TÉCNICO:
├── [ ] Core Web Vitals (LCP, FID, CLS)
├── [ ] Mobile responsiveness
├── [ ] HTTPS (verificar certificado)
├── [ ] Velocidad de carga
├── [ ] Compresión de imágenes
├── [ ] Minificación de CSS/JS
└── [ ] Caché del navegador

STRUCTURED DATA:
├── [ ] Organization schema
├── [ ] LocalBusiness schema
├── [ ] Person schema (VAs)
├── [ ] Service schema
├── [ ] BreadcrumbList schema
├── [ ] FAQPage schema
└── [ ] Review schema

BACKLINKS:
├── [ ] Revisar backlinks actuales
├── [ ] Identificar oportunidades
├── [ ] Revisar perfil de enlaces
└── [ ] Buscar enlaces rotos

GEO:
├── [ ] Verificar Google My Business
├── [ ] Revisar ubicaciones
├── [ ] Validar datos locales
└── [ ] Revisar reseñas
```

---

## 🎯 ESTRATEGIA SEO POR PÁGINA

### 1. Home Page (/index)

```
Meta Title (60 chars):
"Virtual Assistants for Insurance Agencies | Ocean VA"

Meta Description (160 chars):
"Reduce costs 70% with bilingual virtual assistants. Insurance agencies trust Ocean VA for customer service, claims processing & more. Book a free call today."

H1:
"Virtual Assistants for Insurance Agencies"

Keywords Target:
- Virtual assistants for insurance
- Insurance VA services
- Bilingual customer service
- Insurance customer support
- Virtual receptionist insurance

Internal Links:
├── /insurance (Insurance VA Services)
├── /services (All Services)
├── /industries (Industries)
├── /ovas-current-vas (Meet Our VAs)
└── /pricing (Pricing)

Schema:
├── Organization
├── LocalBusiness
└── Service (multiple)
```

### 2. VA Profile Pages (/va/[slug])

```
Meta Title (60 chars):
"[VA Name] - Virtual Assistant | Ocean VA"

Meta Description (160 chars):
"[VA Name] is a [experience] virtual assistant specializing in [specializations]. Languages: [languages]. Availability: [availability]."

H1:
"[VA Name] - Virtual Assistant"

Keywords Target:
- [VA Name] virtual assistant
- [Specialization] VA
- [Language] virtual assistant
- Insurance VA [specialization]

Content Sections:
├── Hero with image
├── Experience & background
├── Languages & specializations
├── Availability & rates
├── Testimonials
├── CTA (Book a call)
└── Related VAs

Schema:
├── Person
├── LocalBusiness
└── Review (if testimonials)
```

### 3. Service Pages (/services/[slug])

```
Meta Title (60 chars):
"[Service Name] Virtual Assistant | Ocean VA"

Meta Description (160 chars):
"Professional [service] virtual assistants for insurance agencies. Reduce costs, improve efficiency. [Key benefit]. Book a free consultation."

H1:
"[Service Name] Virtual Assistant Services"

Keywords Target:
- [Service] virtual assistant
- [Service] insurance
- [Service] support
- Outsourced [service]

Content Sections:
├── Hero with benefits
├── What is [service]?
├── Why outsource [service]?
├── How Ocean VA helps
├── Day-to-day tasks
├── Pricing
├── Testimonials
├── Related services
└── CTA

Schema:
├── Service
├── LocalBusiness
└── FAQPage (if applicable)
```

### 4. Industry Pages (/industries/[slug])

```
Meta Title (60 chars):
"[Industry] Virtual Assistant Services | Ocean VA"

Meta Description (160 chars):
"Virtual assistants specialized in [industry]. Reduce costs 70%. [Key benefit]. Bilingual support. Book a free call."

H1:
"Virtual Assistant Services for [Industry]"

Keywords Target:
- [Industry] virtual assistant
- [Industry] customer service
- [Industry] support
- Outsourced [industry] services

Content Sections:
├── Hero
├── Industry overview
├── Challenges in [industry]
├── Ocean VA solutions
├── Case studies
├── Specialized VAs
├── Pricing
├── CTA
└── FAQ

Schema:
├── LocalBusiness
├── Service
└── FAQPage
```

---

## 🏷️ SCHEMA MARKUPS: Implementación Completa

### 1. Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ocean VA",
  "url": "https://oceanvirtualassistant.com",
  "logo": "https://oceanvirtualassistant.com/logo.png",
  "description": "Virtual Assistants for Insurance Agencies",
  "sameAs": [
    "https://www.facebook.com/oceanva",
    "https://www.linkedin.com/company/oceanva",
    "https://www.instagram.com/oceanva"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "contact@oceanvirtualassistant.com"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Remote"
  }
}
```

### 2. LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ocean VA",
  "image": "https://oceanvirtualassistant.com/logo.png",
  "description": "Virtual Assistants for Insurance Agencies",
  "url": "https://oceanvirtualassistant.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "contact@oceanvirtualassistant.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Remote"
  },
  "areaServed": [
    "US",
    "CA",
    "UK",
    "AU"
  ],
  "priceRange": "$$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "150"
  }
}
```

### 3. Person Schema (Para cada VA)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[VA Name]",
  "jobTitle": "Virtual Assistant",
  "image": "[VA Image URL]",
  "description": "[VA Bio]",
  "url": "https://oceanvirtualassistant.com/va/[slug]",
  "knowsLanguage": ["English", "Spanish"],
  "workLocation": {
    "@type": "Place",
    "name": "Remote"
  },
  "expertise": [
    "Insurance",
    "Customer Service",
    "[Specialization]"
  ],
  "availability": "Full-time",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "[VA Email]"
  }
}
```

### 4. Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "description": "[Service Description]",
  "url": "https://oceanvirtualassistant.com/services/[slug]",
  "image": "[Service Image URL]",
  "provider": {
    "@type": "Organization",
    "name": "Ocean VA",
    "url": "https://oceanvirtualassistant.com"
  },
  "areaServed": [
    "US",
    "CA",
    "UK",
    "AU"
  ],
  "priceRange": "$$$",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "[Price]"
  }
}
```

### 5. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://oceanvirtualassistant.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://oceanvirtualassistant.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Service Name]",
      "item": "https://oceanvirtualassistant.com/services/[slug]"
    }
  ]
}
```

### 6. FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a virtual assistant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

---

## 🌍 GEO OPTIMIZATION

### Por Región

```
UNITED STATES:
├── Meta tags con "USA" o "United States"
├── Schema areaServed: ["US"]
├── Google My Business (si aplica)
├── Contenido localizado
└── Links locales

CANADA:
├── Meta tags con "Canada"
├── Schema areaServed: ["CA"]
├── Contenido en inglés/francés
├── Links canadienses
└── Validar PIPEDA compliance

UNITED KINGDOM:
├── Meta tags con "UK"
├── Schema areaServed: ["GB"]
├── Contenido en inglés británico
├── Links británicos
└── Validar GDPR compliance

AUSTRALIA:
├── Meta tags con "Australia"
├── Schema areaServed: ["AU"]
├── Contenido en inglés australiano
├── Links australianos
└── Validar Privacy Act compliance
```

### Implementación

```html
<!-- En cada página -->
<meta name="geo.placename" content="United States">
<meta name="geo.region" content="US">
<meta name="geo.position" content="37.7749;-122.4194">

<!-- Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "areaServed": ["US", "CA", "UK", "AU"]
}
</script>
```

---

## 📝 CONTENIDO: Optimización

### Estructura de Contenido

```
H1 (1 por página)
├── H2 (2-3 por página)
│   ├── H3 (2-3 por H2)
│   │   └── Párrafos (150-300 palabras)
│   └── Listas (bullets o numeradas)
└── H2 (conclusión)
```

### Longitud de Contenido

```
Home: 1,500-2,000 palabras
Service pages: 1,200-1,500 palabras
Industry pages: 1,200-1,500 palabras
VA profiles: 300-500 palabras
Blog posts: 1,500-2,500 palabras
```

### Keywords

```
Primary Keyword:
- 1 por página
- En H1, primeros 100 palabras, meta title

Secondary Keywords:
- 2-3 por página
- Distribuidas en H2s y contenido

Long-tail Keywords:
- 3-5 por página
- En H3s y párrafos

LSI Keywords:
- Variaciones naturales
- Sinónimos
- Palabras relacionadas
```

---

## ⚡ CORE WEB VITALS: Optimización

### Métricas Clave

```
LCP (Largest Contentful Paint):
├── Target: < 2.5 segundos
├── Optimizar: imágenes, lazy loading
└── Herramienta: PageSpeed Insights

FID (First Input Delay):
├── Target: < 100 ms
├── Optimizar: JavaScript, interactividad
└── Herramienta: Chrome DevTools

CLS (Cumulative Layout Shift):
├── Target: < 0.1
├── Optimizar: dimensiones de elementos
└── Herramienta: PageSpeed Insights
```

### Optimizaciones

```
Imágenes:
├── [ ] Usar WebP format
├── [ ] Lazy loading
├── [ ] Responsive images (srcset)
├── [ ] Comprimir (TinyPNG, ImageOptim)
└── [ ] CDN (Cloudflare, Vercel)

JavaScript:
├── [ ] Minificar
├── [ ] Code splitting
├── [ ] Defer non-critical JS
├── [ ] Remove unused code
└── [ ] Use async/defer attributes

CSS:
├── [ ] Minificar
├── [ ] Remove unused CSS
├── [ ] Critical CSS inline
└── [ ] Defer non-critical CSS

Fonts:
├── [ ] Usar system fonts o Google Fonts
├── [ ] font-display: swap
├── [ ] Preload critical fonts
└── [ ] Limitar weights/styles
```

---

## 🔗 INTERNAL LINKING: Estrategia

### Estructura de Links

```
Home
├── /insurance (Insurance VA Services)
├── /services (All Services)
│   ├── /services/customer-service
│   ├── /services/claims-processing
│   ├── /services/appointment-scheduling
│   └── ...
├── /industries (Industries)
│   ├── /industries/insurance
│   ├── /industries/real-estate
│   └── ...
├── /ovas-current-vas (Meet Our VAs)
│   ├── /va/[name-1]
│   ├── /va/[name-2]
│   └── ...
├── /pricing (Pricing)
├── /about (About Us)
├── /blog (Blog)
└── /contact (Contact)
```

### Anchor Text Strategy

```
✅ BUENO:
- "Learn more about customer service VA"
- "Explore our insurance services"
- "Meet our virtual assistants"

❌ MALO:
- "Click here"
- "Read more"
- "Link"

⚠️ EVITAR:
- Anchor text genérico
- Keyword stuffing
- Links no relevantes
```

---

## 📱 MOBILE OPTIMIZATION

### Checklist

```
[ ] Responsive design (mobile-first)
[ ] Touch-friendly buttons (48px minimum)
[ ] Readable font size (16px minimum)
[ ] Proper viewport meta tag
[ ] No horizontal scroll
[ ] Fast loading (< 3 segundos)
[ ] Optimized images
[ ] Mobile-friendly navigation
[ ] Accessible forms
[ ] No intrusive interstitials
```

---

## 📊 MONITOREO Y REPORTING

### Herramientas Recomendadas

```
Google Search Console:
├── Indexación
├── Errores de rastreo
├── Core Web Vitals
└── Palabras clave

Google Analytics 4:
├── Tráfico
├── Comportamiento
├── Conversiones
└── Fuentes

Rank Tracking:
├── SEMrush
├── Ahrefs
├── SE Ranking
└── Moz

Monitoring:
├── Uptime monitoring
├── Broken links
├── SSL certificate
└── Redirects
```

### Métricas a Monitorear

```
Mensual:
├── Tráfico orgánico
├── Posiciones de keywords
├── Clicks en SERP
├── Impresiones
├── CTR
└── Conversiones

Trimestral:
├── Backlinks
├── Perfil de enlaces
├── Competencia
├── Oportunidades
└── ROI

Anual:
├── Crecimiento YoY
├── Cambios de algoritmo
├── Nuevas oportunidades
└── Estrategia revisada
```

---

## 🎯 PLAN DE ACCIÓN SEO (30 días)

### Semana 1: Auditoría
```
[ ] Auditoría completa de SEO
[ ] Análisis de competencia
[ ] Identificar oportunidades
[ ] Crear plan de acción
```

### Semana 2: On-Page
```
[ ] Optimizar meta titles/descriptions
[ ] Mejorar H1 tags
[ ] Agregar internal links
[ ] Optimizar imágenes
```

### Semana 3: Technical
```
[ ] Crear sitemap.xml
[ ] Optimizar robots.txt
[ ] Validar Core Web Vitals
[ ] Comprimir imágenes
```

### Semana 4: Schema + GEO
```
[ ] Agregar Organization schema
[ ] Agregar LocalBusiness schema
[ ] Agregar Person schema (VAs)
[ ] Agregar Service schema
[ ] Implementar GEO optimization
```

---

## 📞 SOPORTE

- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev
- Schema.org Validator: https://validator.schema.org
- SEMrush: https://www.semrush.com
- Ahrefs: https://ahrefs.com

