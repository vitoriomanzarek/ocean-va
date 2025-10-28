import React from 'react'
import { Check, Share2, FileText, Mail, Palette, BarChart3, Users, Globe, DollarSign, Shield } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { marketingFaqs } from './data/faqs'

export default function MarketingVA() {
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
    "name": "Marketing Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Marketing virtual assistants for content, social, email, basic design, and reporting with bilingual support.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/services/marketing-virtual-assistant"
  }

  return (
    <>
      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Marketing Virtual Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                Execute more campaigns without adding headcount. Your marketing VA supports content, social, email, and reporting—so your strategists can focus on growth.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="Marketing VA Hero Image"
                description="Marketing professionals collaborating on campaigns, social media, content creation with modern tools. (1200x800px recommended)"
                imageSrc="/images/industries/marketing-va-hero.webp"
                imageAlt="Marketing Virtual Assistant team managing campaigns"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your marketing VA handles execution so your team can focus on strategy and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Share2,
              title: 'Social Media',
              description: 'Social content scheduling and community responses'
            },
            {
              icon: FileText,
              title: 'Content & SEO',
              description: 'Blog drafting, repurposing, and on‑page updates (SEO‑friendly)'
            },
            {
              icon: Mail,
              title: 'Email Marketing',
              description: 'Email builds, lists, segmentation, and QA'
            },
            {
              icon: Palette,
              title: 'Creative & Web',
              description: 'Basic creative in Canva/Figma; landing page updates in your CMS'
            },
            {
              icon: BarChart3,
              title: 'Reporting',
              description: 'Reporting snapshots (traffic, leads, pipeline proxies)'
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

      <WhyOceanSection subtitle="Marketing support that aligns with your brand and executes consistently." />

      <Pricing />

      <OutcomesSection 
        subtitle="Amplify your marketing output without expanding your team."
        outcomes={[
          {
            icon: '📈',
            title: 'More Output',
            description: 'More output from your existing strategy'
          },
          {
            icon: '✅',
            title: 'On-Time Execution',
            description: 'Cleaner, on‑time campaign execution'
          },
          {
            icon: '📊',
            title: 'Consistent Reporting',
            description: 'Consistent reporting and insight loops'
          }
        ]}
      />

      {/* Booking Demo */}
      <BookingDemo id="booking" />

      <HowItWorksSection 
        subtitle="Get your marketing VA integrated and executing quickly."
        steps={[
          {
            step: '1',
            title: 'Brief',
            description: 'Share your marketing goals, channels, and current workflows'
          },
          {
            step: '2',
            title: 'Candidate Shortlist',
            description: 'We present marketing-savvy candidates matched to your needs'
          },
          {
            step: '3',
            title: 'Interview',
            description: 'You select the VA who fits your brand and style'
          },
          {
            step: '4',
            title: 'Access & Style Guide',
            description: 'Onboard to your tools, brand guidelines, and content calendar'
          },
          {
            step: '5',
            title: 'Weekly/Monthly Plan',
            description: 'Ongoing execution with regular check-ins and QA'
          }
        ]}
      />

      <FAQSection faqs={marketingFaqs} />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Scale Your Marketing?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated marketing VA who executes your campaigns consistently and professionally.
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