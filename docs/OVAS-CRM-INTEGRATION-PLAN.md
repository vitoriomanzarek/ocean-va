# OVAS CRM ↔ Ocean VA — Integration Plan

## Context

| Project | Stack | Deploy | Purpose |
|---|---|---|---|
| **Ocean VA** (this repo) | Vite + React + Tailwind | Vercel | Public marketing site |
| **OVAS CRM** (`ovas-internal`) | Next.js 16 + Prisma + PostgreSQL (Neon) | Vercel | Internal operations: recruiting, pipeline, placements |

The goal: OVAS CRM becomes the **source of truth** for VA profiles and blog content. Ocean VA reads from it — no more Webflow.

---

## Part 1 — VA Management

### Current state (post this migration)
- `src/data/vasData.json` — 150 VAs, generated from Webflow CSV export
- `/virtual-assistants/:slug` — dynamic profile pages powered by the JSON
- Update process: re-export CSV from Webflow → run `scripts/csv-to-vasdata.py` → commit

### Target state
- OVAS CRM Postgres `Candidate` table = source of truth for VAs
- Ocean VA fetches VA data from a OVAS CRM public API endpoint at Vercel build time
- Updating a VA in OVAS CRM → triggers a Vercel deploy hook → site rebuilds automatically

---

### What needs to be built

#### In OVAS CRM (`ovas-internal`)

**1. Extend `Candidate` model with public-site fields**

Add to `prisma/schema.prisma`:
```prisma
model Candidate {
  // existing fields...

  // Public site fields
  publishedToSite   Boolean   @default(false)
  profileSlug       String?   @unique
  siteTitle         String?
  siteTagline       String?
  siteImage         String?   // Vercel Blob URL (post Remove.bg processing)
  siteVideo         String?   // YouTube URL
  siteVideoThumb    String?
  siteThumbDesc     String?
  siteAvailability  String?   // Full Time | Part Time | Assigned
  siteMainCategory  String?
  siteSpecialization String[]
  siteTools         String[]
  siteSkills        String[]
  siteEquipment     String[]
}
```

**2. Public VA API endpoint**

New file: `src/app/api/public/vas/route.ts`
```ts
// GET /api/public/vas
// Returns all published VAs (publishedToSite = true)
// No auth required — public endpoint
// Rate-limited by Vercel Edge

export async function GET() {
  const vas = await prisma.candidate.findMany({
    where: { publishedToSite: true },
    select: {
      profileSlug: true,
      name: true,
      siteTitle: true,
      siteTagline: true,
      siteImage: true,
      siteVideo: true,
      siteVideoThumb: true,
      siteThumbDesc: true,
      siteAvailability: true,
      siteMainCategory: true,
      siteSpecialization: true,
      siteTools: true,
      siteSkills: true,
      siteEquipment: true,
      discType: true,
      englishLevel: true,
      // ... employment/education richtext fields
    }
  })
  return Response.json(vas, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
  })
}
```

**3. "Publish to Site" toggle in Candidate detail UI**

In `src/components/candidate-details-inline.tsx`:
- Add a "Published to Site" toggle (ADMIN/RECRUITER only)
- When toggled → PATCH `/api/candidates/[id]` with `publishedToSite: true`
- Also add a "Preview Profile" link → opens `oceanvirtualassistant.com/virtual-assistants/[slug]`

**4. Vercel deploy webhook trigger**

When `publishedToSite` changes → call Vercel Deploy Hook:
```ts
// In PATCH /api/candidates/[id]/route.ts
if (changed('publishedToSite') || changed('siteImage') || changed('siteTitle')) {
  await fetch(process.env.OCEAN_VA_DEPLOY_HOOK_URL, { method: 'POST' })
}
```

#### In Ocean VA (this repo)

**5. Replace static JSON with API fetch at build time**

Option A (simplest for Vite SPA — client-side fetch):
```js
// src/hooks/useVasData.js
import { useState, useEffect } from 'react'

export function useVasData() {
  const [vas, setVas] = useState([])
  useEffect(() => {
    fetch('https://ovas-internal.vercel.app/api/public/vas')
      .then(r => r.json())
      .then(setVas)
  }, [])
  return vas
}
```

