# Guía de Verificación de Trackers - Assessment Quiz

**Cómo verificar que todos los trackers están activos y funcionando correctamente**

---

## 🔍 **MÉTODO 1: Google Tag Assistant (Recomendado)**

### **Paso 1: Instalar la Extensión**
1. Instala la extensión **"Tag Assistant Legacy (by Google)"** en Chrome:
   - Ve a: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk
   - O busca "Tag Assistant" en Chrome Web Store

### **Paso 2: Usar Tag Assistant**
1. Abre tu sitio: `https://assessment.oceanvirtualassistant.com/`
2. Haz clic en el ícono de **Tag Assistant** en la barra de Chrome
3. Haz clic en **"Enable"**
4. Recarga la página (F5 o Ctrl+R)
5. Haz clic en **Tag Assistant** nuevamente para ver los tags detectados

**Debes ver:**
- ✅ Google Analytics (G-VD50K3QXYX)
- ✅ Google Tag Manager (GTM-5TDRFCB4)
- ✅ Google Ads (AW-11110885011)
- ✅ Eventos personalizados cuando interactúas con el quiz

---

## 🔍 **MÉTODO 2: Chrome DevTools (Console)**

### **Verificar Tags Cargados:**

1. Abre tu sitio en Chrome
2. Presiona **F12** (o Clic derecho → Inspect)
3. Ve a la pestaña **Console**
4. Ejecuta estos comandos uno por uno:

```javascript
// Verificar Google Analytics 4
console.log('GA4:', typeof gtag !== 'undefined' ? '✅ Activo' : '❌ No activo');
gtag('get', 'G-VD50K3QXYX', 'client_id', (clientId) => {
  console.log('GA4 Client ID:', clientId);
});

// Verificar Google Tag Manager
console.log('GTM:', typeof dataLayer !== 'undefined' ? '✅ Activo' : '❌ No activo');
console.log('DataLayer:', dataLayer);

// Verificar Google Ads
console.log('Google Ads:', window.dataLayer ? '✅ Activo' : '❌ No activo');

// Verificar B2B Tracking (reb2b)
console.log('reb2b:', typeof reb2b !== 'undefined' ? '✅ Activo' : '❌ No activo');

// Verificar Leadsy.ai
console.log('Leadsy.ai:', document.getElementById('vtag-ai-js') ? '✅ Cargado' : '❌ No cargado');
```

**Si todo está activo, deberías ver:**
```
GA4: ✅ Activo
GA4 Client ID: 1234567890.1234567890
GTM: ✅ Activo
DataLayer: [...]
Google Ads: ✅ Activo
reb2b: ✅ Activo
Leadsy.ai: ✅ Cargado
```

---

## 🔍 **MÉTODO 3: Network Tab (DevTools)**

### **Verificar Requests de Tracking:**

1. Abre **DevTools** (F12)
2. Ve a la pestaña **Network**
3. Recarga la página (F5)
4. Filtra por estos dominios:

**Búsquedas en el filtro:**
- `google-analytics.com` → Debe mostrar requests a GA4
- `googletagmanager.com` → Debe mostrar requests a GTM
- `google.com/ads` → Debe mostrar requests a Google Ads
- `leadsy.ai` → Debe mostrar requests a Leadsy.ai
- `s3-us-west-2.amazonaws.com` → Debe mostrar requests a reb2b

**Qué buscar:**
- ✅ Status 200 (OK) - significa que el request fue exitoso
- ✅ Si ves requests significa que los tags se están cargando
- ❌ Status 404 o bloqueado - significa que hay un problema

---

## 🔍 **MÉTODO 4: Google Analytics Real-Time**

### **Verificar Eventos en Tiempo Real:**

1. Ve a **Google Analytics**: https://analytics.google.com/
2. Selecciona tu propiedad (donde está `G-VD50K3QXYX`)
3. Ve a **Reports** → **Real-time** (tiempo real)
4. En otra pestaña, abre tu sitio y completa el quiz
5. En GA4, deberías ver:
   - ✅ 1 usuario en tiempo real
   - ✅ Evento `quiz_start` cuando inicias el quiz
   - ✅ Evento `quiz_complete` cuando completas el quiz
   - ✅ Evento `pdf_download` cuando descargas PDF
   - ✅ Evento `schedule_call_click` cuando haces clic en Schedule Call

