# VA Creation Form – Mapeo de campos (para cruce con Manatal)

Referencia de todos los campos del formulario "Add New Virtual Assistant", sus nombres técnicos y destino en Webflow CMS, para identificar equivalencias en Manatal.

---

## Resumen por sección

| Sección en el formulario | Campos |
|--------------------------|--------|
| Basic Information        | name, mainCategory, experienceYears, language, availability, image, video |
| Content                  | summary, tagline, thumbnailDescription |
| Skills, Tools & Equipment| skills, tools, equipment |
| Employment History       | employment-richtext (HTML) |
| Education                | education-richtext (HTML) |
| DISC Assessment          | discType, discDescription |
| English Proficiency      | englishScore, englishDescription, englishCefrHtml |
| Specializations          | (gestión en CMS después de crear; no se envía desde el form) |

---

## Mapeo completo: Form → Webflow CMS

| # | Label en formulario     | Nombre en formulario (name/camelCase) | Slug en Webflow CMS   | Tipo dato / formato | Requerido | Notas para Manatal |
|---|-------------------------|--------------------------------------|------------------------|---------------------|-----------|---------------------|
| 1 | Name                    | `name`                               | `name`                 | Texto               | Sí        | Nombre completo del candidato/VA. |
| 2 | (auto)                  | `slug`                               | `slug`                 | Texto (URL-friendly)| Sí*       | Generado desde name (minúsculas, sin acentos, espacios → guiones). Único en CMS. |
| 3 | Main Category            | `mainCategory`                       | `main-category` (texto) + `main-categories` (multi-reference IDs) | Texto + refs        | No        | Rol/categoría principal. Valores: Executive Virtual Assistant, Healthcare VA, Insurance VA, Marketing VA, Mortgage Specialist, Real Estate VA. |
| 4 | Experience (Years)       | `experienceYears`                    | `experience-years`     | Texto               | No        | Ej: "5+ years". |
| 5 | Language                | `language`                           | `languages` (PlainText) + `lenguage` (Option)** | Texto               | No        | Valores en form: "Bilingual (EN-ES)", "English". |
| 6 | Availability            | `availability`                       | `availability`         | Texto / Option      | No        | Valores: Full Time, Part Time, Assigned. |
| 7 | Image URL               | `image`                              | `image`                | URL (Image)         | No        | URL de la foto de perfil del VA. |
| 8 | Video URL               | `video`                              | `video`                | URL                 | No        | YouTube u otra URL de video. |
| 9 | (auto)                  | —                                    | `video-thumbnail-2`    | URL                 | No        | Generado desde Video URL (thumbnail de YouTube). No suele enviarse desde Manatal. |
| 10| Summary                 | `summary`                             | `summary`              | Rich text           | Sí        | Resumen largo: experiencia, habilidades, background. |
| 11| Tagline                 | `tagline`                            | `tagline`             | Texto               | Sí        | Frase corta (ej: "Expert Insurance Virtual Assistant"). En Webflow también se usa `title-2` para rol/título. |
| 12| Thumbnail Description   | `thumbnailDescription`               | `thumbnail-description`| Texto               | No        | Descripción breve para la tarjeta en listing. |
| 13| Skills                  | `skills`                             | `skills-tags`          | Texto (comma-separated) | No   | Ej: "Customer Service, Sales, Data Entry". |
| 14| Tools & Platforms       | `tools`                              | `tools-tags`           | Texto (comma-separated) | No   | Ej: "Asana, Monday.com, Slack". |
| 15| Equipment               | `equipment`                          | `equipment-tags`       | Texto (comma-separated) | No   | Ej: "Laptop, Headset, Monitor". |
| 16| Employment History      | `employment-richtext`                | `employment-richtext`  | Rich text (HTML)    | No        | Historial de empleos en HTML (lista/accordion). Varios empleos en un solo bloque. |
| 17| Education               | `education-richtext`                 | `education-richtext`   | Rich text (HTML)    | No        | Historial de estudios en HTML. Varias entradas en un solo bloque. |
| 18| DISC Type               | `discType`                           | `disc-type-2`          | Option              | No        | Valores: D, I, S, C, D+C, C+D, C+S, D+I, I+D, I+S, S+C, S+D, S+I. |
| 19| DISC Description        | `discDescription`                    | `disc-description`     | Rich text           | No        | Descripción del perfil DISC. |
| 20| English Score           | `englishScore`                       | `english-score-3`      | Texto / Option      | No        | CEFR: A1, A2, B1, B2, C1, C2. |
| 21| English Description     | `englishDescription`                 | `english-description`  | Rich text           | No        | Descripción del nivel de inglés. |
| 22| (CEFR HTML)             | `englishCefrHtml` / `english-cefr-html` | `cerf-result`       | Rich text (HTML)    | No        | Bloque HTML con resultado CEFR (si lo generáis en el form). |

\* El backend genera `slug` si no se envía.  
\** En Webflow existe un campo Option con typo `lenguage`; el form envía el mismo valor a `languages` (PlainText) y a ese Option.

---

## Campos que no envía el formulario (solo CMS)

- **Specializations**: multi-reference en Webflow; se gestiona después de crear el VA en el CMS (no hay campo en el form).
- **Profile slug / URL**: en Webflow es `profile-slug-2` (link); el form no lo rellena; puede derivarse de `slug` o de la URL del perfil.

---

## Valores enumerados (para alinear con Manatal)

### Main Category (mainCategory)
- Executive Virtual Assistant  
- Healthcare Virtual Assistant  
- Insurance Virtual Assistant  
- Marketing Virtual Assistant  
- Mortgage Specialist  
- Real Estate Virtual Assistant  

### Language (language)
- Bilingual (EN-ES)  
- English  

### Availability (availability)
- Full Time  
- Part Time  
- Assigned  

### DISC Type (discType)
- D, I, S, C  
- D+C, C+D, C+S, D+I, I+D, I+S, S+C, S+D, S+I  

### English Score (englishScore)
- A1 (Beginner), A2 (Elementary), B1 (Intermediate), B2 (Upper-Intermediate), C1 (Advanced), C2 (Proficient)  

---

## Cómo usar este mapeo con Manatal

1. **Identificar en Manatal** el campo equivalente a cada “Nombre en formulario” o “Label” (ej: nombre candidato, rol, años experiencia, idiomas, disponibilidad, resumen, habilidades, historial laboral, educación, DISC, nivel de inglés).
2. **Definir reglas de transformación** si los valores no coinciden (ej: Manatal “Job Type” → nuestro `availability`; “Category” → `mainCategory`).
3. **Campos compuestos**: Employment y Education en nuestro form son **un solo HTML por sección**. En Manatal suelen ser listas de ítems (empleos, estudios). Habrá que generar el HTML (o un texto estructurado) a partir de esos ítems para rellenar `employment-richtext` y `education-richtext`.
4. **Requeridos para crear VA**: en nuestro backend son obligatorios `name`, `summary` y `tagline`; el `slug` se puede generar desde el nombre. Asegurar que el flujo Manatal → nuestro form/API envíe al menos esos tres.

Si quieres, el siguiente paso puede ser una tabla “Manatal field → VA form field” con los nombres exactos de los campos de Manatal que vayas a usar.
