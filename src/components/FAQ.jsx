import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [open, setOpen] = useState(null)
  
  const faqs = [
    {
      q: "What does a virtual assistant from Ocean VA do?",
      a: "Our VAs handle administrative tasks, customer service, scheduling, data entry, document management, and coordination—freeing your team to focus on high-value work. Services vary by role (Insurance, Admin, Customer Service, etc.)."
    },
    {
      q: "How fast can we launch? Can I get started in 2-3 days?",
      a: "Yes. Day 0: sign agreement. Day 1: meet your VA and grant tool access. Day 2: SOP alignment. Day 3: go live with first tasks."
    },
    {
      q: "What's the pricing? Are there hidden fees?",
      a: "No hidden fees. Simple flat monthly rates starting at $750/month for specialized roles (medical, tech, HR) and $1,300/month for full-time (40 hours/week). Month-to-month, no contracts, no setup fees."
    },
    {
      q: "Can I scale up or down as my business needs change?",
      a: "Yes. Adjust hours, pause, or cancel anytime. Month-to-month flexibility with no penalties. Many clients scale during peak seasons or growth phases."
    },
    {
      q: "Do you offer bilingual (English/Spanish) virtual assistants?",
      a: "Yes. Our bilingual VAs handle customer calls, emails, and support in both English and Spanish across all service lines."
    },
    {
      q: "Which tools and systems do your VAs support?",
      a: "We work with most common business tools: CRMs (HubSpot, Salesforce, Zoho), project management (Asana, Monday.com, Jira), accounting (QuickBooks, Xero), and industry-specific platforms. Ask about your specific tools."
    },
    {
      q: "Will I have a dedicated VA or will my work be shared?",
      a: "You get one dedicated VA who learns your business, systems, and workflows. We never pool work across a ticket queue. Your VA is your VA."
    },
    {
      q: "How do you ensure data security and confidentiality?",
      a: "VAs work on secure, monitored devices with encrypted connections. Access is controlled via unique credentials with audit trails. We follow strict data-security practices and can align to your compliance requirements."
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
          href="/faq" 
          className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          See all FAQs
        </a>
      </div>
    </section>
  )
}