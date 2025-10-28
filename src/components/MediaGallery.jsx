import React from 'react'
import { ImageIcon } from 'lucide-react'

export default function MediaGallery() {
  const mediaItems = [
    {
      id: 1,
      title: 'Insurance VA in Action',
      description: 'Our Virtual Assistants handling complex administrative tasks with efficiency and professionalism.',
      placeholder: 'Image of VA working on insurance tasks',
      image: '/images/Industries/property-management-va-hero.webp',
      category: 'Operations'
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description: 'How our VAs integrate seamlessly with your existing insurance team.',
      placeholder: 'Image of team collaboration',
      image: '/images/team-collab.jpeg',
      category: 'Team'
    },
    {
      id: 3,
      title: 'Client Success Stories',
      description: 'Insurance agencies that have transformed their business with Ocean VA - real results.',
      placeholder: 'Image of success cases',
      image: '/images/client.jpeg',
      category: 'Success'
    },
    {
      id: 4,
      title: 'Technology & Tools',
      description: 'Our VAs are trained in the leading AMS platforms on the market.',
      placeholder: 'Image of tools and technology',
      image: '/images/tecnology.jpeg',
      category: 'Technology'
    }
  ]

  return (
    <section className="section-container bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            See How We Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the day-to-day operations of our Virtual Assistants and how they transform insurance agency operations.
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mediaItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-ocean-100 to-ocean-50 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
                ) : (
                  <div className="text-center border-2 border-dashed border-ocean-300 w-full h-full flex items-center justify-center">
                    <div>
                      <ImageIcon className="w-12 h-12 text-ocean-400 mx-auto mb-2" />
                      <p className="text-sm text-ocean-600 font-medium px-2">
                        {item.placeholder}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-ocean-100 text-ocean-700 text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 flex-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section - Larger Image */}
        <div className="bg-gradient-to-r from-ocean-50 to-ocean-100 rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-ocean-200 to-ocean-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/images/success.webp" alt="Agency Transformation" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Proven Results
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Insurance agencies that implemented Ocean VA report:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">70% reduction in administrative costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Increased agent productivity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Improved customer satisfaction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Scalability without increasing overhead</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
