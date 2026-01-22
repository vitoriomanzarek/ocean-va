/**
 * API Route: Submit VA Form to Webflow CMS
 * 
 * Handles form submission from Webflow custom code
 * Creates/updates VA items in Webflow CMS
 * 
 * Last updated: 2025-01-XX
 */

import 'dotenv/config';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';
const MAIN_CATEGORIES_COLLECTION_ID = process.env.WEBFLOW_MAIN_CATEGORIES_COLLECTION_ID || '691f65ddf62cb29a405fc022';

/**
 * Field mapping: Form field names → Webflow CMS field slugs
 */
const FIELD_MAPPING = {
  // Basic Info
  name: 'name',
  slug: 'slug',
  'profile-slug-2': 'profile-slug-2', // Link field for profile URL
  'profileSlug': 'profile-slug-2', // Support camelCase from form
  'main-category': 'main-category',
  'mainCategory': 'main-category', // Support camelCase from form
  'main-categories': 'main-categories', // Multi-reference
  'experience-years': 'experience-years',
  'experienceYears': 'experience-years', // Support camelCase from form
  language: 'language', // Map to 'language' field (Option) - for filtering
  languages: 'languages', // PlainText field
  availability: 'availability',
  
  // Multimedia
  video: 'video',
  image: 'image', // Image field
  'video-thumbnail': 'video-thumbnail-2', // Webflow assigned -2 suffix
  'videoThumbnail': 'video-thumbnail-2', // Support camelCase from form
  
  // Content
  summary: 'summary',
  tagline: 'tagline',
  title: 'title-2', // Webflow field slug is title-2
  'title-2': 'title-2',
  'thumbnail-description': 'thumbnail-description',
  'thumbnailDescription': 'thumbnail-description', // Support camelCase from form
  
  // Skills/Tools/Equipment (PlainText - comma-separated) - kept for backward compatibility
  'skills-tags': 'skills-tags',
  'skills': 'skills-tags', // Support form field name
  'tools-tags': 'tools-tags',
  'tools': 'tools-tags', // Support form field name
  'equipment-tags': 'equipment-tags',
  'equipment': 'equipment-tags', // Support form field name
  
  // Skills/Tools/Equipment (RichText - HTML)
  'skills-richtext': 'skills-richtext',
  'skillsHtml': 'skills-richtext', // Support camelCase from form
  'tools-richtext': 'tools-richtext',
  'toolsHtml': 'tools-richtext', // Support camelCase from form
  'equipment-richtext': 'equipment-richtext',
  'equipmentHtml': 'equipment-richtext', // Support camelCase from form
  
  // Employment & Education (RichText - HTML)
  'employment-richtext': 'employment-richtext',
  'employment-summary': 'employment-summary',
  'employmentSummary': 'employment-summary', // Support camelCase from form
  'education-richtext': 'education-richtext',
  
  // DISC
  'disc-type': 'disc-type-2',
  'discType': 'disc-type-2', // Support camelCase from form
  'disc-description': 'disc-description',
  'discDescription': 'disc-description', // Support camelCase from form
  
  // English
  'english-test-type': 'type-of-english-test',
  'englishTestType': 'type-of-english-test', // Support camelCase from form
  'english-score': 'english-score-3', // Plain Text field (recreated field, Webflow assigned -3 suffix)
  'englishScore': 'english-score-3', // Support camelCase from form
  'english-description': 'english-description',
  'englishDescription': 'english-description', // Support camelCase from form
  'cerf-result': 'cerf-result',
  'cefrResult': 'cerf-result', // Support camelCase from form
  // Note: CEFR HTML goes to 'cerf-result' field (Rich text), not a separate field
  'cerf-result-html': 'cerf-result', // Map HTML to cerf-result Rich text field
  'cefrResultHtml': 'cerf-result', // Support camelCase from form
  'englishCefrHtml': 'cerf-result', // Support camelCase from form
  
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
  
  // Get response text first to see raw response
  const responseText = await response.text();
  
  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(responseText);
    } catch (e) {
      error = { message: responseText || response.statusText };
    }
    
    // Log complete error response
    console.error('=== WEBFLOW API ERROR ===');
    console.error('Status:', response.status);
    console.error('URL:', url);
    console.error('Method:', method);
    console.error('Request Body:', body ? JSON.stringify(body, null, 2) : 'No body');
    console.error('Response Text (raw):', responseText);
    console.error('Parsed Error:', JSON.stringify(error, null, 2));
    console.error('Error Keys:', Object.keys(error));
    if (error.errors) {
      console.error('Error Details Array:', JSON.stringify(error.errors, null, 2));
    }
    console.error('========================');
    
    const errorDetails = error.errors || error.message || error.msg || responseText || response.statusText;
    const errorMessage = typeof errorDetails === 'string' 
      ? errorDetails 
      : JSON.stringify(errorDetails, null, 2);
    
    // Create error object with details for proper handling
    const webflowError = new Error(`Webflow API error: ${response.status} - ${errorMessage}`);
    webflowError.status = response.status;
    webflowError.response = error;
    webflowError.responseText = responseText;
    throw webflowError;
  }

  return JSON.parse(responseText);
}

