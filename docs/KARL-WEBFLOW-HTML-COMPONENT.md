# Karl Profile - Webflow HTML Component

## ✅ Archivo Creado

**Ubicación**: `webflow-components-minified/307-karl-profile.html`

Este archivo contiene el componente HTML minificado completo para el perfil de Karl, listo para cargar en Webflow.

## 📋 Contenido del Componente

El componente incluye:

- ✅ **Hero Section**: Imagen, nombre, título, summary, skills tags
- ✅ **Tools Section**: Lista de 11 herramientas (AMS360, EZLYNX, etc.)
- ✅ **Equipment Section**: Two-Monitor Setup, Noise-Cancelling Headset
- ✅ **Video Section**: Modal de YouTube con video ID `W6f_dt2kiIY`
- ✅ **Thumbnail Box**: Descripción resumida
- ✅ **Tagline Box**: Descripción extendida
- ✅ **Employment Summary**: Resumen de experiencia
- ✅ **Employment History**: 8 trabajos con accordions expandibles
- ✅ **Assessment Results**: DISC (S+I) y English Test (90/C1)
- ✅ **CEFR Section**: Niveles de inglés con C1 activo

## 🚀 Cómo Cargar en Webflow

### Paso 1: Preparar la Página

1. Abre **Webflow Designer**
2. Ve a la página del perfil de Karl (o créala si no existe)
3. Slug sugerido: `/karl-ocean-va-profile`

### Paso 2: Incluir los Estilos

**IMPORTANTE**: Antes de agregar el contenido, asegúrate de incluir los estilos base.

1. Busca el archivo de estilos: `webflow-components/210-VA-profile-styles.html` (o similar)
2. Agrega un **HTML Embed** al inicio de la página
3. Copia y pega los estilos del archivo de estilos
4. Esto debe ir ANTES del contenido del perfil

### Paso 3: Agregar el Contenido del Perfil

1. Agrega otro **HTML Embed** element después de los estilos
2. Abre el archivo: `webflow-components-minified/307-karl-profile.html`
3. Copia TODO el contenido del archivo
4. Pégalo en el HTML Embed
5. Guarda y cierra

### Paso 4: Verificar

1. **Preview** la página para verificar que todo se vea correctamente
2. Verifica que:
   - La imagen se muestre correctamente
   - Los accordions de empleo funcionen (click para expandir)
   - El video modal funcione (click en el video thumbnail)
   - Los estilos se apliquen correctamente

### Paso 5: Publicar

1. Publica la página en Webflow
2. Verifica en el sitio en vivo que todo funcione

## 📝 Notas Importantes

### Estilos Requeridos

El componente HTML **NO incluye los estilos CSS**. Debes incluir el archivo de estilos por separado:

- Busca: `210-VA-profile-styles.html` o similar en `webflow-components/`
- Los estilos deben estar en un HTML Embed ANTES del contenido del perfil

### Video Modal

El video modal usa el ID de YouTube: `W6f_dt2kiIY`

- Thumbnail: `https://img.youtube.com/vi/W6f_dt2kiIY/maxresdefault.jpg`
- Embed URL: `https://www.youtube.com/embed/W6f_dt2kiIY`
- Modal ID: `va-video-modal-W6f_dt2kiIY`

### Employment Accordions

Los accordions de empleo funcionan con JavaScript inline:
- Click en el header para expandir/colapsar
- Usa `onclick` handlers para toggle de clases

## 🔍 Estructura del HTML

El HTML está minificado (sin saltos de línea) para optimizar el tamaño. La estructura es:

```
<div class="va-profile-page">
  - Back link
  - Hero section (imagen, info, skills)
  - Bottom section (tools, equipment, video)
  - Thumbnail box
  - Tagline box
  - Employment section (summary + history accordions)
  - Assessment results (DISC + English)
  - CEFR section
</div>
```

## ✅ Checklist de Implementación

- [ ] Estilos base incluidos (210-VA-profile-styles.html)
- [ ] Contenido del perfil agregado (307-karl-profile.html)
- [ ] Imagen se muestra correctamente
- [ ] Video modal funciona
- [ ] Employment accordions funcionan
- [ ] Todos los textos se ven correctamente
- [ ] Página publicada y funcionando

## 🆘 Troubleshooting

### Los estilos no se aplican
- Verifica que los estilos estén en un HTML Embed ANTES del contenido
- Asegúrate de que el archivo de estilos esté completo

### El video no funciona
- Verifica que el video ID sea correcto: `W6f_dt2kiIY`
- Asegúrate de que el modal tenga el ID correcto: `va-video-modal-W6f_dt2kiIY`

### Los accordions no funcionan
- Verifica que JavaScript esté habilitado
- Revisa la consola del navegador por errores

