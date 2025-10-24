import React from 'react'

export default function Timeline() {
  const steps = [
    {
      step: '1',
      title: 'Tell Us What You Need',
      description: 'Book a call, share your requirements, and sign the agreement. We match you with pre-vetted candidates.'
    },
    {
      step: '2',
      title: 'Meet Your VA & Grant Access',
      description: 'Interview your matched VA, approve the fit, and provide AMS/tool credentials and SOPs.'
    },
    {
      step: '3',
      title: 'Workflow Alignment',
      description: 'Your experienced VA reviews your agency\'s specific processes and priorities. Quick sync on your SOPs and system preferences—no teaching insurance basics needed.'
    },
    {
      step: '4',
      title: 'Go Live & Start Getting Results',
      description: 'Assign first tasks (COIs, renewals, data entry). Your VA is productive from day one.'
    }
  ]

  return (
    <section id="timeline" className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Onboarding Timeline</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From contract to live in 2-3 days. Unlike competitors who take weeks, we get you up and running in 72 hours or less.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {steps.map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-ocean-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {item.step}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block bg-ocean-100 px-8 py-4 rounded-lg border-2 border-ocean-500">
          <p className="text-lg font-bold text-ocean-900">
            ⚡ Average time to first completed task: <span className="text-ocean-600">48 hours</span>
          </p>
        </div>
      </div>
    </section>
  )
}