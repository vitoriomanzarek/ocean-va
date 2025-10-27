import React from 'react'
import { Check, FileCheck, Edit3, Home, Calendar, ClipboardList, Users, Globe, DollarSign, Shield } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { transactionCoordinatorFaqs } from './data/faqs'

export default function VirtualTransactionCoordinator() {
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
    "name": "Virtual Transaction Coordinator (Real Estate)",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Contract-to-close coordination: checklists, signatures, vendor coordination, contingency tracking, and status updates.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/services/virtual-transaction-coordinator"
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
              Virtual Transaction Coordinator (Real Estate)
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Contract‑to‑close without the scramble. We handle checklists, docs, signatures, vendor coordination, and reminders—so agents and teams never miss a milestone.
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
            Your transaction coordinator keeps every deal on track from contract to close.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: FileCheck,
              title: 'File Setup',
              description: 'Open file, verify contract terms, and create checklists'
            },
            {
              icon: Edit3,
              title: 'Signatures & Disclosures',
              description: 'Coordinate signatures and disclosures (DocuSign, Dotloop, etc.)'
            },
            {
              icon: Home,
              title: 'Vendor Coordination',
              description: 'Order inspections, appraisals, title/escrow, and HOA docs'
            },
            {
              icon: Calendar,
              title: 'Deadline Tracking',
              description: 'Track contingencies and dates; send reminders to all parties'
            },
            {
              icon: ClipboardList,
              title: 'Status Updates',
              description: 'Update MLS/CRM and deliver weekly status summaries'
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

      <WhyOceanSection subtitle="Real estate transaction expertise that keeps deals moving smoothly." />

      <OutcomesSection 
        subtitle="Smoother transactions and happier clients from start to finish."
        outcomes={[
          {
            icon: '✓',
            title: 'Fewer Missed Deadlines',
            description: 'Fewer missed deadlines and clean audits'
          },
          {
            icon: '😊',
            title: 'Better Client Experience',
            description: 'Better client experience with proactive communication'
          },
          {
            icon: '🏆',
            title: 'More Deals Closed',
            description: 'More deals closed with less chaos'
          }
        ]}
      />

      <HowItWorksSection 
        subtitle="Get your transaction coordinator integrated into your workflow quickly."
        steps={[
          {
            step: '1',
            title: 'Intake',
            description: 'Share your transaction process, forms, and vendor contacts'
          },
          {
            step: '2',
            title: 'Shortlist',
            description: 'We present real estate-experienced candidates'
          },
          {
            step: '3',
            title: 'Interview',
            description: 'You select the coordinator who fits your team'
          },
          {
            step: '4',
            title: 'SOPs & Templates',
            description: 'Onboard to your systems, checklists, and compliance requirements'
          },
          {
            step: '5',
            title: 'Live Files with QA',
            description: 'Start coordinating transactions with ongoing quality assurance'
          }
        ]}
      />

      <Pricing />

      <FAQSection faqs={transactionCoordinatorFaqs} />

      {/* Booking Demo */}
      <BookingDemo id="booking" />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Streamline Your Transactions?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated transaction coordinator who keeps your deals on track from contract to close.
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