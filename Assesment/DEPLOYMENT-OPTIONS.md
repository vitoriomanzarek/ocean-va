# 🚀 Opciones de Despliegue - Assessment Quiz

## Situación Actual

- ✅ Assessment está dentro del repo de Ocean VA
- ✅ Tiene su propio `package.json` y `vercel.json`
- ✅ Supabase ya está configurado y funcionando
- ✅ No comparte dependencias con el proyecto principal

## Opción A: Mismo Repo, Proyecto Vercel Separado (RECOMENDADO)

### Ventajas
- ✅ No necesitas mover código
- ✅ Supabase ya funciona (mismas credenciales)
- ✅ Más rápido de configurar
- ✅ Mantiene el historial de Git

### Pasos

1. **Crear proyecto nuevo en Vercel**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Click en "Add New" → "Project"
   - Importa el mismo repositorio de GitHub (Ocean VA)

2. **Configurar Root Directory**
   - En "Configure Project"
   - **Root Directory**: `Assesment`
   - Framework Preset: "Other" o "Vercel CLI"

3. **Variables de Entorno**
   ```env
   SUPABASE_URL=https://buasmdfbzqrgmwtmrxwh.supabase.co
   SUPABASE_ANON_KEY=sb_publishable_ZSnUGqyF1xD9bKKup5Z8Og_8xOXUb8K
   SUPABASE_SERVICE_ROLE_KEY=sb_secret_qs3ss_Y7KMSOFFH-bUQpzg_K37zB2c9
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel detectará automáticamente `Assesment/vercel.json`

### Resultado
- URL: `ocean-va-assessment.vercel.app` (o el nombre que elijas)
- No afecta el proyecto `ocean-va` principal
- Mismo Supabase (no necesitas reconectar)

---

## Opción B: Repositorio Separado (Más Limpio)

### Ventajas
- ✅ Separación completa
- ✅ Menos confusión
- ✅ Puede tener su propio dominio

### Desventajas
- ⚠️ Requiere mover código
- ⚠️ Perderás el historial de Git (a menos que uses `git subtree`)

### Pasos

1. **Crear nuevo repo en GitHub**
   ```bash
   # En GitHub, crear: ocean-va-assessment-quiz
   ```

2. **Copiar carpeta Assessment**
   ```bash
   # Opción 1: Copiar manualmente
   cp -r Assesment/ ../ocean-va-assessment-quiz/
   
   # Opción 2: Usar git subtree (mantiene historial)
   git subtree push --prefix=Assesment origin assessment-quiz
   ```

3. **Crear proyecto en Vercel**
   - Importar el nuevo repositorio
   - Vercel detectará automáticamente la configuración

4. **Variables de Entorno** (mismas que arriba)

### Resultado
- Repositorio completamente separado
- Proyecto Vercel separado
- Mismo Supabase (mismas credenciales)

---

## ⚠️ IMPORTANTE: Supabase NO Necesita Reconexión

**NO necesitas:**
- ❌ Crear un nuevo proyecto de Supabase
- ❌ Reconectar la base de datos
- ❌ Cambiar las credenciales

**Las mismas credenciales funcionan para ambos proyectos:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Estas son credenciales del **proyecto de Supabase**, no del repositorio o Vercel.

---

## Recomendación Final

**Usa Opción A** porque:
1. Es más rápido (5 minutos vs 30 minutos)
2. Supabase ya funciona
3. No pierdes historial de Git
4. Puedes separarlo después si quieres

**Usa Opción B** solo si:
- Quieres separación completa desde el inicio
- Planeas darle un dominio propio
- Quieres equipos diferentes trabajando en cada proyecto

