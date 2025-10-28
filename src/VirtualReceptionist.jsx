import React from 'react'
import { Phone, MessageSquare, Calendar, Users, BarChart3, CheckCircle } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { virtualReceptionistFaqs } from './data/faqs'

export default function VirtualReceptionist() {
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
    "name": "Virtual Receptionist",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "availableLanguage": ["English", "Spanish"],
    "description": "Virtual receptionist services for live call answering, appointment booking, lead qualification, and 24/7 coverage with bilingual support.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "750-1300",
      "description": "20h or 40h/week plans"
    },
    "serviceType": "Virtual Receptionist Services"
  }


  return (
    <>
      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Virtual Receptionist
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                Never miss a call or lead. Your virtual receptionist answers 24/7, books appointments, qualifies leads, and keeps your team informed—all with a personal touch.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="Virtual Receptionist Hero Image"
                description="Professional receptionist answering calls, booking appointments, and greeting clients. (1200x800px recommended)"
                imageSrc="/images/services/virtual-receptionist-hero.webp"
                imageAlt="Virtual Receptionist answering calls and booking appointments"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Above-the-fold bullets */}
      <section className="section-container bg-white py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌍', title: 'Bilingual Reception', desc: 'English/Spanish support for all your customers' },
              { icon: '⚡', title: '2–3 Day Start', desc: 'No startup fees, fast onboarding' },
              { icon: '⭐', title: 'Top 1% Talent', desc: '30-day training in real operations' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-ocean-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Outcome */}
      <section className="section-container bg-gradient-to-br from-ocean-50 to-white py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">❌ The Problem</h3>
              <p className="text-gray-700 leading-relaxed">
                When calls go to voicemail, you lose deals and trust. Leads get frustrated, callbacks take hours, and your pipeline suffers while you're stuck managing the phones.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">✅ The Outcome</h3>
              <p className="text-gray-700 leading-relaxed">
                Our receptionists pick up live, greet on-brand, route smartly, and book appointments. Your pipeline goes up, NPS improves, and you focus on what matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-container bg-white py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Your Virtual Receptionist Will Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional front-desk support that scales with your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Phone, title: 'Live Call Answering', description: 'Answer calls within 3 rings, manage callbacks, route intelligently' },
            { icon: Users, title: 'Lead Intake & CRM Logging', description: 'Capture new leads, qualify, and log in HubSpot, Salesforce, Zoho, Pipedrive' },
            { icon: Calendar, title: 'Calendar & Appointment Booking', description: 'Manage Google/Outlook/Calendly, schedule appointments, send confirmations' },
            { icon: MessageSquare, title: 'Chat & Email Triage', description: 'Handle website chat, shared inbox, WhatsApp Business, email responses' },
            { icon: CheckCircle, title: 'Warm Transfers & Routing', description: 'Route calls to the right person, escalate priority issues, handle after-hours' },
            { icon: BarChart3, title: 'FAQ & Policy Guidance', description: 'Answer common questions, provide pricing info, handle billing lookups' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Professional reception support that represents your brand and delights customers." />

      <Pricing />

      <OutcomesSection 
        subtitle="Measurable improvements in lead capture and customer satisfaction."
        outcomes={[
          {
            icon: '📞',
            title: 'Zero Missed Calls',
            description: '95%+ call capture with < 3 rings to answer'
          },
          {
            icon: '📅',
            title: 'More Booked Appointments',
            description: '90% scheduling compliance and automated confirmations'
          },
          {
            icon: '😊',
            title: 'Higher NPS',
            description: 'Professional, bilingual support that delights customers'
          }
        ]}
      />

      {/* Booking Demo */}
      <BookingDemo id="booking" />

      <HowItWorksSection 
        subtitle="Get your virtual receptionist live in 2–3 business days."
        steps={[
          {
            step: '1',
            title: 'Discovery & Scripts',
            description: 'Map greetings, IVR flows, FAQs, and escalation rules'
          },
          {
            step: '2',
            title: 'Onboarding (2–3 Days)',
            description: 'Connect phone numbers, inboxes, calendars, and CRM'
          },
          {
            step: '3',
            title: 'Go Live',
            description: 'Soft launch with monitoring and daily feedback loops'
          },
          {
            step: '4',
            title: 'Optimize',
            description: 'Weekly call review, KPI dashboard, and script refinements'
          }
        ]}
      />

      {/* Tools & Integrations */}
      <section className="section-container bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Tools We Handle</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">Phone & Communication</h4>
              <p className="text-gray-600">RingCentral, 8x8, Aircall, Grasshopper, Zoom Phone</p>
            </div>
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">Calendar & Scheduling</h4>
              <p className="text-gray-600">Google Calendar, Outlook, Calendly</p>
            </div>
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">CRM & Lead Management</h4>
              <p className="text-gray-600">HubSpot, Salesforce, Zoho, Pipedrive</p>
            </div>
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">Chat & Support</h4>
              <p className="text-gray-600">Intercom, Drift, Zendesk, Front, Slack/Teams</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={virtualReceptionistFaqs} />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Stop Missing Calls?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated virtual receptionist who answers, qualifies, and books—so you grow.
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
