import React from 'react'
import { Home, Wrench, FileText, Calendar, DollarSign } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { propertyManagementFaqs } from './data/faqs'

export default function PropertyManagementVA() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Property Management Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Virtual assistants for property management: tenant inquiries, maintenance coordination, listings, renewals, and accounting support.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/property-management-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Property Management Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Respond faster to tenants and vendors, keep listings fresh, and coordinate maintenance—all without adding office overhead.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your property management VA handles daily operations across your portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Home, title: 'Tenant Communications', description: 'Tenant calls, emails, and showings coordination' },
            { icon: Wrench, title: 'Maintenance Coordination', description: 'Maintenance requests, vendor scheduling, and updates' },
            { icon: FileText, title: 'Listings & Applications', description: 'Listings and lead follow‑ups; application processing' },
            { icon: Calendar, title: 'Move-In/Out', description: 'Move‑in/out checklists and deposit paperwork' },
            { icon: DollarSign, title: 'Accounting Support', description: 'Light accounting support: charges, receipts, and reports' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Property management expertise that keeps your portfolio running smoothly." />

      <OutcomesSection 
        subtitle="Real results that improve your property operations."
        outcomes={[
          { icon: '⚡', title: 'Faster Response Times', description: 'Faster response times and happier residents' },
          { icon: '📁', title: 'Clean Unit Files', description: 'Clean unit files and on‑time renewals' },
          { icon: '✅', title: 'Less Chaos', description: 'Less chaos for property managers' }
        ]}
      />

      <Pricing />

      <FAQSection faqs={propertyManagementFaqs} />

      <BookingDemo id="booking" />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Improve Your Property Management?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated VA who keeps your properties running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#booking" 
              onClick={(e) => handleScroll(e, 'booking')}
              className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Book a Discovery Call
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleScroll(e, 'pricing')}
              className="bg-ocean-600 hover:bg-ocean-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all duration-200 cursor-pointer"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}