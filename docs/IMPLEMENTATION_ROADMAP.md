# Plan de Implementación: Migración a Webflow Developer Workflow

## 🎯 Objetivo General
Transformar el flujo de trabajo actual (JSX → HTML manual) a un sistema automatizado y escalable usando **Code Components + MCP Server + Data API**.

---

## 📅 TIMELINE: 4 Semanas

### **SEMANA 1: Configuración Base**

#### Día 1-2: Preparación del Entorno
```
[ ] Verificar acceso a Webflow Developer Platform
[ ] Confirmar plan Webflow (debe incluir API access)
[ ] Instalar Node.js 22.3.0
[ ] Instalar DevLink CLI
[ ] Crear webflow.config.json en raíz del proyecto
```

**Archivos a crear:**
```json
// webflow.config.json
{
  "projectId": "YOUR_PROJECT_ID",
  "token": "YOUR_API_TOKEN",
  "sites": [
    {
      "name": "ocean-va",
      "id": "66e9b3f71eb321a17e92218a"
    }
  ]
}
```

#### Día 3-4: Instalar MCP Server
```
[ ] Instalar mcp-remote globalmente
[ ] Configurar Claude Desktop (si usas)
[ ] Configurar Cursor (si usas)
[ ] Autorizar Webflow via OAuth
[ ] Verificar conexión con `mcp-remote test`
```

#### Día 5: Primer Code Component
```
[ ] Crear carpeta src/webflow-components/
[ ] Crear archivo Hero.webflow.tsx
[ ] Instalar @webflow/react
[ ] Implementar declareComponent
[ ] Sincronizar con DevLink
[ ] Validar en Webflow Designer
```

**Estructura:**
```
src/
├── components/          (componentes React actuales)
├── webflow-components/  (NEW - Code Components)
│   ├── Hero.webflow.tsx
│   ├── Pricing.webflow.tsx
│   ├── VAShowcase.webflow.tsx
│   └── index.ts
└── ...
```

---

### **SEMANA 2: Migración de Componentes Principales**

#### Día 1-2: Convertir 3 Componentes Principales
```
[ ] Hero.webflow.tsx
    - Convertir de JSX a Code Component
    - Exponer props: title, subtitle, ctaText, backgroundImage
    - Validar en Designer
    
[ ] Pricing.webflow.tsx
    - Convertir tabla de precios
    - Props: plans, features, currency
    - Validar responsividad
    
[ ] Testimonials.webflow.tsx
    - Convertir carrusel
    - Props: testimonials[], autoplay, speed
    - Validar interactividad
```

#### Día 3-4: Crear Shared Library
```
[ ] Publicar componentes como librería
[ ] Configurar package.json para librería
[ ] Crear README para componentes
[ ] Instalar librería en sitio Webflow
[ ] Validar que aparecen en Assets panel
```

#### Día 5: Documentación y Testing
```
[ ] Documentar props de cada componente
[ ] Crear guía de uso en Webflow
[ ] Validar en múltiples breakpoints
[ ] Crear checklist de QA
```

---

### **SEMANA 3: Automatización con MCP Server**

#### Día 1-2: Crear Scripts de Generación
```javascript
// scripts/generate-va-profiles.js
// Usar MCP para:
// 1. Leer datos de vasData.js
// 2. Generar componentes HTML
// 3. Crear elementos en Webflow Designer
// 4. Aplicar estilos consistentes
// 5. Publicar cambios

// Pseudocódigo:
async function generateVAProfiles() {
  const vas = require('../src/data/vasData.js');
  
  for (const va of vas) {
    // Usar MCP Designer API
    const element = await webflow.createElement({
      type: 'div',
      name: `VA-${va.name}`,
      styles: { /* estilos */ }
    });
    
    // Agregar contenido
    await element.setContent(va);
    
    // Aplicar componente
    await element.setComponent('VACard');
  }
}
```

