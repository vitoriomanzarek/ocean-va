import React from 'react'
import { FileText, Users, Database, Calendar, BarChart3 } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { mortgageFaqs } from './data/faqs'

export default function MortgageVA() {
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
    "name": "Mortgage Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Mortgage virtual assistants for loan file setup, document collection, LOS updates, partner coordination, and pipeline status.",
    "offers": {"@type": "Offer", "price": "750", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/mortgage-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Mortgage Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Keep files moving and borrowers informed. Your mortgage VA supports doc collection, LOS updates, status calls, and milestone reminders.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your mortgage VA handles the coordination that keeps your loan pipeline moving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: FileText, title: 'Loan File Setup', description: 'Loan file setup and doc checklists' },
            { icon: Users, title: 'Document Collection', description: 'Borrower and partner outreach for missing docs' },
            { icon: Database, title: 'LOS Updates', description: 'LOS updates and conditions tracking' },
            { icon: Calendar, title: 'Status Communications', description: 'Status calls/emails and calendar coordination' },
            { icon: BarChart3, title: 'Pipeline Summaries', description: 'Weekly pipeline summaries for LO/processor teams' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Mortgage support that keeps your loan pipeline moving and borrowers informed." />

      <OutcomesSection 
        subtitle="Real results that improve your mortgage operations."
        outcomes={[
          { icon: '📋', title: 'Fewer Stalled Files', description: 'Fewer stalled files and clearer status' },
          { icon: '😊', title: 'Better Experience', description: 'Better borrower experience' },
          { icon: '💼', title: 'More Time to Originate', description: 'More time for loan officers to originate' }
        ]}
      />

      <Pricing />

      <FAQSection faqs={mortgageFaqs} />

      <BookingDemo id="booking" />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your Loan Pipeline?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated mortgage VA who keeps your files moving and borrowers informed.
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