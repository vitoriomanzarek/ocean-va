# VA Form - Configuración de Vercel

**Fecha**: Enero 2025  
**Objetivo**: Configurar Vercel para que despliegue el API route correctamente

---

## ⚠️ PROBLEMA DETECTADO

Tu `vercel.json` actual solo tiene configuradas rutas para `Assesment/api/**/*.js`, pero el API route del formulario está en `api/webflow/va-submit.js` (en la raíz).

---

## ✅ SOLUCIÓN: Actualizar vercel.json

Vercel **automáticamente** detecta archivos en `api/` y los despliega como serverless functions, **PERO** si tienes un `vercel.json` con rutas personalizadas, puede que necesites agregar la ruta.

### Opción A: Confiar en Auto-detección de Vercel (RECOMENDADO)

Vercel detecta automáticamente archivos en `api/` y los despliega. Si tu `vercel.json` no tiene rutas que interfieran, debería funcionar automáticamente.

**Verificación:**
1. Ve a Vercel Dashboard → Tu Proyecto → Deployments
2. Abre el último deployment
3. Ve a la pestaña **Functions**
4. Busca `/api/webflow/va-submit`
5. Si aparece → ✅ Ya está desplegado
6. Si NO aparece → Ver Opción B

### Opción B: Agregar Ruta Explícita en vercel.json

Si la auto-detección no funciona, agrega esta ruta a tu `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/api/webflow/(.*)",
      "dest": "/api/webflow/$1.js"
    },
    // ... tus otras rutas existentes ...
  ]
}
```

**O si prefieres usar builds explícitos:**

```json
{
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    // ... tus otros builds existentes ...
  ],
  "routes": [
    {
      "src": "/api/webflow/(.*)",
      "dest": "/api/webflow/$1.js"
    },
    // ... tus otras rutas existentes ...
  ]
}
```

---

## 🔍 CÓMO VERIFICAR QUE ESTÁ DESPLEGADO

### Método 1: Vercel Dashboard (MÁS FÁCIL)

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Click en **Deployments**
4. Selecciona el deployment más reciente
5. Click en la pestaña **Functions** (o busca "Functions" en el menú)
6. Busca `/api/webflow/va-submit`
7. ✅ Si aparece → Está desplegado
8. ❌ Si NO aparece → Necesitas hacer deploy

---

### Método 2: Probar el Endpoint Directamente

**Opción A: Usando curl**

```bash
curl -X POST https://tu-proyecto.vercel.app/api/webflow/va-submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test VA",
    "slug": "test-va",
    "summary": "Test summary",
    "tagline": "Test tagline"
  }'
```

**Respuestas esperadas:**

✅ **200/201 OK**: El endpoint funciona
```json
{
  "success": true,
  "action": "created",
  "item": {...},
  "message": "VA created successfully"
}
```

❌ **404 Not Found**: El endpoint NO está desplegado
```json
{
  "error": "Not Found"
}
```

❌ **500 Internal Server Error**: El endpoint existe pero hay error (posiblemente variables de entorno)
```json
{
  "error": "Internal server error",
  "message": "WEBFLOW_API_TOKEN not configured"
}
```

**Opción B: Usando PowerShell (Windows)**

```powershell
$body = @{
    name = "Test VA"
    slug = "test-va"
    summary = "Test summary"
    tagline = "Test tagline"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://tu-proyecto.vercel.app/api/webflow/va-submit" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

---

### Método 3: Verificar en Vercel Logs

1. Ve a Vercel Dashboard → Tu Proyecto
2. Click en **Deployments**
3. Selecciona el último deployment
4. Busca en los logs cualquier referencia a `/api/webflow/va-submit`
5. Si hay errores de build, los verás aquí

---

## 🚀 SI EL API ROUTE NO ESTÁ DESPLEGADO

### Paso 1: Verificar que el Archivo esté en Git

```bash
git status
git add api/webflow/va-submit.js  # Si no está agregado
git commit -m "Add VA form API route"
git push
```

### Paso 2: Hacer Deploy en Vercel

**Opción A: Deploy Automático (si Vercel está conectado a Git)**

Después del `git push`, Vercel debería hacer deploy automáticamente.

**Opción B: Deploy Manual**

```bash
# Si tienes Vercel CLI instalado
cd "C:\Users\vitor\Coding\Ocean VA"
vercel --prod
```

**Opción C: Desde Vercel Dashboard**

1. Ve a Vercel Dashboard → Tu Proyecto
2. Click en **Deployments**
3. Click en **Redeploy** en el último deployment
4. O crea un nuevo deployment desde **Deploy**

---

## 📋 CHECKLIST COMPLETO

- [ ] **Misión 1**: Variables de entorno configuradas ✅
- [ ] **Misión 2**: URL del endpoint configurada en JavaScript (Webflow)
- [ ] **Misión 3**: API route verificado:
  - [ ] Archivo existe localmente: `api/webflow/va-submit.js` ✅
  - [ ] Archivo está en Git ✅
  - [ ] Deployment reciente en Vercel
  - [ ] Endpoint aparece en Vercel Dashboard → Functions
  - [ ] Endpoint responde (test con curl)
  - [ ] No hay errores en logs de Vercel

---

## 🎯 PASOS RÁPIDOS PARA VERIFICAR AHORA

1. **Ve a Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Tu Proyecto → Deployments → Último deployment → Functions
   - Busca `/api/webflow/va-submit`

2. **Si aparece**: ✅ Ya está desplegado, solo falta configurar URL en Webflow

3. **Si NO aparece**: 
   - Verifica que el archivo esté en Git (`git ls-files api/webflow/va-submit.js`)
   - Haz push si falta
   - Espera el deploy automático o haz deploy manual

---

## 📝 NOTA IMPORTANTE

Vercel **automáticamente** detecta archivos en `api/` y los despliega como serverless functions, incluso sin configuración en `vercel.json`. 

**Solo necesitas**:
- ✅ El archivo en `api/webflow/va-submit.js`
- ✅ El archivo en Git
- ✅ Variables de entorno configuradas
- ✅ Push a Git (o deploy manual)

Vercel hará el resto automáticamente. 🚀

