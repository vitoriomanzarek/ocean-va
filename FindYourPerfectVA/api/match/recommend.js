/**
 * API Endpoint: Get Recommendations
 * POST /api/match/recommend
 * 
 * Generates VA recommendations based on collected matching criteria
 */

import { rankVAs } from '../../../lib/matching.js';
import { generateRecommendationSummary } from '../../../lib/openai.js';
import { getVAs } from '../../../lib/webflow-sync.js';
import { getSession } from '../../../lib/session-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    // Get session
    const session = getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const userNeeds = session.matchingCriteria;

    if (!userNeeds || Object.keys(userNeeds).length === 0) {
      return res.status(400).json({ error: 'No matching criteria collected' });
    }

    // Get VAs (from cache or sync)
    const vas = await getVAs(false);

    if (!vas || vas.length === 0) {
      return res.status(500).json({ error: 'No Virtual Assistants available' });
    }

    // Rank VAs
    const ranked = rankVAs(vas, userNeeds);

    // Get top 3-5 recommendations
    const topMatches = ranked.slice(0, 5);

    if (topMatches.length === 0) {
      return res.status(200).json({
        sessionId,
        recommendations: [],
        summary: "We couldn't find perfect matches, but we can help you find the right VA. Please contact us for personalized assistance."
      });
    }

    // Generate summary using ChatGPT
    const summary = await generateRecommendationSummary(userNeeds, topMatches);

    // Format recommendations
    const recommendations = topMatches.map(match => ({
      va: {
        id: match.va.id,
        name: match.va.name,
        profileSlug: match.va.profileSlug,
        image: match.va.image,
        summary: match.va.summary,
        tagline: match.va.tagline,
        mainCategory: match.va.mainCategory
      },
      matchScore: match.matchScore,
      reasons: match.reasons,
      strengths: match.strengths
    }));

    return res.status(200).json({
      sessionId,
      recommendations,
      summary,
      totalMatches: ranked.length
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: error.message 
    });
  }
}

