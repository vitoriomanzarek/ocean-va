# Ocean VA Assessment Quiz - Backend API

Backend para capturar y almacenar los resultados del quiz de Assessment.

## 📋 Estructura

```
Assesment/
├── api/
│   └── quiz/
│       └── submit.js          # Endpoint para guardar resultados
├── lib/
│   └── webflow-leads.js       # Integración con Webflow CMS
├── package.json
├── vercel.json
└── .env.example
```

## 🚀 Configuración

### 1. Instalar dependencias

```bash
cd Assesment
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
WEBFLOW_API_TOKEN=tu_token_de_webflow
WEBFLOW_SITE_ID=tu_site_id_de_webflow
WEBFLOW_LEADS_COLLECTION_ID=id_de_la_coleccion_de_leads
```

### 3. Crear Colección en Webflow CMS

Necesitas crear una colección en Webflow CMS llamada "Quiz Leads" con los siguientes campos:

| Campo | Tipo | Slug |
|-------|------|------|
| Name | Plain Text | `name` |
| Email | Email | `email` |
| Phone | Plain Text | `phone` |
| Industry | Plain Text | `industry` |
| Operational Score | Number | `operational_score` |
| Intent Score | Number | `intent_score` |
| Urgency Score | Number | `urgency_score` |
| Profile | Plain Text | `profile` |
| Profile Name | Plain Text | `profile_name` |
| Priority | Number | `priority` |
| Action | Plain Text | `action` |
| Current Cost | Number | `current_cost` |
| VA Cost | Number | `va_cost` |
| Monthly Savings | Number | `monthly_savings` |
| Annual Savings | Number | `annual_savings` |
| Answers | Plain Text (Long) | `answers` |
| Submitted At | Date | `submitted_at` |

**Nota**: El slug debe coincidir exactamente con los nombres en `lib/webflow-leads.js`.

### 4. Obtener Collection ID

Después de crear la colección en Webflow:

1. Ve a la colección en Webflow Designer
2. El Collection ID está en la URL: `https://webflow.com/design/your-site?pageId=xxx&collectionId=**ESTE_ES_EL_ID**`
3. O usa la API: `GET https://api.webflow.com/v2/sites/{siteId}/collections`

Copia el ID y ponlo en `.env` como `WEBFLOW_LEADS_COLLECTION_ID`.

## 🔧 Desarrollo Local

### Opción 1: Solo Backend (API)

```bash
npm run dev
```

Esto iniciará el servidor de Vercel en `http://localhost:3000`

### Opción 2: Con Frontend

Si el quiz está servido desde otro servidor (Webflow, etc.), configura la URL base:

En `standalone.html`, antes de cargar `standalone-engine.js`, agrega:

```html
<script>
  window.API_BASE = 'http://localhost:3000/api';
</script>
```

O en producción:

```html
<script>
  window.API_BASE = 'https://tu-dominio.vercel.app/api';
</script>
```

## 📡 API Endpoints

### POST /api/quiz/submit

Guarda los resultados del quiz.

**Request Body**:

```json
{
  "contact": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "industry": "insurance"
  },
  "answers": {
    "q5": "yes",
    "q6": "sometimes",
    ...
  },
  "scores": {
    "operational": 7.5,
    "intent": 12,
    "urgency": 5
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
}
```

**Response** (200 OK):

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
      "operational": 7.5,
      "intent": 12,
      "urgency": 5
    }
  }
}
```

**Response** (Error):

```json
{
  "error": "Validation error",
  "message": "Contact information (including email) is required"
}
```

## 🚢 Despliegue en Vercel

### 1. Conectar con Vercel

```bash
vercel login
vercel link
```

### 2. Configurar variables de entorno en Vercel

```bash
vercel env add WEBFLOW_API_TOKEN
vercel env add WEBFLOW_SITE_ID
vercel env add WEBFLOW_LEADS_COLLECTION_ID
```

O desde el dashboard de Vercel:
- Settings → Environment Variables
- Agrega las variables para Production, Preview, y Development

### 3. Desplegar

```bash
vercel --prod
```

## 🔄 Integración con el Frontend

El `standalone-engine.js` automáticamente enviará los datos al backend cuando el usuario complete el quiz.

**Configuración de la URL del API**:

1. **En desarrollo local**: Configura `window.API_BASE = 'http://localhost:3000/api'` antes de cargar el script
2. **En producción**: Configura `window.API_BASE = 'https://tu-dominio.vercel.app/api'`
3. **Sin configuración**: Usará rutas relativas `/api` (asume que el frontend y backend están en el mismo dominio)

## 🛡️ Manejo de Errores

El frontend está diseñado para **fallar silenciosamente** si el backend no está disponible. Esto significa:

- ✅ El usuario siempre verá sus resultados, incluso si el backend falla
- ✅ Los errores se registran en la consola del navegador (para debugging)
- ✅ No se interrumpe la experiencia del usuario

Para monitoreo en producción, considera:

1. Agregar un servicio de error tracking (Sentry, LogRocket, etc.)
2. Enviar errores a un servicio de analytics
3. Implementar retry logic para requests fallidos

## 📊 Datos Guardados

Todos los datos del quiz se guardan en Webflow CMS como un lead, incluyendo:

- ✅ Información de contacto
- ✅ Todas las respuestas del quiz
- ✅ Scores calculados (operational, intent, urgency)
- ✅ Perfil asignado (A, B, C, D)
- ✅ Potencial de ahorro calculado
- ✅ Timestamp de cuando se completó

## 🔍 Próximos Pasos

1. **Integración con Email Marketing**: Enviar automáticamente emails según el perfil
2. **Integración con CRM**: Sincronizar leads con tu CRM (HubSpot, Salesforce, etc.)
3. **Dashboard de Analytics**: Ver métricas de conversión por perfil
4. **A/B Testing**: Probar diferentes versiones del quiz

## 📞 Soporte

Para preguntas o problemas, consulta la documentación principal del quiz en `quiz/README.md`.
