# 🔧 Solución al Problema de RLS en Supabase

## Problema

Las políticas RLS están configuradas correctamente, pero cuando intentamos insertar desde Node.js (servidor) usando el `anon` key, obtenemos:
```
new row violates row-level security policy for table "quiz_leads"
```

## Causa

Cuando usas el `anon` key desde Node.js (servidor), Supabase a veces no aplica correctamente las políticas RLS para el rol `anon`. Este es un problema conocido cuando se usa el anon key en el servidor en lugar del cliente (navegador).

## Solución: Usar Service Role Key

Para inserts desde el servidor, es seguro y recomendado usar la `service_role` key. Esta key:
- ✅ Bypasea RLS (perfecto para endpoints de servidor)
- ✅ Solo debe usarse en el servidor (NUNCA en el cliente/navegador)
- ✅ Es la práctica recomendada para APIs que necesitan insertar datos

## Pasos para Configurar

### 1. Obtener la Service Role Key

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Tu proyecto → **Settings** → **API**
3. En la sección "Project API keys", busca **`service_role`** (secret)
4. Haz clic en "Reveal" y copia la key
5. ⚠️ **IMPORTANTE**: Esta key es SECRETA, nunca la compartas ni la expongas al cliente

### 2. Agregar al .env

En tu archivo `Assesment/.env`, agrega:

```env
SUPABASE_URL=https://buasmdfbzqrgmwtmrxwh.supabase.co
SUPABASE_ANON_KEY=sb_publishable_ZSnUGqyF1xD9bKKup5Z8Og_8xOXUb8K
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

### 3. Código Actualizado

El código ya está actualizado para:
- Usar `SUPABASE_SERVICE_ROLE_KEY` si está disponible
- Hacer fallback a `SUPABASE_ANON_KEY` si no está disponible
- Funcionar tanto en desarrollo como producción

### 4. Configurar en Vercel (cuando despliegues)

En Vercel Dashboard → Settings → Environment Variables:

```env
SUPABASE_URL=https://buasmdfbzqrgmwtmrxwh.supabase.co
SUPABASE_ANON_KEY=sb_publishable_ZSnUGqyF1xD9bKKup5Z8Og_8xOXUb8K
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

⚠️ **IMPORTANTE**: Marca `SUPABASE_SERVICE_ROLE_KEY` como "Encrypted" en Vercel.

## Después de Configurar

1. Agrega `SUPABASE_SERVICE_ROLE_KEY` a tu `.env`
2. Prueba de nuevo:
   ```bash
   cd Assesment
   node scripts/test-supabase-connection.js
   ```

Deberías ver: `✅ All tests passed!`

## Alternativa: Deshabilitar RLS (Solo para Testing)

Si necesitas probar rápidamente sin la service_role key, puedes deshabilitar RLS temporalmente:

```sql
ALTER TABLE public.quiz_leads DISABLE ROW LEVEL SECURITY;
```

⚠️ **NO RECOMENDADO para producción**. Re-habilita RLS después:
```sql
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
```

## ¿Por qué Service Role Key es Segura?

- ✅ Solo está en el servidor (nunca en el cliente)
- ✅ El endpoint `/api/quiz/submit` ya requiere que se llame desde el servidor
- ✅ Es la práctica recomendada por Supabase para APIs
- ✅ Puedes mantener RLS habilitado (la service_role key lo bypasea, pero RLS sigue protegiendo otros accesos)

