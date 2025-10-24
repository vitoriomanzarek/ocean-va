import React from 'react'

export default function TestimonialsAdditional() {
  const testimonials = [
    {
      quote: "The bilingual support has been a game-changer for our Spanish-speaking clients. Our Ocean VA handles renewals, policy questions, and COI requests in both English and Spanish seamlessly. Client satisfaction has increased by 25% in just two months.",
      name: "Lisa Chen",
      title: "Agency Principal",
      company: "Tri-State Insurance",
      location: "California",
      badge: "25% increase in Spanish client satisfaction"
    },
    {
      quote: "During last renewal season, our Ocean VA processed over 200 renewals without missing a single deadline. They knew exactly how to prioritize, communicate with clients, and handle the carrier portals. I don't know how we managed before.",
      name: "Mike Rodriguez",
      title: "Independent Agent",
      company: "Rodriguez & Associates",
      location: "Florida",
      badge: "200+ renewals processed on time"
    },
    {
      quote: "We added a second VA during our busiest quarter and scaled our operations without adding office space or equipment costs. Ocean VA's flat-fee model let us grow strategically without the usual hiring headaches.",
      name: "Sarah Johnson",
      title: "Agency Owner",
      company: "Johnson Insurance Agency",
      location: "Texas",
      badge: "Scaled operations 40% with zero overhead increase"
    }
  ]

  return (
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          More Success Stories from Our Clients
        </h2>
        <p className="text-xl text-gray-600">
          Different agencies, same results—efficiency, savings, and growth
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col">
            <div className="mb-4">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
            </div>
            <div className="mt-auto">
              <div className="bg-green-50 px-4 py-2 rounded-lg inline-block mb-4">
                <span className="text-green-800 font-semibold text-sm">✅ {testimonial.badge}</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ocean-600 text-white p-8 rounded-xl max-w-4xl mx-auto text-center">
        <p className="text-2xl font-bold mb-4">Ready to see results like these in your agency?</p>
        <a href="https://www.oceanvirtualassistant.com/contact-us" className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all shadow-lg mb-3">
          Schedule Your Discovery Call
        </a>
        <p className="text-ocean-100 text-sm">
          No startup fees • 2-3 day launch • No long-term contracts
        </p>
      </div>
    </section>
  )
}