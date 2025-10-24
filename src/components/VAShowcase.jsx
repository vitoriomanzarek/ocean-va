import React from 'react'

export default function VAShowcase() {
  const videos = [
    {
      id: 'xuGUf7Shq2A',
      name: 'Ximena Mora',
      title: 'Virtual Assistant'
    },
    {
      id: 'eH1idGBAbJg',
      name: 'Jill Nicole Cabusora',
      title: 'Virtual Assistant'
    },
    {
      id: 'EjV9PQfqECI',
      name: 'Katherine Indaburo',
      title: 'Virtual Assistant'
    }
  ]

  return (
    <section className="section-container bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Meet A Few Of The VAs Making A Real Impact
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {/* Video Embed */}
              <div className="aspect-video bg-gray-900">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* VA Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {video.name}
                </h3>
                <p className="text-sm text-gray-600 uppercase tracking-wide">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Want to see all of our available VAs with full Bio?
          </p>
          <a
            href="https://www.oceanvirtualassistant.com/ovas-current-vas"
            className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Available VAs
          </a>
        </div>
      </div>
    </section>
  )
}