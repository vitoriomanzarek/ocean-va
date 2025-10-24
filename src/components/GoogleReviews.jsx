import React from 'react'

export default function GoogleReviews() {
  const reviews = [
    {
      rating: 5,
      quote: "Ocean VA Solutions has been a game changer for my agency. Their VAs handle complex tasks like COIs and billing audits with ease.",
      name: "Dustin Lewis",
      date: "October 7, 2024"
    },
    {
      rating: 5,
      quote: "Ocean VA has been a great addition to our team. Maria is doing an outstanding job with our day to day operations and service to our customers.",
      name: "Albert Johnson III",
      date: "November 18, 2024"
    },
    {
      rating: 5,
      quote: "Running my insurance agency without Ocean VA Solutions would be unimaginable. Our virtual assistant has seamlessly integrated into our team, handling everything from appointment scheduling to policy updates.",
      name: "Donnie Browne",
      date: "April 4, 2024"
    },
    {
      rating: 5,
      quote: "Amazing service! Marketing my listings was always a challenge because I didn't have the time. After hiring a VA from Ocean VA Solutions, I now have someone who handles all my marketing materials. I've noticed an increase in leads in just three weeks.",
      name: "Joan Luistro",
      date: "December 3, 2024"
    },
    {
      rating: 5,
      quote: "Bringing on virtual assistants from Ocean VA Solutions has been a fantastic decision for our insurance business. They offer exceptional expertise and efficiently handle tasks that used to take up so much of our time.",
      name: "Ruth Cruz Sena",
      date: ""
    }
  ]

  return (
    <section className="section-container bg-white py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Insurance Professionals Are Saying
        </h2>
        <p className="text-xl text-gray-600 mb-2">
          Rated 5.0 stars on Google by real clients
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-yellow-500 text-3xl">⭐⭐⭐⭐⭐</span>
          <span className="text-gray-700 font-semibold">5.0 out of 5</span>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max px-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-md w-80 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</div>
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-blue-700">Google Reviews</span>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"{review.quote}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{review.name}</p>
                {review.date && (
                  <p className="text-sm text-gray-500">{review.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-bold">⭐⭐⭐⭐⭐ 5.0 out of 5</span> based on 50+ reviews
        </p>
        <a href="https://www.google.com/search?q=ocean+virtual+assistant" target="_blank" rel="noopener noreferrer" className="text-ocean-600 hover:text-ocean-700 font-semibold underline">
          Read More Reviews on Google →
        </a>
      </div>
    </section>
  )
}