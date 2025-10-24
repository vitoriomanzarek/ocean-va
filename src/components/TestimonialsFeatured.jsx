import React from 'react'

export default function TestimonialsFeatured() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const testimonials = [
    {
      quote: "Ocean VA Solutions has been a game changer for my agency. Their VAs handle complex tasks like COIs and billing audits with ease. They're truly part of my core team—customers even ask for them by name! Great service, unbeatable pricing, and top-notch professionalism.",
      name: "Dustin Lewis",
      title: "Owner",
      company: "Lewis Insurance Group",
      badge: "Reduced COI turnaround by 50%"
    },
    {
      quote: "My virtual assistant has seamlessly managed tasks like organizing my inbox, scheduling meetings, and handling property listings, making my workflow smoother and more efficient. I highly recommend Ocean Virtual for their exceptional support and their ability to become an integral part of my team.",
      name: "Amy Baker",
      title: "Realtor",
      company: "",
      badge: "Saved 15+ hours per week"
    },
    {
      quote: "Running my insurance agency without Ocean VA Solutions would be unimaginable. Our virtual assistant has seamlessly integrated into our team, handling everything from appointment scheduling to policy updates. Their dedication has enabled us to deliver exceptional service while freeing up time for strategic planning and business development.",
      name: "Donnie Browne",
      title: "Agency Owner",
      company: "",
      badge: "Scaled operations without adding overhead"
    }
  ]

  return (
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Real Results from Real Insurance Agencies
        </h2>
        <p className="text-xl text-gray-600">
          See how Ocean VA has transformed operations for agencies like yours
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col">
            <div className="mb-4">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
            </div>
            <div className="mt-auto">
              <div className="bg-green-50 px-4 py-2 rounded-lg inline-block mb-4">
                <span className="text-green-800 font-semibold text-sm">✅ {testimonial.badge}</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
                {testimonial.company && (
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-700 mb-4">See how Ocean VA can transform your agency too.</p>
        <a 
          href="#booking" 
          onClick={(e) => handleScroll(e, 'booking')}
          className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg cursor-pointer"
        >
          Book Your Free Call
        </a>
      </div>
    </section>
  )
}