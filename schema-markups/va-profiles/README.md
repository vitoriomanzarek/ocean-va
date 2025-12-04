# VA Profile Schema Markups

Este directorio contiene todos los schema markups (JSON-LD) para las páginas de perfiles de Virtual Assistants.

## 📁 Estructura

```
va-profiles/
├── categories/                    # Schemas para páginas de categorías
│   ├── 01-insurance-va-category-schema.html
│   ├── 02-executive-admin-va-category-schema.html
│   ├── 03-mortgage-processing-va-category-schema.html
│   └── 04-healthcare-va-category-schema.html
├── individual/                    # Schemas para perfiles individuales de VAs
│   ├── 001-adrian-va-profile-schema.html
│   ├── 002-alejandro-va-profile-schema.html
│   └── ... (82 archivos en total)
├── MASTER-ALL-VA-SCHEMAS.html     # Archivo maestro con TODOS los schemas
└── README.md                      # Este archivo
```

## 📊 Resumen

- **4 Páginas de Categorías:**
  - Insurance Virtual Assistant
  - Executive Administrative Virtual Assistant
  - Mortgage Processing Assistant
  - Medical Assistant Specialist (Healthcare)

- **82 Perfiles Individuales de VAs:**
  - Todos los VAs excepto Licensed Insurance Agents (28 excluidos)
  - Cada schema incluye: nombre, título, descripción, imagen, especialización, experiencia, idiomas

## 🚀 Cómo Usar en Webflow

### ⚠️ IMPORTANTE: NO uses el archivo MASTER completo

El archivo `MASTER-ALL-VA-SCHEMAS.html` tiene **~73KB** y NO debe agregarse completo en el header global porque:
- ⏱️ Afecta negativamente el tiempo de carga
- 🔍 Google prefiere schemas específicos por página
- 📊 Carga innecesaria de datos en todas las páginas

**👉 Ver `IMPLEMENTATION-GUIDE.md` para la mejor práctica recomendada.**

### ✅ Opción Recomendada: Schemas Individuales por Página

#### Para Páginas de Categorías:

1. Abre el archivo correspondiente en `categories/`
2. Copia el contenido del `<script>`
3. En Webflow, abre la página de categoría específica
4. Ve a **Page Settings** → **Custom Code** → **Head Code**
5. Pega el schema

#### Para Perfiles Individuales de VAs:

1. Abre el archivo correspondiente en `individual/`
2. Copia el contenido del `<script>`
3. En Webflow, abre la página del perfil del VA
4. Ve a **Page Settings** → **Custom Code** → **Head Code**
5. Pega el schema

### Opción 3: Implementación Dinámica (Para sitios con CMS)

Si estás usando Webflow CMS para los perfiles de VAs, puedes:

1. Crear un campo de texto enriquecido o código personalizado en el CMS
2. Usar el schema correspondiente como plantilla
3. Reemplazar valores dinámicos con campos del CMS usando Webflow's custom code

## 📝 Formato de los Schemas

### Schema de Categoría (Service)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Insurance Virtual Assistant",
  "url": "https://www.oceanvirtualassistant.com/ovas-insurance-virtual-assistant",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "Ocean Virtual Assistant"
  }
}
```

### Schema de VA Individual (Person)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adrian",
  "jobTitle": "Insurance Virtual Assistant",
  "url": "https://www.oceanvirtualassistant.com/adrian-ocean-va-profile",
  "description": "...",
  "image": "...",
  "worksFor": {
    "@type": "Organization",
    "name": "Ocean Virtual Assistant"
  }
}
```

## ✅ Beneficios SEO

Estos schemas ayudan a:

- **Rich Snippets:** Mejorar la apariencia en resultados de búsqueda
- **Knowledge Graph:** Ayudar a Google a entender la estructura de tu sitio
- **Local SEO:** Mejorar visibilidad para búsquedas locales
- **Voice Search:** Optimizar para búsquedas por voz
- **Featured Snippets:** Aumentar posibilidades de aparecer en snippets destacados

## 🔍 Verificación

Después de implementar, verifica los schemas usando:

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema.org Validator:** https://validator.schema.org/
3. **Google Search Console:** Revisa "Enhancements" después de unos días

## 📅 Última Actualización

- **Fecha:** 2025-01-21
- **Total VAs en Base de Datos:** 110
- **VAs Incluidos:** 82 (excluyendo 28 Licensed Insurance Agents)
- **Categorías:** 4

## 🔄 Actualización de Schemas

Para regenerar los schemas cuando se agreguen nuevos VAs:

1. Actualiza el CSV: `src/data/VAs Database - VA Merged with licenced VA.csv`
2. Ejecuta: `python generate_va_schemas.py`
3. Ejecuta: `python generate_html_schemas.py`
4. Los nuevos archivos se generarán automáticamente

## 📞 Soporte

Si necesitas ayuda con la implementación o tienes preguntas sobre los schemas, consulta la documentación de Schema.org: https://schema.org/

