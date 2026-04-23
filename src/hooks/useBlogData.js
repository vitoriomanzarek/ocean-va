import { useMemo } from 'react'
import baseBlogs from '../data/blogData.json'

const BLOG_KEY = 'ovas_blog_overrides'

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem(BLOG_KEY) || '{}') } catch { return {} }
}

export function mergeBlogs(overrides, publishedOnly = false) {
  const baseSlugs = new Set(baseBlogs.map(b => b.slug))

  const merged = baseBlogs
    .filter(b => !overrides[b.slug]?._deleted)
    .map(b => ({ published: true, ...b, ...(overrides[b.slug] || {}), _new: false }))

  const newBlogs = Object.values(overrides)
    .filter(b => b._new && !b._deleted && !baseSlugs.has(b.slug))

  const all = [...merged, ...newBlogs]
  return publishedOnly ? all.filter(b => b.published !== false) : all
}

// Public-facing hook — only returns published posts.
export function useBlogData() {
  return useMemo(() => {
    const overrides = loadOverrides()
    return mergeBlogs(overrides, true)
  }, [])
}
