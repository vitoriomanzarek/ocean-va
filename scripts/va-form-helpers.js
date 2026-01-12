/**
 * VA Form Helper Functions
 * Utility functions for VA form processing and HTML generation
 */

/**
 * Generate slug from name
 * @param {string} name - VA name
 * @returns {string} URL-friendly slug
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate structured HTML for employment history
 * @param {Array<Object>} employmentEntries - Array of employment objects
 * @returns {string} HTML string
 */
export function generateEmploymentHTML(employmentEntries) {
  if (!employmentEntries || employmentEntries.length === 0) {
    return '';
  }

  const entries = employmentEntries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    const description = entry.description || '';

    return `
      <div class="va-employment-entry">
        <h4 class="company">${company}</h4>
        <p class="position"><strong>${position}</strong></p>
        <p class="period">${period}</p>
        <div class="description">${description}</div>
      </div>
    `.trim();
  }).join('\n');

  return `<div class="va-employment-history">\n${entries}\n</div>`;
}

/**
 * Generate structured HTML for education
 * @param {Array<Object>} educationEntries - Array of education objects
 * @returns {string} HTML string
 */
export function generateEducationHTML(educationEntries) {
  if (!educationEntries || educationEntries.length === 0) {
    return '';
  }

  const entries = educationEntries.map(entry => {
    const school = escapeHtml(entry.school || '');
    const degree = escapeHtml(entry.degree || '');
    const year = escapeHtml(entry.year || '');

    return `
      <div class="va-education-entry">
        <h4 class="school">${school}</h4>
        <p class="degree"><strong>${degree}</strong></p>
        <p class="year">${year}</p>
      </div>
    `.trim();
  }).join('\n');

  return `<div class="va-education-history">\n${entries}\n</div>`;
}

/**
 * Generate HTML for skills/tools/equipment list
 * Converts comma-separated string or array to HTML list
 * @param {string|Array} items - Comma-separated string or array
 * @returns {string} HTML string
 */
