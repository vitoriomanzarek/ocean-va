# Guía de Corrección y Carga al CMS

**Fecha:** 2026-01-22  
**Objetivo:** Corregir problemas identificados y cargar cambios al CMS de Webflow

---

## 🎯 ESTRATEGIA

### Modo de Operación

Los scripts están configurados en **DRY RUN** por defecto para seguridad:
- ✅ Primero ejecutan sin hacer cambios (muestran qué harían)
- ✅ Generan reportes con los cambios propuestos
- ✅ Solo aplican cambios cuando `DRY_RUN=false` en `.env`

---

## 📋 SCRIPTS DISPONIBLES

### 1. `scripts/fix-va-problems-batch.js`

**Corrige múltiples problemas en batch:**
- ✅ Employment History - Bullet points (6 VAs)
- ✅ DISC Format - Orden de letras (4 VAs)
- ✅ Education Duplicate - Eliminar duplicados (5 VAs)
- ✅ DISC Description - Saltos de línea (2 VAs)

**Uso:**
```bash
# Modo DRY RUN (recomendado primero)
node scripts/fix-va-problems-batch.js

# Aplicar cambios (después de revisar)
# Agregar DRY_RUN=false en .env
node scripts/fix-va-problems-batch.js
```

**VAs afectados:**
- Employment History: Anahi, Andrea, Andres, Angel, Antonio, Bernadette
- DISC Format: Albert, Anahi, Andrea, Bernadette
- Education: Abigail, Alejandro, Ana, Anahi, Balbina
- DISC Description: Ana Victoria, Anahi

---

### 2. `scripts/fix-employment-summary.js`

**Corrige Employment Summary:**
- ✅ Genera summary desde employment-richtext
- ✅ Usa información de empresas y posiciones
- ✅ Crea template genérico si no hay datos

**Uso:**
```bash
# Modo DRY RUN
node scripts/fix-employment-summary.js

# Aplicar cambios
# Agregar DRY_RUN=false en .env
node scripts/fix-employment-summary.js
```

**VAs afectados:**
- Alyssa, Ana, Ana Gabriela, Ana Victoria, Andrea, Andres, Balbina, Bernadette, Brandon L

**⚠️ NOTA:** Los summaries generados automáticamente pueden necesitar ajustes manuales. Revisar antes de aplicar.

---

## 🔧 PROCESO DE CORRECCIÓN

### Paso 1: Preparación

1. **Verificar .env:**
   ```bash
   WEBFLOW_API_TOKEN=tu_token_aqui
   DRY_RUN=true  # Cambiar a false cuando estés listo
   ```

2. **Backup de datos actuales:**
   ```bash
   node scripts/getVAsFromWebflow.js
   # Esto guarda todos los VAs en webflow-vas-export.json
   ```

### Paso 2: Ejecutar Scripts en DRY RUN

1. **Corregir problemas batch:**
   ```bash
   node scripts/fix-va-problems-batch.js
   ```

2. **Revisar reporte generado:**
   - `reports/fix-results.json` - Muestra qué cambios se harían

3. **Corregir Employment Summary:**
   ```bash
   node scripts/fix-employment-summary.js
   ```

4. **Revisar summaries generados:**
   - `reports/employment-summary-fix-results.json`
   - **IMPORTANTE:** Revisar y ajustar manualmente si es necesario

### Paso 3: Aplicar Cambios

1. **Revisar todos los reportes:**
   - Verificar que los cambios son correctos
   - Ajustar manualmente en CMS si es necesario

2. **Cambiar DRY_RUN a false:**
   ```env
   DRY_RUN=false
   ```

3. **Ejecutar scripts nuevamente:**
   ```bash
   node scripts/fix-va-problems-batch.js
   node scripts/fix-employment-summary.js
   ```

4. **Verificar cambios en Webflow:**
   - Ir a CMS de Webflow
   - Verificar que los cambios se aplicaron correctamente
   - Publicar items si es necesario

---

## 📊 CORRECCIONES MANUALES REQUERIDAS

Algunos problemas requieren corrección manual en el CMS:

### 1. Employment Summary (Revisión Manual)

