import React, { useState } from 'react'

export default function BookingDemo() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Phone call</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <p className="text-gray-700 text-sm mb-3">
                Book here to find out more about our services!
              </p>
              <p className="text-gray-700 text-sm">
                If you're currently looking for a virtual assistant position, please email:{' '}
                <a href="mailto:jointheteam@oceanvirtualassistant.com" className="text-ocean-600 hover:text-ocean-700 font-medium">
                  jointheteam@oceanvirtualassistant.com
                </a>
              </p>
            </div>

            <div className="bg-ocean-50 p-4 rounded-lg border border-ocean-200">
              <h4 className="font-bold text-ocean-900 mb-1 text-sm">📅 Demo Calendar</h4>
              <p className="text-xs text-ocean-800">
                This is a placeholder calendar. We'll integrate Calendly here soon.
              </p>
            </div>
          </div>

          {/* Bottom Section - Beautiful Calendar */}
          <div className="bg-gradient-to-br from-ocean-600 via-ocean-500 to-cyan-500 p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto">
            {/* Calendar Header */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-1">October 2025</h3>
              <p className="text-white/90 text-sm">Select a date and time</p>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-white/80 font-semibold text-xs">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => !item.isPrevMonth && setSelectedDate(item.day)}
                    disabled={item.isPrevMonth}
                    className={`
                      aspect-square rounded-md font-medium transition-all text-sm
                      ${
                        item.isPrevMonth
                          ? 'text-white/30 cursor-not-allowed'
                          : selectedDate === item.day
                          ? 'bg-white text-ocean-600 shadow-lg scale-105'
                          : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                      }
                    `}
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <h4 className="text-white font-bold mb-2 text-center text-sm">Available Time Slots</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-1.5 px-2 rounded-md font-medium text-xs transition-all
                      ${
                        selectedTime === time
                          ? 'bg-white text-ocean-600 shadow-lg scale-105'
                          : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Note */}
            <div className="mt-4 text-center">
              <p className="text-white/80 text-xs">
                📅 Demo Calendar - Replace with Calendly widget
              </p>
              {selectedDate && selectedTime && (
                <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <p className="text-white font-semibold text-sm">
                    Selected: October {selectedDate}, 2025 at {selectedTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}