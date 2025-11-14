import React, { useState } from 'react'

export default function FAQMini() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How fast can we start? Can I really launch in 2-3 days?',
      answer: 'Yes! Our streamlined process allows most agencies to go live within 2-3 days.\n\nDay 0: Share your needs in a 15-min call.\nDay 1: We match you with pre-vetted candidates.\nDay 2: Interview 2-3 qualified VAs.\nDay 3: Your chosen VA starts working.'
    },
    {
      question: 'What\'s included in the $1,300 monthly price?',
      answer: 'Everything you need: dedicated full-time VA (40h/week), no setup fees, no equipment costs, ongoing support, free replacement if needed, multilingual support (10+ languages available), and no long-term contracts. Part-time plans also available.'
    },
    {
      question: 'Are there any setup fees or hidden costs?',
      answer: 'Absolutely none. $0 setup fees. $0 equipment costs. $0 hidden charges. Just a flat monthly rate.'
    },
    {
      question: 'What if my VA doesn\'t work out?',
      answer: 'We offer a no-cost replacement guarantee. If your VA isn\'t the right fit, we\'ll find you a replacement at no additional charge.'
    },
    {
      question: 'Do you offer bilingual support?',
      answer: 'Yes. English & Spanish (default). We can route calls, emails, and chats to bilingual VAs to serve your diverse client base.'
    },
    {
      question: 'Which tools and systems do your VAs support?',
      answer: 'We work with HubSpot, Salesforce, Zoho, Pipedrive, Google Workspace, Microsoft 365, Slack/Teams, Asana, Trello, ClickUp, and many more. If you use it, we can learn it.'
    },
    {
      question: 'Will I work with the same dedicated VA?',
      answer: 'Yes—you get one dedicated VA who learns your business, systems, and workflow. We never pool your work across a ticket queue.'
    },
    {
      question: 'How do you ensure quality and performance?',
      answer: 'We use recorded calls (if enabled), scorecards, weekly coaching, KPI reviews, and ongoing quality assurance to keep your VA performing at their best.'
    },
    {
      question: 'Do you require long-term contracts?',
      answer: 'No. Everything is month-to-month with no lock-in or long-term contracts. Cancel anytime if you\'re not satisfied.'
    },
    {
      question: 'How are your VAs vetted and trained?',
      answer: 'We hire the top 1% of candidates through multi-stage screening, voice/tone assessments, and scenario testing. Each VA receives 30 days of specialized training before working with you.'
    }
  ]

  return (
    <section className="section-container bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Quick answers to common questions
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-ocean-600 flex-shrink-0 transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/faq" 
            className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            See all FAQs
          </a>
        </div>
      </div>
    </section>
  )
}