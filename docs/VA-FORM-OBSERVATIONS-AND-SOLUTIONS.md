# VA Form - Observaciones y Soluciones

**Fecha**: Enero 2025  
**Status**: 📋 REVISIÓN Y PLANIFICACIÓN

---

## 🔍 OBSERVACIONES DEL FORMULARIO

### 1. **SPECIALIZATIONS - Cards vs Profile Pages**

**Observación:**
- En **cards** solo se muestran 4 specializations
- En **páginas de perfil** se muestran todas
- El campo es **multi-reference** y está ligado a la tabla "VAs Specializations"

**Pregunta:** ¿Podemos limitar a 4 en cards y mostrar todas en páginas de perfil usando el mismo campo?

**Solución Propuesta:**

**Opción A: Usar el mismo campo multi-reference (RECOMENDADO)**
- En Webflow Designer, en la template de **cards**, limitar visualmente a 4 usando CSS/Webflow settings
- En páginas de perfil, mostrar todas las specializations del campo multi-reference
- **Ventaja**: Un solo campo, datos consistentes
- **Cómo**: En la card template, usar "Limit" en Collection List o mostrar solo los primeros 4 items con CSS

**Opción B: Campos separados**
- `specialization` (multi-reference) - Para páginas de perfil (todas)
- `specialization-cards` (multi-reference limitado) - Para cards (solo 4)
- **Desventaja**: Duplicación de datos, más complejo de mantener

**Recomendación:** ✅ **Opción A** - Usar un solo campo y limitar visualmente en cards

---

### 2. **BOTÓN YOUTUBE EN CARDS - Popup en lugar de nueva pestaña**

**Observación:**
- Actualmente en cards, el botón YouTube abre en nueva pestaña (`window.open`)
- En páginas de perfil, se abre en popup modal
- Se quiere consistencia: popup en cards también

**Solución:**
- Implementar el mismo sistema de popup modal que usan las páginas de perfil
- El modal debe estar presente en la página de cards
- JavaScript debe extraer el video ID de la URL y crear el modal dinámicamente

**Código de referencia** (de páginas de perfil):
```html
<!-- Video Container -->
<div class="va-video-container" onclick="document.getElementById('va-video-modal-VIDEO_ID').style.display='flex'">
  <!-- ... -->
</div>

<!-- Video Modal -->
<div id="va-video-modal-VIDEO_ID" style="display: none; position: fixed; ...">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
  <button onclick="document.getElementById('va-video-modal-VIDEO_ID').style.display='none'">×</button>
</div>
```

**Acción requerida:**
- Actualizar template de cards para usar popup en lugar de `window.open`
- Agregar JavaScript para generar modales dinámicamente

---

### 3. **CAMPO LANGUAGE - Convertir a Option Field**

**Observación:**
- Actualmente es PlainText
- Debe ser Option field para filtros en páginas de categorías
- Opciones: "Bilingües" y "Solo inglés"

**Solución:**
1. Convertir campo `languages` (PlainText) → `language` (Option) en Webflow
2. Opciones del Option field:
   - "Bilingual Spanish-English VA" (o "Bilingües")
   - "English-Speaking VA" (o "Solo inglés")
3. Actualizar formulario para usar dropdown en lugar de text input

**Nota:** En el audit report actual veo que ya existe un campo `language` (Option) en algunas colecciones. Necesitamos verificar si existe en "Virtual Assistants" o crear/convertir.

---

### 4. **DISC Y ENGLISH TEST RESULTS - Descripciones relacionadas a opciones**

**Observación:**
- Las descripciones de DISC y English deberían estar relacionadas a las opciones
- Al seleccionar la opción (ej: "D", "I", "C1", "C2"), debería mostrar automáticamente la descripción correspondiente
- Pregunta: ¿Esto es correcto o deberían cargar descripciones separadas?

**Análisis:**

**Opción A: Descripciones automáticas (RECOMENDADO para formulario)**
- Al seleccionar DISC type → JavaScript auto-completa el campo "DISC Description" con texto predeterminado
- Al seleccionar English Score → JavaScript auto-completa "English Description" con texto predeterminado
- Usuario puede editar las descripciones si necesita personalización
- **Ventaja**: Más rápido, menos errores, consistencia

**Opción B: Descripciones separadas (Más flexible)**
- Usuario escribe descripciones manualmente
- Más trabajo, menos consistencia

**Recomendación:** ✅ **Opción A** - Auto-completar con posibilidad de editar

**Implementación:**
- En el formulario, agregar JavaScript que detecte cambios en los dropdowns
- Tener un objeto/mapa con descripciones predeterminadas para cada opción
- Auto-llenar el textarea correspondiente
- Permitir edición manual

