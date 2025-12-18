# Ocean VA Design System

Sistema de diseño unificado para componentes Webflow.

## 📁 Estructura

```
webflow-components-design-system/
├── DesignSystemShowcase.jsx    # Componente React para visualizar el design system
├── DesignSystemShowcase.css    # Estilos del showcase
├── DESIGN_SYSTEM_ANALYSIS.md   # Análisis técnico automatizado
├── ANALISIS_COMPLETO_DESIGN_SYSTEM.md  # Análisis completo con estrategia
└── README.md                   # Este archivo
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
   - Ejemplos de uso

8. **Breakpoints Responsive**
   - SM, MD, LG, XL
   - Descripción de uso

9. **Gradientes**
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

## 📝 Próximos Pasos

1. ✅ Análisis completado
2. ✅ Showcase visual creado
3. ⏳ Crear archivo CSS del design system
4. ⏳ Crear componentes base
5. ⏳ Documentación de uso
6. ⏳ Guía de migración

## 🔗 Enlaces

- [Análisis Completo](./ANALISIS_COMPLETO_DESIGN_SYSTEM.md)
- [Análisis Técnico](./DESIGN_SYSTEM_ANALYSIS.md)

