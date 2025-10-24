import React from 'react'
import { Phone, Calendar, DollarSign, Share2, Users } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'

export default function SmallBusinessVA() {
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
    "name": "Virtual Assistant for Small Business",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Virtual assistants for small businesses: phones, scheduling, billing support, marketing, and admin.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/small-business-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Virtual Assistant for Small Business
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Owners shouldn’t be stuck in inbox and admin. Bring on a dedicated VA to answer calls, book appointments, manage follow‑ups, and keep projects on track.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your small business VA handles the daily tasks that keep your business running.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Phone, title: 'Phones & Scheduling', description: 'Phones and appointment scheduling' },
            { icon: DollarSign, title: 'Billing & Follow-ups', description: 'Quotes, invoices, and payment follow‑ups' },
            { icon: Calendar, title: 'Inbox & Calendar', description: 'Inbox/calendar management and customer follow‑ups' },
            { icon: Share2, title: 'Social & Reviews', description: 'Social posts, local listings, and review replies' },
            { icon: Users, title: 'Bookkeeping & Vendors', description: 'Light bookkeeping and vendor coordination' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Small business support that understands your needs." />

      <OutcomesSection 
        subtitle="Real results that help your small business thrive."
        outcomes={[
          { icon: '📞', title: 'Fewer Missed Calls', description: 'Fewer missed calls and faster responses' },
          { icon: '💰', title: 'Better Cash Flow', description: 'Better cash flow via on‑time follow‑ups' },
          { icon: '⏰', title: 'More Time to Lead', description: 'More time for owners to lead and sell' }
        ]}
      />

      <Pricing />

      <FAQ />

      <BookingDemo id="booking" />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Small Business?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated VA who handles your daily operations so you can focus on growth.
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