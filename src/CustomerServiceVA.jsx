import React from 'react'
import { Phone, MessageSquare, Mail, AlertCircle, BarChart3 } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'

export default function CustomerServiceVA() {
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
    "name": "Customer Service Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Dedicated customer service assistants for phone, chat, and email, including bilingual English–Spanish support.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/services/customer-service-virtual-assistant"
  }

  return (
    <>
      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Customer Service Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Delight customers with fast, consistent responses. We handle phone, chat, and email queues, escalate when needed, and log everything into your CRM.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your customer service VA provides responsive, professional support across all channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Phone,
              title: 'Phone Coverage',
              description: 'Phone coverage, call notes, and ticket creation'
            },
            {
              icon: MessageSquare,
              title: 'Live Chat & Email',
              description: 'Live chat and email responses with SLA targets'
            },
            {
              icon: Mail,
              title: 'Order & Billing Support',
              description: 'Order status, billing questions, appointment booking'
            },
            {
              icon: AlertCircle,
              title: 'Escalations',
              description: 'Escalations and handoffs per your playbooks'
            },
            {
              icon: BarChart3,
              title: 'QA & Reporting',
              description: 'QA checks, CSAT/NPS follow‑ups, and reporting'
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

      <WhyOceanSection subtitle="Professional customer service support that represents your brand perfectly." />

      <OutcomesSection 
        subtitle="Measurable improvements in customer satisfaction and team efficiency."
        outcomes={[
          {
            icon: '⚡',
            title: 'Faster Response Times',
            description: 'Faster first‑response and resolution times'
          },
          {
            icon: '😊',
            title: 'Higher CSAT',
            description: 'Higher CSAT from consistent follow‑through'
          },
          {
            icon: '🎯',
            title: 'More Focus Time',
            description: 'More focus time for your internal team'
          }
        ]}
      />

      <HowItWorksSection 
        subtitle="A streamlined process to get your customer service VA up and running."
        steps={[
          {
            step: '1',
            title: 'Define Channels',
            description: 'Identify which channels (phone, chat, email) and support scope'
          },
          {
            step: '2',
            title: 'Candidate Shortlist',
            description: 'We present qualified customer service professionals'
          },
          {
            step: '3',
            title: 'Interview',
            description: 'You interview and select your ideal CSR'
          },
          {
            step: '4',
            title: 'Onboard Scripts & Tools',
            description: 'Training on your helpdesk, scripts, and escalation procedures'
          },
          {
            step: '5',
            title: 'QA & Reporting',
            description: 'Ongoing quality assurance and performance reporting'
          }
        ]}
      />

      <Pricing />

      <FAQ />

      {/* Booking Demo */}
      <BookingDemo id="booking" />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Customer Service?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with transparent pricing, no setup fees, and a dedicated customer service professional who represents your brand with excellence.
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