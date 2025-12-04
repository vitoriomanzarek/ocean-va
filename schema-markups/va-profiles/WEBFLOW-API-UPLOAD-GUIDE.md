# Guía: Cargar Schemas a Webflow vía API

## 🎯 Objetivo

Automatizar la carga de todos los schema markups a Webflow usando la API, evitando copiar y pegar manualmente 86 archivos.

## ⚠️ Limitación Actual de la API

**IMPORTANTE:** Según la documentación oficial de Webflow API, el campo "Schema markup" **NO está disponible** en el endpoint de actualización de páginas.

La API de Webflow actualmente solo permite actualizar:
- `title` - Título de la página
- `slug` - URL slug
- `seo` - Objeto con `title` y `description` (SEO básico)
- `openGraph` - Metadatos de Open Graph

**El campo "Schema markup" que ves en el Designer NO es accesible vía API aún.**

## 🔍 Verificación Necesaria

Antes de usar el script, necesitamos verificar la estructura de la API:

### Paso 1: Obtener Metadata de una Página

```bash
curl -X GET "https://api.webflow.com/v2/pages/{PAGE_ID}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

Esto nos mostrará qué campos están disponibles para actualizar.

### Paso 2: Verificar Documentación

Revisar: https://developers.webflow.com/reference/update-page

## 🛠️ Script de Carga

He creado `upload-schemas-to-webflow.py` que:

1. ✅ Lee todos los archivos HTML de schemas
2. ✅ Extrae el JSON-LD de cada archivo
3. ✅ Busca las páginas correspondientes por slug
4. ✅ Actualiza el schema markup de cada página

## 📋 Requisitos

```bash
# Instalar dependencias
pip install requests

# Obtener credenciales de Webflow:
# 1. Ve a: https://webflow.com/dashboard/settings/integrations
# 2. Crea un API Token
# 3. Obtén tu Site ID desde la URL de tu sitio
```

## 🚀 Uso del Script

### Modo Dry Run (Recomendado Primero)

```bash
python upload-schemas-to-webflow.py \
  --site-id YOUR_SITE_ID \
  --token YOUR_API_TOKEN \
  --dry-run
```

Esto mostrará qué se haría sin hacer cambios reales.

### Cargar Solo Categorías

```bash
python upload-schemas-to-webflow.py \
  --site-id YOUR_SITE_ID \
  --token YOUR_API_TOKEN \
  --categories-only
```

### Cargar Solo Perfiles Individuales

```bash
python upload-schemas-to-webflow.py \
  --site-id YOUR_SITE_ID \
  --token YOUR_API_TOKEN \
  --individual-only \
  --limit 5  # Probar con 5 primero
```

### Carga Completa

```bash
python upload-schemas-to-webflow.py \
  --site-id YOUR_SITE_ID \
  --token YOUR_API_TOKEN
```

## 🔧 Ajustes Necesarios

El script actual intenta actualizar el campo `seo.schemaMarkup`, pero puede que necesitemos ajustar:

1. **Nombre del campo**: Puede ser `schemaMarkup`, `customCode`, o estar dentro de `seo`
2. **Formato**: Puede requerir el JSON como string o como objeto
3. **Endpoint**: Puede requerir un endpoint específico para schema

## 📝 Próximos Pasos

1. **Verificar estructura de la API**:
   - Obtener metadata de una página de prueba
   - Ver qué campos están disponibles
   - Identificar el campo correcto para schema markup

2. **Probar con una página**:
   - Usar `--limit 1` para probar con un solo VA
   - Verificar que el schema se actualizó correctamente
   - Usar Google Rich Results Test para validar

3. **Ajustar el script**:
   - Modificar el campo según lo que encontremos
   - Ajustar el formato si es necesario
   - Agregar mejor manejo de errores

4. **Ejecutar carga completa**:
   - Primero categorías (4 páginas)
   - Luego perfiles individuales (82 páginas)
   - Verificar cada lote

## 🆘 Alternativas Prácticas

Dado que la API no soporta schema markup directamente, aquí tienes opciones:

### Opción 1: Automatización con Browser Automation (Recomendado)

Usar herramientas como:
- **Selenium** o **Playwright** para automatizar el navegador
- **Browser Extension** personalizada
- **Zapier/Make** con automatización de navegador

**Ventajas:**
- ✅ Puede acceder al campo de schema markup en el Designer
- ✅ Automatiza el proceso de copiar/pegar
- ✅ Funciona con la interfaz actual de Webflow

**Desventajas:**
- ⚠️ Más complejo de configurar
- ⚠️ Requiere mantener sesión activa
- ⚠️ Puede ser más lento

### Opción 2: Custom Code en Head (Vía API de Contenido)

Si agregas el schema como Custom Code en el `<head>` de la página, podrías actualizarlo usando el endpoint de actualización de contenido estático.

**Limitación:** Necesitarías tener el schema como un elemento HTML en la página, no en el campo dedicado.

### Opción 3: Script de Asistencia Manual

Crear un script que:
1. Genera un archivo con todos los schemas organizados
2. Te guía página por página
3. Te muestra exactamente qué copiar y dónde pegarlo

**Ventajas:**
- ✅ Simple y confiable
- ✅ No depende de APIs
- ✅ Puedes verificar cada uno

### Opción 4: Esperar Actualización de API

Webflow puede agregar soporte para schema markup en futuras versiones de la API.

## 📞 Soporte

Si encuentras problemas:

1. Verifica que el API Token tenga permisos de escritura
2. Verifica que el Site ID sea correcto
3. Revisa los logs del script para ver errores específicos
4. Consulta la documentación de Webflow API: https://developers.webflow.com/

## ✅ Verificación Post-Carga

Después de cargar, verifica:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Código fuente**: Verificar que el schema aparece en el HTML
3. **Webflow Designer**: Verificar en la configuración de la página

