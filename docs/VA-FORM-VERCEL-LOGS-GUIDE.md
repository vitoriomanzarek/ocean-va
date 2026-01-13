# Cómo Ver Runtime Logs en Vercel

**Fecha**: Enero 2025

---

## 📍 Dónde Encontrar Runtime Logs

### Opción 1: Desde la Página del Deployment

1. Ve a la página del deployment (donde viste los Build Logs)
2. En la parte **inferior izquierda**, busca la sección **"Runtime Logs"**
3. O haz clic en la pestaña **"Logs"** en la parte superior (junto a "Deployment", "Resources", etc.)

### Opción 2: Desde el Dashboard Principal

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `ocean-va`
3. En el menú lateral izquierdo, busca **"Logs"** o **"Functions"**
4. Ahí verás los logs de ejecución de todas las funciones

### Opción 3: Generar Logs Nuevos

La forma más fácil es **ejecutar el endpoint de nuevo** para generar logs nuevos:

1. Ejecuta el script de prueba:
   ```bash
   node scripts/test-va-form-api.js
   ```

2. Inmediatamente después, ve a Vercel Dashboard → Tu Proyecto → **Logs**
3. Deberías ver los logs de la ejecución reciente

---

## 🔍 Qué Buscar en los Logs

Busca líneas que contengan:
- `/api/webflow/va-submit`
- `Webflow API error`
- `Validation Error`
- `400`
- El detalle completo del error de Webflow

---

## 📝 Nota Importante

**Build Logs** (los que me mostraste) = Proceso de compilación/construcción
**Runtime Logs** = Ejecución real de la función cuando se llama

Para ver el error de validación, necesitamos los **Runtime Logs**.

