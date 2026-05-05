# WAGS Design System

Sistema de diseÃ±o unificado para componentes Webflow.

## ðŸ“ Estructura

```
webflow-components-design-system/
â”œâ”€â”€ DesignSystemShowcase.jsx    # Componente React para visualizar el design system
â”œâ”€â”€ DesignSystemShowcase.css    # Estilos del showcase
â”œâ”€â”€ design-system.css           # CSS del design system (variables y utilidades)
â”œâ”€â”€ design-system.min.css       # CSS minificado para producciÃ³n (15.9% mÃ¡s pequeÃ±o)
â”œâ”€â”€ navbar.html                 # Navbar alineado con design system
â”œâ”€â”€ navbar.min.html             # Navbar minificado (20.5% mÃ¡s pequeÃ±o)
â”œâ”€â”€ footer.html                 # Footer alineado con design system
â”œâ”€â”€ footer.min.html             # Footer minificado (19.7% mÃ¡s pequeÃ±o)
â”œâ”€â”€ homepage-demo.html          # Demo HTML del homepage con design system
â”œâ”€â”€ navbar-footer-demo.html      # Demo completo con navbar y footer
â”œâ”€â”€ DESIGN_SYSTEM_ANALYSIS.md   # AnÃ¡lisis tÃ©cnico automatizado
â”œâ”€â”€ ANALISIS_COMPLETO_DESIGN_SYSTEM.md  # AnÃ¡lisis completo con estrategia
â””â”€â”€ README.md                   # Este archivo
```

## ðŸ“¦ Archivos CSS

### design-system.css
VersiÃ³n completa del design system con comentarios y formato legible. Ideal para desarrollo.

### design-system.min.css
VersiÃ³n minificada optimizada para producciÃ³n:
- **TamaÃ±o**: ~16.9 KB (vs 20.1 KB original)
- **ReducciÃ³n**: 15.9% mÃ¡s pequeÃ±o
- **Uso**: Ideal para producciÃ³n en Webflow o sitios en vivo

```html
<!-- Para desarrollo -->
<link rel="stylesheet" href="design-system.css">

<!-- Para producciÃ³n -->
<link rel="stylesheet" href="design-system.min.css">
```

## ðŸš€ Uso del Showcase

### En React/Vite

```jsx
import DesignSystemShowcase from './webflow-components-design-system/DesignSystemShowcase';
import './webflow-components-design-system/DesignSystemShowcase.css';

function App() {
  return <DesignSystemShowcase />;
}
```

### Ver en el navegador

1. AsegÃºrate de tener React configurado en tu proyecto
2. Importa el componente en tu aplicaciÃ³n
3. Navega a la ruta donde estÃ¡ renderizado

## ðŸ  Homepage Demo HTML

Se ha creado una versiÃ³n HTML estÃ¡tica del homepage usando el design system:

- **Archivo**: `homepage-demo.html`
- **UbicaciÃ³n**: `webflow-components-design-system/homepage-demo.html`

### CaracterÃ­sticas

- âœ… Usa variables CSS del design system
- âœ… Colores consistentes (Primary 700, 900)
- âœ… TipografÃ­a estandarizada
- âœ… Espaciado basado en 8px
- âœ… Botones con estilos unificados y hover effects
- âœ… Responsive design
- âœ… Columnas correctas (imagen izquierda, contenido derecha)
- âœ… Botones lado a lado (no full width)

### CÃ³mo Ver

1. Abre el archivo `homepage-demo.html` directamente en el navegador
2. O sirve desde un servidor local:
   ```bash
   cd webflow-components-design-system
   python3 -m http.server 8000
   # Luego abre: http://localhost:8000/homepage-demo.html
   ```

## ðŸ“Š Contenido del Showcase

El componente muestra visualmente:

1. **Paleta de Colores**
   - Colores primarios (Teal)
   - Escala de grises
   - Colores semÃ¡nticos

2. **TipografÃ­a**
   - Escala de tamaÃ±os (XS a 8XL)
   - Pesos de fuente (Normal a Bold)

3. **Sistema de Espaciado**
   - Escala basada en 8px
   - VisualizaciÃ³n de cada valor

4. **Border Radius**
   - Valores estÃ¡ndar
   - Ejemplos visuales

5. **Sombras**
   - Diferentes niveles de elevaciÃ³n
   - Ejemplos visuales

6. **Botones**
   - Variantes (Primary, Secondary, Outline, Ghost)
   - TamaÃ±os (Small, Default, Large)
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
    - DescripciÃ³n de uso

