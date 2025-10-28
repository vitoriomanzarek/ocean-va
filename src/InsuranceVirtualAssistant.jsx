import React from 'react'
import Hero from './components/Hero'
import ClientLogos from './components/ClientLogos'
import Challenges from './components/Challenges'
import WhyOceanVA from './components/WhyOceanVA'
import StatsSection from './components/StatsSection'
import ComparisonTable from './components/ComparisonTable'
import Pricing from './components/Pricing'
import TestimonialsFeatured from './components/TestimonialsFeatured'
import BookingDemo from './components/BookingDemo'
import VAShowcase from './components/VAShowcase'
import Timeline from './components/Timeline'
import ToolExpertise from './components/ToolExpertise'
import GoogleReviews from './components/GoogleReviews'
import FAQSection from './components/FAQSection'
import { insuranceVAFaqs } from './data/faqs'

function InsuranceVirtualAssistant() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <ClientLogos />
        <Challenges />
        
        {/* Combined Section: What Our VAs Handle */}
        <section id="what-va-does" className="section-container bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              What Our Experienced Insurance VAs Handle
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Ocean VAs integrate seamlessly into your existing operations—handling time-consuming 
              administrative tasks so your licensed agents can focus on sales, complex underwriting, 
              and high-value client relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: '📋',
                title: 'Policy Servicing & Admin',
                subtitle: 'Free your agents from paperwork',
                tasks: [
                  'COIs & Certificates of Insurance',
                  'Policy endorsements & changes',
                  'Renewal processing & follow-up',
                  'Mortgagee changes & updates',
                  'Loss runs & claims documentation',
                  'Data entry in AMS systems'
                ]
              },
              {
                icon: '📞',
                title: 'Customer Service & Communication',
                subtitle: 'Keep clients happy and informed',
                tasks: [
                  'Inbound call handling',
                  'Email management & responses',
                  'Policy questions & inquiries',
                  'Payment processing & follow-up',
                  'Appointment scheduling',
                  'Client status updates'
                ]
              },
              {
                icon: '💼',
                title: 'Back Office & Operations',
                subtitle: 'Streamline your daily operations',
                tasks: [
                  'AMS data entry (Applied/AMS360/EZLynx)',
                  'Document management & filing',
                  'Accounting tasks & reconciliation',
                  'Monthly/quarterly reporting',
                  'CRM updates & maintenance',
                  'Database cleanup & organization'
                ]
              },
              {
                icon: '🌐',
                title: 'Multilingual Support & Growth',
                subtitle: 'Scale without limits',
                tasks: [
                  '10+ languages including English & Spanish',
                  'Serve diverse client base',
                  'Flex capacity for renewal season',
                  'Scale up/down as needed',
                  'No overhead or office space',
                  'Add VAs during growth phases'
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-ocean-700 mb-1">{category.title}</h3>
                <p className="text-sm text-gray-600 italic mb-4">{category.subtitle}</p>
                <ul className="space-y-2">
                  {category.tasks.map((task, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-ocean-500 mr-2 flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* The Result Section */}
          <div className="bg-ocean-600 text-white p-8 rounded-xl max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-3xl font-bold mb-3">
                The Result: Your Licensed Agents Focus on What Matters Most
              </h3>
              <p className="text-ocean-100 text-lg">
                While Ocean VAs handle the administrative heavy lifting, your licensed agents can focus on:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                'Sales and new business development',
                'Complex underwriting decisions',
                'High-value client relationships',
                'Strategic agency growth'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <span className="text-2xl mr-3">→</span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3️⃣ DESARROLLO Y PERSUASIÓN */}
        <WhyOceanVA />
        <StatsSection />
        <BookingDemo />
        <ComparisonTable />
        <Pricing />

        {/* 4️⃣ GENERACIÓN DE CONFIANZA */}
        <TestimonialsFeatured />
        <VAShowcase />

        {/* 5️⃣ REFUERZO DE LA OFERTA */}
        <Timeline />
        <ToolExpertise />
        <GoogleReviews />

        {/* 6️⃣ CIERRE Y CONVERSIÓN FINAL */}
        <FAQSection faqs={insuranceVAFaqs} />

        {/* Final CTA Section */}
        <section className="section-container bg-ocean-700 text-white">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Launch Your Insurance Virtual Assistant in 2-3 Days?
            </h2>
            <p className="text-xl mb-8 text-ocean-100">
              No startup fees. Transparent pricing. Experienced insurance professionals. Bilingual support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#booking" 
                onClick={(e) => handleScroll(e, 'booking')}
                className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Book a Free Call
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
      </main>
    </>
  )
}

export default InsuranceVirtualAssistant