**Nota:** Los eventos pueden tardar 1-2 minutos en aparecer en Real-Time.

---

## 🔍 **MÉTODO 5: Google Tag Manager Preview Mode**

### **Verificar Tags en GTM:**

1. Ve a **Google Tag Manager**: https://tagmanager.google.com/
2. Selecciona tu contenedor (`GTM-5TDRFCB4`)
3. Haz clic en **Preview** (modo de vista previa)
4. Ingresa la URL de tu sitio: `https://assessment.oceanvirtualassistant.com/`
5. Haz clic en **Connect**
6. Se abrirá tu sitio en modo Preview
7. Interactúa con el quiz (inicia, completa, descarga PDF)
8. En la ventana de GTM Preview verás:
   - ✅ Tags activados
   - ✅ Eventos disparados
   - ✅ Variables capturadas

**Qué buscar:**
- ✅ Tag `GA4 Configuration` debe estar activado
- ✅ Tag `Google Ads` debe estar activado
- ✅ Eventos personalizados deben aparecer cuando interactúas

---

## 🔍 **MÉTODO 6: Verificar Eventos Personalizados en Console**

### **Test Manual de Eventos:**

1. Abre tu sitio
2. Abre **Console** (F12 → Console)
3. Ejecuta estos comandos manualmente para simular eventos:

```javascript
// Simular quiz_start
if (typeof trackQuizStart === 'function') {
  trackQuizStart();
  console.log('✅ quiz_start disparado');
} else {
  console.log('❌ trackQuizStart no está disponible (espera a que cargue el script)');
}

// Simular quiz_complete
if (typeof trackQuizComplete === 'function') {
  trackQuizComplete({ profile: 'A', name: 'HOT LEAD', priority: 1 }, { operational: 8, intent: 15, urgency: 2 });
  console.log('✅ quiz_complete disparado');
}

// Simular pdf_download
if (typeof trackPDFDownload === 'function') {
  trackPDFDownload('A');
  console.log('✅ pdf_download disparado');
}

// Simular schedule_call
if (typeof trackScheduleCall === 'function') {
  trackScheduleCall('A');
  console.log('✅ schedule_call_click disparado');
}

// Verificar dataLayer después de disparar eventos
console.log('DataLayer después de eventos:', dataLayer);
```

**Después de ejecutar, verifica en la pestaña Network:**
- Debe haber requests a `google-analytics.com/collect` con los eventos
- Debe haber requests a `googletagmanager.com` con los eventos

---

## 🔍 **MÉTODO 7: Verificar en Google Ads**

### **Verificar Conversiones en Google Ads:**

1. Ve a **Google Ads**: https://ads.google.com/
2. Ve a **Tools & Settings** → **Conversions**
3. Verifica que las conversiones estén configuradas:
   - `quiz_start`
   - `quiz_complete`
   - `pdf_download`
   - `schedule_call`

**Nota:** Primero debes configurar estas conversiones en Google Ads (ver `TRACKERS-3` en el TODO list).

4. Ve a **Tools & Settings** → **Conversion tracking** → **Tag Assistant**
5. Ingresa tu URL y verifica que el tag de Google Ads esté activo

---

## 📊 **CHECKLIST DE VERIFICACIÓN RÁPIDA**

Usa esta checklist para verificar rápidamente:

### **Verificación Inicial (Página Cargada):**
- [ ] Google Analytics 4 cargado (`gtag` disponible en console)
- [ ] Google Tag Manager cargado (`dataLayer` disponible)
- [ ] Google Ads tag cargado (request a `google.com/ads`)
- [ ] B2B Tracking cargado (`reb2b` disponible)
- [ ] Leadsy.ai script cargado (visible en Network tab)

