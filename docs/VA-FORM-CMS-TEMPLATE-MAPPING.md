# VA Form → CMS → Template Mapping

**Fecha**: 2025-01-XX  
**Objetivo**: Validar que la data del formulario sea apta para crear templates dinámicos de Webflow

---

## 🎯 RESUMEN EJECUTIVO

Este documento mapea:
1. **Campos del Formulario** → **Campos del CMS** → **Componentes HTML (Card & Profile)**
2. Validación de campos necesarios vs disponibles
3. Puntos de entrada dinámicos en Webflow

---

## 📊 ESTRUCTURA: CARD vs PROFILE PAGE

### CARD (Páginas de Categoría)
**Template**: `204-va-card-premium.html`

### PROFILE PAGE (Página Individual)
**Template**: `309-andrea-profile.html`, `310-maximiliano-profile.html`, `312-aron-profile-2.html`

---

## 🔍 MAPEO COMPLETO: FORM → CMS → TEMPLATE

### 1. CARD - Información Básica

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| Imagen del VA | `.va-card-image-premium img` | `image` | Image | `image` | ✅ OK |
| Badge Disponibilidad | `.va-availability-badge-premium` | `availability` | PlainText | `availability` | ✅ OK |
| Nombre | `.va-card-name-premium` | `name` | PlainText | `name` | ✅ OK |
| Rol/Título | `.va-card-role-premium` | `title` | PlainText | `title` | ✅ OK |
| Experiencia | `.va-info-value-premium` (📅) | `experience-years` | PlainText | `experienceYears` | ✅ OK |
| Idioma | `.va-info-value-premium` (🌐) | `languages` | PlainText | `language` | ✅ OK |
| Especializaciones | `.va-tag-premium` | `specialization` | Multi-Reference | ❌ No en form (usar `main-category`) | ⚠️ REVISAR |
| Link Perfil | `.va-btn-primary-premium` href | `profile-slug` | Link | `slug` (auto-generado) | ✅ OK |
| Botón Video | `.va-btn-secondary-premium` | `video-url` | Video/Link | `video` | ✅ OK |

**NOTA CARD**: La card usa `specialization` (Multi-Reference), pero el formulario no tiene campo directo. Usar `main-category` o generar desde `skills-tags`.

---

### 2. PROFILE PAGE - Hero Section

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| Imagen del VA | `.va-image-frame img` | `image` | Image | `image` | ✅ OK |
| Nombre | `.va-profile-name` | `name` | PlainText | `name` | ✅ OK |
| Título | `.va-title` | `title` | PlainText | `title` | ✅ OK |
| Resumen | `.va-summary` | `summary` | RichText | `summary` | ✅ OK |
| Skills Tags | `.va-skill-tag` | `skills-richtext` | RichText | `skills` (genera HTML) | ✅ OK |

**HTML Generado para Skills**:
```html
<div class="va-skills-container">
  <span class="va-skill-tag">Skill 1</span>
  <span class="va-skill-tag">Skill 2</span>
</div>
```
**Campo del Form**: `skills` (comma-separated) → Genera `skills-richtext` (HTML)

---

### 3. PROFILE PAGE - Tools, Equipment & Video

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| Tools List | `.va-tools-list .va-tool-item` | `tools-richtext` | RichText | `tools` (genera HTML) | ✅ OK |
| Equipment List | `.va-equipment-list .va-equipment-item` | `equipment-richtext` | RichText | `equipment[]` (genera HTML) | ✅ OK |
| Video Thumbnail | `.va-video-container` style | `video-thumbnail` | PlainText | ❌ No en form | ⚠️ FALTA |
| Video Modal | `iframe` src | `video-url` | Video/Link | `video` | ✅ OK |
| Video ID | `onclick` handler | Extraído de `video-url` | N/A | `video` | ✅ OK |

**HTML Generado para Tools**:
```html
<div class="va-tools-list">
  <div class="va-tool-item">
    <span class="va-tool-checkmark">✓</span>
    <span>Tool Name</span>
  </div>
</div>
```

**HTML Generado para Equipment**:
```html
<div class="va-equipment-list">
  <div class="va-equipment-item">
    <svg class="va-equipment-icon">...</svg>
    <span>Equipment Name</span>
  </div>
</div>
```

**⚠️ PROBLEMA**: `video-thumbnail` no está en el formulario. Se necesita extraer de YouTube URL o añadir campo.

---

### 4. PROFILE PAGE - Thumbnail & Tagline

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| Thumbnail Text | `.va-thumbnail-text` | `thumbnail-description` | PlainText | `thumbnailDescription` | ✅ OK |
| Tagline | `.va-tagline-text` | `tagline` | PlainText | `tagline` | ✅ OK |

---

### 5. PROFILE PAGE - Employment Section

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| Employment Summary | `.va-employment-summary` | `employment-summary` | PlainText | `employmentSummary` | ✅ OK |
| Employment History | `.va-employment-accordion` | `employment-richtext` | RichText | `employmentEntries[]` (genera HTML) | ✅ OK |

