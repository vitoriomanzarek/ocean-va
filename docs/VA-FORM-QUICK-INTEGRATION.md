# VA Form - Quick Integration Guide

**Para Webflow**

---

## 📦 ARCHIVOS NECESARIOS

1. `webflow-custom-code/va-form.html` - Estructura HTML
2. `webflow-custom-code/va-form-styles.css` - Estilos CSS
3. `webflow-custom-code/va-form-script.js` - Lógica JavaScript
4. `api/webflow/va-submit.js` - API Route (ya desplegado en Vercel)

---

## 🚀 PASOS DE INTEGRACIÓN

### Paso 1: Crear Página en Webflow

1. En Webflow Designer, crear nueva página
2. Nombre: "VA Onboarding" (o el que prefieras)
3. URL slug: `/va-onboarding` (o el que prefieras)

### Paso 2: Agregar Estructura HTML

**Opción A: HTML Embed (Recomendado para empezar)**

1. En la página, agregar un **HTML Embed** element
2. Copiar TODO el contenido de `webflow-custom-code/va-form.html`
3. Pegar en el HTML Embed

**Opción B: Custom Code (Más control)**

1. En la página, crear un **Section** o **Div**
2. Agregar ID: `va-form-container`
3. En Page Settings → Custom Code → Body Code, agregar:
   ```html
   <div id="va-form-wrapper">
     <!-- Copiar contenido de va-form.html aquí -->
   </div>
   ```

### Paso 3: Agregar CSS

1. Ir a **Page Settings** (botón Settings en la página)
2. Abrir pestaña **Custom Code**
3. En **Head Code**, agregar:
   ```html
   <style>
   <!-- Copiar TODO el contenido de va-form-styles.css aquí -->
   </style>
   ```

### Paso 4: Agregar JavaScript

1. En la misma página de **Page Settings → Custom Code**
2. En **Footer Code**, agregar:
   ```html
   <script>
   <!-- Copiar TODO el contenido de va-form-script.js aquí -->
   </script>
   ```

### Paso 5: Configurar API Endpoint

1. En el código JavaScript (Footer Code)
2. Buscar la línea (aproximadamente línea 15):
   ```javascript
   apiEndpoint: '/api/webflow/va-submit',
   ```
3. Actualizar con tu URL de Vercel:
   ```javascript
   apiEndpoint: 'https://tu-proyecto.vercel.app/api/webflow/va-submit',
   ```
   
   **O si está en el mismo dominio:**
   ```javascript
   apiEndpoint: '/api/webflow/va-submit',
   ```

### Paso 6: Configurar Variables de Entorno (Vercel)

Asegúrate de que tu API route en Vercel tenga configuradas:
- `WEBFLOW_API_TOKEN`
- `WEBFLOW_SITE_ID`
- `WEBFLOW_VA_COLLECTION_ID`

---

## ✅ VERIFICACIÓN

Después de publicar la página:

1. **Visual**: El formulario debe verse con estilos correctos
2. **Funcionalidad**: 
   - Campos básicos deben funcionar
   - Botón "Add Employment Entry" debe agregar campos
   - Botón "Add Education Entry" debe agregar campos
   - Botón "Remove" debe remover entries
3. **Submit**: 
   - Llenar formulario con datos de prueba
   - Click en "Submit & Create VA"
   - Verificar en Webflow CMS que se creó el item

---

## 🎨 PERSONALIZACIÓN

### Cambiar Colores

En `va-form-styles.css`, buscar y cambiar:
- `#0B9B8F` - Color principal (Ocean Teal)
- `#111827` - Color de texto principal
- `#6b7280` - Color de texto secundario

### Ajustar Layout

Modificar:
- `.va-form-container` - Ancho máximo, padding
- `.va-form-row` - Grid columns (actualmente 1fr 1fr)

---

## 🐛 TROUBLESHOOTING

### El formulario no se muestra
- Verificar que el HTML está correctamente insertado
- Verificar que el CSS está en Head Code
- Verificar consola del navegador para errores

### Los campos dinámicos no funcionan
- Verificar que el JavaScript está en Footer Code
- Verificar consola del navegador para errores
- Verificar que los IDs coinciden (`#add-employment`, `#employment-entries`, etc.)

### Submit no funciona
- Verificar API endpoint URL
- Verificar que la API route está desplegada en Vercel
- Verificar variables de entorno en Vercel
- Verificar consola del navegador para errores de red

---

## 📝 NOTAS IMPORTANTES

1. **Campos Dinámicos**: Employment y Education se guardan como HTML en campos RichText
2. **Slugs**: DISC y English Score usan slugs `disc-type-2` y `english-score-2`
3. **Specializations**: No se manejan en el formulario (se configuran manualmente en CMS después)
4. **Images**: Actualmente se usa URL. Para upload directo, se necesita implementación adicional.

---

## 🔗 ENLACES ÚTILES

- **Documentación de enfoque**: `docs/VA-FORM-APPROACH-CLARIFICATION.md`
- **Status de implementación**: `docs/VA-FORM-IMPLEMENTATION-STATUS.md`
- **Setup guide completo**: `docs/VA-FORM-SETUP-GUIDE.md`

