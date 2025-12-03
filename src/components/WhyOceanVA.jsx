import React from 'react'

export default function WhyOceanVA() {
  return (
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Insurance Agencies Choose Ocean VA Over Generic VA Companies
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're Not Just a VA Company—We ARE Insurance Professionals
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: '🏢',
            headline: 'Founded by Insurance Professionals',
            body: "Ocean VA was built by insurance professionals with 30 years of real-world P&C experience—not tech entrepreneurs who think insurance is 'just data entry.' We've lived your world: the panic of renewal season backlogs, the 2pm COI emergency, the carrier portal that logs you out mid-endorsement, and the client who doesn't understand why their premium went up.",
            benefit: "We understand your pain points because we've lived them—from renewal chaos to COI emergencies to E&O anxiety."
          },
          {
            icon: '⚡',
            headline: 'We Hire Experience, Not Train From Scratch',
            body: 'Unlike competitors who recruit anyone and spend weeks teaching them what a COI is, we hire VAs who already have insurance operations experience. No 30-60 day ramp-up time wasted on basic concepts. Your VA understands endorsements, loss runs, and mortgagee changes from day one.',
            benefit: 'No training delays. Your VA is productive immediately because they come with insurance knowledge, not a blank slate.'
          },
          {
            icon: '🎯',
            headline: 'Top 1% Insurance-Experienced Talent',
            body: "We don't just hire the top 1% of applicants—we hire the top 1% of insurance-experienced applicants who know AMS systems, carrier workflows, and policy servicing. They understand the difference between an endorsement and a rewrite, and why COIs have SLAs measured in hours, not days.",
            benefit: 'Your VA knows insurance operations, not just general admin. They speak your language and understand your urgency.'
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.headline}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{item.body}</p>
            <div className="bg-ocean-50 p-4 rounded-lg border-l-4 border-ocean-600">
              <p className="text-sm font-semibold text-ocean-900 mb-1">What this means for you:</p>
              <p className="text-sm text-ocean-800">{item.benefit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Callout */}
      <div className="bg-ocean-600 text-white p-8 rounded-xl max-w-4xl mx-auto text-center">
        <div className="text-5xl mb-3">📊</div>
        <div className="text-5xl font-bold mb-2">30 Years</div>
        <p className="text-xl text-ocean-100 mb-6">
          of insurance industry knowledge built into every process, hire, and support interaction
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
          <p className="text-ocean-50 mb-4">
            Walker Insurance has managed over $100M in premiums across 30 years in Florida's 
            toughest market. We've lived the same pressures you face—rate hikes, carrier exits, 
            retention battles, and margin compression.
          </p>
          <p className="text-ocean-50">
            Ocean VA was born from that experience. We know what works because we've done it 
            ourselves—and we're helping agencies across the country do the same.
          </p>
        </div>
      </div>
    </section>
  )
}