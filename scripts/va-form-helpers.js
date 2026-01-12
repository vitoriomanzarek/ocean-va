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