Los summaries generados automáticamente pueden necesitar ajustes:
- Revisar contenido generado
- Ajustar según información específica de cada VA
- Usar modelo de Drue como referencia

### 2. Missing Content

**Balbina:**
- Skills (`skills-richtext`)
- Thumbnail Description (`thumbnail-description`)
- CERF table (`cerf-result`)

**Anahi:**
- Video (`video` y `video-thumbnail-2`)

**Acción:** Agregar manualmente en CMS desde fuentes originales.

### 3. Education Sin Estilos / Símbolos Raros

**VAs:** Ana Gabriela, Andrea, Angel, Balbina

**Acción:**
1. Limpiar HTML de caracteres extraños
2. Asegurar estructura correcta:
   ```html
   <div class="va-education-item">
     <h3 class="va-education-school">School</h3>
     <p class="va-education-degree">Degree</p>
     <p class="va-education-year">Year</p>
   </div>
   ```

### 4. Education Missing Year

**VAs:** Ana, Anahi, Balbina, Brandon L

**Acción:** Agregar año en formato:
```html
<p class="va-education-year">1988 – 1991</p>
```

### 5. Falta de Títulos

**English Result Title:**
- Verificar que `type-of-english-test` tenga contenido
- Si falta, agregar: "EF English Test", "IELTS", etc.

**Otros títulos:**
- Verificar `title-2` para Abigail y Alejandro
- Agregar títulos de secciones si faltan en template

### 6. Employment Section Apretada

**VAs:** Ana Gabriela, Andrea, Andres

**Acción:**
- Verificar CSS en Webflow
- Asegurar que `.va-employment-section` tenga `padding: 48px 16px;`
- Verificar si hay estilos adicionales que sobrescriben

---

## ✅ CHECKLIST DE VALIDACIÓN

Después de aplicar correcciones, verificar:

### Employment History
- [ ] Tiene títulos de empresas (`va-employment-accordion-company`)
- [ ] Tiene bullet points (`<p>• ...</p>`)
- [ ] Contenido no está vacío
- [ ] Estructura HTML correcta

### Employment Summary
- [ ] Tiene contenido (mínimo 100 caracteres)
- [ ] Contenido es relevante y correcto
- [ ] No tiene HTML (solo texto plano)

### Education
- [ ] No está duplicado (solo un `va-education-item`)
- [ ] Tiene año (`va-education-year`)
- [ ] No tiene símbolos raros
- [ ] Estructura HTML correcta

### DISC
- [ ] `disc-type-2` tiene orden correcto (C+S, I+D, etc.)
- [ ] `disc-description` tiene saltos de línea entre párrafos
- [ ] Type y description coinciden

### Missing Content
- [ ] Balbina tiene Skills, Thumbnail Description, CERF
- [ ] Anahi tiene Video
- [ ] Todos tienen English Result title (`type-of-english-test`)

---

## 🚨 PRECAUCIONES

1. **Siempre hacer backup antes de aplicar cambios**
2. **Revisar reportes de DRY RUN antes de aplicar**
3. **Aplicar cambios en horario de bajo tráfico si es posible**
4. **Verificar cambios en staging primero si está disponible**
5. **Tener acceso a datos originales por si necesitas revertir**

---

## 📁 ARCHIVOS DE REFERENCIA

- **Modelo Drue:** `data/drue-reference-model.json`
- **Análisis de problemas:** `reports/PROBLEMAS-IDENTIFICADOS-VA.md`
- **Plan de corrección:** `reports/PLAN-CORRECCION-VAS.md`
- **Solución problemas:** `reports/SOLUCION-PROBLEMAS-PRINCIPALES.md`

---

## 🔄 FLUJO COMPLETO

```
1. Backup datos actuales
   ↓
2. Ejecutar scripts en DRY RUN
   ↓
3. Revisar reportes generados
   ↓
4. Ajustar manualmente si es necesario
   ↓
5. Cambiar DRY_RUN=false
   ↓
6. Ejecutar scripts para aplicar cambios
   ↓
7. Verificar en Webflow CMS
   ↓
8. Publicar items si es necesario
   ↓
9. Verificar en sitio web
```

---

**Última actualización:** 2026-01-22