export function generateListHTML(items) {
  if (!items) return '';

  // If it's already HTML, return as-is
  if (typeof items === 'string' && items.trim().startsWith('<')) {
    return items;
  }

  // Convert string to array if needed
  let itemsArray = [];
  if (typeof items === 'string') {
    itemsArray = items.split(',').map(item => item.trim()).filter(Boolean);
  } else if (Array.isArray(items)) {
    itemsArray = items.map(item => String(item).trim()).filter(Boolean);
  }

  if (itemsArray.length === 0) return '';

  const listItems = itemsArray.map(item => {
    const escaped = escapeHtml(item);
    return `    <li>${escaped}</li>`;
  }).join('\n');

  return `<ul class="va-list">\n${listItems}\n</ul>`;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Validate VA form data
 * @param {Object} data - Form data object
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
export function validateVAForm(data) {
  const errors = [];

  // Required fields
  if (!data.name || !data.name.trim()) {
    errors.push('Name is required');
  }

  if (!data.summary || !data.summary.trim()) {
    errors.push('Summary is required');
  }

  if (!data.tagline || !data.tagline.trim()) {
    errors.push('Tagline is required');
  }

  // Validate email format if provided
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate URL format if provided
  if (data.youtubeUrl && !isValidUrl(data.youtubeUrl)) {
    errors.push('Invalid YouTube URL format');
  }

  // Validate DISC type
  const validDISCTypes = ['D', 'I', 'S', 'C', 'D+I', 'S+I', 'S+C'];
  if (data.discType && !validDISCTypes.includes(data.discType)) {
    errors.push('Invalid DISC type');
  }

  // Validate English score
  const validEnglishScores = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  if (data.englishScore && !validEnglishScores.includes(data.englishScore)) {
    errors.push('Invalid English score');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if string is a valid URL
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format form data for Webflow CMS API
 * Maps form field names to CMS field slugs
 * @param {Object} formData - Raw form data
 * @returns {Object} Formatted data for Webflow API
 */
export function formatDataForWebflow(formData) {
  const fieldMapping = {
    // Basic Info
    name: 'name',
    slug: 'slug',
    mainCategory: 'main-category',
    experienceYears: 'experience-years',
    languages: 'languages',
    availability: 'availability',
    
    // Multimedia
    videoUrl: 'video',
    youtubeUrl: 'youtube-url',
    
    // Content
    summary: 'summary',
    tagline: 'tagline',
    thumbnailDescription: 'thumbnail-description',
    
    // Skills/Tools/Equipment (PlainText - comma-separated)
    skills: 'skills-tags',
    tools: 'tools-tags',
    equipment: 'equipment-tags',
    
    // Employment & Education (RichText - HTML)
    employmentHistory: 'employment-richtext',
    education: 'education-richtext',
    
    // DISC
    discType: 'disc-type-2',
    discDescription: 'disc-description',
    
    // English
    englishScore: 'english-score-2',
    englishDescription: 'english-description',
  };

  const webflowData = {
    fieldData: {}
  };

  // Map each field
  Object.keys(fieldMapping).forEach(formKey => {
    const webflowSlug = fieldMapping[formKey];
    const value = formData[formKey];

    if (value !== undefined && value !== null && value !== '') {
      webflowData.fieldData[webflowSlug] = value;
    }
  });

  // Handle special cases
  
  // Multi-reference fields (specializations, main-categories)
  if (formData.specializations && Array.isArray(formData.specializations)) {
    webflowData.fieldData['specialization'] = formData.specializations;
  }

  if (formData.mainCategories && Array.isArray(formData.mainCategories)) {
    webflowData.fieldData['main-categories'] = formData.mainCategories;
  }

  // Image handling (will need special processing)
  if (formData.image) {
    // Image will be handled separately via file upload
    webflowData.image = formData.image;
  }

  return webflowData;
}

/**
 * DISC Type descriptions
 * Pre-filled descriptions for each DISC personality type
 */
export const DISC_DESCRIPTIONS = {
  'D': 'Dominance (D) - Direct, decisive, and results-oriented. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
  'I': 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
  'C': 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
  'D+I': 'Dominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S+I': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
  'S+C': 'Steadiness (S) - Calm, patient, and service-oriented. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-focused and precise. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.'
};

/**
 * English Score descriptions
 * Pre-filled descriptions for each English proficiency level
 */
export const ENGLISH_DESCRIPTIONS = {
  'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details. Pronunciation is generally clear, and basic vocabulary is used effectively.',
  'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling. Pronunciation is understandable, with basic grammar and vocabulary.',
  'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages. Speaks clearly with good control of basic grammar and vocabulary. Pronunciation is generally clear, and ideas are communicated with confidence and coherence.',
  'B2': 'Can communicate confidently in a variety of academic and professional environments. Speaks confidently with clear pronunciation and well-structured, fluent speech. Uses a broad range of vocabulary and grammar to express ideas effectively in both casual and professional contexts.',
  'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes. Communicates with exceptional fluency and clarity, using natural pronunciation and smooth, well-structured speech. Demonstrates advanced vocabulary and precise grammar control, effectively expressing complex and nuanced ideas.',
  'C2': 'Can interact with ease and can differentiate their shades of meaning. Shows exceptional fluency and pronunciation with native-like accuracy and natural intonation. Uses a rich and precise vocabulary along with flawless grammar to express complex ideas effortlessly and with sophistication.'
};

/**
 * CEFR Level descriptions
 * Standard descriptions for Common European Framework of Reference
 */
const CEFR_DESCRIPTIONS = {
  'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details.',
  'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
  'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
  'B2': 'Can communicate confidently in a variety of academic and professional environments.',
  'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
  'C2': 'Can interact with ease and can differentiate their shades of meaning.'
};

/**
 * Generate CEFR HTML table
 * Creates HTML structure for CEFR levels with active level highlighted
 * @param {string} activeLevel - Active CEFR level (A1, A2, B1, B2, C1, C2)
 * @returns {string} HTML string
 */
export function generateCEFRHTML(activeLevel) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  const items = levels.map(level => {
    const isActive = level === activeLevel;
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    const description = CEFR_DESCRIPTIONS[level] || '';
    
    return `
        <div class="va-cefr-item">
          <div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div>
          <p class="va-cefr-description">${escapeHtml(description)}</p>
        </div>`;
  }).join('\n');

  return `<div class="va-cefr-grid">\n${items}\n      </div>`;
}

