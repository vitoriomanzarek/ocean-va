import React from 'react'
import { GraduationCap, Users, FileCheck, Headphones } from 'lucide-react'

export default function Training() {
  return (
    <section id="training" className="section-container">
      <h2 className="text-4xl font-bold text-center mb-4">
        Our 30-Day Training at Walker Insurance Agency
      </h2>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
        <strong>What sets us apart:</strong> Every Ocean VA completes a rigorous 30-day training program 
        inside Walker Insurance Agency—a real, operating P&C agency in the U.S.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {[
          {
            icon: GraduationCap,
            title: 'Real-World P&C Workflows',
            desc: 'VAs learn policy servicing, renewals, COIs, and endorsements using live AMS systems (Applied Epic, AMS360).'
          },
          {
            icon: Users,
            title: 'Customer Communication',
            desc: 'Role-play scenarios for inbound calls, email responses, and client follow-ups—both English and Spanish.'
          },
          {
            icon: FileCheck,
            title: 'Carrier Portal Navigation',
            desc: 'Hands-on training with major carriers (Progressive, Travelers, Nationwide, etc.) for quotes, COIs, and claims.'
          },
          {
            icon: Headphones,
            title: 'Compliance & Best Practices',
            desc: 'Understanding licensed vs unlicensed tasks, data security, and agency compliance requirements.'
          }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start bg-white p-6 rounded-lg shadow-md border-l-4 border-ocean-500">
            <div className="bg-ocean-100 p-3 rounded-lg mr-4">
              <item.icon className="w-8 h-8 text-ocean-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-ocean-50 p-8 rounded-lg border-2 border-ocean-200">
        <h3 className="text-2xl font-bold text-ocean-900 mb-4">📚 Training Curriculum Highlights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'AMS360 & Applied Epic navigation',
            'Certificate of Insurance generation',
            'Policy endorsement processing',
            'Renewal workflow & follow-up',
            'Claims FNOL & documentation',
            'Customer service scripts (EN/ES)',
            'Email & phone etiquette',
            'Data entry accuracy standards'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-ocean-600 font-bold mr-2">✓</span>
              <span className="text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 italic">
          <strong>Why this matters:</strong> Competitors hire generalists and expect you to train them. 
          Our VAs arrive with insurance-specific skills from day one.
        </p>
      </div>
    </section>
  )
}