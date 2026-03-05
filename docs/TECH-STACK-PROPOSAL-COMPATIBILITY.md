# Compatibilidad: propuesta de stack (Next.js + Vercel Postgres + NextAuth + Manatal) con el proyecto actual

## Stack propuesta

```
Next.js + Vercel
├── Vercel Postgres    → DB intermedia
├── NextAuth.js        → Auth simple con roles
├── OpenAI API         → Generación de contenido
├── Manatal API        → Fuente de verdad de candidatos
└── Webflow CMS API    → Publicación final
```

---

## Estado actual del proyecto (donde vive el VA form)

| Componente | Tecnología actual | Ubicación |
|------------|-------------------|-----------|
| Frontend del VA form / landing | **Vite + React** (no Next.js) | Raíz del repo: `package.json`, `src/`, `vite.config` |
| API submit VA → Webflow | **Vercel Serverless** (Node) | `api/webflow/va-submit.js` |
| Otra API Webflow | Serverless | `api/webflow/upload-image.js` |
| Assessment / Quiz | Vite/HTML + Serverless + **Supabase** | `Assesment/` |
| Deploy | Un solo proyecto Vercel (ocean-va.vercel.app) | `vercel.json` (build Vite → `dist` + rutas a `api/` y Assesment) |
| Talent (vacantes, admin) | **Proyecto Vercel aparte** | Carpeta `talent/` (root directory en otro deploy) |

Conclusión: el proyecto del VA creation form **no es Next.js**; es **Vite + React + Vercel serverless**.

---

## ¿Es compatible la propuesta?

### Compatible sin problema (da igual Vite o Next)

| Pieza | Compatibilidad |
|-------|----------------|
| **Vercel Postgres** | Sí. Funciona con cualquier proyecto Node en Vercel (serverless o Next.js). Se puede usar desde `api/*.js` actual o desde Next.js. |
| **OpenAI API** | Sí. Llamadas HTTP desde backend; mismo patrón que Webflow hoy. |
| **Manatal API** | Sí. Igual que OpenAI. |
| **Webflow CMS API** | Ya lo usáis en `api/webflow/va-submit.js`. Sigue igual. |
| **Un solo deploy / un solo dashboard Vercel** | Ya tenéis un solo proyecto para el form (Vite + api + Assesment). La propuesta mantiene esa idea. |

### Depende de cómo integreis (migración vs app nueva)

| Pieza | Compatibilidad |
|-------|----------------|
| **Next.js** | No está en el repo del VA form. La propuesta asume **todo en Next.js**. Para “integrar en este proyecto” hay dos caminos (abajo). |
| **NextAuth.js** | Pensado para Next.js (API routes / Route Handlers + middleware). Si migráis a Next.js, encaja. Si dejáis el front en Vite, no usaríais NextAuth en el mismo app; auth tendría que ser en las API actuales (ej. con `jose` como en `talent/`) o en un segundo app Next.js. |

---

## Dos formas de integrar la propuesta en “este proyecto”

### Opción A: Migrar este repo a Next.js (un solo app)

- Sustituir **Vite + React** por **Next.js** (App Router o Pages).
- Mover la lógica de `api/webflow/va-submit.js` (y `upload-image.js`) a **Next.js Route Handlers** o API routes.
- Añadir en el mismo proyecto:
  - **Vercel Postgres** (DB intermedia).
  - **NextAuth.js** (auth del dashboard).
  - Llamadas a **Manatal API** y **OpenAI** donde toque.
- Assesment puede seguir siendo estático/embed y las rutas `/api/quiz/*` pasan a ser Route Handlers en Next.
- **Pros**: Un solo stack, un solo deploy, NextAuth y Postgres nativos.  
- **Contras**: Migración notable (rutas, build, env, posiblemente estructura de carpetas).

### Opción B: Dejar el VA form como está y añadir un segundo app Next.js (dashboard)

- **Este proyecto** (ocean-va.vercel.app): se deja tal cual (**Vite + api/webflow/* + Assesment**). No tocáis Next.js aquí.
- **Nuevo proyecto** (o repo/carpeta nueva): app **Next.js** con:
  - Vercel Postgres,
  - NextAuth.js,
  - Manatal API,
  - OpenAI,
  - y cuando “publicáis” → llamada a **Webflow CMS API** (misma lógica que ya tenéis en `va-submit`, que podéis reutilizar como lib o reimplementar).
- El “dashboard de revisión y publicación” y el flujo Bryan → micro-form → Manatal/DB intermedia viven en el app Next.js.
- **Pros**: Cero cambio en lo que ya funciona; el nuevo flujo queda aislado y claro.  
- **Contras**: Dos deploys (o dos “root” en el mismo repo), dos orígenes para monitorear (aunque ambos en Vercel).

---

## Resumen directo

| Pregunta | Respuesta |
|----------|-----------|
| ¿La propuesta es compatible con nuestro proyecto? | **Sí en servicios** (Postgres, OpenAI, Manatal, Webflow). **Parcial en framework**: la propuesta asume Next.js y NextAuth; vuestro proyecto hoy es Vite + serverless. |
| ¿Podemos usar Vercel Postgres y el resto sin pasar a Next.js? | **Sí**. Podéis seguir con Vite y añadir Vercel Postgres (y Manatal, OpenAI) en las mismas funciones serverless (`api/*.js`). Solo NextAuth sería lo que no encaja en un app Vite (ahí usaríais auth por API con cookie/session o similar). |
| ¿Recomendación? | Si el **dashboard de revisión/publicación** va a ser una app con varias pantallas y roles, **tiene sentido** un app Next.js (Opción A o B). Si preferís no migrar el form actual, **Opción B** (dashboard en Next.js aparte, integrado por APIs) es la más compatible con “este proyecto” tal como está hoy. |

Si indicáis si preferís migrar todo a Next (A) o añadir solo el dashboard en Next (B), se puede bajar esto a pasos concretos (qué migrar primero, qué envs, etc.).
