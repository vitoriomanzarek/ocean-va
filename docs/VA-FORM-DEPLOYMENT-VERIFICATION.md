# VA Form - Verificación de Deployment

**Fecha**: Enero 2025  
**Objetivo**: Verificar que el API route esté desplegado y funcionando en Vercel

---

## ✅ MISIÓN 1: COMPLETADA

Variables de entorno configuradas en Vercel:
- ✅ `WEBFLOW_API_TOKEN`
- ✅ `WEBFLOW_VA_COLLECTION_ID` (opcional, está hardcodeado)

---

## 🔧 MISIÓN 2: Configurar URL del Endpoint (Webflow)

Como el formulario está en **Webflow**, necesitas usar la **URL absoluta** de tu deployment en Vercel.

### Paso 1: Obtener URL de Vercel

Tu proyecto está desplegado en Vercel. La URL típicamente es:
- `https://tu-proyecto.vercel.app`
- O `https://tu-proyecto-tu-usuario.vercel.app`

### Paso 2: Actualizar JavaScript en Webflow

**Opción A: Si tienes acceso al código fuente del JavaScript en Webflow:**

1. Ve a tu página en Webflow Designer
2. Page Settings → Custom Code → Footer Code
3. Busca la línea que dice:
   ```javascript
   apiEndpoint: '/api/webflow/va-submit',
   ```
4. Cámbiala por:
   ```javascript
   apiEndpoint: 'https://tu-proyecto.vercel.app/api/webflow/va-submit',
   ```
   (Reemplaza `tu-proyecto.vercel.app` con tu URL real)

**Opción B: Si el JavaScript está en un archivo externo:**

1. Actualiza `webflow-custom-code/va-form-script.js`
2. Línea ~15, cambia:
   ```javascript
   const CONFIG = {
     apiEndpoint: 'https://tu-proyecto.vercel.app/api/webflow/va-submit',
     // ...
   };
   ```
3. Re-sube el archivo a donde lo tengas alojado
4. Actualiza la referencia en Webflow

---

## 🔍 MISIÓN 3: Verificar que el API Route esté Desplegado

### Método 1: Verificar en Vercel Dashboard

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Deployments**
4. Abre el deployment más reciente
5. Ve a la pestaña **Functions**
6. Busca `/api/webflow/va-submit`
7. ✅ Si aparece → Está desplegado
8. ❌ Si NO aparece → Necesitas hacer deploy

---

### Método 2: Verificar desde Terminal

```bash
# Verificar que el archivo existe localmente
ls api/webflow/va-submit.js

# Verificar estructura del proyecto
tree api/  # o: dir api /s (Windows)
```

**Estructura esperada:**
```
api/
  webflow/
    va-submit.js
```

---

### Método 3: Probar el Endpoint Directamente

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
  "message": "..."
}
```

---

### Método 4: Verificar en Vercel Logs

1. Ve a Vercel Dashboard → Tu Proyecto
2. Ve a **Logs** o **Deployments** → Selecciona el último deployment
3. Busca en los logs cualquier referencia a `/api/webflow/va-submit`
4. Si hay errores, los verás aquí

---

### Método 5: Verificar Git + Vercel Sync

Vercel despliega automáticamente cuando haces push a Git:

1. ✅ Verifica que `api/webflow/va-submit.js` esté en Git:
   ```bash
   git ls-files api/webflow/va-submit.js
   ```

2. ✅ Verifica que esté en el branch correcto (main/master)

3. ✅ Verifica que Vercel esté conectado a tu repositorio:
   - Vercel Dashboard → Settings → Git
   - Debe estar conectado a tu repo

4. Si todo está bien, cada push debería hacer deploy automáticamente

---

## 🚀 Si el API Route NO está Desplegado

### Opción 1: Hacer Deploy Manual

```bash
# Si tienes Vercel CLI instalado
cd "C:\Users\vitor\Coding\Ocean VA"
vercel --prod
```

### Opción 2: Forzar Deploy desde Vercel Dashboard

1. Ve a Vercel Dashboard → Tu Proyecto
2. Click en **Deployments**
3. Click en **Redeploy** en el último deployment
4. O crea un nuevo deployment desde **Deploy**

### Opción 3: Verificar que el Archivo esté en Git

```bash
# Verificar que el archivo existe
git status
git add api/webflow/va-submit.js
git commit -m "Add VA form API route"
git push
```

Después del push, Vercel debería hacer deploy automáticamente.

---

## 🧪 Checklist Completo de Verificación

- [ ] **Misión 1**: Variables de entorno configuradas en Vercel ✅
- [ ] **Misión 2**: URL del endpoint configurada en JavaScript (pendiente)
- [ ] **Misión 3**: API route verificado:
  - [ ] Archivo existe localmente: `api/webflow/va-submit.js`
  - [ ] Archivo está en Git
  - [ ] Deployment reciente en Vercel
  - [ ] Endpoint responde (test con curl)
  - [ ] No hay errores en logs de Vercel

---

## 📝 Pasos Rápidos para Verificar

1. **Verificar localmente:**
   ```bash
   ls api/webflow/va-submit.js
   ```

2. **Verificar en Vercel:**
   - Dashboard → Deployments → Functions → Buscar `/api/webflow/va-submit`

3. **Probar endpoint:**
   ```bash
   curl -X POST https://tu-proyecto.vercel.app/api/webflow/va-submit \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","slug":"test","summary":"Test","tagline":"Test"}'
   ```

4. **Si funciona**: ✅ Todo OK, solo falta configurar URL en Webflow
5. **Si NO funciona**: Revisar logs de Vercel y variables de entorno

---

## 🎯 Próximos Pasos

Una vez verificado que el API route está desplegado:

1. **Actualizar URL en JavaScript** (Webflow Custom Code)
2. **Probar formulario completo** con datos reales
3. **Verificar que datos se guarden en Webflow CMS**

