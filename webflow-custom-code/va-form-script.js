/**
 * VA Form Custom Code for Webflow
 * 
 * Instructions:
 * 1. Add this script to your Webflow page in Page Settings > Custom Code > Footer Code
 * 2. Make sure the form has proper IDs/classes matching this script
 * 3. Update the API endpoint URL to match your serverless function
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiEndpoint: 'https://ocean-va.vercel.app/api/webflow/va-submit', // Vercel endpoint
    formSelector: '#va-form', // Update to match your form ID
    debug: true // Set to false in production
  };

  // Helper Functions
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[VA Form]', ...args);
    }
  }

  function showError(message) {
    // You can customize this to show errors in your UI
    alert('Error: ' + message);
    log('Error:', message);
  }

  function showSuccess(message) {
    // You can customize this to show success in your UI
    alert('Success: ' + message);
    log('Success:', message);
  }

  /**
   * Generate slug from name
   */
  function generateSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Generate HTML for employment history
   */
  function generateEmploymentHTML(entries) {
    if (!entries || entries.length === 0) return '';

    return entries.map(entry => {
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
  }

  /**
   * Generate HTML for education
   */
  function generateEducationHTML(entries) {
    if (!entries || entries.length === 0) return '';

    return entries.map(entry => {
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
  }

  function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * DISC Type descriptions
   */
  const DISC_DESCRIPTIONS = {
    'D': 'Dominance (D) - Direct, decisive, and results-oriented. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
    'I': 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    'S': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    'C': 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    'D+I': 'Dominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    'S+I': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    'S+C': 'Steadiness (S) - Calm, patient, and service-oriented. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-focused and precise. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    'S+D': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nDominance (D) - Direct, decisive, and results-oriented. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.'
  };

  /**
   * English Score descriptions
   */
  const ENGLISH_DESCRIPTIONS = {
    'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details. Pronunciation is generally clear, and basic vocabulary is used effectively.',
    'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling. Pronunciation is understandable, with basic grammar and vocabulary.',
    'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages. Speaks clearly with good control of basic grammar and vocabulary. Pronunciation is generally clear, and ideas are communicated with confidence and coherence.',
    'B2': 'Can communicate confidently in a variety of academic and professional environments. Speaks confidently with clear pronunciation and well-structured, fluent speech. Uses a broad range of vocabulary and grammar to express ideas effectively in both casual and professional contexts.',
    'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes. Communicates with exceptional fluency and clarity, using natural pronunciation and smooth, well-structured speech. Demonstrates advanced vocabulary and precise grammar control, effectively expressing complex and nuanced ideas.',
    'C2': 'Can interact with ease and can differentiate their shades of meaning. Shows exceptional fluency and pronunciation with native-like accuracy and natural intonation. Uses a rich and precise vocabulary along with flawless grammar to express complex ideas effortlessly and with sophistication.'
  };

  /**
   * CEFR Level descriptions
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
   */
  function generateCEFRHTML(activeLevel) {
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

    return `<div class="va-cefr-grid">\n${items}\n</div>`;
  }

  // Make functions available to class
  window.VAFormHelpers = {
    generateEmploymentHTML,
    generateEducationHTML,
    generateSlug,
    escapeHtml,
    generateCEFRHTML
  };

  /**
   * VA Form Manager
   */
  class VAFormManager {
    constructor(formElement) {
      this.form = formElement;
      this.employmentEntries = [];
      this.educationEntries = [];
      this.init();
    }

    init() {
      log('Initializing VA Form Manager');

      // Auto-generate slug from name
      const nameInput = this.form.querySelector('[name="name"]');
      const slugInput = this.form.querySelector('[name="slug"]');
      if (nameInput && slugInput) {
        nameInput.addEventListener('input', () => {
          if (!slugInput.value || slugInput.dataset.autoGenerated === 'true') {
            slugInput.value = window.VAFormHelpers.generateSlug(nameInput.value);
            slugInput.dataset.autoGenerated = 'true';
          }
        });
      }

      // Initialize employment history section
      this.initEmploymentSection();
      
      // Initialize education section
      this.initEducationSection();

      // Initialize auto-complete features
      this.initAutoComplete();

      // Handle form submission
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    initEmploymentSection() {
      const addBtn = this.form.querySelector('#add-employment');
      const container = this.form.querySelector('#employment-entries');
      const hiddenInput = this.form.querySelector('#employment-richtext');

      if (!addBtn || !container || !hiddenInput) {
        log('Employment section elements not found');
        return;
      }

      addBtn.addEventListener('click', () => this.addEmploymentEntry(container, hiddenInput));
    }

    initEducationSection() {
      const addBtn = this.form.querySelector('#add-education');
      const container = this.form.querySelector('#education-entries');
      const hiddenInput = this.form.querySelector('#education-richtext');

      if (!addBtn || !container || !hiddenInput) {
        log('Education section elements not found');
        return;
      }

      addBtn.addEventListener('click', () => this.addEducationEntry(container, hiddenInput));
    }

    initAutoComplete() {
      // Auto-complete DISC Description
      const discTypeSelect = this.form.querySelector('#va-disc-type');
      const discDescriptionTextarea = this.form.querySelector('#va-disc-description');
      
      if (discTypeSelect && discDescriptionTextarea) {
        discTypeSelect.addEventListener('change', (e) => {
          const selectedType = e.target.value;
          if (selectedType && DISC_DESCRIPTIONS[selectedType]) {
            // Only auto-fill if textarea is empty or user confirms
            if (!discDescriptionTextarea.value.trim()) {
              discDescriptionTextarea.value = DISC_DESCRIPTIONS[selectedType];
              log('Auto-filled DISC description for:', selectedType);
            }
          }
        });
      }

      // Auto-complete English Description and generate CEFR HTML
      const englishScoreSelect = this.form.querySelector('#va-english-score');
      const englishDescriptionTextarea = this.form.querySelector('#va-english-description');
      const englishCefrHtmlInput = this.form.querySelector('#va-english-cefr-html');
      
      if (englishScoreSelect) {
        englishScoreSelect.addEventListener('change', (e) => {
          const selectedScore = e.target.value;
          
          // Auto-fill English Description
          if (englishDescriptionTextarea && selectedScore && ENGLISH_DESCRIPTIONS[selectedScore]) {
            if (!englishDescriptionTextarea.value.trim()) {
              englishDescriptionTextarea.value = ENGLISH_DESCRIPTIONS[selectedScore];
              log('Auto-filled English description for:', selectedScore);
            }
          }
          
          // Generate CEFR HTML
          if (englishCefrHtmlInput && selectedScore) {
            const cefrHTML = generateCEFRHTML(selectedScore);
            englishCefrHtmlInput.value = cefrHTML;
            log('Generated CEFR HTML for:', selectedScore);
          }
        });
      }
    }

    addEmploymentEntry(container, hiddenInput) {
      const entryId = 'emp-' + Date.now();
      const entryHTML = `
        <div class="va-dynamic-entry" data-entry-id="${entryId}">
          <div class="va-dynamic-entry-header">
            <h3 class="va-dynamic-entry-title">Employment Entry</h3>
            <button type="button" class="va-dynamic-entry-remove" data-remove-entry="${entryId}">Remove</button>
          </div>
          <div class="va-dynamic-entry-fields">
            <div class="va-form-row">
              <div class="va-form-field">
                <label class="va-form-label">Company</label>
                <input type="text" name="emp-company-${entryId}" class="va-form-input" placeholder="Company Name" required>
              </div>
              <div class="va-form-field">
                <label class="va-form-label">Position</label>
                <input type="text" name="emp-position-${entryId}" class="va-form-input" placeholder="Job Title" required>
              </div>
            </div>
            <div class="va-form-field va-form-field-full">
              <label class="va-form-label">Period</label>
              <input type="text" name="emp-period-${entryId}" class="va-form-input" placeholder="e.g., 2020 - 2023" required>
            </div>
            <div class="va-form-field va-form-field-full">
              <label class="va-form-label">Description</label>
              <textarea name="emp-description-${entryId}" class="va-form-textarea" rows="4" placeholder="Responsibilities and achievements..."></textarea>
            </div>
          </div>
        </div>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = entryHTML;
      const entryElement = tempDiv.firstElementChild;
      container.appendChild(entryElement);

      // Add remove handler
      const removeBtn = entryElement.querySelector('[data-remove-entry]');
      removeBtn.addEventListener('click', () => {
        entryElement.remove();
        this.updateEmploymentHTML(hiddenInput);
      });

      // Add input handlers to update HTML
      entryElement.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => this.updateEmploymentHTML(hiddenInput));
      });
    }

    addEducationEntry(container, hiddenInput) {
      const entryId = 'edu-' + Date.now();
      const entryHTML = `
        <div class="va-dynamic-entry" data-entry-id="${entryId}">
          <div class="va-dynamic-entry-header">
            <h3 class="va-dynamic-entry-title">Education Entry</h3>
            <button type="button" class="va-dynamic-entry-remove" data-remove-entry="${entryId}">Remove</button>
          </div>
          <div class="va-dynamic-entry-fields">
            <div class="va-form-row">
              <div class="va-form-field">
                <label class="va-form-label">School</label>
                <input type="text" name="edu-school-${entryId}" class="va-form-input" placeholder="School Name" required>
              </div>
              <div class="va-form-field">
                <label class="va-form-label">Degree</label>
                <input type="text" name="edu-degree-${entryId}" class="va-form-input" placeholder="Degree/Certification" required>
              </div>
            </div>
            <div class="va-form-field va-form-field-full">
              <label class="va-form-label">Year</label>
              <input type="text" name="edu-year-${entryId}" class="va-form-input" placeholder="e.g., 2020" required>
            </div>
          </div>
        </div>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = entryHTML;
      const entryElement = tempDiv.firstElementChild;
      container.appendChild(entryElement);

      // Add remove handler
      const removeBtn = entryElement.querySelector('[data-remove-entry]');
      removeBtn.addEventListener('click', () => {
        entryElement.remove();
        this.updateEducationHTML(hiddenInput);
      });

      // Add input handlers to update HTML
      entryElement.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => this.updateEducationHTML(hiddenInput));
      });
    }

    updateEmploymentHTML(hiddenInput) {
      const entries = [];
      const entryElements = this.form.querySelectorAll('[data-entry-id^="emp-"]');

      entryElements.forEach(element => {
        const entryId = element.dataset.entryId;
        entries.push({
          company: element.querySelector(`[name="emp-company-${entryId}"]`)?.value || '',
          position: element.querySelector(`[name="emp-position-${entryId}"]`)?.value || '',
          period: element.querySelector(`[name="emp-period-${entryId}"]`)?.value || '',
          description: element.querySelector(`[name="emp-description-${entryId}"]`)?.value || ''
        });
      });

      hiddenInput.value = window.VAFormHelpers.generateEmploymentHTML(entries);
    }

    updateEducationHTML(hiddenInput) {
      const entries = [];
      const entryElements = this.form.querySelectorAll('[data-entry-id^="edu-"]');

      entryElements.forEach(element => {
        const entryId = element.dataset.entryId;
        entries.push({
          school: element.querySelector(`[name="edu-school-${entryId}"]`)?.value || '',
          degree: element.querySelector(`[name="edu-degree-${entryId}"]`)?.value || '',
          year: element.querySelector(`[name="edu-year-${entryId}"]`)?.value || ''
        });
      });

      hiddenInput.value = window.VAFormHelpers.generateEducationHTML(entries);
    }

    collectFormData() {
      const formData = new FormData(this.form);
      const data = {};

      // Collect all form fields
      for (const [key, value] of formData.entries()) {
        // Skip employment/education individual fields (already processed to HTML)
        if (key.startsWith('emp-') || key.startsWith('edu-')) continue;
        
        // Convert camelCase field names to kebab-case for API compatibility
        const apiKey = this.convertToKebabCase(key);
        data[apiKey] = value;
      }

      // Ensure slug is set
      if (!data.slug && data.name) {
        data.slug = window.VAFormHelpers.generateSlug(data.name);
      }

      return data;
    }

    /**
     * Convert camelCase to kebab-case
     * e.g., "discType" -> "disc-type", "englishScore" -> "english-score"
     */
    convertToKebabCase(str) {
      return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    async handleSubmit(e) {
      e.preventDefault();
      log('Form submission started');

      const formData = this.collectFormData();
      log('Form data collected:', formData);

      // Basic validation
      if (!formData.name || !formData.summary || !formData.tagline) {
        showError('Please fill in all required fields');
        return;
      }

      // Show loading state
      const submitBtn = this.form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';

      try {
        const response = await fetch(CONFIG.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to save VA');
        }

        const result = await response.json();
        log('Success:', result);
        showSuccess('VA saved successfully!');
        
        // Reset form or redirect
        // this.form.reset();
        // window.location.href = '/admin/vas'; // Adjust as needed

      } catch (error) {
        log('Error:', error);
        showError(error.message || 'An error occurred while saving');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const form = document.querySelector(CONFIG.formSelector);
    if (form) {
      new VAFormManager(form);
      log('VA Form Manager initialized');
    } else {
      log('Form not found:', CONFIG.formSelector);
    }
  }

})();

