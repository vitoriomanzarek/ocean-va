import React, { useState } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'

export default function Blogs() {
  // Sample blog data - replace with API call or dynamic data
  const [blogs] = useState([
    {
      id: 1,
      title: 'How Insurance Agencies Save Time With Virtual Assistant Coordination',
      date: 'October 23, 2025',
      slug: 'how-insurance-agencies-save-time-with-virtual-assistant-coordination',
      excerpt: 'Learn how virtual assistants can streamline your insurance agency operations and save valuable time.'
    },
    {
      id: 2,
      title: 'How Virtual Assistants Help Automate Insurance Renewals',
      date: 'October 22, 2025',
      slug: 'how-virtual-assistants-help-automate-insurance-renewals',
      excerpt: 'Discover how automation can make your renewal process faster and more efficient.'
    },
    {
      id: 3,
      title: 'Remote Database Management Solutions For Seamless Operations',
      date: 'October 22, 2025',
      slug: 'remote-database-management-solutions-for-seamless-operations',
      excerpt: 'Explore best practices for managing databases remotely with virtual assistant support.'
    },
    {
      id: 4,
      title: 'How Virtual Support Specialists Drive Modern Business Transformation',
      date: 'October 21, 2025',
      slug: 'how-virtual-support-specialists-drive-modern-business-transformation',
      excerpt: 'Understand how virtual support can transform your business operations.'
    },
    {
      id: 5,
      title: 'The Complete Guide To Remote Project Implementation Success',
      date: 'October 21, 2025',
      slug: 'the-complete-guide-to-remote-project-implementation-success',
      excerpt: 'A comprehensive guide to successfully implementing remote projects.'
    },
    {
      id: 6,
      title: 'Optimizing Team Performance Through Cloud-Based Task Coordination',
      date: 'October 20, 2025',
      slug: 'optimizing-team-performance-through-cloud-based-task-coordination',
      excerpt: 'Learn how to optimize your team performance using cloud-based tools.'
    }
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-600 to-ocean-700 text-white py-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              BLOGS
            </h1>
            <p className="text-lg text-ocean-100 leading-relaxed mb-6">
              Explore our virtual assistant blog for expert tips and insights to boost your business efficiency.
            </p>

            {/* CTA Button */}
            <a 
              href="/contact-us" 
              className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>

      {/* Empty Section */}
      <section className="bg-white py-12"></section>

    </>
  )
}
