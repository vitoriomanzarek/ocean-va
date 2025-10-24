import React, { useState } from 'react'

// This is a backup of the original BookingDemo component
// Replaced with Calendly integration on 2025-10-23
// To restore, rename this file to BookingDemo.jsx

export default function BookingDemoOriginal() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  // Generate calendar days for October 2025
  const generateCalendarDays = () => {
    const days = []
    // Previous month days (29, 30)
    days.push({ day: 29, isPrevMonth: true })
    days.push({ day: 30, isPrevMonth: true })
    // Current month days (1-31)
    for (let i = 1; i <= 31; i++) {
      days.push({ day: i, isPrevMonth: false })
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <section id="booking" className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            READY TO SAVE ON TIME & UP TO 70% ON COSTS?
          </h2>
          <p className="text-lg text-gray-600">
            Find the time that works best for you & book a <span className="font-bold">FREE</span> discovery call today.
          </p>
        </div>

        <div className="space-y-8">
          {/* Top Section - Booking Info */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ocean Virtual Assistant Solutions
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700 text-sm">
                <svg className="w-4 h-4 mr-2 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30 min</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <svg className="w-4 h-4 mr-2 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Zoom Meeting</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Select a Date & Time</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="font-medium">October 2025</span>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="py-1">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map(({day, isPrevMonth}, i) => (
                      <button
                        key={i}
                        onClick={() => !isPrevMonth && setSelectedDate(day)}
                        className={`py-2 rounded-full text-sm ${
                          isPrevMonth ? 'text-gray-300' : 
                          selectedDate === day ? 'bg-ocean-600 text-white' : 
                          'text-gray-700 hover:bg-gray-100'
                        }`}
                        disabled={isPrevMonth}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Time Slots */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((time, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 text-sm rounded-md border ${
                          selectedTime === time 
                            ? 'bg-ocean-600 text-white border-ocean-600' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                    selectedDate && selectedTime ? 'bg-ocean-600 hover:bg-ocean-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Schedule Event
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Contact Info */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center text-sm text-gray-500">
              <p>Can't find a time that works for you?</p>
              <p className="mt-1">
                Email us at{' '}
                <a href="mailto:info@oceanva.com" className="text-ocean-600 hover:underline">
                  info@oceanva.com
                </a>{' '}
                and we'll find a time that works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
