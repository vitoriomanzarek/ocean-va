import React from 'react'
import { Check, Calendar, Mail, FileText, Plane, Users, DollarSign, Shield, Globe } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { adminAssistantFaqs } from './data/faqs'

export default function VirtualAdminAssistant() {
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
    "name": "Virtual Administrative Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Dedicated virtual administrative assistant for inbox, calendar, documents, travel, research, and operations.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/services/virtual-administrative-assistant"
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
              Hire a Virtual Administrative Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              A dedicated admin who keeps your inbox, calendar, documents, and day‑to‑day operations moving—without the overhead of a full‑time, in‑office hire.
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
            Your virtual administrative assistant handles the daily tasks that keep your business running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Mail,
              title: 'Inbox & Communication',
              description: 'Inbox triage, follow‑ups, and scheduling'
            },
            {
              icon: Calendar,
              title: 'Calendar Management',
              description: 'Calendar management, meeting prep, and note‑taking'
            },
            {
              icon: FileText,
              title: 'Document Management',
              description: 'Document creation, formatting, and version control'
            },
            {
              icon: Plane,
              title: 'Travel Coordination',
              description: 'Travel research and bookings'
            },
            {
              icon: Users,
              title: 'Vendor Coordination',
              description: 'Vendor coordination, forms, and compliance to‑dos'
            },
            {
              icon: DollarSign,
              title: 'Bookkeeping Support',
              description: 'Light bookkeeping support (AR/AP), expense reports, and data entry'
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

      <WhyOceanSection subtitle="More than just a service—a dedicated teammate who understands your business." />

      <Pricing />

      <OutcomesSection 
        subtitle="Real results that transform how you work every day."
        outcomes={[
          {
            icon: '✓',
            title: 'Fewer Missed Messages',
            description: 'Stay on top of deadlines and communications'
          },
          {
            icon: '⏰',
            title: 'More Time on Priorities',
            description: 'Focus on what matters—not admin tasks'
          },
          {
            icon: '📁',
            title: 'Clean, Searchable Docs',
            description: 'Organized processes and documentation'
          }
        ]}
      />

      {/* Booking Demo */}
      <BookingDemo id="booking" />

      <HowItWorksSection 
        subtitle="A simple, proven process to get your virtual assistant up and running."
        steps={[
          {
            step: '1',
            title: 'Define Outcomes & Tasks',
            description: 'We discuss your recurring tasks and desired outcomes'
          },
          {
            step: '2',
            title: 'Candidate Shortlist',
            description: 'We present qualified candidates matched to your needs'
          },
          {
            step: '3',
            title: 'Interviews & Selection',
            description: 'You interview and select your ideal virtual assistant'
          },
          {
            step: '4',
            title: 'Onboarding & Setup',
            description: 'SOPs, tool access, and training to ensure smooth integration'
          },
          {
            step: '5',
            title: 'Ongoing Support & QA',
            description: 'Continuous quality assurance and support from our team'
          }
        ]}
      />

      <FAQSection faqs={adminAssistantFaqs} />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Hire Your Virtual Administrative Assistant?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with transparent pricing, no setup fees, and a dedicated teammate who keeps your operations running smoothly.
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