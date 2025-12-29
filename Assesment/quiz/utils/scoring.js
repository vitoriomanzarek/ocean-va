/**
 * Ocean VA Operational Efficiency Scorecard
 * Scoring System - Based on ScoreApp methodology
 */

/**
 * Calculate Operational Maturity Score (0-10)
 * From Best Practices Questions (Q5-Q14)
 */
export function calculateOperationalScore(answers) {
  let score = 0;
  
  // Q5-Q14: Best Practices Questions
  const bestPracticeQuestions = [
    'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14'
  ];
  
  bestPracticeQuestions.forEach(qKey => {
    const answer = answers[qKey];
    if (answer === 'yes') {
      score += 1.0;
    } else if (answer === 'sometimes') {
      score += 0.5;
    }
    // 'no' = 0 points
  });
  
  // Special handling for reverse score questions
  // Q13 (losing leads) and Q14 (turnover) are reverse indicators
  // YES = 0 points (chaos) but indicates HIGH urgency
  if (answers.q13 === 'yes') {
    score -= 1.0; // Remove the point if they answered YES
  }
  if (answers.q14 === 'yes') {
    score -= 1.0; // Remove the point if they answered YES
  }
  
  return Math.max(0, Math.min(10, score)); // Clamp between 0-10
}

/**
 * Calculate Purchase Intent Score (0-15)
 * From Big 5 Qualifying Questions (Q15-Q19)
 */
export function calculateIntentScore(answers) {
  let score = 0;
  
  // Q15: Main Goal (Weight: 3 points)
  const goalScores = {
    'save-money': 3,
    'focus-sales': 3,
    'increase-capacity': 2,
    'other': 0
  };
  score += goalScores[answers.q15] || 0;
  
  // Q16: Main Obstacle (Weight: 1-3 points)
  const obstacleScores = {
    'cost': 3, // Price-sensitive but considering
    'fear-quality': 2, // Needs proof
    'dont-know': 1, // Needs education
    'lack-processes': 1 // Needs consulting
  };
  score += obstacleScores[answers.q16] || 0;
  
  // Q17: Hours to Delegate (Weight: 4 points)
  const hoursScores = {
    '40-plus': 4, // Full-Time + possible multiple VAs
    '20-40': 3, // Full-Time VA
    '10-20': 2 // Part-Time VA
  };
  score += hoursScores[answers.q17] || 0;
  
  // Q18: Solution Seeking (Weight: 5 points - MOST IMPORTANT)
  const solutionScores = {
    'full-time-va': 5, // READY TO BUY
    'part-time-va': 4, // READY TO BUY
    'process-consulting': 2, // Considering
    'just-guidance': 0 // Researching
  };
  score += solutionScores[answers.q18] || 0;
  
  // Q19: Open Box - Manual keyword detection
  const openBoxText = (answers.q19 || '').toLowerCase();
  if (openBoxText.includes('urgent') || openBoxText.includes('asap') || openBoxText.includes('immediately')) {
    score += 2;
  }
  if (openBoxText.match(/\$\d+|\d+\s*(k|thousand|month)/)) {
    score += 2; // Budget mentioned
  }
  if (openBoxText.includes('tried before') || openBoxText.includes("didn't work")) {
    score += 1; // Objection to address
  }
  if (openBoxText.includes('just looking') || openBoxText.includes('not sure')) {
    score -= 1; // Low intent
  }
  
  return Math.max(0, Math.min(15, score)); // Clamp between 0-15
}

/**
 * Calculate Urgency Score (0-8)
 * From Q13, Q14, and Q19
 */
export function calculateUrgencyScore(answers) {
  let score = 0;
  
  // Q13: Losing leads = +5 points (CRITICAL)
  if (answers.q13 === 'yes') {
    score += 5;
  } else if (answers.q13 === 'sometimes') {
    score += 2.5;
  }
  
  // Q14: Staff turnover = +3 points
  if (answers.q14 === 'yes') {
    score += 3;
  } else if (answers.q14 === 'sometimes') {
    score += 1.5;
  }
  
  // Q19: Keywords in open box
  const openBoxText = (answers.q19 || '').toLowerCase();
  if (openBoxText.includes('urgent') || openBoxText.includes('asap') || openBoxText.includes('drowning')) {
    score += 2;
  }
  
  return Math.max(0, Math.min(8, score)); // Clamp between 0-8
}

