import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Save, ArrowLeft, Eye, EyeOff, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react'
import { useAdmin } from '../AdminContext'

// ── Helpers ──────────────────────────────────────────────────────────────────
function toSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

function stripHtml(html) {
  if (!html) return ''
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > 200 ? text.slice(0, 200).trimEnd() + '...' : text
}

function toDisplayDate(iso) {
  if (!iso) return ''
  try {
    const [y, m, d] = iso.split('-').map(Number)
    const dt = new Date(y, m - 1, d)
    return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return iso }
}

function emptyPost() {
  return {
    name: '', slug: '', date: new Date().toISOString().slice(0, 10), displayDate: '',
    coverImage: '', authorName: '', authorImage: '',
    excerpt: '', bodyHtml: '',
    published: false,
  }
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h2 className="font-semibold text-gray-900 text-sm">{title}</h2>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100">{children}</div>}
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  )
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

function Textarea({ rows = 4, className = '', ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-y ${className}`}
      {...props}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogEditor() {
  const { slug } = useParams()
  const isNew = slug === 'new'
  const navigate = useNavigate()
  const { blogs, saveBlog } = useAdmin()

  const [form, setForm] = useState(emptyPost)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slugLocked, setSlugLocked] = useState(!isNew)
  const [bodyPreview, setBodyPreview] = useState(false)

  useEffect(() => {
    if (!isNew) {
      const existing = blogs.find(b => b.slug === slug)
      if (existing) setForm({ ...emptyPost(), ...existing })
    }
  }, [isNew, slug, blogs])

  // Auto-generate slug from title while unlocked
  useEffect(() => {
    if (!slugLocked && form.name) {
      setForm(f => ({ ...f, slug: toSlug(f.name) }))
    }
  }, [form.name, slugLocked])

  // Auto-update displayDate when date changes
  useEffect(() => {
    setForm(f => ({ ...f, displayDate: toDisplayDate(f.date) }))
  }, [form.date])

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  function autoExcerpt() {
    const text = stripHtml(form.bodyHtml)
    if (text) set('excerpt', text)
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Title is required'
    if (!form.slug.trim()) e.slug = 'Slug is required'
    if (isNew && blogs.find(b => b.slug === form.slug)) e.slug = 'A post with this slug already exists'
    return e
  }

  function handleSave(publishAfterSave = false) {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setSaving(true)
    const toSave = publishAfterSave ? { ...form, published: true } : form
    saveBlog(toSave)

    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 2500)
    if (isNew) navigate(`/admin/blogs/${form.slug}`, { replace: true })
  }

  const published = form.published !== false

  return (
    <div className="min-h-full bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/admin/blogs" className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <ArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Blog Posts</p>
              <h1 className="font-semibold text-gray-900 text-sm truncate">
                {isNew ? 'New Post' : (form.name || slug)}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isNew && (
              <a
                href={`/blogs/${form.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-ocean-600 border border-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                <Eye size={13} /> Preview
              </a>
            )}
            {!published && (
              <button
                onClick={() => handleSave(true)}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Publish
              </button>
            )}
            {published && (
              <button
                onClick={() => set('published', false)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                <EyeOff size={13} /> Unpublish
              </button>
            )}
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-1.5 text-sm bg-ocean-600 hover:bg-ocean-700 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-60"
            >
              <Save size={14} />
              {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Status banner */}
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${published ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${published ? 'bg-green-500' : 'bg-amber-400'}`} />
          {published ? 'Published — visible on /blogs' : 'Draft — hidden from the public blog'}
        </div>

        {/* Post Details */}
        <Section title="Post Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="md:col-span-2">
              <Field label="Title">
                <Input
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="10 Signs You Need a Virtual Assistant in 2025"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </Field>
            </div>
            <Field label="URL Slug" hint="Used in /blogs/[slug]">
              <div className="flex gap-2">
                <Input
                  value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  placeholder="10-signs-you-need-a-virtual-assistant"
                  readOnly={slugLocked && !isNew}
                  className={slugLocked && !isNew ? 'bg-gray-50 text-gray-500' : ''}
                />
                {!isNew && (
                  <button
                    type="button"
                    onClick={() => setSlugLocked(l => !l)}
                    className="flex-shrink-0 px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500"
                  >
                    {slugLocked ? 'Edit' : 'Lock'}
                  </button>
                )}
              </div>
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
            </Field>
            <Field label="Publish Date">
              <Input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </Field>
            <Field label="Author Name">
              <Input
                value={form.authorName}
                onChange={e => set('authorName', e.target.value)}
                placeholder="Ocean VA Team"
              />
            </Field>
            <Field label="Author Photo URL">
              <Input
                value={form.authorImage}
                onChange={e => set('authorImage', e.target.value)}
                placeholder="https://..."
              />
            </Field>
          </div>
        </Section>

        {/* Cover Image */}
        <Section title="Cover Image">
          <div className="pt-4 space-y-3">
            <Field label="Cover Image URL" hint="Webflow CDN URL or Vercel Blob">
              <Input
                value={form.coverImage}
                onChange={e => set('coverImage', e.target.value)}
                placeholder="https://cdn.prod.website-files.com/..."
              />
            </Field>
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="Cover preview"
                className="w-full max-h-48 object-cover rounded-lg border border-gray-200"
              />
            )}
          </div>
        </Section>

        {/* Excerpt */}
        <Section title="Excerpt" hint="">
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Excerpt</label>
              <button
                type="button"
                onClick={autoExcerpt}
                className="flex items-center gap-1 text-xs text-ocean-600 hover:underline"
              >
                <RefreshCw size={11} /> Auto from body
              </button>
            </div>
            <Textarea
              rows={3}
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder="Short description shown on the blog listing page..."
              className="font-sans"
            />
          </div>
        </Section>

        {/* Body HTML */}
        <Section title="Body Content (HTML)">
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Paste HTML from Webflow, a rich text editor, or write it manually.</p>
              <button
                type="button"
                onClick={() => setBodyPreview(p => !p)}
                className="flex items-center gap-1.5 text-xs text-ocean-600 hover:underline"
              >
                <Eye size={12} />
                {bodyPreview ? 'Show Editor' : 'Preview'}
              </button>
            </div>

            {!bodyPreview ? (
              <Textarea
                rows={20}
                value={form.bodyHtml}
                onChange={e => set('bodyHtml', e.target.value)}
                placeholder="<h2>Introduction</h2><p>...</p>"
                className="font-mono text-xs"
              />
            ) : (
              <div
                className="blog-post-content border border-gray-200 rounded-lg p-6 min-h-48 bg-white overflow-auto"
                dangerouslySetInnerHTML={{ __html: form.bodyHtml || '<p class="text-gray-300">Nothing to preview yet.</p>' }}
              />
            )}
          </div>
        </Section>

        {/* Save footer */}
        <div className="flex justify-end gap-3 pb-6">
          <Link to="/admin/blogs" className="px-5 py-2.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          {!published && (
            <button
              onClick={() => handleSave(true)}
              className="px-5 py-2.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Save & Publish
            </button>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg font-medium disabled:opacity-60 transition-colors"
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Draft'}
          </button>
        </div>
      </div>
    </div>
  )
}
