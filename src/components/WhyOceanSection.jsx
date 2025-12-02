import React from 'react'
import { Users, Globe, DollarSign, Shield, ImageIcon } from 'lucide-react'

export default function WhyOceanSection({ subtitle, benefits, image = '/images/WhyUs.jpg', noBackground = false }) {
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
    <section className={`${noBackground ? '' : 'section-container bg-gray-50'}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Ocean VA</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle || 'More than just a service—a dedicated teammate who understands your business.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        {/* Left - Benefits Cards (Vertical Stack) */}
        <div className="space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <item.icon className="w-10 h-10 text-ocean-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Right - Image Placeholder */}
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center border-2 border-dashed border-gray-300">
          {image ? (
            <img src={image} alt="Why Ocean VA" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Image placeholder</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}