/**
 * Extract video ID from YouTube URL
 */
function extractVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Formatos soportados:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Generate YouTube thumbnail URL from video URL
 */
function generateVideoThumbnail(videoUrl) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) return null;
  
  // Usar hqdefault.jpg (480x360) - balance calidad/tamaño
  // Otros formatos disponibles: mqdefault (320x180), sddefault (640x480), maxresdefault (1280x720)
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Get Main Categories IDs from Webflow
 * Returns a Map of category name (lowercase) -> item ID
 */
let mainCategoriesCache = null;
async function getMainCategoriesIds() {
  // Use cache if available
  if (mainCategoriesCache) {
    return mainCategoriesCache;
  }

  try {
    const response = await webflowRequest(
      `/collections/${MAIN_CATEGORIES_COLLECTION_ID}/items`
    );
    
    const map = new Map();
    if (response.items && Array.isArray(response.items)) {
      response.items.forEach(item => {
        const name = item.fieldData?.name;
        if (name) {
          // Store by lowercase name for case-insensitive matching
          map.set(name.toLowerCase(), item.id);
          // Also store by slug if available
          if (item.fieldData?.slug) {
            map.set(item.fieldData.slug.toLowerCase(), item.id);
          }
        }
      });
    }
    
    mainCategoriesCache = map;
    return map;
  } catch (error) {
    console.error('Error fetching Main Categories:', error);
    // Return empty map on error
    return new Map();
  }
}

/**
 * Map category name to Main Categories IDs
 */
async function mapMainCategoryToIds(categoryName) {
  if (!categoryName) return [];
  
  const categoriesMap = await getMainCategoriesIds();
  const categoryId = categoriesMap.get(categoryName.toLowerCase());
  
  if (categoryId) {
    return [categoryId];
  } else {
    console.warn(`⚠️  Main Category not found: ${categoryName}`);
    return [];
  }
}

/**
 * Format form data for Webflow CMS API
 */
