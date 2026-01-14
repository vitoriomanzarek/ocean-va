import React, { useState, useEffect } from 'react'
import './VACreation.css'

// Constants
const API_ENDPOINT = 'https://ocean-va.vercel.app/api/webflow/va-submit'

const DISC_DESCRIPTIONS = {
  'D': 'Dominance (D) - Direct, decisive, and results-oriented. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
  'I': 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
  'C': 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
  'D+I': 'Dominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S+I': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S+C': 'Steadiness (S) - Calm, patient, and service-oriented. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-focused and precise. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.'
}

const ENGLISH_DESCRIPTIONS = {
  'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details. Pronunciation is generally clear, and basic vocabulary is used effectively.',
  'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling. Pronunciation is understandable, with basic grammar and vocabulary.',
  'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages. Speaks clearly with good control of basic grammar and vocabulary. Pronunciation is generally clear, and ideas are communicated with confidence and coherence.',
  'B2': 'Can communicate confidently in a variety of academic and professional environments. Speaks confidently with clear pronunciation and well-structured, fluent speech. Uses a broad range of vocabulary and grammar to express ideas effectively in both casual and professional contexts.',
  'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes. Communicates with exceptional fluency and clarity, using natural pronunciation and smooth, well-structured speech. Demonstrates advanced vocabulary and precise grammar control, effectively expressing complex and nuanced ideas.',
  'C2': 'Can interact with ease and can differentiate their shades of meaning. Shows exceptional fluency and pronunciation with native-like accuracy and natural intonation. Uses a rich and precise vocabulary along with flawless grammar to express complex ideas effortlessly and with sophistication.'
}

const CEFR_DESCRIPTIONS = {
  'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details.',
  'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
  'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
  'B2': 'Can communicate confidently in a variety of academic and professional environments.',
  'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
  'C2': 'Can interact with ease and can differentiate their shades of meaning.'
}

const MAIN_CATEGORIES = [
  'Executive Virtual Assistant',
  'Healthcare Virtual Assistant',
  'Insurance Virtual Assistant',
  'Marketing Virtual Assistant',
  'Mortgage Specialist'
]

const AVAILABILITY_OPTIONS = [
  'Full Time',
  'Part Time',
  'Assigned'
]

// Helper functions
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function escapeHtml(text) {
  if (typeof text !== 'string') return ''
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return ''
  
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '')
    const position = escapeHtml(entry.position || '')
    const period = escapeHtml(entry.period || '')
    const description = entry.description || ''
    
    return `
      <div class="va-employment-entry">
        <h4 class="company">${company}</h4>
        <p class="position"><strong>${position}</strong></p>
        <p class="period">${period}</p>
        <div class="description">${description}</div>
      </div>
    `.trim()
  }).join('\n')
}

function generateEducationHTML(entries) {
  if (!entries || entries.length === 0) return ''
  
  return entries.map(entry => {
    const school = escapeHtml(entry.school || '')
    const degree = escapeHtml(entry.degree || '')
    const year = escapeHtml(entry.year || '')
    
    return `
      <div class="va-education-entry">
        <h4 class="school">${school}</h4>
        <p class="degree"><strong>${degree}</strong></p>
        <p class="year">${year}</p>
      </div>
    `.trim()
  }).join('\n')
}

function generateCEFRHTML(activeLevel) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  
  const items = levels.map(level => {
    const isActive = level === activeLevel
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive'
    const description = CEFR_DESCRIPTIONS[level] || ''
    
    return `
      <div class="va-cefr-item">
        <div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div>
        <p class="va-cefr-description">${escapeHtml(description)}</p>
      </div>`
  }).join('\n')

  return `<div class="va-cefr-grid">\n${items}\n</div>`
}

