# Plan de Implementación Paso a Paso

**Orden de ejecución recomendado** para implementar SEO + Minificación + Trackers + Google Ads

---

## 📅 **FASE 1: PREPARACIÓN (Día 1) - 2-3 horas**

### ✅ **Paso 1.1: Instalar Dependencias**
```bash
cd "C:\Users\vitor\Coding\Ocean VA\Assesment"
npm install --save-dev terser
```

### ✅ **Paso 1.2: Crear Script de Minificación**
- [ ] Copiar contenido de `SEO-OPTIMIZATION-PLAN.md` → Sección 2.1
- [ ] Crear `scripts/minify-project.js`
- [ ] Agregar script a `package.json`:
  ```json
  {
    "scripts": {
      "minify": "node scripts/minify-project.js",
      "build": "npm run minify"
    }
  }
  ```
- [ ] Testear script: `npm run minify`

---

## 🔍 **FASE 2: SEO METADATA (Día 1-2) - 1-2 horas**

### ✅ **Paso 2.1: Agregar Metadata Básica**
- [ ] Abrir `Assesment/public/index.html`
- [ ] Agregar metadata completa del `<head>` (ver `SEO-OPTIMIZATION-PLAN.md` Sección 1.1)
- [ ] Reemplazar valores placeholder:
  - URL del sitio
  - Imágenes OG (si ya las tienes)
  - Social media handles

