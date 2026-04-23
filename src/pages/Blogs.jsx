import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import blogData from '../data/blogData.json'

const PAGE_SIZE = 12

function BlogCard({ post }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 bg-white"
    >
      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ocean-50">
            <span className="text-ocean-300 text-4xl">OVA</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <Calendar size={12} />
          <span>{post.displayDate}</span>
        </div>
        <h2 className="text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-ocean-600 transition-colors line-clamp-2">
          {post.name}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
        {post.authorName && (
          <p className="mt-3 text-xs text-gray-400">By {post.authorName}</p>
        )}
      </div>
    </Link>
  )
}

export default function Blogs() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search.trim()) return blogData
    const term = search.toLowerCase()
    return blogData.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        (p.authorName || '').toLowerCase().includes(term)
    )
  }, [search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-ocean-700 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-ocean-100 leading-relaxed mb-6">
              Expert tips and insights to boost your business efficiency with virtual assistants.
            </p>
            <a
              href="/contact-us"
              className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-all duration-200 shadow-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Search + count */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-60">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
          </div>
          <span className="text-sm text-gray-500">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map(post => (
                <BlogCard key={post.itemId || post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-20">No articles found for "{search}".</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                .reduce((acc, n, idx, arr) => {
                  if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…')
                  acc.push(n)
                  return acc
                }, [])
                .map((item, idx) =>
                  item === '…' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        page === item
                          ? 'bg-ocean-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
