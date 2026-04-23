import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Save, ArrowLeft, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import TagInput from '../components/TagInput'

// ── Constants ────────────────────────────────────────────────────────────────
const MAIN_CATEGORIES = [
  'Insurance Virtual Assistant',
  'Executive Virtual Assistant',
  'Healthcare Virtual Assistant',
  'Real Estate Assistant',
  'Mortgage Specialist',
  'Marketing Virtual Assistant',
]

const AVAILABILITY_OPTIONS = ['Full Time', 'Part Time', 'Assigned', 'Not Active']

const DISC_OPTIONS = ['D', 'I', 'S', 'C', 'D+I', 'D+C', 'I+S', 'C+S', 'I+D', 'C+D', 'S+I', 'S+C', 'S+D']

const CEFR_OPTIONS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const LANGUAGE_OPTIONS = ['English', 'Spanish', 'English / Spanish', 'Portuguese', 'French']

// ── Helpers ──────────────────────────────────────────────────────────────────
function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

function emptyVA() {
  return {
    name: '', slug: '', title: '', mainCategory: MAIN_CATEGORIES[0],
    availability: 'Full Time', tagline: '', summary: '',
    experience: '', languages: 'English', englishLevel: 'B2', discType: 'C',
    image: '', video: '', videoThumbnail: '', videoThumbDesc: '',
    specialization: [], tools: [], skills: [], equipment: [],
    employmentHtml: '', educationHtml: '',
    published: false,
  }
}

// ── Section wrapper ──────────────────────────────────────────────────────────
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

