# VA Form - URL del Endpoint Configurada

**Fecha**: Enero 2025  
**URL de Vercel**: https://ocean-va.vercel.app/

---

## ✅ URL COMPLETA DEL ENDPOINT

```
https://ocean-va.vercel.app/api/webflow/va-submit
```

---

## 📝 CÓDIGO PARA WEBFLOW

En **Webflow Designer** → **Page Settings** → **Custom Code** → **Footer Code**, busca esta línea y cámbiala:

**Línea a cambiar (aproximadamente línea 15):**

```javascript
apiEndpoint: '/api/webflow/va-submit',
```

**Cambiar a:**

```javascript
apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit',
```

---

## 🔍 CONTEXTO COMPLETO

El código completo debería verse así:

```javascript
const CONFIG = {
  apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit',
  formSelector: '#va-form',
  debug: true // Set to false in production
};
```

---

## ✅ PASOS PARA ACTUALIZAR EN WEBFLOW

1. Ve a **Webflow Designer**
2. Abre la página con el formulario
3. Click en **Page Settings** (ruedita arriba)
4. Pestaña **Custom Code**
5. Sección **Footer Code**
6. Busca: `apiEndpoint: '/api/webflow/va-submit',`
7. Cámbiala por: `apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit',`
8. Click en **Save**
9. **Publica** el sitio

---

## 🧪 VERIFICACIÓN

Después de publicar, puedes verificar que funciona:

1. Abre la página publicada
2. Abre **Developer Tools** (F12)
3. Pestaña **Console**
4. Llena y envía el formulario
5. Busca en la consola: `[VA Form] Form submission started`
6. Pestaña **Network**
7. Busca una petición a `https://ocean-va.vercel.app/api/webflow/va-submit`

---

## 🎯 RESUMEN

**URL del Endpoint:**
```
https://ocean-va.vercel.app/api/webflow/va-submit
```

**Cambio necesario en JavaScript:**
```javascript
apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit',
```

