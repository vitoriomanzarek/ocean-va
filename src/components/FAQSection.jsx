import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQSection({ faqs = [], noBackground = false }) {
  const [expandedFaq, setExpandedFaq] = useState(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx)
  }

  return (
    <section className={`${noBackground ? '' : 'section-container bg-gray-50'} py-20`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg border-2 border-gray-200 hover:border-ocean-300 transition-colors">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 text-left flex items-start justify-between gap-4"
              >
                <h4 className="font-medium text-gray-800 text-sm leading-relaxed flex-1">
                  {faq.q}
                </h4>
                <ChevronDown
                  className={`w-5 h-5 text-ocean-600 flex-shrink-0 mt-0.5 transition-transform ${
                    expandedFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === idx && (
                <div className="px-6 pb-4 border-t border-gray-200">
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
