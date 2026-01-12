# 🔍 Checklist de Debugging de Trackers

## ✅ Estado Actual

**Última actualización:** Configuración de GA4 y Google Ads movida para ejecutarse inmediatamente después de definir `gtag`.

## 🧪 Pasos para Verificar

### 1. Verificar que el Deploy se Completó

- [ ] Ve a Vercel Dashboard
- [ ] Verifica que el último deployment está "Ready" (verde)
- [ ] Espera 1-2 minutos después del deploy para que se propague

### 2. Verificar en el Navegador (Sin Bloqueadores)

**IMPORTANTE:** Desactiva TODOS los bloqueadores de ads antes de verificar:
- AdBlock
- uBlock Origin
- Privacy Badger
- Brave Shields
- Cualquier otro bloqueador

**Pasos:**
1. Abre el sitio: `https://ocean-va-agency-workload-assessment.vercel.app/`
2. Abre DevTools (F12)
3. Ve a la pestaña **Console**
4. Espera 3-5 segundos después de que la página cargue
5. Deberías ver automáticamente:
   - ✅ `Todos los trackers están activos` (verde)
   - O ⚠️ `Algunos trackers no están activos` (amarillo)

### 3. Verificar Network Tab

1. Abre DevTools → **Network tab**
2. **Recarga la página** (F5)
3. Busca estos requests (deben tener Status **200**):

   - ✅ `googletagmanager.com/gtm.js?id=GTM-5TDRFCB4`
   - ✅ `googletagmanager.com/gtag/js?id=G-VD50K3QXYX` (GA4)
   - ✅ `googletagmanager.com/gtag/js?id=AW-11110885011` (Google Ads)
   - ✅ `s3-us-west-2.amazonaws.com/b2bjsstore/b/...` (reb2b)
   - ✅ `r2.leadsy.ai/tag.js` (Leadsy.ai)

4. Si alguno tiene Status **blocked** o **failed**:
   - Tienes un bloqueador de ads activo
   - O hay un problema de red/CORS

### 4. Verificar en Console (Manual)

Ejecuta esto en la consola **después de esperar 3-5 segundos**:

```javascript
// Verificar trackers
console.log('dataLayer:', typeof window.dataLayer !== 'undefined' ? '✅' : '❌');
console.log('gtag:', typeof gtag !== 'undefined' && typeof gtag === 'function' ? '✅' : '❌');
console.log('reb2b:', typeof window.reb2b !== 'undefined' ? '✅' : '❌');
console.log('Leadsy.ai:', document.getElementById('vtag-ai-js') !== null ? '✅' : '❌');

// Ver eventos en dataLayer
if (typeof window.dataLayer !== 'undefined') {
  console.log('Eventos en dataLayer:', window.dataLayer.length);
  console.log('Eventos:', window.dataLayer.filter(e => e.event));
}
```

### 5. Verificar Google Tag Assistant

1. Instala la extensión [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abre el sitio
3. Click en el icono de Tag Assistant
4. Deberías ver:
   - GTM-5TDRFCB4 (Google Tag Manager)
   - G-VD50K3QXYX (Google Analytics)
   - AW-11110885011 (Google Ads)

**Si muestra "No tags found":**
- Los scripts aún no se han cargado (espera más tiempo)
- O hay un bloqueador de ads activo

### 6. Verificar en Google Analytics (Tiempo Real)

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona la propiedad `G-VD50K3QXYX`
3. Ve a **Reports** → **Realtime**
4. Abre el sitio en otra pestaña
5. Deberías ver:
   - 1 usuario en tiempo real
   - Eventos disparándose

### 7. Verificar en Google Tag Manager (Preview Mode)

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona el contenedor `GTM-5TDRFCB4`
3. Click en **Preview**
4. Ingresa la URL: `https://ocean-va-agency-workload-assessment.vercel.app/`
5. Deberías ver los tags disparándose en tiempo real

---

## 🐛 Problemas Comunes y Soluciones

### Problema: "No tags found" en Tag Assistant

**Causas posibles:**
1. Bloqueador de ads activo
2. Scripts aún no se han cargado (espera más tiempo)
3. Error en la carga de scripts

**Soluciones:**
1. Desactiva bloqueadores de ads
2. Espera 5-10 segundos después de cargar la página
3. Revisa Network tab por requests bloqueados
4. Revisa Console tab por errores JavaScript

### Problema: Todos los trackers muestran "No activo"

**Causas posibles:**
1. Bloqueador de ads activo (más común)
2. Scripts aún no se han cargado
3. Error en la carga de scripts

**Soluciones:**
1. **Desactiva TODOS los bloqueadores de ads**
2. Prueba en **modo incógnito** sin extensiones
3. Espera 5-10 segundos después de cargar la página
4. Revisa Network tab por requests bloqueados

### Problema: dataLayer está activo pero gtag no

**Causa:** El script `gtag.js` aún no se ha descargado completamente

**Solución:**
- Espera un poco más (5-10 segundos)
- Verifica en Network tab que el script se descargó (Status 200)

### Problema: Scripts se descargan pero no funcionan

**Causa:** Error en la configuración o timing

**Solución:**
- Revisa Console tab por errores JavaScript
- Verifica que los IDs de tracking sean correctos
- Verifica que el orden de los scripts sea correcto

---

## 📋 Checklist Final

Antes de reportar que los trackers no funcionan, verifica:

- [ ] Desactivé TODOS los bloqueadores de ads
- [ ] Esperé 5-10 segundos después de cargar la página
- [ ] Revisé Network tab y todos los scripts tienen Status 200
- [ ] Revisé Console tab y no hay errores JavaScript
- [ ] Ejecuté el código de verificación manual en Console
- [ ] Verifiqué en Google Analytics Realtime
- [ ] Verifiqué en Google Tag Manager Preview Mode

---

## 🆘 Si Nada Funciona

1. **Verifica el código en el servidor:**
   - Ve a `https://ocean-va-agency-workload-assessment.vercel.app/`
   - Click derecho → "View Page Source"
   - Busca `googletagmanager.com` y `gtag`
   - Verifica que los scripts estén en el HTML

2. **Verifica los logs de Vercel:**
   - Ve a Vercel Dashboard → Deployments
   - Click en el deployment más reciente
   - Revisa "Functions Logs" por errores

3. **Prueba en otro navegador:**
   - Chrome
   - Firefox
   - Edge
   - Safari

4. **Prueba en otro dispositivo/red:**
   - Para descartar problemas de red o firewall

---

## 📝 Notas

- Los scripts con `async` tardan en cargar, siempre espera 3-5 segundos
- Los bloqueadores de ads son la causa #1 de problemas con trackers
- Google Tag Assistant puede tardar en detectar los tags, espera 5-10 segundos
- La verificación automática en Console se ejecuta después de 2 segundos de `window.load`

