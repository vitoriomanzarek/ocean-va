import React from 'react'

export default function ComparisonTable() {
  const comparisons = [
    {
      feature: 'Talent Selection',
      oceanVA: 'Top 1% only',
      typical: 'Varies (3-10%)'
    },
    {
      feature: 'Start Time',
      oceanVA: '2-3 days',
      typical: '1-2 weeks'
    },
    {
      feature: 'Pricing',
      oceanVA: 'Starting at: $1,300 (transparent)',
      typical: 'Hidden/Variable'
    },
    {
      feature: 'Setup Fees',
      oceanVA: '$0',
      typical: '$500-2,000'
    },
    {
      feature: 'Language Support',
      oceanVA: '✓ 10+ Languages',
      typical: 'Limited'
    },
    {
      feature: 'Education',
      oceanVA: 'Trained and specialized professionals',
      typical: 'Not required'
    },
    {
      feature: 'HIPAA Compliance',
      oceanVA: '✓ Fully compliant',
      typical: 'Only a few'
    }
  ]

  return (
    <section className="section-container bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why Insurance Agencies Choose Ocean VA
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          See how we compare to typical VA companies
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-xl rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-ocean-600 to-ocean-700 text-white">
                <th className="p-4 text-left font-bold">Feature</th>
                <th className="p-4 text-left font-bold bg-ocean-500">Ocean VA</th>
                <th className="p-4 text-left font-bold">Typical VA Companies</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-semibold text-gray-900">{item.feature}</td>
                  <td className="p-4 bg-ocean-50 text-ocean-900 font-medium">
                    {item.oceanVA}
                  </td>
                  <td className="p-4 text-gray-600">{item.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('booking');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book a free call
          </a>
        </div>
      </div>
    </section>
  )
}