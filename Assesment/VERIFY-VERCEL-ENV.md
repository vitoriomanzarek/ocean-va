# ✅ Verificar Variables de Entorno en Vercel

## 🔍 Problema Detectado

El endpoint está funcionando, pero los datos se guardan **localmente** en lugar de en **Webflow CMS**.

**Respuesta recibida:**
```json
{
  "savedTo": "local",
  "warning": "Results saved locally. Webflow API was unavailable."
}
```

Esto significa que las **variables de entorno NO están configuradas en Vercel**.

## 🔧 Solución: Configurar Variables de Entorno en Vercel

### Paso 1: Ir a Vercel Dashboard

1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto **ocean-va**
3. Click en **Settings** (en el menú superior)
4. Click en **Environment Variables** (en el menú lateral)

### Paso 2: Agregar las 3 Variables Requeridas

Agrega estas variables (una por una):

#### 1. WEBFLOW_API_TOKEN
- **Key:** `WEBFLOW_API_TOKEN`
- **Value:** Tu token de Webflow API
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### 2. WEBFLOW_SITE_ID
- **Key:** `WEBFLOW_SITE_ID`
- **Value:** Tu Site ID de Webflow
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### 3. WEBFLOW_LEADS_COLLECTION_ID
- **Key:** `WEBFLOW_LEADS_COLLECTION_ID`
- **Value:** `69542fc5236c1cf313bee865`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### Paso 3: Hacer un Nuevo Deploy

**IMPORTANTE:** Después de agregar las variables, necesitas hacer un **nuevo deploy**:

1. Ve a **Deployments**
2. Click en el menú **...** del último deployment
3. Click en **Redeploy**
4. O simplemente haz un nuevo push a GitHub (Vercel desplegará automáticamente)

### Paso 4: Verificar que Funciona

Después del nuevo deploy, prueba de nuevo:

```bash
cd Assesment
node scripts/test-endpoint-vercel.js https://ocean-va.vercel.app
```

**Ahora deberías ver:**
```json
{
  "savedTo": "webflow",
  "data": {
    "id": "webflow_item_id_real"
  }
}
```

## 📋 Cómo Obtener los Valores

### WEBFLOW_API_TOKEN

1. Ve a [Webflow Account Settings](https://webflow.com/dashboard/account)
2. Click en **Apps & Integrations** → **API Access**
3. Genera un nuevo token o copia uno existente
4. **⚠️ IMPORTANTE:** El token debe tener permisos para escribir en CMS

### WEBFLOW_SITE_ID

1. Ve a tu sitio en Webflow Designer
2. Click en **Settings** (⚙️) → **General**
3. Busca **Site ID** (o está en la URL: `https://webflow.com/design/your-site?siteId=**ESTE_ES_EL_ID**`)

### WEBFLOW_LEADS_COLLECTION_ID

Ya lo tienes: `69542fc5236c1cf313bee865`

## 🔍 Verificar Logs en Vercel

Si después de configurar las variables sigue fallando:

1. Ve a **Deployments** → Último deployment
2. Click en **Functions** → `/api/quiz/submit`
3. Revisa los logs para ver el error específico

Los logs deberían mostrar:
- ✅ `🔍 Webflow API Configuration: { hasApiToken: true, ... }`
- ✅ `📤 Sending request to Webflow API: ...`
- ✅ `✅ Webflow API Success: ...`

O si hay error:
- ❌ `❌ Webflow API credentials not configured`
- ❌ `❌ Webflow API Error Response: ...`

## ✅ Checklist

- [ ] WEBFLOW_API_TOKEN agregado en Vercel
- [ ] WEBFLOW_SITE_ID agregado en Vercel
- [ ] WEBFLOW_LEADS_COLLECTION_ID agregado en Vercel
- [ ] Todas las variables seleccionadas para Production, Preview y Development
- [ ] Nuevo deploy realizado después de agregar las variables
- [ ] Prueba del endpoint muestra `"savedTo": "webflow"`
- [ ] Verificado en Webflow CMS que el lead se creó

