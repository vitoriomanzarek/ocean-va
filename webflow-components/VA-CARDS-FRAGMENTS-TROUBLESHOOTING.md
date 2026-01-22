# VA Cards Fragments - Troubleshooting

## 🔴 Problema: Skills aparecen duplicados o sin formato

### Síntomas:
- Ves dos secciones de "Specialization"
- Una muestra tags bien formateados (correcto)
- Otra muestra texto sin formato con `&amp;` o HTML crudo (incorrecto)

### Causa:
Tienes dos campos mostrándose simultáneamente:
1. El fragmento de skills (correcto) - usa `{{skills-tags}}` (PlainText)
2. Un campo Rich Text (incorrecto) - probablemente `{{skills-richtext}}` o `{{specialization}}`

### Solución:

1. **Elimina la sección original de Specialization:**
   - En el template de la card, busca cualquier elemento conectado al campo:
     - `{{specialization}}`
     - `{{skills-richtext}}`
     - Cualquier Rich Text field relacionado con skills/specialization
   - **Elimínalo completamente del template**

2. **Asegúrate de que solo usas el fragmento:**
   - Debe haber SOLO UNA sección con clase `va-grid-specialization`
   - Esa sección debe contener SOLO el código del fragmento `va-card-skills-fragment.html`

3. **Verifica los campos del CMS:**
   - El fragmento usa `{{skills-tags}}` (PlainText, comma-separated)
   - NO debe haber ningún campo Rich Text mostrándose en esa área

---

## ⚡ Pregunta: ¿El script hace la página pesada?

### Respuesta: **No, es muy eficiente**

#### Razones:

1. **IIFE (Immediately Invoked Function Expression):**
   - Cada script está encapsulado y se ejecuta una vez por card
   - No contamina el scope global
   - Se limpia después de ejecutarse

2. **Tamaño del código:**
   - El script de skills es muy pequeño (~1.5KB)
   - Solo procesa datos locales (del campo `{{skills-tags}}`)
   - No hace requests HTTP ni carga recursos externos

3. **Ejecución optimizada:**
   - El script solo se ejecuta cuando la card se renderiza
   - Hace operaciones mínimas (split, map, crear 4-5 elementos DOM)
   - Cada instancia es independiente

4. **Comparación:**
   - Un solo script pequeño por card
   - Mucho más eficiente que cargar múltiples componentes React/Vue
   - Más eficiente que hacer API calls para cada card

#### Ejemplo de rendimiento:
- 20 cards en una página = 20 scripts (~30KB total)
- Un solo script global compartido = 2-3KB, pero tendría que buscar todas las cards y procesarlas juntas
- En este caso, el enfoque de script por card es más modular y fácil de mantener

#### Optimización futura (si es necesario):
Si tuvieras 50+ cards y notaras lentitud, podrías:
- Convertir a un solo script global que procese todas las cards
- Usar `MutationObserver` para cards que se cargan dinámicamente
- Lazy load el script solo cuando sea necesario

**Conclusión:** Para una cantidad normal de cards (10-30), este enfoque es perfecto y no afecta el rendimiento.

---

## 🔧 Otros problemas comunes

### Los skills no se muestran
- Verifica que el campo `{{skills-tags}}` tiene datos
- Verifica que el formato es correcto: `"Skill1, Skill2, Skill3"`
- Abre la consola del navegador (F12) y busca errores
- Verifica que el slug es único

### Los estilos no se ven correctos
- Verifica que las clases CSS (`va-grid-tag`, `va-grid-tags`) están definidas
- Verifica que no hay conflictos con otros estilos de Webflow
- Usa las DevTools para inspeccionar los elementos

### El script no se ejecuta
- Verifica que el Custom Code está en el lugar correcto del template
- Verifica que el ID del contenedor coincide con el slug
- Verifica que no hay errores de JavaScript en la consola
