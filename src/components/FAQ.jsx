import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [open, setOpen] = useState(null)
  
  const faqs = [
    {
      q: "What does an insurance virtual assistant do for an agency?",
      a: "Insurance VAs handle policy servicing (COIs, endorsements, renewals), claims follow-up, customer service, AMS data entry, and back-office tasks. Freeing your licensed agents for sales."
    },
    {
      q: "How fast can we launch? Can I get started in 2-3 days?",
      a: "Yes. Day 0: sign agreement. Day 1: meet your VA and grant tool access. Day 2: SOP alignment. Day 3: go live with first tasks."
    },
    {
      q: "How much does an insurance virtual assistant cost per month?",
      a: "$1,300/month for full-time (40 hours/week). No startup fees, no hidden costs, flat monthly rate. Part-time plans also available. Ask us for details."
    },
    {
      q: "Are your insurance VAs licensed, and what tasks require a licensed agent?",
      a: "Our VAs are unlicensed and handle administrative tasks. They cannot bind policies, quote coverage, or provide insurance advice. Those require a licensed agent."
    },
    {
      q: "Do you offer bilingual (English/Spanish) insurance virtual assistant services?",
      a: "Yes. Our bilingual VAs handle renewal calls, COI requests, policy questions, and claims intake in both English and Spanish."
    },
    {
      q: "Which systems do your VAs support (Applied Epic, AMS360, EZLynx, QQCatalyst)?",
      a: "All four. Our experienced VAs know policy entry, COI generation, renewals, endorsements, and reporting in each system. They come with insurance operations experience."
    },
    {
      q: "What's your company's insurance background and how does it help my agency?",
      a: "Ocean Virtual Assistant was founded by insurance agents with 30 years of hands-on P&C experience in policy servicing, claims, renewals, and carrier relationships.\n\nBecause we come from the insurance industry (not just the VA industry), we understand:\n\n- The difference between an endorsement and a renewal\n- Why COIs need to be turned around in 24 hours\n- How AMS360 and Applied Epic actually work in daily operations\n- The pressure of renewal season and E&O compliance\n\nThis means we hire VAs who already have insurance experience and can hit the ground running. No weeks of training on basic insurance concepts."
    },
    {
      q: "How do you ensure data security when a VA accesses our AMS and carrier sites?",
      a: "VAs work on secure, monitored devices with encrypted connections. Access is controlled via unique credentials with audit trails."
    }
  ]

  return (
    <section id="faq" className="section-container">
      <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
            </button>
            {open === idx && (
              <div className="px-6 pb-4 text-gray-700 whitespace-pre-line">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/faqs" 
          className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          See all FAQs
        </a>
      </div>
    </section>
  )
}