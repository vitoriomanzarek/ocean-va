import React from 'react'
import BookingDemo from './components/BookingDemo'

export default function AboutUs() {
  const stats = [
    { number: '$100M+', label: 'Premiums Managed' },
    { number: '25+', label: 'Years Experience' },
    { number: '17', label: 'Years in Business' }
  ]

  const challenges = [
    'Lower commission levels',
    'Extreme price increases driving more rewrites',
    'Heavy retention workload to keep clients',
    'Difficulty sourcing motivated staff',
    'Rising costs: wages, rent, benefits, PTO, HR, workers\' comp'
  ]

  const removes = [
    'Payroll taxes, equipment spend, and HR overhead',
    'Hiring churn and vacancy lag',
    'Fixed office costs'
  ]

  const gains = [
    'Seasoned insurance VAs aligned to your book',
    'Stable throughput on service, renewals, and rewrites',
    'A flat-fee model that protects margin'
  ]

  const coreValues = [
    { title: 'Integrity', description: 'We honor our commitments to clients and VAs.' },
    { title: 'Excellence', description: 'We hold ourselves to the highest professional standards.' },
    { title: 'Collaboration', description: 'We believe strong relationships drive great results.' },
    { title: 'Reliability', description: 'We deliver consistent, dependable support every day.' },
    { title: 'Growth', description: 'We create opportunities for clients and virtual assistants alike to succeed.' },
    { title: 'Trust', description: 'Built on genuine teamwork and communication.' }
  ]

  const aboutSections = [
    {
      icon: '📖',
      title: 'Our Story',
      description: 'OVAS was founded with one clear goal — to make business support simple, personal, and dependable. We saw how companies struggled to find consistent, skilled virtual assistants and set out to change that.'
    },
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'To empower businesses with dependable, professional virtual assistants while creating meaningful opportunities for talented individuals worldwide. At OVAS, success is built on trust, teamwork, and shared goals.'
    },
    {
      icon: '🤝',
      title: 'Our Approach',
      description: 'By focusing on long-term partnerships instead of quick placements, OVAS connects clients with dedicated professionals who become an integral part of their daily operations.'
    }
  ]

  const leaders = [
    {
      name: 'Logan Walker',
      position: 'Chief Operating Officer (COO)',
      description: 'Logan oversees the day-to-day operations of OVAS, ensuring every department works together in alignment. He manages internal performance, supports team growth, and maintains a high standard of service across all areas of the business. Logan conducts both client VA interviews, helping clients select the right assistant while overseeing contracting, onboarding, and ongoing coordination. As the operational core of OVAS, he keeps systems efficient, and the client experience seamless from start to finish.'
    },
    {
      name: 'Zack Walker',
      position: 'Chief Marketing Officer (CMO) - Director of Growth & Marketing',
      description: 'Zack drives the business development and marketing efforts that power OVAS\'s continued growth. He leads the marketing team, manages brand direction, and oversees all discovery calls with new prospects. By understanding each client\'s needs, Zack works closely with the recruiting team and operations to match them with top-tier virtual assistants. His strategic focus on lead conversion and brand visibility keeps OVAS expanding while staying true to the mission of delivering reliable, personalized service.'
    },
    {
      name: 'Hilda Hernandez',
      position: 'Head Recruiter',
      description: 'Hilda leads OVAS\'s recruitment operations with insight and precision. She oversees every stage of the hiring process, ensuring candidates meet our high standards and align with client needs. Her leadership keeps the recruiting team organized, motivated, and focused on excellence. Hilda\'s commitment to quality and consistency ensures OVAS continues to connect clients with truly exceptional virtual assistants.'
    },
    {
      name: 'Cristina Parra',
      position: 'Community Manager & Recruiting Team',
      description: 'Cristina strengthens the bridge between our virtual assistant community and the recruiting team. She fosters engagement, collaboration, and professionalism among VAs while supporting recruitment initiatives. Her ability to connect people and maintain organized communication channels ensures candidates feel valued and supported. Cristina\'s teamwork and dedication help keep the OVAS community thriving.'
    },
    {
      name: 'Rose Moreno',
      position: 'Executive & Client Support',
      description: 'Rose provides essential support to both our leadership and client base, ensuring smooth communication and efficient operations. She coordinates schedules, manages client inquiries, and helps maintain the high service standards OVAS is known for. Rose\'s reliability and attention to detail make her an integral part of the client experience, ensuring every interaction reflects the professionalism of our virtual assistant team.'
    },
    {
      name: 'Jeline Galleon',
      position: 'Recruiting Team Support',
      description: 'Jeline plays a vital role in keeping the recruiting process running smoothly. She carefully vets candidate profiles, maintains an organized CRM, and works closely with the recruiting team to advance top-tier virtual assistant candidates through the pipeline. Her focus on prioritizing great talent ensures OVAS continues to deliver only the most qualified professionals.'
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

      {/* What Sets Us Apart Section */}
      <section className="section-container py-20">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
          What sets us apart
        </h2>
        <p className="text-lg text-ocean-600 text-center mb-12">Built on real agency tenure</p>

        {/* Walker Insurance Legacy Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-ocean-50 to-blue-50 rounded-lg p-8 mb-12 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏢</span>
            <h3 className="text-2xl font-bold text-gray-900">Walker Insurance Legacy</h3>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Walker Insurance has managed over <span className="font-bold text-ocean-600">$100M in premiums</span> across <span className="font-bold">17 years</span>. Led by Pam Walker with <span className="font-bold">25+ years</span> in agency operations. Based in Florida.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex gap-3">
              <span className="text-ocean-600 text-lg flex-shrink-0 mt-0.5">✓</span>
              <span className="text-gray-700 text-sm">Deep expertise in Homeowners, Auto, Flood, and Commercial</span>
            </div>
            <div className="flex gap-3">
              <span className="text-ocean-600 text-lg flex-shrink-0 mt-0.5">✓</span>
              <span className="text-gray-700 text-sm">Appointed with Progressive, AAA, Travelers</span>
            </div>
            <div className="flex gap-3">
              <span className="text-ocean-600 text-lg flex-shrink-0 mt-0.5">✓</span>
              <span className="text-gray-700 text-sm">Partnerships with Safeco | Liberty Mutual</span>
            </div>
            <div className="flex gap-3">
              <span className="text-ocean-600 text-lg flex-shrink-0 mt-0.5">✓</span>
              <span className="text-gray-700 text-sm">Working with Allstate and Allied | Nationwide</span>
            </div>
          </div>

          <blockquote className="border-l-4 border-ocean-600 pl-6 py-4 text-gray-700 italic">
            "Walker Insurance brings over three decades of insurance experience in managing one of Florida's largest independent agencies."
          </blockquote>
        </div>

        {/* Why OVAS Exists */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white p-4 rounded-lg">
            <span className="text-2xl">✓</span>
            <h3 className="text-2xl font-bold">Why OVAS exists</h3>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            We needed reliable virtual assistants for our own agency. Walker Insurance was an early mover to remote work and VA leverage, becoming one of Florida's most profitable agencies.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For years we shared our blueprint with peers. The results for our agency and for those who adopted the model led us to launch OVAS, so any agency can deploy the same system at scale.
          </p>
        </div>

        {/* Built for Florida's Reality */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📈</span>
            <h3 className="text-2xl font-bold text-gray-900">Built for Florida's reality</h3>
          </div>
          
          <p className="text-gray-700 mb-6 font-semibold">We have lived the state's pressures first-hand:</p>
          <ul className="space-y-3">
            {challenges.map((challenge, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="text-ocean-600 font-bold">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remove & Gain Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-red-50 rounded-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⊘</span>
              <h3 className="text-2xl font-bold text-gray-900">What you remove with OVAS</h3>
            </div>
            <ul className="space-y-3">
              {removes.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">✓</span>
              <h3 className="text-2xl font-bold text-gray-900">What you gain</h3>
            </div>
            <ul className="space-y-3">
              {gains.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-ocean-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section-container py-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          About Us
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {aboutSections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-bold text-ocean-600 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-bold text-ocean-600 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Leadership Section */}
      <section className="section-container py-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Meet Our Leadership
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {leaders.slice(0, 2).map((leader, idx) => {
            const imageUrl = idx === 0 ? 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/6787e0b17360d973850d3199_Frame%20124.png' : 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/6787dfdb3dffd93ab48404e0_Frame%20123.png'
            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Image Section */}
                <div style={{ height: '600px' }} className="bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={imageUrl}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Name and Position Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-sm bg-white text-gray-900 inline-block px-3 py-1 rounded-full mt-2">
                      {leader.position.split(' - ')[0]}
                    </p>
                  </div>
                </div>
                {/* Content Section */}
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="section-container py-20 bg-gray-50">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">The dedicated professionals who make OVAS work every day</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {leaders.slice(2).map((leader, idx) => {
            const imageUrls = ['https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69037b7e19dd3a017994d26d_HildaHernandezFinalEdite.jpeg', 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69037b7eec993311f644b0ef_CristinaParraFinalEdited.jpeg', 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/6906eab98ad2b7f45b94eaf8_RoseMoreno.jpeg', 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/6906eab9e02d950530519894_JelineGalleon.jpeg']
            const imageUrl = imageUrls[idx]
            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-8 flex gap-6">
                {/* Circle Avatar */}
                <div className="w-48 h-48 rounded-full bg-ocean-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src={imageUrl}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-ocean-600 font-semibold text-sm mb-4">
                    {leader.position}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Our Commitment & CTA Section */}
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-12 border border-gray-200">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Our Commitment
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
            At OVAS, we measure success by the success of those we serve. Every client, every VA, and every partnership matters. We believe in communication, accountability, and consistent follow-through — values that define who we are and how we work.
          </p>

          {/* Commitment Values */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <span className="text-3xl" style={{ color: '#22c55e !important' }}>⭕</span>
              <span className="font-bold text-gray-900">Communication</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl" style={{ color: '#22c55e !important' }}>⭕</span>
              <span className="font-bold text-gray-900">Accountability</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl" style={{ color: '#22c55e !important' }}>⭕</span>
              <span className="font-bold text-gray-900">Follow-through</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-ocean-50 to-blue-50 rounded-lg p-12 text-center border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Find out how a dedicated virtual assistant can help your business operate with more focus and less stress.
            </p>
            <a 
              href="https://www.oceanvirtualassistant.com/contact-us" 
              className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-12 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule a Discovery Call
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