### ✅ **Paso 2.2: Agregar Schema.org JSON-LD**
- [ ] Agregar script JSON-LD antes de `</head>` (ver `SEO-OPTIMIZATION-PLAN.md` Sección 1.2)
- [ ] Validar con [Schema.org Validator](https://validator.schema.org/)

### ✅ **Paso 2.3: Crear Imágenes OG (Opcional pero recomendado)**
- [ ] Crear `images/quiz-og-image.webp` (1200x630px)
- [ ] Crear `images/quiz-twitter-card.webp` (1200x630px)
- [ ] Crear favicons si no los tienes

---

## 📦 **FASE 3: MINIFICACIÓN (Día 2) - 30 minutos**

### ✅ **Paso 3.1: Minificar Código**
```bash
npm run minify
```

### ✅ **Paso 3.2: Actualizar Referencias**
- [ ] Abrir `Assesment/public/index.html`
- [ ] Cambiar:
  ```html
  <!-- De: -->
  <script src="/standalone-engine.js"></script>
  <!-- A: -->
  <script src="/standalone-engine.min.js"></script>
  ```
- [ ] Verificar que el sitio funciona
- [ ] Commit: `git add -A && git commit -m "Add minified JS for performance" && git push`

---

## 📊 **FASE 4: TRACKERS (Día 2-3) - 2-3 horas**

### ✅ **Paso 4.1: Agregar Trackers al HTML**
- [ ] **Esperar a que el usuario pase los códigos de Webflow**
- [ ] Abrir `Assesment/public/index.html`
- [ ] Agregar trackers antes de `</head>` (ver `SEO-OPTIMIZATION-PLAN.md` Sección 3.1)
- [ ] Reemplazar placeholders con códigos reales:
  - `GTM-XXXXXXX` → Tu GTM ID
  - `G-XXXXXXXXXX` → Tu GA4 ID
  - `XXXXXXXXXXXXXXX` → Tu Facebook Pixel ID
  - `XXXXXX` → Tu LinkedIn Partner ID

### ✅ **Paso 4.2: Agregar Google Tag Manager (Body)**
- [ ] Agregar código GTM inmediatamente después de `<body>`:
  ```html
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  ```

### ✅ **Paso 4.3: Implementar Eventos de Tracking**
- [ ] Abrir `Assesment/public/standalone-engine.js`
- [ ] Agregar funciones de tracking (ver `SEO-OPTIMIZATION-PLAN.md` Sección 3.2)
- [ ] Llamar funciones en momentos apropiados:
  - `trackQuizStart()` → cuando usuario hace clic en "Start Quiz"
  - `trackQuizComplete()` → cuando muestra resultados
  - `trackPDFDownload()` → cuando descarga PDF
  - `trackScheduleCall()` → cuando hace clic en "Schedule Call"
- [ ] Testear eventos en Google Tag Assistant

### ✅ **Paso 4.4: Configurar Conversiones en Google Ads**
- [ ] Ir a Google Ads → Tools & Settings → Conversions
- [ ] Crear conversiones:
  1. **Quiz Started** (Event: quiz_start) - Engagement
  2. **Quiz Completed** (Event: quiz_complete) - Lead ($10-20)
  3. **PDF Downloaded** (Event: pdf_download) - Lead ($15-25)
  4. **Schedule Call Click** (Event: schedule_call_click) - Conversion ($50-100)
  5. **Profile A Generated** (Event: profile_a_generated) - Conversion ($100-150)
- [ ] Importar desde Google Analytics 4 si usas GA4
- [ ] Verificar que tracking funciona

---

## 🎯 **FASE 5: GOOGLE ADS (Día 3-5) - 4-6 horas**

### ✅ **Paso 5.1: Keyword Research**
- [ ] Usar Google Keyword Planner
- [ ] Crear lista de keywords (ver `GOOGLE-ADS-CAMPAIGN-PLAN.md` Sección 2)
- [ ] Organizar por intent (High, Medium, Low)
- [ ] Crear lista de negative keywords

### ✅ **Paso 5.2: Crear Ad Copy**
- [ ] Crear 15 headlines por ad group (ver `GOOGLE-ADS-CAMPAIGN-PLAN.md` Sección 3.1)
- [ ] Crear 4 descriptions por ad group (ver Sección 3.2)
- [ ] Crear 6 sitelinks (ver Sección 3.3)
- [ ] Crear 4-6 callouts (ver Sección 3.4)

### ✅ **Paso 5.3: Crear Campaña en Google Ads**
1. **Search Campaign:**
   - [ ] Nombre: "Assessment Quiz - Search"
   - [ ] Tipo: Search
   - [ ] Objetivo: Leads
   - [ ] Presupuesto: $30/día
   - [ ] Bid Strategy: Target CPA ($20) o Maximize Conversions
   - [ ] Crear 4 Ad Groups (ver `GOOGLE-ADS-CAMPAIGN-PLAN.md` Sección 1.1)
   - [ ] Agregar keywords con match types apropiados
   - [ ] Agregar negative keywords
   - [ ] Crear ads con ad copy preparado
   - [ ] Configurar sitelinks, callouts, structured snippets

2. **Display/Discovery Campaign (Opcional):**
   - [ ] Nombre: "Assessment Quiz - Display"
   - [ ] Tipo: Display o Discovery
   - [ ] Objetivo: Leads
   - [ ] Presupuesto: $20/día
   - [ ] Audiences: In-Market, Affinity, Custom (ver Sección 4.1)
   - [ ] Crear creativos (ver Sección 4.2)

3. **YouTube Campaign (Opcional):**
   - [ ] Nombre: "Assessment Quiz - YouTube"
   - [ ] Tipo: Video
   - [ ] Objetivo: Leads
   - [ ] Presupuesto: $20/día
   - [ ] Crear videos o usar bumper ads (ver Sección 5)

### ✅ **Paso 5.4: Configurar Remarketing**
- [ ] Crear remarketing lists:
  - [ ] Quiz Abandoners
  - [ ] Quiz Starters (no completaron)
  - [ ] Quiz Completers - Profile A
  - [ ] Quiz Completers - Profile B
  - [ ] PDF Downloaders
- [ ] Crear ad copy para remarketing (ver `GOOGLE-ADS-CAMPAIGN-PLAN.md` Sección 9.2)

### ✅ **Paso 5.5: Testear Antes de Lanzar**
- [ ] Verificar que tracking funciona
- [ ] Testear landing page (mobile + desktop)
- [ ] Completar quiz end-to-end
- [ ] Verificar que eventos se registran
- [ ] Revisar ad copy (ortografía, gramática)
- [ ] Verificar URLs de destino

---

## 🚀 **FASE 6: LANZAMIENTO (Día 5)**

### ✅ **Paso 6.1: Activar Campañas**
- [ ] Activar Search Campaign
- [ ] Esperar 24 horas
- [ ] Monitorear performance
- [ ] Activar Display/YouTube si Search funciona bien

### ✅ **Paso 6.2: Monitoreo Día 1-7**
- [ ] Revisar performance diariamente
- [ ] Ajustar bids según resultados
- [ ] Agregar negative keywords basado en search terms
- [ ] Pausar keywords/ads no performers
- [ ] Documentar insights

---

## 📋 **CHECKLIST FINAL**

### **Antes de Lanzar:**
- [ ] SEO metadata completa
- [ ] Código minificado
- [ ] Trackers configurados y funcionando
- [ ] Conversiones configuradas en Google Ads
- [ ] Keywords research completado
- [ ] Ad copy escrita (15+ headlines por grupo)
- [ ] Landing page optimizada y testeada
- [ ] Remarketing lists creadas
- [ ] Presupuestos configurados
- [ ] Bid strategy seleccionada
- [ ] Test completo del flujo (click → quiz → conversion)

### **Después de Lanzar (Semana 1):**
- [ ] Monitoreo diario
- [ ] Ajustes de bids
- [ ] Refinamiento de negatives
- [ ] Pausar no performers
- [ ] Escalar winners

---

## 💡 **NOTAS IMPORTANTES**

1. **Esperar códigos de trackers del usuario** antes de implementar Fase 4
2. **Testear todo** antes de lanzar campañas
3. **Empezar conservador** ($30-50/día) y escalar si funciona
4. **Monitorear diariamente** primera semana
5. **Documentar todo** para optimizaciones futuras

---

## 📞 **SIGUIENTE PASO INMEDIATO**

**Esperar a que el usuario pase los códigos de trackers de Webflow**, luego proceder con Fase 4 (Trackers).

**Mientras tanto, puedes:**
- ✅ Implementar SEO metadata (Fase 2)
- ✅ Minificar código (Fase 3)
- ✅ Preparar ad copy para Google Ads (Fase 5.2)

