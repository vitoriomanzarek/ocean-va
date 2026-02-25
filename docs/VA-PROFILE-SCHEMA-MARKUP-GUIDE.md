# VA Profile Schema Markup - Dynamic Template Guide

**Date**: January 2025  
**Status**: ✅ READY TO USE  
**File**: `webflow-components/va-profile-schema-markup-dynamic.html`

---

## 📋 OVERVIEW

Este schema markup dinámico genera automáticamente el JSON-LD structured data para cada perfil de VA, conectándose directamente a los campos del CMS de Webflow.

**Beneficios:**
- ✅ Mejora SEO con structured data
- ✅ Permite que Google muestre rich snippets
- ✅ Conectado automáticamente a los campos CMS
- ✅ Se actualiza automáticamente cuando cambian los datos

---

## 🚀 INSTALACIÓN

### Opción 1: Incluir en el Template Dinámico (Recomendado)

1. Abre el **Collection Template** de "Virtual Assistants" en Webflow Designer
2. Ve a **Settings > Custom Code > Head Code**
3. Copia el contenido completo de `va-profile-schema-markup-dynamic.html`
4. Pégalo en el campo "Head Code"
5. Guarda y publica

### Opción 2: Incluir antes del cierre de </body>

1. En el template dinámico, antes del cierre de `</body>`
2. Copia el contenido de `va-profile-schema-markup-dynamic.html`
3. Pégalo antes de `</body>`

---

## 📊 CAMPOS CMS REQUERIDOS

El schema markup utiliza los siguientes campos del CMS:

| Campo CMS | Slug | Tipo | Uso en Schema |
|-----------|------|------|---------------|
| Name | `name` | Plain Text | `name` |
| Title | `title` | Plain Text | `jobTitle` |
| Profile Slug | `profile-slug-2` | Plain Text | Construye `url` |
| Summary | `summary` | Rich Text | Construye `description` |
| Experience Years | `experience-years` | Plain Text | Construye `description` |
| Languages | `languages` | Plain Text | Construye `description` |
| Image | `image` | Image | `image` |
| Video | `video` | Link/Plain Text | `sameAs` |
| Skills | `skills-richtext` | Rich Text | Construye `knowsAbout` |

---

## 🔧 FUNCIONAMIENTO

### Versión JavaScript Dinámica (ÚNICA VERSIÓN)

**IMPORTANTE:** El archivo ahora contiene SOLO la versión JavaScript dinámica. Se eliminó el schema estático para evitar duplicados que Google rechaza.

La versión JavaScript incluida en el archivo:

1. **Extrae datos del DOM**: Busca elementos con clases específicas (`.va-profile-name`, `.va-summary`, etc.)
2. **Construye la descripción**: Combina name, title, experience, languages y summary
3. **Extrae specializations**: Desde `.va-skills-container` para construir `knowsAbout`
4. **Obtiene imagen y video**: Desde elementos del DOM o campos CMS
5. **Genera el schema**: Crea el JSON-LD y lo inserta en el `<head>`

**Ventajas:**
- ✅ Funciona con campos Rich Text
- ✅ Extrae specializations desde skills tags
- ✅ Maneja casos donde campos pueden estar vacíos
- ✅ Más flexible y robusto
- ✅ **Elimina schemas duplicados automáticamente**
- ✅ **Valida URLs antes de incluirlas (evita URLs mal formadas)**
- ✅ **Valida que no haya placeholders en campos requeridos**
- ✅ **Maneja correctamente profile-slug-2 cuando es URL completa o solo slug**

---

## 📝 EJEMPLO DE SALIDA

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rafael",
  "jobTitle": "Insurance Virtual Assistant",
  "url": "https://www.oceanvirtualassistant.com/rafael",
  "description": "Rafael is a Insurance Virtual Assistant. with 6 years of experience. fluent in English. Rafael gained over 6 years of insurance experience through multiple roles...",
  "image": "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/691cfec785ed2c3e7044c906_Rafael.webp",
  "worksFor": {
    "@type": "Organization",
    "name": "Ocean Virtual Assistant",
    "url": "https://www.oceanvirtualassistant.com"
  },
  "sameAs": [
    "https://youtu.be/S19B0sRiohI"
  ],
  "knowsAbout": [
    "personal-lines",
    "health-insurance",
    "policy-servicing",
    "renewals"
  ]
}
```

---

## 🧪 VERIFICACIÓN

### 1. Google Rich Results Test
- URL: https://search.google.com/test/rich-results
- Ingresa la URL del perfil de un VA
- Verifica que el schema Person aparezca correctamente

### 2. Schema.org Validator
- URL: https://validator.schema.org/
- Ingresa la URL del perfil
- Verifica que no haya errores

### 3. Verificar en el código fuente
- Abre la página del perfil
- View Source (Ctrl+U o Cmd+U)
- Busca `<script type="application/ld+json">`
- Verifica que el JSON sea válido

---

## 🔍 DEBUGGING

### Problema: Schema no aparece
**Solución:**
- Verifica que el código esté en Head Code o antes de `</body>`
- Revisa la consola del navegador para errores JavaScript
- Asegúrate de que los campos CMS estén correctamente nombrados
- **IMPORTANTE:** Elimina cualquier schema estático que pueda estar duplicado en el template

### Problema: Campos vacíos
**Solución:**
- Verifica que los campos existan en el CMS
- Revisa que los slugs de los campos sean correctos
- Usa la versión JavaScript que extrae del DOM como fallback

### Problema: Specializations no aparecen
**Solución:**
- La versión JavaScript extrae specializations desde `.va-skills-container`
- Asegúrate de que el contenedor de skills tenga la clase correcta
- Verifica que los skill tags tengan la clase `.va-skill-tag`

### Problema: Google Rich Results Test muestra "No items detected"
**Solución:**
- **Verifica que NO haya schemas duplicados** - El script elimina automáticamente schemas anteriores, pero si hay un schema estático en otro lugar del template, elimínalo manualmente
- **Verifica la URL del perfil** - Asegúrate de que `profile-slug-2` no esté generando URLs duplicadas (ej: `https://.../https://...`)
- **Espera 24-48 horas** - Google puede tardar en re-indexar después de cambios
- **Solicita re-indexación** en Google Search Console si es necesario

---

## 📚 REFERENCIAS

- [Schema.org Person](https://schema.org/Person)
- [Google Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Webflow CMS Fields](https://university.webflow.com/lesson/cms-fields)

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Copiar código de `va-profile-schema-markup-dynamic.html`
- [ ] Agregar a Head Code del Collection Template
- [ ] Verificar que todos los campos CMS existan
- [ ] Probar con un perfil de VA
- [ ] Verificar con Google Rich Results Test
- [ ] Verificar con Schema.org Validator
- [ ] Publicar y verificar en producción

---

## 🔄 ACTUALIZACIONES FUTURAS

Posibles mejoras:
- Agregar soporte para `alumniOf` (Education)
- Agregar `hasOccupation` con más detalles
- Incluir `award` si hay certificaciones
- Agregar `knowsLanguage` para idiomas específicos
