# 🔍 Guía de Verificación de Trackers

## ✅ Verificación Automática (Recomendado)

La página ahora incluye **verificación automática** que se ejecuta 2 segundos después de que la página carga completamente.

### Pasos:

1. **Abre el sitio** en tu navegador
2. **Abre la Consola** (F12 → Console tab)
3. **Espera 2-3 segundos** después de que la página cargue completamente
4. **Revisa los mensajes** en la consola:

   - ✅ **Si todos están activos**: Verás un mensaje verde: `✅ Todos los trackers están activos`
   - ❌ **Si algunos fallan**: Verás un mensaje amarillo con posibles causas

---

## 🛠️ Verificación Manual

Si quieres verificar manualmente, ejecuta esto en la consola **después de esperar 2-3 segundos**:

```javascript
// Esperar y luego verificar
setTimeout(() => {
  console.log('GA4:', typeof gtag !== 'undefined' && typeof gtag === 'function' ? '✅ Activo' : '❌ No activo');
  console.log('GTM:', typeof dataLayer !== 'undefined' ? '✅ Activo' : '❌ No activo');
  console.log('reb2b:', typeof reb2b !== 'undefined' ? '✅ Activo' : '❌ No activo');
  
  if (typeof dataLayer !== 'undefined') {
    console.log('Eventos en dataLayer:', dataLayer.length);
    console.log('Eventos:', dataLayer.filter(e => e.event));
  }
}, 2000);
```

---

## ⚠️ Problemas Comunes

### 1. Todos los trackers muestran "No activo"

**Causa más común**: Bloqueador de ads activo

**Solución**:
- Desactiva AdBlock, uBlock Origin, Privacy Badger, etc.
- Prueba en **modo incógnito** sin extensiones
- O añade el dominio a la lista blanca del bloqueador

### 2. Los scripts tardan en cargar

**Causa**: Scripts con `async` cargan de forma asíncrona

**Solución**:
- **Espera 2-3 segundos** después de que la página cargue
- No verifiques inmediatamente al abrir la página
- Usa la verificación automática (aparece en consola después de 2 segundos)

### 3. dataLayer está activo pero gtag no

**Causa**: El script `gtag.js` aún no se ha descargado completamente

**Solución**:
- Espera un poco más (3-5 segundos)
- Verifica en **Network tab** que los scripts se descargaron:
  - Busca `googletagmanager.com/gtag/js` → Debe tener Status **200**
  - Si tiene Status **blocked** → Tienes un bloqueador de ads

### 4. Errores de CORS o Network

**Causa**: Problemas de red o configuración

**Solución**:
- Abre **Network tab** en DevTools
- Busca requests a `googletagmanager.com` o `google-analytics.com`
- Si hay errores de CORS, verifica la configuración de Vercel

---

## 📊 Verificación en Network Tab

1. Abre **DevTools** → **Network tab**
2. **Recarga la página** (F5)
3. Busca estos requests (deben tener Status **200**):

   - ✅ `googletagmanager.com/gtm.js?id=GTM-5TDRFCB4`
   - ✅ `googletagmanager.com/gtag/js?id=G-VD50K3QXYX` (GA4)
   - ✅ `googletagmanager.com/gtag/js?id=AW-11110885011` (Google Ads)
   - ✅ `s3-us-west-2.amazonaws.com/b2bjsstore/b/...` (reb2b)
   - ✅ `r2.leadsy.ai/tag.js` (Leadsy.ai)

4. Si alguno tiene Status **blocked** o **failed**:
   - Tienes un bloqueador de ads
   - O hay un problema de red/CORS

---

## 🧪 Testing de Eventos

Para verificar que los eventos se están enviando correctamente:

### 1. Google Analytics 4 - Real-time Report

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad (`G-VD50K3QXYX`)
3. Ve a **Reports** → **Realtime**
4. Completa el quiz en otra pestaña
5. Deberías ver:
   - 1 usuario en tiempo real
   - Eventos `quiz_start`, `quiz_complete`, etc.

### 2. Google Tag Manager - Preview Mode

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu contenedor (`GTM-5TDRFCB4`)
3. Haz clic en **Preview**
4. Ingresa la URL de tu sitio
5. Deberías ver los tags disparándose en tiempo real

### 3. Console Logs

Después de completar el quiz, verifica en la consola:

```javascript
// Ver todos los eventos en dataLayer
dataLayer.filter(e => e.event);
```

Deberías ver eventos como:
- `quiz_start`
- `quiz_complete`
- `pdf_download`
- `schedule_call`

---

## 🔧 Debugging Avanzado

### Verificar que gtag está cargado:

```javascript
// Verificar gtag
console.log('gtag type:', typeof gtag);
console.log('gtag function:', typeof gtag === 'function');

// Intentar obtener Client ID de GA4
if (typeof gtag === 'function') {
  gtag('get', 'G-VD50K3QXYX', 'client_id', (clientId) => {
    console.log('GA4 Client ID:', clientId);
  });
}
```

### Ver todos los eventos en dataLayer:

```javascript
// Ver todos los eventos
dataLayer.forEach((item, index) => {
  if (item.event) {
    console.log(`Evento ${index}:`, item.event, item);
  }
});
```

### Forzar verificación:

```javascript
// Verificar ahora mismo
console.table({
  'dataLayer': typeof window.dataLayer !== 'undefined',
  'gtag': typeof gtag !== 'undefined' && typeof gtag === 'function',
  'reb2b': typeof window.reb2b !== 'undefined',
  'Leadsy.ai': document.getElementById('vtag-ai-js') !== null
});
```

---

## ✅ Checklist Final

- [ ] Scripts se descargan correctamente (Network tab → Status 200)
- [ ] `dataLayer` está definido después de 2-3 segundos
- [ ] `gtag` es una función después de 2-3 segundos
- [ ] `reb2b` está definido después de 2-3 segundos
- [ ] Verificación automática muestra "✅ Todos los trackers están activos"
- [ ] Eventos se disparan correctamente (completar quiz y verificar dataLayer)
- [ ] Google Analytics muestra eventos en tiempo real
- [ ] Google Tag Manager Preview muestra tags activos

---

## 🆘 Si Nada Funciona

1. **Desactiva TODOS los bloqueadores de ads**
2. **Prueba en modo incógnito** sin extensiones
3. **Verifica Network tab** por requests bloqueados
4. **Revisa Console tab** por errores JavaScript
5. **Verifica que el deploy en Vercel está activo**
6. **Confirma que el dominio está configurado correctamente**

Si aún no funciona, revisa los logs de Vercel para ver si hay errores en el servidor.

