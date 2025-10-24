import React from 'react'

export default function HeroCTAs() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a 
        href="#booking" 
        onClick={(e) => handleScroll(e, 'booking')}
        className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all shadow-lg text-center"
      >
        Book a Discovery Call
      </a>
      <a 
        href="#pricing" 
        onClick={(e) => handleScroll(e, 'pricing')}
        className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all text-center"
      >
        View Pricing
      </a>
    </div>
  )
}