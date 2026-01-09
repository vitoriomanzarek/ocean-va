# Instrucciones para Cargar Karl a Webflow

## ✅ Archivos Actualizados

1. **Página de perfil**: `src/pages/KarlProfile.jsx` ✅
2. **Ruta**: `/karl-ocean-va-profile` ✅
3. **Schema markup**: `schema-markups/va-profiles/individual/096-karl-va-profile-schema.html` ✅
4. **Imagen actualizada**: URL de CDN de Webflow ✅
5. **Script de carga**: `scripts/addKarlToWebflow.js` ✅

## 🚀 Cargar a Webflow

### Opción 1: Usar el Script Automático

```bash
# En PowerShell:
$env:WEBFLOW_API_TOKEN="tu_token_aqui"
node scripts/addKarlToWebflow.js
```

### Opción 2: Carga Manual en Webflow

1. **Ir a Webflow CMS**
   - Abre el Designer de Webflow
   - Ve a **Collections** → **Virtual Assistants**

2. **Crear nuevo item** y llenar los campos:

   - **Name**: `Karl`
   - **Title**: `English Speaking VA | Personal and Commercial Lines Insurance`
   - **Experience Years**: `3 years`
   - **Languages**: `English (Advanced - C1)`
   - **Specializations**: `Personal Lines, Commercial Lines, Insurance Quoting, Policy Management, Endorsements, Renewals, COI Issuance, Billing Support, Carrier Coordination, Client Communication, CRM Management, Data Accuracy`
   - **Availability**: `Available`
   - **Image URL**: `https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/695d63fa9d2a8fbb0544f958_Karl.webp`
   - **Video URL**: `https://www.youtube.com/watch?v=W6f_dt2kiIY`
   - **Video Thumbnail**: `https://img.youtube.com/vi/W6f_dt2kiIY/maxresdefault.jpg`
   - **Summary**: 
     ```
     Karl is an Insurance Virtual Assistant with over six years of experience in the BPO industry and three years supporting U.S.-based insurance agencies. He has worked extensively with Personal Lines and selected Commercial Lines, collaborating directly with licensed agents in Florida, Massachusetts, New Hampshire, and Maine. His experience covers the full policy lifecycle, strong carrier coordination, and consistent client-facing support in fast-paced insurance environments.
     ```
   - **Tagline**: 
     ```
     Karl is a dependable Insurance VA who can independently handle quoting, endorsements, renewals, and COIs with precision and confidence. His familiarity with carrier portals, rating tools, and CRMs allows agencies to streamline operations while maintaining accuracy, compliance, and high service standards.
     ```
   - **Thumbnail Description**: `3 yrs of Insurance Experience, PERSONAL & COMMERCIAL LINES, MULTI-STATE EXPERIENCE`
   - **Profile Slug**: `https://www.oceanvirtualassistant.com/karl-ocean-va-profile`

3. **Asignar Main Categories y Specializations**
   - Ve a las colecciones correspondientes
   - Asigna "Insurance Virtual Assistant" como Main Category
   - Asigna las specializations desde la colección de Specializations

4. **Publicar el item**

## 📋 Schema Markup

Para agregar el schema markup a la página de perfil en Webflow:

1. Abre la página `/karl-ocean-va-profile` en Webflow
2. Ve a **Page Settings** → **Custom Code** → **Head Code**
3. Copia y pega el contenido de: `schema-markups/va-profiles/individual/096-karl-va-profile-schema.html`

## ✅ Verificación

Después de cargar, verifica:
- [ ] Item creado en Webflow CMS
- [ ] Imagen se muestra correctamente
- [ ] Todos los campos están completos
- [ ] Main Categories y Specializations asignadas
- [ ] Schema markup agregado a la página
- [ ] Página de perfil funciona en: `/karl-ocean-va-profile`

