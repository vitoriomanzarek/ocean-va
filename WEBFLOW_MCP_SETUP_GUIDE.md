# Guía de Setup: Webflow MCP Server para Ocean VA
**Estado:** Esperando permisos de administrador para generar token
**Fecha:** 2025-11-04

---

## ✅ Configuración Completada

### 1. Verificación de Requisitos
- ✅ **Node.js 22.21.0** instalado (requerido 22.3.0+)
- ✅ **Plan CMS de Webflow** activo (tiene acceso a API)
- ✅ **Configuración MCP** agregada a `/root/.claude.json`

### 2. Archivo de Configuración
**Ubicación:** `/root/.claude.json`

**Configuración actual:**
```json
"mcpServers": {
  "webflow": {
    "command": "npx",
    "args": ["-y", "webflow-mcp-server@latest"],
    "env": {
      "WEBFLOW_TOKEN": "PENDIENTE_DE_ACTUALIZAR"
    }
  }
}
```

---

## 🔄 Próximos Pasos (Cuando Tengas Permisos de Admin)

### Paso 1: Generar Token de API en Webflow

1. **Ve a tu Dashboard de Webflow**
   - URL: https://webflow.com/dashboard

2. **Selecciona tu sitio Ocean VA**
   - Click en el sitio específico (no workspace general)

3. **Abre Site Settings**
   - Click en el ícono de engranaje ⚙️ del sitio

4. **Navega a API Access**
   - Sidebar izquierdo → **Apps & Integrations**
   - Desplázate hasta el final de la página
   - Busca sección **"API Access"**

5. **Genera el Token**
   - Click en **"Generate API token"**
   - Nombre sugerido: `"Claude MCP Server - Ocean VA"`

6. **Selecciona TODOS estos Scopes/Permisos:**
   - ✅ `sites:read`
   - ✅ `sites:write`
   - ✅ `cms:read`
   - ✅ `cms:write`
   - ✅ `pages:read`
   - ✅ `pages:write`
   - ✅ `assets:read`
   - ✅ `assets:write`

7. **Copia el Token**
   - ⚠️ **IMPORTANTE:** Solo podrás verlo UNA VEZ
   - Guárdalo en un lugar seguro
   - Lo necesitarás en el siguiente paso

### Paso 2: Actualizar Configuración en Claude Code

Una vez tengas el token, abre Claude Code y di:

```
"Tengo el nuevo token de Webflow con permisos de admin: [PEGA_TU_TOKEN_AQUI]"
```

Claude Code actualizará automáticamente la configuración.

### Paso 3: Reiniciar Claude Code

1. Cierra la sesión de Claude Code
2. Vuelve a abrir en el proyecto `ocean-va`
3. El MCP de Webflow estará conectado

### Paso 4: Verificar Conexión

Una vez reiniciado, pide a Claude:

```
"Lista mis sitios de Webflow"
```

Si la conexión es exitosa, verás tus sitios listados.

---

## 🎯 Qué Podrás Hacer con el MCP de Webflow Conectado

### Content Management
- 📄 Leer y actualizar páginas
- 📝 Gestionar blog posts y CMS items
- 🗂️ Trabajar con colecciones

### Site Analysis
- 🔍 Analizar estructura del sitio
- 📊 Ver metadata de páginas
- 🌐 Acceder a configuración

### Designer Integration
- 🎨 Sincronización en tiempo real con Webflow Designer
- 💻 Actualizar contenido estático
- 🔧 Manipular elementos de diseño

### CMS Operations
- ➕ Crear collection items
- ✏️ Modificar items existentes
- 🗑️ Gestionar contenido dinámico

---

## 📋 Estrategia de Conversión: React → Webflow Template

Una vez conectado el MCP, seguiremos esta estrategia:

### Fase 1: Análisis del Sitio Actual
- Inventario completo de componentes React (34 componentes)
- Mapeo de rutas (30+ páginas)
- Identificación de contenido dinámico vs estático

### Fase 2: Estructura en Webflow
- Crear páginas base en Webflow
- Configurar CMS Collections para:
  - FAQs (236+ preguntas/respuestas)
  - Testimonios
  - Servicios (8 tipos)
  - Industrias (10 categorías)
  - Team Members (VAs)

### Fase 3: Diseño de Componentes
- Recrear sistema de diseño (colores ocean, tipografía)
- Implementar componentes reutilizables:
  - Navbar con dropdowns
  - Footer multi-columna
  - Hero sections (variantes)
  - FAQ accordions
  - Pricing tables
  - Testimonial cards
  - Client logo carousel

### Fase 4: Migración de Contenido
- Importar FAQs a CMS
- Subir assets (imágenes WebP, logos)
- Configurar SEO schemas (24 archivos JSON-LD)
- Integrar servicios externos:
  - Calendly (bookings)
  - YouTube (videos)
  - Google Reviews

### Fase 5: Interactividad
- Agregar interacciones de Webflow
- Configurar forms de contacto
- Implementar navegación dinámica
- Configurar responsive breakpoints

### Fase 6: Testing & Publicación
- QA de todas las páginas
- Verificación de SEO
- Performance optimization
- Publicación del template

---

## 🔧 Troubleshooting

### Si el Token Da "Access Denied"
- Verifica que seleccionaste TODOS los scopes
- Confirma que eres administrador del sitio
- Regenera el token si es necesario

### Si el MCP No Conecta
- Verifica Node.js version: `node --version` (debe ser 22.3.0+)
- Revisa el archivo de config: `cat /root/.claude.json`
- Reinicia Claude Code completamente

### Si Faltan Herramientas MCP
- Confirma que el token tiene todos los permisos
- Verifica que la configuración JSON es válida
- Prueba reinstalar: `npx -y webflow-mcp-server@latest`

---

## 📚 Recursos

### Documentación Oficial
- **Webflow MCP Server:** https://github.com/webflow/mcp-server
- **Webflow API Docs:** https://developers.webflow.com/data/docs/ai-tools
- **MCP Protocol:** https://github.com/modelcontextprotocol

### Archivos de Referencia en Este Proyecto
- **Knowledge Base:** `/CLAUDE_PROJECT_KNOWLEDGE_BASE.md` - Documentación completa del proyecto
- **Configuración MCP:** `/root/.claude.json` - Config de servidores MCP
- **Componentes Webflow:** `/webflow-components/` - 163 componentes HTML exportados

### Herramientas Disponibles
- **Node.js:** v22.21.0
- **React:** 18.3.1
- **Vite:** 5.3.1
- **Tailwind CSS:** 3.4.4

---

## ✉️ Mensaje de Regreso

Cuando tengas los permisos de admin y el token, simplemente di:

**"Ya tengo el token de Webflow: [TU_TOKEN]"**

Y continuaremos inmediatamente con la conexión y conversión del template.

---

**Configurado por:** Claude Code
**Proyecto:** Ocean VA
**Branch:** `claude/website-project-visibility-011CUms9mQdLyuaHb8ofqgH9`
