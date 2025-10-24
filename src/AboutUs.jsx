import React from 'react'
import { CheckCircle, Users, TrendingUp, Globe, Award, Zap } from 'lucide-react'
import BookingDemo from './components/BookingDemo'

export default function AboutUs() {
  const whyChooseUs = [
    {
      icon: <Award className="w-12 h-12 text-ocean-600" />,
      title: 'Industry Roots',
      description: 'Built on the success of Walker Insurance Agency, we deeply understand the challenges of insurance businesses.'
    },
    {
      icon: <Users className="w-12 h-12 text-ocean-600" />,
      title: 'Top Talent',
      description: 'We hire only the top 1% of applicants, and every VA undergoes a comprehensive 30-day vetting process.'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-ocean-600" />,
      title: 'Cost Savings',
      description: 'Enjoy no equipment fees, no payroll taxes, and no hidden costs.'
    },
    {
      icon: <Globe className="w-12 h-12 text-ocean-600" />,
      title: 'Ongoing Training & Global Expertise',
      description: 'Our VAs undergo continuous training and offer bilingual support from Mexico, the Philippines, and LATAM.'
    }
  ]

  const leaders = [
    {
      name: 'Zack Walker',
      position: 'CEO',
      quote: 'To maintain our high standards, we use independent third-party verification tools like Speechace, a cutting-edge AI-powered language assessment tool. This ensures our Virtual Assistants can speak and write English at a professional level.',
      image: '/img/team/zack.jpg'
    },
    {
      name: 'Logan Walker',
      position: 'CSO',
      quote: 'We prioritize finding you the right VA for your specific needs and agency culture. Although we have a very high success rate it does not mean that the first VA chosen is the best fit.',
      image: '/img/team/logan.jpg'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-600 to-ocean-700 text-white py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Discover Ocean Virtual Assistant
              </h1>
              <p className="text-xl md:text-2xl text-ocean-100 mb-8 leading-relaxed">
                Rooted in Insurance Expertise, Focused on Your Business Success
              </p>
              <p className="text-lg text-ocean-100 mb-8 leading-relaxed">
                At Ocean Virtual Assistant, we specialize in providing exceptional virtual assistant services to the insurance industry and small businesses. Our roots trace back to Walker Insurance Agency, where we built our foundation. As a leading agency in the insurance sector, we not only run a successful insurance business but also train and vet our virtual assistants through real-world industry experience. This unique background enables us to offer specialized services tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.oceanvirtualassistant.com/contact-us" 
                  className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  Book a Free Call
                </a>
                <a 
                  href="/pricing" 
                  className="bg-ocean-500 hover:bg-ocean-400 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 border-2 border-white text-center"
                >
                  Plans & Pricing
                </a>
              </div>
            </div>
            <div>
              <img 
                src="/img/about-us/family-walker.png" 
                alt="Walker Family" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-container py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 text-center leading-relaxed mb-8">
            We aim to help insurance agencies and small businesses streamline operations and reduce costs with highly skilled virtual assistants. By leveraging our industry expertise, we deliver cost-effective solutions that let you focus on growth while saving up to 70% in staffing expenses.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-ocean-600 mb-2">70%</div>
              <p className="text-gray-700">Potential Cost Savings</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-ocean-600 mb-2">1%</div>
              <p className="text-gray-700">Top Talent Selection</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-ocean-600 mb-2">30 Days</div>
              <p className="text-gray-700">Comprehensive Vetting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-container py-20">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-container py-20">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
          Leadership & Vision
        </h2>
        <div className="space-y-16">
          {leaders.map((leader, idx) => {
            const imageName = leader.name === 'Zack Walker' ? 'zack.png' : 'logan.png'
            const isEven = idx % 2 === 0
            return (
              <div key={idx} className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-cols-2 md:auto-cols-fr' : ''}`}>
                {isEven ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                        {leader.name}
                      </h3>
                      <p className="text-ocean-600 font-semibold text-lg">
                        {leader.position}
                      </p>
                      <p className="text-gray-700 italic leading-relaxed text-lg">
                        "{leader.quote}"
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={`/img/about-us/${imageName}`} 
                        alt={leader.name} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={`/img/about-us/${imageName}`} 
                        alt={leader.name} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                        {leader.name}
                      </h3>
                      <p className="text-ocean-600 font-semibold text-lg">
                        {leader.position}
                      </p>
                      <p className="text-gray-700 italic leading-relaxed text-lg">
                        "{leader.quote}"
                      </p>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="section-container py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Our Promise
          </h2>
          <div className="bg-gradient-to-r from-ocean-50 to-blue-50 border-2 border-ocean-200 rounded-lg p-12 mb-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-ocean-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flat Monthly Fee</h3>
                  <p className="text-gray-700">No start-up costs, no hidden fees. Transparent pricing you can count on.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-ocean-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
                  <p className="text-gray-700">Your satisfaction is guaranteed, and we are dedicated to delivering the highest-quality service.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-ocean-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Partner</h3>
                  <p className="text-gray-700">From inbox management to specialized industry support, our bilingual assistants are here to streamline your operations.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
            Ocean Virtual Assistant is your trusted partner for efficient and customized virtual assistance services. Contact us today to unlock new opportunities and elevate your business to new heights.
          </p>
        </div>
      </section>

      {/* Booking Demo */}
      <BookingDemo />

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Join hundreds of businesses that have streamlined their operations with Ocean Virtual Assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.oceanvirtualassistant.com/contact-us" 
              className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book a Free Call
            </a>
            <a 
              href="/pricing" 
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