**HTML Generado para Employment**:
```html
<div class="va-employment-accordion">
  <div class="va-employment-accordion-header">
    <h4 class="va-employment-accordion-company">Company</h4>
    <p class="va-employment-accordion-position">Position</p>
    <p class="va-employment-accordion-period">Period</p>
  </div>
  <div class="va-employment-accordion-content">
    <p class="va-employment-accordion-description">Description</p>
  </div>
</div>
```

**Campo del Form**: `employmentEntries` (array) → Genera `employment-richtext` (HTML)

---

### 6. PROFILE PAGE - Education Section

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| Education Items | `.va-education-item` | `education-richtext` | RichText | `educationEntries[]` (genera HTML) | ✅ OK |

**HTML Generado para Education**:
```html
<div class="va-education-item">
  <h3 class="va-education-school">School</h3>
  <p class="va-education-degree">Degree</p>
  <p class="va-education-year">Year</p>
</div>
```

**Campo del Form**: `educationEntries` (array) → Genera `education-richtext` (HTML)

---

### 7. PROFILE PAGE - Assessment Results

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| DISC Badge | `.va-disc-badge` | `disc-type-2` | Option | `discType` | ✅ OK |
| DISC Description | `.va-disc-description` | `disc-description` | RichText | `discDescription` | ✅ OK |
| English Test Type | `.va-english-container h3` | `type-of-english-test` | PlainText | `englishTestType` | ✅ OK |
| English Score | `.va-english-score` | `english-score-3` | PlainText | `englishScore` | ✅ OK |
| English Description | `.va-english-description` | `english-description` | RichText | `englishDescription` | ✅ OK |

---

### 8. PROFILE PAGE - CEFR Grid

| **HTML Component** | **Template Class/ID** | **CMS Field** | **Field Type** | **Form Field** | **Estado** |
|-------------------|----------------------|---------------|----------------|----------------|------------|
| CEFR Grid | `.va-cefr-grid` | `cerf-result` | RichText | `cefrResult` (radio) → genera HTML | ✅ OK |

**HTML Generado para CEFR**:
```html
<div class="va-cefr-grid">
  <div class="va-cefr-item">
    <div class="va-cefr-bubble va-cefr-bubble-active">C1</div>
    <p class="va-cefr-description">Description...</p>
  </div>
  <!-- ... más niveles -->
</div>
```

**Campo del Form**: `cefrResult` (radio: A1-C2) → Genera `englishCefrHtml` → Envía como `cerf-result`

---

## ✅ VALIDACIÓN DE CAMPOS

### Campos Requeridos para CARD

| Campo | Requerido | En CMS | En Form | Estado |
|-------|-----------|--------|---------|--------|
| `name` | ✅ | ✅ | ✅ | ✅ OK |
| `title` | ⚠️ | ✅ | ✅ | ✅ OK |
| `image` | ✅ | ✅ | ✅ | ✅ OK |
| `availability` | ✅ | ✅ | ✅ | ✅ OK |
| `experience-years` | ⚠️ | ✅ | ✅ | ✅ OK |
| `languages` | ⚠️ | ✅ | ✅ | ✅ OK |
| `specialization` | ⚠️ | ✅ | ❌ | ⚠️ REVISAR |
| `slug` | ✅ | ✅ | ✅ (auto) | ✅ OK |
| `video-url` | ❌ | ✅ | ✅ | ✅ OK |

**⚠️ ISSUE**: Card necesita `specialization` (Multi-Reference), pero el form no lo envía. Opciones:
- Usar `main-category` como fallback
- Generar desde `skills-tags`
- Añadir campo `specialization` al form

---

### Campos Requeridos para PROFILE PAGE

| Campo | Requerido | En CMS | En Form | Estado |
|-------|-----------|--------|---------|--------|
| `name` | ✅ | ✅ | ✅ | ✅ OK |
| `title` | ✅ | ✅ | ✅ | ✅ OK |
| `summary` | ✅ | ✅ | ✅ | ✅ OK |
| `tagline` | ✅ | ✅ | ✅ | ✅ OK |
| `thumbnail-description` | ⚠️ | ✅ | ✅ | ✅ OK |
| `image` | ✅ | ✅ | ✅ | ✅ OK |
| `video-url` | ⚠️ | ✅ | ✅ | ✅ OK |
| `video-thumbnail` | ⚠️ | ✅ | ❌ | ⚠️ FALTA |
| `skills-richtext` | ⚠️ | ✅ | ✅ (gen) | ✅ OK |
| `tools-richtext` | ⚠️ | ✅ | ✅ (gen) | ✅ OK |
| `equipment-richtext` | ⚠️ | ✅ | ✅ (gen) | ✅ OK |
| `employment-summary` | ⚠️ | ✅ | ✅ | ✅ OK |
| `employment-richtext` | ⚠️ | ✅ | ✅ (gen) | ✅ OK |
| `education-richtext` | ⚠️ | ✅ | ✅ (gen) | ✅ OK |
| `disc-type-2` | ⚠️ | ✅ | ✅ | ✅ OK |
| `disc-description` | ⚠️ | ✅ | ✅ | ✅ OK |
| `type-of-english-test` | ⚠️ | ✅ | ✅ | ✅ OK |
| `english-score-3` | ⚠️ | ✅ | ✅ | ✅ OK |
| `english-description` | ⚠️ | ✅ | ✅ | ✅ OK |
| `cerf-result` | ⚠️ | ✅ | ✅ (gen) | ✅ OK |

