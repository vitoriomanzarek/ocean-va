import React, { createContext, useContext, useState, useCallback } from 'react'
import { mergeVAs } from '../hooks/useVasData'
import { mergeBlogs } from '../hooks/useBlogData'

const VA_KEY = 'ovas_va_overrides'
const BLOG_KEY = 'ovas_blog_overrides'

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || '{}') } catch { return {} }
}
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [vaOv, setVaOv] = useState(() => load(VA_KEY))
  const [blogOv, setBlogOv] = useState(() => load(BLOG_KEY))

  // ── VA operations ────────────────────────────────────────────
  const patchVA = useCallback((slug, patch) => {
    setVaOv(prev => {
      const next = { ...prev, [slug]: { ...(prev[slug] || {}), ...patch } }
      save(VA_KEY, next)
      return next
    })
  }, [])

  const saveVA = useCallback((va) => {
    // If slug not in base data it's a new VA
    const baseVAs = mergeVAs({}, false)
    const isNew = !baseVAs.find(v => v.slug === va.slug)
    setVaOv(prev => {
      const next = { ...prev, [va.slug]: { ...va, _new: isNew, _deleted: false } }
      save(VA_KEY, next)
      return next
    })
  }, [])

  const deleteVA = useCallback((slug) => {
    patchVA(slug, { _deleted: true })
  }, [patchVA])

  const togglePublishVA = useCallback((slug) => {
    const current = mergeVAs(vaOv).find(v => v.slug === slug)
    if (!current) return
    patchVA(slug, { published: current.published === false ? true : false })
  }, [vaOv, patchVA])

  // ── Blog operations ──────────────────────────────────────────
  const patchBlog = useCallback((slug, patch) => {
    setBlogOv(prev => {
      const next = { ...prev, [slug]: { ...(prev[slug] || {}), ...patch } }
      save(BLOG_KEY, next)
      return next
    })
  }, [])

  const saveBlog = useCallback((blog) => {
    const baseBlogs = mergeBlogs({}, false)
    const isNew = !baseBlogs.find(b => b.slug === blog.slug)
    setBlogOv(prev => {
      const next = { ...prev, [blog.slug]: { ...blog, _new: isNew, _deleted: false } }
      save(BLOG_KEY, next)
      return next
    })
  }, [])

  const deleteBlog = useCallback((slug) => {
    patchBlog(slug, { _deleted: true })
  }, [patchBlog])

  const togglePublishBlog = useCallback((slug) => {
    const current = mergeBlogs(blogOv).find(b => b.slug === slug)
    if (!current) return
    patchBlog(slug, { published: current.published === false ? true : false })
  }, [blogOv, patchBlog])

  const vas = mergeVAs(vaOv)
  const blogs = mergeBlogs(blogOv)

  return (
    <AdminContext.Provider value={{
      vas, blogs,
      saveVA, deleteVA, togglePublishVA,
      saveBlog, deleteBlog, togglePublishBlog,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider')
  return ctx
}
