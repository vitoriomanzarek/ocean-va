# OVAS CRM — Integration Plan
> Ocean VA public site + OVAS CRM internal platform

## Context

| Project | Stack | Deploy | Purpose |
|---|---|---|---|
| **Ocean VA** (this repo) | Vite + React + Tailwind | Vercel | Public marketing site |
| **OVAS CRM** (`ovas-internal`) | Next.js 16 + Prisma + PostgreSQL (Neon) | Vercel | Internal ops: recruiting, pipeline, placements |

**Goal:** OVAS CRM becomes the single source of truth for VA profiles and blog content — no more Webflow.

---

## Phase Roadmap

| Phase | What | Status |
|---|---|---|
| **0** | vasData.json + dynamic VA profiles (`/virtual-assistants/:slug`) | ✅ Done |
| **1** | blogData.json + `/blogs` listing + `/blogs/:slug` post pages | ✅ Done |
| **2** | OVAS CRM: public VA API + publish toggle + Ocean VA client fetch | Next sprint |
| **3** | OVAS CRM: Blog module (Prisma model + editor UI + public API) | Sprint +2 |
| **4** | OVAS CRM: Module 03 auto-profile generation pipeline | Sprint +3 |
| **5** | Ocean VA → Next.js migration (SSG/ISR for SEO) | Sprint +4 |

---

## Part 1 — VA Management

### Phase 0 — Static JSON (DONE)
- `src/data/vasData.json` — 150 VAs generated from Webflow CMS CSV export
- `scripts/csv-to-vasdata.py` — re-run when a new CSV is exported
- `/virtual-assistants/:slug` — one dynamic page handles all 150 profiles
- OurVAs listing pages — filter by category, availability, search

### Phase 2 — OVAS CRM as live source (Next sprint)

#### In OVAS CRM (`ovas-internal`)

**1. Extend `Candidate` model with public-site fields**
```prisma
model Candidate {
  // ... existing fields

  // Public site fields
  publishedToSite    Boolean   @default(false)
  profileSlug        String?   @unique
  siteTitle          String?
  siteTagline        String?
  siteImage          String?   // Vercel Blob URL after Remove.bg processing
  siteVideo          String?   // YouTube URL
  siteVideoThumb     String?
  siteThumbDesc      String?
  siteAvailability   String?   // Full Time | Part Time | Assigned
  siteMainCategory   String?
  siteSpecialization String[]
  siteTools          String[]
  siteSkills         String[]
  siteEquipment      String[]
  siteEmploymentHtml String?   @db.Text
  siteEducationHtml  String?   @db.Text
}
```

**2. Public VA API endpoint** — `src/app/api/public/vas/route.ts`
```ts
// GET /api/public/vas — no auth, cached 5 min
export async function GET() {
  const vas = await prisma.candidate.findMany({
    where: { publishedToSite: true },
    select: { profileSlug:true, name:true, siteTitle:true, siteTagline:true,
              siteImage:true, siteVideo:true, siteVideoThumb:true,
              siteAvailability:true, siteMainCategory:true,
              siteSpecialization:true, siteTools:true, siteSkills:true,
              siteEquipment:true, discType:true, englishLevel:true,
              siteEmploymentHtml:true, siteEducationHtml:true }
  })
  return Response.json(vas, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
  })
}
```

**3. "Publish to Site" toggle** in candidate detail UI (ADMIN/RECRUITER)
- Toggle → PATCH `/api/candidates/[id]` with `publishedToSite`
- "Preview Profile" link → `oceanvirtualassistant.com/virtual-assistants/[slug]`

**4. Vercel deploy hook** — trigger rebuild on publish:
```ts
if (changed('publishedToSite') || changed('siteImage') || changed('siteTitle')) {
  await fetch(process.env.OCEAN_VA_DEPLOY_HOOK_URL, { method: 'POST' })
}
```

#### In Ocean VA (this repo)

**5. `src/hooks/useVasData.js`** — fetch from CRM with JSON fallback:
```js
import { useState, useEffect } from 'react'
import localData from '../data/vasData.json'

export function useVasData() {
  const [vas, setVas] = useState(localData) // instant render from JSON
  useEffect(() => {
    const url = import.meta.env.VITE_CRM_API_URL
    if (!url) return
    fetch(`${url}/api/public/vas`)
      .then(r => r.json())
      .then(setVas)
      .catch(() => {}) // keep local JSON on error
  }, [])
  return vas
}
```

**6. Wire listing + profile pages** to use `useVasData()` hook.