/**
 * Determine Lead Profile (A, B, C, or D)
 * Based on all three scores
 */
export function determineLeadProfile(operationalScore, intentScore, urgencyScore) {
  // PROFILE A: HOT LEAD
  if ((operationalScore >= 6 && intentScore >= 10) ||
      (operationalScore >= 4 && intentScore >= 10 && urgencyScore >= 5)) {
    return {
      profile: 'A',
      name: 'HOT LEAD',
      priority: 1,
      action: 'immediate-sales-call'
    };
  }
  
  // PROFILE B: WARM LEAD
  if ((operationalScore >= 4 && intentScore >= 5 && intentScore < 10) ||
      (operationalScore >= 6 && intentScore >= 5)) {
    return {
      profile: 'B',
      name: 'WARM LEAD',
      priority: 2,
      action: 'nurture-sequence'
    };
  }
  
  // PROFILE C: COLD BUT URGENT
  if ((operationalScore < 4 && urgencyScore >= 5) ||
      (operationalScore < 4 && intentScore >= 8)) {
    return {
      profile: 'C',
      name: 'COLD BUT URGENT',
      priority: 3,
      action: 'urgency-video'
    };
  }
  
  // PROFILE D: ICE COLD (default)
  return {
    profile: 'D',
    name: 'ICE COLD',
    priority: 4,
    action: 'passive-nurture'
  };
}

/**
 * Calculate Savings Potential
 * Based on hours and current costs
 */
export function calculateSavingsPotential(answers) {
  const hours = answers.q17;
  const currentEmployeeCost = 4500; // $4,500/month average
  
  let vaCost = 0;
  if (hours === '40-plus') {
    vaCost = 1300; // Full-time
  } else if (hours === '20-40') {
    vaCost = 1300; // Full-time
  } else if (hours === '10-20') {
    vaCost = 750; // Part-time
  }
  
  const monthlySavings = currentEmployeeCost - vaCost;
  const annualSavings = monthlySavings * 12;
  
  return {
    currentCost: currentEmployeeCost,
    vaCost: vaCost,
    monthlySavings: monthlySavings,
    annualSavings: annualSavings
  };
}

/**
 * Get Profile-Specific Content
 */
export function getProfileContent(profile, scores, savings) {
  const content = {
    A: {
      headline: '🎉 EXCELLENT NEWS!',
      score: scores.operational,
      savings: savings.annualSavings,
      message: "You're READY to scale. Your operation has solid foundations and can implement a VA in less than 72 hours.",
      cta: {
        text: 'SCHEDULE MY CALL NOW',
        action: 'schedule-call',
        link: '#booking'
      },
      bonus: 'Case Study: How [Similar Agency] saved $42K/year'
    },
    B: {
      headline: '⚠️ OPPORTUNITY ALERT',
      score: scores.operational,
      savings: savings.monthlySavings * 12,
      message: "You have potential, but need to standardize processes before delegating to get maximum ROI.",
      cta: {
        text: 'DOWNLOAD GUIDE NOW',
        action: 'download-guide',
        link: '#guide'
      },
      bonus: 'Want help implementing? Schedule 15-min process analysis'
    },
    C: {
      headline: '🚨 DANGER ZONE',
      score: scores.operational,
      savings: 50400, // Estimated annual loss
      message: "Your operation is in chaos mode. Every day without delegating costs you $197 in wasted time.",
      cta: {
        text: 'WATCH VIDEO NOW',
        action: 'watch-video',
        link: '#video'
      },
      bonus: 'Ready for a rescue plan? Emergency analysis - 15 min'
    },
    D: {
      headline: '📊 Your Assessment Results',
      score: scores.operational,
      savings: null,
      message: "Thanks for completing the assessment. Based on your answers, here are your 3 main improvement areas.",
      cta: {
        text: 'EXPLORE RESOURCES',
        action: 'explore-resources',
        link: '#resources'
      },
      bonus: 'Recommended resources: Blog posts, Podcast episodes, Case studies'
    }
  };
  
  return content[profile] || content.D;
}

