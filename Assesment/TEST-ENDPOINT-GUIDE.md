# 🧪 Guía para Probar el Endpoint `/api/quiz/submit`

## 📍 Paso 1: Obtener tu URL de Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `ocean-va`
3. Ve a **Deployments**
4. Copia la URL del último deployment (ejemplo: `https://ocean-va-xxx.vercel.app`)

## 🧪 Opción 1: Script PowerShell (Windows - Recomendado)

```powershell
cd Assesment
.\scripts\test-endpoint-direct.ps1 -Url "https://tu-dominio.vercel.app"
```

**Ejemplo:**
```powershell
.\scripts\test-endpoint-direct.ps1 -Url "https://ocean-va-git-main-vitoriomanzareks-projects.vercel.app"
```

## 🧪 Opción 2: Script Node.js

```bash
cd Assesment
node scripts/test-endpoint-vercel.js https://tu-dominio.vercel.app
```

## 🧪 Opción 3: PowerShell Manual (Rápido)

Abre PowerShell y ejecuta:

```powershell
$url = "https://tu-dominio.vercel.app/api/quiz/submit"
$body = @{
    contact = @{
        name = "Test User"
        email = "test@example.com"
        phone = "(555) 123-4567"
        industry = "insurance"
    }
    scores = @{
        operational = 7
        intent = 10
        urgency = 3
    }
    profile = @{
        profile = "A"
        name = "HOT LEAD"
        priority = 1
        action = "immediate-sales-call"
    }
    savings = @{
        currentCost = 5000
        vaCost = 2000
        monthlySavings = 3000
        annualSavings = 36000
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json"
```

## 🧪 Opción 4: Usar Postman o Insomnia

1. **Método:** POST
2. **URL:** `https://tu-dominio.vercel.app/api/quiz/submit`
3. **Headers:**
   ```
   Content-Type: application/json
   ```
4. **Body (JSON):**
   ```json
   {
     "contact": {
       "name": "Test User",
       "email": "test@example.com",
       "phone": "(555) 123-4567",
       "industry": "insurance"
     },
     "scores": {
       "operational": 7,
       "intent": 10,
       "urgency": 3
     },
     "profile": {
       "profile": "A",
       "name": "HOT LEAD",
       "priority": 1,
       "action": "immediate-sales-call"
     },
     "savings": {
       "currentCost": 5000,
       "vaCost": 2000,
       "monthlySavings": 3000,
       "annualSavings": 36000
     },
     "answers": {}
   }
   ```

## 🧪 Opción 5: Usar curl (si tienes Git Bash o WSL)

```bash
curl -X POST https://tu-dominio.vercel.app/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "contact": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "(555) 123-4567",
      "industry": "insurance"
    },
    "scores": {
      "operational": 7,
      "intent": 10,
      "urgency": 3
    },
    "profile": {
      "profile": "A",
      "name": "HOT LEAD",
      "priority": 1,
      "action": "immediate-sales-call"
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

## 🧪 Opción 6: Usar el Navegador (Solo para verificar que existe)

Abre en el navegador:
```
https://tu-dominio.vercel.app/api/quiz/submit
```

**Nota:** Esto debería devolver un error 405 (Method Not Allowed) porque solo acepta POST, pero confirma que el endpoint existe.

## ✅ Respuestas Esperadas

### ✅ Éxito (200 OK):
```json
{
  "success": true,
  "message": "Quiz results saved successfully",
  "savedTo": "webflow",
  "data": {
    "id": "webflow_item_id",
    "profile": {
      "profile": "A",
      "name": "HOT LEAD"
    },
    "scores": {
      "operational": 7,
      "intent": 10,
      "urgency": 3
    }
  }
}
```

### ❌ Error 404 (Not Found):
- El endpoint no existe o la ruta es incorrecta
- Verifica que el deployment en Vercel haya sido exitoso
- Verifica que la URL sea correcta

### ❌ Error 400 (Bad Request):
- Faltan campos requeridos (email, scores, profile)
- Verifica que el JSON sea válido

### ❌ Error 500 (Internal Server Error):
- Problema con las variables de entorno en Vercel
- Problema con la conexión a Webflow API
- Revisa los logs en Vercel Dashboard

## 🔍 Verificar Logs en Vercel

1. Ve a Vercel Dashboard → Tu proyecto
2. Click en **Deployments** → Último deployment
3. Click en **Functions** → Busca `/api/quiz/submit`
4. Revisa los logs para ver errores detallados

## 💡 Tips

- Si recibes 404, verifica que el archivo `Assesment/api/quiz/submit.js` esté en el repositorio
- Si recibes 500, verifica las variables de entorno en Vercel
- Si `savedTo` es `"local"` en lugar de `"webflow"`, significa que hubo un error con Webflow API (revisa los logs)

