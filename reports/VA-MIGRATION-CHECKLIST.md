# Checklist de Migración de Perfiles VA - Old vs New

**Fecha:** 2026-01-22  
**Modelo de Referencia:** Drue  
**Objetivo:** Igualar todos los perfiles de VA a la estructura del modelo Drue

---

## 📊 RESUMEN EJECUTIVO

- **Total de Perfiles:** 101
- **URLs Old:** `/{name}-ocean-va-profile`
- **URLs New:** `/virtual-assistants/{slug}`
- **Campos en Template:** 21
- **Campos en CMS:** 33
- **Campos en Drue (populados):** 31

---

## ✅ CHECKLIST DE VERIFICACIÓN

### 1. VERIFICACIÓN DE URLs

#### URLs que requieren atención especial:

| Nombre | Old URL | New URL | Tipo de Cambio | Acción Requerida |
|--------|---------|---------|----------------|------------------|
| Aaron | `aaron-ocean-va-profile` | `aaron-a0d16` | Tiene ID único | ✅ Verificar que funciona |
| Karl | `karl-ocean-va-profile` | `karl-bd0a3` | Tiene ID único | ✅ Verificar que funciona |
| Ximena | `ximena-ocean-va-profile` | `ximena-4e77d` | Tiene ID único | ✅ Verificar que funciona |
| Ana S | `ana-s-ocean-va-profile` | `ana` | Nombre acortado | ⚠️ Verificar que no hay conflicto con otra Ana |
| Brandon L | `brandon-l-ocean-va-profile` | `brandon` | Inicial removida | ⚠️ Verificar que no hay conflicto |
| Cherry Mae | `cherry-mae-ocean-va-profile` | `cherry` | Nombre acortado | ✅ OK |
| Ellen Rose | `ellen-rose-ocean-va-profile` | `ellen` | Nombre acortado | ✅ OK |
| Grace Carmel | `grace-carmel-ocean-va-profile` | `grace` | Nombre acortado | ✅ OK |
| Jay Alvin | `jay-alvin-ocean-va-profile` | `jay` | Nombre acortado | ✅ OK |
| Joji Marie | `joji-marie-ocean-va-profile` | `joji` | Nombre acortado | ✅ OK |
| Rona Mae | `rona-mae-ocean-va-profile` | `rona` | Nombre acortado | ✅ OK |
| Bernadette | `bernadette-ocean-va-profile` | `bernadette-abellana` | Apellido agregado | ✅ OK |
| Louise | `louise-ocean-va-profile` | `louise-a-siloterio` | Apellido agregado | ✅ OK |
| Vicente | `vicente-ocean-va-profile` | `vicente-penaflor` | Apellido agregado | ✅ OK |
| Ximena G | `ximena-g-ocean-va-profile` | `ximena` | Inicial removida | ⚠️ Verificar conflicto con otra Ximena |

#### URLs a verificar (status HTTP):

- [ ] Verificar todas las URLs old (101 URLs)
- [ ] Verificar todas las URLs new (101 URLs)
- [ ] Listar URLs rotas (si las hay)
- [ ] Implementar redirects de old a new (si es necesario)

**Script creado:** `scripts/check-urls-and-compare.js`

---

### 2. ESTRUCTURA DEL TEMPLATE vs CMS

#### Campos en Template (`313-va-profile-dynamic-template.html`):

1. ✅ `{{name}}` → CMS: `name` (PlainText)
2. ✅ `{{title}}` → CMS: `title-2` (PlainText)
3. ✅ `{{summary}}` → CMS: `summary` (RichText)
4. ✅ `{{skills-richtext}}` → CMS: `skills-richtext` (RichText)
5. ✅ `{{tools-richtext}}` → CMS: `tools-richtext` (RichText)
6. ✅ `{{equipment-richtext}}` → CMS: `equipment-richtext` (RichText)
7. ✅ `{{video-thumbnail}}` → CMS: `video-thumbnail-2` (PlainText)
8. ✅ `{{video-url}}` → CMS: `video` (Link)
9. ✅ `{{thumbnail-description}}` → CMS: `thumbnail-description` (PlainText)
10. ✅ `{{tagline}}` → CMS: `tagline` (PlainText)
11. ✅ `{{employment-summary}}` → CMS: `employment-summary` (PlainText)
12. ✅ `{{employment-richtext}}` → CMS: `employment-richtext` (RichText)
13. ✅ `{{disc-type-2}}` → CMS: `disc-type-2` (Option)
14. ✅ `{{disc-description}}` → CMS: `disc-description` (RichText)
15. ✅ `{{type-of-english-test}}` → CMS: `type-of-english-test` (PlainText)
16. ✅ `{{english-score-3}}` → CMS: `english-score-3` (PlainText)
17. ✅ `{{english-description}}` → CMS: `english-description` (RichText)
18. ✅ `{{cerf-result}}` → CMS: `cerf-result` (RichText)
19. ✅ `{{education-richtext}}` → CMS: `education-richtext` (RichText)
20. ✅ `{{image.url}}` → CMS: `image` (Image) - **Nota:** Template usa `image.url`, CMS tiene objeto `image` con `url`
21. ✅ `{{slug}}` → CMS: `slug` (PlainText)

