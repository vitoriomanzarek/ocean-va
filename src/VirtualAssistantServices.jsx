import React from 'react'
import { Mail, Phone, Share2, TrendingUp, Database } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { generalVAFaqs } from './data/faqs'

export default function VirtualAssistantServices() {
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
    "name": "Virtual Assistant Services",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Dedicated virtual assistant services for admin, support, marketing, sales, and operations with bilingual availability.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/services/virtual-assistant-services"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Virtual Assistant Services
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                One partner, many use cases. Hire a dedicated VA to cover admin, customer service, marketing, sales support, and operations—matched to your tools and SOPs.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="VA Services Hero Image"
                description="Diverse virtual assistant team providing various services (admin, customer service, marketing, sales). (1200x800px recommended)"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your virtual assistant handles diverse tasks across your business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Mail, title: 'Admin', description: 'Inbox, calendar, docs, travel, research' },
            { icon: Phone, title: 'Support', description: 'Phone/chat/email, ticketing, appointment booking' },
            { icon: Share2, title: 'Marketing', description: 'Social, email, content updates, reporting' },
            { icon: TrendingUp, title: 'Sales Support', description: 'List building, sequencing, CRM hygiene' },
            { icon: Database, title: 'Operations', description: 'Data entry, vendor coordination, light AR/AP' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Flexible, dedicated support that scales with your business." />

      <Pricing />

      <OutcomesSection 
        subtitle="Real business impact from dedicated virtual assistant support."
        outcomes={[
          { icon: '💰', title: 'Lower Overhead', description: 'Lower overhead with higher output' },
          { icon: '✅', title: 'Cleaner Systems', description: 'Cleaner systems and fewer dropped balls' },
          { icon: '🚀', title: 'More Capacity', description: "Capacity for projects you've postponed" }
        ]}
      />

      <BookingDemo id="booking" />

      <HowItWorksSection 
        subtitle="A proven process to get your virtual assistant integrated quickly."
        steps={[
          { step: '1', title: 'Discovery', description: 'Share your needs, tools, and desired outcomes' },
          { step: '2', title: 'Shortlist', description: 'We present qualified candidates matched to your requirements' },
          { step: '3', title: 'Interviews', description: 'You select the perfect fit for your team' },
          { step: '4', title: 'Onboarding to Tools/SOPs', description: 'Training on your systems and processes' },
          { step: '5', title: 'Ongoing Support/QA', description: 'Continuous quality assurance and optimization' }
        ]}
      />

      <FAQSection faqs={generalVAFaqs} />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Hire Your Virtual Assistant?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated VA who handles your business operations professionally and efficiently.
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