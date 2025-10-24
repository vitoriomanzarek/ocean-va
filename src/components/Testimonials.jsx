import React from 'react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Dustin Lewis',
      date: '2024-10-7',
      text: 'Ocean VA Solutions has been a game changer for my agency. Their VAs handle complex tasks like COIs and billing audits with ease. They\'re truly part of my core team—customers even ask for them by name! Great service, unbeatable pricing, and top-notch professionalism. Highly recommend'
    },
    {
      name: 'Albert Johnson III',
      date: '2024-11-18',
      text: 'Ocean VA has a great addition to our team. Maria is doing an outstanding job with our day to day operations and service to our customers.'
    },
    {
      name: 'Donnie Browne',
      date: '2024-04-4',
      text: 'Running my insurance agency without Ocean VA Solutions would be unimaginable. Our virtual assistant has seamlessly integrated into our team, handling everything from appointment scheduling to policy updates. Their dedication and professionalism have enabled us to deliver exceptional service to our clients while also freeing up valuable time for strategic planning and business development.'
    },
    {
      name: 'Joan Luistro',
      date: '2024-12-3',
      text: 'Amazing service! Marketing my listings was always a challenge because I simply didn\'t have the time. But after hiring a virtual assistant from Ocean VA Solutions, I now have someone who handles all my marketing materials. She creates professional flyers, schedules posts, and even helps with my email campaigns. I\'ve noticed an increase in interest and leads in just three weeks.'
    }
  ]

  return (
    <section className="sectioncontainer bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Trusted for our unmatched expertise
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Don't just take our word for it
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-ocean-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}