#### Día 3-4: Automatizar Grillas y Layouts
```
[ ] Crear script para generar grillas de VAs
[ ] Automatizar aplicación de estilos
[ ] Generar páginas de servicios
[ ] Generar páginas de industrias
[ ] Crear batch operations para cambios masivos
```

#### Día 5: Integración con Data API
```
[ ] Crear colecciones en Webflow CMS
    - VAs collection
    - Services collection
    - Industries collection
    
[ ] Sincronizar datos desde vasData.js
[ ] Crear endpoints para lectura/escritura
[ ] Documentar API endpoints
```

---

### **SEMANA 4: Optimización y Automatización Completa**

#### Día 1-2: CI/CD Pipeline
```
[ ] Crear GitHub Actions workflow
    - Trigger: push a main
    - Acción: Sincronizar con Webflow
    - Validar cambios
    - Publicar automáticamente
    
[ ] Configurar webhooks Webflow
[ ] Crear logs de cambios
[ ] Documentar proceso
```

#### Día 3-4: Optimizaciones Finales
```
[ ] Optimizar performance de Code Components
[ ] Implementar lazy loading
[ ] Cachear datos
[ ] Minificar assets
[ ] Validar SEO
```

#### Día 5: Documentación Completa
```
[ ] Crear guía de desarrollo
[ ] Documentar workflow
[ ] Crear templates reutilizables
[ ] Establecer best practices
[ ] Capacitar al equipo
```

---

## 🔧 CONFIGURACIÓN TÉCNICA DETALLADA

### 1. **DevLink Setup**

```bash
# Instalar DevLink
npm install -g @webflow/devlink

# Inicializar en proyecto
devlink init

# Configurar sitio
devlink site add ocean-va 66e9b3f71eb321a17e92218a

# Sincronizar componentes
devlink sync
```

### 2. **Code Component Template**

```typescript
// src/webflow-components/Example.webflow.tsx
import React from 'react';
import { declareComponent } from '@webflow/react';

interface ExampleProps {
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
}

export const Example: React.FC<ExampleProps> = ({
  title,
  description,
  variant = 'primary'
}) => {
  return (
    <div className={`example example--${variant}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

declareComponent(Example, {
  name: 'Example Component',
  description: 'A reusable example component',
  props: {
    title: {
      type: 'string',
      defaultValue: 'Default Title',
      label: 'Title'
    },
    description: {
      type: 'string',
      defaultValue: 'Default description',
      label: 'Description'
    },
    variant: {
      type: 'enum',
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
      label: 'Variant'
    }
  }
});
```

### 3. **MCP Server Configuration**

```json
// .cursor/rules/mcp-config.json
{
  "mcpServers": {
    "webflow": {
      "command": "mcp-remote",
      "args": [
        "https://mcp-server.webflow.com",
        "--token",
        "YOUR_WEBFLOW_TOKEN"
      ]
    }
  }
}
```

### 4. **Data API Integration**

```typescript
// src/utils/webflow-api.ts
import axios from 'axios';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const WEBFLOW_TOKEN = process.env.WEBFLOW_API_TOKEN;

export const webflowAPI = axios.create({
  baseURL: WEBFLOW_API_BASE,
  headers: {
    'Authorization': `Bearer ${WEBFLOW_TOKEN}`,
    'Accept-Version': '2.0'
  }
});

// Ejemplos de uso
export const getCollections = (siteId: string) =>
  webflowAPI.get(`/sites/${siteId}/collections`);

export const getCollectionItems = (collectionId: string) =>
  webflowAPI.get(`/collections/${collectionId}/items`);

export const createCollectionItem = (collectionId: string, data: any) =>
  webflowAPI.post(`/collections/${collectionId}/items`, { fieldData: data });