**⚠️ ISSUE**: `video-thumbnail` no está en el form. Webflow puede generar automáticamente desde `video-url` o necesitamos añadir campo.

---

## 📋 PUNTOS DE ENTRADA DINÁMICOS EN WEBFLOW

### Para CARD Template

```html
<!-- Dynamic Fields en Webflow Designer -->
<div class="va-card-premium">
  <img src="{{va-image.url}}" alt="{{name}}" />
  <span>{{availability}}</span>
  <h3>{{name}}</h3>
  <div>{{title}}</div>
  <div>{{experience-years}}</div>
  <div>{{languages}}</div>
  <!-- Specialization: Multi-reference field loop -->
  {{#specialization}}
    <span>{{name}}</span>
  {{/specialization}}
  <a href="/{{slug}}">View Profile</a>
</div>
```

---

### Para PROFILE PAGE Template

```html
<!-- Hero Section -->
<img src="{{image.url}}" />
<h1>{{name}}</h1>
<p>{{title}}</p>
<div>{{summary}}</div>
<div>{{skills-richtext}}</div>

<!-- Tools, Equipment, Video -->
<div>{{tools-richtext}}</div>
<div>{{equipment-richtext}}</div>
<div style="background-image: url('{{video-thumbnail}}')">
  <!-- Video modal with {{video-url}} -->
</div>

<!-- Thumbnail & Tagline -->
<p>{{thumbnail-description}}</p>
<p>{{tagline}}</p>

<!-- Employment -->
<p>{{employment-summary}}</p>
<div>{{employment-richtext}}</div>

<!-- Education -->
<div>{{education-richtext}}</div>

<!-- Assessment Results -->
<div>{{disc-type-2}}</div>
<div>{{disc-description}}</div>
<div>{{type-of-english-test}}</div>
<div>{{english-score-3}}</div>
<div>{{english-description}}</div>

<!-- CEFR Grid -->
<div>{{cerf-result}}</div>
```

---

## 🎯 RECOMENDACIONES

### 1. Campos Faltantes

- **`video-thumbnail`**: Añadir al formulario o generar automáticamente desde YouTube URL
  - Opción: Extraer de `https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg`
  
- **`specialization`** (Multi-Reference): 
  - Opción A: Usar `main-category` como fallback en card
  - Opción B: Añadir campo `specialization` al form
  - Opción C: Generar desde `skills-tags` (parsing)

### 2. Validaciones Necesarias

- **RichText Fields**: Validar que el HTML generado sea válido
- **Image URLs**: Validar formato Webflow CDN o URL válida
- **Video URLs**: Validar formato YouTube (`youtu.be` o `youtube.com`)
- **Slug**: Validar unicidad y formato slug válido

### 3. Template Webflow

- Crear **Collection Template** para Profile Pages
- Usar **Rich Text Elements** para campos HTML generados
- Usar **Conditional Visibility** si algún campo es opcional
- Configurar **Dynamic Links** para `profile-slug`

---

## ✅ CONCLUSIÓN

### Estado General: 🟢 APTO (con ajustes menores)

**Campos del Formulario → CMS → Templates**: ✅ **95% ALINEADOS**

**Problemas Identificados**:
1. ⚠️ `video-thumbnail` no está en form (fácil de generar)
2. ⚠️ `specialization` no está en form (usar fallback)

**Acciones Requeridas**:
1. ✅ Añadir generación de `video-thumbnail` en form o backend
2. ✅ Usar `main-category` como fallback para `specialization` en cards
3. ✅ Validar HTML generado antes de enviar al CMS

**Próximos Pasos**:
1. Crear template dinámico en Webflow Designer
2. Mapear campos CMS a elementos HTML
3. Probar con un VA de prueba desde el form
4. Ajustar formato de campos si es necesario

---

## 📝 NOTAS ADICIONALES

### Generación de Video Thumbnail

Si el `video-url` es `https://youtu.be/VIDEO_ID` o `https://www.youtube.com/watch?v=VIDEO_ID`:
```
video-thumbnail = https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg
```

### Generación de Specialization para Card

Si no hay `specialization` Multi-Reference:
```
specialization = main-category || skills-tags (first 3) || "Insurance Virtual Assistant"
```

---

**Última actualización**: 2025-01-XX