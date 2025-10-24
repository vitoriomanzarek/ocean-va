import React from 'react'

export default function ToolExpertise() {
  const tools = [
    { name: 'Applied Epic' },
    { name: 'AMS360' },
    { name: 'EZLynx' },
    { name: 'QQCatalyst' }
  ]

  return (
    <section id="tools" className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Your VAs Already Know Your Software Stack
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          No training delays. No learning curves. Our VAs come with hands-on experience in the exact systems your agency uses daily.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-gray-50 p-8 rounded-lg shadow-md border-2 border-ocean-200 hover:border-ocean-500 transition-colors">
            <h3 className="text-2xl font-bold text-ocean-700 text-center">{tool.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}