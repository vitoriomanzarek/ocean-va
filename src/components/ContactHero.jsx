import React from 'react'

export default function ContactHero() {
  return (
    <section className="bg-gradient-to-r from-ocean-900 to-ocean-700 text-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get in Touch With Ocean VA
        </h1>
        <p className="text-lg md:text-xl text-ocean-100 mb-8 max-w-2xl mx-auto">
          Ready to streamline your business operations? Schedule a free discovery call with our team and discover how Ocean Virtual Assistant can help you save time and up to 70% on costs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#booking" 
            className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book a Call
          </a>
          <a 
            href="mailto:info@oceanvirtualassistant.com" 
            className="border-2 border-white text-white hover:bg-white hover:text-ocean-700 font-bold px-8 py-4 rounded-lg transition-all duration-200"
          >
            Send Email
          </a>
        </div>
      </div>
    </section>
  )
}
