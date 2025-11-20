import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function NavbarVA() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const vaCategories = [
    { name: 'Insurance Virtual Assistant', href: '/our-vas' },
    { name: 'Licensed Insurance Agents', href: '/licensed-insurance-agents' },
    { name: 'Executive / Admin VA', href: '/executive-admin-vas' },
    { name: 'Mortgage Processing Assistant', href: '/ovas-mortgage-processing-assistant' },
    { name: 'Medical Assistant Specialist', href: '/ovas-medical-assistant' }
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src="/img/oceanVALogo.png" alt="Ocean VA" className="h-12" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* BOOK A DISCOVERY CALL */}
            <a
              href="/contact-us"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-200"
            >
              BOOK A DISCOVERY CALL
            </a>

            {/* VA CATEGORIES Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('categories')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-200">
                VA CATEGORIES
                <ChevronDown size={16} />
              </button>
              {openDropdown === 'categories' && (
                <div className="absolute left-0 mt-0 pt-2 w-64 z-10">
                  <div className="bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                    {vaCategories.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FAQ */}
            <a
              href="/faq-va-interview"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-200"
            >
              FAQ
            </a>

            {/* NEXT STEPS */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfMTLuUz2zGYGYgapBoxur4g5W1TYNqYD96SaT0Z_itmJxqXg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-200"
            >
              NEXT STEPS
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {/* BOOK A DISCOVERY CALL */}
            <a
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-200"
            >
              BOOK A DISCOVERY CALL
            </a>

            {/* VA CATEGORIES */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'categories' ? null : 'categories')}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-200"
              >
                VA CATEGORIES
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === 'categories' ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 'categories' && (
                <div className="mt-2 pl-4 space-y-2">
                  {vaCategories.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setOpenDropdown(null)
                      }}
                      className="block text-sm text-gray-700 hover:text-teal-600 py-1"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* FAQ */}
            <a
              href="/faq-va-interview"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-200"
            >
              FAQ
            </a>

            {/* NEXT STEPS */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfMTLuUz2zGYGYgapBoxur4g5W1TYNqYD96SaT0Z_itmJxqXg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-200"
            >
              NEXT STEPS
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
