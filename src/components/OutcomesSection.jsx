import React from 'react'

export default function OutcomesSection({ subtitle, outcomes, noBackground = false }) {
  return (
    <section className={`${noBackground ? '' : 'section-container bg-ocean-600'} text-white`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Outcomes You Can Expect</h2>
          <p className="text-xl text-ocean-100">
            {subtitle || 'Real results that transform how you work every day.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {outcomes.map((item, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-ocean-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}