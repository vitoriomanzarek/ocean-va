import React from 'react'
import { Search, List, Calendar, Database, BarChart3 } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'

export default function SDRVA() {
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
    "name": "SDR Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Sales development support for research, sequencing, CRM hygiene, and meeting scheduling.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/services/sdr-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              SDR Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Give reps clean lists, clear next steps, and more booked meetings. Your SDR VA powers research, sequencing, and follow‑ups across your tools.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your SDR VA handles the research and execution that fills your pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Search,
              title: 'Research & Lists',
              description: 'ICP research, list building, and light enrichment'
            },
            {
              icon: List,
              title: 'Sequencing',
              description: 'Sequence setup, QA, and daily task queues (email, social, phone)'
            },
            {
              icon: Calendar,
              title: 'Calendar Coordination',
              description: 'Calendar coordination and reschedules'
            },
            {
              icon: Database,
              title: 'CRM Hygiene',
              description: 'CRM/contact hygiene and stage updates'
            },
            {
              icon: BarChart3,
              title: 'Reporting',
              description: 'Call notes, snippets, and weekly activity reports'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Sales development support that accelerates your pipeline." />

      <OutcomesSection 
        subtitle="More meetings, better data, and higher conversion rates."
        outcomes={[
          {
            icon: '🎯',
            title: 'More Quality At‑Bats',
            description: 'More quality at‑bats for sellers'
          },
          {
            icon: '📈',
            title: 'Higher Reply Rates',
            description: 'Higher reply and show rates from consistent execution'
          },
          {
            icon: '📊',
            title: 'Cleaner Data',
            description: 'Cleaner data for forecasting'
          }
        ]}
      />

      <HowItWorksSection 
        subtitle="Get your SDR VA integrated and executing quickly."
        steps={[
          { step: '1', title: 'Define ICP & Cadences', description: 'Share your ideal customer profile and outreach sequences' },
          { step: '2', title: 'Shortlist', description: 'We present SDR-experienced candidates' },
          { step: '3', title: 'Interview', description: 'You select the VA who fits your sales motion' },
          { step: '4', title: 'Playbooks & Access', description: 'Onboard to your tools, lists, and messaging frameworks' },
          { step: '5', title: 'Weekly Standups & QA', description: 'Ongoing execution with regular check-ins and optimization' }
        ]}
      />

      <Pricing />
      <FAQ />
      <BookingDemo id="booking" />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Fill Your Pipeline?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated SDR VA who powers your outreach and books more meetings.
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