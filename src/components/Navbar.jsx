import React, { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openSubmenu, setOpenSubmenu] = useState(null)

  const navigation = [
    {
      name: 'Services',
      dropdown: [
        { name: 'Insurance Customer Service Representative', href: '/services/insurance-customer-service-representative' },
        { name: 'Administrative Assistant', href: '/services/virtual-administrative-assistant' },
        { name: 'Customer Service Representative', href: '/services/customer-service-virtual-assistant' },
        { name: 'Marketing Assistant', href: '/services/marketing-virtual-assistant' },
        { name: 'Virtual Receptionist', href: '/services/virtual-receptionist' },
        { name: 'Transaction Coordinator', href: '/services/virtual-transaction-coordinator' },
        { name: 'Sales, Development & Inside Sales', href: '/services/sdr-virtual-assistant' },
        { name: 'General Virtual Assistant', href: '/services/virtual-assistant-services' },
      ]
    },
    {
      name: 'Industries',
      dropdown: [
        { name: 'Insurance', href: '/insurance' },
        { name: 'Real Estate', href: '/industries/real-estate-virtual-assistant' },
        { name: 'Small Business', href: '/industries/small-business-virtual-assistant' },
        { name: 'E-Commerce', href: '/industries/ecommerce-virtual-assistant' },
        { name: 'Finance', href: '/industries/finance-virtual-assistant' },
        { name: 'Property Management', href: '/industries/property-management-virtual-assistant' },
        { name: 'Healthcare', href: '/industries/medical-virtual-assistant' },
        { name: 'HR', href: '/industries/hr-virtual-assistant' },
        { name: 'Technology', href: '/industries/tech-virtual-assistant' },
        { name: 'Mortgage and Lending', href: '/industries/mortgage-virtual-assistant' },
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    {
      name: 'Our VAs',
      dropdown: [
        { name: 'Insurance Virtual Assistant', href: '/ovas-current-vas' },
        { name: 'Executive / Admin VA', href: '/executive-admin-vas' },
        { name: 'Property Management Assistants', href: '/ovas-property-management-assistants' },
        { name: 'Mortgage Processing Assistant', href: '/ovas-mortgage-processing-assistant' },
        { name: 'Medical Assistant Specialist', href: '/ovas-medical-assistant' }
      ]
    },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Careers', href: '/careers' },
    { name: 'About Us', href: '/about-us' },
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
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="text-gray-700 hover:text-ocean-600 font-medium flex items-center">
                      {item.name}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-0 pt-2 w-64">
                        <div className="bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                          {item.dropdown.map((subItem) => (
                            <div key={subItem.name} className="relative group">
                              <a
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-700 flex justify-between items-center"
                                onMouseEnter={() => subItem.submenu && setOpenSubmenu(subItem.name)}
                                onMouseLeave={() => subItem.submenu && setOpenSubmenu(null)}
                              >
                                {subItem.name}
                                {subItem.submenu && (
                                  <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </a>
                              {subItem.submenu && openSubmenu === subItem.name && (
                                <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-10">
                                  {subItem.submenu.map((submenuItem) => (
                                    <a
                                      key={submenuItem.name}
                                      href={submenuItem.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-700"
                                    >
                                      {submenuItem.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-ocean-600 font-medium"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/contact-us"
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-ocean-600 p-2"
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
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full text-left text-gray-700 hover:text-ocean-600 font-medium py-2 flex justify-between items-center"
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.dropdown.map((subItem) => (
                          <div key={subItem.name}>
                            <a
                              href={subItem.href}
                              className="block text-sm text-gray-600 hover:text-ocean-600 py-1"
                            >
                              {subItem.name}
                            </a>
                            {subItem.submenu && (
                              <div className="pl-4 space-y-1 mt-1">
                                {subItem.submenu.map((submenuItem) => (
                                  <a
                                    key={submenuItem.name}
                                    href={submenuItem.href}
                                    className="block text-sm text-gray-500 hover:text-ocean-600 py-0.5"
                                  >
                                    {submenuItem.name}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-ocean-600 font-medium py-2"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            <a
              href="/contact-us"
              className="block w-full text-center bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-6 py-3 rounded-lg transition-all mt-4"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}