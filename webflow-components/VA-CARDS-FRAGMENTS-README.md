# VA Cards Custom Code Fragments

Este documento explica cómo implementar los fragmentos de custom code para las VA cards en Webflow.

## 📋 Resumen

Los fragmentos permiten que las VA cards usen contenido dinámico del CMS:
- **Skills Fragment**: Reemplaza "Specialization" con "Skills" (limitado a 4)
- **Tools Fragment**: Muestra herramientas (para filtrado futuro)
- **Video Modal Fragment**: Botón de video que abre un modal

## 📁 Archivos

1. `va-card-skills-fragment.html` - Display de skills (reemplaza Specialization) - **Autocontenido**
2. `va-card-tools-fragment.html` - Display de tools (opcional) - **Autocontenido**
3. `va-card-video-modal-fragment.html` - Botón de video + modal (HTML, CSS y JS incluidos) - **Autocontenido**

---

## 🔧 Instalación Paso a Paso

### Paso 1: Preparar el Template de Card

1. Abre el **Collection Template** de las VA cards en Webflow
2. Asegúrate de que el template tenga acceso a estos campos del CMS:
   - `slug` (Slug field)
   - `skills-tags` (PlainText field - comma-separated)
   - `tools-tags` (PlainText field - comma-separated) - opcional
   - `video` (Link field - YouTube URL)

### Paso 2: Reemplazar Specialization con Skills

1. En el template, encuentra la sección **"Specialization"** (probablemente tiene estructura como):
   ```html
   <div class="va-grid-specialization">
     <div class="va-grid-spec-label">Specialization</div>
     <div class="va-grid-tags">
       {{specialization}}
     </div>
   </div>
   ```

2. **⚠️ IMPORTANTE: Elimina COMPLETAMENTE esa sección**
   - Busca cualquier elemento conectado a campos:
     - `{{specialization}}` (campo multi-reference)
     - `{{skills-richtext}}` (campo Rich Text)
     - Cualquier otro campo relacionado con Specialization/Skills
   - **Elimínalos completamente del template**

3. **Ahora reemplaza esa área** con el contenido de `va-card-skills-fragment.html`

4. Asegúrate de que el campo `{{skills-tags}}` esté disponible en el template (PlainText, comma-separated)

**⚠️ Nota:** Si ves dos secciones de "Specialization" (una bien formateada y otra con texto sin formato), significa que no eliminaste la sección original. Elimínala completamente.

### Paso 3: Agregar Tools (Opcional)

1. Si quieres mostrar tools en las cards, agrega el contenido de `va-card-tools-fragment.html` después de la sección de skills

2. Por defecto, el fragmento de tools está oculto (`display: none`). Para mostrarlo:
   - Comenta la línea `display: none;` en el CSS, O
   - Descomenta el CSS al final del fragmento que dice `/* Optional: Uncomment to show tools section by default */`

### Paso 4: Agregar CSS del Video Modal (Una Vez Por Página)

1. Ve a la página donde se muestran las VA cards (página de categorías)

2. Ve a **Settings > Custom Code > Head Code**

3. Pega el contenido completo de `va-card-video-modal-css.html`

4. **⚠️ IMPORTANTE:** Solo agrega esto una vez por página, no por cada card

### Paso 5: Agregar JavaScript del Video Modal (Una Vez Por Página)

1. En la misma página (Settings > Custom Code)

2. Ve a **Footer Code**

3. Pega el contenido completo de `va-card-video-modal-js.html`

4. **⚠️ IMPORTANTE:** Solo agrega esto una vez por página, no por cada card

### Paso 6: Reemplazar Botón de Video en el Template

1. En el template de la card, encuentra el botón de video (probablemente en el footer):
   ```html
   <button class="va-grid-btn-secondary" title="Watch Video">▶</button>
   ```

2. **Reemplaza ese botón COMPLETAMENTE** con el contenido de `va-card-video-modal-fragment.html`

3. El fragmento incluye:
   - El botón de video (con el onclick para abrir el modal)
   - El HTML del modal (que se oculta por defecto)

4. Asegúrate de que los campos `{{slug}}` y `{{video}}` estén disponibles en el template

**⚠️ IMPORTANTE:** 
- El fragmento HTML (`va-card-video-modal-fragment.html`) se agrega en CADA card (pero solo contiene HTML, no CSS/JS)
- El CSS y JavaScript se agregan UNA SOLA VEZ en la página (pasos 4 y 5)
- Esto previene duplicar ~13KB de código 39 veces (que sería ~507KB innecesarios)

---

## ✅ Verificación

### Skills Fragment
- [ ] Se muestran máximo 4 skills en cada card
- [ ] Si hay más de 4 skills, aparece un tag "+N more"
- [ ] Los tags tienen el estilo correcto

### Tools Fragment (si se implementó)
- [ ] Los tools se muestran correctamente (si están visibles)
- [ ] Los tools están limitados a 4 con "+N more" si es necesario

### Video Modal
- [ ] El botón de video abre un modal
- [ ] El modal muestra el video de YouTube
- [ ] El modal se cierra con el botón ×
- [ ] El modal se cierra al hacer click fuera del video
- [ ] El modal se cierra con la tecla Escape
- [ ] El scroll del fondo se desactiva cuando el modal está abierto
- [ ] El video se detiene cuando se cierra el modal

---

## 🔍 Debugging

### El modal no se abre
- Verifica que agregaste el JavaScript en Footer Code
- Verifica que el campo `{{video}}` tiene una URL válida de YouTube
- Abre la consola del navegador (F12) y busca errores
- Verifica que el slug del VA es único

### Los skills no se muestran
- Verifica que el campo `{{skills-tags}}` tiene datos (comma-separated)
- Verifica que el ID del contenedor coincide con el slug
- Abre la consola del navegador y busca errores de JavaScript

### Los estilos no se ven correctos
- Verifica que agregaste el CSS en Head Code
- Verifica que no hay conflictos con otros estilos de Webflow
- Usa las DevTools para inspeccionar los elementos

---

## 📝 Notas Importantes

1. **Campo `skills-tags`**: Este campo debe contener skills separados por comas, por ejemplo: `"Insurance, Sales, Customer Service, Billing"`

2. **Campo `tools-tags`**: Similar a skills-tags, tools separados por comas, por ejemplo: `"CRM, Excel, HubSpot, Salesforce"`

3. **Slug único**: Cada VA debe tener un slug único. Esto es necesario para que cada modal tenga un ID único.

4. **Fragmentos autocontenidos**: Todos los fragmentos incluyen su propio HTML, CSS y JavaScript. No necesitas agregar código adicional en Head o Footer Code.

5. **Compatibilidad**: Estos fragmentos funcionan con la estructura de clases existente en las cards (`va-grid-card`, `va-grid-tags`, etc.)

---

## 🚀 Próximos Pasos

- [ ] Testear todos los fragmentos juntos
- [ ] Verificar que funcionan en dispositivos móviles
- [ ] Implementar filtrado por tools (futuro)
- [ ] Considerar agregar más fragmentos (equipment, certifications, etc.)

---

## 📞 Soporte

Si tienes problemas con la implementación:
1. Revisa la consola del navegador para errores
2. Verifica que todos los campos del CMS están configurados correctamente
3. Asegúrate de que seguiste todos los pasos de instalación