### **Verificación de Eventos (Interactuar con Quiz):**
- [ ] `quiz_start` se dispara cuando haces clic en "Start Quiz"
- [ ] `quiz_complete` se dispara cuando completas el quiz
- [ ] `pdf_download` se dispara cuando descargas PDF
- [ ] `schedule_call_click` se dispara cuando haces clic en "Schedule Call"

### **Verificación en Tiempo Real:**
- [ ] Eventos aparecen en Google Analytics Real-Time
- [ ] Eventos aparecen en Google Tag Manager Preview
- [ ] Requests aparecen en Network tab
- [ ] DataLayer contiene los eventos correctos

---

## 🐛 **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Problema 1: "gtag is not defined"**
**Causa:** Google Analytics no se cargó correctamente  
**Solución:**
- Verifica que el script de GA4 esté en el `<head>`
- Verifica que no haya bloqueadores de ads (AdBlock, uBlock)
- Verifica la consola por errores de red

### **Problema 2: "dataLayer is not defined"**
**Causa:** Google Tag Manager no se cargó  
**Solución:**
- Verifica que el script de GTM esté en el `<head>`
- Verifica que el ID de GTM sea correcto (`GTM-5TDRFCB4`)
- Verifica la consola por errores

### **Problema 3: Eventos no aparecen en GA4 Real-Time**
**Causa:** Puede tardar 1-2 minutos, o los eventos no se están disparando  
**Solución:**
- Espera 1-2 minutos
- Verifica que los eventos se estén disparando en Console
- Verifica que el Measurement ID sea correcto (`G-VD50K3QXYX`)

### **Problema 4: Bloqueadores de Ads**
**Causa:** Extensiones como AdBlock bloquean trackers  
**Solución:**
- Desactiva AdBlock temporalmente para probar
- O usa modo incógnito sin extensiones
- O verifica en un navegador sin extensiones

---

## ✅ **TEST COMPLETO RECOMENDADO**

### **Paso 1: Verificación Inicial (2 minutos)**
1. Abre el sitio
2. Abre DevTools → Console
3. Ejecuta los comandos del Método 2
4. Verifica que todos los tags estén activos

### **Paso 2: Test de Eventos (5 minutos)**
1. Completa el flujo completo del quiz:
   - Haz clic en "Start Quiz"
   - Completa el formulario de contacto
   - Responde las preguntas
   - Completa el quiz
   - Descarga el PDF
   - Haz clic en "Schedule Call" (si está disponible)
2. Durante el flujo, verifica en Console que los eventos se disparen
3. Verifica en Network tab que haya requests a Google Analytics

### **Paso 3: Verificación en Tiempo Real (2 minutos)**
1. Ve a Google Analytics → Real-Time
2. Interactúa con el quiz nuevamente
3. Verifica que los eventos aparezcan en Real-Time

### **Paso 4: Verificación en GTM (3 minutos)**
1. Abre Google Tag Manager → Preview Mode
2. Interactúa con el quiz
3. Verifica que los tags se activen y los eventos se disparen

**Total: ~12 minutos para verificación completa**

---

## 🎯 **VERIFICACIÓN RÁPIDA (1 minuto)**

Si solo quieres verificar rápidamente:

1. Abre el sitio en Chrome
2. Presiona **F12** → **Console**
3. Ejecuta:
```javascript
console.log('GA4:', typeof gtag !== 'undefined');
console.log('GTM:', typeof dataLayer !== 'undefined');
console.log('reb2b:', typeof reb2b !== 'undefined');
console.log('DataLayer events:', dataLayer.filter(e => e.event));
```
4. Si todo muestra `true` y hay eventos en dataLayer → ✅ **Todo activo**

---

## 📞 **SIGUIENTE PASO**

Después de verificar que los trackers están activos:
1. Configura las conversiones en Google Ads (Fase 3)
2. Continúa con minificación (Fase 2) si quieres optimizar
3. O procede con el plan de Google Ads (Fase 4)

**¿Quieres que te ayude a verificar algún tracker específico?**

