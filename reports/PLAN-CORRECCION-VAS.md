# Plan de Corrección para VAs con Problemas

**Fecha:** 2026-01-22  
**Basado en:** Análisis manual de 18 casos problemáticos

---

## 🎯 ESTRATEGIA DE CORRECCIÓN

### Fase 1: Correcciones en Template (Prioridad ALTA)
Corregir el template para manejar mejor los casos edge y agregar validaciones.

### Fase 2: Correcciones en Datos CMS (Prioridad ALTA)
Actualizar los datos directamente en el CMS usando el modelo de Drue como referencia.

### Fase 3: Validación y Testing (Prioridad MEDIA)
Verificar que todas las correcciones funcionan correctamente.

---

## 📋 CORRECCIONES ESPECÍFICAS POR PROBLEMA

### PROBLEMA 1: Employment Summary Erróneo

**Afecta:** Alyssa, Ana, Ana Gabriela, Ana Victoria, Andrea, Andres, Balbina, Bernadette, Brandon L

**Solución:**
1. Usar el `employment-summary` de Drue como modelo
2. Debe ser un texto plano que resuma toda la experiencia laboral
3. Formato: Párrafo descriptivo completo

**Script:** `scripts/fix-employment-summary.js`

---

### PROBLEMA 2: Employment History - Estilos en Dropdown

**Afecta:** AC, Aaron, Albert, Ana, Ana Gabriela, Ana Victoria, Anahi, Andrea, Andres, Angel, Antonio, Balbina, Bernadette, Brandon L

**Estructura Correcta (basada en Drue):**
```html
<div class="va-employment-accordion">
  <div class="va-employment-accordion-header" onclick="...">
    <div class="va-employment-accordion-title">
      <h4 class="va-employment-accordion-company">COMPANY NAME</h4>
      <p class="va-employment-accordion-position">Position Title</p>
      <p class="va-employment-accordion-period">Period</p>
    </div>
    <svg class="va-employment-accordion-icon">...</svg>
  </div>
  <div class="va-employment-accordion-content">
    <p class="va-employment-accordion-description">
      <p>• Bullet point 1</p>
      <p>• Bullet point 2</p>
      <p>• Bullet point 3</p>
    </p>
  </div>
</div>
```

**Problemas identificados:**
- ❌ Faltan títulos de empresas (`va-employment-accordion-company`)
- ❌ Contenido sin bullet points (`<p>• ...</p>`)
- ❌ Contenido vacío en algunos casos

**Solución:**
1. Verificar que cada empleo tenga la estructura completa
2. Agregar títulos de empresas si faltan
3. Formatear contenido con bullet points
4. Agregar contenido si está vacío

**Script:** `scripts/fix-employment-history.js`

---

### PROBLEMA 3: Falta de Títulos

**Afectas:**
- Abigail, Alejandro: No tienen títulos (¿se refiere a `title-2`?)
- Ana, Ana Victoria, Andrea, Andres, Balbina, Bernadette, Brandon L: No tienen "English Result title"

**Solución para English Result Title:**
El template ya tiene el título: `{{type-of-english-test}}` - verificar que este campo esté poblado.

**Script:** `scripts/fix-missing-titles.js`

---

### PROBLEMA 4: Education Duplicado

**Afecta:** Abigail, Alejandro, Ana, Anahi, Balbina

**Problema:** El campo `education-richtext` tiene contenido duplicado.

**Estructura Correcta (basada en Drue):**
```html
<div class="va-education-item">
  <h3 class="va-education-school">School Name</h3>
  <p class="va-education-degree">Degree</p>
  <p class="va-education-year">Year</p>
</div>
```

**Solución:**
1. Verificar que solo haya un `va-education-item` por educación
2. Eliminar duplicados
3. Asegurar que tenga año (`va-education-year`)

**Script:** `scripts/fix-education-duplicate.js`

---

### PROBLEMA 5: Education Sin Estilos / Símbolos Raros

**Afecta:** Ana Gabriela, Andrea, Angel, Balbina

**Problema:** HTML mal formateado, caracteres extraños (probablemente encoding issues).

**Solución:**
1. Limpiar HTML de caracteres extraños
2. Asegurar encoding UTF-8
3. Validar estructura HTML correcta

**Script:** `scripts/fix-education-styles.js`

---

### PROBLEMA 6: DISC Mal Formateado

