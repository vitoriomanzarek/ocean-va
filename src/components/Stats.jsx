import React from 'react'

export default function Stats() {
  const stats = [
    {
      value: '70%',
      label: 'Cost Savings',
      description: 'Save up to 70% on staffing costs'
    },
    {
      value: '95%',
      label: 'Retention Rate',
      description: 'Industry-leading employee retention'
    },
    {
      value: '100+',
      label: 'Businesses Served',
      description: 'Clients across multiple industries'
    },
    {
      value: '10+',
      label: 'Languages',
      description: 'English & Spanish Native VAs'
    }
  ]

  return (
    <section className="bg-ocean-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Expert Virtual Assistants for Your Business
          </h2>
          <p className="text-xl text-ocean-100">
            Specialized professionals ready to help your business grow and succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-2 text-ocean-100">{stat.label}</div>
              <p className="text-sm text-ocean-200">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-xl font-bold mb-2">Global Talent Network</h3>
            <p className="text-ocean-100">
              Tap into top-tier talent from regions like Mexico, the Philippines and LATAM.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-xl font-bold mb-2">Rigorous Vetting</h3>
            <p className="text-ocean-100">
              30-day vetting process ensures your VA is trained, experienced, and ready to excel.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2">Flexible Pricing</h3>
            <p className="text-ocean-100">
              Flat monthly rate with no hidden fees. Interview candidates and choose your price.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}