import React from 'react'
import BookingDemo from './components/BookingDemo'
import GoogleReviews from './components/GoogleReviews'
import Timeline from './components/Timeline'

export default function ContactUs() {
  return (
    <>
      {/* Booking Demo Section */}
      <BookingDemo />

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Timeline/Process Section */}
      <Timeline />

      {/* Final CTA Section */}
      <section className="section-container bg-ocean-700 text-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Join hundreds of businesses that have streamlined their operations with Ocean Virtual Assistant. Let's get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://calendly.com/ocean-virtual-assistant/30min" 
              className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book a Free Call
            </a>
            <a 
              href="/pricing" 
              className="bg-ocean-600 hover:bg-ocean-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all duration-200"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
