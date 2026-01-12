# Plan de Implementación: Formulario Webflow para Agregar Nuevos VAs

**Fecha**: Diciembre 2024  
**Status**: 📋 PLANIFICACIÓN  
**Objetivo**: Crear formulario en Webflow con custom code para dar de alta nuevos Virtual Assistants

---

## 🎯 CONTEXTO Y REQUISITOS

### Estado Actual
- ✅ **Cards gestionadas desde CMS**: Ya funcionando
- ⚠️ **Páginas de perfil**: Actualmente en HTML directo
- ⚠️ **Datos multi-reference**: Employment History es el mayor reto
- ⚠️ **Datos completos**: `data/va-profiles-complete.json` tiene estructura completa
- ⚠️ **Base de datos**: `data/ocean_va_all_assistants.tsv` y `src/data/vasData.js` necesitan consolidación

### Retos Principales
1. **Employment History**: Muchos subcampos (company, position, period, description)
2. **Multi-reference complexity**: Webflow tiene límites en referencias
3. **Migración de datos HTML**: Necesitamos migrar páginas existentes al CMS
4. **Estructura de datos**: Consolidar fuentes de datos existentes

---

## 📊 ANÁLISIS DE DATOS

### Fuentes de Datos Actuales

#### 1. `src/data/vasData.js` (Principal)
- **57 VAs** con datos básicos
- Campos: nombre, slug, categoría, idiomas, experiencia, especialización
- **Faltantes**: Employment History, Education, DISC, English Scores completos

#### 2. `data/va-profiles-complete.json` (Completo)
- **57 perfiles** extraídos de JSX/HTML
- **Campos completos**: Skills, Tools, Equipment, Employment History, Education, DISC, English
- **~200+ employment entries**
- **~60+ education entries**

#### 3. `data/ocean_va_all_assistants.tsv`
- Datos en formato TSV
- Necesita verificación si es duplicado

### Comparación Necesaria
- [ ] Comparar `vasData.js` vs `va-profiles-complete.json`
- [ ] Identificar VAs faltantes
- [ ] Identificar campos faltantes en cada fuente
- [ ] Crear base de datos consolidada final

---

## 🏗️ ESTRUCTURA CMS REQUERIDA

### Collections Existentes (Ya configuradas)
- ✅ **Virtual Assistants**: Collection principal (16 campos)
- ✅ **VA Specializations**: Multi-reference funcionando
- ✅ **Main Categories**: Option field

### Collections a Crear (Para formulario completo)

#### 1. Employment Collection
```
Fields:
- Company (Plain Text)
- Position (Plain Text)
- Period (Plain Text)
- Description (Rich Text)
- VA Reference (Reference → Virtual Assistants) [opcional, para queries]
```

#### 2. Education Collection
```
Fields:
- School (Plain Text)
- Degree (Plain Text)
- Year (Plain Text)
- VA Reference (Reference → Virtual Assistants) [opcional]
```

#### 3. Skills Collection (Opcional - para reusabilidad)
```
Fields:
- Name (Plain Text)
- Category (Option)
```

#### 4. Tools Collection (Opcional)
```
Fields:
- Name (Plain Text)
- Category (Option)
```

#### 5. Equipment Collection (Opcional)
```
Fields:
- Name (Plain Text)
- Category (Option)
```

### Campos a Agregar a Virtual Assistants

**Campos Simples**:
- ✅ Summary (Rich Text) - Ya existe
- ✅ Tagline (Plain Text) - Ya existe
- [ ] DISC Badge (Option: D, I, S, C, D+I, S+I, S+C)
- [ ] DISC Description (Rich Text)
- [ ] English Score (Option: A1, A2, B1, B2, C1, C2)
- [ ] English Description (Rich Text)
- [ ] YouTube URL (Plain Text) - Para youtu.be links

**Campos Multi-Reference**:
- [ ] Skills (Multi-Reference → Skills Collection) O Rich Text con HTML
- [ ] Tools (Multi-Reference → Tools Collection) O Rich Text con HTML
- [ ] Equipment (Multi-Reference → Equipment Collection) O Rich Text con HTML
- [ ] Employment History (Multi-Reference → Employment Collection) O Rich Text con HTML
- [ ] Education (Multi-Reference → Education Collection) O Rich Text con HTML

---

## 💡 ESTRATEGIA: HTML vs Multi-Reference

