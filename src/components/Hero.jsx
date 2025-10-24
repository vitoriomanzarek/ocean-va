import React from 'react'
import { Clock, DollarSign, Award, Globe } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
      <div className="section-container">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Insurance Virtual Assistant Services for Agencies
              <span className="block text-ocean-100 text-2xl md:text-3xl mt-4">
                (Launch in 2-3 Days)
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-ocean-50">
              • Cut Admin Costs 70% <br />
              • Stop Drowning in Service Tasks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="https://www.oceanvirtualassistant.com/contact-us" className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all shadow-lg text-center">
                Book a Free Call
              </a>
              <a href="#pricing" className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all text-center">
                View Pricing
              </a>
            </div>

            {/* Key Differentiators - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Clock, title: '2-3 Day Start', desc: 'Fastest onboarding' },
                { icon: DollarSign, title: '$1,300/month', desc: 'Transparent pricing' },
                { icon: Award, title: 'Top 1% Talent', desc: '30 years of experience in the insurance industry'},
                { icon: Globe, title: 'English & Spanish Native VAs', desc: '+ 10 Additional Languages' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <item.icon className="w-8 h-8 mb-2" />
                  <h3 className="font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-ocean-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/BSKxhV7nfmg"
                title="Ocean Virtual Assistant Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}