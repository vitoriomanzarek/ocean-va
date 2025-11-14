# Semana 1, Día 1: Plan de Acción Específico

**Objetivo**: Comenzar la reorganización y limpieza

---

## ✅ TAREA 1: Crear Estructura de Carpetas

### Paso 1: Crear carpetas nuevas

```bash
# En la raíz del proyecto
mkdir -p scripts
mkdir -p docs
mkdir -p data
mkdir -p src/design-system
mkdir -p src/utils
mkdir -p src/pages-archive
```

### Paso 2: Mover scripts

```bash
# Mover todos los scripts a scripts/
mv generate-va-grids.js scripts/
mv generate-va-profiles.js scripts/
mv generate-vas-html.py scripts/
mv generate-vas-html-v2.js scripts/
mv generate-vas-html-premium.js scripts/
mv inject-video-urls.js scripts/
mv match-webflow-images.js scripts/
mv update-grid-with-webflow-images.js scripts/
mv update-image-urls.js scripts/
mv update-webflow-vas-page.js scripts/
mv validate-webflow-components.js scripts/
mv split-html-file.js scripts/
mv webflow-api-helper.js scripts/
mv extract-webflow-images.js scripts/
```

### Paso 3: Mover documentación

```bash
# Mover documentación a docs/
mv WEBFLOW_DEVELOPER_STRATEGY.md docs/
mv IMPLEMENTATION_ROADMAP.md docs/
mv CODE_COMPONENTS_GUIDE.md docs/
mv EXECUTIVE_SUMMARY.md docs/
mv STRATEGIC_PLAN_V2.md docs/
mv SEO_GEO_OPTIMIZATION_GUIDE.md docs/
mv BRAINSTORM_RESPONSES_PART1.md docs/
mv WEBFLOW_MIGRATION_CONTEXT.md docs/
mv MEDIA_INTEGRATION_GUIDE.md docs/
mv PNG_INTEGRATION_GUIDE.md docs/
mv WEBFLOW-API-SETUP.md docs/
mv WEBFLOW-VA-PAGE-UPDATE.md docs/
mv HERO_IMAGE_PLACEHOLDER_CHECKLIST.md docs/
mv HOME_SECTION_IMAGE_PROMPTS.md docs/
mv IMAGE_GENERATION_PROMPTS.md docs/
mv AUDIT_CURRENT_STRUCTURE.md docs/
mv WEEK1_DAY1_ACTION_PLAN.md docs/
```

### Paso 4: Mover datos

```bash
# Mover datos a data/
mv ocean_va_all_assistants.tsv data/
mv webflow-image-mapping.json data/
mv webflow-image-mapping.csv data/
mv PAGES_METADATA.txt data/
```

### Paso 5: Mover HTML de Webflow

```bash
# Mover HTML sueltos a webflow-components/
mv client-logos-carousel-webflow.html webflow-components/
mv comparison-table-webflow.html webflow-components/
mv navbar-header-webflow.html webflow-components/
```

---

## ✅ TAREA 2: Crear .env.example

```bash
# Crear archivo .env.example
cat > .env.example << 'EOF'
# Webflow API
VITE_WEBFLOW_API_TOKEN=your_token_here
VITE_WEBFLOW_SITE_ID=66e9b3f71eb321a17e92218a
VITE_MCP_REMOTE_TOKEN=your_mcp_token_here

# Collections
VITE_WEBFLOW_COLLECTION_VAS=collection_id_here
VITE_WEBFLOW_COLLECTION_SERVICES=collection_id_here
VITE_WEBFLOW_COLLECTION_INDUSTRIES=collection_id_here

# Environment
VITE_ENV=development
EOF
```

---

## ✅ TAREA 3: Actualizar .gitignore

```bash
# Agregar a .gitignore
cat >> .gitignore << 'EOF'

# Environment
.env.local
.env.*.local

# Dependencies
node_modules/
dist/

# OS
.DS_Store
*.log

# IDE
.vscode/settings.json
.idea/

# Temporary
*.tmp
*.temp
EOF
```

---

## ✅ TAREA 4: Crear README.md en docs/

```markdown
# Ocean VA Documentation

## Estructura

- **STRATEGIC_PLAN_V2.md** - Plan principal (LEER PRIMERO)
- **SEO_GEO_OPTIMIZATION_GUIDE.md** - Guía SEO/GEO
- **CODE_COMPONENTS_GUIDE.md** - Guía de Code Components
- **WEBFLOW_DEVELOPER_STRATEGY.md** - Research de APIs
- **IMPLEMENTATION_ROADMAP.md** - Plan de implementación
- **AUDIT_CURRENT_STRUCTURE.md** - Auditoría del proyecto

## Orden de Lectura

1. STRATEGIC_PLAN_V2.md (entender el plan)
2. AUDIT_CURRENT_STRUCTURE.md (entender estado actual)
3. SEO_GEO_OPTIMIZATION_GUIDE.md (máxima prioridad)
4. CODE_COMPONENTS_GUIDE.md (cuando llegues a Semana 2)
```

