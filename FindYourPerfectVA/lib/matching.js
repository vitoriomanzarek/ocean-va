/**
 * Matching Algorithm
 * Scores and ranks Virtual Assistants based on user needs
 */

/**
 * Calculate match score for a VA based on user needs
 * @param {Object} va - Virtual Assistant profile
 * @param {Object} userNeeds - User's requirements
 * @returns {number} Match score (0-100)
 */
export function calculateMatchScore(va, userNeeds) {
  let score = 0;
  const maxScore = 100;

  // 1. Industry/Category Match (Required - 0 or 30 points)
  if (userNeeds.industry) {
    const vaCategory = va.mainCategory?.toLowerCase() || '';
    const userIndustry = userNeeds.industry.toLowerCase();
    
    if (vaCategory.includes(userIndustry) || userIndustry.includes(vaCategory)) {
      score += 30;
    } else {
      // If industry doesn't match, significantly reduce score
      score -= 20;
    }
  }

  // 2. Specializations Match (20 points per match, max 40)
  if (userNeeds.tasks && Array.isArray(userNeeds.tasks) && userNeeds.tasks.length > 0) {
    const vaSpecializations = (va.specializations || []).map(s => s.toLowerCase());
    const userTasks = userNeeds.tasks.map(t => t.toLowerCase());
    
    let specializationMatches = 0;
    userTasks.forEach(task => {
      vaSpecializations.forEach(spec => {
        if (spec.includes(task) || task.includes(spec)) {
          specializationMatches++;
        }
      });
    });
    
    score += Math.min(specializationMatches * 20, 40);
  }

  // 3. Tools Match (15 points per match, max 30)
  if (userNeeds.tools && Array.isArray(userNeeds.tools) && userNeeds.tools.length > 0) {
    const vaTools = (va.tools || []).map(t => t.toLowerCase());
    const userTools = userNeeds.tools.map(t => t.toLowerCase());
    
    let toolMatches = 0;
    userTools.forEach(tool => {
      vaTools.forEach(vaTool => {
        if (vaTool.includes(tool) || tool.includes(vaTool)) {
          toolMatches++;
        }
      });
    });
    
    score += Math.min(toolMatches * 15, 30);
  }

  // 4. Experience Level Match (10-30 points)
  if (userNeeds.experienceLevel) {
    const vaExperience = parseFloat(va.experienceYears) || 0;
    const levelRanges = {
      junior: [0, 2],
      mid: [2, 5],
      senior: [5, Infinity]
    };
    
    const range = levelRanges[userNeeds.experienceLevel.toLowerCase()];
    if (range) {
      if (vaExperience >= range[0] && vaExperience < range[1]) {
        score += 30;
      } else if (Math.abs(vaExperience - (range[0] + range[1]) / 2) < 2) {
        score += 20;
      } else {
        score += 10;
      }
    }
  }

  // 5. Language Match (Required - 0 or 15 points)
  if (userNeeds.languages && Array.isArray(userNeeds.languages)) {
    const vaLanguages = (va.languages || []).map(l => l.toLowerCase());
    const userLanguages = userNeeds.languages.map(l => l.toLowerCase());
    
    const hasMatch = userLanguages.some(lang => 
      vaLanguages.some(vaLang => vaLang.includes(lang) || lang.includes(vaLang))
    );
    
    if (hasMatch) {
      score += 15;
    } else {
      score -= 10; // Penalty for language mismatch
    }
  }

  // 6. Availability Match (Required - 0 or 10 points)
  if (userNeeds.availability) {
    if (va.availability?.toLowerCase() === userNeeds.availability.toLowerCase()) {
      score += 10;
    } else {
      score -= 5; // Small penalty for availability mismatch
    }
  }

  // 7. DISC Personality Match (5-15 points)
  if (userNeeds.discPreference && va.discType) {
    const vaDisc = va.discType.toUpperCase();
    const userDisc = userNeeds.discPreference.toUpperCase();
    
    if (vaDisc === userDisc) {
      score += 15;
    } else if (vaDisc.includes(userDisc) || userDisc.includes(vaDisc)) {
      score += 10;
    } else {
      score += 5; // Partial match
    }
  }

  // 8. English Level Match (10-20 points)
  if (userNeeds.englishLevel && va.englishLevel) {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const vaLevelIndex = levels.indexOf(va.englishLevel.toUpperCase());
    const userLevelIndex = levels.indexOf(userNeeds.englishLevel.toUpperCase());
    
    if (vaLevelIndex >= userLevelIndex) {
      score += 20; // VA meets or exceeds requirement
    } else if (vaLevelIndex >= userLevelIndex - 1) {
      score += 10; // Close match
    }
  }

  // 9. Keyword Match in Summary (5 points per keyword, max 15)
  if (userNeeds.notes && va.summary) {
    const keywords = extractKeywords(userNeeds.notes);
    const summaryLower = va.summary.toLowerCase();
    
    let keywordMatches = 0;
    keywords.forEach(keyword => {
      if (summaryLower.includes(keyword.toLowerCase())) {
        keywordMatches++;
      }
    });
    
    score += Math.min(keywordMatches * 5, 15);
  }

  // Normalize score to 0-100 range
  score = Math.max(0, Math.min(100, score));

  return Math.round(score);
}

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @returns {Array<string>} Keywords
 */
