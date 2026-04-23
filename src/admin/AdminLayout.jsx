import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Users, FileText, ExternalLink, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { AdminProvider } from './AdminContext'

const NAV = [
  { to: '/admin/vas',   label: 'Virtual Assistants', icon: Users },
  { to: '/admin/blogs', label: 'Blog Posts',          icon: FileText },
]

function Sidebar({ onClose }) {
  const navigate = useNavigate()

  function signOut() {
    sessionStorage.removeItem('vaFormAuthenticated')
    navigate('/va-login')
  }

  return (
    <aside className="flex flex-col h-full bg-slate-900 text-slate-300 w-56 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700">
        <span className="text-white font-bold text-sm tracking-wide">
          <span className="text-ocean-400">Ocean</span> VA Admin
        </span>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Content</p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-ocean-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-slate-700 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink size={16} />
          View Site
        </a>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <AdminProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="relative">
              <Sidebar onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile top bar */}
          <div className="flex lg:hidden items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu size={20} />
            </button>
            <span className="font-semibold text-gray-900 text-sm">
              <span className="text-ocean-600">Ocean</span> VA Admin
            </span>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
