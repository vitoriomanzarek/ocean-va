# 🚀 Guía de Despliegue y Pruebas en Vercel

Guía completa para desplegar el proyecto en Vercel y probar el endpoint.

## 📋 Checklist Pre-Deploy

Antes de desplegar, asegúrate de:

- [x] ✅ Código listo (sin errores)
- [x] ✅ `.env` configurado localmente (NO se sube a Git)
- [x] ✅ Scripts de prueba funcionando localmente
- [x] ✅ `.gitignore` configurado correctamente

## 🔧 Paso 1: Preparar para GitHub

### Verificar que no haya información sensible

```bash
# Verifica que .env NO esté en Git
cd Assesment
git status
```

Si `.env` aparece en `git status`, NO lo agregues. Ya está en `.gitignore`.

### Archivos que SÍ deben estar en Git

✅ Todo el código fuente
✅ `package.json` y `package-lock.json`
✅ `vercel.json`
✅ `.gitignore`
✅ Documentación (README, etc.)
✅ Scripts de utilidad

### Archivos que NO deben estar en Git

❌ `.env` (contiene credenciales)
❌ `node_modules/` (se instala con `npm install`)
❌ `.vercel/` (configuración local de Vercel)

## 🚀 Paso 2: Subir a GitHub

### Si es un repositorio nuevo:

```bash
cd Assesment

# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos (excepto los en .gitignore)
git add .

# Verificar qué se va a agregar
git status

# Hacer commit
git commit -m "Initial commit: Assessment Quiz Backend API"

# Agregar remote de GitHub
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Subir a GitHub
git push -u origin main
```

### Si ya tienes un repositorio:

```bash
cd Assesment

# Verificar cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "Add timeout handling and Vercel deployment scripts"

# Push
git push
```

## 🌐 Paso 3: Desplegar en Vercel

### Opción A: Desde GitHub (Recomendado)

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración
5. **IMPORTANTE**: Configura las variables de entorno (Paso 4)

### Opción B: Desde CLI

```bash
cd Assesment

# Login a Vercel
vercel login

# Link con proyecto (primera vez)
vercel link

# O crear proyecto nuevo
vercel

# Desplegar a producción
vercel --prod
```

## 🔐 Paso 4: Configurar Variables de Entorno en Vercel

**CRÍTICO**: Las variables de entorno NO se copian automáticamente. Debes configurarlas en Vercel.

### Desde el Dashboard de Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable:
   - `WEBFLOW_API_TOKEN` - Tu token de Webflow
   - `WEBFLOW_SITE_ID` - ID de tu sitio Webflow
   - `WEBFLOW_LEADS_COLLECTION_ID` - ID de la colección de leads
4. Selecciona los ambientes: **Production**, **Preview**, **Development**
5. Guarda

### Desde la CLI:

```bash
cd Assesment

# Agregar cada variable (te pedirá el valor)
vercel env add WEBFLOW_API_TOKEN
vercel env add WEBFLOW_SITE_ID
vercel env add WEBFLOW_LEADS_COLLECTION_ID

# Verificar que estén configuradas
vercel env ls
```

**⚠️ IMPORTANTE**: Después de agregar variables de entorno, necesitas hacer un nuevo deploy:

```bash
vercel --prod
```

## 🧪 Paso 5: Probar el Endpoint en Vercel

### Obtener la URL de tu deployment

Después de desplegar, Vercel te dará una URL como:
- `https://tu-proyecto.vercel.app`
- O `https://tu-proyecto-tu-usuario.vercel.app`

### Opción 1: Usar el script de prueba

```bash
cd Assesment

# Probar con la URL de Vercel
node scripts/test-endpoint-vercel.js https://tu-proyecto.vercel.app
```

### Opción 2: Usar curl

```bash
curl -X POST https://tu-proyecto.vercel.app/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "contact": {
      "name": "Test User",
      "email": "test@example.com",
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
      "currentCost": 4500,
      "vaCost": 1300,
      "monthlySavings": 3200,
      "annualSavings": 38400
    }
  }'
```

### Opción 3: Usar Postman o Insomnia

1. URL: `https://tu-proyecto.vercel.app/api/quiz/submit`
2. Método: `POST`
3. Headers: `Content-Type: application/json`
4. Body: JSON con los datos de prueba (ver ejemplo arriba)

## ✅ Verificación

### Respuesta exitosa (200 OK):

```json
{
  "success": true,
  "message": "Quiz results saved successfully",
  "savedTo": "webflow",
  "data": {
    "id": "webflow_item_id",
    "profile": { ... },
    "scores": { ... }
  }
}
```

### Verificar en Webflow CMS:

1. Ve a Webflow Designer
2. CMS → Quiz Leads collection
3. Deberías ver el nuevo lead creado con los datos de prueba

## 🔍 Troubleshooting

### Error 401 Unauthorized

- **Causa**: Variables de entorno no configuradas o incorrectas
- **Solución**: Verifica en Vercel Dashboard → Settings → Environment Variables

### Error 404 Not Found

- **Causa**: Collection ID incorrecto o colección no existe
- **Solución**: Verifica el `WEBFLOW_LEADS_COLLECTION_ID` en Vercel

### Error 500 Internal Server Error

- **Causa**: Error en el código o en la conexión a Webflow
- **Solución**: Revisa los logs en Vercel Dashboard → Deployments → Functions

### El endpoint no responde

- **Causa**: El deployment falló
- **Solución**: Revisa los logs del deployment en Vercel Dashboard

### Las variables de entorno no funcionan

- **Causa**: Necesitas hacer un nuevo deploy después de agregar variables
- **Solución**: `vercel --prod` o haz un nuevo commit y push

## 📝 Notas Importantes

1. **Variables de entorno**: Siempre configura las variables en Vercel, nunca las subas a Git
2. **Cada deploy nuevo**: Después de agregar variables de entorno, siempre haz un nuevo deploy
3. **Logs**: Revisa los logs en Vercel Dashboard si algo no funciona
4. **Testing**: Prueba siempre después de desplegar para verificar que todo funciona

## 🎉 ¡Listo!

Una vez desplegado y probado, tu API estará disponible en:
- **Production**: `https://tu-proyecto.vercel.app/api/quiz/submit`
- **Preview**: Cada PR genera una preview URL automáticamente

El frontend puede usar esta URL para enviar los datos del quiz.

