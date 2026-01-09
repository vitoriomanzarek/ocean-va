# 🚀 Plan de Migración: Webflow CMS → Supabase

## 📊 Análisis del Estado Actual

### Estructura Actual:
```
Assesment/
├── lib/
│   └── webflow-leads.js          # Guarda en Webflow CMS
├── api/
│   └── quiz/
│       └── submit.js              # Endpoint que usa webflow-leads
└── package.json
```

### Datos que se Guardan:
```javascript
{
  contact: {
    name: string,
    email: string,
    phone: string,
    industry: string
  },
  scores: {
    operational: number (0-10),
    intent: number (0-15),
    urgency: number (0-8)
  },
  profile: {
    profile: string ('A'|'B'|'C'|'D'),
    name: string,
    priority: number (1-4),
    action: string
  },
  savings: {
    currentCost: number,
    vaCost: number,
    monthlySavings: number,
    annualSavings: number
  },
  answers: object (JSON),
  submittedAt: ISO string
}
```

### Flujo Actual:
1. Frontend envía datos a `/api/quiz/submit`
2. Endpoint intenta guardar en Webflow
3. Si falla → guarda localmente (fallback)

---

## 🎯 Plan de Acción

### FASE 1: Setup de Supabase (Tú)

#### 1.1 Crear Cuenta y Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea cuenta (gratis)
3. Crea nuevo proyecto:
   - **Name:** `ocean-va-quiz-leads`
   - **Database Password:** (guárdalo, lo necesitarás)
   - **Region:** Elige la más cercana
4. Espera ~2 minutos a que se cree el proyecto

#### 1.2 Crear Tabla en Supabase
Una vez creado el proyecto, necesitarás crear la tabla. Te daré el SQL exacto.

#### 1.3 Obtener Credenciales
Necesitarás:
- **Project URL** (ej: `https://xxxxx.supabase.co`)
- **API Key (anon/public)** (la encontrarás en Settings → API)

---

### FASE 2: Implementación (Yo)

#### 2.1 Instalar Dependencias
```bash
npm install @supabase/supabase-js
```

#### 2.2 Crear Nueva Librería
- Crear `lib/supabase-leads.js`
- Función `saveQuizResultToSupabase(quizData)`
- Mismo formato que `saveQuizResultToWebflow`

#### 2.3 Actualizar Endpoint
- Modificar `api/quiz/submit.js`
- Reemplazar `saveQuizResultToWebflow` → `saveQuizResultToSupabase`
- Mantener fallback local

#### 2.4 Crear Script de Migración (Opcional)
- Script para migrar datos existentes de Webflow a Supabase (si los hay)

#### 2.5 Actualizar Variables de Entorno
- Agregar `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- Remover variables de Webflow (opcional, podemos mantenerlas)

#### 2.6 Crear Scripts de Utilidad
- Script para crear la tabla automáticamente
- Script de prueba para verificar conexión

---

### FASE 3: Testing y Deploy

#### 3.1 Testing Local
- Probar endpoint localmente
- Verificar que los datos se guarden en Supabase

#### 3.2 Actualizar Vercel
- Agregar variables de entorno en Vercel
- Hacer nuevo deploy

#### 3.3 Verificación
- Probar endpoint en producción
- Verificar datos en Supabase Dashboard

---

## 📋 Schema de Base de Datos (SQL)

```sql
-- Tabla: quiz_leads
CREATE TABLE quiz_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Info
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  
  -- Scores
  operational_score NUMERIC(5,2) DEFAULT 0,
  intent_score NUMERIC(5,2) DEFAULT 0,
  urgency_score NUMERIC(5,2) DEFAULT 0,
  
  -- Profile
  profile TEXT DEFAULT 'D',
  profile_name TEXT,
  priority INTEGER DEFAULT 4,
  action TEXT,
  
  -- Savings
  current_cost NUMERIC(10,2) DEFAULT 0,
  va_cost NUMERIC(10,2) DEFAULT 0,
  monthly_savings NUMERIC(10,2) DEFAULT 0,
  annual_savings NUMERIC(10,2) DEFAULT 0,
  
  -- Answers (JSON)
  answers JSONB,
  
  -- Timestamp
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_quiz_leads_email ON quiz_leads(email);
CREATE INDEX idx_quiz_leads_profile ON quiz_leads(profile);
CREATE INDEX idx_quiz_leads_created_at ON quiz_leads(created_at DESC);
CREATE INDEX idx_quiz_leads_submitted_at ON quiz_leads(submitted_at DESC);

-- Política RLS (Row Level Security) - Permitir inserción anónima
ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON quiz_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para lectura (opcional - solo si quieres que se pueda leer)
CREATE POLICY "Allow service role reads" ON quiz_leads
  FOR SELECT
  TO service_role
  USING (true);
```

---

## 🔑 Variables de Entorno Necesarias

### Nuevas (Supabase):
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Antiguas (Webflow - se pueden remover después):
```env
WEBFLOW_API_TOKEN=... (opcional mantener)
WEBFLOW_SITE_ID=... (opcional mantener)
WEBFLOW_LEADS_COLLECTION_ID=... (opcional mantener)
```

---

## 📝 Checklist de Implementación

### De Tu Parte:
- [ ] Crear cuenta en Supabase
- [ ] Crear proyecto en Supabase
- [ ] Ejecutar SQL para crear tabla (te lo daré)
- [ ] Obtener `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- [ ] Compartir credenciales (o ejecutar scripts que te daré)

### De Mi Parte:
- [ ] Instalar `@supabase/supabase-js`
- [ ] Crear `lib/supabase-leads.js`
- [ ] Actualizar `api/quiz/submit.js`
- [ ] Crear script de setup de tabla
- [ ] Crear script de prueba
- [ ] Actualizar documentación
- [ ] Testing completo

---

## 🎯 Beneficios de la Migración

1. ✅ **Dashboard Visual** - Ver leads en Supabase Dashboard
2. ✅ **Queries SQL** - Filtrar, buscar, analizar datos fácilmente
3. ✅ **Más Confiable** - Menos problemas de conexión
4. ✅ **Escalable** - PostgreSQL puede manejar millones de registros
5. ✅ **Exportación Fácil** - Un comando SQL y listo
6. ✅ **Gratis** - 500MB es suficiente para miles de leads

---

## ⚠️ Consideraciones

1. **Datos Existentes:** Si tienes datos en Webflow, podemos crear un script de migración
2. **Backward Compatibility:** Podemos mantener ambas opciones temporalmente
3. **Testing:** Probaremos todo antes de hacer deploy a producción

---

## 🚀 Próximos Pasos

**¿Qué necesito de ti?**

1. **Opción A (Recomendada):** 
   - Crea la cuenta en Supabase
   - Crea el proyecto
   - Comparte el `SUPABASE_URL` y `SUPABASE_ANON_KEY`
   - Yo creo todo lo demás

2. **Opción B:**
   - Te doy instrucciones paso a paso
   - Tú ejecutas los scripts que te daré
   - Yo te guío en cada paso

**¿Cuál prefieres?**