```

---

## 📊 MATRIZ DE MIGRACIÓN

### Componentes a Migrar (Prioridad)

| Prioridad | Componente | Tipo | Complejidad | Semana |
|-----------|-----------|------|-------------|--------|
| 🔴 Alta | Hero | Code Component | Media | 2 |
| 🔴 Alta | VAShowcase | Code Component | Alta | 2 |
| 🔴 Alta | Pricing | Code Component | Media | 2 |
| 🟠 Media | Testimonials | Code Component | Media | 2 |
| 🟠 Media | Stats | Code Component | Baja | 3 |
| 🟠 Media | Timeline | Code Component | Baja | 3 |
| 🟡 Baja | FAQ | Code Component | Media | 3 |
| 🟡 Baja | ContactForm | Code Component | Alta | 4 |

---

## 🎓 PROMPTS MCP PARA AUTOMATIZACIÓN

### Prompt 1: Generar VA Profiles
```
"Usa la Designer API para crear 56 tarjetas de VA basadas en vasData.js.
Cada tarjeta debe tener:
- Imagen circular (180px)
- Nombre y experiencia
- Idiomas
- Tags de especialización
- Botones: Ver Perfil, Compartir

Aplica estilos consistentes (color #049d98, fuente 14px).
Agrupa en grilla responsive (3-4 cols desktop, 2 tablet, 1 mobile)."
```

### Prompt 2: Aplicar Cambios en Batch
```
"Usa la Designer API para:
1. Encontrar todos los elementos con clase 'va-card'
2. Cambiar color de fondo a #f5f5f5
3. Aumentar padding a 20px
4. Agregar sombra (0 2px 8px rgba(0,0,0,0.1))
5. Validar cambios en todos los breakpoints"
```

### Prompt 3: Generar Páginas de Servicios
```
"Crea 6 páginas de servicios usando la estructura:
- Hero con imagen
- Descripción
- Beneficios (3 items)
- Casos de uso
- CTA

Usa Data API para obtener datos de services collection.
Aplica template consistente en todas las páginas."
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### Por Componente
```
[ ] Code Component creado y sincronizado
[ ] Props expuestos correctamente
[ ] Funciona en Designer
[ ] Responsive en todos los breakpoints
[ ] Estilos aplicados correctamente
[ ] Documentación completa
[ ] Tested en múltiples navegadores
```

### Por Fase
```
[ ] Fase 1: DevLink funcionando, MCP server conectado
[ ] Fase 2: 3+ componentes migrados, librería publicada
[ ] Fase 3: Scripts de generación funcionando, Data API integrada
[ ] Fase 4: CI/CD pipeline activo, documentación completa
```

---

## 🚨 RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| DevLink no sincroniza | Media | Alto | Documentar configuración, tener backup manual |
| MCP Server falla | Baja | Alto | Mantener scripts alternativos |
| Cambios rompen sitio | Media | Alto | Validar en staging antes de publicar |
| Performance degrada | Media | Medio | Optimizar Code Components, lazy loading |
| Equipo no entiende workflow | Alta | Medio | Documentación clara, capacitación |

---

## 📈 MÉTRICAS DE ÉXITO

```
Antes:
- Tiempo por componente: 2-3 horas
- Errores manuales: 5-10 por proyecto
- Reutilización: Baja (copiar/pegar)
- Mantenimiento: Tedioso

Después:
- Tiempo por componente: 15-30 minutos
- Errores manuales: 0-1 por proyecto
- Reutilización: Alta (shared libraries)
- Mantenimiento: Automático
```

---

## 🔗 PRÓXIMAS ACCIONES

1. **Esta semana**
   - [ ] Revisar acceso a Developer Platform
   - [ ] Instalar herramientas
   - [ ] Crear primer Code Component

2. **Próxima semana**
   - [ ] Migrar 3 componentes principales
   - [ ] Crear shared library
   - [ ] Instalar en sitio Webflow

3. **Semana 3**
   - [ ] Configurar MCP Server
   - [ ] Crear scripts de automatización
   - [ ] Generar VA profiles automáticamente

4. **Semana 4**
   - [ ] Implementar CI/CD
   - [ ] Documentación completa
   - [ ] Capacitación del equipo

