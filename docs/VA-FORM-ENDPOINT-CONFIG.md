# VA Form - Configurar URL del Endpoint

**Fecha**: Enero 2025  
**Objetivo**: Configurar la URL del endpoint en JavaScript para Webflow

---

## 🎯 INFORMACIÓN NECESARIA

Necesitas la **URL de tu proyecto en Vercel**, por ejemplo:
- `https://tu-proyecto.vercel.app`
- O `https://tu-proyecto-tu-usuario.vercel.app`

---

## 📝 PASOS PARA CONFIGURAR

### Paso 1: Obtener URL de Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. La URL está en la parte superior (ej: `tu-proyecto.vercel.app`)

**O** usa el dominio personalizado si ya lo configuraste.

---

### Paso 2: Actualizar JavaScript

Tienes **dos opciones** dependiendo de cómo tengas el JavaScript configurado en Webflow:

---

## 🔧 OPCIÓN A: JavaScript en Webflow Custom Code (Footer Code)

Si el JavaScript está directamente en **Webflow Designer** → **Page Settings** → **Custom Code** → **Footer Code**:

### Paso 1: Ir a Webflow Designer

1. Abre tu proyecto en Webflow Designer
2. Ve a la página donde está el formulario
3. Click en **Page Settings** (ruedita en la parte superior)
4. Ve a la pestaña **Custom Code**
5. Busca **Footer Code**

### Paso 2: Buscar y Actualizar

Busca esta línea (aproximadamente línea 15):

```javascript
apiEndpoint: '/api/webflow/va-submit',
```

**Cámbiala por:**

```javascript
apiEndpoint: 'https://tu-proyecto.vercel.app/api/webflow/va-submit',
```

**Reemplaza `tu-proyecto.vercel.app` con tu URL real de Vercel.**

### Paso 3: Guardar y Publicar

1. Click en **Save**
2. Publica el sitio (o solo la página si usas publish específico)

---

## 🔧 OPCIÓN B: JavaScript en Archivo Externo

Si el JavaScript está en un archivo externo (como `va-form-script.js` alojado en un CDN o servidor):

### Paso 1: Actualizar el Archivo Local

1. Abre `webflow-custom-code/va-form-script.js`
2. Busca esta línea (aproximadamente línea 15):

```javascript
const CONFIG = {
  apiEndpoint: '/api/webflow/va-submit',
  // ...
};
```

3. **Cámbiala por:**

```javascript
const CONFIG = {
  apiEndpoint: 'https://tu-proyecto.vercel.app/api/webflow/va-submit',
  // ...
};
```

**Reemplaza `tu-proyecto.vercel.app` con tu URL real de Vercel.**

### Paso 2: Subir el Archivo Actualizado

1. Sube el archivo actualizado a donde lo tengas alojado (CDN, servidor, etc.)
2. O actualiza la referencia en Webflow si es necesario

### Paso 3: Si el Archivo está en Git y lo Sirves desde Vercel

Si el archivo está en Git y lo sirves desde Vercel (como archivo estático):

1. Haz commit del cambio:
   ```bash
   git add webflow-custom-code/va-form-script.js
   git commit -m "Update API endpoint URL"
   git push
   ```

2. Espera a que Vercel haga deploy

3. Actualiza la referencia en Webflow si es necesario

---

## 📋 EJEMPLO COMPLETO

### Antes (URL Relativa - NO funciona en Webflow):

```javascript
const CONFIG = {
  apiEndpoint: '/api/webflow/va-submit',
  formSelector: '#va-form',
  debug: true
};
```

### Después (URL Absoluta - Funciona en Webflow):

```javascript
const CONFIG = {
  apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit',
  formSelector: '#va-form',
  debug: true
};
```

**Nota**: Reemplaza `ocean-va.vercel.app` con tu URL real.

---

## 🔍 CÓMO VERIFICAR QUE FUNCIONA

### Método 1: Browser Console

1. Abre tu página en Webflow (publicada)
2. Abre **Developer Tools** (F12 o Click derecho → Inspect)
3. Ve a la pestaña **Console**
4. Llena el formulario y envía
5. Busca en la consola:
   - ✅ `[VA Form] Form submission started` → JavaScript funciona
   - ✅ `[VA Form] Form data collected: {...}` → Datos se están recolectando
   - ✅ Request a `https://tu-proyecto.vercel.app/api/webflow/va-submit` → URL correcta

### Método 2: Network Tab

1. Abre **Developer Tools** → **Network**
2. Envía el formulario
3. Busca una petición a `/api/webflow/va-submit` o la URL completa
4. Click en la petición para ver detalles:
   - **Status 200/201**: ✅ Funciona
   - **Status 404**: ❌ URL incorrecta o endpoint no desplegado
   - **Status 500**: ⚠️ Endpoint existe pero hay error (ver logs)

---

## ⚠️ PROBLEMAS COMUNES

### Error: "Failed to fetch" o CORS Error

**Causa**: El endpoint no permite requests desde Webflow (CORS)

**Solución**: El endpoint debe permitir requests desde tu dominio de Webflow. Si usas Vercel, debería funcionar automáticamente, pero si no, necesitas configurar CORS en el API route.

### Error: 404 Not Found

**Causas posibles**:
1. URL incorrecta (typo en la URL)
2. Endpoint no está desplegado en Vercel
3. Ruta incorrecta

**Solución**:
1. Verifica la URL en Vercel Dashboard
2. Prueba el endpoint directamente con curl (ver `VA-FORM-VERCEL-CONFIG.md`)
3. Verifica que el endpoint esté en Functions en Vercel

### Error: 500 Internal Server Error

**Causas posibles**:
1. Variables de entorno no configuradas en Vercel
2. Error en el código del API route

**Solución**:
1. Verifica variables de entorno en Vercel Dashboard
2. Revisa logs en Vercel Dashboard → Deployments → Functions

---

## 📝 CHECKLIST

- [ ] Obtener URL de Vercel
- [ ] Actualizar `apiEndpoint` en JavaScript
- [ ] Guardar cambios (en Webflow o archivo)
- [ ] Publicar (si es en Webflow)
- [ ] Probar formulario
- [ ] Verificar en Browser Console que funciona
- [ ] Verificar en Network Tab que la petición se hace correctamente

---

## 🎯 RESUMEN RÁPIDO

**Cambio necesario:**

```javascript
// ANTES (NO funciona en Webflow)
apiEndpoint: '/api/webflow/va-submit',

// DESPUÉS (Funciona en Webflow)
apiEndpoint: 'https://tu-proyecto.vercel.app/api/webflow/va-submit',
```

**Dónde cambiarlo:**
- Si está en Webflow Custom Code: Page Settings → Custom Code → Footer Code
- Si está en archivo externo: `webflow-custom-code/va-form-script.js` línea ~15

**Verificación:**
- Browser Console → Buscar logs `[VA Form]`
- Network Tab → Buscar petición al endpoint