export default function VACreation() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    mainCategory: '',
    experienceYears: '',
    language: '',
    availability: '',
    image: '',
    video: '',
    summary: '',
    tagline: '',
    thumbnailDescription: '',
    skills: '',
    tools: '',
    equipment: '',
    discType: '',
    discDescription: '',
    englishScore: '',
    englishDescription: '',
    englishCefrHtml: ''
  })

  const [employmentEntries, setEmploymentEntries] = useState([])
  const [educationEntries, setEducationEntries] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [showSuccess, setShowSuccess] = useState(false)

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.name) }))
    }
  }, [formData.name])

  // Auto-complete DISC description
  useEffect(() => {
    if (formData.discType && DISC_DESCRIPTIONS[formData.discType] && !formData.discDescription) {
      setFormData(prev => ({
        ...prev,
        discDescription: DISC_DESCRIPTIONS[prev.discType]
      }))
    }
  }, [formData.discType])

  // Generate CEFR HTML when English score changes (but don't auto-fill description)
  useEffect(() => {
    if (formData.englishScore) {
      const cefrHTML = generateCEFRHTML(formData.englishScore)
      setFormData(prev => ({ ...prev, englishCefrHtml: cefrHTML }))
    }
  }, [formData.englishScore])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addEmploymentEntry = () => {
    setEmploymentEntries(prev => [...prev, {
      id: Date.now(),
      company: '',
      position: '',
      period: '',
      description: ''
    }])
  }

  const updateEmploymentEntry = (id, field, value) => {
    setEmploymentEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  const removeEmploymentEntry = (id) => {
    setEmploymentEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const addEducationEntry = () => {
    setEducationEntries(prev => [...prev, {
      id: Date.now(),
      school: '',
      degree: '',
      year: ''
    }])
  }

  const updateEducationEntry = (id, field, value) => {
    setEducationEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  const removeEducationEntry = (id) => {
    setEducationEntries(prev => prev.filter(entry => entry.id !== id))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      // Prepare form data
      const submitData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        'main-category': formData.mainCategory,
        'experience-years': formData.experienceYears,
        language: formData.language,
        availability: formData.availability,
        image: formData.image,
        video: formData.video,
        summary: formData.summary,
        tagline: formData.tagline,
        'thumbnail-description': formData.thumbnailDescription,
        'skills-tags': formData.skills,
        'tools-tags': formData.tools,
        'equipment-tags': formData.equipment,
        'disc-type': formData.discType,
        'disc-description': formData.discDescription,
        'english-score': formData.englishScore,
        'english-description': formData.englishDescription,
        // Note: 'english-cefr-html' field does not exist in Webflow CMS - not sent
        'employment-richtext': generateEmploymentHTML(employmentEntries),
        'education-richtext': generateEducationHTML(educationEntries)
      }

      // Remove empty fields
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '' || submitData[key] === null || submitData[key] === undefined) {
          delete submitData[key]
        }
      })

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })

      const result = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setMessage({ 
          type: 'success', 
          text: `✅ ${result.message || 'VA created successfully!'} It has been saved as draft in Webflow CMS and is ready for review.` 
        })
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        // Log detailed error for debugging
        console.error('API Error Response:', result)
        let errorMessage = result.message || result.error || 'Error creating VA.'
        
        // Add validation error details if available
        if (result.details && Array.isArray(result.details)) {
          const validationErrors = result.details.map(d => `${d.param}: ${d.description}`).join(', ')
          errorMessage += ` Details: ${validationErrors}`
          console.error('Validation Errors:', result.details)
        }
        
        setMessage({ 
          type: 'error', 
          text: `❌ ${errorMessage}` 
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setMessage({ 
        type: 'error', 
        text: `❌ ${error.message || 'An error occurred. Please check your connection and try again.'}` 
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="va-form-wrapper">
      <div className="va-form-container">
        <header className="va-form-header">
          <h1 className="va-form-title">Add New Virtual Assistant</h1>
          <p className="va-form-subtitle">Complete all required fields to add a new VA to the system</p>
        </header>

        {message.text && (
          <div className={`va-form-message va-form-message-${message.type}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{message.text}</span>
              {message.type === 'success' && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: '',
                      slug: '',
                      mainCategory: '',
                      experienceYears: '',
                      language: '',
                      availability: '',
                      image: '',
                      video: '',
                      summary: '',
                      tagline: '',
                      thumbnailDescription: '',
                      skills: '',
                      tools: '',
                      equipment: '',
                      discType: '',
                      discDescription: '',
                      englishScore: '',
                      englishDescription: '',
                      englishCefrHtml: ''
                    })
                    setEmploymentEntries([])
                    setEducationEntries([])
                    setMessage({ type: '', text: '' })
                    setShowSuccess(false)
                  }}
                  style={{
                    marginLeft: '16px',
                    padding: '8px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Create Another VA
                </button>
              )}
              {message.type !== 'success' && (
                <button
                  type="button"
                  onClick={() => setMessage({ type: '', text: '' })}
                  style={{
                    marginLeft: '16px',
                    padding: '4px 8px',
                    background: 'transparent',
                    color: '#991b1b',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        <form className={`va-form ${isSubmitting ? 'va-form-submitting' : ''}`} onSubmit={handleSubmit}>
          {/* Basic Information */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">Basic Information</h2>
            
            <div className="va-form-row">
              <div className="va-form-field va-form-field-full">
                <label htmlFor="va-name" className="va-form-label">
                  Name <span className="va-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="va-name"
                  name="name"
                  className="va-form-input"
                  required
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="va-form-row">
              <div className="va-form-field">
                <label htmlFor="va-main-category" className="va-form-label">
                  Main Category
                </label>
                <select
                  id="va-main-category"
                  name="mainCategory"
                  className="va-form-select"
                  value={formData.mainCategory}
                  onChange={handleInputChange}
                >
                  <option value="">Select Main Category</option>
                  {MAIN_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="va-form-field">
                <label htmlFor="va-experience-years" className="va-form-label">
                  Experience (Years)
                </label>
                <input
                  type="text"
                  id="va-experience-years"
                  name="experienceYears"
                  className="va-form-input"
                  placeholder="e.g., 5+ years"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="va-form-row">
              <div className="va-form-field">
                <label htmlFor="va-language" className="va-form-label">
                  Language
                </label>
                <select
                  id="va-language"
                  name="language"
                  className="va-form-select"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option value="">Select Language</option>
                  <option value="Bilingual (EN-ES)">Bilingual (EN-ES)</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className="va-form-field">
                <label htmlFor="va-availability" className="va-form-label">
                  Availability
                </label>
                <select
                  id="va-availability"
                  name="availability"
                  className="va-form-select"
                  value={formData.availability}
                  onChange={handleInputChange}
                >
                  <option value="">Select Availability</option>
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="va-form-row">
              <div className="va-form-field">
                <label htmlFor="va-image" className="va-form-label">
                  Image URL
                </label>
                <input
                  type="url"
                  id="va-image"
                  name="image"
                  className="va-form-input"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                <small className="va-form-help">URL to the VA's profile image</small>
              </div>

              <div className="va-form-field">
                <label htmlFor="va-video" className="va-form-label">
                  Video URL
                </label>
                <input
                  type="url"
                  id="va-video"
                  name="video"
                  className="va-form-input"
                  placeholder="https://youtu.be/VIDEO_ID"
                  value={formData.video}
                  onChange={handleInputChange}
                />
                <small className="va-form-help">YouTube or video URL</small>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">Content</h2>
            
            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-summary" className="va-form-label">
                Summary <span className="va-form-required">*</span>
              </label>
              <textarea
                id="va-summary"
                name="summary"
                className="va-form-textarea"
                rows="6"
                required
                placeholder="Enter a comprehensive summary of the VA's background, skills, and experience..."
                value={formData.summary}
                onChange={handleInputChange}
              />
            </div>

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-tagline" className="va-form-label">
                Tagline <span className="va-form-required">*</span>
              </label>
              <input
                type="text"
                id="va-tagline"
                name="tagline"
                className="va-form-input"
                required
                placeholder="Short, compelling tagline (e.g., Expert Insurance Virtual Assistant)"
                value={formData.tagline}
                onChange={handleInputChange}
              />
            </div>

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-thumbnail-description" className="va-form-label">
                Thumbnail Description
              </label>
              <textarea
                id="va-thumbnail-description"
                name="thumbnailDescription"
                className="va-form-textarea"
                rows="3"
                placeholder="Brief description for card thumbnails..."
                value={formData.thumbnailDescription}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Skills, Tools & Equipment */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">Skills, Tools & Equipment</h2>
            
            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-skills" className="va-form-label">Skills</label>
              <input
                type="text"
                id="va-skills"
                name="skills"
                className="va-form-input"
                placeholder="Comma-separated list (e.g., Customer Service, Sales, Data Entry)"
                value={formData.skills}
                onChange={handleInputChange}
              />
              <small className="va-form-help">Separate multiple skills with commas</small>
            </div>

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-tools" className="va-form-label">Tools & Platforms</label>
              <input
                type="text"
                id="va-tools"
                name="tools"
                className="va-form-input"
                placeholder="Comma-separated list (e.g., Asana, Monday.com, Slack)"
                value={formData.tools}
                onChange={handleInputChange}
              />
              <small className="va-form-help">Separate multiple tools with commas</small>
            </div>

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-equipment" className="va-form-label">Equipment</label>
              <input
                type="text"
                id="va-equipment"
                name="equipment"
                className="va-form-input"
                placeholder="Comma-separated list (e.g., Laptop, Headset, Monitor)"
                value={formData.equipment}
                onChange={handleInputChange}
              />
              <small className="va-form-help">Separate multiple items with commas</small>
            </div>
          </section>

          {/* Employment History */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">Employment History</h2>
            <p className="va-form-section-description">Add one or more employment entries</p>
            
            <div className="va-form-dynamic-entries">
              {employmentEntries.map(entry => (
                <div key={entry.id} className="va-dynamic-entry">
                  <div className="va-dynamic-entry-header">
                    <h3 className="va-dynamic-entry-title">Employment Entry</h3>
                    <button
                      type="button"
                      className="va-dynamic-entry-remove"
                      onClick={() => removeEmploymentEntry(entry.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="va-dynamic-entry-fields">
                    <div className="va-form-row">
                      <div className="va-form-field">
                        <label className="va-form-label">Company</label>
                        <input
                          type="text"
                          className="va-form-input"
                          placeholder="Company Name"
                          value={entry.company}
                          onChange={(e) => updateEmploymentEntry(entry.id, 'company', e.target.value)}
                        />
                      </div>
                      <div className="va-form-field">
                        <label className="va-form-label">Position</label>
                        <input
                          type="text"
                          className="va-form-input"
                          placeholder="Job Title"
                          value={entry.position}
                          onChange={(e) => updateEmploymentEntry(entry.id, 'position', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="va-form-field va-form-field-full">
                      <label className="va-form-label">Period</label>
                      <input
                        type="text"
                        className="va-form-input"
                        placeholder="e.g., 2020 - 2023"
                        value={entry.period}
                        onChange={(e) => updateEmploymentEntry(entry.id, 'period', e.target.value)}
                      />
                    </div>
                    <div className="va-form-field va-form-field-full">
                      <label className="va-form-label">Description</label>
                      <textarea
                        className="va-form-textarea"
                        rows="4"
                        placeholder="Responsibilities and achievements..."
                        value={entry.description}
                        onChange={(e) => updateEmploymentEntry(entry.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              className="va-form-btn-secondary"
              onClick={addEmploymentEntry}
            >
              + Add Employment Entry
            </button>
          </section>

          {/* Education */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">Education</h2>
            <p className="va-form-section-description">Add one or more education entries</p>
            
            <div className="va-form-dynamic-entries">
              {educationEntries.map(entry => (
                <div key={entry.id} className="va-dynamic-entry">
                  <div className="va-dynamic-entry-header">
                    <h3 className="va-dynamic-entry-title">Education Entry</h3>
                    <button
                      type="button"
                      className="va-dynamic-entry-remove"
                      onClick={() => removeEducationEntry(entry.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="va-dynamic-entry-fields">
                    <div className="va-form-row">
                      <div className="va-form-field">
                        <label className="va-form-label">School</label>
                        <input
                          type="text"
                          className="va-form-input"
                          placeholder="School Name"
                          value={entry.school}
                          onChange={(e) => updateEducationEntry(entry.id, 'school', e.target.value)}
                        />
                      </div>
                      <div className="va-form-field">
                        <label className="va-form-label">Degree</label>
                        <input
                          type="text"
                          className="va-form-input"
                          placeholder="Degree/Certification"
                          value={entry.degree}
                          onChange={(e) => updateEducationEntry(entry.id, 'degree', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="va-form-field va-form-field-full">
                      <label className="va-form-label">Year</label>
                      <input
                        type="text"
                        className="va-form-input"
                        placeholder="e.g., 2020"
                        value={entry.year}
                        onChange={(e) => updateEducationEntry(entry.id, 'year', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              className="va-form-btn-secondary"
              onClick={addEducationEntry}
            >
              + Add Education Entry
            </button>
          </section>

          {/* DISC Assessment */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">DISC Assessment</h2>
            
            <div className="va-form-row">
              <div className="va-form-field">
                <label htmlFor="va-disc-type" className="va-form-label">
                  DISC Type
                </label>
                <select
                  id="va-disc-type"
                  name="discType"
                  className="va-form-select"
                  value={formData.discType}
                  onChange={handleInputChange}
                >
                  <option value="">Select DISC Type</option>
                  <option value="D">D</option>
                  <option value="I">I</option>
                  <option value="S">S</option>
                  <option value="C">C</option>
                  <option value="D+I">D+I</option>
                  <option value="S+I">S+I</option>
                  <option value="S+C">S+C</option>
                </select>
              </div>
            </div>

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-disc-description" className="va-form-label">
                DISC Description
              </label>
              <textarea
                id="va-disc-description"
                name="discDescription"
                className="va-form-textarea"
                rows="4"
                placeholder="Describe the VA's DISC profile..."
                value={formData.discDescription}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* English Proficiency */}
          <section className="va-form-section">
            <h2 className="va-form-section-title">English Proficiency</h2>
            
            <div className="va-form-row">
              <div className="va-form-field">
                <label htmlFor="va-english-score" className="va-form-label">
                  English Score
                </label>
                <select
                  id="va-english-score"
                  name="englishScore"
                  className="va-form-select"
                  value={formData.englishScore}
                  onChange={handleInputChange}
                >
                  <option value="">Select English Level</option>
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper-Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                  <option value="C2">C2 - Proficient</option>
                </select>
              </div>
            </div>

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-english-description" className="va-form-label">
                English Description
              </label>
              <textarea
                id="va-english-description"
                name="englishDescription"
                className="va-form-textarea"
                rows="4"
                placeholder="Describe the VA's English proficiency..."
                value={formData.englishDescription}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Form Actions */}
          <section className="va-form-section va-form-actions">
            <div className="va-form-actions-container">
              <button
                type="button"
                className="va-form-btn-secondary"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
              <button
                type="submit"
                className="va-form-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Submit & Create VA'}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

