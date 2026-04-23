import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import { useBlogData } from '../hooks/useBlogData'

export default function BlogPost() {
  const { slug } = useParams()
  const blogData = useBlogData()
  const post = blogData.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Article not found</h1>
        <p className="text-gray-500">The article you're looking for doesn't exist or may have moved.</p>
        <Link to="/blogs" className="text-ocean-600 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover image */}
      {post.coverImage && (
        <div className="w-full max-h-[480px] overflow-hidden bg-gray-100">
          <img
            src={post.coverImage}
            alt={post.name}
            className="w-full object-cover max-h-[480px]"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:underline mb-6"
        >
          <ArrowLeft size={14} /> All Articles
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.displayDate}
          </span>
          {post.authorName && (
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.authorName}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          {post.name}
        </h1>

        {/* Body */}
        <div
          className="blog-post-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">
            Ready to hire a virtual assistant for your business?
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  )
}
