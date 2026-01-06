/**
 * Ocean VA Operational Efficiency Scorecard
 * Standalone Engine - All-in-one version (no ES6 modules)
 */

// ==================== QUESTIONS DATA ====================
const bestPracticesQuestions = [
  {
    id: 'q5',
    number: 5,
    question: 'Do you have a written manual or process documented for at least 5 repetitive tasks (e.g., email/CRM management)?',
    area: 'Process Documentation',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q6',
    number: 6,
    question: 'Do you actively delegate low-value tasks (e.g., inbox management, data entry) to someone other than yourself?',
    area: 'Delegation Habit',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q7',
    number: 7,
    question: 'Does your team spend less than 20% of its time on administrative tasks (not related to direct sales or service)?',
    area: 'High-Value Focus',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q8',
    number: 8,
    question: 'Do you consistently measure the time it takes you to handle your CRM (e.g., Applied, Nowcerts, QQ) and back-office tasks?',
    area: 'Workload Measurement',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q9',
    number: 9,
    question: 'Have you calculated how much each internal team member costs you (in salary, benefits, and office overhead)?',
    area: 'Cost Awareness',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q10',
    number: 10,
    question: 'Does your team or you have a defined plan for handling and following up on outbound/inbound leads?',
    area: 'Sales Management Systems',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q11',
    number: 11,
    question: 'Do you use any collaboration tools (e.g., Slack, Teams, Asana) to communicate with remote/delegated staff?',
    area: 'Technology and Collaboration',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q12',
    number: 12,
    question: 'If you are an Insurance Agency: Does any internal team member handle COIs or endorsements regularly?',
    area: 'Highly Delegable Tasks',
    conditional: 'insurance',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' },
      { value: 'n/a', label: 'N/A - Not Insurance' }
    ]
  },
  {
    id: 'q13',
    number: 13,
    question: 'Does your team spend more than 10 hours per week on tasks that could be delegated at lower cost?',
    area: 'Highly Delegable Tasks',
    urgencyFlag: true,
    reverseScore: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'q14',
    number: 14,
    question: 'Have you experienced staff turnover or absences due to vacation/illness in the last year?',
    area: 'Staffing Risk',
    urgencyFlag: true,
    reverseScore: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ]
  }
];