Option B (better for SEO — convert to Next.js or use Vercel Edge Config):
- Migrate Ocean VA from Vite to Next.js (separate task)
- Use `getStaticProps` / `generateStaticParams` to pre-render all VA profiles at build time
- Vercel deploy hook auto-triggers rebuild when CRM publishes a change

**Recommendation: Start with Option A (client-side fetch)**  
The public site doesn't need VA profiles indexed per-page for SEO right now. Migrate to Next.js as a separate phase when SEO becomes a priority.

---

### Data migration path

1. **Phase 1 (done):** vasData.json from CSV — 150 VAs, manual update via script
2. **Phase 2:** OVAS CRM API endpoint + `publishedToSite` flag + Ocean VA fetches from API
3. **Phase 3:** Module 03 in OVAS CRM: "OVAS Dream Job" pipeline stage → auto-generate profile fields via OpenAI → recruiter reviews → publish toggle → deploy hook

---

## Part 2 — Blog Management

### Current state
- `/blogs` — static placeholder page (no real content)
- Webflow had CMS blog posts

### Architecture

#### In OVAS CRM — add Blog module

**1. New Prisma model**
```prisma
model BlogPost {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  excerpt     String
  body        String    @db.Text  // Markdown or HTML
  coverImage  String?
  category    String?
  tags        String[]
  author      String?
  publishedAt DateTime?
  published   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  authorUser  User?     @relation(fields: [authorUserId], references: [id])
  authorUserId String?
}
```

**2. Blog API endpoints**
```
GET  /api/public/blog              → list published posts (paginated)
GET  /api/public/blog/[slug]       → single post
POST /api/blog                     → create draft (ADMIN/MEDIA)
PATCH /api/blog/[id]               → update post
DELETE /api/blog/[id]              → delete post
```

**3. Blog editor UI in OVAS CRM**
- Route: `/dashboard/blog` — list of posts
- Route: `/dashboard/blog/new` — create with Markdown editor
- Route: `/dashboard/blog/[id]/edit` — edit
- Roles: ADMIN, MEDIA

#### In Ocean VA — consume blog API

**`src/pages/Blogs.jsx`** — fetch from CRM API:
```js
// Client-side fetch (or build-time if migrated to Next.js)
const posts = await fetch('https://ovas-internal.vercel.app/api/public/blog').then(r => r.json())
```

**`/blogs/:slug`** — new route for individual blog posts

---

## Summary: What to Build

### OVAS CRM (`ovas-internal`)

| Task | Priority | Effort |
|---|---|---|
| Extend Candidate with site fields (`publishedToSite`, `profileSlug`, `siteImage`, etc.) | High | S |
| `GET /api/public/vas` endpoint | High | S |
| "Publish to Site" toggle in candidate UI | High | M |
| Vercel deploy hook trigger on publish | Medium | S |
| BlogPost Prisma model | Medium | S |
| `GET /api/public/blog` + `/api/public/blog/[slug]` | Medium | M |
| Blog editor UI (`/dashboard/blog`) | Medium | L |

### Ocean VA (this repo)

| Task | Priority | Effort |
|---|---|---|
| `useVasData` hook — fetch from CRM API (with JSON fallback) | High | S |
| Wire `OurCurrentVAs` + `OurVAsPage` to hook | High | S |
| Wire `VADynamicProfile` to hook | High | S |
| Add `/blogs/:slug` route + page component | Medium | M |
| Update `Blogs.jsx` to fetch from CRM API | Medium | S |

---

## Environment Variables Needed

### OVAS CRM
```
OCEAN_VA_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

### Ocean VA
```
VITE_CRM_API_URL=https://ovas-internal.vercel.app
```

---

## Phase Roadmap

| Phase | What | When |
|---|---|---|
| **0 (done)** | vasData.json from CSV, dynamic profiles, new slug URLs | Now |
| **1** | OVAS CRM public VA API + publish toggle + Ocean VA client fetch | Next sprint |
| **2** | Blog model + editor in CRM + blog pages on public site | Sprint +2 |
| **3** | Module 03 auto-profile generation → publish pipeline | Sprint +3 |
| **4** | Ocean VA → Next.js migration (SSG for SEO) | Sprint +4 |