### Propuesta Anterior: Usar HTML para Employment History

**Ventajas**:
- ✅ Evita límites de multi-reference en Webflow
- ✅ Más flexible para estructuras complejas
- ✅ Más fácil de migrar desde HTML existente
- ✅ No requiere crear múltiples items en collections separadas

**Desventajas**:
- ❌ No es queryable/filtrable desde CMS
- ❌ Más difícil de mantener
- ❌ No reutilizable entre VAs

### Recomendación: **HÍBRIDO**

#### Para Employment History y Education: **Rich Text con HTML estructurado**

**Razón**: 
- Employment History tiene múltiples subcampos por entrada
- Cada VA puede tener 3-5 empleos
- Crear items separados sería ~200+ items solo para employment
- HTML permite mantener estructura sin límites

**Estructura HTML propuesta**:
```html
<div class="va-employment-entry">
  <h4 class="company">Company Name</h4>
  <p class="position">Job Title</p>
  <p class="period">2020 - 2023</p>
  <div class="description">Responsibilities and achievements...</div>
</div>
```

#### Para Skills, Tools, Equipment: **Option Fields o Rich Text**

**Opción A**: Si necesitas filtrado → Multi-Reference
**Opción B**: Si solo visualización → Rich Text con HTML

**Recomendación**: **Rich Text con HTML** para simplicidad inicial, se puede migrar después si se necesita filtrado.

---

## 📋 PLAN DE IMPLEMENTACIÓN

### FASE 1: Preparación de Datos (2-3 horas)

#### 1.1 Consolidación de Datos
- [ ] Comparar `vasData.js` vs `va-profiles-complete.json`
- [ ] Crear script de consolidación
- [ ] Generar base de datos única y completa
- [ ] Identificar VAs faltantes y datos incompletos

#### 1.2 Normalización
- [ ] Estandarizar formatos (employment history, education)
- [ ] Validar campos requeridos
- [ ] Crear estructura JSON final para carga

**Deliverable**: `data/va-database-final.json`

---

### FASE 2: Configuración CMS en Webflow (1-2 horas)

#### 2.1 Crear Collections (Manual en Webflow Designer)

**Collections OBLIGATORIAS**:
- [ ] **Employment Collection**
  - Company (Plain Text)
  - Position (Plain Text)
  - Period (Plain Text)
  - Description (Rich Text)

- [ ] **Education Collection**
  - School (Plain Text)
  - Degree (Plain Text)
  - Year (Plain Text)

**Collections OPCIONALES** (si decides usar multi-reference):
- [ ] Skills Collection
- [ ] Tools Collection
- [ ] Equipment Collection

#### 2.2 Agregar Campos a Virtual Assistants

**Campos Simples**:
- [ ] DISC Badge (Option: D, I, S, C, D+I, S+I, S+C)
- [ ] DISC Description (Rich Text)
- [ ] English Score (Option: A1, A2, B1, B2, C1, C2)
- [ ] English Description (Rich Text)
- [ ] YouTube URL (Plain Text)

**Campos Rich Text para HTML** (Recomendado):
- [ ] Employment History HTML (Rich Text)
- [ ] Education HTML (Rich Text)
- [ ] Skills HTML (Rich Text) - O Multi-Reference si prefieres
- [ ] Tools HTML (Rich Text) - O Multi-Reference si prefieres
- [ ] Equipment HTML (Rich Text) - O Multi-Reference si prefieres

**O Campos Multi-Reference** (Si prefieres filtrado):
- [ ] Skills (Multi-Reference → Skills Collection)
- [ ] Tools (Multi-Reference → Tools Collection)
- [ ] Equipment (Multi-Reference → Equipment Collection)
- [ ] Employment History (Multi-Reference → Employment Collection)
- [ ] Education (Multi-Reference → Education Collection)

**Deliverable**: CMS configurado en Webflow

---

### FASE 3: Migración de Datos Existentes (3-4 horas)

#### 3.1 Extraer Datos de Páginas HTML Existentes
- [ ] Script para extraer datos de `webflow-components/*-va-profile.html`
- [ ] Convertir employment history a HTML estructurado
- [ ] Convertir education a HTML estructurado
- [ ] Consolidar con datos de `va-profiles-complete.json`

#### 3.2 Cargar Datos al CMS
- [ ] Script para cargar VAs existentes al CMS
- [ ] Convertir employment history a HTML format
- [ ] Cargar campos simples
- [ ] Validar datos cargados

