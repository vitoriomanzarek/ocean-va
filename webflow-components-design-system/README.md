# Ocean VA Design System

Sistema de diseño unificado para componentes Webflow.

## 📁 Estructura

```
webflow-components-design-system/
├── DesignSystemShowcase.jsx    # Componente React para visualizar el design system
├── DesignSystemShowcase.css    # Estilos del showcase
├── design-system.css           # CSS del design system (variables y utilidades)
├── design-system.min.css       # CSS minificado para producción (15.9% más pequeño)
├── navbar.html                 # Navbar alineado con design system
├── navbar.min.html             # Navbar minificado (20.5% más pequeño)
├── footer.html                 # Footer alineado con design system
├── footer.min.html             # Footer minificado (19.7% más pequeño)
├── homepage-demo.html          # Demo HTML del homepage con design system
├── navbar-footer-demo.html      # Demo completo con navbar y footer
├── DESIGN_SYSTEM_ANALYSIS.md   # Análisis técnico automatizado
├── ANALISIS_COMPLETO_DESIGN_SYSTEM.md  # Análisis completo con estrategia
└── README.md                   # Este archivo
```

## 📦 Archivos CSS

### design-system.css
Versión completa del design system con comentarios y formato legible. Ideal para desarrollo.

### design-system.min.css
Versión minificada optimizada para producción:
- **Tamaño**: ~16.9 KB (vs 20.1 KB original)
- **Reducción**: 15.9% más pequeño
- **Uso**: Ideal para producción en Webflow o sitios en vivo

```html
<!-- Para desarrollo -->
<link rel="stylesheet" href="design-system.css">

<!-- Para producción -->
<link rel="stylesheet" href="design-system.min.css">
```

## 🚀 Uso del Showcase

### En React/Vite

```jsx
import DesignSystemShowcase from './webflow-components-design-system/DesignSystemShowcase';
import './webflow-components-design-system/DesignSystemShowcase.css';

function App() {
  return <DesignSystemShowcase />;
}
```

### Ver en el navegador

1. Asegúrate de tener React configurado en tu proyecto
2. Importa el componente en tu aplicación
3. Navega a la ruta donde está renderizado

## 🏠 Homepage Demo HTML

Se ha creado una versión HTML estática del homepage usando el design system:

- **Archivo**: `homepage-demo.html`
- **Ubicación**: `webflow-components-design-system/homepage-demo.html`

### Características

- ✅ Usa variables CSS del design system
- ✅ Colores consistentes (Primary 700, 900)
- ✅ Tipografía estandarizada
- ✅ Espaciado basado en 8px
- ✅ Botones con estilos unificados y hover effects
- ✅ Responsive design
- ✅ Columnas correctas (imagen izquierda, contenido derecha)
- ✅ Botones lado a lado (no full width)

### Cómo Ver

1. Abre el archivo `homepage-demo.html` directamente en el navegador
2. O sirve desde un servidor local:
   ```bash
   cd webflow-components-design-system
   python3 -m http.server 8000
   # Luego abre: http://localhost:8000/homepage-demo.html
   ```

## 📊 Contenido del Showcase

El componente muestra visualmente:

1. **Paleta de Colores**
   - Colores primarios (Teal)
   - Escala de grises
   - Colores semánticos

2. **Tipografía**
   - Escala de tamaños (XS a 8XL)
   - Pesos de fuente (Normal a Bold)

3. **Sistema de Espaciado**
   - Escala basada en 8px
   - Visualización de cada valor

4. **Border Radius**
   - Valores estándar
   - Ejemplos visuales

5. **Sombras**
   - Diferentes niveles de elevación
   - Ejemplos visuales

6. **Botones**
   - Variantes (Primary, Secondary, Outline, Ghost)
   - Tamaños (Small, Default, Large)
   - Estados (Disabled, Loading)

7. **Cards**
   - Default, Elevated, Bordered
   - Benefit Cards
   - Tech Cards
   - Service/Industry Cards
   - Feature Cards (Glassmorphism)
   - Stat Cards
   - Ejemplos de uso

8. **Modal**
   - Modal base con overlay
   - Header, Body, Footer
   - Close button
   - Responsive

9. **Tables**
   - Comparison Table
   - Styled headers
   - Hover effects

10. **Trust Badges**
    - Glassmorphism effect
    - Para hero sections

11. **Breakpoints Responsive**
    - SM, MD, LG, XL
    - Descripción de uso

12. **Gradientes**
    - Gradientes primarios
    - Ejemplos visuales

## 🎨 Valores del Design System

### Colores Primarios
- `#037b77` - Primary 900 (Darkest)
- `#049d98` - Primary 700 (Main)
- `#05bfb9` - Primary 500 (Light)
- `#e6fffe` - Primary 100 (Lightest)

### Escala de Grises
- `#111827` a `#f9fafb` (9 niveles)