**Afecta:**
- Albert: S+C → debe ser C+S
- Anahi: S+C → debe ser C+S
- Andrea: D+I → debe ser I+D
- Bernadette: S+C → debe ser C+S

**Problema:** El orden de las letras en `disc-type-2` no coincide con `disc-description`.

**Solución:**
1. Verificar opciones DISC disponibles en CMS
2. Cambiar `disc-type-2` al valor correcto
3. Verificar que `disc-description` coincida

**Opciones DISC (del modelo Drue):**
- D
- I
- S
- C
- D+I
- S+I (Drue usa este)
- S+C
- C+D

**Script:** `scripts/fix-disc-format.js`

---

### PROBLEMA 7: DISC Description - Falta Salto de Línea

**Afecta:** Ana Victoria, Anahi

**Problema:** Falta salto de línea entre párrafos de cada letra DISC.

**Estructura Correcta:**
```html
<p>Steadiness (S) - Description...</p>
<p>Influence (I) - Description...</p>
```

**Solución:**
1. Agregar `<p>` tags alrededor de cada descripción de letra
2. Asegurar que haya separación visual

**Script:** `scripts/fix-disc-description-breaks.js`

---

### PROBLEMA 8: Employment Section Apretada

**Afecta:** Ana Gabriela, Andrea, Andres

**Problema:** Sección de empleo con padding/margin incorrecto.

**Solución:**
- Verificar que el template tenga los estilos correctos
- El template ya tiene: `.va-employment-section {padding: 48px 16px;}`
- Puede ser un problema de datos o de CSS específico

**Acción:** Verificar en Webflow si hay estilos adicionales que sobrescriben.

---

### PROBLEMA 9: Missing Content

**Casos específicos:**
- Anahi: No tiene video
- Balbina: Missing Skills, Thumbnail Description, CERF table
- Varios: Contenido vacío en dropdowns

**Solución:**
1. Agregar contenido faltante desde fuentes originales
2. Usar modelo de Drue como referencia para estructura

**Script:** `scripts/fix-missing-content.js`

---

### PROBLEMA 10: Education Missing Year

**Afecta:** Ana, Anahi, Balbina, Brandon L

**Solución:**
1. Agregar año en formato: `<p class="va-education-year">Year</p>`
2. Si no hay año disponible, considerar ocultar la sección

---

## 🔧 SCRIPTS A CREAR

### 1. `scripts/fix-employment-summary.js`
- Leer datos de VAs problemáticos
- Generar `employment-summary` basado en `employment-richtext`
- Actualizar en CMS

### 2. `scripts/fix-employment-history.js`
- Leer `employment-richtext` de cada VA
- Verificar estructura HTML
- Agregar títulos de empresas si faltan
- Formatear con bullet points
- Actualizar en CMS

### 3. `scripts/fix-education-duplicate.js`
- Detectar duplicados en `education-richtext`
- Eliminar duplicados
- Validar estructura
- Actualizar en CMS

### 4. `scripts/fix-disc-format.js`
- Leer `disc-type-2` y `disc-description`
- Corregir orden de letras
- Actualizar en CMS

### 5. `scripts/fix-missing-content.js`
- Identificar campos faltantes
- Agregar contenido desde fuentes o modelo Drue
- Actualizar en CMS

---

## 📊 PRIORIZACIÓN

### Sprint 1 (Crítico - Esta semana)
1. ✅ Employment History - Estilos en dropdown (10 casos)
2. ✅ Employment Summary erróneo (7 casos)
3. ✅ Education duplicado (5 casos)

### Sprint 2 (Importante - Próxima semana)
4. ✅ DISC mal formateado (4 casos)
5. ✅ Falta de títulos (8 casos)
6. ✅ Missing content crítico (Balbina, Anahi)

### Sprint 3 (Mejoras - Siguiente)
7. ✅ Education sin estilos (4 casos)
8. ✅ DISC Description saltos de línea (2 casos)
9. ✅ Employment section apretada (3 casos)

---

## ✅ CHECKLIST DE VALIDACIÓN

Después de cada corrección, verificar:

- [ ] Employment Summary tiene contenido correcto
- [ ] Employment History tiene títulos de empresas
- [ ] Employment History tiene bullet points
- [ ] Education no está duplicado
- [ ] Education tiene año
- [ ] Education no tiene símbolos raros
- [ ] DISC type y description coinciden
- [ ] DISC description tiene saltos de línea
- [ ] English Results tiene título
- [ ] Todos los campos requeridos están presentes

---

**Última actualización:** 2026-01-22
