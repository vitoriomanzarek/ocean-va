# Análisis del CSV: Executive Virtual Assistants

**Archivo**: `VAs Database - Executive Virtual Assistants.csv`  
**Total de VAs**: 26 registros  
**Fecha de análisis**: 2025-11-25

---

## ✅ Campos que COINCIDEN con la colección

### Campos básicos (requeridos)
- ✅ **Name** → `name` (PlainText, requerido)
- ✅ **Slug** → `slug` (PlainText, requerido)

### Campos para Cards
- ✅ **Availability** → `availability` (PlainText)
  - Valores encontrados: "Full Time", "Part Time", "Assigned"
- ✅ **Experience (Years)** → `experience-years` (PlainText)
  - Valores encontrados: "2 years", "3 years", "4 years", "5 years", "Trained Assistant"
- ✅ **Languages** → `languages` (PlainText)
  - Valores encontrados: "English", "Bilingual (EN-ES)"
- ✅ **VA Image** → `image` (Image)
  - URLs de Webflow CDN presentes
- ✅ **Profile Slug** → `profile-slug-2` (Link)
  - Formato: `/nombre-ocean-va-profile`

---

## ⚠️ Problemas y observaciones

### 1. **Main Category vs Main Categories**
- **CSV tiene**: `Main Category` (texto plano, múltiples valores separados por comas)
  - Ejemplo: "Executive Virtual Assistant, Insurance Virtual Assistant"
- **Webflow tiene**: `Main Categories` (MultiReference a colección "Main Category")
- **Problema**: No se puede mapear directamente. Necesita:
  - Crear items en la colección "Main Category" primero
  - Luego relacionarlos usando IDs

### 2. **Specialization**
- **CSV tiene**: `Specialization` (texto plano, múltiples valores separados por comas o punto y coma)
  - Ejemplos: "home-insurance", "executive-assistant", "Shopify, Amazon, Wordpress, Mailchimp, Semrush"
- **Webflow tiene**: `Specialization` (MultiReference a colección "VAs Specializations")
- **Problema**: Similar a Main Categories, necesita:
  - Crear items en "VAs Specializations" primero
  - Luego relacionarlos usando IDs

### 3. **Video**
- **CSV tiene**: URLs completas de YouTube
  - Ejemplo: "https://youtu.be/TXb9ONnF310"
- **Webflow tiene**: `Video` (Link)
- **Observación**: El formato parece correcto, pero necesitamos verificar si Webflow acepta URLs de YouTube directamente

### 4. **Campos no usados en Cards (pero presentes en CSV)**
Estos campos están vacíos o no se usan para las cards:
- `Summary` (RichText) - Vacío en todos los registros
- `Tagline` (PlainText) - Vacío en todos los registros
- `Thumbnail Description` (PlainText) - Vacío en todos los registros
- `DISC Description` (RichText) - Vacío en todos los registros
- `English Description` (RichText) - Algunos tienen valores ("Proficient", "Advanced")

### 5. **Campos del CSV que NO existen en Webflow**
Estos campos están en el CSV pero fueron eliminados o no existen:
- ❌ `Title` - Ya eliminado
- ❌ `Video Thumbnail` - Ya eliminado
- ❌ `Video URL` - Ya eliminado
- ❌ `YouTube URL` - Ya eliminado
- ❌ `Collection ID` - Metadato, no campo
- ❌ `Locale ID` - Metadato, no campo
- ❌ `Item ID` - Metadato, no campo
- ❌ `Archived` - Metadato, no campo
- ❌ `Draft` - Metadato, no campo
- ❌ `Created On` - Metadato, no campo
- ❌ `Updated On` - Metadato, no campo
- ❌ `Published On` - Metadato, no campo

### 6. **Campo "name-2" todavía existe**
- ⚠️ El campo `name-2` todavía aparece en la colección Webflow
- **Recomendación**: Eliminar este campo también

---

## 📊 Estadísticas de datos

### Availability
- Full Time: 20 VAs
- Part Time: 2 VAs
- Assigned: 4 VAs

### Languages
- English: 10 VAs
- Bilingual (EN-ES): 16 VAs

### Experience
- 2 years: 2 VAs
- 3 years: 8 VAs
- 4 years: 6 VAs
- 5 years: 3 VAs
- Trained Assistant: 7 VAs

### Main Categories (valores únicos encontrados)
- Executive Virtual Assistant
- Insurance Virtual Assistant
- Healthcare Virtual Assistant
- Executive Assistant

---

## 🔧 Recomendaciones para la carga

### 1. **Preparar colecciones relacionadas primero**
Antes de cargar los VAs, necesitas:

#### a) Crear items en "Main Category" (ID: `691f65ddf62cb29a405fc022`)
Items necesarios:
- Executive Virtual Assistant
- Insurance Virtual Assistant
- Healthcare Virtual Assistant
- Executive Assistant

#### b) Crear items en "VAs Specializations" (ID: `691ccaf4f30e1de9a0437845`)
Specializations encontradas (necesitan normalización):
- home-insurance
- executive-assistant
- health-insurance
- real-estate
- Protocol Development
- Shopify, Amazon, Wordpress, Mailchimp, Semrush (necesita separarse)
- With Mortgage And Lead-Gen Experience
- Wordpress, Salesforce, Asana, Semrush (necesita separarse)
- ... y más

**Problema**: Muchas specializations están como texto separado por comas. Necesitan:
1. Separarse en items individuales
2. Normalizarse (ej: "Wordpress" vs "WordPress")
3. Crearse en la colección antes de relacionarlas

### 2. **Formato de datos para la carga**
Para usar la API de Webflow MCP, necesitas:

```json
{
  "fieldData": {
    "name": "Karen",
    "slug": "karen",
    "availability": "Full Time",
    "experience-years": "4 years",
    "languages": "Bilingual (EN-ES)",
    "image": "https://cdn.prod.website-files.com/...",
    "profile-slug-2": "/karen-ocean-va-profile",
    "video": "https://youtu.be/TXb9ONnF310",
    "main-categories": ["id1", "id2"], // IDs de Main Category
    "specialization": ["id1", "id2"]    // IDs de Specializations
  }
}
```

### 3. **Script de transformación necesario**
Necesitas un script que:
1. Lea el CSV
2. Separe y normalice las specializations
3. Busque o cree los items en las colecciones relacionadas
4. Obtenga los IDs de las referencias
5. Formatee los datos para la API de Webflow

---

## ✅ Próximos pasos sugeridos

1. **Eliminar campo "name-2"** de la colección Webflow
2. **Crear script de normalización** de specializations
3. **Cargar items en "Main Category"** primero
4. **Cargar items en "VAs Specializations"** (normalizados)
5. **Crear script de transformación CSV → JSON para Webflow API**
6. **Cargar los VAs** usando la API

---

## 📝 Notas adicionales

- El CSV tiene algunos registros con `Draft: TRUE` (Jasmine, Jill, Ana, Balbina, Janice)
- Ximena no tiene `Item ID` (será un nuevo registro)
- Algunos videos tienen URLs incompletas o inválidas (ej: Branko tiene "https://youtu.be/nGI5xLNM")
- Los campos de descripción (DISC, English) están mayormente vacíos, pero algunos tienen valores como "Proficient" o "Advanced"