**Deliverable**: Todos los VAs existentes en CMS

---

### FASE 4: Crear Páginas Dinámicas en CMS (2-3 horas)

#### 4.1 Crear Template de Página de Perfil
- [ ] Crear página dinámica: `/va-profile/[slug]`
- [ ] Diseñar template con todos los campos
- [ ] Configurar Rich Text fields para renderizar HTML
- [ ] Testing en staging

#### 4.2 Migrar desde HTML Estático
- [ ] Reemplazar páginas HTML estáticas por dinámicas
- [ ] Actualizar enlaces/rutas
- [ ] Verificar que todo funcione

**Deliverable**: Páginas de perfil dinámicas funcionando

---

### FASE 5: Desarrollo del Formulario Webflow (4-6 horas)

#### 5.1 Diseño del Formulario en Webflow Designer
- [ ] Crear página: `/admin/add-va` (protegida)
- [ ] Diseñar formulario con todos los campos
- [ ] Agregar validaciones básicas
- [ ] Agregar campos dinámicos (agregar múltiples empleos, etc.)

**Estructura del Formulario**:

```
Sección 1: Información Básica
- Nombre (Text)
- Slug (Text, auto-generado)
- Categoría Principal (Dropdown)
- Idiomas (Text)
- Años de Experiencia (Number)
- Disponibilidad (Dropdown)
- Imagen (File Upload)

Sección 2: Multimedia
- Video URL (Text)
- YouTube URL (Text)
- Video Thumbnail (Text)

Sección 3: Contenido
- Summary (Rich Text Editor)
- Tagline (Text)
- Thumbnail Description (Text)

Sección 4: Especializaciones
- Specializations (Multi-select)

Sección 5: Skills, Tools, Equipment
- Skills HTML (Rich Text Editor) O Multi-select
- Tools HTML (Rich Text Editor) O Multi-select
- Equipment HTML (Rich Text Editor) O Multi-select

Sección 6: Employment History
- [BOTÓN: Agregar Empleo]
  - Company (Text)
  - Position (Text)
  - Period (Text)
  - Description (Rich Text Editor)
- [Lista de empleos agregados]
- Campo oculto: Employment History HTML (generado automáticamente)

Sección 7: Education
- [BOTÓN: Agregar Educación]
  - School (Text)
  - Degree (Text)
  - Year (Text)
- [Lista de educaciones agregadas]
- Campo oculto: Education HTML (generado automáticamente)

Sección 8: DISC Assessment
- DISC Badge (Dropdown: D, I, S, C, D+I, S+I, S+C)
- DISC Description (Rich Text Editor)

Sección 9: English Proficiency
- English Score (Dropdown: A1, A2, B1, B2, C1, C2)
- English Description (Rich Text Editor)

Sección 10: Submit
- [BOTÓN: Guardar VA]
```

#### 5.2 Custom Code para Funcionalidad

**JavaScript necesario**:

```javascript
// 1. Generar slug automáticamente desde nombre
// 2. Agregar/remover empleos dinámicamente
// 3. Agregar/remover educaciones dinámicamente
// 4. Generar HTML estructurado para Employment History
// 5. Generar HTML estructurado para Education
// 6. Validación de campos requeridos
// 7. Submit al CMS via Webflow API
```

**Archivo**: `scripts/webflow-va-form.js`

#### 5.3 Integración con Webflow API

**Endpoint**: Usar Webflow Forms API O Webflow CMS API directamente

**Opción A: Webflow Form Submit** (Más simple)
- Configurar form en Webflow
- Usar custom code para procesar antes de submit
- Webhook para procesar datos

**Opción B: Webflow CMS API Direct** (Más control)
- Custom code llama directamente a CMS API
- Más control sobre validación y estructura
- Requiere serverless function (Vercel)

**Recomendación**: **Opción B** para mayor control

**Archivo**: `scripts/webflow-cms-api-handler.js`

---

### FASE 6: Scripts de Procesamiento (2-3 horas)

#### 6.1 Script de Consolidación de Datos
- [ ] `scripts/consolidate-va-data.js`
- Compara y consolida todas las fuentes
- Genera archivo final

#### 6.2 Script de Generación de HTML
- [ ] `scripts/generate-employment-html.js`
- Convierte employment objects a HTML estructurado
- Mantiene formato consistente

