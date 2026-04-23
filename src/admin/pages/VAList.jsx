import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2, Globe, GlobeLock, Eye } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import ConfirmModal from '../components/ConfirmModal'

const CATEGORIES = ['All', 'Insurance', 'Executive', 'Healthcare', 'Real Estate', 'Mortgage', 'Marketing']
const AVAILABILITY = ['All', 'Full Time', 'Part Time', 'Assigned']
const STATUS = ['All', 'Published', 'Draft']

function PublishToggle({ va, onToggle }) {
  const published = va.published !== false
  return (
    <button
      onClick={() => onToggle(va.slug)}
      title={published ? 'Click to unpublish' : 'Click to publish'}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
        published
          ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700'
          : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-green-500' : 'bg-gray-400'}`} />
      {published ? 'Published' : 'Draft'}
    </button>
  )
}

function AvailabilityBadge({ value }) {
  const colors = {
    'Full Time': 'bg-blue-100 text-blue-700',
    'Part Time': 'bg-purple-100 text-purple-700',
    'Assigned':  'bg-amber-100 text-amber-700',
    'Not Active': 'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[value] || 'bg-gray-100 text-gray-600'}`}>
      {value || '—'}
    </span>
  )
}

export default function VAList() {
  const { vas, togglePublishVA, deleteVA } = useAdmin()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [availFilter, setAvailFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return vas.filter(va => {
      if (catFilter !== 'All' && !va.mainCategory?.toLowerCase().includes(catFilter.toLowerCase())) return false
      if (availFilter !== 'All' && va.availability !== availFilter) return false
      if (statusFilter === 'Published' && va.published === false) return false
      if (statusFilter === 'Draft' && va.published !== false) return false
      if (term && ![va.name, va.title, va.mainCategory, ...(va.specialization || [])].join(' ').toLowerCase().includes(term)) return false
      return true
    })
  }, [vas, search, catFilter, availFilter, statusFilter])

  const stats = useMemo(() => ({
    total: vas.length,
    published: vas.filter(v => v.published !== false).length,
    draft: vas.filter(v => v.published === false).length,
  }), [vas])

  function confirmDelete() {
    if (toDelete) { deleteVA(toDelete); setToDelete(null) }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Virtual Assistants</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {stats.total} total · {stats.published} published · {stats.draft} drafts
          </p>
        </div>
        <Link
          to="/admin/vas/new"
          className="flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          New VA
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, title, skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-500 bg-white">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={availFilter} onChange={e => setAvailFilter(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-500 bg-white">
            {AVAILABILITY.map(a => <option key={a}>{a}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-500 bg-white">
            {STATUS.map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="self-center text-sm text-gray-400">{filtered.length} VAs</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">VA</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Availability</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-12">
                    No virtual assistants match your filters.
                  </td>
                </tr>
              )}
              {filtered.map(va => (
                <tr key={va.slug} className="hover:bg-gray-50/60 transition-colors">
                  {/* Avatar + name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={va.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${va.name}`}
                        alt={va.name}
                        className="w-9 h-9 rounded-full object-cover bg-gray-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{va.name}</p>
                        <p className="text-xs text-gray-400 truncate">{va.title || va.mainCategory}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                    <span className="truncate max-w-[160px] block">{va.mainCategory || '—'}</span>
                  </td>
                  {/* Availability */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <AvailabilityBadge value={va.availability} />
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <PublishToggle va={va} onToggle={togglePublishVA} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/virtual-assistants/${va.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview profile"
                        className="p-1.5 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        <Eye size={15} />
                      </a>
                      <Link
                        to={`/admin/vas/${va.slug}`}
                        title="Edit"
                        className="p-1.5 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={15} />
                      </Link>
                      <button
                        onClick={() => setToDelete(va.slug)}
                        title="Delete"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!toDelete}
        title="Delete VA?"
        message={`"${vas.find(v => v.slug === toDelete)?.name || toDelete}" will be removed from the site and cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
