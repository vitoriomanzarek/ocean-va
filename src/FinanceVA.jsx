import React from 'react'
import { Calculator, FileText, DollarSign, BarChart3, Users } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { financeFaqs } from './data/faqs'

export default function FinanceVA() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Finance Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Finance virtual assistants for bookkeeping, reconciliations, AR/AP, reporting, and advisor support.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/finance-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Finance Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Keep books current and clients informed. Your finance VA supports reconciliations, AR/AP, reporting, and advisor/client coordination.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your finance VA handles the tasks that keep your books accurate and current.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Calculator, title: 'Reconciliations', description: 'Bank/credit card reconciliations and clean‑up' },
            { icon: DollarSign, title: 'AR/AP', description: 'Invoicing, collections, and vendor bills' },
            { icon: BarChart3, title: 'Reporting', description: 'Report packs, close checklists, and dashboards' },
            { icon: FileText, title: 'Document Collection', description: 'Document collection and client follow‑ups' },
            { icon: Users, title: 'Advisory Support', description: 'Calendar and meeting notes for advisory firms' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Finance expertise that keeps your books accurate and current." />

      <Pricing />

      <OutcomesSection 
        subtitle="Real results that improve your financial operations."
        outcomes={[
          { icon: '📊', title: 'Timely Books', description: 'Timely books and fewer month‑end surprises' },
          { icon: '💰', title: 'Faster Collections', description: 'Faster collections and vendor accuracy' },
          { icon: '📈', title: 'Clearer Insights', description: 'Clearer insight for decision‑making' }
        ]}
      />

      <BookingDemo />

      <FAQSection faqs={financeFaqs} />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Finance Operations?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated finance VA who keeps your books accurate and current.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.oceanvirtualassistant.com/contact-us" className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Book a Discovery Call
            </a>
            <a href="#pricing" className="bg-ocean-600 hover:bg-ocean-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all duration-200">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}