**Ejemplo:**
```javascript
const DISC_DESCRIPTIONS = {
  'D': 'Dominant - Direct, decisive, results-oriented...',
  'I': 'Influencer - Outgoing, enthusiastic, people-focused...',
  'S': 'Steadiness - Dependable, patient, supportive...',
  'C': 'Conscientious - Detail-oriented, organized, analytical...',
  // etc.
};

const ENGLISH_DESCRIPTIONS = {
  'A1': 'Beginner level - Can understand and use familiar everyday expressions...',
  'A2': 'Elementary level - Can have very short social exchanges...',
  // etc.
};
```

---

### 5. **ENGLISH LEVEL (C1, C2, etc.) - HTML específico para tabla CEFR**

**Observación:**
- Al seleccionar el English Level (C1, C2, etc.), debe relacionarse con HTML específico
- Hay una tabla HTML predeterminada de niveles CEFR que muestra todos los niveles (A1-C2)
- El nivel seleccionado debe aparecer como "active" en la tabla
- Este HTML debe mostrarse en la página de perfil

**Solución Propuesta:**

**Opción A: HTML embebido en RichText (RECOMENDADO para páginas dinámicas)**
- Generar HTML de la tabla CEFR con el nivel activo marcado
- Guardar este HTML en un campo RichText (ej: `english-cefr-html`)
- En la página de perfil, renderizar este RichText directamente
- **Ventaja**: Flexible, funciona bien con páginas dinámicas

**Opción B: Conditional Visibility en Webflow**
- Crear 6 bloques HTML (uno para cada nivel A1-C2)
- Usar Conditional Visibility para mostrar solo el bloque correspondiente al nivel seleccionado
- **Ventaja**: Control total en Webflow Designer
- **Desventaja**: Más bloques HTML, más complejo

**Recomendación:** ✅ **Opción A** - Generar HTML y guardarlo en RichText

**Implementación en formulario:**
1. Al seleccionar English Level, JavaScript genera el HTML de la tabla CEFR
2. El nivel seleccionado tiene clase `va-cefr-bubble-active`, los demás `va-cefr-bubble-inactive`
3. Este HTML se guarda en campo RichText `english-cefr-html` (nuevo campo)
4. En la página de perfil, este HTML se renderiza directamente

**Ejemplo de HTML generado:**
```html
<div class="va-cefr-grid">
  <div class="va-cefr-item">
    <div class="va-cefr-bubble va-cefr-bubble-inactive">A1</div>
    <p class="va-cefr-description">Can understand and use familiar everyday expressions...</p>
  </div>
  <!-- ... -->
  <div class="va-cefr-item">
    <div class="va-cefr-bubble va-cefr-bubble-active">C1</div>
    <p class="va-cefr-description">Can use the language flexibly and effectively...</p>
  </div>
  <!-- ... -->
</div>
```

---

## 📋 ACCIONES REQUERIDAS

### Para el Formulario

1. **Specializations:**
   - [ ] Confirmar si se usa un solo campo multi-reference (recomendado)
   - [ ] Nota: La limitación a 4 se hace en el template de cards, no en el formulario

2. **YouTube Popup (Cards):**
   - [ ] Esto NO afecta el formulario, es para el template de cards
   - [ ] Documentar como tarea separada para actualizar cards

3. **Language Field:**
   - [ ] Convertir `languages` (PlainText) → `language` (Option) en Webflow CMS
   - [ ] Opciones: "Bilingual Spanish-English VA", "English-Speaking VA"
   - [ ] Actualizar formulario: cambiar input text → select dropdown

4. **DISC Descriptions:**
   - [ ] Agregar JavaScript para auto-completar descripciones
   - [ ] Crear objeto con descripciones predeterminadas
   - [ ] Permitir edición manual

5. **English Descriptions:**
   - [ ] Agregar JavaScript para auto-completar descripciones
   - [ ] Crear objeto con descripciones predeterminadas
   - [ ] Permitir edición manual

6. **English CEFR HTML:**
   - [ ] Agregar campo `english-cefr-html` (RichText) en CMS
   - [ ] Agregar JavaScript para generar HTML de tabla CEFR
   - [ ] Marcar nivel activo según selección
   - [ ] Guardar HTML en campo RichText

---

## 🎯 PRIORIDADES

1. **Alta**: Language field → Option (necesario para filtros)
2. **Media**: DISC/English auto-completar descripciones (mejora UX)
3. **Media**: English CEFR HTML (necesario para páginas de perfil)
4. **Baja**: YouTube popup en cards (mejora UX, no afecta formulario)

---

## 📝 NOTAS IMPORTANTES

1. **Specializations**: El formulario NO necesita cambios. La limitación a 4 se hace en el template de cards en Webflow Designer.

2. **Multi-reference fields**: El formulario actualmente NO maneja specializations (se configura manualmente después). Si se necesita en el formulario, requeriría implementación adicional.

3. **Descripciones auto-completadas**: Estas pueden ser editadas manualmente después de auto-completarse, dando flexibilidad al usuario.

4. **CEFR HTML**: El HTML generado debe coincidir exactamente con el estilo de las páginas de perfil existentes.

