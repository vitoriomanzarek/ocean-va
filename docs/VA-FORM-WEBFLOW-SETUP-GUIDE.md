# VA Form - Guía de Configuración en Webflow

**Fecha**: Enero 2025  
**Status**: ✅ LISTO PARA USAR

---

## ✅ CHECKLIST PRE-CONFIGURACIÓN

Antes de probar, verifica que:

- [x] ✅ API route desplegado en Vercel (`https://ocean-va.vercel.app/api/webflow/va-submit`)
- [x] ✅ WEBFLOW_API_TOKEN configurado en Vercel
- [x] ✅ Endpoint URL configurada en el JavaScript
- [x] ✅ Campo `language` mapeado correctamente a `languages`
- [x] ✅ Items se crean como draft (requieren revisión)

---

## 🚀 PASOS PARA CONFIGURAR EN WEBFLOW

### Paso 1: Crear la Página del Formulario

1. Ve a Webflow Designer
2. Crea una nueva página (ej: "VA Onboarding" o "Add New VA")
3. O usa una página existente donde quieras agregar el formulario

### Paso 2: Agregar el HTML del Formulario

**Opción A: Usar HTML Embed (Recomendado)**

1. Agrega un **HTML Embed** element a tu página
2. Copia TODO el contenido del archivo: `webflow-custom-code/va-form-complete.html`
3. Pégalo en el HTML Embed
4. Esto incluye el HTML + CSS en un solo bloque

**Opción B: Usar HTML Embed + CSS Separado**

1. Agrega un **HTML Embed** element
2. Copia el contenido de `webflow-custom-code/va-form.html`
3. En Page Settings → Custom Code → Head Code, agrega el CSS de `webflow-custom-code/va-form-styles.css`

### Paso 3: Agregar el JavaScript

1. Ve a **Page Settings** → **Custom Code** → **Footer Code**
2. Copia TODO el contenido del archivo: `webflow-custom-code/va-form-script.js`
3. Pégalo en Footer Code
4. ✅ **Verifica que la URL del endpoint sea correcta:**
   ```javascript
   apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit'
   ```

### Paso 4: Verificar Campos del CMS

Asegúrate que estos campos existan en la colección "Virtual Assistants":

**Campos Requeridos:**
- ✅ `name` (PlainText)
- ✅ `slug` (PlainText)
- ✅ `summary` (RichText)
- ✅ `tagline` (PlainText)

**Campos Opcionales (pero recomendados):**
- ✅ `languages` (PlainText) - para el campo "language" del formulario
- ✅ `main-category` (PlainText)
- ✅ `experience-years` (PlainText)
- ✅ `availability` (PlainText)
- ✅ `video` (Link)
- ✅ `thumbnail-description` (PlainText)
- ✅ `skills-tags` (PlainText)
- ✅ `tools-tags` (PlainText)
- ✅ `equipment-tags` (PlainText)
- ✅ `disc-type-2` (Option) - opciones: D, I, S, C, D+I, S+I, S+C
- ✅ `disc-description` (RichText)
- ✅ `english-score-2` (Option) - opciones: A1, A2, B1, B2, C1, C2
- ✅ `english-description` (RichText)
- ✅ `employment-richtext` (RichText)
- ✅ `education-richtext` (RichText)
- ⚠️ `english-cefr-html` (RichText) - **OPCIONAL** (si no existe, el CEFR HTML no se guardará)

---

## 🧪 CÓMO PROBAR EL FORMULARIO

### 1. Preparar Datos de Prueba

Usa estos datos para probar:

- **Name**: Test VA - [Tu Nombre]
- **Summary**: This is a test VA for verifying the form works correctly.
- **Tagline**: Test Virtual Assistant
- **Language**: Selecciona "English" o "Bilingual (EN-ES)"
- **DISC Type**: Selecciona "S" (o cualquier otro)
- **English Score**: Selecciona "B2" (o cualquier otro)

### 2. Llenar el Formulario

1. Abre la página en Webflow Designer (o Preview)
2. Llena todos los campos requeridos (*)
3. Prueba los campos dinámicos:
   - Agrega una entrada de Employment
   - Agrega una entrada de Education
4. Verifica el auto-completado:
   - Selecciona un DISC Type → debería auto-completar la descripción
   - Selecciona un English Score → debería auto-completar descripción y generar CEFR HTML

### 3. Enviar el Formulario

1. Click en "Submit & Create VA"
2. Deberías ver un mensaje de éxito
3. Revisa la consola del navegador (F12 → Console) para ver logs

### 4. Verificar en Webflow CMS

1. Ve a **CMS** → **Virtual Assistants**
2. Busca el VA que acabas de crear
3. **IMPORTANTE**: Debe estar como **DRAFT** (no publicado)
4. Verifica que todos los campos se guardaron correctamente

---

## 🔍 TROUBLESHOOTING

### Problema: El formulario no envía

**Solución:**
1. Abre la consola del navegador (F12 → Console)
2. Busca errores (en rojo)
3. Verifica que el endpoint sea: `https://ocean-va.vercel.app/api/webflow/va-submit`
4. Verifica que no haya errores de CORS

### Problema: Error 500 o 400

**Solución:**
1. Revisa los Runtime Logs en Vercel
2. Verifica que todos los campos requeridos estén llenos
3. Verifica que los campos Option tengan valores válidos

### Problema: Los datos no se guardan

**Solución:**
1. Verifica que el `WEBFLOW_API_TOKEN` esté configurado en Vercel
2. Revisa los logs de Vercel para ver errores de autenticación
3. Verifica que el `WEBFLOW_VA_COLLECTION_ID` sea correcto

### Problema: Auto-completado no funciona

**Solución:**
1. Verifica que el JavaScript esté en Footer Code
2. Verifica que no haya errores en la consola del navegador
3. Verifica que los IDs de los campos coincidan con el HTML

---

## 📋 ARCHIVOS NECESARIOS

1. **HTML + CSS**: `webflow-custom-code/va-form-complete.html` (todo en uno)
   - O usar `va-form.html` + `va-form-styles.css` por separado

2. **JavaScript**: `webflow-custom-code/va-form-script.js`
   - Agregar en Footer Code

---

## ✅ LISTO PARA USAR

Una vez completados estos pasos, el formulario debería funcionar completamente. Los VAs creados quedarán como **draft** y requerirán revisión manual antes de publicarse.

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DE PROBAR

1. ✅ Verificar que los datos se guarden correctamente
2. ✅ Verificar que el auto-completado funcione
3. ✅ Verificar que los items queden como draft
4. ⚠️ Ajustar estilos si es necesario para que coincidan con tu diseño
5. ⚠️ Personalizar mensajes de éxito/error si es necesario

---

## 📝 NOTAS IMPORTANTES

- **Draft Status**: Todos los VAs se crean como draft por seguridad
- **Language Field**: El formulario envía `language`, pero se mapea automáticamente a `languages` (PlainText)
- **CEFR HTML**: Solo se guarda si el campo `english-cefr-html` existe en el CMS
- **Multi-reference Fields**: Specializations y main-categories necesitan IDs, no se pueden enviar desde el formulario directamente (por ahora)

