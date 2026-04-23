import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2, Eye, Calendar } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import ConfirmModal from '../components/ConfirmModal'

function PublishToggle({ post, onToggle }) {
  const published = post.published !== false
  return (
    <button
      onClick={() => onToggle(post.slug)}
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

export default function BlogList() {
  const { blogs, togglePublishBlog, deleteBlog } = useAdmin()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return blogs.filter(post => {
      if (statusFilter === 'Published' && post.published === false) return false
      if (statusFilter === 'Draft' && post.published !== false) return false
      if (term && ![post.name, post.authorName || ''].join(' ').toLowerCase().includes(term)) return false
      return true
    })
  }, [blogs, search, statusFilter])

  const stats = useMemo(() => ({
    total: blogs.length,
    published: blogs.filter(b => b.published !== false).length,
    draft: blogs.filter(b => b.published === false).length,
  }), [blogs])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {stats.total} total · {stats.published} published · {stats.draft} drafts
          </p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-500 bg-white"
          >
            {['All', 'Published', 'Draft'].map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="self-center text-sm text-gray-400">{filtered.length} posts</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Post</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Author</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-12">
                    No posts match your filters.
                  </td>
                </tr>
              )}
              {filtered.map(post => (
                <tr key={post.slug} className="hover:bg-gray-50/60 transition-colors">
                  {/* Cover + title */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.name}
                          className="w-12 h-9 rounded-md object-cover flex-shrink-0 bg-gray-100"
                        />
                      ) : (
                        <div className="w-12 h-9 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300 text-xs">IMG</div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 leading-snug line-clamp-2 max-w-sm">{post.name}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">/blogs/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  {/* Author */}
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {post.authorName || <span className="text-gray-300">—</span>}
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1.5 text-gray-500 text-xs whitespace-nowrap">
                      <Calendar size={12} />
                      {post.displayDate || post.date || '—'}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <PublishToggle post={post} onToggle={togglePublishBlog} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/blogs/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview"
                        className="p-1.5 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        <Eye size={15} />
                      </a>
                      <Link
                        to={`/admin/blogs/${post.slug}`}
                        title="Edit"
                        className="p-1.5 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={15} />
                      </Link>
                      <button
                        onClick={() => setToDelete(post.slug)}
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
        title="Delete post?"
        message={`"${blogs.find(b => b.slug === toDelete)?.name || toDelete}" will be permanently removed.`}
        onConfirm={() => { deleteBlog(toDelete); setToDelete(null) }}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
