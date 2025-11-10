# Page-Specific Schema Markups

Esta carpeta contiene schemas JSON-LD específicos para las páginas principales de Ocean VA.

## Archivos Incluidos

### 01-about-us-schema.json
- **Tipo**: AboutPage
- **URL**: https://www.oceanvirtualassistant.com/about-us
- **Propósito**: Proporciona información sobre la organización, misión y valores
- **Campos clave**: Fundación, ubicación, información de contacto

### 02-contact-us-schema.json
- **Tipo**: ContactPage
- **URL**: https://www.oceanvirtualassistant.com/contact-us
- **Propósito**: Facilita que Google muestre información de contacto en SERPs
- **Campos clave**: Teléfono, email, dirección, opciones de contacto

### 03-pricing-schema.json
- **Tipo**: PriceSpecification
- **URL**: https://www.oceanvirtualassistant.com/pricing
- **Propósito**: Muestra opciones de precios y planes disponibles
- **Campos clave**: Ofertas, precios, disponibilidad, tipos de clientes elegibles

### 04-blog-schema.json
- **Tipo**: Blog
- **URL**: https://www.oceanvirtualassistant.com/blogs
- **Propósito**: Identifica la página como un blog para mejor indexación
- **Campos clave**: Publicaciones, autor, fecha de publicación

### 05-our-vas-schema.json
- **Tipo**: CollectionPage
- **URL**: https://www.oceanvirtualassistant.com/ovas-current-vas
- **Propósito**: Describe la colección de asistentes virtuales disponibles
- **Campos clave**: Equipo, servicios, especialidades

### 06-licensed-insurance-agents-schema.json
- **Tipo**: CollectionPage + ProfessionalService
- **URL**: https://www.oceanvirtualassistant.com/ovas-licensed-insurance-agents
- **Propósito**: Destaca agentes de seguros licenciados especializados
- **Campos clave**: Licencia, especialización, área de servicio

### 07-executive-admin-va-schema.json
- **Tipo**: Service
- **URL**: https://www.oceanvirtualassistant.com/ovas-executive-admin-virtual-assistant
- **Propósito**: Describe el servicio premium de asistentes ejecutivos
- **Campos clave**: Precio, servicios incluidos, calificaciones

### 08-careers-schema.json
- **Tipo**: JobPosting
- **URL**: https://www.oceanvirtualassistant.com/careers
- **Propósito**: Facilita que Google muestre ofertas de empleo
- **Campos clave**: Ubicación, tipo de empleo, beneficios, contacto

## Implementación

Cada schema debe agregarse a la página correspondiente en Webflow:

1. Ve a **Project Settings** → **Custom Code**
2. En la sección **Head Code**, agrega el schema dentro de etiquetas `<script type="application/ld+json">`
3. O agrega en la página específica: **Settings** → **Custom Code** → **Head Code**

## Validación

Después de implementar, valida con:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

## Notas

- Todos los schemas incluyen URLs y datos específicos de Ocean VA
- Los precios y información de contacto deben mantenerse actualizados
- Los schemas están optimizados para SEO y visibilidad en búsqueda