---

## ✅ TAREA 5: Crear scripts/README.md

```markdown
# Scripts

## Generación de Componentes

- **generate-va-profiles.js** - Genera perfiles de VAs
- **generate-va-grids.js** - Genera grillas de VAs
- **generate-vas-html.py** - Versión Python (DEPRECATED?)
- **generate-vas-html-v2.js** - Versión 2 (DEPRECATED?)
- **generate-vas-html-premium.js** - Versión premium (DEPRECATED?)

**TODO**: Consolidar en una versión única

## Utilidades

- **webflow-api-helper.js** - Helper para API de Webflow
- **inject-video-urls.js** - Inyectar URLs de videos
- **validate-webflow-components.js** - Validar componentes

## Mapeo de Imágenes

- **match-webflow-images.js** - Matchear imágenes
- **extract-webflow-images.js** - Extraer URLs de imágenes
- **update-image-urls.js** - Actualizar URLs
- **update-grid-with-webflow-images.js** - Actualizar grilla

## Utilidades Menores

- **split-html-file.js** - Dividir archivos HTML
- **update-webflow-vas-page.js** - Actualizar página de VAs

**TODO**: Revisar cuáles son necesarios
```

---

## ✅ TAREA 6: Crear data/README.md

```markdown
# Data

## Fuentes de Verdad

- **vasData.js** - Datos de VAs (FUENTE PRINCIPAL)
- **ocean_va_all_assistants.tsv** - Datos en TSV (¿duplicado?)

**TODO**: Verificar si son iguales, eliminar duplicado

## Mapeos

- **webflow-image-mapping.json** - URLs de imágenes (JSON)
- **webflow-image-mapping.csv** - URLs de imágenes (CSV)

**TODO**: Consolidar en un formato único

## Metadata

- **PAGES_METADATA.txt** - Metadata de páginas

**TODO**: Revisar si es necesario
```

---

## 📋 CHECKLIST DE HOY

### Antes de Empezar
```
[ ] Leer este documento
[ ] Hacer backup (git commit)
[ ] Tener terminal abierta
```

### Crear Carpetas
```
[ ] mkdir -p scripts
[ ] mkdir -p docs
[ ] mkdir -p data
[ ] mkdir -p src/design-system
[ ] mkdir -p src/utils
```

### Mover Scripts
```
[ ] mv generate-*.js scripts/
[ ] mv inject-*.js scripts/
[ ] mv match-*.js scripts/
[ ] mv update-*.js scripts/
[ ] mv validate-*.js scripts/
[ ] mv split-*.js scripts/
[ ] mv webflow-api-helper.js scripts/
[ ] mv extract-*.js scripts/
```

### Mover Documentación
```
[ ] mv *.md docs/ (excepto README.md)
```

### Mover Datos
```
[ ] mv *.tsv data/
[ ] mv *.json data/ (excepto package-lock.json)
[ ] mv *.csv data/
[ ] mv PAGES_METADATA.txt data/
```

### Crear Archivos
```
[ ] Crear .env.example
[ ] Actualizar .gitignore
[ ] Crear docs/README.md
[ ] Crear scripts/README.md
[ ] Crear data/README.md
```

### Validar
```
[ ] Verificar que todo está en su lugar
[ ] Verificar que no falta nada
[ ] Verificar que npm run dev funciona
```

### Commit
```
[ ] git add .
[ ] git commit -m "refactor: reorganize project structure"
[ ] git push origin main
```

---

## 🎯 RESULTADO ESPERADO

Después de hoy, la raíz debería verse así:

```
ocean-va/
├── src/                    (React components)
├── webflow-components/     (HTML components)
├── public/                 (Assets)
├── scripts/                (NEW - Scripts)
├── docs/                   (NEW - Documentación)
├── data/                   (NEW - Datos)
├── .env.example            (NEW)
├── .env.local              (NO en git)
├── .gitignore              (actualizado)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── index.html
└── README.md
```

**Mucho más limpio y organizado.**

---

## ⏱️ TIEMPO ESTIMADO

- Crear carpetas: 2 minutos
- Mover scripts: 5 minutos
- Mover documentación: 5 minutos
- Mover datos: 3 minutos
- Mover HTML: 2 minutos
- Crear archivos: 5 minutos
- Validar: 5 minutos
- Commit: 2 minutos

**Total: ~30 minutos**

---

## 🚀 PRÓXIMO PASO

Después de esto, mañana (Día 2):
1. Revisar qué scripts son necesarios
2. Consolidar versiones duplicadas
3. Revisar qué datos son necesarios
4. Comenzar a limpiar src/