#### Campos en CMS que NO están en Template:

1. ⚠️ `main-category` (PlainText) - No usado en template
2. ⚠️ `main-categories` (MultiReference) - No usado en template
3. ⚠️ `experience-years` (PlainText) - No usado en template
4. ⚠️ `languages` (PlainText) - No usado en template
5. ⚠️ `lenguage` (Option) - No usado en template
6. ⚠️ `availability` (PlainText) - No usado en template
7. ⚠️ `profile-slug-2` (Link) - No usado en template (es la URL old)
8. ⚠️ `specialization` (MultiReference) - No usado en template
9. ⚠️ `tools-tags` (PlainText) - No usado en template (solo se usa `tools-richtext`)
10. ⚠️ `equipment-tags` (PlainText) - No usado en template (solo se usa `equipment-richtext`)
11. ⚠️ `skills-tags` (PlainText) - No usado en template (solo se usa `skills-richtext`)
12. ⚠️ `english-level` (PlainText) - No usado en template

**Acción:** Verificar si estos campos deben agregarse al template o si son solo para metadata.

---

### 3. MODELO DRUE - ESTRUCTURA COMPLETA

#### Campos Populados en Drue (31 de 33):

**Información Básica:**
- ✅ `name`: "Drue"
- ✅ `slug`: "drue"
- ✅ `title-2`: "INSURANCE VIRTUAL ASSISTANT | PERSONAL LINES"
- ✅ `experience-years`: "2 years"
- ✅ `languages`: "English"
- ✅ `availability`: "Full Time"
- ✅ `main-category`: "Insurance Virtual Assistant"

**Imagen y Video:**
- ✅ `image`: Objeto con `url`, `fileId`, `alt`
- ✅ `video`: "https://youtu.be/wAn-WpR-5Jw"
- ✅ `video-thumbnail-2`: "https://img.youtube.com/vi/wAn-WpR-5Jw/sddefault.jpg"

**Contenido:**
- ✅ `summary`: Texto completo
- ✅ `tagline`: Texto completo
- ✅ `thumbnail-description`: "PERSONAL LINES INSURANCE, POLICY ENDORSEMENTS, HOME & AUTO QUOTING"

**Skills, Tools, Equipment:**
- ✅ `skills-tags`: Lista separada por comas
- ✅ `skills-richtext`: HTML formateado con `<span class="va-skill-tag">`
- ✅ `tools-tags`: Lista separada por comas
- ✅ `tools-richtext`: HTML formateado con estructura de lista
- ✅ `equipment-tags`: Lista separada por comas
- ✅ `equipment-richtext`: HTML formateado con SVG icons

**Empleo:**
- ✅ `employment-summary`: Texto completo
- ✅ `employment-richtext`: HTML con acordeones interactivos

**Educación:**
- ✅ `education-richtext`: HTML formateado

**Evaluaciones:**
- ✅ `disc-type-2`: ID de opción (S+I)
- ✅ `disc-description`: Texto formateado
- ✅ `type-of-english-test`: "EF English Test"
- ✅ `english-score-3`: "80/B1"
- ✅ `english-description`: Texto completo
- ✅ `cerf-result`: HTML con estructura de niveles CEFR

**Referencias:**
- ✅ `main-categories`: Array de IDs
- ✅ `specialization`: Array de IDs
- ✅ `profile-slug-2`: URL antigua

---

### 4. DIFERENCIAS ENTRE OLD Y NEW

#### Cambios en Estructura de URL:

**Patrón General:**
- **Old:** `/{name}-ocean-va-profile`
- **New:** `/virtual-assistants/{slug}`

**Casos Especiales:**
1. **IDs únicos agregados:** Aaron (`a0d16`), Karl (`bd0a3`), Ximena (`4e77d`)
2. **Nombres acortados:** Ana S → Ana, Brandon L → Brandon, Cherry Mae → Cherry, etc.
3. **Apellidos agregados:** Bernadette → Bernadette Abellana, Louise → Louise A Siloterio, Vicente → Vicente Penaflor

#### Cambios en Contenido:

**Verificar:**
- [ ] Todos los perfiles tienen `summary` completo
- [ ] Todos los perfiles tienen `tagline` completo
- [ ] Todos los perfiles tienen `employment-summary` y `employment-richtext`
- [ ] Todos los perfiles tienen `education-richtext`
- [ ] Todos los perfiles tienen datos de DISC (`disc-type-2`, `disc-description`)
- [ ] Todos los perfiles tienen datos de inglés (`type-of-english-test`, `english-score-3`, `english-description`, `cerf-result`)
- [ ] Todos los perfiles tienen `skills-richtext`, `tools-richtext`, `equipment-richtext` formateados correctamente
- [ ] Todos los perfiles tienen `image` con URL válida
- [ ] Todos los perfiles tienen `video` y `video-thumbnail-2`

