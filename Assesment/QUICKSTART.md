# 🚀 Quick Start - Assessment Quiz Backend

Guía rápida para poner en marcha el backend del Assessment Quiz.

## ⚡ Setup Rápido (5 minutos)

### 1. Instalar Dependencias

```bash
cd Assesment
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Webflow (ver `ENV_SETUP.md` para detalles).

### 3. Crear Colección en Webflow CMS

**Opción A: Automático (Recomendado)**

```bash
WEBFLOW_API_TOKEN=tu_token WEBFLOW_SITE_ID=tu_site_id node scripts/create-leads-collection.js
```

Esto creará la colección "Quiz Leads" con todos los campos necesarios y te mostrará el Collection ID para agregar a `.env`.

**Opción B: Manual**

Crea la colección en Webflow Designer y agrega los campos manualmente (ver `README-BACKEND.md` para la lista completa).

### 4. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### 5. Probar el Endpoint

```bash
curl -X POST http://localhost:3000/api/quiz/submit \
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

Si recibes `200 OK`, ¡todo funciona! ✅

## 🔗 Integrar con el Frontend

### En `standalone.html`

Agrega esto antes de cargar `standalone-engine.js`:

```html
<script>
  // Para desarrollo local
  window.API_BASE = 'http://localhost:3000/api';
  
  // Para producción, usa:
  // window.API_BASE = 'https://tu-dominio.vercel.app/api';
</script>
<script src="standalone-engine.js"></script>
```

El quiz automáticamente enviará los datos al backend cuando el usuario complete el quiz.

## 📦 Desplegar en Vercel

```bash
# 1. Login
vercel login

# 2. Link proyecto
vercel link

# 3. Configurar variables de entorno
vercel env add WEBFLOW_API_TOKEN
vercel env add WEBFLOW_SITE_ID
vercel env add WEBFLOW_LEADS_COLLECTION_ID

# 4. Desplegar
vercel --prod
```

## ✅ Checklist

- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado con credenciales
- [ ] Colección "Quiz Leads" creada en Webflow CMS
- [ ] Collection ID agregado a `.env`
- [ ] Servidor de desarrollo funciona (`npm run dev`)
- [ ] Endpoint responde correctamente (test con curl)
- [ ] Frontend configurado con `window.API_BASE`
- [ ] Variables de entorno configuradas en Vercel (si despliegas)

## 📚 Documentación Completa

- **`README-BACKEND.md`** - Documentación completa del backend
- **`ENV_SETUP.md`** - Guía detallada de configuración de variables de entorno
- **`quiz/README.md`** - Documentación del sistema de quiz

## 🆘 Problemas Comunes

**Error: "Webflow API credentials not configured"**
- Verifica que `.env` existe y tiene las variables correctas
- Reinicia el servidor después de crear/modificar `.env`

**Error: "401 Unauthorized"**
- El token de Webflow es incorrecto o expiró
- Verifica que copiaste el token completo

**Error: "404 Not Found"**
- El Collection ID es incorrecto
- Verifica que la colección existe en Webflow

**El frontend no envía datos**
- Verifica que `window.API_BASE` está configurado correctamente
- Abre la consola del navegador (F12) para ver errores
- Verifica que el backend está corriendo y accesible

## 🎉 ¡Listo!

Una vez completado el setup, cada vez que un usuario complete el quiz, sus datos se guardarán automáticamente en Webflow CMS como un lead.
