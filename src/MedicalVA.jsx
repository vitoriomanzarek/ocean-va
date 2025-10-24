import React from 'react'
import { UserPlus, Calendar, FileCheck, DollarSign, MessageSquare } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'

export default function MedicalVA() {
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
    "name": "Medical Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Medical virtual assistants for patient intake, scheduling, eligibility checks, billing follow-ups, and patient support.",
    "offers": {"@type": "Offer", "price": "750", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/medical-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Medical Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Give patients timely, accurate help. Your medical VA supports intake, scheduling, eligibility checks, and follow‑ups—so providers can focus on care.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your medical VA handles the tasks that keep your practice running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: UserPlus, title: 'Patient Intake', description: 'New patient intake and records requests' },
            { icon: Calendar, title: 'Scheduling', description: 'Scheduling, reminders, and waitlist management' },
            { icon: FileCheck, title: 'Eligibility Checks', description: 'Insurance eligibility/benefit checks and prior auth coordination' },
            { icon: DollarSign, title: 'Billing Support', description: 'Billing questions and follow‑ups; payment plan reminders' },
            { icon: MessageSquare, title: 'Patient Outreach', description: 'Portal messages and post‑visit outreach per your scripts' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Healthcare support that keeps patients informed and providers focused on care." />

      <OutcomesSection 
        subtitle="Real results that improve your practice operations."
        outcomes={[
          { icon: '⏱️', title: 'Faster Access', description: 'Faster access and fewer no‑shows' },
          { icon: '✅', title: 'Cleaner Eligibility', description: 'Cleaner eligibility and fewer billing surprises' },
          { icon: '😊', title: 'Happier Patients', description: 'Happier patients through timely responses' }
        ]}
      />

      <Pricing />

      <FAQ />

      <BookingDemo id="booking" />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Improve Your Practice Operations?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated medical VA who keeps your practice running smoothly and patients happy.
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