function extractKeywords(text) {
  // Simple keyword extraction - can be enhanced with NLP
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  return words.filter(word => word.length > 3 && !stopWords.includes(word));
}

/**
 * Generate match reasons for a VA
 * @param {Object} va - Virtual Assistant profile
 * @param {Object} userNeeds - User's requirements
 * @param {number} score - Match score
 * @returns {Array<string>} Array of reason strings
 */
export function generateMatchReasons(va, userNeeds, score) {
  const reasons = [];

  // Industry match
  if (userNeeds.industry && va.mainCategory) {
    reasons.push(`Matches your industry: ${va.mainCategory}`);
  }

  // Specializations
  if (userNeeds.tasks && va.specializations) {
    const matchingSpecs = va.specializations.filter(spec => {
      const specLower = spec.toLowerCase();
      return userNeeds.tasks.some(task => 
        specLower.includes(task.toLowerCase()) || task.toLowerCase().includes(specLower)
      );
    });
    
    if (matchingSpecs.length > 0) {
      reasons.push(`Has expertise in: ${matchingSpecs.slice(0, 2).join(', ')}`);
    }
  }

  // Tools
  if (userNeeds.tools && va.tools) {
    const matchingTools = va.tools.filter(tool => {
      const toolLower = tool.toLowerCase();
      return userNeeds.tools.some(userTool => 
        toolLower.includes(userTool.toLowerCase()) || userTool.toLowerCase().includes(toolLower)
      );
    });
    
    if (matchingTools.length > 0) {
      reasons.push(`Experienced with: ${matchingTools.slice(0, 2).join(', ')}`);
    }
  }

  // Experience
  if (va.experienceYears) {
    reasons.push(`${va.experienceYears} of experience`);
  }

  // English level
  if (va.englishLevel) {
    reasons.push(`English level: ${va.englishLevel}`);
  }

  return reasons;
}

/**
 * Rank VAs by match score
 * @param {Array<Object>} vas - Array of Virtual Assistants
 * @param {Object} userNeeds - User's requirements
 * @returns {Array<Object>} Ranked VAs with scores and reasons
 */
export function rankVAs(vas, userNeeds) {
  const scored = vas.map(va => {
    const score = calculateMatchScore(va, userNeeds);
    const reasons = generateMatchReasons(va, userNeeds, score);
    
    return {
      va,
      matchScore: score,
      reasons,
      strengths: va.specializations?.slice(0, 3) || []
    };
  });

  // Sort by score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  // Filter out very low scores (< 30)
  return scored.filter(item => item.matchScore >= 30);
}

