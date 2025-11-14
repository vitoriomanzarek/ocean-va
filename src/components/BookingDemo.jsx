import React, { useEffect } from 'react';

export default function BookingDemo() {
  // Load Calendly widget script
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="booking" className="bg-white py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            READY TO SAVE ON TIME & UP TO 70% ON COSTS?
          </h2>
          <p className="text-lg text-gray-600">
            Find the time that works best for you & book a <span className="font-bold">FREE</span> discovery call today.
          </p>
        </div>

        <div className="space-y-8">
          {/* Top Section - Title & Info (Full Width) */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ocean Virtual Assistant Solutions
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-700 text-sm">
                <svg className="w-4 h-4 mr-2 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30 min</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <svg className="w-4 h-4 mr-2 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Video Call or Phone Call</span>
              </div>
            </div>
          </div>

          {/* Bottom Section - Calendar & Image (Horizontal) */}
          <div className="grid items-center" style={{ gridTemplateColumns: '70% 30%', gap: '16px' }}>
            {/* Left - Calendly Widget (70%) */}
            <div className="calendly-inline-widget" 
                 data-url="https://calendly.com/ocean-virtual-assistant/30min?hide_event_type_details=1&hide_gdpr_banner=1" 
                 style={{ minWidth: '320px', height: '500px' }}>
            </div>

            {/* Right - Image (30%) */}
            <div className="overflow-hidden rounded-lg aspect-square">
              <img 
                src="/images/booking-demo.png" 
                alt="Booking Demo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}