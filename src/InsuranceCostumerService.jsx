import React from 'react'
import BookingDemo from './components/BookingDemo'
import FAQSection from './components/FAQSection'
import Pricing from './components/Pricing'
import HeroPlaceholder from './components/HeroPlaceholder'
import { insuranceCsrFaqs } from './data/faqs'

function InsuranceCostumerService() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-600 to-ocean-700 text-white py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Elevate Your Customer Experience
              </h1>
              <p className="text-xl text-ocean-100 mb-8 leading-relaxed">
                Save up to 70% on staffing costs while delivering exceptional customer service. Our trained Insurance Customer Service Representatives handle client interactions with professionalism and care.
              </p>
              <a 
                href="/contact-us" 
                className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </a>
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="Insurance Customer Service Representative"
                description="Professional customer service representative handling insurance inquiries with expertise and care. (1200x800px recommended)"
                imageSrc="/images/Services/customer-service-hero.webp"
                imageAlt="Insurance Customer Service Representative handling client interactions"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="section-container bg-gray-50 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Why Choose Our Insurance CSRs?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '💰', title: 'Save up to 70%', description: 'Save up to 70% on staffing costs with our affordable CSR plans.' },
            { icon: '👥', title: 'Retain Clients', description: 'Retain clients effortlessly with experienced CSRs managing inquiries and renewals.' },
            { icon: '⭐', title: 'Top 1% Talent', description: 'We hire and train the top 1% of customer service candidates.' },
            { icon: '📋', title: 'Flat-Fee Model', description: 'Eliminate payroll taxes and HR headaches with our flat-fee model.' }
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-ocean-700 mb-3">{benefit.title}</h3>
              <p className="text-gray-700 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="section-container bg-white py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Rooted in Insurance Expertise
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              At Ocean Virtual Assistant, we specialize in providing exceptional Insurance Customer Service Representatives to agencies across the USA. Our roots trace back to Walker Insurance Agency, where we built our foundation in customer service excellence.
            </p>
            <p>
              As a leading agency in the insurance sector, we not only run a successful insurance business but also train and vet our CSRs through real-world industry experience. This unique background enables us to offer specialized customer service tailored to your clients' needs.
            </p>
            <p>
              Enjoy the flexibility of part-time support without startup fees or surprises, starting at just $750 monthly with zero HR complications.
            </p>
          </div>
        </div>
      </section>

      {/* What Our CSRs Handle */}
      <section className="section-container bg-gray-50 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            What Our Insurance CSRs Handle
          </h2>
          <p className="text-xl text-gray-600">
            Customer-Facing Tasks Our CSRs Excel At
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: '💬', title: 'Client Inquiries & Communication', tasks: ['Answering policy questions', 'Providing coverage information', 'Explaining policy details'] },
            { icon: '🔧', title: 'Issue Resolution', tasks: ['Addressing complaints', 'Resolving billing disputes', 'Handling claims inquiries'] },
            { icon: '📄', title: 'Policy Management', tasks: ['Processing policy changes', 'Managing renewals', 'Coordinating endorsements'] },
            { icon: '📋', title: 'Document Requests', tasks: ['ID card requests', 'Dec Page copies', 'Certificates of insurance'] },
            { icon: '📅', title: 'Appointment Management', tasks: ['Scheduling meetings', 'Following up on quotes', 'Managing reminders'] },
            { icon: '❤️', title: 'Retention & Care', tasks: ['Proactive outreach', 'Relationship building', 'Cross-sell support'] }
          ].map((category, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-bold text-ocean-700 mb-4">{category.title}</h3>
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
      </section>

      {/* Why Ocean VA CSRs Stand Out */}
      <section className="section-container bg-white py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Why Ocean VA CSRs Stand Out
          </h2>
          <p className="text-xl text-gray-600">
            Our roots in the insurance industry set us apart
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '🌍', title: 'Global Talent Network', description: 'Tap into a global network of top-tier talent from Mexico, Philippines and LATAM.' },
            { icon: '✅', title: 'Industry-Leading Retention', description: 'With our 30-day vetting process, your CSR is trained, experienced, and ready to excel.' },
            { icon: '💼', title: 'Simple & Affordable Hiring', description: 'Interview top candidates, choose your price, and enjoy a flat monthly rate with no hidden fees.' },
            { icon: '🎓', title: 'Customized Training', description: 'Training tailored to your business needs. Each CSR is skilled in English, client interaction, and insurance technology.' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-ocean-700 mb-3">{feature.title}</h3>
              <p className="text-gray-700 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      {/* Booking Demo */}
      <BookingDemo />

      {/* FAQ Section */}
      <FAQSection faqs={insuranceCsrFaqs} />

      {/* Final CTA Section */}
      <section className="section-container bg-ocean-700 text-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Customer Service?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Let us help your agency deliver exceptional customer experiences while saving up to 70% on staffing costs.
          </p>
          <p className="text-lg mb-8 text-ocean-100">
            We offer a flat monthly fee, no start-up costs, and no hidden fees.
          </p>
          <a 
            href="/contact-us" 
            className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book Free Discovery Call
          </a>
        </div>
      </section>
    </>
  )
}

export default InsuranceCostumerService
