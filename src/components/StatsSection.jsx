import React from 'react'

export default function StatsSection() {
  const stats = [
    {
      number: '70%',
      label: 'Average Cost Savings',
      supporting: 'vs hiring in-house staff with benefits and overhead'
    },
    {
      number: '100+',
      label: 'Insurance Agencies Served',
      supporting: 'From independent agents to regional firms across the U.S.'
    },
    {
      number: 'Top 1%',
      label: 'Hiring Standard',
      supporting: 'Only the best insurance-experienced candidates join our team'
    },
    {
      number: '10+',
      label: 'Languages Supported',
      supporting: 'Including English and Spanish fluency for diverse client bases'
    }
  ]

  return (
    <section className="section-container bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Trusted by Insurance Agencies Nationwide
        </h2>
        <p className="text-xl text-gray-600">
          The numbers speak for themselves
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
            <div className="text-5xl font-bold text-ocean-600 mb-3">{stat.number}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>
            <p className="text-sm text-gray-600">{stat.supporting}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto">
        Join leading agencies who've already made the switch to smarter, more affordable staffing.
      </p>
    </section>
  )
}