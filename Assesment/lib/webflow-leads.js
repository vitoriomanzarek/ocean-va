/**
 * Webflow Leads Integration
 * Saves quiz results to Webflow CMS as leads
 */

/**
 * Save quiz result to Webflow CMS
 * @param {Object} quizData - Complete quiz data
 * @returns {Promise<Object>} Created item from Webflow
 */
export async function saveQuizResultToWebflow(quizData) {
  const {
    contact,
    answers,
    scores,
    profile,
    savings
  } = quizData;

  // Get environment variables
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  const siteId = process.env.WEBFLOW_SITE_ID;
  const collectionId = process.env.WEBFLOW_LEADS_COLLECTION_ID;

  // Log configuration status (without exposing sensitive data)
  console.log('🔍 Webflow API Configuration:', {
    hasApiToken: !!apiToken,
    hasSiteId: !!siteId,
    hasCollectionId: !!collectionId,
    siteId: siteId || 'NOT SET',
    collectionId: collectionId || 'NOT SET'
  });

  if (!apiToken || !siteId || !collectionId) {
    const missing = [];
    if (!apiToken) missing.push('WEBFLOW_API_TOKEN');
    if (!siteId) missing.push('WEBFLOW_SITE_ID');
    if (!collectionId) missing.push('WEBFLOW_LEADS_COLLECTION_ID');
    throw new Error(`Webflow API credentials not configured. Missing: ${missing.join(', ')}`);
  }

  // Prepare data for Webflow CMS
  // Note: Field slugs use kebab-case (e.g., 'operational-score' not 'operational_score')
  const webflowData = {
    fieldData: {
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      industry: contact.industry || '',
      
      // Scores (using kebab-case slugs)
      'operational-score': scores.operational || 0,
      'intent-score': scores.intent || 0,
      'urgency-score': scores.urgency || 0,
      
      // Profile
      profile: profile.profile || 'D',
      'profile-name': profile.name || 'ICE COLD',
      priority: profile.priority || 4,
      action: profile.action || 'passive-nurture',
      
      // Savings (using kebab-case slugs)
      'current-cost': savings.currentCost || 0,
      'va-cost': savings.vaCost || 0,
      'monthly-savings': savings.monthlySavings || 0,
      'annual-savings': savings.annualSavings || 0,
      
      // Answers (as JSON string)
      answers: JSON.stringify(answers),
      
      // Timestamp (using kebab-case slug)
      'submitted-at': new Date().toISOString()
    }
  };

  // Create item in Webflow CMS with timeout
  const timeout = 30000; // 30 seconds timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = `https://api.webflow.com/v2/sites/${siteId}/collections/${collectionId}/items`;
    
    console.log('📤 Sending request to Webflow API:', {
      url: `https://api.webflow.com/v2/sites/${siteId}/collections/${collectionId}/items`,
      method: 'POST',
      email: contact.email,
      profile: profile.profile
    });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept-Version': '1.0.0'
      },
      body: JSON.stringify(webflowData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Webflow API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        url: url
      });
      throw new Error(`Webflow API error: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    console.log('✅ Webflow API Success:', {
      itemId: result.id || result._id,
      email: contact.email
    });
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle network errors specifically
    if (error.name === 'AbortError') {
      throw new Error('Network timeout: Request to Webflow API took too long (>30s). Please check your internet connection.');
    }
    
    // Handle other network errors
    if (error.message.includes('fetch failed') || 
        error.message.includes('ECONNREFUSED') || 
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('ENOTFOUND') ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND') {
      throw new Error(`Network connection error: Unable to connect to Webflow API. ${error.message}. Please check your internet connection.`);
    }
    
    // Re-throw other errors (including HTTP errors)
    throw error;
  }
}

/**
 * Save quiz result to local JSON file (for development/backup)
 * @param {Object} quizData - Complete quiz data
 * @returns {Promise<Object>} Saved data with ID
 */
export async function saveQuizResultToLocal(quizData) {
  // This would save to a local file or simple database
  // For now, just return the data with a timestamp
  return {
    id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...quizData,
    savedAt: new Date().toISOString()
  };
}

export default {
  saveQuizResultToWebflow,
  saveQuizResultToLocal
};