### Tipografía
- Tamaños: 12px a 56px (12 niveles)
- Pesos: 400, 500, 600, 700

### Espaciado
- Base: 8px (0.5rem)
- Escala: 0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px

### Breakpoints
- SM: 640px
- MD: 768px
- LG: 1024px
- XL: 1280px

## 🧩 Componentes HTML Disponibles

### Navbar
- **Archivos**: 
  - `navbar.html` - Versión completa (legible)
  - `navbar.min.html` - Versión minificada (20.5% más pequeño, ~14.5 KB)
- **Características**:
  - ✅ Usa variables CSS del design system
  - ✅ Dropdowns funcionales para Services, Industries, Our VAs
  - ✅ Menú móvil responsive con hamburger
  - ✅ Botón CTA usando clases del design system
  - ✅ Transiciones suaves con variables del design system
  - ✅ Colores consistentes (Primary 700, Gray scale)
  - ✅ Espaciado basado en variables del design system

### Footer
- **Archivos**: 
  - `footer.html` - Versión completa (legible)
  - `footer.min.html` - Versión minificada (19.7% más pequeño, ~9 KB)
- **Características**:
  - ✅ Usa variables CSS del design system
  - ✅ Grid responsive con cards para cada columna
  - ✅ Barra de contacto con color Primary 50
  - ✅ Iconos sociales con hover effects
  - ✅ Links con transiciones suaves
  - ✅ Colores y espaciado consistentes

### Uso en Webflow
1. Copia el contenido del archivo HTML (usa `.min.html` para producción)
2. Pega en un elemento Embed Code en Webflow
3. Asegúrate de que el archivo `design-system.css` o `design-system.min.css` esté disponible
4. Los componentes son completamente autónomos con estilos inline

**Recomendación para producción:**
- Usa `navbar.min.html` y `footer.min.html` junto con `design-system.min.css`
- Esto reduce el tamaño total en ~20% mejorando tiempos de carga

## 🧩 Utilidades del Design System

### Layout
- `.ds-container` - Container estándar (1400px)
- `.ds-container-narrow` - Container estrecho (1000px)
- `.ds-container-standard` - Container estándar (1280px)
- `.ds-section` - Sección con padding
- `.ds-section-sm` - Sección pequeña

### Grid
- `.ds-grid` - Grid base
- `.ds-grid-2`, `.ds-grid-3`, `.ds-grid-4` - Grids con columnas fijas
- `.ds-grid-auto-fit` - Grid auto-fit (min 200px)
- `.ds-grid-auto-fit-sm` - Grid auto-fit (min 250px)
- `.ds-grid-auto-fit-md` - Grid auto-fit (min 280px)

### Cards
- `.ds-card` - Card base con hover
- `.ds-card-elevated` - Card con sombra elevada
- `.ds-benefit-card` - Card para beneficios
- `.ds-tech-card` - Card para tech stack
- `.ds-service-card` - Card para servicios/industrias
- `.ds-feature-card` - Card con glassmorphism
- `.ds-stat-card` - Card para estadísticas

### Buttons
- `.ds-button` - Button base
- `.ds-button-primary` - Button primario
- `.ds-button-secondary` - Button secundario
- `.ds-button-outline` - Button outline
- `.ds-button-white` - Button blanco
- `.ds-button-lg` - Button grande

### Modal
- `.ds-modal` - Modal container
- `.ds-modal.active` - Modal activo
- `.ds-modal-content` - Contenido del modal
- `.ds-modal-header` - Header del modal
- `.ds-modal-body` - Body del modal
- `.ds-modal-footer` - Footer del modal
- `.ds-modal-close` - Botón de cerrar
- `.ds-modal-button` - Botón dentro del modal

### Tables
- `.ds-comparison-table-wrapper` - Wrapper para tabla
- `.ds-comparison-table` - Tabla de comparación

### Trust Badges
- `.ds-trust-badge` - Badge con glassmorphism
- `.ds-trust-badge-icon` - Icono del badge

### Icon Utilities
- `.ds-icon-xs` a `.ds-icon-5xl` - Tamaños de iconos

## 📝 Próximos Pasos

1. ✅ Análisis completado
2. ✅ Showcase visual creado
3. ✅ Archivo CSS del design system creado
4. ✅ Homepage demo HTML con design system
5. ✅ Componentes base creados
6. ✅ Navbar alineado con design system
7. ✅ Footer alineado con design system
8. ⏳ Migración de componentes del home (Hero, Stats, CTA, etc.)
9. ⏳ Documentación de uso completa
10. ⏳ Guía de migración

## 🔗 Enlaces

- [Análisis Completo](./ANALISIS_COMPLETO_DESIGN_SYSTEM.md)
- [Análisis Técnico](./DESIGN_SYSTEM_ANALYSIS.md)
- [Homepage Demo](./homepage-demo.html)
