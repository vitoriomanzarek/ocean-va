# VA Form - Próximos Pasos

**Fecha**: Enero 2025  
**Status**: 📋 EN PROGRESO

---

## ✅ COMPLETADO

1. ✅ **Specializations**: Confirmado usar un solo campo multi-reference
2. ✅ **Language Field**: Campo creado en Webflow como Option
3. ✅ **Formulario actualizado**: `languages` → `language` (Option) con opciones:
   - "Bilingual (EN-ES)"
   - "English"
4. ✅ **Migración de datos**: Documentada como tarea pendiente para después de publicación

---

## ⏭️ PRÓXIMOS PASOS (Por Prioridad)

### 🔴 ALTA PRIORIDAD

#### 1. Auto-completar Descripciones de DISC
- **Objetivo**: Al seleccionar DISC Type, auto-completar descripción
- **Implementación**: JavaScript que detecta cambio en dropdown de DISC
- **Archivo**: `webflow-custom-code/va-form-script.js`
- **Status**: ⏭️ Pendiente

#### 2. Auto-completar Descripciones de English
- **Objetivo**: Al seleccionar English Score, auto-completar descripción
- **Implementación**: JavaScript que detecta cambio en dropdown de English Score
- **Archivo**: `webflow-custom-code/va-form-script.js`
- **Status**: ⏭️ Pendiente

#### 3. Generar HTML de Tabla CEFR
- **Objetivo**: Al seleccionar English Level, generar HTML de tabla CEFR con nivel activo
- **Implementación**: JavaScript que genera HTML según nivel seleccionado
- **Archivo**: `webflow-custom-code/va-form-script.js`
- **Campo CMS**: Necesita nuevo campo `english-cefr-html` (RichText)
- **Status**: ⏭️ Pendiente

---

### 🟡 MEDIA PRIORIDAD

#### 4. Actualizar API Route
- **Objetivo**: Asegurar que API route use `language` (Option) correctamente
- **Archivo**: `api/webflow/va-submit.js`
- **Status**: ⏭️ Parcial (ya actualizado el mapping)

#### 5. Testing del Formulario
- **Objetivo**: Probar todas las funcionalidades
- **Status**: ⏭️ Pendiente

---

### 🟢 BAJA PRIORIDAD (Post-publicación)

#### 6. Migración de Datos Language
- **Objetivo**: Migrar datos de `languages` (PlainText) → `language` (Option)
- **Cuándo**: Después de publicación del formulario
- **Documentación**: `docs/LANGUAGE-FIELD-MIGRATION-STRATEGY.md`
- **Status**: 📋 Pendiente

#### 7. YouTube Popup en Cards
- **Objetivo**: Cambiar botón YouTube en cards de nueva pestaña → popup modal
- **Nota**: No afecta el formulario, es para template de cards
- **Status**: 📋 Pendiente

---

## 📋 DETALLES DE IMPLEMENTACIÓN

### Auto-completar Descripciones de DISC

**Ejemplo de descripciones predeterminadas:**
```javascript
const DISC_DESCRIPTIONS = {
  'D': 'Dominance (D) - Direct, decisive, and results-oriented. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
  'I': 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
  'C': 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
  'D+I': 'Dominance (D) + Influence (I) - Proactive and goal-driven with excellent communication skills...',
  'S+I': 'Steadiness (S) + Influence (I) - Dependable and patient with strong client communication...',
  'S+C': 'Steadiness (S) + Conscientiousness (C) - Calm, patient, and service-oriented with attention to detail...'
};
```

**Funcionalidad:**
- Al cambiar dropdown de DISC Type → Auto-llenar textarea de DISC Description
- Usuario puede editar después
- Si ya hay texto, preguntar antes de sobrescribir (opcional)

---

### Auto-completar Descripciones de English

**Ejemplo de descripciones predeterminadas:**
```javascript
const ENGLISH_DESCRIPTIONS = {
  'A1': 'Beginner level - Can understand and use familiar everyday expressions and basic questions about personal details.',
  'A2': 'Elementary level - Can have very short social exchanges and give information on familiar and routine matters when traveling.',
  'B1': 'Intermediate level - Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
  'B2': 'Upper-Intermediate level - Can communicate confidently in a variety of academic and professional environments.',
  'C1': 'Advanced level - Can use the language flexibly and effectively for social, academic and professional purposes.',
  'C2': 'Proficient level - Can interact with ease and can differentiate their shades of meaning. Native-like proficiency.'
};
```

**Funcionalidad:**
- Al cambiar dropdown de English Score → Auto-llenar textarea de English Description
- Usuario puede editar después

---

### Generar HTML de Tabla CEFR

**Estructura HTML:**
```html
<div class="va-cefr-grid">
  <div class="va-cefr-item">
    <div class="va-cefr-bubble va-cefr-bubble-inactive">A1</div>
    <p class="va-cefr-description">Can understand and use familiar everyday expressions...</p>
  </div>
  <!-- ... más niveles ... -->
  <div class="va-cefr-item">
    <div class="va-cefr-bubble va-cefr-bubble-active">C1</div>
    <p class="va-cefr-description">Can use the language flexibly and effectively...</p>
  </div>
  <!-- ... -->
</div>
```

**Funcionalidad:**
- Al cambiar dropdown de English Score → Generar HTML completo de tabla CEFR
- Nivel seleccionado tiene clase `va-cefr-bubble-active`
- Otros niveles tienen clase `va-cefr-bubble-inactive`
- HTML se guarda en campo RichText `english-cefr-html` (necesita crearse en CMS)

**Campo CMS necesario:**
- Crear campo `english-cefr-html` (RichText) en Webflow CMS

---

## 🔄 ORDEN RECOMENDADO DE IMPLEMENTACIÓN

1. **Auto-completar DISC** (más simple)
2. **Auto-completar English** (similar a DISC)
3. **Generar HTML CEFR** (más complejo, necesita campo nuevo en CMS)

---

## 📝 NOTAS

1. **Descripciones predeterminadas**: Necesitamos revisar todas las descripciones existentes en páginas de perfil para crear objetos completos y precisos

2. **CEFR HTML**: El HTML generado debe coincidir exactamente con el estilo de las páginas de perfil existentes

3. **Testing**: Después de cada implementación, probar que funciona correctamente

