import React, { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const navigation = [
    {
      name: 'Services',
      dropdown: [
        { name: 'Insurance Customer Service Representative', href: '/services/insurance-customer-service-representative' },
        { name: 'Administrative Assistant', href: '/services/administrative-assistant' },
        { name: 'Customer Service Representative', href: '/services/customer-service-representative' },
        { name: 'Marketing Assistant', href: '/services/marketing-assistant' },
        { name: 'Virtual Receptionist', href: '/services/virtual-receptionist' },
        { name: 'Transaction Coordinator', href: '/services/transaction-coordinator' },
        { name: 'Sales, Development & Inside Sales', href: '/services/sales-development-inside-sales' },
        { name: 'General Virtual Assistant', href: '/services/general-virtual-assistant' },
      ]
    },
    {
      name: 'Industries',
      dropdown: [
        { name: 'Insurance', href: '/industries/insurance-virtual-assistant' },
        { name: 'Real Estate', href: '/industries/real-estate-virtual-assistant' },
        { name: 'Small Business', href: '/industries/small-business' },
        { name: 'E-Commerce', href: '/industries/e-commerce' },
        { name: 'Finance', href: '/industries/finance' },
        { name: 'Property Management', href: '/industries/property-management' },
        { name: 'Healthcare', href: '/industries/healthcare' },
        { name: 'HR', href: '/industries/hr' },
        { name: 'Technology', href: '/industries/technology' },
        { name: 'Mortgage and Lending', href: '/industries/mortgage-and-lending' },
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    {
      name: 'Our VAs',
      dropdown: [
        { name: 'Insurance Experience Virtual Assistants', href: '/ovas-current-vas' },
        { name: 'Executive / Admin VA', href: '/ovas-executive-admin-virtual-assistant' },
        { name: 'Property Management Assistants', href: '/ovas-property-management-assistants' },
        { name: 'Mortgage Processing Assistant', href: '/ovas-mortgage-processing-assistant' },
        { name: 'Medical Assistant Specialist', href: '/ovas-medical-assistant' },
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
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="text-gray-700 hover:text-ocean-600 font-medium flex items-center text-sm whitespace-nowrap">
                      {item.name}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-0 pt-2 w-64 z-50">
                        <div className="bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-ocean-50 hover:text-ocean-700 transition-colors"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-ocean-600 font-medium text-sm whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block ml-4">
            <a
              href="/contact-us"
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-ocean-600 p-2"
              aria-label="Toggle menu"
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
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-screen overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full text-left text-gray-700 hover:text-ocean-600 font-medium py-3 flex justify-between items-center"
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
                      <div className="pl-4 space-y-1 mb-2">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-gray-600 hover:text-ocean-600 py-2"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-ocean-600 font-medium py-3 border-b border-gray-100"
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