// ── Field helpers ─────────────────────────────────────────────────────────────
function Field({ label, hint, children, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
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
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-y font-mono ${className}`}
      {...props}
    />
  )
}

function Select({ options, className = '', ...props }) {
  return (
    <select
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent ${className}`}
      {...props}
    >
      {options.map(o => (
        <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
          {typeof o === 'string' ? o : o.label}
        </option>
      ))}
    </select>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function VAEditor() {
  const { slug } = useParams()
  const isNew = slug === 'new'
  const navigate = useNavigate()
  const { vas, saveVA } = useAdmin()

  const [form, setForm] = useState(emptyVA)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slugLocked, setSlugLocked] = useState(!isNew)
  const [previewHtml, setPreviewHtml] = useState(null) // null = off, 'employment'|'education'

  // Load existing VA on edit
  useEffect(() => {
    if (!isNew) {
      const existing = vas.find(v => v.slug === slug)
      if (existing) setForm({ ...emptyVA(), ...existing })
    }
  }, [isNew, slug, vas])

  // Auto-generate slug from name while unlocked
  useEffect(() => {
    if (!slugLocked && form.name) {
      setForm(f => ({ ...f, slug: toSlug(f.name) }))
    }
  }, [form.name, slugLocked])

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.slug.trim()) e.slug = 'Slug is required'
    if (!form.mainCategory) e.mainCategory = 'Category is required'
    // Check slug uniqueness for new VAs
    if (isNew && vas.find(v => v.slug === form.slug)) {
      e.slug = 'A VA with this slug already exists'
    }
    return e
  }

  function handleSave(publishAfterSave = false) {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setSaving(true)
    const toSave = publishAfterSave ? { ...form, published: true } : form
    saveVA(toSave)

    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 2500)

    if (isNew) navigate(`/admin/vas/${form.slug}`, { replace: true })
  }

  const published = form.published !== false

  return (
    <div className="min-h-full bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/admin/vas" className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <ArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Virtual Assistants</p>
              <h1 className="font-semibold text-gray-900 text-sm truncate">
                {isNew ? 'New Virtual Assistant' : (form.name || slug)}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isNew && (
              <a
                href={`/virtual-assistants/${form.slug}`}
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
                disabled={saving}
                className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-60"
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
          {published ? 'Published — visible on the public site' : 'Draft — hidden from the public site'}
        </div>

        {/* Basic Info */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Field label="Full Name" required>
              <Input
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Karen Mejia"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </Field>
            <Field label="URL Slug" hint="Used in /virtual-assistants/[slug]" required>
              <div className="flex gap-2">
                <Input
                  value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  placeholder="karen-mejia"
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
            <Field label="Job Title / Role">
              <Input
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="Insurance Virtual Assistant"
              />
            </Field>
            <Field label="Main Category" required>
              <Select
                value={form.mainCategory}
                onChange={e => set('mainCategory', e.target.value)}
                options={MAIN_CATEGORIES}
              />
              {errors.mainCategory && <p className="text-xs text-red-500 mt-1">{errors.mainCategory}</p>}
            </Field>
            <Field label="Availability">
              <Select
                value={form.availability}
                onChange={e => set('availability', e.target.value)}
                options={AVAILABILITY_OPTIONS}
              />
            </Field>
            <Field label="Experience">
              <Input
                value={form.experience}
                onChange={e => set('experience', e.target.value)}
                placeholder="5+ years"
              />
            </Field>
          </div>
        </Section>

        {/* Profile Content */}
        <Section title="Profile Content">
          <div className="space-y-4 pt-4">
            <Field label="Tagline" hint="Short, punchy headline shown on the profile card">
              <Input
                value={form.tagline}
                onChange={e => set('tagline', e.target.value)}
                placeholder="Detail-oriented insurance specialist who eliminates claims backlogs"
              />
            </Field>
            <Field label="Summary" hint="2–3 sentence bio displayed on the profile page">
              <Textarea
                rows={3}
                value={form.summary}
                onChange={e => set('summary', e.target.value)}
                placeholder="Karen has 5+ years supporting independent insurance agents..."
                className="font-sans"
              />
            </Field>
          </div>
        </Section>

        {/* Media */}
        <Section title="Media">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Field label="Profile Photo URL" hint="Direct image URL (Webflow CDN or Vercel Blob)">
              <Input
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder="https://cdn.prod.website-files.com/..."
              />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover border" />
              )}
            </Field>
            <Field label="Intro Video URL" hint="YouTube URL (youtu.be/ID or watch?v=ID)">
              <Input
                value={form.video}
                onChange={e => set('video', e.target.value)}
                placeholder="https://youtu.be/..."
              />
            </Field>
            <Field label="Video Thumbnail URL">
              <Input
                value={form.videoThumbnail}
                onChange={e => set('videoThumbnail', e.target.value)}
                placeholder="https://..."
              />
            </Field>
            <Field label="Video Thumb Caption">
              <Input
                value={form.videoThumbDesc}
                onChange={e => set('videoThumbDesc', e.target.value)}
                placeholder="Watch Karen's intro video"
              />
            </Field>
          </div>
        </Section>

        {/* Assessment */}
        <Section title="Assessment & Language">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <Field label="DISC Type">
              <Select
                value={form.discType}
                onChange={e => set('discType', e.target.value)}
                options={DISC_OPTIONS}
              />
            </Field>
            <Field label="Languages">
              <Select
                value={form.languages}
                onChange={e => set('languages', e.target.value)}
                options={LANGUAGE_OPTIONS}
              />
            </Field>
            <Field label="English Level (CEFR)">
              <Select
                value={form.englishLevel}
                onChange={e => set('englishLevel', e.target.value)}
                options={CEFR_OPTIONS}
              />
            </Field>
          </div>
        </Section>

        {/* Skills & Tags */}
        <Section title="Skills, Tools & Specialization">
          <div className="space-y-4 pt-4">
            <Field label="Specializations" hint="Press Enter or comma to add">
              <TagInput value={form.specialization} onChange={v => set('specialization', v)} placeholder="Claims processing, Policy renewals..." />
            </Field>
            <Field label="Tools & Software" hint="CRM, agency management systems, etc.">
              <TagInput value={form.tools} onChange={v => set('tools', v)} placeholder="AgencyBloc, HubSpot, Salesforce..." />
            </Field>
            <Field label="Skills" hint="Core professional skills">
              <TagInput value={form.skills} onChange={v => set('skills', v)} placeholder="Customer service, Data entry..." />
            </Field>
            <Field label="Equipment">
              <TagInput value={form.equipment} onChange={v => set('equipment', v)} placeholder="Dual monitor, Noise-cancelling headset..." />
            </Field>
          </div>
        </Section>

        {/* Employment History */}
        <Section title="Employment History (HTML)" defaultOpen={false}>
          <div className="space-y-3 pt-4">
            <p className="text-xs text-gray-400">Webflow-exported accordion HTML. Leave empty if no history available.</p>
            <Textarea
              rows={10}
              value={form.employmentHtml}
              onChange={e => set('employmentHtml', e.target.value)}
              placeholder="<div class='va-employment-accordion'>...</div>"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPreviewHtml(previewHtml === 'employment' ? null : 'employment')}
                className="text-xs text-ocean-600 hover:underline"
              >
                {previewHtml === 'employment' ? 'Hide preview' : 'Preview HTML'}
              </button>
            </div>
            {previewHtml === 'employment' && (
              <div
                className="border border-gray-200 rounded-lg p-4 bg-gray-800 text-white text-sm va-employment-html overflow-auto"
                dangerouslySetInnerHTML={{ __html: form.employmentHtml }}
              />
            )}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education (HTML)" defaultOpen={false}>
          <div className="space-y-3 pt-4">
            <p className="text-xs text-gray-400">Webflow-exported education HTML.</p>
            <Textarea
              rows={6}
              value={form.educationHtml}
              onChange={e => set('educationHtml', e.target.value)}
              placeholder="<div class='va-education-item'>...</div>"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPreviewHtml(previewHtml === 'education' ? null : 'education')}
                className="text-xs text-ocean-600 hover:underline"
              >
                {previewHtml === 'education' ? 'Hide preview' : 'Preview HTML'}
              </button>
            </div>
            {previewHtml === 'education' && (
              <div
                className="border border-gray-200 rounded-lg p-4 bg-gray-800 text-white text-sm va-education-html overflow-auto"
                dangerouslySetInnerHTML={{ __html: form.educationHtml }}
              />
            )}
          </div>
        </Section>

        {/* Save footer */}
        <div className="flex justify-end gap-3 pb-6">
          <Link to="/admin/vas" className="px-5 py-2.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          {!published && (
            <button
              onClick={() => handleSave(true)}
              className="px-5 py-2.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              Save & Publish
            </button>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors font-medium disabled:opacity-60"
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Draft'}
          </button>
        </div>
      </div>
    </div>
  )
}
