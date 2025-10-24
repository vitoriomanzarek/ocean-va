import React from 'react'

export default function Challenges() {
  const challenges = [
    {
      title: 'Lower Commission Levels',
      description: 'Save up to 70% on staffing costs with our affordable VA plans.',
      highlight: true
    },
    {
      title: 'Price Increases Leading to More Rewrites',
      description: 'Retain clients effortlessly with experienced VAs managing renewals and proactive communication.',
      highlight: false
    },
    {
      title: 'Difficulty Finding Motivated Staff',
      description: 'We hire only the top 1% of candidates with proven insurance experience, just results from day one.',
      highlight: true
    },
    {
      title: 'Rising Staffing Costs',
      description: 'Eliminate payroll taxes, equipment expenses, and HR headaches with our flat-fee model.',
      highlight: false
    }
  ]

  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Overcome Insurance Agency Challenges with Ocean Virtual Assistant
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Running an insurance agency comes with unique challenges:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg ${
                challenge.highlight
                  ? 'bg-ocean-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <h3 className={`text-lg font-bold mb-4 ${
                challenge.highlight ? 'text-white' : 'text-gray-900'
              }`}>
                {challenge.title}
              </h3>
              <p className={`text-sm ${
                challenge.highlight ? 'text-white' : 'text-gray-700'
              }`}>
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}