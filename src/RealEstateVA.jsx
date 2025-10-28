import React from 'react'
import { Home, Users, FileText, Calendar, MessageSquare, BarChart3 } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { realEstateFaqs } from './data/faqs'

export default function RealEstateVA() {
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
    "name": "Real Estate Virtual Assistant",
    "serviceType": "Real Estate Administrative & Transaction Support",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "availableLanguage": ["English", "Spanish"],
    "description": "Real estate virtual assistant for lead management, listing coordination, transaction support, and property management.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "750-1300",
      "description": "20h or 40h/week plans"
    }
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
                Real Estate Virtual Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                From lead intake to closing day, your REVA keeps deals moving and clients delighted—while you focus on showings and negotiations.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="Real Estate VA Hero Image"
                description="Professional real estate agents/team working with property listings, showing productivity and teamwork in real estate context. (1200x800px recommended)"
                imageSrc="/images/Industries/real-estate-va-hero.webp"
                imageAlt="Real Estate Virtual Assistant team collaborating on property deals"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Built for Real Estate */}
      <section className="section-container bg-white py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Built for Agents, Teams & Property Managers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Lead capture, speed-to-lead & nurturing',
              'Listing coordination & MLS updates',
              'Showings scheduling & feedback collection',
              'Offer packets, disclosures & compliance checklists',
              'Transaction coordination with lenders, title & escrow',
              'Tenant screening, renewals & maintenance tickets (for PMs)',
              'Bilingual client comms (EN/ES) via phone, SMS, email, chat',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-to-day Tasks */}
      <section className="section-container bg-gray-50 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Day-to-Day Tasks We Handle</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your REVA manages the operational details so you can focus on relationships and closings.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-ocean-700 mb-4">Lead & Marketing</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Speed-to-lead calling/texting within minutes</li>
                <li>✓ Buyer/seller intake & pre-qualification</li>
                <li>✓ Drip campaigns & nurture sequences</li>
                <li>✓ Open house follow-up & review requests</li>
                <li>✓ Social posting & DM responses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ocean-700 mb-4">Listings & Showings</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ MLS data entry, photos, remarks</li>
                <li>✓ Lockbox codes & showing windows</li>
                <li>✓ Feedback surveys & weekly seller reports</li>
                <li>✓ Showing coordination & confirmations</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-ocean-700 mb-4">Transactions</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Offer templates & e-sign packets</li>
                <li>✓ Dates & deadlines management</li>
                <li>✓ Contingency tracking</li>
                <li>✓ Coordination with lender/title/HOA</li>
                <li>✓ CD/ALTA milestone reminders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ocean-700 mb-4">Property Management (Optional)</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Tenant inquiries & application screening</li>
                <li>✓ Lease prep & onboarding</li>
                <li>✓ Renewal notices</li>
                <li>✓ Work orders & vendor dispatch</li>
                <li>✓ Resident updates & follow-ups</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-container bg-white py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Real Estate Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We know real estate workflows, tools, and compliance inside and out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Home, title: 'Lead Management', description: 'Speed-to-lead, qualification, CRM logging, and drip campaigns' },
            { icon: FileText, title: 'Transaction Docs', description: 'E-sign coordination, offer packets, compliance checklists' },
            { icon: Calendar, title: 'Showing Coordination', description: 'Schedule showings, collect feedback, weekly seller reports' },
            { icon: Users, title: 'Stakeholder Comms', description: 'Coordinate with lenders, title, escrow, HOA, and tenants' },
            { icon: MessageSquare, title: 'Bilingual Support', description: 'English & Spanish for calls, emails, SMS, and chat' },
            { icon: BarChart3, title: 'Pipeline & Reporting', description: 'Weekly summaries, KPI tracking, and performance dashboards' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing />

      <WhyOceanSection subtitle="Real estate expertise that keeps deals moving and clients delighted." />

      <OutcomesSection 
        subtitle="Real results that transform your real estate business."
        outcomes={[
          {
            icon: '⚡',
            title: 'Faster Lead Response',
            description: 'Speed-to-lead within minutes → higher conversion'
          },
          {
            icon: '📋',
            title: 'Smoother Closings',
            description: 'Fewer admin bottlenecks → zero missed deadlines'
          },
          {
            icon: '😊',
            title: 'Happier Clients',
            description: 'Proactive updates → more referrals & repeat business'
          }
        ]}
      />

      <HowItWorksSection 
        subtitle="Get your REVA integrated and executing quickly."
        steps={[
          {
            step: '1',
            title: 'Intake & Playbook',
            description: 'Share your transaction process, forms, vendor contacts, and CRM workflows'
          },
          {
            step: '2',
            title: 'Candidate Shortlist',
            description: 'We present real estate-experienced candidates matched to your needs'
          },
          {
            step: '3',
            title: 'Interview & Selection',
            description: 'You select the REVA who fits your team and market'
          },
          {
            step: '4',
            title: 'Onboarding (2–3 Days)',
            description: 'Connect CRM, MLS, calendar, e-sign tools, and validate workflows'
          },
          {
            step: '5',
            title: 'Go Live & Optimize',
            description: 'Weekly pipeline reviews, SLA tracking, and performance optimization'
          }
        ]}
      />

      {/* Booking Demo */}
      <BookingDemo id="booking" />

      {/* CRMs & Platforms */}
      <section className="section-container bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">CRMs & Platforms We Use</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">Real Estate CRM</h4>
              <p className="text-gray-600 text-sm">kvCORE, Follow Up Boss, BoomTown, Chime, LionDesk, Sierra, RealtyJuggernaut</p>
            </div>
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">Transaction & E-Sign</h4>
              <p className="text-gray-600 text-sm">Dotloop, DocuSign, Skyslope, ShowingTime</p>
            </div>
            <div>
              <h4 className="font-bold text-ocean-700 mb-3">Property Management</h4>
              <p className="text-gray-600 text-sm">AppFolio, Buildium, Yardi</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={realEstateFaqs} />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Stop Juggling Paperwork and Pings
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated REVA who keeps deals moving and clients delighted.
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

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-ocean-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}
