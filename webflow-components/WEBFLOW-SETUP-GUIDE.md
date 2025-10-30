# Webflow Setup Guide - Ocean VA Design System

## 📋 Índice
1. [Importar Design System CSS](#importar-design-system-css)
2. [Usar Componentes HTML](#usar-componentes-html)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Clases Disponibles](#clases-disponibles)
5. [Colores & Variables](#colores--variables)

---

## 🎨 Importar Design System CSS

### Opción 1: Cargar CSS Global en Webflow (Recomendado)

1. **Ve a Project Settings** → **Custom Code**
2. **En la sección "Head Code"**, agrega:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/vitoriomanzarek/ocean-va/main/webflow-components/design-system.css">
```

O descarga el archivo `design-system.css` y súbelo a tu proyecto Webflow.

### Opción 2: Copiar CSS en Webflow Custom Code

1. **Abre el archivo `design-system.css`**
2. **Copia todo el contenido**
3. **Ve a Project Settings** → **Custom Code** → **Head Code**
4. **Pega el CSS dentro de tags `<style>`:**

```html
<style>
/* Pega aquí todo el contenido de design-system.css */
</style>
```

---

## 🧩 Usar Componentes HTML

### Paso 1: Crear HTML Embed
1. En tu página de Webflow, agrega un elemento **HTML Embed**
2. Copia el contenido del archivo HTML del componente (ej: `03-navbar-header.html`)
3. Pégalo en el HTML Embed

### Paso 2: Personalizar Links
Reemplaza los links según tu estructura en Webflow:
- `/services/...` → Tu URL de servicios
- `/industries/...` → Tu URL de industrias
- `/contact-us` → Tu URL de contacto

### Paso 3: Personalizar Imágenes
Si necesitas cambiar URLs de imágenes, busca `raw.githubusercontent.com` y reemplaza con tus URLs.

---

## 📁 Estructura de Carpetas

```
webflow-components/
├── design-system.css                    # CSS Global (importar primero)
├── 01-comparison-table.html             # Tabla de comparación
├── 02-client-logos-carousel.html        # Carrusel de logos
├── 03-navbar-header.html                # Header/Navbar
├── 04-hero-section.html                 # Hero section
├── 05-footer.html                       # Footer
├── 06-stats-section.html                # Stats section
├── 07-pricing-section.html              # Pricing section
├── 08-timeline-section.html             # Timeline section
├── 09-testimonials-section.html         # Testimonials section
├── 10-faq-section.html                  # FAQ section
├── 11-services-industries-showcase.html # Services & Industries
├── 12-va-showcase.html                  # VA Showcase
├── README.md                            # Documentación
└── WEBFLOW-SETUP-GUIDE.md              # Este archivo
```

---

## 🎯 Clases Disponibles

### Botones
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-ghost">Ghost Button</button>
<button class="btn btn-sm">Small Button</button>
<button class="btn btn-lg">Large Button</button>
```

### Cards
```html
<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">Body</div>
  <div class="card-footer">Footer</div>
</div>
```

### Grids
```html
<div class="grid grid-2"><!-- 2 columnas --></div>
<div class="grid grid-3"><!-- 3 columnas --></div>
<div class="grid grid-4"><!-- 4 columnas --></div>
<div class="grid grid-auto"><!-- Auto responsive --></div>
```

### Flexbox
```html
<div class="flex"><!-- Flex row --></div>
<div class="flex flex-col"><!-- Flex column --></div>
<div class="flex-center"><!-- Centered --></div>
<div class="flex-between"><!-- Space between --></div>
```

### Spacing
```html
<div class="m-md"><!-- Margin --></div>
<div class="mt-lg"><!-- Margin top --></div>
<div class="mb-xl"><!-- Margin bottom --></div>
<div class="p-lg"><!-- Padding --></div>
<div class="gap-md"><!-- Gap (flex/grid) --></div>
```

### Text
```html
<p class="text-center">Centered text</p>
<p class="text-lg">Large text</p>
<p class="font-bold">Bold text</p>
<p class="text-ocean-600">Ocean color</p>
```

### Backgrounds
```html
<div class="bg-white">White background</div>
<div class="bg-gray-50">Light gray background</div>
<div class="bg-ocean-600">Ocean background</div>
<div class="gradient-ocean">Ocean gradient</div>
```

### Borders & Radius
```html
<div class="border">Border</div>
<div class="rounded-md">Rounded medium</div>
<div class="rounded-lg">Rounded large</div>
<div class="rounded-full">Fully rounded</div>
```

### Shadows
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
```

### Hover Effects
```html
<div class="hover-lift">Lift on hover</div>
<div class="hover-scale">Scale on hover</div>
<div class="hover-opacity">Opacity on hover</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
```

### Animations
```html
<div class="animate-fadeIn">Fade in</div>
<div class="animate-slideUp">Slide up</div>
<div class="animate-slideDown">Slide down</div>
<div class="animate-pulse">Pulse</div>
```

---

## 🎨 Colores & Variables

### Colores Ocean
- `--ocean-50`: `#e6fffe` (muy claro)
- `--ocean-100`: `#ccfffe` (claro)
- `--ocean-500`: `#05bfb9` (medio)
- `--ocean-600`: `#049d98` (principal)
- `--ocean-700`: `#037b77` (hover/oscuro)
- `--ocean-900`: `#024a47` (muy oscuro)

### Colores Neutrales
- `--gray-50`: `#f9fafb`
- `--gray-100`: `#f3f4f6`
- `--gray-200`: `#e5e7eb`
- `--gray-600`: `#4b5563`
- `--gray-700`: `#374151`
- `--gray-900`: `#111827`

### Espacios (Spacing)
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px
- `--spacing-4xl`: 80px

### Border Radius
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-full`: 9999px

### Sombras (Shadows)
- `--shadow-sm`: 0 1px 2px rgba(0, 0, 0, 0.05)
- `--shadow-md`: 0 4px 6px rgba(0, 0, 0, 0.1)
- `--shadow-lg`: 0 10px 15px rgba(0, 0, 0, 0.1)
- `--shadow-xl`: 0 20px 25px rgba(0, 0, 0, 0.1)

### Transiciones (Transitions)
- `--transition-fast`: 0.15s ease
- `--transition-base`: 0.2s ease
- `--transition-slow`: 0.3s ease

---

## 📱 Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 769px

---

## 🚀 Flujo de Trabajo Recomendado

1. **Importa `design-system.css`** en Project Settings
2. **Crea tus páginas** usando HTML Embeds con los componentes
3. **Usa las clases CSS** para personalizar estilos
4. **Personaliza colores** usando las variables CSS
5. **Prueba en mobile** para asegurar responsividad

---

## 💡 Tips & Tricks

### Combinar Clases
```html
<div class="card p-lg shadow-md rounded-lg hover-lift">
  Combina múltiples clases para crear estilos complejos
</div>
```

### Usar Variables CSS
```html
<style>
  .custom-element {
    color: var(--ocean-600);
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
  }
</style>
```

### Responsive Design
```html
<div class="grid grid-3">
  <!-- En desktop: 3 columnas -->
  <!-- En tablet: 1 columna (automático) -->
  <!-- En mobile: 1 columna (automático) -->
</div>
```

---

## 📞 Soporte

Si necesitas ayuda:
1. Revisa el archivo `README.md` para documentación de componentes
2. Verifica que `design-system.css` esté cargado correctamente
3. Asegúrate de que los links estén personalizados para tu sitio

---

**Última actualización**: Oct 29, 2025
**Versión**: 1.0
