import React from 'react'
import HeroHome from './components/HeroHome'
import ClientLogos from './components/ClientLogos'
import Stats from './components/Stats'
import ComparisonTable from './components/ComparisonTable'
import Timeline from './components/Timeline'
import Pricing from './components/Pricing'
import VAShowcase from './components/VAShowcase'
import ServicesIndustriesShowcase from './components/ServicesIndustriesShowcase'
import Testimonials from './components/Testimonials'
import BookingDemo from './components/BookingDemo'
import FAQMini from './components/FAQMini'
import ServicesGrid from './components/ServicesGrid'
import MediaGallery from './components/MediaGallery'

export default function Home() {
  return (
    <>
      <HeroHome />
      <Stats />
      <ClientLogos />
      <MediaGallery />
      <ComparisonTable />
      <ServicesIndustriesShowcase />
      <Timeline />
      <Pricing />
      <BookingDemo />
      <VAShowcase />
      <Testimonials />
      <FAQMini />
      <ServicesGrid />
      
      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to save ON TIME & up to 70% on costs?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Get started with Ocean Virtual Assistant today and transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.oceanvirtualassistant.com/contact-us" 
              className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book a Free Call
            </a>
            <a 
              href="#pricing" 
              className="bg-ocean-600 hover:bg-ocean-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all duration-200"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}