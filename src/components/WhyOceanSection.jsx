import React from 'react'
import { Users, Globe, DollarSign, Shield } from 'lucide-react'

export default function WhyOceanSection({ subtitle, benefits }) {
  const defaultBenefits = [
    {
      icon: Users,
      title: 'Dedicated Teammate',
      description: 'Aligned to your preferences and tools, working as an extension of your team'
    },
    {
      icon: Globe,
      title: 'Bilingual English-Spanish',
      description: 'English-Spanish support for customer and vendor communications'
    },
    {
      icon: DollarSign,
      title: 'Flat Monthly Pricing',
      description: 'Starting at $1,300/mo - no surprises, no lock-ins'
    },
    {
      icon: Shield,
      title: 'American-Owned Operations',
      description: 'Security, continuity support, and reliable service you can trust'
    }
  ]

  const items = benefits || defaultBenefits

  return (
    <section className="section-container bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Ocean VA</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle || 'More than just a service—a dedicated teammate who understands your business.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-lg shadow-md">
            <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}