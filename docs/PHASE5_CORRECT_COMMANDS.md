# Phase 5 Correct Commands - Actualizado

**Status**: ✅ Comandos correctos identificados
**Webflow CLI Version**: 1.8.49
**Próximo Paso**: Autenticar correctamente

---

## 🎯 Comandos Correctos

### ❌ Lo Que NO Funciona
```bash
npx webflow login  ❌ ERROR: unknown command 'login'
```

### ✅ Lo Que SÍ Funciona
```bash
npx webflow auth login  ✅ CORRECTO
```

---

## 🚀 Paso 2: Autenticar Correctamente

Ejecuta:
```bash
npx webflow auth login
```

Esto hará:
1. Abre navegador automáticamente
2. Te pide iniciar sesión en Webflow
3. Autoriza el CLI
4. Guarda credenciales en .env
5. Confirma en terminal

**Resultado esperado:**
```
✅ Authenticated successfully
✅ Credentials saved to .env
✅ Ready to link projects
```

---

## 🚀 Paso 3: Conectar Proyecto

Después de autenticar, ejecuta:
```bash
npx webflow devlink
```

**Resultado esperado:**
```
✅ DevLink connected
✅ Watching for changes
✅ Ready to sync
```

---

## 📋 Comandos Disponibles

```bash
# Authentication
npx webflow auth login          # Autenticar con Webflow
npx webflow auth telemetry      # Configurar telemetría

# DevLink (lo que necesitamos)
npx webflow devlink             # Sincronizar React ↔ Webflow

# Designer Extensions
npx webflow extension           # Desarrollar extensiones

# Cloud Projects
npx webflow cloud               # Gestionar proyectos cloud

# Libraries
npx webflow library             # Gestionar librerías
```

---

## 🎯 Flujo Correcto

### Paso 1: Instalar ✅
```bash
npm install --save-dev @webflow/webflow-cli
✅ Completado
```

### Paso 2: Autenticar
```bash
npx webflow auth login
```
- Abre navegador
- Inicia sesión
- Autoriza CLI
- Guarda en .env

### Paso 3: Iniciar DevLink

**Terminal 1: React Dev Server**
```bash
npm run dev
```

**Terminal 2: DevLink**
```bash
npx webflow devlink
```

**Resultado:**
```
✅ DevLink connected
✅ Watching for changes
✅ Ready to sync
```

### Paso 4: Verificar en Webflow
1. Abrir Webflow Designer
2. Ve a "Copy of Ocean VA" → Staging
3. Deberías ver banner "DevLink Connected"
4. ✅ DevLink listo

---

## 📋 Checklist Actualizado

### Paso 1: Instalar ✅
- [x] npm install --save-dev @webflow/webflow-cli
- [x] npx webflow --version (1.8.49)

### Paso 2: Autenticar
- [ ] npx webflow auth login
- [ ] Iniciar sesión en Webflow
- [ ] Autorizar CLI
- [ ] Confirmar en terminal

### Paso 3: Iniciar DevLink
- [ ] Terminal 1: npm run dev
- [ ] Terminal 2: npx webflow devlink
- [ ] Ver "DevLink connected"

### Paso 4: Verificar
- [ ] Abrir Webflow Designer
- [ ] Ver banner "DevLink Connected"
- [ ] ✅ DevLink listo

---

## 🚀 ¿Listo?

Ahora ejecuta:
```bash
npx webflow auth login
```

Y avísame cuando hayas completado los pasos 2-4.

¡Vamos! 🎯