---

### 5. COMPONENTE MINIFICADO vs PÁGINAS REALES

#### Archivo: `webflow-components-minified/313-va-profile-dynamic-template.html`

**Estructura del Template:**
- ✅ Estilos CSS inline completos
- ✅ Sección Hero (imagen + info)
- ✅ Sección Tools/Equipment/Video
- ✅ Sección Employment
- ✅ Sección Assessment Results (DISC + English)
- ✅ Sección CEFR
- ✅ Sección Education
- ✅ Script para video modal

**Verificaciones:**
- [ ] Comparar template con página real de Drue (old)
- [ ] Comparar template con página real de Drue (new)
- [ ] Verificar que todas las clases CSS coinciden
- [ ] Verificar que todos los placeholders `{{field}}` tienen datos en CMS
- [ ] Verificar que el script de video funciona correctamente

**Acciones si hay diferencias:**
- Si el template no coincide con la página real → **Actualizar el template**
- Si faltan campos en el template → **Agregar campos al template**
- Si sobran campos en el template → **Verificar si deben eliminarse o si faltan en CMS**

---

### 6. CHECKLIST DE IMPLEMENTACIÓN

#### Fase 1: Verificación
- [ ] Ejecutar script de verificación de URLs
- [ ] Listar URLs rotas
- [ ] Comparar template con páginas reales
- [ ] Verificar que todos los campos de Drue están en todos los VAs

#### Fase 2: Corrección de URLs
- [ ] Arreglar URLs rotas (si las hay)
- [ ] Implementar redirects de old a new (si es necesario)
- [ ] Verificar conflictos de nombres (Ana, Brandon, Ximena)

#### Fase 3: Actualización de Datos CMS
- [ ] Verificar que todos los VAs tienen todos los campos requeridos
- [ ] Completar campos faltantes usando modelo de Drue como referencia
- [ ] Verificar formato de campos RichText (HTML)
- [ ] Verificar que todas las imágenes tienen URLs válidas
- [ ] Verificar que todos los videos tienen URLs y thumbnails válidos

#### Fase 4: Actualización de Template
- [ ] Actualizar template si hay diferencias con páginas reales
- [ ] Verificar que todos los placeholders tienen datos
- [ ] Probar template con datos de Drue
- [ ] Probar template con datos de otros VAs

#### Fase 5: Testing
- [ ] Probar cada perfil en versión new
- [ ] Verificar que todos los datos se muestran correctamente
- [ ] Verificar que el video modal funciona
- [ ] Verificar que los acordeones de empleo funcionan
- [ ] Verificar responsive design

---

## 📝 NOTAS IMPORTANTES

1. **Modelo de Referencia:** Drue tiene la estructura más completa. Usar como base para todos los demás perfiles.

2. **Campos RichText:** Los campos `-richtext` deben contener HTML formateado, no texto plano. Ver estructura en Drue.

3. **Video Thumbnail:** Debe generarse automáticamente desde la URL de YouTube usando el patrón: `https://img.youtube.com/vi/{VIDEO_ID}/sddefault.jpg`

4. **CEFR Result:** Debe tener estructura HTML específica con clases `va-cefr-bubble-active` e `inactive` según el nivel.

5. **Employment History:** Debe usar estructura de acordeones con clases específicas para interactividad.

6. **Slug Conflicts:** Verificar especialmente:
   - Ana vs Ana S vs Ana Gabriela vs Ana Victoria
   - Ximena vs Ximena G
   - Brandon vs Brandon L

---

## 🔗 ARCHIVOS DE REFERENCIA

- **Modelo Drue:** `data/drue-reference-model.json`
- **Análisis de Diferencias:** `reports/va-differences-analysis.json`
- **Template:** `webflow-components-minified/313-va-profile-dynamic-template.html`
- **Scripts:**
  - `scripts/fetch-drue-data.js` - Extraer datos de Drue del CMS
  - `scripts/analyze-va-differences.js` - Analizar diferencias
  - `scripts/check-urls-and-compare.js` - Verificar URLs

---

## ✅ ESTADO ACTUAL

- [x] Extraído datos de Drue del CMS
- [x] Analizado estructura del template
- [x] Comparado campos template vs CMS
- [x] Identificado diferencias en URLs
- [ ] Verificado URLs (pendiente)
- [ ] Comparado template con páginas reales (pendiente)
- [ ] Verificado datos de todos los VAs (pendiente)

---

**Última actualización:** 2026-01-22
