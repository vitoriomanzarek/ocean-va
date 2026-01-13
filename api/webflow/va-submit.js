/**
 * API Route: Submit VA Form to Webflow CMS
 * 
 * Handles form submission from Webflow custom code
 * Creates/updates VA items in Webflow CMS
 */

import 'dotenv/config';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';

/**
 * Field mapping: Form field names → Webflow CMS field slugs
 */
const FIELD_MAPPING = {
  // Basic Info
  name: 'name',
  slug: 'slug',
  'main-category': 'main-category',
  'mainCategory': 'main-category', // Support camelCase from form
  'main-categories': 'main-categories', // Multi-reference
  'experience-years': 'experience-years',
  'experienceYears': 'experience-years', // Support camelCase from form
  language: 'language', // Option field (Bilingual (EN-ES), English)
  availability: 'availability',
  
  // Multimedia
  video: 'video',
  image: 'image', // Image field
  
  // Content
  summary: 'summary',
  tagline: 'tagline',
  'thumbnail-description': 'thumbnail-description',
  'thumbnailDescription': 'thumbnail-description', // Support camelCase from form
  
  // Skills/Tools/Equipment (PlainText - comma-separated)
  'skills-tags': 'skills-tags',
  'skills': 'skills-tags', // Support form field name
  'tools-tags': 'tools-tags',
  'tools': 'tools-tags', // Support form field name
  'equipment-tags': 'equipment-tags',
  'equipment': 'equipment-tags', // Support form field name
  
  // Employment & Education (RichText - HTML)
  'employment-richtext': 'employment-richtext',
  'education-richtext': 'education-richtext',
  
  // DISC
  'disc-type': 'disc-type-2',
  'discType': 'disc-type-2', // Support camelCase from form
  'disc-description': 'disc-description',
  'discDescription': 'disc-description', // Support camelCase from form
  
  // English
  'english-score': 'english-score-2',
  'englishScore': 'english-score-2', // Support camelCase from form
  'english-description': 'english-description',
  'englishDescription': 'english-description', // Support camelCase from form
  'english-cefr-html': 'english-cefr-html', // RichText field for CEFR table HTML
  
  // Specializations (Multi-reference)
  specialization: 'specialization',
  'specializations': 'specialization', // Support form field name
};

/**
 * Make request to Webflow API
 */
async function webflowRequest(endpoint, method = 'GET', body = null) {
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('WEBFLOW_API_TOKEN not configured');
  }

  const url = `${WEBFLOW_API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Webflow API error: ${response.status} - ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Format form data for Webflow CMS API
 */
function formatDataForWebflow(formData) {
  const fieldData = {};

  // Map each field
  Object.keys(FIELD_MAPPING).forEach(formKey => {
    const webflowSlug = FIELD_MAPPING[formKey];
    const value = formData[formKey];

    // Skip empty values
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Handle multi-reference fields (convert to array format)
    if (['main-categories', 'specialization'].includes(webflowSlug)) {
      if (Array.isArray(value)) {
        fieldData[webflowSlug] = value; // Already array of IDs
      } else if (typeof value === 'string') {
        // If it's a comma-separated string, split it
        fieldData[webflowSlug] = value.split(',').map(id => id.trim()).filter(Boolean);
      }
    } else {
      fieldData[webflowSlug] = value;
    }
  });

  return { fieldData };
}

/**
 * Check if VA with slug already exists
 */
async function checkVAExists(slug) {
  try {
    const response = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items?filter=${encodeURIComponent(JSON.stringify({ field: 'slug', operator: 'equals', value: slug }))}`
    );
    return response.items && response.items.length > 0 ? response.items[0] : null;
  } catch (error) {
    console.error('Error checking VA existence:', error);
    return null;
  }
}

/**
 * Create new VA item in Webflow CMS
 */
async function createVAItem(data) {
  const formattedData = formatDataForWebflow(data);
  
  const response = await webflowRequest(
    `/collections/${VA_COLLECTION_ID}/items`,
    'POST',
    {
      ...formattedData,
      isArchived: false,
      isDraft: false,
    }
  );

  return response;
}

/**
 * Update existing VA item
 */
async function updateVAItem(itemId, data) {
  const formattedData = formatDataForWebflow(data);
  
  const response = await webflowRequest(
    `/collections/${VA_COLLECTION_ID}/items/${itemId}`,
    'PATCH',
    formattedData
  );

  return response;
}

/**
 * API Handler
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const formData = req.body;

    // Basic validation
    if (!formData.name || !formData.summary || !formData.tagline) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Name, summary, and tagline are required fields'
      });
    }

    // Ensure slug exists
    if (!formData.slug && formData.name) {
      // Generate slug from name (simple version, should match frontend logic)
      formData.slug = formData.name
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Check if VA already exists
    const existingVA = await checkVAExists(formData.slug);

    let result;
    if (existingVA) {
      // Update existing VA
      console.log(`Updating existing VA: ${existingVA.id}`);
      result = await updateVAItem(existingVA.id, formData);
      return res.status(200).json({
        success: true,
        action: 'updated',
        item: result,
        message: 'VA updated successfully'
      });
    } else {
      // Create new VA
      console.log(`Creating new VA: ${formData.slug}`);
      result = await createVAItem(formData);
      return res.status(201).json({
        success: true,
        action: 'created',
        item: result,
        message: 'VA created successfully'
      });
    }

  } catch (error) {
    console.error('Error processing VA form:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to process VA form submission'
    });
  }
}

