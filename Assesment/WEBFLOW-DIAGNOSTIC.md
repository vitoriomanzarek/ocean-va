# 🔍 Guía de Diagnóstico: Datos no llegan a Webflow

Esta guía te ayudará a diagnosticar por qué los datos del quiz no están llegando a Webflow CMS.

## 📋 Checklist de Verificación

### 1. Verificar Variables de Entorno en Vercel

**CRÍTICO**: Las variables de entorno deben estar configuradas en Vercel, no solo en tu `.env` local.

#### Desde el Dashboard de Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **Settings** → **Environment Variables**
3. Verifica que existan estas 3 variables:
   - `WEBFLOW_API_TOKEN`
   - `WEBFLOW_SITE_ID`
   - `WEBFLOW_LEADS_COLLECTION_ID`
4. Asegúrate de que estén seleccionadas para **Production**, **Preview** y **Development**
5. **IMPORTANTE**: Después de agregar/modificar variables, necesitas hacer un nuevo deploy

#### Verificar desde la CLI:

```bash
cd Assesment
vercel env ls
```

### 2. Verificar Logs en Vercel

Los logs mejorados ahora muestran información detallada sobre el proceso:

1. Ve a tu proyecto en Vercel
2. Click en **Deployments** → Selecciona el último deployment
3. Click en **Functions** → Busca `/api/quiz/submit`
4. Revisa los logs para ver:
   - ✅ Si las variables de entorno están configuradas
   - ✅ Si la conexión a Webflow API es exitosa
   - ❌ Cualquier error específico

#### Logs que deberías ver:

**Si está funcionando:**
```
🔍 Webflow API Configuration: { hasApiToken: true, hasSiteId: true, ... }
📤 Sending request to Webflow API: { url: '...', email: '...' }
✅ Webflow API Success: { itemId: '...', email: '...' }
✅ Quiz results saved to Webflow CMS successfully
```

**Si hay problemas:**
```
❌ Webflow API credentials not configured. Missing: WEBFLOW_API_TOKEN
❌ Webflow API Error Response: { status: 401, error: '...' }
⚠️ Failed to save to Webflow CMS: { message: '...', type: 'API Error' }
🔄 Falling back to local storage...
```

### 3. Probar Localmente con el Script de Diagnóstico

Ejecuta el script de diagnóstico para verificar la configuración:

```bash
cd Assesment
node scripts/diagnose-webflow.js
```

Este script verificará:
- ✅ Si las variables de entorno están configuradas
- ✅ Si la conexión a Webflow API funciona
- ✅ Si los datos se pueden guardar correctamente

### 4. Verificar en el Navegador (Console)

Cuando un usuario completa el quiz, abre la consola del navegador (F12) y busca estos logs:

**Si está funcionando:**
```
📤 Submitting quiz results to backend...
✅ Quiz results saved successfully: { savedTo: 'webflow', ... }
```

**Si hay problemas:**
```
❌ HTTP error from backend: { status: 500, error: '...' }
❌ Failed to submit quiz results to backend: { message: '...' }
```

### 5. Verificar la Colección en Webflow

1. Ve a tu sitio en Webflow
2. Click en **CMS** → **Collections**
3. Busca la colección "Quiz Leads" (o el nombre que hayas usado)
4. Verifica que:
   - ✅ La colección existe
   - ✅ Tiene todos los campos necesarios
   - ✅ Los slugs de los campos coinciden con los del código

#### Campos requeridos en Webflow CMS:

- `name` (Plain Text)
- `email` (Email)
- `phone` (Plain Text)
- `industry` (Plain Text)
- `operational-score` (Number)
- `intent-score` (Number)
- `urgency-score` (Number)
- `profile` (Plain Text)
- `profile-name` (Plain Text)
- `priority` (Number)
- `action` (Plain Text)
- `current-cost` (Number)
- `va-cost` (Number)
- `monthly-savings` (Number)
- `annual-savings` (Number)
- `answers` (Plain Text o Rich Text)
- `submitted-at` (Date)

### 6. Verificar el API Token de Webflow

1. Ve a [Webflow Account Settings](https://webflow.com/dashboard/account)
2. Click en **Apps & Integrations** → **API Access**
3. Verifica que:
   - ✅ Tienes un token generado
   - ✅ El token tiene permisos para escribir en CMS
   - ✅ El token no ha expirado

### 7. Probar el Endpoint Directamente

Puedes probar el endpoint directamente con curl o Postman:

```bash
curl -X POST https://tu-proyecto.vercel.app/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "contact": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "",
      "industry": "Insurance"
    },
    "scores": {
      "operational": 7,
      "intent": 10,
      "urgency": 3
    },
    "profile": {
      "profile": "B",
      "name": "WARM",
      "priority": 2,
      "action": "active-nurture"
    },
    "savings": {
      "currentCost": 5000,
      "vaCost": 2000,
      "monthlySavings": 3000,
      "annualSavings": 36000
    },
    "answers": {}
  }'
```

## 🔧 Soluciones Comunes

### Problema: "Webflow API credentials not configured"

**Solución:**
1. Verifica que las variables de entorno estén en Vercel
2. Asegúrate de hacer un nuevo deploy después de agregar variables
3. Verifica que los nombres de las variables sean exactos (case-sensitive)

### Problema: "Webflow API error: 401"

**Solución:**
- El API token es inválido o ha expirado
- Genera un nuevo token en Webflow
- Actualiza `WEBFLOW_API_TOKEN` en Vercel

### Problema: "Webflow API error: 404"

**Solución:**
- El `WEBFLOW_SITE_ID` o `WEBFLOW_LEADS_COLLECTION_ID` es incorrecto
- Verifica los IDs en Webflow:
  - Site ID: Settings → General → Site ID
  - Collection ID: CMS → Collections → Click en la colección → URL muestra el ID

### Problema: "Webflow API error: 400"

**Solución:**
- Los slugs de los campos no coinciden
- Verifica que los nombres de los campos en Webflow coincidan exactamente con los del código
- Los slugs deben estar en kebab-case (ej: `operational-score` no `operational_score`)

### Problema: Los datos se guardan localmente pero no en Webflow

**Solución:**
- Revisa los logs en Vercel para ver el error específico
- El sistema tiene un fallback que guarda localmente si Webflow falla
- Esto significa que hay un error con Webflow, pero los datos no se pierden

## 📊 Monitoreo Continuo

Para monitorear si los datos están llegando:

1. **Revisa los logs de Vercel regularmente**
2. **Verifica en Webflow CMS** que los items se estén creando
3. **Usa el script de diagnóstico** después de cada cambio importante

## 🆘 Si Nada Funciona

1. Ejecuta el script de diagnóstico: `node scripts/diagnose-webflow.js`
2. Revisa los logs completos en Vercel
3. Verifica que todos los campos en Webflow existan y tengan los slugs correctos
4. Prueba crear un item manualmente en Webflow para verificar permisos

## 📝 Notas Importantes

- ⚠️ **Las variables de entorno en `.env` local NO se copian a Vercel automáticamente**
- ⚠️ **Después de agregar/modificar variables en Vercel, necesitas hacer un nuevo deploy**
- ⚠️ **Los slugs de los campos en Webflow son case-sensitive y deben estar en kebab-case**
- ✅ **El sistema tiene un fallback que guarda localmente si Webflow falla, así que los datos no se pierden**

