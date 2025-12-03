# Campos a Eliminar de la Colección "Virtual Assistants"

**Colección ID**: `691b82a97542c69f3f77fa76`  
**Slug**: `virtual-assistants`

## 📋 Campos de Video a Eliminar

### 1. Video Thumbnail
- **ID**: `99ca9e697fe0d259d9f09c0f6bc5afb1`
- **Slug**: `video-thumbnail`
- **Tipo**: PlainText
- **Display Name**: "Video Thumbnail"
- **Razón**: Se reemplazará con un campo "Video ID" más adelante

### 2. Video URL
- **ID**: `b01669d2941a61ed75945756641dd715`
- **Slug**: `video-url-2`
- **Tipo**: VideoLink
- **Display Name**: "Video URL"
- **Razón**: Se mantiene solo el campo "Video" (Link)

### 3. YouTube URL
- **ID**: `55d2dbe12b501c59e383ab92c841708a`
- **Slug**: `youtube-url`
- **Tipo**: PlainText
- **Display Name**: "YouTube URL"
- **Razón**: Se mantiene solo el campo "Video" (Link)

## 📋 Otros Campos a Eliminar

### 4. Name (segundo - duplicado)
- **ID**: `8c7a678a90f27d9b9ae2e61102460f90`
- **Slug**: `name-2`
- **Tipo**: PlainText
- **Display Name**: "Name"
- **Razón**: Duplicado del campo "Name" requerido (slug: `name`). Mantener solo el requerido.

### 5. Title
- **ID**: `3ac419cc62c2c8f5fa85fa441bacf3b7`
- **Slug**: `title`
- **Tipo**: PlainText
- **Display Name**: "Title"
- **Razón**: No se usa en las cards

## ✅ Campos que se MANTIENEN

### Campos de Video
- **Video** (ID: `44dbcc8d49927f09eed392ee3972264c`, slug: `video`, tipo: Link) - ✅ MANTENER

### Campos Básicos
- **Name** (ID: `5b1119ba28150b2faa93ad16dbad344f`, slug: `name`) - ✅ MANTENER (Requerido)
- **Slug** (ID: `0ff45fc81fc21c63ab9dae485b5c79ef`, slug: `slug`) - ✅ MANTENER (Requerido)

### Campos para Cards
- **Availability** (slug: `availability`)
- **VA Image** (slug: `image`)
- **Main Category** (slug: `main-category`)
- **Experience (Years)** (slug: `experience-years`)
- **Languages** (slug: `languages`)
- **Specialization** (slug: `specialization`, MultiReference)
- **Profile Slug** (slug: `profile-slug-2`)

## 📝 Instrucciones para Eliminar en Webflow

1. Ve a **CMS** → **Collections** → **Virtual Assistants**
2. Haz clic en **Settings** (⚙️) de la colección
3. Para cada campo a eliminar:
   - Haz clic en el campo
   - Busca la opción **Delete** o **Remove**
   - Confirma la eliminación
   - ⚠️ **ADVERTENCIA**: Asegúrate de que no haya datos importantes en estos campos antes de eliminarlos

## ⚠️ Advertencias

- **Backup**: Antes de eliminar, exporta los datos de la colección como backup
- **Datos existentes**: Si hay VAs con datos en estos campos, se perderán al eliminar
- **Referencias**: Verifica que estos campos no estén siendo usados en ningún diseño o componente

## 🔄 Próximos Pasos

Después de eliminar estos campos:
1. Crear campo "Video ID" (PlainText) para solo almacenar el ID de YouTube
2. Actualizar las cards para usar el nuevo campo "Video ID"
3. Continuar con la depuración de otros campos no utilizados

---

**Fecha de creación**: 2025-11-25  
**Estado**: Pendiente de eliminación manual en Webflow

