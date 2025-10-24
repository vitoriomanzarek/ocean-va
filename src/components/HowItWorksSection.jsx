import React from 'react'

export default function HowItWorksSection({ subtitle, steps }) {
  return (
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle || 'A simple, proven process to get your virtual assistant up and running.'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {steps.map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-ocean-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {item.step}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}