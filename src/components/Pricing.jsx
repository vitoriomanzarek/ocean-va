import React from 'react'
import { Check } from 'lucide-react'

export default function Pricing() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const plan = {
    name: 'Full Time Plan',
    price: '$1,300',
    hours: '40 hours/week',
    features: [
      'No Startup Fee',
      'No Lock-In Contract',
      'Flat Monthly Fee',
      'No Additional Fees Ever',
      'No Cost VA Replacements',
      'No Equipment Expense',
      'No PTO Expense',
      'No HR Issues'
    ],
    cta: 'Get Started'
  }

  return (
    <section id="pricing" className="section-container">
      <h2 className="text-4xl font-bold text-center mb-4">
        Transparent Pricing — No Startup Fees
      </h2>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
        We don't hide our pricing—we believe in transparency. 
        One simple plan—scale up or down anytime.
      </p>

      <div className="max-w-2xl mx-auto">
        <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-ocean-500">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-ocean-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="mb-4">
            <div className="text-gray-600 text-sm mb-1">Starting at:</div>
            <span className="text-5xl font-bold text-ocean-700">{plan.price}</span>
            <span className="text-gray-600 ml-2">/ monthly</span>
          </div>
          <p className="text-gray-600 mb-6 font-medium">{plan.hours}</p>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <a 
            href="#booking"
            onClick={(e) => handleScroll(e, 'booking')}
            className="block text-center font-bold py-3 px-6 rounded-lg transition-all bg-ocean-600 hover:bg-ocean-700 text-white cursor-pointer"
          >
            {plan.cta}
          </a>
        </div>
        
        {/* Part-time availability note */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Need fewer hours? <a href="https://www.oceanvirtualassistant.com/contact-us" className="text-ocean-600 hover:text-ocean-700 font-semibold">Ask about our Part-Time plan</a>
          </p>
        </div>
      </div>

      {/* ROI Calculator Box */}
      <div className="mt-12 max-w-4xl mx-auto p-8 bg-ocean-50 rounded-xl border-2 border-ocean-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div className="flex-1">
            <h4 className="font-bold text-ocean-900 text-xl mb-3">Compare: Full-time US employee costs $40K-60K/year + benefits</h4>
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>In-house Employee:</strong> $40,000-$60,000/year + benefits (~$50,000-$75,000 total)
              </p>
              <p>
                <strong>Ocean VA Full-Time:</strong> $15,600/year
              </p>
              <p className="text-lg">
                <strong>Your Savings:</strong> <span className="text-ocean-700 font-bold text-2xl">$24,000-$44,000/year (60-70%)</span>
              </p>
            </div>
            <a 
              href="https://www.oceanvirtualassistant.com/contact-us" 
              className="inline-block mt-4 text-ocean-600 hover:text-ocean-700 font-semibold"
            >
              Calculate Your Savings →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}