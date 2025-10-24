import React from 'react'

export default function HeroHome() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-lg overflow-hidden shadow-2xl min-h-[500px] lg:min-h-[600px]">
              <img 
                src="/img/positive-woman.jpg" 
                alt="Ocean Virtual Assistant" 
                className="w-full h-full min-h-[500px] lg:min-h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Outsource Smarter
              <span className="block text-ocean-100">Achieve More</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-ocean-50">
              Boost productivity, save time, cut costs, and focus on what matters with expert support from Ocean Virtual Assistants.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { icon: '⭐', text: 'Top 1% Talent' },
                { icon: '⚡', text: 'Start in 2-3 Days' },
                { icon: '💰', text: 'No Setup Fees' },
                { icon: '🌐', text: '10+ Languages' }
              ].map((badge, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 flex items-center gap-2">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#booking" 
                onClick={(e) => handleScroll(e, 'booking')}
                className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all shadow-lg text-center cursor-pointer"
              >
                Contact us
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => handleScroll(e, 'pricing')}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all text-center cursor-pointer"
              >
                Plans & Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}