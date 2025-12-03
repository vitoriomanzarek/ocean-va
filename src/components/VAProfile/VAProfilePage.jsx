import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Monitor, Headphones, ChevronDown } from 'lucide-react'
import CompletedTrainingCourses from './CompletedTrainingCourses'

export default function VAProfilePage({ vaData }) {
  const [showVideo, setShowVideo] = React.useState(false)
  const [showCTAMenu, setShowCTAMenu] = React.useState(false)
  
  return (
    <div className="min-h-screen pb-32" style={{
      background: 'linear-gradient(to bottom, #0B9B8F 0%, #067A8F 25%, #045C8B 50%, #034563 75%, #011F2A 100%)'
    }}>
      {/* Back to VAs Link */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/our-vas" className="flex items-center text-white hover:text-gray-200 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to VAs
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Row - Image and Info */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch mb-8">
            {/* Left - Image */}
            <div className="flex justify-center">
              <div className="w-72 h-full rounded-3xl p-4 shadow-2xl border-4 border-teal-500" style={{ backgroundColor: '#E6E6E6', minHeight: '320px', aspectRatio: '7/8' }}>
                <img
                  src={vaData.image}
                  alt={vaData.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right - Info */}
            <div className="text-white bg-white bg-opacity-10 p-6 rounded-lg">
              <h1 className="text-4xl font-bold mb-1 tracking-wider">{vaData.name}</h1>
              <p className="text-sm mb-4 opacity-90 tracking-widest">{vaData.title}</p>
              <p className="text-sm leading-relaxed mb-4">{vaData.summary}</p>

              {/* Skills Tags */}
              {vaData.skills && (
                <div className="flex flex-wrap gap-2">
                  {vaData.skills.map((skill, idx) => (
                    <span key={idx} className="text-teal-900 font-bold px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#E9DBA3' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - Tools, Equipment, and Video */}
          <div className="bg-white bg-opacity-10 p-8 rounded-lg">
            <div className={`grid ${vaData.tools.length > 6 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8 mb-8 items-start`}>
              {/* Tools */}
              <div className={vaData.tools.length > 6 ? 'md:col-span-2' : ''}>
                <h3 className="font-bold text-lg mb-4 text-white uppercase">TOOLS</h3>
                {vaData.tools.length > 6 ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {vaData.tools.map((tool, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="mr-2 text-white">✓</span>
                        <span className="text-sm text-white">{tool}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm text-white">
                    {vaData.tools.map((tool, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Equipment */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-white uppercase">EQUIPMENT</h3>
                <ul className="space-y-3 text-sm text-white">
                  {vaData.equipment.map((item, idx) => {
                    const getIcon = (equipmentName) => {
                      if (equipmentName.toLowerCase().includes('monitor')) {
                        return <Monitor size={20} className="text-white" />
                      } else if (equipmentName.toLowerCase().includes('headset') || equipmentName.toLowerCase().includes('headphones')) {
                        return <Headphones size={20} className="text-white" />
                      }
                      return <span className="text-white">✓</span>
                    }
                    
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          {getIcon(item)}
                        </div>
                        <span>{item}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {/* Video */}
              {vaData.videoThumbnail && (
                <div 
                  onClick={() => setShowVideo(true)}
                  className="w-full h-52 bg-cover bg-center rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  style={{ backgroundImage: `url(${vaData.videoThumbnail})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-white mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span className="text-xs text-white">CLICK HERE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail */}
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <p className="text-sm text-white">{vaData.thumbnail}</p>
            </div>

            {/* Tagline Box */}
            {vaData.tagline && (
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 rounded-lg mt-6">
                <p className="text-white font-semibold leading-relaxed text-sm">{vaData.tagline}</p>
              </div>
            )}

            {/* Video Modal */}
            {showVideo && vaData.videoUrl && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowVideo(false)}>
                <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setShowVideo(false)}
                    className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300"
                  >
                    ✕
                  </button>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full rounded-lg"
                      src={vaData.videoUrl}
                      title="VA Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Completed Training Courses Section */}
      {vaData.education?.certifications && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <CompletedTrainingCourses courses={vaData.education.certifications} />
          </div>
        </section>
      )}

      {/* Employment History Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">EMPLOYMENT HISTORY</h2>
          <p className="text-white mb-8 leading-relaxed">{vaData.employmentSummary}</p>

          {/* Jobs */}
          <div className="space-y-4">
            {vaData.employmentHistory.map((job, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 p-6 rounded-lg border-l-4 border-teal-300">
                <h3 className="text-teal-200 font-bold text-lg">{job.company}</h3>
                <p className="text-teal-100 font-semibold">{job.position}</p>
                <p className="text-teal-100 text-sm mb-2">{job.period}</p>
                <p className="text-white text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personality & Skills Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Row - DISC and English Test */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* DISC */}
            <div className="text-center text-white">
              <div className="text-6xl font-bold text-yellow-300 mb-4">{vaData.discResult}</div>
              <h3 className="text-xl font-bold mb-4">DISC PERSONALITY RESULT</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">{vaData.discResultDescription || vaData.discResult}</p>
            </div>

            {/* English Test */}
            <div className="text-center text-white">
              <div className="text-6xl font-bold text-yellow-300 mb-4">{vaData.englishScore}</div>
              <h3 className="text-xl font-bold mb-4">EF ENGLISH TEST RESULT</h3>
              <p className="text-sm leading-relaxed">{vaData.englishDescription}</p>
            </div>
          </div>

          {/* Bottom Row - CEFR */}
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-16 uppercase">COMMON EUROPEAN FRAMEWORK OF REFERENCE FOR LANGUAGES (CEFR)</h3>
            
            {/* Desktop Version - Circles and Descriptions */}
            <div className="hidden md:block">
              {/* Circles and Descriptions Container */}
              <div className="flex justify-center items-end gap-6 mb-12 h-80">
                {vaData.cefr.map((level, idx) => {
                  const heightPixels = [80, 110, 150, 170, 210, 240]
                  const widthPixels = [80, 90, 110, 120, 130, 150]
                  const bgColor = level.active ? 'bg-teal-900' : 'bg-teal-300'
                  const textColor = level.active ? 'text-white' : 'text-teal-900'
                  
                  return (
                    <div key={idx} className="flex flex-col items-center" style={{ width: `${widthPixels[idx] + 20}px` }}>
                      {/* Circle */}
                      <div
                        style={{
                          height: `${heightPixels[idx]}px`,
                          width: `${widthPixels[idx]}px`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        className={`${bgColor} rounded-full font-bold text-lg ${textColor} shadow-lg flex-shrink-0`}
                      >
                        {level.label}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Descriptions Row */}
              <div className="flex justify-center gap-6 mb-12">
                {vaData.cefr.map((level, idx) => {
                  const widthPixels = [80, 90, 110, 120, 130, 150]
                  return (
                    <div key={idx} style={{ width: `${widthPixels[idx] + 20}px` }} className="text-center">
                      <p className="text-xs text-white leading-tight">{level.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Mobile Version - Circles Only */}
            <div className="md:hidden">
              <div className="flex justify-center items-end gap-1 mb-8 h-48">
                {vaData.cefr.map((level, idx) => {
                  const heightPixels = [40, 50, 65, 75, 90, 105]
                  const widthPixels = [32, 38, 48, 54, 64, 74]
                  const bgColor = level.active ? 'bg-teal-900' : 'bg-teal-300'
                  const textColor = level.active ? 'text-white' : 'text-teal-900'
                  
                  return (
                    <div
                      key={idx}
                      style={{
                        height: `${heightPixels[idx]}px`,
                        width: `${widthPixels[idx]}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                      className={`${bgColor} rounded-full font-bold text-xs ${textColor} shadow-lg`}
                    >
                      {level.label}
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex justify-center gap-8 md:gap-32 text-white font-bold mt-8">
              <div className="text-center">
                <p className="text-xs md:text-sm tracking-widest">BEGINNER</p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm tracking-widest">INTERMEDIATE</p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm tracking-widest">ADVANCED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">EDUCATION</h2>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg mb-6">
            <h3 className="text-white font-bold text-lg mb-2">{vaData.education.school}</h3>
            <p className="text-teal-100 font-semibold">{vaData.education.degree}</p>
            <p className="text-teal-100 text-sm">{vaData.education.date}</p>
          </div>

        </div>
      </section>

      {/* CTA Section - Sticky Footer */}
      <section className="fixed bottom-0 left-0 right-0 py-4 px-4 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Version - All buttons visible */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            <a
              href="/our-vas"
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-6 py-2 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Insurance Virtual Assistants
            </a>
            <a
              href="/ovas-executive-admin-virtual-assistant"
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-6 py-2 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Executive / Admin VAs
            </a>
          </div>
          
          {/* Mobile Version - Dropdown Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setShowCTAMenu(!showCTAMenu)}
              className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-6 py-2 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              VA Categories
              <ChevronDown 
                size={16} 
                className={`transition-transform ${showCTAMenu ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Dropdown Menu Items */}
            {showCTAMenu && (
              <div className="absolute bottom-16 left-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
                <a
                  href="/our-vas"
                  onClick={() => setShowCTAMenu(false)}
                  className="block w-full text-center bg-white hover:bg-gray-50 text-ocean-600 font-bold px-6 py-2 text-sm transition-all duration-200 border-b border-gray-200"
                >
                  Insurance Virtual Assistants
                </a>
                <a
                  href="/ovas-executive-admin-virtual-assistant"
                  onClick={() => setShowCTAMenu(false)}
                  className="block w-full text-center bg-white hover:bg-gray-50 text-ocean-600 font-bold px-6 py-2 text-sm transition-all duration-200"
                >
                  Executive / Admin VAs
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
