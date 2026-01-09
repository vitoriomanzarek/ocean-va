# 🔍 Troubleshooting: Supabase RLS Policy Issue

## Problema
Las políticas RLS están configuradas correctamente, pero todavía obtenemos el error:
```
new row violates row-level security policy for table "quiz_leads"
```

## Posibles Causas

1. **Cliente desde Node.js (Servidor)**: Cuando usas el anon key desde Node.js (no desde el navegador), Supabase a veces no aplica correctamente el rol `anon` para RLS.

2. **Políticas configuradas pero no aplicadas**: Las políticas existen pero no se están aplicando correctamente.

## Soluciones a Probar

### Opción 1: Deshabilitar RLS Temporalmente (Para Testing)
```sql
ALTER TABLE public.quiz_leads DISABLE ROW LEVEL SECURITY;
```
**⚠️ WARNING**: Solo para testing. Re-habilita RLS después.

### Opción 2: Usar Service Role Key (NO RECOMENDADO para producción)
Si necesitas insertar desde el servidor y RLS no funciona con anon key, puedes usar la service_role key, pero esto bypasea completamente RLS.

**Variable a agregar:**
```env
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

**⚠️ WARNING**: La service_role key bypasea TODAS las políticas RLS. Solo úsala si realmente es necesario y nunca la expongas al cliente.

### Opción 3: Usar Supabase Functions/Edge Functions
Crear una Supabase Edge Function que maneje los inserts, lo cual podría funcionar mejor con RLS.

### Opción 4: Verificar Configuración del Cliente
Asegúrate de que el cliente esté usando las opciones correctas.

