import React from 'react'
import { ArrowRight, Briefcase, Building2 } from 'lucide-react'

export default function ServicesIndustriesShowcase() {
  const services = [
    {
      title: 'Insurance Customer Service Representative',
      description: 'Policy servicing, claims support, and customer service for insurance agencies.',
      href: '/insurance',
      icon: '🛡️'
    },
    {
      title: 'Administrative Assistant',
      description: 'Inbox, calendar, documents, travel, research, and operations support.',
      href: '/services/virtual-administrative-assistant',
      icon: '📋'
    },
    {
      title: 'Customer Service Representative',
      description: 'Phone, chat, and email support with bilingual availability.',
      href: '/services/customer-service-virtual-assistant',
      icon: '💬'
    },
    {
      title: 'Marketing Assistant',
      description: 'Content, social media, email campaigns, and reporting support.',
      href: '/services/marketing-virtual-assistant',
      icon: '📱'
    },
    {
      title: 'Virtual Receptionist *',
      description: 'Professional call handling, appointment scheduling, and message management.',
      href: '/services/virtual-receptionist',
      icon: '📞'
    },
    {
      title: 'Transaction Coordinator',
      description: 'Contract-to-close coordination for real estate transactions.',
      href: '/services/virtual-transaction-coordinator',
      icon: '🏠'
    },
    {
      title: 'Sales, Development & Inside Sales',
      description: 'Lead generation, prospecting, and sales pipeline management.',
      href: '/services/sdr-virtual-assistant',
      icon: '📈'
    },
    {
      title: 'General Virtual Assistant',
      description: 'Comprehensive VA services for admin, support, marketing, and sales.',
      href: '/services/virtual-assistant-services',
      icon: '⚡'
    }
  ]

  const industries = [
    {
      title: 'Insurance Virtual Assistant',
      description: 'Policy management, claims processing, and customer service for insurance professionals.',
      href: '/insurance',
      icon: '🛡️'
    },
    {
      title: 'Real Estate Virtual Assistant *',
      description: 'Transaction coordination, listing management, and client communication support.',
      href: '/industries/real-estate-virtual-assistant',
      icon: '🏡'
    },
    {
      title: 'Small Business Virtual Assistant',
      description: 'Phone, scheduling, billing, marketing, and admin support for small businesses.',
      href: '/industries/small-business-virtual-assistant',
      icon: '🏪'
    },
    {
      title: 'E-Commerce Virtual Assistant',
      description: 'Product listings, order operations, customer support, and catalog management.',
      href: '/industries/ecommerce-virtual-assistant',
      icon: '🛒'
    },
    {
      title: 'Finance Virtual Assistant',
      description: 'Bookkeeping, reconciliations, AR/AP, reporting, and advisor support.',
      href: '/industries/finance-virtual-assistant',
      icon: '💰'
    },
    {
      title: 'Property Management Virtual Assistant',
      description: 'Tenant communications, maintenance coordination, and accounting support.',
      href: '/industries/property-management-virtual-assistant',
      icon: '🏢'
    },
    {
      title: 'Healthcare Virtual Assistant',
      description: 'Appointment scheduling, patient communication, and medical records management.',
      href: '/industries/medical-virtual-assistant',
      icon: '🏥'
    },
    {
      title: 'HR Virtual Assistant',
      description: 'Recruitment support, employee onboarding, and HR administration.',
      href: '/industries/hr-virtual-assistant',
      icon: '👥'
    },
    {
      title: 'Technology Virtual Assistant',
      description: 'Tech support, data entry, and administrative support for tech companies.',
      href: '/industries/tech-virtual-assistant',
      icon: '💻'
    },
    {
      title: 'Mortgage and Lending Virtual Assistant',
      description: 'Loan processing, document management, and client communication support.',
      href: '/industries/mortgage-virtual-assistant',
      icon: '🏦'
    }
  ]

  return (
    <section className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Meet Our Services & Industries
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Specialized virtual assistant solutions tailored to your business needs
        </p>
      </div>

      {/* Services Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-ocean-600" />
          <h3 className="text-3xl font-bold text-gray-900">Services</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <a
              key={idx}
              href={service.href}
              className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-ocean-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center text-ocean-600 font-semibold group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Industries Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="w-8 h-8 text-ocean-600" />
          <h3 className="text-3xl font-bold text-gray-900">Industries</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, idx) => (
            <a
              key={idx}
              href={industry.href}
              className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-ocean-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors">
                {industry.title}
              </h4>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {industry.description}
              </p>
              <div className="flex items-center text-ocean-600 font-semibold group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}