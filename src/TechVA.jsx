import React from 'react'
import { Ticket, FileText, Globe, CheckCircle, Package } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { techFaqs } from './data/faqs'

export default function TechVA() {
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
    "name": "Tech Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Technical virtual assistants for ops coordination, documentation, QA checks, light website updates, and support triage.",
    "offers": {"@type": "Offer", "price": "750", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/tech-virtual-assistant"
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
                Tech Virtual Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                Give your technical teams a force‑multiplier. We handle coordination, documentation, support triage, and QA checks—so engineers can ship.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="Tech VA Hero Image"
                description="Technical team collaborating on projects, documentation, and support. (1200x800px recommended)"
                imageSrc="/images/industries/tech-va-hero.webp"
                imageAlt="Tech Virtual Assistant supporting engineering team"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your tech VA handles the coordination that keeps your technical operations running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Ticket, title: 'Support Triage', description: 'Ticket triage, prioritization, and stakeholder updates' },
            { icon: FileText, title: 'Documentation', description: 'Release notes, documentation, and knowledge base upkeep' },
            { icon: Globe, title: 'Content Updates', description: 'Light website/content updates in your CMS' },
            { icon: CheckCircle, title: 'QA Support', description: 'QA checklists, regression logs, and bug reproduction steps' },
            { icon: Package, title: 'Vendor Coordination', description: 'Vendor coordination, licensing, renewals, and asset tracking' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Technical support that keeps your engineering teams focused on shipping." />

      <Pricing />

      <OutcomesSection 
        subtitle="Real results that improve your technical operations."
        outcomes={[
          { icon: '🎯', title: 'Fewer Interruptions', description: 'Fewer interruptions for technical teams' },
          { icon: '📚', title: 'Clearer Documentation', description: 'Clearer documentation and faster onboarding' },
          { icon: '✨', title: 'Cleaner Backlogs', description: 'Cleaner backlogs and stakeholder communication' }
        ]}
      />

      <BookingDemo id="booking" />

      <FAQSection faqs={techFaqs} />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Empower Your Technical Teams?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated tech VA who handles coordination so your engineers can focus on shipping.
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