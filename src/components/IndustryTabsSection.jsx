import React, { useState } from 'react'

const IndustryTabsSection = () => {
  const [activeTab, setActiveTab] = useState('insurance')

  const tabsData = {
    insurance: {
      title: 'Insurance Agencies',
      description: 'Specialized support for policies, renewals, and claims. We provide VAs with verified agency experience.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-4.902z" />
        </svg>
      ),
      cards: [
        {
          title: 'Customer Support',
          icon: '💬',
          tasks: [
            'Inbound/Outbound Calls',
            'Email Management',
            'Live Chat Support',
            'Client Onboarding'
          ]
        },
        {
          title: 'Admin & Back-Office',
          icon: '📋',
          tasks: [
            'Data Entry',
            'Document Management',
            'Policy Checking',
            'Reporting'
          ]
        },
        {
          title: 'Sales & Renewals',
          icon: '📈',
          tasks: [
            'Lead Qualification',
            'Renewal Outreach',
            'Quote Preparation',
            'Pipeline Management'
          ]
        },
        {
          title: 'Marketing',
          icon: '🎯',
          tasks: [
            'Social Media Management',
            'Email Campaigns',
            'Content Creation',
            'Market Research'
          ]
        }
      ]
    },
    'real-estate': {
      title: 'Real Estate Professionals',
      description: 'Transaction coordinators and listing management to help you close deals faster.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      cards: [
        {
          title: 'Transaction Coordination',
          icon: '📝',
          tasks: [
            'Manage deadlines',
            'Escrow coordination',
            'Compliance paperwork',
            'Calendar management'
          ]
        },
        {
          title: 'Listing Management',
          icon: '🏠',
          tasks: [
            'MLS data entry',
            'Description writing',
            'Photo scheduling',
            'Open house prep'
          ]
        },
        {
          title: 'Marketing & Lead Gen',
          icon: '📱',
          tasks: [
            'Social media posts',
            'Flyer creation',
            'Lead follow-up',
            'CRM updates'
          ]
        },
        {
          title: 'Client Care',
          icon: '💝',
          tasks: [
            'Feedback collection',
            'Thank you notes',
            'Appointment setting',
            'Inbox management'
          ]
        }
      ]
    },
    mortgage: {
      title: 'Mortgage & Lending',
      description: 'Loan processing expertise that keeps files moving and borrowers on track.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5z" />
        </svg>
      ),
      cards: [
        {
          title: 'Loan Processing',
          icon: '📄',
          tasks: [
            'Document collection',
            'File organization',
            'LOS data entry',
            'Status updates'
          ]
        },
        {
          title: 'Borrower Follow-up',
          icon: '📞',
          tasks: [
            'Missing doc reminders',
            'Milestone updates',
            'Post-closing touchpoints'
          ]
        },
        {
          title: 'Admin Support',
          icon: '📅',
          tasks: [
            'Calendar management',
            'Meeting scheduling',
            'Compliance checks',
            'CRM hygiene'
          ]
        },
        {
          title: 'Partner Marketing',
          icon: '🤝',
          tasks: [
            'Co-branded flyer creation',
            'Realtor outreach support',
            'Email newsletters'
          ]
        }
      ]
    },
    'small-business': {
      title: 'Small Business & Admin',
      description: 'Operational expertise that organizes your chaos and drives growth.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
      cards: [
        {
          title: 'Executive Assistance',
          icon: '👔',
          tasks: [
            'Inbox zero',
            'Complex travel booking',
            'Calendar tetris',
            'Meeting minutes'
          ]
        },
        {
          title: 'Financial Admin',
          icon: '💰',
          tasks: [
            'Invoice creation',
            'Expense tracking',
            'Basic bookkeeping',
            'Chasing payments'
          ]
        },
        {
          title: 'Customer Service',
          icon: '🎧',
          tasks: [
            'Ticket resolution',
            'Live chat',
            'FAQ management',
            'Order processing'
          ]
        },
        {
          title: 'Growth Support',
          icon: '🚀',
          tasks: [
            'Competitor research',
            'LinkedIn outreach',
            'Content scheduling',
            'Data mining'
          ]
        }
      ]
    }
  }

  const tabs = [
    { id: 'insurance', title: 'Insurance Agencies', icon: tabsData.insurance.icon },
    { id: 'real-estate', title: 'Real Estate', icon: tabsData['real-estate'].icon },
    { id: 'mortgage', title: 'Mortgage & Lending', icon: tabsData.mortgage.icon },
    { id: 'small-business', title: 'Small Business & Admin', icon: tabsData['small-business'].icon }
  ]

  const activeTabData = tabsData[activeTab]

  return (
    <section className="industry-tabs-section bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#037b77] mb-4">
            Expertise Across Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized support for your specific needs.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200
                ${
                  activeTab === tab.id
                    ? 'bg-[#037b77] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-[#037b77]'}`}>
                {tab.icon}
              </span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Description */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {activeTabData.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTabData.cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#037b77] transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-[#037b77] mb-4">
                {card.title}
              </h3>
              <ul className="space-y-2">
                {card.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start text-sm text-gray-600">
                    <span className="text-[#037b77] font-bold mr-2 flex-shrink-0">✓</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustryTabsSection
