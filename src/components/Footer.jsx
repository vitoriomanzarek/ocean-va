import React from 'react'
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 mb-16">
          <div>
            <img src="/img/oceanVALogo.png" alt="Ocean VA" className="h-12" />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
            Ocean Virtual Assistant is your trusted partner for efficient and customized virtual assistance services. From office management to specialized industry support, our bilingual assistants are here to streamline your operations. Contact us today to unlock new opportunities and elevate your business to new heights.
          </p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-16 border-b border-gray-200">
          {/* SERVICES */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-ocean-600 font-extrabold text-sm uppercase tracking-wide mb-4 pb-3 border-b-2 border-gray-200">Services</h3>
            <ul className="space-y-3">
              <li><a href="/services/insurance-customer-service-representative" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Insurance Customer Service</a></li>
              <li><a href="/services/administrative-assistant" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Administrative Assistant</a></li>
              <li><a href="/services/customer-service-representative" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Customer Service</a></li>
              <li><a href="/services/marketing-assistant" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Marketing Assistant</a></li>
              <li><a href="/services/virtual-receptionist" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Virtual Receptionist</a></li>
              <li><a href="/services/transaction-coordinator" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Transaction Coordinator</a></li>
              <li><a href="/services/sales-development-inside-sales" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Sales &amp; Inside Sales</a></li>
              <li><a href="/services/general-virtual-assistant" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ General Virtual Assistant</a></li>
            </ul>
          </div>

          {/* INDUSTRIES */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-ocean-600 font-extrabold text-sm uppercase tracking-wide mb-4 pb-3 border-b-2 border-gray-200">Industries</h3>
            <ul className="space-y-3">
              <li><a href="/industries/insurance-virtual-assistant" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Insurance</a></li>
              <li><a href="/industries/real-estate-virtual-assistant" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Real Estate</a></li>
              <li><a href="/industries/small-business" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Small Business</a></li>
              <li><a href="/industries/e-commerce" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ E-Commerce</a></li>
              <li><a href="/industries/finance" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Finance</a></li>
              <li><a href="/industries/property-management" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Property Management</a></li>
              <li><a href="/industries/healthcare" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Healthcare</a></li>
              <li><a href="/industries/hr" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ HR</a></li>
              <li><a href="/industries/technology" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Technology</a></li>
              <li><a href="/industries/mortgage-and-lending" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Mortgage &amp; Lending</a></li>
            </ul>
          </div>

          {/* OTHER PAGES */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-ocean-600 font-extrabold text-sm uppercase tracking-wide mb-4 pb-3 border-b-2 border-gray-200">Other Pages</h3>
            <ul className="space-y-3">
              <li><a href="/about-us" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ About Us</a></li>
              <li><a href="/pricing" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Pricing</a></li>
              <li><a href="/ovas-current-vas" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Our VAs</a></li>
              <li><a href="/faq" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ FAQs</a></li>
              <li><a href="/blogs" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Blogs</a></li>
              <li><a href="/careers" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Careers</a></li>
              <li><a href="/contact-us" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Contact Us</a></li>
              <li><a href="/terms-and-conditions" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Terms &amp; Conditions</a></li>
              <li><a href="/privacy-policy" className="text-gray-500 hover:text-ocean-600 text-sm transition-colors">→ Privacy Policy</a></li>
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-ocean-600 font-extrabold text-sm uppercase tracking-wide mb-4 pb-3 border-b-2 border-gray-200">Social Links</h3>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.facebook.com/oceanvirtualassistant" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/ocean-virtual-assistant" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@oceanvirtualassistant" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/oceanvirtualassistant" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-teal-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
            <div>📍 Address: 789 SW Federal Highway, Suite 201 Stuart, FL 34994</div>
            <div>✉️ Email: <a href="mailto:info@oceanvirtualassistant.com" className="text-ocean-600 font-semibold hover:text-ocean-700 transition-colors">info@oceanvirtualassistant.com</a></div>
            <div>📞 Phone: 772-247-0269</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
          <p>&copy; 2025 Ocean Virtual Assistant Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