- [ ] `scripts/generate-education-html.js`
- Convierte education objects a HTML estructurado

#### 6.3 Script de Carga al CMS
- [ ] `scripts/load-vas-to-cms.js`
- Carga VAs consolidados al CMS
- Maneja employment history como HTML
- Maneja education como HTML

---

### FASE 7: Testing y Validación (1-2 horas)

- [ ] Testing del formulario completo
- [ ] Validar que todos los campos se guardan correctamente
- [ ] Verificar que HTML se renderiza correctamente en páginas
- [ ] Testing de validaciones
- [ ] Testing de casos edge (campos vacíos, etc.)

---

## 📐 ESTRUCTURA DE ARCHIVOS

```
docs/
├── VA-FORM-WEBFLOW-IMPLEMENTATION-PLAN.md (este archivo)
└── [otros docs existentes]

scripts/
├── consolidate-va-data.js (NUEVO)
├── generate-employment-html.js (NUEVO)
├── generate-education-html.js (NUEVO)
├── extract-html-profiles.js (NUEVO)
├── load-vas-to-cms.js (NUEVO)
└── webflow-va-form.js (NUEVO - custom code para formulario)

data/
├── va-database-final.json (NUEVO - base consolidada)
├── va-profiles-complete.json (existente)
├── ocean_va_all_assistants.tsv (existente - verificar)
└── vasData.js (src/data/ - existente)

webflow-custom-code/
├── va-form-script.js (NUEVO - código para Webflow)
└── va-form-styles.css (NUEVO - estilos del formulario)
```

---

## ⏱️ TIMELINE ESTIMADO

| Fase | Tareas | Tiempo | Dependencias |
|------|--------|--------|--------------|
| **Fase 1** | Consolidación de datos | 2-3h | Ninguna |
| **Fase 2** | Configuración CMS | 1-2h | Ninguna |
| **Fase 3** | Migración datos existentes | 3-4h | Fase 1, 2 |
| **Fase 4** | Crear páginas dinámicas | 2-3h | Fase 3 |
| **Fase 5** | Desarrollo formulario | 4-6h | Fase 2 |
| **Fase 6** | Scripts procesamiento | 2-3h | Fase 1 |
| **Fase 7** | Testing y validación | 1-2h | Fase 4, 5 |
| **TOTAL** | | **15-23 horas** | |

---

## 🎯 DECISIONES CLAVE A TOMAR

### 1. Employment History: HTML vs Multi-Reference
**Recomendación**: **HTML estructurado en Rich Text**
- Evita límites de Webflow
- Más fácil de migrar
- Mantiene flexibilidad

### 2. Skills/Tools/Equipment: HTML vs Multi-Reference
**Recomendación**: **Iniciar con HTML, migrar a Multi-Reference después si se necesita filtrado**
- HTML para simplicidad inicial
- Multi-Reference si necesitas filtrar/buscar por skills/tools

### 3. Formulario: Webflow Forms vs CMS API Direct
**Recomendación**: **CMS API Direct con serverless function**
- Mayor control
- Mejor validación
- Más flexible

### 4. Migración: ¿Todos los VAs de una vez o por lotes?
**Recomendación**: **Por lotes (10-15 VAs por vez)**
- Menos riesgo
- Más fácil de validar
- Permite ajustes

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

1. **Decidir estrategia de Employment History** (HTML vs Multi-Reference)
2. **Consolidar datos** (Fase 1)
3. **Configurar CMS** (Fase 2)
4. **Crear formulario básico** (Fase 5.1)
5. **Desarrollar custom code** (Fase 5.2)

---

## ❓ PREGUNTAS PARA RESOLVER

1. ¿Prefieres HTML o Multi-Reference para Employment History?
2. ¿Necesitas filtrado por Skills/Tools/Equipment?
3. ¿El formulario será solo para admins o también para VAs?
4. ¿Necesitas validaciones complejas o básicas?
5. ¿Quieres carga masiva inicial o solo nuevos VAs?

---

## 📝 NOTAS ADICIONALES

- Las páginas deben estar creadas en CMS **antes** de cargar datos
- El formulario debe validar que el slug sea único
- Considerar permisos/autenticación para el formulario
- Backup de datos antes de migración masiva
- Testing en staging antes de producción

---

**Status**: ✅ Plan completo listo para revisión y decisiones

