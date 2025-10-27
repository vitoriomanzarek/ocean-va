import React from 'react'
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white py-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="mb-10 pb-8 border-b-2 border-ocean-100">
          <div className="flex items-center mb-4">
            <img src="/img/oceanVALogo.png" alt="Ocean" className="h-14 drop-shadow-md" />
          </div>
          <p className="text-sm max-w-2xl text-gray-700 leading-relaxed">
            Ocean Virtual Assistant is your trusted partner for efficient and customized virtual assistance services. From office management to specialized industry support, our bilingual assistants are here to streamline your operations. Contact us today to unlock new opportunities and elevate your business to new heights.
          </p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* SERVICES */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-ocean-700 font-bold mb-4 text-lg border-b-2 border-ocean-200 pb-2">SERVICES</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/services/customer-service-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Insurance Customer Service Representative</a></li>
              <li><a href="/services/virtual-administrative-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Administrative Assistant</a></li>
              <li><a href="/services/customer-service-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Customer Service Representative</a></li>
              <li><a href="/services/marketing-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Marketing Assistant</a></li>
              <li><a href="/services/virtual-receptionist" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Virtual Receptionist</a></li>
              <li><a href="/services/virtual-transaction-coordinator" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Transaction Coordinator</a></li>
              <li><a href="/services/sdr-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Sales, Development & Inside Sales</a></li>
              <li><a href="/services/virtual-assistant-services" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ General Virtual Assistant</a></li>
            </ul>
          </div>

          {/* INDUSTRIES */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-ocean-700 font-bold mb-4 text-lg border-b-2 border-ocean-200 pb-2">INDUSTRIES</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/insurance" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Insurance</a></li>
              <li><a href="/industries/real-estate-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Real Estate Virtual Assistant</a></li>
              <li><a href="/industries/small-business-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Small Business Virtual Assistant</a></li>
              <li><a href="/industries/ecommerce-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ E-Commerce Virtual Assistant</a></li>
              <li><a href="/industries/finance-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Finance Virtual Assistant</a></li>
              <li><a href="/industries/property-management-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Property Management Virtual Assistant</a></li>
              <li><a href="/industries/medical-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Healthcare Virtual Assistant</a></li>
              <li><a href="/industries/hr-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ HR Virtual Assistant</a></li>
              <li><a href="/industries/tech-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Technology Virtual Assistant</a></li>
              <li><a href="/industries/mortgage-virtual-assistant" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ Mortgage and Lending Virtual Assistant</a></li>
            </ul>
          </div>

          {/* OTHER PAGES */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-ocean-700 font-bold mb-4 text-lg border-b-2 border-ocean-200 pb-2">OTHER PAGES</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/about-us" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ ABOUT US</a></li>
              <li><a href="/pricing" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ PRICING</a></li>
              <li><a href="/our-vas" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ OUR VIRTUAL ASSISTANTS</a></li>
              <li><a href="/faqs" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ FAQs</a></li>
              <li><a href="/blogs" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ BLOGS</a></li>
              <li><a href="/careers" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ CAREERS</a></li>
              <li><a href="/contact-us" className="text-gray-700 hover:text-ocean-600 hover:translate-x-1 inline-block transition-all duration-200">→ CONTACT US</a></li>
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-ocean-700 font-bold mb-4 text-lg border-b-2 border-ocean-200 pb-2">SOCIAL LINKS</h3>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.facebook.com/oceanvirtualassistant" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-700 hover:from-ocean-600 hover:to-ocean-800 text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/ocean-virtual-assistant" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-700 hover:from-ocean-600 hover:to-ocean-800 text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@oceanvirtualassistant" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-700 hover:from-ocean-600 hover:to-ocean-800 text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/oceanvirtualassistant" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-700 hover:from-ocean-600 hover:to-ocean-800 text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Contact Bar */}
        <div className="bg-ocean-50 rounded-lg p-6 shadow-inner border border-ocean-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-700">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="font-medium">📍 Address: 789 SW Federal Highway, Suite 201 Stuart, FL 34994</span>
              <span className="font-medium">✉️ Email: <a href="mailto:info@oceanvirtualassistant.com" className="text-ocean-600 hover:text-ocean-800 transition-colors font-semibold">info@oceanvirtualassistant.com</a></span>
              <span className="font-medium">📞 Phone: 772-247-0269</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>&copy; 2025 Ocean Virtual Assistant Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}