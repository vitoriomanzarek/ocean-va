import React from 'react'

export default function ServicesGrid() {
  const services = [
    {
      title: 'Customer Support and Client Communication',
      icon: '💬',
      tasks: ['Inbound/Outbound Calls', 'Email Management', 'Live Chat Support', 'Client Follow-ups']
    },
    {
      title: 'Administrative and Back-Office Tasks',
      icon: '📋',
      tasks: ['Data Entry', 'Document Management', 'Scheduling', 'Reporting']
    },
    {
      title: 'Inside Sales and Renewal Processing',
      icon: '📈',
      tasks: ['Lead Qualification', 'Renewal Outreach', 'Quote Follow-ups', 'Pipeline Management']
    },
    {
      title: 'Marketing and Business Development',
      icon: '🎯',
      tasks: ['Social Media Management', 'Content Creation', 'Email Campaigns', 'Market Research']
    }
  ]

  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Comprehensive Support for Insurance Agencies
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Explore the tasks our experienced Virtual Assistants can handle to streamline your operations
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <ul className="space-y-2">
                {service.tasks.map((task, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-ocean-500 mr-2">✓</span>
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}