# 🚀 Guía de Setup: Supabase

## ✅ Credenciales Configuradas

- **URL:** `https://buasmdfbzqrgmwtmrxwh.supabase.co`
- **API Key:** Configurada ✅

## 📋 Paso 1: Crear la Tabla en Supabase

### Opción A: Desde el Dashboard (Recomendado)

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Click en **SQL Editor** (en el menú lateral)
3. Click en **New Query**
4. Copia y pega el contenido de `scripts/setup-supabase-table.sql`
5. Click en **Run** (o presiona `Ctrl+Enter`)
6. Deberías ver: "Success. No rows returned"

### Opción B: Ejecutar Script

```bash
cd Assesment
node scripts/setup-supabase-table.js
```

Esto te mostrará el SQL que necesitas ejecutar.

## 🧪 Paso 2: Probar la Conexión

```bash
cd Assesment
node scripts/test-supabase-connection.js
```

Este script:
- ✅ Verifica que las variables de entorno estén configuradas
- ✅ Prueba la conexión a Supabase
- ✅ Inserta un registro de prueba
- ✅ Te muestra el ID del registro creado

**Si todo funciona, verás:**
```
✅ All tests passed! Supabase is configured correctly.
```

## 🔧 Paso 3: Configurar Variables en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Tu proyecto → **Settings** → **Environment Variables**
3. Agrega estas variables:
   - `SUPABASE_URL` = `https://buasmdfbzqrgmwtmrxwh.supabase.co`
   - `SUPABASE_ANON_KEY` = `sb_publishable_ZSnUGqyF1xD9bKKup5Z8Og_8xOXUb8K`
4. Selecciona: **Production**, **Preview**, **Development**
5. **IMPORTANTE:** Haz un nuevo deploy después de agregar las variables

## 🧪 Paso 4: Probar el Endpoint

```bash
cd Assesment
node scripts/test-endpoint-vercel.js https://ocean-va.vercel.app
```

**Deberías ver:**
```json
{
  "savedTo": "supabase",
  "data": {
    "id": "uuid-del-registro"
  }
}
```

## 📊 Paso 5: Verificar en Supabase Dashboard

1. Ve a Supabase Dashboard → **Table Editor**
2. Selecciona la tabla `quiz_leads`
3. Deberías ver los registros que se van creando

## 🔍 Verificar que Funciona

### En los Logs de Vercel:
- ✅ `🔍 Supabase Configuration: { hasSupabaseUrl: true, ... }`
- ✅ `📤 Inserting quiz result into Supabase: ...`
- ✅ `✅ Quiz result saved to Supabase successfully`

### En Supabase Dashboard:
- ✅ Ver registros en la tabla `quiz_leads`
- ✅ Ver datos completos de cada lead

## 🆘 Troubleshooting

### Error: "Table does not exist"
- **Solución:** Ejecuta el SQL en Supabase SQL Editor

### Error: "permission denied" o "RLS"
- **Solución:** Verifica que las políticas RLS estén creadas (están en el SQL)

### Error: "Network connection error"
- **Solución:** Verifica que `SUPABASE_URL` sea correcta

### Error: "Invalid API key"
- **Solución:** Verifica que `SUPABASE_ANON_KEY` sea la key anónima (no la service_role)

## 📝 Estructura de la Tabla

La tabla `quiz_leads` tiene estos campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | ID único (auto-generado) |
| `created_at` | Timestamp | Fecha de creación |
| `name` | Text | Nombre del lead |
| `email` | Text | Email (requerido) |
| `phone` | Text | Teléfono |
| `industry` | Text | Industria |
| `operational_score` | Numeric | Score operacional (0-10) |
| `intent_score` | Numeric | Score de intención (0-15) |
| `urgency_score` | Numeric | Score de urgencia (0-8) |
| `profile` | Text | Perfil (A/B/C/D) |
| `profile_name` | Text | Nombre del perfil |
| `priority` | Integer | Prioridad (1-4) |
| `action` | Text | Acción recomendada |
| `current_cost` | Numeric | Costo actual |
| `va_cost` | Numeric | Costo con VA |
| `monthly_savings` | Numeric | Ahorro mensual |
| `annual_savings` | Numeric | Ahorro anual |
| `answers` | JSONB | Respuestas del quiz (JSON) |
| `submitted_at` | Timestamp | Fecha de envío |

## ✅ Checklist Final

- [ ] Tabla `quiz_leads` creada en Supabase
- [ ] Variables de entorno configuradas en `.env` local
- [ ] Variables de entorno configuradas en Vercel
- [ ] Script de prueba ejecutado exitosamente
- [ ] Endpoint probado en producción
- [ ] Registros visibles en Supabase Dashboard

## 🎉 ¡Listo!

Una vez completado, todos los resultados del quiz se guardarán automáticamente en Supabase. Puedes verlos en el Dashboard de Supabase en tiempo real.

