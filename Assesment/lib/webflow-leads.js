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

  if (!apiToken || !siteId || !collectionId) {
    throw new Error('Webflow API credentials not configured');
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

  // Create item in Webflow CMS
  const response = await fetch(
    `https://api.webflow.com/v2/sites/${siteId}/collections/${collectionId}/items`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept-Version': '1.0.0'
      },
      body: JSON.stringify(webflowData)
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Webflow API error: ${response.status} - ${errorData}`);
  }

  const result = await response.json();
  return result;
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
