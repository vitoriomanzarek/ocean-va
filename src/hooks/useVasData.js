import { useMemo } from 'react'
import baseVAs from '../data/vasData.json'

const VA_KEY = 'ovas_va_overrides'

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem(VA_KEY) || '{}') } catch { return {} }
}

// Merge base JSON + localStorage overrides. publishedOnly filters drafts for public pages.
export function mergeVAs(overrides, publishedOnly = false) {
  const baseSlugs = new Set(baseVAs.map(v => v.slug))

  const merged = baseVAs
    .filter(va => !overrides[va.slug]?._deleted)
    .map(va => ({ published: true, ...va, ...(overrides[va.slug] || {}), _new: false }))

  const newVAs = Object.values(overrides)
    .filter(va => va._new && !va._deleted && !baseSlugs.has(va.slug))

  const all = [...merged, ...newVAs]
  return publishedOnly ? all.filter(va => va.published !== false) : all
}

// Availabilities shown on the public site (Assigned = working with a client, not available to hire)
const PUBLIC_AVAILABILITIES = new Set(['Full Time', 'Part Time'])

// Public-facing hook — only published + actually available VAs.
export function useVasData() {
  return useMemo(() => {
    const overrides = loadOverrides()
    return mergeVAs(overrides, true).filter(va => PUBLIC_AVAILABILITIES.has(va.availability))
  }, [])
}