async function formatDataForWebflow(formData) {
  const fieldData = {};

  // Handle language field: send to both 'language' (Option) and 'languages' (PlainText)
  if (formData.language) {
    // Send to 'language' (Option field) for filtering
    fieldData['language'] = formData.language;
    // Also send to 'languages' (PlainText field) if not already set
    if (!formData.languages) {
      fieldData['languages'] = formData.language;
    }
  }
  
  // Add languages field if it exists (PlainText)
  if (formData.languages) {
    fieldData['languages'] = formData.languages;
  }

  // Handle Main Categories: map mainCategory to main-categories (multi-reference) using IDs
  if (formData.mainCategory) {
    const mainCategoriesIds = await mapMainCategoryToIds(formData.mainCategory);
    if (mainCategoriesIds.length > 0) {
      fieldData['main-categories'] = mainCategoriesIds;
    }
  }

  // Remove 'language' and 'mainCategory' from cleanedData to avoid duplicate mapping
  const cleanedData = { ...formData };
  delete cleanedData.language;
  delete cleanedData.mainCategory;

  // Handle video thumbnail: generate automatically if not provided
  // The field is now in FIELD_MAPPING, so if provided by form it will be mapped automatically
  // Here we generate it automatically if video exists but thumbnail doesn't
  if (cleanedData.video && !cleanedData['video-thumbnail'] && !cleanedData.videoThumbnail) {
    const thumbnailUrl = generateVideoThumbnail(cleanedData.video);
    if (thumbnailUrl) {
      // Add to cleanedData so it gets processed by FIELD_MAPPING
      cleanedData['video-thumbnail'] = thumbnailUrl;
      cleanedData.videoThumbnail = thumbnailUrl;
    }
  }

  // Handle cerf-result specially: use HTML if available, otherwise skip (don't send plain text)
  if (cleanedData.englishCefrHtml) {
    console.log('📤 Sending CEFR HTML to Webflow:', {
      htmlLength: cleanedData.englishCefrHtml.length,
      htmlPreview: cleanedData.englishCefrHtml.substring(0, 200) + '...'
    });
    fieldData['cerf-result'] = cleanedData.englishCefrHtml;
  } else {
    console.log('⚠️  No CEFR HTML found in form data');
  }

  // Map each field
  Object.keys(FIELD_MAPPING).forEach(formKey => {
    // Skip 'language' and 'mainCategory' fields - we handle them separately
    if (formKey === 'language' || formKey === 'mainCategory' || formKey === 'main-category') {
      return;
    }
    
    // Skip cerf-result and englishCefrHtml - we handle it above
    if (formKey === 'cerf-result' || formKey === 'cefrResult' || formKey === 'englishCefrHtml' || formKey === 'cefrResultHtml') {
      return;
    }
    
    const webflowSlug = FIELD_MAPPING[formKey];
    const value = cleanedData[formKey];

    // Skip empty values
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Handle multi-reference fields (convert to array format)
    // Note: main-categories is already handled above, so skip it here
    if (['specialization'].includes(webflowSlug)) {
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
 * Generate a unique slug by appending a number if the slug already exists
 */
async function generateUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await checkVAExists(slug);
    if (!existing) {
      return slug; // Slug is unique, return it
    }
    // Slug exists, try with a number suffix
    counter++;
    slug = `${baseSlug}-${counter}`;
    
    // Prevent infinite loop (safety check)
    if (counter > 1000) {
      // Use timestamp as fallback
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }
  
  return slug;
}

/**
 * Create new VA item in Webflow CMS
 */
async function createVAItem(data) {
  const { fieldData } = await formatDataForWebflow(data);
  
  const response = await webflowRequest(
    `/collections/${VA_COLLECTION_ID}/items`,
    'POST',
    {
      fieldData,
      isArchived: false,
      isDraft: false, // Publish automatically - no manual review required
    }
  );

  return response;
}

/**
 * Update existing VA item
 */
async function updateVAItem(itemId, data) {
  const { fieldData } = await formatDataForWebflow(data);
  
  // When updating, set as draft to require review
  const updateData = {
    fieldData,
    isDraft: true, // Update to draft - requires manual review before publishing
  };
  
  const response = await webflowRequest(
    `/collections/${VA_COLLECTION_ID}/items/${itemId}`,
    'PATCH',
    updateData
  );

  return response;
}

/**
 * API Handler
 */
export default async function handler(req, res) {
  // CORS headers
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174',
    'https://ocean-va.vercel.app',
    'https://www.oceanvirtualassistant.com'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    // Always create new VA (never update existing)
    // Note: If slug already exists, Webflow will reject with an error
    console.log(`Creating new VA with slug: ${formData.slug}`);
    const result = await createVAItem(formData);
    return res.status(201).json({
      success: true,
      action: 'created',
      item: result,
      message: 'VA created successfully'
    });

  } catch (error) {
    console.error('Error processing VA form:', error);
    console.error('Error stack:', error.stack);
    console.error('Form data received:', JSON.stringify(req.body, null, 2));
    
    // If it's a Webflow API validation error for video-thumbnail field, retry without it
    if (error.message && error.message.includes('Validation Error')) {
      const errorText = error.responseText || JSON.stringify(error.response || error.message);
      
      // Check if error is specifically about video-thumbnail field not existing
      if (errorText.includes('video-thumbnail') && 
          (errorText.includes('not described in schema') || errorText.includes('Field not described'))) {
        console.log('⚠️  video-thumbnail field not recognized by Webflow. Retrying without it...');
        
        try {
          // Remove video-thumbnail from formData and retry
          const formDataWithoutThumbnail = { ...req.body };
          delete formDataWithoutThumbnail['video-thumbnail'];
          delete formDataWithoutThumbnail.videoThumbnail;
          
          // Ensure slug exists
          if (!formDataWithoutThumbnail.slug && formDataWithoutThumbnail.name) {
            formDataWithoutThumbnail.slug = formDataWithoutThumbnail.name
              .toLowerCase()
              .trim()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
          }
          
          const result = await createVAItem(formDataWithoutThumbnail);
          return res.status(201).json({
            success: true,
            action: 'created',
            item: result,
            message: 'VA created successfully (video-thumbnail field not available in CMS)',
            warning: 'video-thumbnail field was omitted because it does not exist in Webflow CMS schema. Please verify the field slug in Webflow.'
          });
        } catch (retryError) {
          console.error('Error on retry without video-thumbnail:', retryError);
          // Continue to normal error handling
        }
      }
      
      // If error has response details, use those
      if (error.response && error.response.details) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Webflow API validation failed',
          details: error.response.details
        });
      }
      
      return res.status(400).json({
        error: 'Validation error',
        message: error.responseText || error.message || 'Webflow API validation failed',
        details: error.response ? error.response.details : undefined
      });
    }
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to process VA form submission'
    });
  }
}

