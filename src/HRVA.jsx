import React from 'react'
import { Briefcase, Users, FileText, CheckSquare, MessageCircle } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { hrFaqs } from './data/faqs'

export default function HRVA() {
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
    "name": "HR Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "HR virtual assistants for recruiting coordination, interview scheduling, onboarding, and people-ops support.",
    "offers": {"@type": "Offer", "price": "750", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/hr-virtual-assistant"
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
                HR Virtual Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                Free your HR team to focus on people—not paperwork. We coordinate recruiting pipelines, interviews, and onboarding while keeping records tidy.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="HR VA Hero Image"
                description="HR professionals managing recruiting, interviews, and onboarding processes. (1200x800px recommended)"
                imageSrc="/images/industries/hr-va-hero.webp"
                imageAlt="HR Virtual Assistant managing recruiting and onboarding"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your HR VA handles the coordination that keeps your people operations running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Briefcase, title: 'Recruiting', description: 'Job postings, resume screening, and candidate outreach' },
            { icon: Users, title: 'Interview Coordination', description: 'Interview scheduling and scorecard collection' },
            { icon: FileText, title: 'Background Checks', description: 'Background check coordination and references' },
            { icon: CheckSquare, title: 'Onboarding', description: 'Onboarding checklists, docs, and equipment coordination' },
            { icon: MessageCircle, title: 'HRIS & Communications', description: 'HRIS updates and staff communications' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="HR support that keeps your recruiting and people operations running smoothly." />

      <Pricing />

      <OutcomesSection 
        subtitle="Real results that improve your HR operations."
        outcomes={[
          { icon: '⚡', title: 'Faster Hiring', description: 'Faster time‑to‑interview and fewer no‑shows' },
          { icon: '📁', title: 'Clean Files', description: 'Clean, compliant files' },
          { icon: '⭐', title: 'Better Experience', description: 'Better candidate experience and manager satisfaction' }
        ]}
      />

      <BookingDemo id="booking" />

      <FAQSection faqs={hrFaqs} />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your HR Operations?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated HR VA who keeps your recruiting and people operations running smoothly.
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