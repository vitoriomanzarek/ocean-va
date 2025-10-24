import React from 'react'
import { Package, ShoppingCart, MessageSquare, Image, BarChart3 } from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import HowItWorksSection from './components/HowItWorksSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'

export default function EcommerceVA() {
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
    "name": "Ecommerce Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Ecommerce virtual assistants for listings, order ops, returns, support, and catalog QA across major platforms.",
    "offers": {"@type": "Offer", "price": "1300", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/ecommerce-virtual-assistant"
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ecommerce Virtual Assistant
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Keep your store fast and accurate. We handle listings, order ops, returns, support, and catalog QA across your platforms.
            </p>
            <HeroCTAs />
          </div>
        </div>
      </section>

      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your ecommerce VA keeps your store running smoothly across all platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Package, title: 'Product Listings', description: 'Product listings, variations, and merchandising updates' },
            { icon: ShoppingCart, title: 'Order Operations', description: 'Order status, returns/exchanges, and RMA coordination' },
            { icon: MessageSquare, title: 'Marketplace Support', description: 'Marketplace messaging (Amazon/eBay/etc.) and store chat/email' },
            { icon: Image, title: 'Catalog QA', description: 'Catalog QA—images, attributes, tags, and redirects' },
            { icon: BarChart3, title: 'Ads & Promos', description: 'Basic ads/reporting support and promo updates' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyOceanSection subtitle="Ecommerce expertise that scales with your store." />

      <OutcomesSection 
        subtitle="Measurable improvements in your ecommerce operations."
        outcomes={[
          { icon: '✓', title: 'Fewer Errors', description: 'Fewer catalog/order errors' },
          { icon: '⭐', title: 'Higher Reviews', description: 'Faster responses and higher reviews' },
          { icon: '🚀', title: 'Reliable Execution', description: 'Reliable promo and merchandising execution' }
        ]}
      />

      <Pricing />

      <FAQ />

      <BookingDemo id="booking" />

      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Scale Your Ecommerce Store?</h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started today with a dedicated ecommerce VA who keeps your operations running smoothly.
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