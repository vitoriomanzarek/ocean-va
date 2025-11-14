import React, { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

/**
 * Navbar Code Component for Webflow
 * 
 * Props:
 * - logo: string - Logo image URL
 * - logoAlt: string - Logo alt text
 * - links: array - Navigation links
 * - ctaText: string - CTA button text
 * - ctaLink: string - CTA button link
 */
export const Navbar = ({ 
  logo = '/img/oceanVALogo.png',
  logoAlt = 'Ocean VA Logo',
  links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', submenu: [] },
    { label: 'Industries', href: '/industries', submenu: [] },
    { label: 'Our VAs', href: '/ovas-current-vas' }
  ],
  ctaText = 'Book a Demo',
  ctaLink = '#contact'
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt={logoAlt} 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {links?.map((link, idx) => (
              <div key={idx} className="relative group">
                <a 
                  href={link.href}
                  className="text-gray-700 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.submenu && link.submenu.length > 0 && (
                    <ChevronDown size={16} />
                  )}
                </a>
                
                {/* Submenu */}
                {link.submenu && link.submenu.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {link.submenu.map((item, sidx) => (
                      <a
                        key={sidx}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <a 
              href={ctaLink}
              className="bg-ocean-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-ocean-700 transition-colors"
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden pb-4">
            {links?.map((link, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === idx ? null : idx)}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-ocean-600 hover:bg-gray-50 rounded flex items-center justify-between"
                >
                  <a href={link.href} className="flex-1">
                    {link.label}
                  </a>
                  {link.submenu && link.submenu.length > 0 && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${openSubmenu === idx ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
                
                {/* Mobile Submenu */}
                {link.submenu && link.submenu.length > 0 && openSubmenu === idx && (
                  <div className="pl-4">
                    {link.submenu.map((item, sidx) => (
                      <a
                        key={sidx}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-ocean-600 hover:bg-gray-50 rounded"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Button */}
            <a 
              href={ctaLink}
              className="block mt-4 bg-ocean-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-ocean-700 transition-colors text-center"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

Navbar.displayName = 'Navbar'
Navbar.defaultProps = {
  logo: '/img/oceanVALogo.png',
  logoAlt: 'Ocean VA Logo',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', submenu: [] },
    { label: 'Industries', href: '/industries', submenu: [] },
    { label: 'Our VAs', href: '/ovas-current-vas' }
  ],
  ctaText: 'Book a Demo',
  ctaLink: '#contact'
}
