# Phase 5 Setup Checklist - DevLink + MCP Connection

**Objetivo**: Setup completo para Phase 5 - Webflow Integration
**Status**: Preparando
**Tiempo**: ~30 minutos

---

## 🔑 APIs y Credenciales Necesarias

### 1. Webflow API Token ⭐ (NECESARIO)
```
¿Qué es?
├─ Token de autenticación para Webflow API
├─ Permite acceder a sitios y componentes
└─ Necesario para DevLink

¿Dónde obtenerlo?
1. Ir a Webflow Dashboard
2. Account Settings → Integrations
3. Generate API Token
4. Copiar token (guardar en lugar seguro)

Formato:
├─ Token: [largo string de caracteres]
└─ Ejemplo: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. Webflow Site ID ⭐ (NECESARIO)
```
¿Qué es?
├─ ID único del sitio Webflow
├─ Necesario para conectar DevLink
└─ Necesario para MCP

¿Dónde obtenerlo?
1. Ir a Webflow Designer
2. Abrir "Copy of Ocean VA"
3. En URL: webflow.com/sites/[SITE_ID]/editor
4. Copiar SITE_ID

Formato:
├─ Site ID: [32 caracteres hexadecimales]
└─ Ejemplo: 66e9b3f71eb321a17e92218a
```

### 3. Webflow Collection IDs (OPCIONAL - para MCP)
```
¿Qué es?
├─ IDs de colecciones CMS
├─ Necesario para MCP Server
└─ Para gestionar VAs, servicios, etc.

¿Dónde obtenerlo?
1. Ir a Webflow Designer
2. Abrir Collections
3. Hacer clic en cada colección
4. En URL: webflow.com/collections/[COLLECTION_ID]
5. Copiar COLLECTION_ID

Colecciones importantes:
├─ VAs Collection ID: [si existe]
├─ Services Collection ID: [si existe]
├─ Industries Collection ID: [si existe]
└─ Blog Posts Collection ID: [si existe]
```

---

## 📋 Información que Necesito

### Paso 1: Webflow API Token
```
Necesito:
├─ [ ] Webflow API Token
└─ Guardar en: .env.local como WEBFLOW_API_TOKEN
```

### Paso 2: Webflow Site ID (de la Copia)
```
Necesito:
├─ [ ] Site ID de "Copy of Ocean VA"
└─ Guardar en: .env.local como WEBFLOW_SITE_ID
```

### Paso 3: Webflow Collection IDs (OPCIONAL)
```
Necesito (si tienes CMS):
├─ [ ] VAs Collection ID
├─ [ ] Services Collection ID
├─ [ ] Industries Collection ID
└─ Guardar en: .env.local como WEBFLOW_COLLECTION_*
```

---

## 🔧 Setup Local

### Paso 1: Crear .env.local
```bash
# En raíz del proyecto
cat > .env.local << 'EOF'
# Webflow API
WEBFLOW_API_TOKEN=tu_token_aqui
WEBFLOW_SITE_ID=site_id_de_la_copia_aqui

# Webflow Collections (opcional)
WEBFLOW_COLLECTION_VAS=collection_id_aqui
WEBFLOW_COLLECTION_SERVICES=collection_id_aqui
WEBFLOW_COLLECTION_INDUSTRIES=collection_id_aqui

# DevLink
DEVLINK_ENABLED=true

# MCP (opcional)
MCP_ENABLED=false
EOF
```

### Paso 2: Instalar Dependencias
```bash
npm install @webflow/devlink
npm install @webflow/react
```

### Paso 3: Verificar .env.local
```bash
# Verificar que .env.local existe
cat .env.local

# Verificar que NO está en git
git status | grep .env.local
# Debe mostrar: .env.local (no tracked)
```

---

## 🚀 DevLink Setup

### Paso 1: Iniciar DevLink
```bash
npm run devlink
```

### Paso 2: Conectar a Webflow
```
En terminal:
1. npm run devlink
2. Seguir instrucciones
3. Abrir link que aparece
4. Autorizar en Webflow
5. Seleccionar "Copy of Ocean VA"
6. Seleccionar "Staging"
7. ✅ DevLink conectado
```

### Paso 3: Verificar Conexión
```bash
# En otra terminal
npm run dev

# Abrir http://localhost:5173
# Verificar que no hay errores
```

---

## 🤖 MCP Server (OPCIONAL - Para Automatización)

### ¿Necesitamos MCP?

**Para Phase 5 (Webflow Integration):**
- ❌ NO es necesario ahora
- ✅ DevLink es suficiente

**Para Phase 6 (SEO/GEO + Automatización):**
- ✅ SÍ será necesario
- ✅ Para generar schema markups
- ✅ Para gestionar CMS automáticamente

**Recomendación:**
- Empezar Phase 5 SIN MCP
- Agregar MCP en Phase 6 si es necesario

---

## 📝 Checklist de Setup

### Antes de Empezar
- [ ] Tengo Webflow API Token
- [ ] Tengo Site ID de la copia
- [ ] Tengo acceso a "Copy of Ocean VA"
- [ ] Tengo acceso a staging de la copia

### Setup Local
- [ ] Crear .env.local con credenciales
- [ ] .env.local NO está en git
- [ ] npm install @webflow/devlink
- [ ] npm install @webflow/react

### DevLink
- [ ] npm run devlink funciona
- [ ] Conectado a "Copy of Ocean VA"
- [ ] Conectado a staging
- [ ] npm run dev funciona sin errores

### Verificación
- [ ] http://localhost:5173 abre sin errores
- [ ] DevLink está sincronizado
- [ ] Puedo hacer cambios en React y verlos en Webflow

---

## 🎯 Próximos Pasos Después del Setup

1. ✅ Setup DevLink
2. [ ] Crear rama feature/webflow-integration
3. [ ] Crear primer Code Component (Hero)
4. [ ] Sincronizar con Webflow
5. [ ] Probar en staging de copia
6. [ ] Testing exhaustivo
7. [ ] Validación lado a lado
8. [ ] Publicar a producción de copia
9. [ ] Migrar a original

---

## ❓ Preguntas Frecuentes

### ¿Dónde obtengo el Webflow API Token?
```
1. Webflow Dashboard
2. Account Settings
3. Integrations
4. Generate API Token
5. Copiar y guardar en .env.local
```

### ¿Dónde obtengo el Site ID?
```
1. Webflow Designer
2. Abrir "Copy of Ocean VA"
3. URL: webflow.com/sites/[SITE_ID]/editor
4. Copiar SITE_ID
5. Guardar en .env.local
```

### ¿Es seguro guardar credenciales en .env.local?
```
SÍ, es seguro:
├─ .env.local está en .gitignore
├─ NO se sube a git
├─ NO se ve en GitHub
├─ Solo en tu máquina local
└─ ✅ SEGURO
```

### ¿Necesito MCP para Phase 5?
```
NO:
├─ DevLink es suficiente
├─ MCP es para automatización
├─ Agregamos MCP en Phase 6
└─ Empezamos sin MCP
```

---

## 📞 Soporte

Si tienes problemas:
1. Verificar que .env.local existe
2. Verificar que credenciales son correctas
3. Verificar que DevLink está instalado
4. Ejecutar: npm run devlink
5. Seguir instrucciones en terminal

---

## 🚀 ¿Listo?

Cuando tengas:
- [ ] Webflow API Token
- [ ] Site ID de la copia
- [ ] .env.local configurado

Avísame y empezamos Phase 5 🎯

