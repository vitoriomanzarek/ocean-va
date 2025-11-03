# Schema Markups for Ocean VA

Este directorio contiene todos los schema markups JSON-LD necesarios para optimizar el SEO de Ocean Virtual Assistant.

## Estructura de Carpetas

```
schema-markups/
├── 01-organization-schema.json          # Schema de la organización
├── 02-local-business-schema.json        # Schema de negocio local
├── 03-faq-schema.json                   # Schema de FAQs
├── 04-how-to-schema.json                # Schema de "Cómo contratar"
├── 05-review-schema.json                # Schema de reseñas
├── service-types/                       # Schemas de tipos de servicios
│   ├── 01-insurance-csr-schema.json
│   ├── 02-administrative-assistant-schema.json
│   ├── 03-customer-service-schema.json
│   ├── 04-marketing-assistant-schema.json
│   ├── 05-virtual-receptionist-schema.json
│   ├── 06-transaction-coordinator-schema.json
│   ├── 07-sdr-schema.json
│   └── 08-general-va-schema.json
└── industries/                          # Schemas de industrias
    ├── 01-insurance-industry-schema.json
    ├── 02-real-estate-industry-schema.json
    ├── 03-small-business-industry-schema.json
    ├── 04-ecommerce-industry-schema.json
    ├── 05-finance-industry-schema.json
    ├── 06-property-management-industry-schema.json
    ├── 07-healthcare-industry-schema.json
    ├── 08-hr-industry-schema.json
    ├── 09-technology-industry-schema.json
    └── 10-mortgage-industry-schema.json
```

## Implementación en Webflow

### Opción 1: Agregar en el Head Global (Recomendado)

1. Ve a **Project Settings** → **Custom Code**
2. En la sección **Head Code**, agrega todos los schemas dentro de etiquetas `<script type="application/ld+json">`

### Opción 2: Agregar por Página

1. Abre la página específica en Webflow
2. Selecciona la página
3. Ve a **Settings** → **Custom Code** → **Head Code**
4. Agrega el schema correspondiente

### Opción 3: Agregar en HTML Personalizado

Si tienes acceso al HTML, inserta los schemas antes del cierre de `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  ...
}
</script>
```

## Mapeo de Schemas a Páginas

### Core Schemas (Todas las páginas)
- **01-organization-schema.json** → Global (Head)
- **02-local-business-schema.json** → Global (Head)
- **03-faq-schema.json** → /new-faqs-page
- **04-how-to-schema.json** → /new-home-2, /new-contact-us-2
- **05-review-schema.json** → Global (Head)

### Service Type Schemas
- **01-insurance-csr-schema.json** → /new-insurance-costumer-representative
- **02-administrative-assistant-schema.json** → /new-administrative-assistant
- **03-customer-service-schema.json** → /new-costumber-service-representative
- **04-marketing-assistant-schema.json** → /new-merketing-assistant
- **05-virtual-receptionist-schema.json** → /new-virtual-receptionist
- **06-transaction-coordinator-schema.json** → /new-transaction-coordinator
- **07-sdr-schema.json** → /new-sales-development-and-inside-sales
- **08-general-va-schema.json** → /new-general-virtual-assistant

### Industry Schemas
- **01-insurance-industry-schema.json** → /new-insurance-virtual-assistant
- **02-real-estate-industry-schema.json** → /new-real-state
- **03-small-business-industry-schema.json** → /new-small-business
- **04-ecommerce-industry-schema.json** → /new-ecommerce
- **05-finance-industry-schema.json** → /new-finance
- **06-property-management-industry-schema.json** → /new-property-management
- **07-healthcare-industry-schema.json** → /new-healthcare
- **08-hr-industry-schema.json** → /new-hr
- **09-technology-industry-schema.json** → /new-technology
- **10-mortgage-industry-schema.json** → /new-mortgage-and-lending

## Validación

Después de implementar los schemas, valida con:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Yoast SEO**: https://yoast.com/

## Beneficios SEO

✅ **Rich Snippets**: Mejora la apariencia en resultados de búsqueda
✅ **Knowledge Graph**: Ayuda a Google a entender tu negocio
✅ **Voice Search**: Optimiza para búsquedas por voz
✅ **Local SEO**: Mejora visibilidad local
✅ **CTR**: Aumenta el click-through rate en SERPs

## Notas Importantes

- Los schemas están optimizados para Ocean VA
- Actualiza URLs y datos según sea necesario
- Revisa regularmente la validación de schemas
- Mantén los datos consistentes entre el sitio y los schemas