const big5Questions = [
  {
    id: 'q15',
    number: 15,
    question: 'What is your main goal for the next 3 months?',
    area: 'Priority Need',
    options: [
      { value: 'save-money', label: 'Save money' },
      { value: 'increase-capacity', label: 'Increase service capacity' },
      { value: 'focus-sales', label: 'Focus on sales' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'q16',
    number: 16,
    question: 'What do you think is your biggest obstacle to successful delegation?',
    area: 'Main Objection',
    options: [
      { value: 'fear-quality', label: 'Fear of quality' },
      { value: 'lack-processes', label: 'Lack of processes' },
      { value: 'dont-know', label: 'Don\'t know what to delegate' },
      { value: 'cost', label: 'Cost' }
    ]
  },
  {
    id: 'q17',
    number: 17,
    question: 'How many administrative work hours per week would you like to delegate to a VA?',
    area: 'Service Scale',
    options: [
      { value: '10-20', label: '10-20 hours' },
      { value: '20-40', label: '20-40 hours' },
      { value: '40-plus', label: '+40 hours' }
    ]
  },
  {
    id: 'q18',
    number: 18,
    question: 'What type of solution are you currently seeking?',
    area: 'Purchase Intent',
    starQuestion: true,
    options: [
      { value: 'just-guidance', label: 'Just guidance/information' },
      { value: 'process-consulting', label: 'Process consulting' },
      { value: 'part-time-va', label: 'Part-Time VA Support' },
      { value: 'full-time-va', label: 'Full-Time VA Support' }
    ]
  },
  {
    id: 'q19',
    number: 19,
    question: 'Is there any additional comment we should know about your current situation or VA need?',
    area: 'Open Box',
    goldQuestion: true,
    type: 'textarea',
    placeholder: 'This is often the most valuable field! Share any details about your situation, budget, timeline, or concerns...'
  }
];

// ==================== SCORING FUNCTIONS ====================
function calculateOperationalScore(answers) {
  let score = 0;
  const bestPracticeQuestions = ['q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14'];
  
  bestPracticeQuestions.forEach(qKey => {
    const answer = answers[qKey];
    if (answer === 'yes') {
      score += 1.0;
    } else if (answer === 'sometimes') {
      score += 0.5;
    }
  });
  
  // Reverse score questions
  if (answers.q13 === 'yes') {
    score -= 1.0;
  }
  if (answers.q14 === 'yes') {
    score -= 1.0;
  }
  
  return Math.max(0, Math.min(10, score));
}

function calculateIntentScore(answers) {
  let score = 0;
  
  // Q15: Main Goal
  const goalScores = {
    'save-money': 3,
    'focus-sales': 3,
    'increase-capacity': 2,
    'other': 0
  };
  score += goalScores[answers.q15] || 0;
  
  // Q16: Main Obstacle
  const obstacleScores = {
    'cost': 3,
    'fear-quality': 2,
    'dont-know': 1,
    'lack-processes': 1
  };
  score += obstacleScores[answers.q16] || 0;
  
  // Q17: Hours to Delegate
  const hoursScores = {
    '40-plus': 4,
    '20-40': 3,
    '10-20': 2
  };
  score += hoursScores[answers.q17] || 0;
  
  // Q18: Solution Seeking (MOST IMPORTANT)
  const solutionScores = {
    'full-time-va': 5,
    'part-time-va': 4,
    'process-consulting': 2,
    'just-guidance': 0
  };
  score += solutionScores[answers.q18] || 0;
  
  // Q19: Open Box - Keyword detection
  const openBoxText = (answers.q19 || '').toLowerCase();
  if (openBoxText.includes('urgent') || openBoxText.includes('asap') || openBoxText.includes('immediately')) {
    score += 2;
  }
  if (openBoxText.match(/\$\d+|\d+\s*(k|thousand|month)/)) {
    score += 2;
  }
  if (openBoxText.includes('tried before') || openBoxText.includes("didn't work")) {
    score += 1;
  }
  if (openBoxText.includes('just looking') || openBoxText.includes('not sure')) {
    score -= 1;
  }
  
  return Math.max(0, Math.min(15, score));
}

function calculateUrgencyScore(answers) {
  let score = 0;
  
  if (answers.q13 === 'yes') {
    score += 5;
  } else if (answers.q13 === 'sometimes') {
    score += 2.5;
  }
  
  if (answers.q14 === 'yes') {
    score += 3;
  } else if (answers.q14 === 'sometimes') {
    score += 1.5;
  }
  
  const openBoxText = (answers.q19 || '').toLowerCase();
  if (openBoxText.includes('urgent') || openBoxText.includes('asap') || openBoxText.includes('drowning')) {
    score += 2;
  }
  
  return Math.max(0, Math.min(8, score));
}

function determineLeadProfile(operationalScore, intentScore, urgencyScore) {
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
  
  // PROFILE D: ICE COLD
  return {
    profile: 'D',
    name: 'ICE COLD',
    priority: 4,
    action: 'passive-nurture'
  };
}

function calculateSavingsPotential(answers) {
  const hours = answers.q17;
  const currentEmployeeCost = 4500;
  
  let vaCost = 0;
  if (hours === '40-plus') {
    vaCost = 1300;
  } else if (hours === '20-40') {
    vaCost = 1300;
  } else if (hours === '10-20') {
    vaCost = 750;
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

function getProfileContent(profile, scores, savings) {
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
      savings: 50400,
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

// ==================== QUIZ STATE ====================
let quizState = {
  currentSection: 'landing',
  currentQuestionIndex: 0,
  answers: {},
  contactInfo: {}
};

// ==================== QUIZ FUNCTIONS ====================
function showSection(section) {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('contact-section').style.display = 'none';
  document.getElementById('questions-section').style.display = 'none';
  document.getElementById('results-section').style.display = 'none';
  
  switch(section) {
    case 'contact':
      document.getElementById('quiz-section').style.display = 'block';
      document.getElementById('contact-section').style.display = 'block';
      quizState.currentSection = 'contact';
      break;
    case 'questions':
      document.getElementById('quiz-section').style.display = 'block';
      document.getElementById('questions-section').style.display = 'block';
      quizState.currentSection = 'questions';
      break;
    case 'results':
      document.getElementById('quiz-section').style.display = 'none';
      document.getElementById('results-section').style.display = 'block';
      quizState.currentSection = 'results';
      break;
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function collectContactInfo() {
  quizState.contactInfo = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    industry: document.getElementById('industry').value
  };
}

function renderQuestions() {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';
  
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const currentQuestion = allQuestions[quizState.currentQuestionIndex];
  
  if (!currentQuestion) {
    calculateAndShowResults();
    return;
  }
  
  const questionCard = document.createElement('div');
  questionCard.className = 'question-card';
  
  if (currentQuestion.urgencyFlag) {
    questionCard.classList.add('urgency-flag');
  }
  if (currentQuestion.starQuestion) {
    questionCard.classList.add('star-question');
  }
  if (currentQuestion.goldQuestion) {
    questionCard.classList.add('gold-question');
  }
  
  const header = document.createElement('div');
  header.className = 'question-header';
  
  const badges = [];
  if (currentQuestion.urgencyFlag) {
    badges.push('<span class="question-badge badge-urgency">⚠️ URGENCY FLAG</span>');
  }
  if (currentQuestion.starQuestion) {
    badges.push('<span class="question-badge badge-star">⭐ MOST IMPORTANT</span>');
  }
  if (currentQuestion.goldQuestion) {
    badges.push('<span class="question-badge badge-gold">💎 VALUABLE FIELD</span>');
  }
  
  header.innerHTML = `
    <div class="question-number">Q${currentQuestion.number}</div>
    <div style="flex:1;">
      <div class="question-area">${currentQuestion.area}</div>
      ${badges.length > 0 ? '<div style="margin-top:8px;">' + badges.join(' ') + '</div>' : ''}
    </div>
  `;
  
  const questionText = document.createElement('div');
  questionText.className = 'question-text';
  questionText.textContent = currentQuestion.question;
  
  const answerContainer = document.createElement('div');
  answerContainer.className = 'answer-options';
  
  if (currentQuestion.type === 'textarea') {
    // Create wrapper for textarea to center it
    const textareaWrapper = document.createElement('div');
    textareaWrapper.style.textAlign = 'center';
    textareaWrapper.style.marginTop = '8px';
    
    const textarea = document.createElement('textarea');
    textarea.className = 'question-textarea';
    textarea.id = `answer-${currentQuestion.id}`;
    textarea.placeholder = currentQuestion.placeholder || '';
    textarea.value = quizState.answers[currentQuestion.id] || '';
    textarea.addEventListener('input', (e) => {
      quizState.answers[currentQuestion.id] = e.target.value;
    });
    
    textareaWrapper.appendChild(textarea);
    answerContainer.appendChild(textareaWrapper);
    
    // Add helpful hint for Q19
    if (currentQuestion.id === 'q19') {
      const hint = document.createElement('div');
      hint.style.marginTop = '12px';
      hint.style.fontSize = '14px';
      hint.style.color = 'var(--gray-600)';
      hint.style.fontStyle = 'italic';
      hint.textContent = '💡 Tip: Share your budget, timeline, or any concerns - this helps us personalize your results!';
      textareaWrapper.appendChild(hint);
    }
  } else {
    currentQuestion.options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'answer-option';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${currentQuestion.id}`;
      radio.id = `option-${currentQuestion.id}-${option.value}`;
      radio.value = option.value;
      radio.checked = quizState.answers[currentQuestion.id] === option.value;
      
      // Make the entire div clickable
      optionDiv.addEventListener('click', (e) => {
        // Don't trigger if clicking directly on the radio button (to avoid double trigger)
        if (e.target !== radio) {
          radio.checked = true;
          quizState.answers[currentQuestion.id] = option.value;
          updateAnswerOptions(optionDiv.parentElement);
        }
      });
      
      radio.addEventListener('change', () => {
        quizState.answers[currentQuestion.id] = option.value;
        updateAnswerOptions(optionDiv.parentElement);
      });
      
      const label = document.createElement('label');
      label.htmlFor = `option-${currentQuestion.id}-${option.value}`;
      label.textContent = option.label;
      label.style.cursor = 'pointer';
      label.style.flex = '1';
      
      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);
      
      if (radio.checked) {
        optionDiv.classList.add('selected');
      }
      
      answerContainer.appendChild(optionDiv);
    });
  }
  
  questionCard.appendChild(header);
  questionCard.appendChild(questionText);
  questionCard.appendChild(answerContainer);
  
  container.appendChild(questionCard);
  
  updateNavigationButtons();
}

function updateAnswerOptions(container) {
  const options = container.querySelectorAll('.answer-option');
  options.forEach(opt => opt.classList.remove('selected'));
  const selected = container.querySelector('input[type="radio"]:checked');
  if (selected) {
    selected.closest('.answer-option').classList.add('selected');
  }
}

function updateNavigationButtons() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const totalQuestions = allQuestions.length;
  const currentIndex = quizState.currentQuestionIndex;
  
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const submitButton = document.getElementById('submit-button');
  
  if (prevButton) {
    prevButton.style.display = currentIndex > 0 ? 'inline-flex' : 'none';
  }
  
  if (currentIndex === totalQuestions - 1) {
    if (nextButton) nextButton.style.display = 'none';
    if (submitButton) submitButton.style.display = 'inline-flex';
  } else {
    if (nextButton) nextButton.style.display = 'inline-flex';
    if (submitButton) submitButton.style.display = 'none';
  }
  
  updateProgress();
}

function validateCurrentQuestion() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const currentQuestion = allQuestions[quizState.currentQuestionIndex];
  
  if (!currentQuestion) return false;
  
  if (!quizState.answers[currentQuestion.id]) {
    alert('Please select an answer before continuing.');
    return false;
  }
  
  if (currentQuestion.conditional) {
    if (quizState.contactInfo.industry !== currentQuestion.conditional) {
      return true;
    }
  }
  
  return true;
}

function moveToNextQuestion() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  
  let nextIndex = quizState.currentQuestionIndex + 1;
  while (nextIndex < allQuestions.length) {
    const nextQuestion = allQuestions[nextIndex];
    if (nextQuestion.conditional && 
        quizState.contactInfo.industry !== nextQuestion.conditional) {
      nextIndex++;
    } else {
      break;
    }
  }
  
  quizState.currentQuestionIndex = nextIndex;
  renderQuestions();
}

function moveToPreviousQuestion() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  
  let prevIndex = quizState.currentQuestionIndex - 1;
  while (prevIndex >= 0) {
    const prevQuestion = allQuestions[prevIndex];
    if (prevQuestion.conditional && 
        quizState.contactInfo.industry !== prevQuestion.conditional) {
      prevIndex--;
    } else {
      break;
    }
  }
  
  if (prevIndex >= 0) {
    quizState.currentQuestionIndex = prevIndex;
    renderQuestions();
  }
}

function updateProgress() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const totalQuestions = allQuestions.length;
  const answeredQuestions = Object.keys(quizState.answers).length;
  
  const contactCompleted = quizState.contactInfo.name && quizState.contactInfo.email && quizState.contactInfo.industry;
  const totalSteps = totalQuestions + 1;
  const completedSteps = answeredQuestions + (contactCompleted ? 1 : 0);
  
  const progress = (completedSteps / totalSteps) * 100;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// API Configuration
const API_BASE = window.API_BASE || '/api'; // Use window.API_BASE if set, otherwise relative path

/**
 * Submit quiz results to backend
 * @param {Object} quizData - Complete quiz data to submit
 */
async function submitQuizResults(quizData) {
  try {
    const response = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Quiz results saved successfully:', result);
    return result;
  } catch (error) {
    // Silently fail - don't interrupt user experience
    console.warn('Failed to submit quiz results to backend:', error.message);
    // You could also send to analytics or error tracking service here
    return null;
  }
}

function calculateAndShowResults() {
  const operationalScore = calculateOperationalScore(quizState.answers);
  const intentScore = calculateIntentScore(quizState.answers);
  const urgencyScore = calculateUrgencyScore(quizState.answers);
  
  const profile = determineLeadProfile(operationalScore, intentScore, urgencyScore);
  const savings = calculateSavingsPotential(quizState.answers);
  const content = getProfileContent(profile.profile, {
    operational: operationalScore,
    intent: intentScore,
    urgency: urgencyScore
  }, savings);
  
  renderResults(profile, content, {
    operational: operationalScore,
    intent: intentScore,
    urgency: urgencyScore
  }, savings);
  
  showSection('results');
  
  // Prepare data for backend submission
  const quizData = {
    contact: quizState.contactInfo,
    answers: quizState.answers,
    scores: {
      operational: operationalScore,
      intent: intentScore,
      urgency: urgencyScore
    },
    profile: profile,
    savings: savings
  };
  
  // Log results for debugging
  console.log('Quiz Results:', quizData);
  
  // Submit to backend (non-blocking)
  submitQuizResults(quizData);
}

function renderResults(profile, content, scores, savings) {
  const container = document.getElementById('results-content');
  
  // Calculate percentages for donut chart
  const operationalPercent = Math.round((scores.operational / 10) * 100);
  const intentPercent = Math.round((scores.intent / 15) * 100);
  const urgencyPercent = Math.round((scores.urgency / 8) * 100);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (operationalPercent * 0.4) + 
    (intentPercent * 0.4) + 
    (urgencyPercent * 0.2)
  );
  
  // Determine score level and color
  let scoreLevel, scoreColor, scoreBgColor;
  if (overallScore <= 30) {
    scoreLevel = 'Low';
    scoreColor = '#ef4444';
    scoreBgColor = '#fee2e2';
  } else if (overallScore <= 70) {
    scoreLevel = 'Medium';
    scoreColor = '#f59e0b';
    scoreBgColor = '#fef3c7';
  } else {
    scoreLevel = 'High';
    scoreColor = '#10b981';
    scoreBgColor = '#d1fae5';
  }
  
  // Get category colors
  const getCategoryColor = (percent) => {
    if (percent <= 30) return '#ef4444';
    if (percent <= 70) return '#f59e0b';
    return '#10b981';
  };
  
  const getCategoryLevel = (percent) => {
    if (percent <= 30) return 'low';
    if (percent <= 70) return 'medium';
    return 'high';
  };
  
  const operationalColor = getCategoryColor(operationalPercent);
  const intentColor = getCategoryColor(intentPercent);
  const urgencyColor = getCategoryColor(urgencyPercent);
  
  // Generate donut chart SVG
  const donutChart = generateDonutChart(overallScore, scoreColor, {
    operational: { percent: operationalPercent, color: operationalColor },
    intent: { percent: intentPercent, color: intentColor },
    urgency: { percent: urgencyPercent, color: urgencyColor }
  });
  
  container.innerHTML = `
    <div style="max-width:1400px;margin:0 auto;padding:48px 24px;">
      <!-- Header -->
      <div style="margin-bottom:48px;">
        <h1 style="font-size:42px;font-weight:700;color:#049d98;margin-bottom:16px;letter-spacing:-0.02em;">
          Thank you for taking the Operational Efficiency Scorecard
        </h1>
        <p style="font-size:17px;color:#6b7280;margin-bottom:8px;">
          Your full report has been emailed to <strong>${quizState.contactInfo.email}</strong>. 
          <a href="#" style="color:#049d98;text-decoration:underline;">Change email address</a>
        </p>
        <p style="font-size:16px;color:#6b7280;line-height:1.6;max-width:800px;">
          Thank you for taking the Operational Efficiency Scorecard. Below, you'll find your overall efficiency score 
          and a breakdown of your results in key areas: <strong>Operational Maturity</strong>, 
          <strong>Purchase Intent</strong>, and <strong>Urgency Signals</strong>.
        </p>
      </div>
      
      <!-- Main Content: Two Columns -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-bottom:64px;align-items:start;">
        <!-- Left Column: Text Content -->
        <div>
          <h2 style="font-size:28px;font-weight:700;color:#049d98;margin-bottom:24px;">
            Your Overall Operational Efficiency Score
          </h2>
          
          <div style="background:${scoreBgColor};border-left:4px solid ${scoreColor};padding:24px;border-radius:12px;margin-bottom:32px;">
            <h3 style="font-size:20px;font-weight:700;color:${scoreColor};margin-bottom:12px;">
              ${scoreLevel} Readiness (${overallScore <= 30 ? '0-30%' : overallScore <= 70 ? '31-70%' : '71-100%'})
            </h3>
            <p style="font-size:16px;color:var(--gray-700);line-height:1.7;margin-bottom:16px;">
              ${content.message}
            </p>
            <p style="font-size:16px;font-weight:600;color:var(--gray-900);">
              ${content.bonus || profile.action}
            </p>
          </div>
          
          ${content.savings ? `
            <div style="background:#e6fffe;border:2px solid #ccfffe;padding:32px;border-radius:16px;margin-bottom:32px;">
              <div style="font-size:14px;font-weight:600;color:#049d98;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">
                Your Potential Annual Savings
              </div>
              <div style="font-size:48px;font-weight:700;color:#037b77;margin:16px 0;">
                $${content.savings.toLocaleString()}
              </div>
              <div style="font-size:15px;color:#6b7280;margin-top:12px;">
                Current: <strong>$${savings.currentCost.toLocaleString()}/month</strong> → 
                With Ocean VA: <strong>$${savings.vaCost.toLocaleString()}/month</strong>
              </div>
            </div>
          ` : ''}
          
          <div style="margin-top:32px;">
            <a href="${content.cta.link}" class="results-cta-button" style="display:inline-block;">
              ${content.cta.text}
            </a>
          </div>
        </div>
        
        <!-- Right Column: Donut Chart -->
        <div style="display:flex;justify-content:center;align-items:center;">
          ${donutChart}
        </div>
      </div>
      
      <!-- Detailed Breakdown Sections -->
      <div style="margin-top:64px;">
        <h2 style="font-size:32px;font-weight:700;color:#111827;margin-bottom:40px;text-align:center;">
          Detailed Breakdown & Actionable Improvements
        </h2>
        
        <!-- Operational Maturity Section -->
        <div style="background:#ffffff;border:2px solid #e5e7eb;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:20px;gap:32px;">
            <div style="flex:1;">
              <h3 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:16px;">
                Operational Maturity
              </h3>
              <p style="font-size:16px;color:#6b7280;line-height:1.7;margin-bottom:16px;">
                ${getOperationalInsight(operationalPercent, scores.operational)}
              </p>
              <div style="background:#e6fffe;padding:16px;border-radius:8px;margin-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#049d98;margin-bottom:8px;">
                  Immediate Action:
                </div>
                <p style="font-size:15px;color:#374151;line-height:1.6;">
                  ${getOperationalAction(operationalPercent)}
                </p>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div style="font-size:36px;font-weight:700;color:${operationalColor};margin-bottom:8px;">
                ${operationalPercent}%
              </div>
              <div style="display:inline-block;padding:6px 12px;background:${scoreBgColor};border-radius:8px;font-size:13px;font-weight:600;color:${operationalColor};text-transform:uppercase;">
                ${getCategoryLevel(operationalPercent)}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Purchase Intent Section -->
        <div style="background:#ffffff;border:2px solid #e5e7eb;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:20px;gap:32px;">
            <div style="flex:1;">
              <h3 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:16px;">
                Purchase Intent
              </h3>
              <p style="font-size:16px;color:#6b7280;line-height:1.7;margin-bottom:16px;">
                ${getIntentInsight(intentPercent, scores.intent)}
              </p>
              <div style="background:#e6fffe;padding:16px;border-radius:8px;margin-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#049d98;margin-bottom:8px;">
                  Next Steps:
                </div>
                <p style="font-size:15px;color:#374151;line-height:1.6;">
                  ${getIntentAction(intentPercent)}
                </p>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div style="font-size:36px;font-weight:700;color:${intentColor};margin-bottom:8px;">
                ${intentPercent}%
              </div>
              <div style="display:inline-block;padding:6px 12px;background:${scoreBgColor};border-radius:8px;font-size:13px;font-weight:600;color:${intentColor};text-transform:uppercase;">
                ${getCategoryLevel(intentPercent)}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Urgency Signals Section -->
        <div style="background:#ffffff;border:2px solid #e5e7eb;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:20px;gap:32px;">
            <div style="flex:1;">
              <h3 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:16px;">
                Urgency Signals
              </h3>
              <p style="font-size:16px;color:#6b7280;line-height:1.7;margin-bottom:16px;">
                ${getUrgencyInsight(urgencyPercent, scores.urgency)}
              </p>
              <div style="background:#e6fffe;padding:16px;border-radius:8px;margin-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#049d98;margin-bottom:8px;">
                  Priority Action:
                </div>
                <p style="font-size:15px;color:#374151;line-height:1.6;">
                  ${getUrgencyAction(urgencyPercent)}
                </p>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div style="font-size:36px;font-weight:700;color:${urgencyColor};margin-bottom:8px;">
                ${urgencyPercent}%
              </div>
              <div style="display:inline-block;padding:6px 12px;background:${scoreBgColor};border-radius:8px;font-size:13px;font-weight:600;color:${urgencyColor};text-transform:uppercase;">
                ${getCategoryLevel(urgencyPercent)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Legend -->
      <div style="display:flex;gap:24px;margin-top:48px;padding-top:32px;border-top:2px solid #e5e7eb;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:16px;height:16px;background:#ef4444;border-radius:50%;"></div>
          <span style="font-size:14px;color:#6b7280;">low</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:16px;height:16px;background:#f59e0b;border-radius:50%;"></div>
          <span style="font-size:14px;color:#6b7280;">medium</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:16px;height:16px;background:#10b981;border-radius:50%;"></div>
          <span style="font-size:14px;color:#6b7280;">high</span>
        </div>
      </div>
    </div>
    
    <!-- Free Resource Section (White Background) -->
    ${getFreeResourceSection(profile.profile, overallScore)}
    
    <!-- Next Steps Section (Blue Background) -->
    ${getNextStepsSection(profile.profile, overallScore, content)}
  `;
}

// Helper function to generate free resource section based on profile
function getFreeResourceSection(profile, overallScore) {
  const resources = {
    A: {
      title: 'Get Your Free Case Study:',
      subtitle: 'How Similar Agencies Saved $42K+ Per Year',
      description: 'A real-world case study showing how insurance agencies with similar scores to yours achieved significant cost savings and operational efficiency. Our <strong>free case study</strong> provides detailed insights into <strong>implementation strategies, ROI calculations, and success metrics</strong>. Learn from agencies that were in your exact position.',
      buttonText: 'DOWNLOAD NOW',
      buttonColor: '#05bfb9',
      imagePlaceholder: '📊 Case Study PDF',
      imagePath: '../../public/images/how similar agencies.webp'
    },
    B: {
      title: 'Get Your Free Guide:',
      subtitle: '10 Tasks to Delegate to Your First VA',
      description: 'Ready to start delegating but not sure where to begin? Our <strong>free guide</strong> identifies the <strong>top 10 tasks that deliver immediate ROI</strong> when delegated to a VA. Each task includes time savings, cost analysis, and step-by-step delegation instructions. Perfect for agencies looking to optimize operations.',
      buttonText: 'DOWNLOAD NOW',
      buttonColor: '#05bfb9',
      imagePlaceholder: '📥 Delegation Guide PDF',
      imagePath: '../../public/images/10 task to delegate.webp'
    },
    C: {
      title: 'Get Your Free Rescue Plan:',
      subtitle: 'How to Fix Operational Chaos in 7 Days',
      description: 'Your operation needs immediate attention. Our <strong>free 7-day rescue plan</strong> provides a step-by-step guide to <strong>stop the bleeding, stabilize operations, and create a foundation for growth</strong>. Don\'t wait—download your copy now and take control of your operational efficiency.',
      buttonText: 'DOWNLOAD NOW',
      buttonColor: '#05bfb9',
      imagePlaceholder: '🚨 Rescue Plan PDF',
      imagePath: '../../public/images/free 7-day rescue plan.webp'
    },
    D: {
      title: 'Get Your Free Resource Library:',
      subtitle: 'Complete Guide to Virtual Assistant Implementation',
      description: 'Explore our comprehensive resource library with <strong>best practices, case studies, and implementation guides</strong>. Whether you\'re just starting to research or ready to plan your VA strategy, our <strong>free resources</strong> provide the insights you need to make informed decisions.',
      buttonText: 'EXPLORE RESOURCES',
      buttonColor: '#05bfb9',
      imagePlaceholder: '📚 Resource Library',
      imagePath: '../../public/images/Complete Guide.webp'
    }
  };
  
  const resource = resources[profile] || resources.D;
  
  return `
    <div style="background:#ffffff;padding:80px 40px;margin-top:64px;">
      <div style="max-width:1400px;margin:0 auto;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
          <!-- Left: Text Content -->
          <div>
            <div style="font-size:18px;font-weight:600;color:#374151;margin-bottom:12px;">
              ${resource.title}
            </div>
            <h2 style="font-size:42px;font-weight:700;color:#05bfb9;line-height:1.1;margin-bottom:24px;letter-spacing:-0.02em;">
              ${resource.subtitle}
            </h2>
            <p style="font-size:17px;color:#374151;line-height:1.7;margin-bottom:32px;">
              ${resource.description}
            </p>
            <button onclick="handleResourceDownload('${profile}')" style="padding:18px 40px;font-size:17px;font-weight:700;background:${resource.buttonColor};color:#ffffff;border:none;border-radius:8px;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(5,191,185,0.3);">
              ${resource.buttonText}
            </button>
          </div>
          
          <!-- Right: Image -->
          <div style="position:relative;width:100%;">
            <div style="width:100%;height:400px;background:#e6fffe;border-radius:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 40px rgba(0,0,0,0.1);border:2px solid #05bfb9;padding:16px;position:relative;overflow:hidden;">
              <img src="${resource.imagePath}" alt="${resource.subtitle}" style="width:100%;height:100%;object-fit:contain;display:block;" 
                   onerror="this.onerror=null; const fallback = document.createElement('div'); fallback.style.cssText='text-align:center;color:#049d98;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;'; fallback.innerHTML='<div style=\\'font-size:64px;margin-bottom:16px;\\'>${resource.imagePlaceholder.includes('PDF') ? '📄' : resource.imagePlaceholder.includes('Guide') ? '📥' : resource.imagePlaceholder.includes('Case') ? '📊' : '📚'}</div><p style=\\'font-size:16px;font-weight:600;color:#374151;margin:0;\\'>${resource.imagePlaceholder.replace(/[📄📥📚🚨📊]/g, '').trim()}</p>'; this.parentElement.replaceChild(fallback, this);" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper function to generate next steps section based on profile
function getNextStepsSection(profile, overallScore, content) {
  const nextSteps = {
    A: {
      title: 'Next Steps:',
      subtitle: 'Schedule Your Free 30-Minute Consultation',
      description: 'You\'re ready to scale. Our <strong>Ocean VA team</strong> is ready to help you implement a full-time VA in 72 hours. Whether you need expert guidance on VA selection, a customized implementation plan, or immediate deployment, we\'re here to assist. <strong>Schedule your consultation today</strong> and take the next step toward operational excellence.',
      buttonText: 'SCHEDULE CONSULTATION',
      buttonColor: '#ffffff',
      buttonTextColor: '#05bfb9'
    },
    B: {
      title: 'Next Steps:',
      subtitle: 'Get Your Personalized Implementation Plan',
      description: 'Your agency has potential, and we can help you unlock it. Our <strong>Ocean VA team</strong> specializes in creating customized VA solutions for agencies at your stage. Whether you need process optimization guidance, a detailed implementation roadmap, or help identifying your top delegation opportunities, we\'re ready to assist. <strong>Contact us today</strong> for personalized advice.',
      buttonText: 'GET IN TOUCH',
      buttonColor: '#ffffff',
      buttonTextColor: '#05bfb9'
    },
    C: {
      title: 'Next Steps:',
      subtitle: 'Get Your Emergency Rescue Plan',
      description: 'Time is critical. Your operational efficiency needs immediate attention, and our <strong>Ocean VA team</strong> specializes in rapid deployment solutions. Whether you need an emergency consultation, a fast-track implementation plan, or immediate VA coverage, we can help. <strong>Contact us today</strong> for urgent assistance and stop the operational bleeding.',
      buttonText: 'GET EMERGENCY HELP',
      buttonColor: '#ffffff',
      buttonTextColor: '#05bfb9'
    },
    D: {
      title: 'Next Steps:',
      subtitle: 'Explore Our Resources & Learn More',
      description: 'Take your time to explore and learn. Our <strong>Ocean VA team</strong> has created comprehensive resources to help you understand virtual assistant solutions at your own pace. Whether you need educational content, case studies, or want to stay informed about best practices, we\'re here to support your journey. <strong>Explore our resources</strong> and reach out when you\'re ready.',
      buttonText: 'EXPLORE RESOURCES',
      buttonColor: '#ffffff',
      buttonTextColor: '#05bfb9'
    }
  };
  
  const step = nextSteps[profile] || nextSteps.D;
  
  return `
    <div style="background:#05bfb9;padding:80px 40px;color:#ffffff;">
      <div style="max-width:1400px;margin:0 auto;">
        <div style="max-width:800px;margin:0 auto;text-align:center;">
          <!-- Text Content -->
          <div>
            <div style="font-size:18px;font-weight:600;color:#ffffff;opacity:0.9;margin-bottom:12px;">
              ${step.title}
            </div>
            <h2 style="font-size:42px;font-weight:700;color:#ffffff;line-height:1.1;margin-bottom:24px;letter-spacing:-0.02em;">
              ${step.subtitle}
            </h2>
            <p style="font-size:17px;color:#ffffff;line-height:1.7;margin-bottom:32px;opacity:0.95;">
              ${step.description}
            </p>
            <button onclick="handleNextStep('${profile}')" style="padding:18px 40px;font-size:17px;font-weight:700;background:${step.buttonColor};color:${step.buttonTextColor};border:none;border-radius:8px;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              ${step.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Handler functions for buttons
function handleResourceDownload(profile) {
  const pdfFiles = {
    A: 'pdfs/profile-a-case-study.html',
    B: 'pdfs/profile-b-10-tasks-guide.html',
    C: 'pdfs/profile-c-rescue-plan.html',
    D: 'pdfs/profile-d-complete-guide.html'
  };
  
  const pdfPath = pdfFiles[profile] || pdfFiles.D;
  
  // Open PDF in new window for viewing/printing
  // Users can print to PDF from browser (Ctrl+P or Cmd+P)
  window.open(pdfPath, '_blank');
  
  console.log('Opening resource:', pdfPath);
}

function handleNextStep(profile) {
  const actions = {
    A: 'schedule-consultation',
    B: 'get-in-touch',
    C: 'emergency-help',
    D: 'explore-resources'
  };
  
  console.log('Next step action:', actions[profile]);
  // Here you would integrate with your booking/contact system
  if (profile === 'A') {
    window.location.href = '#booking';
  } else if (profile === 'C') {
    window.location.href = '#emergency';
  } else {
    window.location.href = '#contact';
  }
}

// Helper function to generate donut chart SVG
function generateDonutChart(overallScore, color, categories) {
  const size = 400;
  const radius = 150;
  const strokeWidth = 40;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallScore / 100) * circumference;
  
  return `
    <div style="position:relative;width:${size}px;height:${size}px;margin:0 auto;">
      <svg width="${size}" height="${size}" style="transform:rotate(-90deg);">
        <!-- Background circle -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="none"
          stroke="#e5e7eb"
          stroke-width="${strokeWidth}"
        />
        <!-- Score circle -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="none"
          stroke="${color}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          stroke-linecap="round"
          style="transition:stroke-dashoffset 1s ease-in-out;"
        />
      </svg>
      <!-- Center text -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:10;">
        <div style="font-size:15px;color:#6b7280;margin-bottom:8px;font-weight:500;">Your Overall Score</div>
        <div style="font-size:72px;font-weight:700;color:${color};line-height:1;">
          ${overallScore}%
        </div>
      </div>
    </div>
  `;
}

// Helper functions for insights
function getOperationalInsight(percent, score) {
  if (percent <= 30) {
    return `Your agency is drowning in operational tasks that are stealing time from revenue-generating activities. Critical functions like process documentation, delegation, and cost awareness have significant gaps. A full-time Insurance VA can immediately take over administrative tasks, freeing your team to focus on sales and retention.`;
  } else if (percent <= 70) {
    return `Your agency has some systems in place, but operational bottlenecks are slowing you down. Key tasks like process documentation or delegation are inconsistent or falling behind during peak periods. A full-time Insurance VA with a focused charter can fill these gaps immediately and create consistent throughput.`;
  } else {
    return `Your operations are relatively tight, but there's always room to scale smarter. Even well-run agencies benefit from offloading targeted tasks—whether it's lead follow-up, marketing automation, or proactive renewal touches. A full-time Insurance VA focused on one high-value track can help you grow without adding fixed overhead.`;
  }
}

function getOperationalAction(percent) {
  if (percent <= 30) {
    return `Implement process documentation, create delegation frameworks, and set up VA coverage starting Day 1. Focus on immediate task offloading to free up licensed staff.`;
  } else if (percent <= 70) {
    return `Build standardized processes for your VA, create clear delegation guidelines, and establish regular review cadences. Identify top 3 bottlenecks for immediate VA support.`;
  } else {
    return `Optimize existing processes for VA integration, identify high-value tasks for delegation, and create a scaling roadmap. Consider specialized VA roles for specific functions.`;
  }
}

function getIntentInsight(percent, score) {
  if (percent <= 30) {
    return `Your purchase intent is low, indicating you're in the early research phase. You're exploring options but haven't committed to a solution yet. Consider starting with educational resources and case studies to understand the value proposition.`;
  } else if (percent <= 70) {
    return `You're actively considering a VA solution and have identified specific needs. You understand the value but may need more information about implementation, costs, or ROI. A consultation can help clarify your path forward.`;
  } else {
    return `You have high purchase intent and are ready to move forward. You've identified clear pain points, have budget considerations, and are looking for the right solution. A structured VA role will deliver fast ROI for your agency.`;
  }
}

function getIntentAction(percent) {
  if (percent <= 30) {
    return `Download our free guide on delegation best practices, review case studies, and schedule an informational call to learn more about how VAs can help your agency.`;
  } else if (percent <= 70) {
    return `Schedule a consultation to discuss your specific needs, review pricing options, and create a customized implementation plan. Get answers to your questions about ROI and timeline.`;
  } else {
    return `Book a strategy session to design your personalized VA charter, discuss onboarding timeline, and finalize your package selection. We can have someone integrated within 72 hours.`;
  }
}

function getUrgencyInsight(percent, score) {
  if (percent <= 30) {
    return `You're not experiencing immediate operational pain, which means you have time to plan strategically. This is an ideal time to implement a VA solution before problems escalate, allowing for smooth onboarding and process optimization.`;
  } else if (percent <= 70) {
    return `You're experiencing some operational pressure, with tasks falling behind or costs mounting. While not in crisis mode, addressing these issues now will prevent larger problems and help you scale more effectively.`;
  } else {
    return `You're experiencing significant operational urgency—whether it's losing leads, high staff turnover costs, or overwhelming workload. Immediate action is needed to stop the bleeding and get your operations back on track. A VA can provide rapid relief.`;
  }
}

function getUrgencyAction(percent) {
  if (percent <= 30) {
    return `Take advantage of this planning window to design your ideal VA structure. Start with a pilot program or part-time VA to test processes before scaling.`;
  } else if (percent <= 70) {
    return `Address bottlenecks now before they become critical. Implement a focused VA solution for your highest-priority pain points. Consider a full-time VA for comprehensive coverage.`;
  } else {
    return `Act immediately to stop operational losses. A full-time VA can be onboarded within 48-72 hours to handle critical tasks. Schedule an urgent consultation to design your rescue plan.`;
  }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  // Handle both CTA buttons
  const startButton = document.getElementById('start-quiz');
  const startButton2 = document.getElementById('start-quiz-2');
  
  const handleStartQuiz = () => {
    showSection('contact');
    updateProgress();
  };
  
  if (startButton) {
    startButton.addEventListener('click', handleStartQuiz);
  }
  
  if (startButton2) {
    startButton2.addEventListener('click', handleStartQuiz);
  }
  
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      collectContactInfo();
      showSection('questions');
      renderQuestions();
      updateProgress();
    });
  }
  
  const nextButton = document.getElementById('next-button');
  const prevButton = document.getElementById('prev-button');
  const submitButton = document.getElementById('submit-button');
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (validateCurrentQuestion()) {
        moveToNextQuestion();
      }
    });
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      moveToPreviousQuestion();
    });
  }
  
  if (submitButton) {
    submitButton.addEventListener('click', () => {
      if (validateCurrentQuestion()) {
        calculateAndShowResults();
      }
    });
  }
});

