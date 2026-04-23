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

// Public-facing hook — only returns published, non-inactive VAs.
export function useVasData() {
  return useMemo(() => {
    const overrides = loadOverrides()
    return mergeVAs(overrides, true).filter(va => va.availability !== 'Not Active')
  }, [])
}