12. **Gradientes**
    - Gradientes primarios
    - Ejemplos visuales

## ðŸŽ¨ Valores del Design System

### Colores Primarios
- `#037b77` - Primary 900 (Darkest)
- `#049d98` - Primary 700 (Main)
- `#05bfb9` - Primary 500 (Light)
- `#e6fffe` - Primary 100 (Lightest)

### Escala de Grises
- `#111827` a `#f9fafb` (9 niveles)

### TipografÃ­a
- TamaÃ±os: 12px a 56px (12 niveles)
- Pesos: 400, 500, 600, 700

### Espaciado
- Base: 8px (0.5rem)
- Escala: 0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px

### Breakpoints
- SM: 640px
- MD: 768px
- LG: 1024px
- XL: 1280px

## ðŸ§© Componentes HTML Disponibles

### Navbar
- **Archivos**: 
  - `navbar.html` - VersiÃ³n completa (legible)
  - `navbar.min.html` - VersiÃ³n minificada (20.5% mÃ¡s pequeÃ±o, ~14.5 KB)
- **CaracterÃ­sticas**:
  - âœ… Usa variables CSS del design system
  - âœ… Dropdowns funcionales para Services, Industries, Our VAs
  - âœ… MenÃº mÃ³vil responsive con hamburger
  - âœ… BotÃ³n CTA usando clases del design system
  - âœ… Transiciones suaves con variables del design system
  - âœ… Colores consistentes (Primary 700, Gray scale)
  - âœ… Espaciado basado en variables del design system

### Footer
- **Archivos**: 
  - `footer.html` - VersiÃ³n completa (legible)
  - `footer.min.html` - VersiÃ³n minificada (19.7% mÃ¡s pequeÃ±o, ~9 KB)
- **CaracterÃ­sticas**:
  - âœ… Usa variables CSS del design system
  - âœ… Grid responsive con cards para cada columna
  - âœ… Barra de contacto con color Primary 50
  - âœ… Iconos sociales con hover effects
  - âœ… Links con transiciones suaves
  - âœ… Colores y espaciado consistentes

### Uso en Webflow
1. Copia el contenido del archivo HTML (usa `.min.html` para producciÃ³n)
2. Pega en un elemento Embed Code en Webflow
3. AsegÃºrate de que el archivo `design-system.css` o `design-system.min.css` estÃ© disponible
4. Los componentes son completamente autÃ³nomos con estilos inline

**RecomendaciÃ³n para producciÃ³n:**
- Usa `navbar.min.html` y `footer.min.html` junto con `design-system.min.css`
- Esto reduce el tamaÃ±o total en ~20% mejorando tiempos de carga

## ðŸ§© Utilidades del Design System

### Layout
- `.ds-container` - Container estÃ¡ndar (1400px)
- `.ds-container-narrow` - Container estrecho (1000px)
- `.ds-container-standard` - Container estÃ¡ndar (1280px)
- `.ds-section` - SecciÃ³n con padding
- `.ds-section-sm` - SecciÃ³n pequeÃ±a

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
- `.ds-stat-card` - Card para estadÃ­sticas

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
- `.ds-modal-close` - BotÃ³n de cerrar
- `.ds-modal-button` - BotÃ³n dentro del modal

### Tables
- `.ds-comparison-table-wrapper` - Wrapper para tabla
- `.ds-comparison-table` - Tabla de comparaciÃ³n

### Trust Badges
- `.ds-trust-badge` - Badge con glassmorphism
- `.ds-trust-badge-icon` - Icono del badge

### Icon Utilities
- `.ds-icon-xs` a `.ds-icon-5xl` - TamaÃ±os de iconos

## ðŸ“ PrÃ³ximos Pasos

1. âœ… AnÃ¡lisis completado
2. âœ… Showcase visual creado
3. âœ… Archivo CSS del design system creado
4. âœ… Homepage demo HTML con design system
5. âœ… Componentes base creados
6. âœ… Navbar alineado con design system
7. âœ… Footer alineado con design system
8. â³ MigraciÃ³n de componentes del home (Hero, Stats, CTA, etc.)
9. â³ DocumentaciÃ³n de uso completa
10. â³ GuÃ­a de migraciÃ³n

## ðŸ”— Enlaces

- [AnÃ¡lisis Completo](./ANALISIS_COMPLETO_DESIGN_SYSTEM.md)
- [AnÃ¡lisis TÃ©cnico](./DESIGN_SYSTEM_ANALYSIS.md)
- [Homepage Demo](./homepage-demo.html)

