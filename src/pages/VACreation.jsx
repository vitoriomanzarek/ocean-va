import React, { useState, useEffect } from 'react'
import './VACreation.css'
import FieldHelpTooltip from '../components/FieldHelpTooltip'

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
    title: '',
    image: '',
    video: '',
    summary: '',
    tagline: '',
    thumbnailDescription: '',
    skills: '',
    tools: '',
    equipment: [],
    employmentSummary: '',
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
  const [imagePreview, setImagePreview] = useState(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' })
      return
    }

    // Validate file size (max 1MB)
    const maxSize = 1 * 1024 * 1024 // 1MB
    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'File size exceeds 1MB limit. Please upload a smaller image.' })
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to Webflow
    setIsUploadingImage(true)
    setMessage({ type: '', text: '' })

    try {
      // Convert file to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Upload to our API endpoint
      const response = await fetch('https://ocean-va.vercel.app/api/webflow/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file: base64,
          fileName: file.name,
          mimeType: file.type
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to upload image')
      }

      const result = await response.json()
      
      // Update form data with the Webflow CDN URL
      setFormData(prev => ({ ...prev, image: result.url }))
      setMessage({ type: 'success', text: 'Image uploaded successfully to Webflow!' })
      
    } catch (error) {
      console.error('Error uploading image:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to upload image. Please try again.' })
      setImagePreview(null)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleEquipmentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
    setFormData(prev => ({ ...prev, equipment: selectedOptions }))
  }

  const addEquipmentItem = (item) => {
    if (!formData.equipment.includes(item)) {
      setFormData(prev => ({ ...prev, equipment: [...prev.equipment, item] }))
    }
  }

  const removeEquipmentItem = (item) => {
    setFormData(prev => ({ ...prev, equipment: prev.equipment.filter(e => e !== item) }))
  }

  const EQUIPMENT_OPTIONS = [
    'Noise-Cancelling Headset',
    'One-Monitor Setup',
    'Three-Monitor Setup',
    'Two-Monitor Setup'
  ]

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
        title: formData.title,
        image: formData.image,
        video: formData.video,
        summary: formData.summary,
        tagline: formData.tagline,
        'thumbnail-description': formData.thumbnailDescription,
        'skills-tags': formData.skills,
        'tools-tags': formData.tools,
        'equipment-tags': Array.isArray(formData.equipment) ? formData.equipment.join(', ') : formData.equipment,
        'employment-summary': formData.employmentSummary,
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
                      title: '',
                      image: '',
                      video: '',
                      summary: '',
                      tagline: '',
                      thumbnailDescription: '',
                      skills: '',
                      tools: '',
                      equipment: [],
                      employmentSummary: '',
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
                    setImagePreview(null)
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

            <div className="va-form-field va-form-field-full">
              <label htmlFor="va-title" className="va-form-label">
                Title
                <FieldHelpTooltip
                  fieldName="Title"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-name">MAXIMILIANO</div>
                      <div class="diagram-box diagram-highlight">
                        BILINGUAL VA |<br/>
                        INSURANCE VIRTUAL<br/>
                        ASSISTANT
                      </div>
                      <div class="diagram-box" style="margin-top: 8px; opacity: 0.6;">
                        Summary text appears here...
                      </div>
                    </div>
                  `}
                  example="BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT"
                />
              </label>
              <input
                type="text"
                id="va-title"
                name="title"
                className="va-form-input"
                placeholder="e.g., BILINGUAL VA | INSURANCE VIRTUAL ASSISTANT"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="va-form-row">
              <div className="va-form-field">
                <label htmlFor="va-image" className="va-form-label">
                  Profile Image
                  <FieldHelpTooltip
                    fieldName="Profile Image"
                    diagram={`
                      <div class="diagram-page">
                        <div class="diagram-name">MAXIMILIANO</div>
                        <div style="display: flex; justify-content: center; margin: 16px 0;">
                          <div style="width: 80px; height: 80px; border-radius: 50%; background: #E6E6E6; border: 2px solid rgba(255,255,255,0.3);"></div>
                        </div>
                        <div class="diagram-box" style="opacity: 0.6;">
                          Circular image with transparent background
                        </div>
                      </div>
                    `}
                    example="📋 Image Requirements: Format: WEBP | Size: Less than 200 KB | Name: Same as VA name (e.g., maximiliano.webp) | Format: Circular with #E6E6E6 background | Outer circle: Transparent"
                  />
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="va-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="va-image-preview-remove"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData(prev => ({ ...prev, image: '' }))
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* File Input */}
                <div className="va-image-upload-wrapper">
                  <input
                    type="file"
                    id="va-image"
                    name="image"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    className="va-form-file-input"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                  />
                  <label htmlFor="va-image" className={`va-form-file-label ${isUploadingImage ? 'uploading' : ''}`}>
                    {isUploadingImage ? (
                      <>
                        <span className="va-upload-spinner">⏳</span>
                        Uploading to Webflow...
                      </>
                    ) : imagePreview ? (
                      'Change Image'
                    ) : (
                      'Choose Image to Upload'
                    )}
                  </label>
                </div>

                {/* Current Image URL (if set) */}
                {formData.image && !imagePreview && (
                  <div className="va-image-url-display">
                    <small className="va-form-help">Current: {formData.image}</small>
                    <button
                      type="button"
                      className="va-image-url-clear"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    >
                      Clear
                    </button>
                  </div>
                )}

                <small className="va-form-help">
                  Upload image (JPEG, PNG, GIF, WebP - Max 1MB). Image will be uploaded to Webflow Assets.
                </small>
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
                <FieldHelpTooltip
                  fieldName="Summary"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-name">MAXIMILIANO</div>
                      <div class="diagram-title">BILINGUAL VA | INSURANCE</div>
                      <div class="diagram-box diagram-highlight">
                        Maximiliano is a bilingual Virtual Assistant with solid experience in customer service, sales assistance, and insurance support...
                      </div>
                      <div style="margin-top: 8px;">
                        <span class="diagram-tag">Insurance</span>
                        <span class="diagram-tag">Sales</span>
                        <span class="diagram-tag">Quoting</span>
                      </div>
                    </div>
                  `}
                  example="Maximiliano is a bilingual Virtual Assistant (English–Spanish) with solid experience in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries."
                />
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
                <FieldHelpTooltip
                  fieldName="Tagline"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-grid">
                        <div class="diagram-column">TOOLS</div>
                        <div class="diagram-column">EQUIPMENT</div>
                        <div class="diagram-column">VIDEO</div>
                      </div>
                      <div class="diagram-box" style="margin-top: 12px; opacity: 0.6;">
                        Thumbnail Description appears here...
                      </div>
                      <div class="diagram-box diagram-highlight" style="margin-top: 12px;">
                        Maximiliano is an excellent Virtual Assistant for insurance agencies who can support sales operations, client communication, and daily administrative tasks...
                      </div>
                    </div>
                  `}
                  example="Maximiliano is an excellent Virtual Assistant for insurance agencies who can support sales operations, client communication, and daily administrative tasks with reliability and efficiency."
                />
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
                <FieldHelpTooltip
                  fieldName="Thumbnail Description"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-grid">
                        <div class="diagram-column">TOOLS</div>
                        <div class="diagram-column">EQUIPMENT</div>
                        <div class="diagram-column">VIDEO</div>
                      </div>
                      <div class="diagram-box diagram-highlight" style="margin-top: 12px;">
                        4 yrs of Insurance Experience, COMMERCIAL INSURANCE, Personal & Commercial Lines, Quote Generation...
                      </div>
                      <div class="diagram-box" style="margin-top: 12px; opacity: 0.6;">
                        Tagline appears here...
                      </div>
                    </div>
                  `}
                  example="4 yrs of Insurance Experience, COMMERCIAL INSURANCE, Personal & Commercial Lines, Quote Generation, Payment Assistance"
                />
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
              <label htmlFor="va-skills" className="va-form-label">
                Skills
                <FieldHelpTooltip
                  fieldName="Skills"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-box" style="opacity: 0.6; margin-bottom: 12px;">
                        Summary text appears here...
                      </div>
                      <div style="margin-top: 8px;">
                        <span class="diagram-tag">Insurance Sales</span>
                        <span class="diagram-tag">Personal Lines</span>
                        <span class="diagram-tag">Quoting</span>
                        <span class="diagram-tag">Lead Follow</span>
                        <span class="diagram-tag">Order Placement</span>
                      </div>
                    </div>
                  `}
                  example="Insurance Sales Assistance, Personal and Commercial Lines, Quoting, Lead Follow-Up, Order Placement & Tracking, E-Signature Coordination"
                />
              </label>
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
              <label htmlFor="va-tools" className="va-form-label">
                Tools & Platforms
                <FieldHelpTooltip
                  fieldName="Tools"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-grid">
                        <div class="diagram-column diagram-highlight">
                          <div style="font-weight: 600; margin-bottom: 6px;">TOOLS</div>
                          <div style="font-size: 10px;">✓ CRM</div>
                          <div style="font-size: 10px;">✓ EZLynx</div>
                          <div style="font-size: 10px;">✓ Turbo</div>
                        </div>
                        <div class="diagram-column" style="opacity: 0.6;">
                          EQUIPMENT
                        </div>
                        <div class="diagram-column" style="opacity: 0.6;">
                          VIDEO
                        </div>
                      </div>
                    </div>
                  `}
                  example="CRM, EZLynx, TurboRater, Applied Epic, Microsoft Office"
                />
              </label>
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
              <label htmlFor="va-equipment" className="va-form-label">
                Equipment
                <FieldHelpTooltip
                  fieldName="Equipment"
                  diagram={`
                    <div class="diagram-page">
                      <div class="diagram-grid">
                        <div class="diagram-column" style="opacity: 0.6;">
                          TOOLS
                        </div>
                        <div class="diagram-column diagram-highlight">
                          <div style="font-weight: 600; margin-bottom: 6px;">EQUIPMENT</div>
                          <div style="font-size: 10px;">Monitor</div>
                          <div style="font-size: 10px;">Headset</div>
                        </div>
                        <div class="diagram-column" style="opacity: 0.6;">
                          VIDEO
                        </div>
                      </div>
                    </div>
                  `}
                  example="Two-Monitor Setup, Noise-Cancelling Headset"
                />
              </label>
              
              {/* Selected Equipment Chips */}
              <div className="va-equipment-chips">
                {formData.equipment.length > 0 ? (
                  formData.equipment.map((item, index) => (
                    <span key={index} className="va-equipment-chip">
                      {item}
                      <button
                        type="button"
                        className="va-equipment-chip-remove"
                        onClick={() => removeEquipmentItem(item)}
                        aria-label={`Remove ${item}`}
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="va-equipment-placeholder">No equipment selected</span>
                )}
              </div>

              {/* Equipment Options Menu */}
              <div className="va-equipment-menu">
                <label className="va-equipment-menu-label">Select equipment to add:</label>
                <div className="va-equipment-options">
                  {EQUIPMENT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`va-equipment-option ${formData.equipment.includes(option) ? 'selected' : ''}`}
                      onClick={() => addEquipmentItem(option)}
                      disabled={formData.equipment.includes(option)}
                    >
                      {option}
                      {formData.equipment.includes(option) && <span className="va-equipment-check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
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

            <div className="va-form-field va-form-field-full" style={{ marginTop: '32px' }}>
              <label htmlFor="va-employment-summary" className="va-form-label">
                Employment Summary
                <FieldHelpTooltip
                  fieldName="Employment Summary"
                  diagram={`
                    <div class="diagram-page">
                      <div style="font-weight: 600; margin-bottom: 8px; font-size: 12px;">EMPLOYMENT SUMMARY</div>
                      <div class="diagram-box diagram-highlight">
                        Maximiliano has over 4 years of experience in customer service, sales assistance, and insurance support...
                      </div>
                      <div style="font-weight: 600; margin-top: 16px; margin-bottom: 8px; font-size: 12px; opacity: 0.7;">EMPLOYMENT HISTORY</div>
                      <div class="diagram-box" style="opacity: 0.6;">
                        Accordion entries appear here...
                      </div>
                    </div>
                  `}
                  example="Maximiliano has over 4 years of experience in customer service, sales assistance, and insurance support for U.S.-based organizations. He has worked remotely with companies in Texas, supporting customers through phone-based assistance, order management, lead follow-ups, and insurance-related inquiries."
                />
              </label>
              <textarea
                id="va-employment-summary"
                name="employmentSummary"
                className="va-form-textarea"
                rows={4}
                placeholder="Enter employment summary..."
                value={formData.employmentSummary}
                onChange={handleInputChange}
              />
            </div>
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
                <FieldHelpTooltip
                  fieldName="English Score"
                  diagram={`
                    <div class="diagram-page">
                      <div style="font-weight: 600; margin-bottom: 12px; font-size: 12px;">ASSESSMENT RESULTS</div>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <div class="diagram-box" style="opacity: 0.6;">
                          <div style="font-size: 10px; font-weight: 600;">DISC</div>
                          <div style="font-size: 10px;">[I+D]</div>
                        </div>
                        <div class="diagram-box diagram-highlight">
                          <div style="font-size: 10px; font-weight: 600;">ENGLISH</div>
                          <div style="font-size: 10px;">[100/C1]</div>
                        </div>
                      </div>
                      <div class="diagram-box" style="margin-top: 12px; opacity: 0.6; font-size: 10px;">
                        CEFR table appears below...
                      </div>
                    </div>
                  `}
                  example="C1, B2, 100/C1, or custom format"
                />
                </label>
                <input
                  type="text"
                  id="va-english-score"
                  name="englishScore"
                  className="va-form-input"
                  placeholder="e.g., C1, B2, A1, or custom score"
                  value={formData.englishScore}
                  onChange={handleInputChange}
                />
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