### Phase 4 — Module 03 auto-generation (Sprint +3)
"OVAS Dream Job" pipeline stage in CRM → OpenAI generates `siteTagline`, `siteTitle`, `siteThumbDesc` → recruiter reviews in draft view → publishes to site with one click + Vercel deploy hook fires.

---

## Part 2 — Blog

### Blog CSV Analysis (Webflow export)

| Metric | Value |
|---|---|
| Total posts | **692** |
| All published | ✅ 692/692 |
| Has content (HTML) | ✅ 692/692 |
| Content length | 2,069 – 44,882 chars (avg 7,094) |
| Cover image | ✅ 689/692 (Webflow CDN) |
| Author name | ⚠️ 313/692 (45%) — incomplete |
| Author picture | ⚠️ 224/692 (32%) — incomplete |
| Encoding issues | Minor — `U+2019` ('), `U+2014` (—), `U+200D` (ZWJ) — fixed in conversion script |

**Images:** All 689 on `cdn.prod.website-files.com` — accessible until Webflow plan is cancelled. Future: migrate to Vercel Blob / Cloudflare Images.

**Author data:** Incomplete in Webflow — not critical for Phase 1. OVAS CRM editor will capture proper author on new posts.

### Phase 1 — Static JSON (DONE)
- `src/data/blogData.json` — 692 posts from Webflow CSV
- `scripts/csv-to-blogdata.py` — conversion script with encoding fixes
- `/blogs` — listing page: grid, search, pagination
- `/blogs/:slug` — individual post with cover image + HTML content

### Phase 3 — OVAS CRM Blog module (Sprint +2)

#### In OVAS CRM (`ovas-internal`)

**1. BlogPost Prisma model**
```prisma
model BlogPost {
  id           String    @id @default(cuid())
  slug         String    @unique
  title        String
  excerpt      String    @db.Text
  body         String    @db.Text  // HTML (rich text editor output)
  coverImage   String?             // Vercel Blob URL
  authorName   String?
  authorImage  String?
  published    Boolean   @default(false)
  publishedAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  authorUser   User?     @relation(fields: [authorUserId], references: [id])
  authorUserId String?
}
```

**2. Public Blog API**
```
GET /api/public/blog              — paginated list (title, slug, excerpt, coverImage, publishedAt)
GET /api/public/blog/[slug]       — full post with body HTML
```

**3. Blog editor UI** — roles: ADMIN, MEDIA
```
/dashboard/blog                   — list drafts + published
/dashboard/blog/new               — create with rich text editor (Tiptap or Quill)
/dashboard/blog/[id]/edit         — edit + publish toggle
```

**4. Seed migration** — import all 692 posts from `blogData.json` into Postgres via seed script.

#### In Ocean VA (this repo)

**5. `src/hooks/useBlogData.js`** — fetch from CRM with JSON fallback (same pattern as `useVasData`).

**6. Update `/blogs` + `/blogs/:slug`** to use hook.

---

## Part 3 — Images (Sprint +4)

Both VAs and Blog have images on Webflow CDN. Long-term:

| Asset | Current | Target |
|---|---|---|
| VA profile photos | Webflow CDN | Vercel Blob (after Remove.bg) |
| Blog cover images | Webflow CDN | Cloudflare Images or Vercel Blob |
| Author avatars | Webflow CDN | Vercel Blob |

Migration: bulk-download CDN images → upload to Vercel Blob → update URLs in DB.

---

## Environment Variables

### OVAS CRM
```
OCEAN_VA_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

### Ocean VA
```
VITE_CRM_API_URL=https://ovas-internal.vercel.app
```

---

## Summary: What to Build in OVAS CRM

| Task | Phase | Priority | Effort |
|---|---|---|---|
| Extend Candidate with site fields | 2 | High | S |
| `GET /api/public/vas` | 2 | High | S |
| Publish toggle in candidate UI | 2 | High | M |
| Vercel deploy hook on publish | 2 | Medium | S |
| BlogPost Prisma model | 3 | High | S |
| `GET /api/public/blog` + `/[slug]` | 3 | High | M |
| Blog editor UI | 3 | High | L |
| Seed 692 posts from blogData.json | 3 | Medium | S |
| Module 03 auto-profile gen | 4 | Medium | L |

## Summary: What to Build in Ocean VA

| Task | Phase | Priority | Effort |
|---|---|---|---|
| `useVasData` hook (CRM + fallback) | 2 | High | S |
| Wire VA pages to hook | 2 | High | S |
| `useBlogData` hook (CRM + fallback) | 3 | High | S |
| Wire blog pages to hook | 3 | High | S |
| Next.js migration (SSG/ISR) | 5 | Medium | XL |
