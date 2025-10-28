# Media Integration Guide - Ocean VA

## Descripción General
Este documento explica cómo agregar imágenes y contenido multimedia al sitio Ocean VA.

## Estructura Actual

### Componente MediaGallery
**Ubicación**: `src/components/MediaGallery.jsx`
**Integrado en**: `src/Home.jsx` (después de ClientLogos)

El componente tiene dos secciones:

#### 1. Grid de 4 Imágenes (Responsive)
- **Insurance VA in Action** - Imagen de VA trabajando
- **Team Collaboration** - Colaboración en equipo
- **Client Success Stories** - Casos de éxito
- **Technology & Tools** - Herramientas y plataformas

Cada item tiene:
- Placeholder con icono (ImageIcon de Lucide)
- Título
- Descripción
- Categoría (badge)

#### 2. Sección Destacada (Featured)
- Imagen grande con descripción
- Lista de resultados comprobados
- Diseño 2 columnas (responsive)

## Cómo Agregar Imágenes

### Paso 1: Preparar las Imágenes
1. Coloca tus imágenes en `/public/images/`
2. Formatos recomendados: `.jpg`, `.png`, `.webp`
3. Tamaños recomendados:
   - Grid items: 800x600px (aspect-video 16:9)
   - Featured: 1200x800px

### Paso 2: Actualizar MediaGallery.jsx

#### Para las 4 imágenes del grid:
Busca el array `mediaItems` y reemplaza los items:

```jsx
const mediaItems = [
  {
    id: 1,
    title: 'Insurance VA in Action',
    description: 'Nuestros Virtual Assistants manejando tareas administrativas complejas...',
    image: '/images/va-working.jpg',  // ← AGREGAR ESTA LÍNEA
    placeholder: 'Imagen de VA trabajando en seguros',
    category: 'Operations'
  },
  // ... más items
]
```

Luego actualiza el JSX del placeholder para mostrar la imagen:

```jsx
{/* Image Placeholder */}
<div className="aspect-video bg-gradient-to-br from-ocean-100 to-ocean-50 flex items-center justify-center border-2 border-dashed border-ocean-300">
  {item.image ? (
    <img 
      src={item.image} 
      alt={item.title}
      className="w-full h-full object-cover rounded-lg"
    />
  ) : (
    <div className="text-center">
      <ImageIcon className="w-12 h-12 text-ocean-400 mx-auto mb-2" />
      <p className="text-sm text-ocean-600 font-medium px-2">
        {item.placeholder}
      </p>
    </div>
  )}
</div>
```

#### Para la imagen destacada:
Busca la sección "Featured Section" y reemplaza:

```jsx
{/* Image Placeholder */}
<div className="aspect-video bg-gradient-to-br from-ocean-200 to-ocean-100 rounded-lg flex items-center justify-center border-2 border-dashed border-ocean-400">
  {featuredImage ? (
    <img 
      src={featuredImage} 
      alt="Transformación de Agencia"
      className="w-full h-full object-cover rounded-lg"
    />
  ) : (
    <div className="text-center">
      <ImageIcon className="w-16 h-16 text-ocean-500 mx-auto mb-3" />
      <p className="text-lg text-ocean-700 font-medium">
        Imagen destacada: Transformación de Agencia
      </p>
    </div>
  )}
</div>
```

### Paso 3: Agregar Lazy Loading (Opcional)
Para optimizar el rendimiento, puedes agregar lazy loading:

```jsx
<img 
  src={item.image} 
  alt={item.title}
  loading="lazy"
  className="w-full h-full object-cover rounded-lg"
/>
```

## Estructura de Carpetas Recomendada

```
/public/images/
├── va-working.jpg              (Insurance VA in Action)
├── team-collaboration.jpg      (Team Collaboration)
├── success-stories.jpg         (Client Success Stories)
├── technology-tools.jpg        (Technology & Tools)
└── featured-transformation.jpg (Featured Section)
```

## Propiedades de Imagen Optimizadas

### Tailwind Classes Usadas
- `w-full h-full` - Ancho y alto completo
- `object-cover` - Mantiene aspect ratio sin distorsión
- `rounded-lg` - Bordes redondeados
- `aspect-video` - Ratio 16:9

### Responsive Behavior
El componente es completamente responsive:
- Mobile: 1 columna
- Tablet (md): 2 columnas
- Desktop (lg): 4 columnas (grid items) o 2 columnas (featured)

## Notas Importantes

1. **Placeholders**: Mientras no tengas imágenes, los placeholders con iconos se mostrarán automáticamente
2. **Rutas**: Todas las imágenes deben estar en `/public/images/` para ser accesibles
3. **Formatos**: Usa WebP para mejor compresión, con fallback a JPG
4. **Alt Text**: Siempre incluye alt text descriptivo para accesibilidad
5. **Tamaño**: Optimiza imágenes antes de subir (máx 500KB por imagen)

## Próximas Mejoras Sugeridas

- [ ] Agregar galería con modal/lightbox
- [ ] Implementar image optimization con Next.js Image component (si migras a Next)
- [ ] Agregar videos embebidos en secciones específicas
- [ ] Crear carrusel de testimonios con fotos
- [ ] Agregar animaciones de fade-in al scroll

## Contacto
Cuando tengas las imágenes listas, simplemente:
1. Colócalas en `/public/images/`
2. Actualiza las rutas en `MediaGallery.jsx`
3. Haz commit y push a la rama `feature/media-content`
