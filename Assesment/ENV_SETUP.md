# Configuración de Variables de Entorno - Assessment Quiz Backend

## Variables Requeridas

Crea un archivo `.env` en la raíz de la carpeta `Assesment` con las siguientes variables:

```env
# Webflow API Configuration
WEBFLOW_API_TOKEN=tu_token_de_webflow_aqui
WEBFLOW_SITE_ID=tu_site_id_de_webflow_aqui
WEBFLOW_LEADS_COLLECTION_ID=id_de_la_coleccion_de_leads_aqui
```

## Cómo Obtener las Credenciales

### 1. WEBFLOW_API_TOKEN

1. Ve a tu cuenta de Webflow
2. Dashboard → Account Settings → API Tokens
3. Haz clic en "Create new token"
4. Dale un nombre (ej: "Ocean VA Assessment Quiz")
5. Copia el token generado

**⚠️ Importante**: Guarda el token de forma segura, solo se muestra una vez.

### 2. WEBFLOW_SITE_ID

1. Ve a tu sitio en Webflow
2. El Site ID está en la URL: `https://webflow.com/design/your-site?pageId=xxx`
3. O ve a Settings → General y busca "Site ID"
4. También puedes usar la API: `GET https://api.webflow.com/v2/sites` (requiere autenticación)

Formato: `66e9b3f71eb321a17e92218a` (string de 24 caracteres)

### 3. WEBFLOW_LEADS_COLLECTION_ID

#### Opción A: Crear la colección con el script automatizado (Recomendado)

```bash
cd Assesment
WEBFLOW_API_TOKEN=tu_token WEBFLOW_SITE_ID=tu_site_id node scripts/create-leads-collection.js
```

El script creará la colección con todos los campos necesarios y te mostrará el Collection ID.

#### Opción B: Crear manualmente en Webflow

1. Ve a Webflow Designer → CMS
2. Haz clic en "New Collection"
3. Nombre: "Quiz Leads"
4. Después de crear, el Collection ID está en la URL: `https://webflow.com/design/your-site?collectionId=**ESTE_ES_EL_ID**`
5. Agrega los campos necesarios (ver `README-BACKEND.md` para la lista completa)

#### Opción C: Usar la API para listar colecciones

```bash
curl -H "Authorization: Bearer $WEBFLOW_API_TOKEN" \
     -H "Accept-Version: 1.0.0" \
     "https://api.webflow.com/v2/sites/$WEBFLOW_SITE_ID/collections"
```

Busca la colección "Quiz Leads" en la respuesta y copia el `id`.

## Configuración en Vercel

Si vas a desplegar en Vercel, también necesitas configurar las variables de entorno allí:

### Desde la CLI:

```bash
cd Assesment
vercel env add WEBFLOW_API_TOKEN
vercel env add WEBFLOW_SITE_ID
vercel env add WEBFLOW_LEADS_COLLECTION_ID
```

### Desde el Dashboard de Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable para los ambientes que necesites:
   - Production
   - Preview
   - Development

## Verificación

Para verificar que todo está configurado correctamente:

```bash
cd Assesment
npm run dev
```

Luego prueba el endpoint:

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

Si recibes una respuesta `200 OK`, ¡todo está configurado correctamente! 🎉

## Troubleshooting

### Error: "Webflow API credentials not configured"
- Verifica que el archivo `.env` existe
- Verifica que las variables tienen los nombres correctos (mayúsculas/minúsculas)
- Reinicia el servidor después de crear/modificar `.env`

### Error: "401 Unauthorized"
- El `WEBFLOW_API_TOKEN` es incorrecto o expiró
- Verifica que copiaste el token completo (sin espacios)

### Error: "404 Not Found" al crear items
- El `WEBFLOW_SITE_ID` es incorrecto
- El `WEBFLOW_LEADS_COLLECTION_ID` no existe o es incorrecto
- Verifica que la colección existe en Webflow

### Error: "400 Bad Request" al crear items
- Los nombres de los campos (slugs) no coinciden
- Verifica que los slugs en `lib/webflow-leads.js` coincidan con los de la colección
- Los slugs deben estar en kebab-case (ej: `operational-score` no `operational_score`)
