/**
 * Ocean VA Operational Efficiency Scorecard
 * Quiz Engine - Main Logic Handler
 */

import { 
  calculateOperationalScore, 
  calculateIntentScore, 
  calculateUrgencyScore, 
  determineLeadProfile,
  calculateSavingsPotential,
  getProfileContent
} from '../utils/scoring.js';

import { 
  bestPracticesQuestions, 
  big5Questions 
} from '../data/questions.js';

// Quiz State
let quizState = {
  currentSection: 'landing',
  currentQuestionIndex: 0,
  answers: {},
  contactInfo: {}
};

// Initialize Quiz
document.addEventListener('DOMContentLoaded', () => {
  // Start Quiz Button
  const startButton = document.getElementById('start-quiz');
  if (startButton) {
    startButton.addEventListener('click', () => {
      showSection('contact');
      updateProgress();
    });
  }
  
  // Contact Form Submit
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
  
  // Navigation Buttons
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

// Show/Hide Sections
function showSection(section) {
  // Hide all sections
  document.getElementById('landing').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('contact-section').style.display = 'none';
  document.getElementById('questions-section').style.display = 'none';
  document.getElementById('results-section').style.display = 'none';
  
  // Show requested section
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
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Collect Contact Information
function collectContactInfo() {
  quizState.contactInfo = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    industry: document.getElementById('industry').value
  };
}

// Render Questions
function renderQuestions() {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';
  
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const currentQuestion = allQuestions[quizState.currentQuestionIndex];
  
  if (!currentQuestion) {
    calculateAndShowResults();
    return;
  }
  
  // Create question card
  const questionCard = document.createElement('div');
  questionCard.className = 'question-card';
  
  // Add special classes
  if (currentQuestion.urgencyFlag) {
    questionCard.classList.add('urgency-flag');
  }
  if (currentQuestion.starQuestion) {
    questionCard.classList.add('star-question');
  }
  if (currentQuestion.goldQuestion) {
    questionCard.classList.add('gold-question');
  }
  
  // Question header
  const header = document.createElement('div');
  header.className = 'question-header';
  header.innerHTML = `
    <div class="question-number">Q${currentQuestion.number}</div>
    <div>
      <div class="question-area">${currentQuestion.area}</div>
      ${currentQuestion.urgencyFlag ? '<span style="color:var(--ds-color-error);font-weight:bold;">⚠️ URGENCY FLAG</span>' : ''}
      ${currentQuestion.starQuestion ? '<span style="color:#f5576c;font-weight:bold;">⭐ MOST IMPORTANT</span>' : ''}
      ${currentQuestion.goldQuestion ? '<span style="color:#f39c12;font-weight:bold;">💎 VALUABLE FIELD</span>' : ''}
    </div>
  `;
  
  // Question text
  const questionText = document.createElement('div');
  questionText.className = 'question-text';
  questionText.textContent = currentQuestion.question;
  
  // Answer options
  const answerContainer = document.createElement('div');
  answerContainer.className = 'answer-options';
  
  if (currentQuestion.type === 'textarea') {
    // Textarea for Q19
    const textarea = document.createElement('textarea');
    textarea.className = 'question-textarea';
    textarea.id = `answer-${currentQuestion.id}`;
    textarea.placeholder = currentQuestion.placeholder || '';
    textarea.value = quizState.answers[currentQuestion.id] || '';
    textarea.addEventListener('input', (e) => {
      quizState.answers[currentQuestion.id] = e.target.value;
    });
    answerContainer.appendChild(textarea);
  } else {
    // Radio buttons for other questions
    currentQuestion.options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'answer-option';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${currentQuestion.id}`;
      radio.id = `option-${currentQuestion.id}-${option.value}`;
      radio.value = option.value;
      radio.checked = quizState.answers[currentQuestion.id] === option.value;
      
      radio.addEventListener('change', () => {
        quizState.answers[currentQuestion.id] = option.value;
        updateAnswerOptions(optionDiv.parentElement);
      });
      
      const label = document.createElement('label');
      label.htmlFor = `option-${currentQuestion.id}-${option.value}`;
      label.textContent = option.label;
      
      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);
      
      if (radio.checked) {
        optionDiv.classList.add('selected');
      }
      
      answerContainer.appendChild(optionDiv);
    });
  }
  
  // Insight
  if (currentQuestion.insight) {
    const insight = document.createElement('div');
    insight.className = 'question-insight';
    insight.textContent = currentQuestion.insight;
    answerContainer.appendChild(insight);
  }
  
  // Assemble card
  questionCard.appendChild(header);
  questionCard.appendChild(questionText);
  questionCard.appendChild(answerContainer);
  
  container.appendChild(questionCard);
  
  // Update navigation buttons
  updateNavigationButtons();
}

// Update Answer Options Visual State
function updateAnswerOptions(container) {
  const options = container.querySelectorAll('.answer-option');
  options.forEach(opt => opt.classList.remove('selected'));
  const selected = container.querySelector('input[type="radio"]:checked');
  if (selected) {
    selected.closest('.answer-option').classList.add('selected');
  }
}

// Update Navigation Buttons
function updateNavigationButtons() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const totalQuestions = allQuestions.length;
  const currentIndex = quizState.currentQuestionIndex;
  
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const submitButton = document.getElementById('submit-button');
  
  // Previous button
  if (prevButton) {
    prevButton.style.display = currentIndex > 0 ? 'inline-flex' : 'none';
  }
  
  // Next/Submit button
  if (currentIndex === totalQuestions - 1) {
    if (nextButton) nextButton.style.display = 'none';
    if (submitButton) submitButton.style.display = 'inline-flex';
  } else {
    if (nextButton) nextButton.style.display = 'inline-flex';
    if (submitButton) submitButton.style.display = 'none';
  }
  
  // Update progress
  updateProgress();
}

// Validate Current Question
function validateCurrentQuestion() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const currentQuestion = allQuestions[quizState.currentQuestionIndex];
  
  if (!currentQuestion) return false;
  
  // Check if answer exists
  if (!quizState.answers[currentQuestion.id]) {
    alert('Please select an answer before continuing.');
    return false;
  }
  
  // Check conditional questions
  if (currentQuestion.conditional) {
    if (quizState.contactInfo.industry !== currentQuestion.conditional) {
      // Skip this question if condition not met
      return true;
    }
  }
  
  return true;
}

// Move to Next Question
function moveToNextQuestion() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  
  // Check conditional questions
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

// Move to Previous Question
function moveToPreviousQuestion() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  
  // Check conditional questions
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

// Update Progress Bar
function updateProgress() {
  const allQuestions = [...bestPracticesQuestions, ...big5Questions];
  const totalQuestions = allQuestions.length;
  const answeredQuestions = Object.keys(quizState.answers).length;
  
  // Add contact form completion
  const contactCompleted = quizState.contactInfo.name && quizState.contactInfo.email && quizState.contactInfo.industry;
  const totalSteps = totalQuestions + 1; // +1 for contact form
  const completedSteps = answeredQuestions + (contactCompleted ? 1 : 0);
  
  const progress = (completedSteps / totalSteps) * 100;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// Calculate and Show Results
function calculateAndShowResults() {
  // Calculate scores
  const operationalScore = calculateOperationalScore(quizState.answers);
  const intentScore = calculateIntentScore(quizState.answers);
  const urgencyScore = calculateUrgencyScore(quizState.answers);
  
  // Determine profile
  const profile = determineLeadProfile(operationalScore, intentScore, urgencyScore);
  
  // Calculate savings
  const savings = calculateSavingsPotential(quizState.answers);
  
  // Get profile content
  const content = getProfileContent(profile.profile, {
    operational: operationalScore,
    intent: intentScore,
    urgency: urgencyScore
  }, savings);
  
  // Render results
  renderResults(profile, content, {
    operational: operationalScore,
    intent: intentScore,
    urgency: urgencyScore
  }, savings);
  
  // Show results section
  showSection('results');
  
  // TODO: Send data to backend/CRM
  console.log('Quiz Results:', {
    contact: quizState.contactInfo,
    answers: quizState.answers,
    scores: {
      operational: operationalScore,
      intent: intentScore,
      urgency: urgencyScore
    },
    profile: profile,
    savings: savings
  });
}

// Render Results Page
function renderResults(profile, content, scores, savings) {
  const container = document.getElementById('results-content');
  
  container.innerHTML = `
    <div class="results-header">
      <h1 class="ds-text-5xl ds-font-bold ds-text-primary-dark" style="margin-bottom:var(--ds-spacing-4);">
        ${content.headline}
      </h1>
      <div class="results-score">${scores.operational}/10</div>
      <p class="ds-text-xl ds-text-gray-600">
        Your Operational Efficiency Score
      </p>
    </div>
    
    <div class="results-profile-card profile-${profile.profile.toLowerCase()}">
      <div style="text-align:center;margin-bottom:var(--ds-spacing-6);">
        <div style="font-size:4em;margin-bottom:var(--ds-spacing-4);">
          ${profile.profile === 'A' ? '🔥' : profile.profile === 'B' ? '🟡' : profile.profile === 'C' ? '🔴' : '❄️'}
        </div>
        <h2 class="ds-text-3xl ds-font-bold" style="margin-bottom:var(--ds-spacing-2);">
          ${profile.name}
        </h2>
        <p class="ds-text-lg" style="opacity:0.9;">
          Priority ${profile.priority} - ${profile.action.replace('-', ' ').toUpperCase()}
        </p>
      </div>
      
      <div style="background:rgba(255,255,255,0.2);padding:var(--ds-spacing-6);border-radius:var(--ds-radius-base);margin:var(--ds-spacing-6) 0;">
        <p class="ds-text-lg" style="line-height:var(--ds-line-height-relaxed);margin-bottom:var(--ds-spacing-4);">
          ${content.message}
        </p>
      </div>
      
      ${content.savings ? `
        <div style="text-align:center;background:rgba(255,255,255,0.2);padding:var(--ds-spacing-6);border-radius:var(--ds-radius-base);margin:var(--ds-spacing-6) 0;">
          <div class="ds-text-sm" style="opacity:0.9;margin-bottom:var(--ds-spacing-2);">YOUR POTENTIAL SAVINGS</div>
          <div class="results-savings">$${content.savings.toLocaleString()}/year</div>
          <div class="ds-text-sm" style="opacity:0.9;margin-top:var(--ds-spacing-2);">
            Currently: $${savings.currentCost.toLocaleString()}/month → With Ocean VA: $${savings.vaCost.toLocaleString()}/month
          </div>
        </div>
      ` : ''}
      
      <div class="results-cta" style="text-align:center;">
        <a href="${content.cta.link}" class="results-cta-button">
          ${content.cta.text}
        </a>
      </div>
      
      ${content.bonus ? `
        <div style="text-align:center;margin-top:var(--ds-spacing-6);padding-top:var(--ds-spacing-6);border-top:2px solid rgba(255,255,255,0.3);">
          <p class="ds-text-base" style="opacity:0.9;">
            ${content.bonus}
          </p>
        </div>
      ` : ''}
    </div>
    
    <div style="background:var(--ds-color-white);padding:var(--ds-spacing-8);border-radius:var(--ds-radius-lg);margin-top:var(--ds-spacing-8);box-shadow:var(--ds-shadow-md);">
      <h3 class="ds-text-2xl ds-font-bold ds-text-primary-dark" style="margin-bottom:var(--ds-spacing-6);text-align:center;">
        Your Detailed Scores
      </h3>
      <div class="ds-grid ds-grid-3" style="gap:var(--ds-spacing-6);">
        <div style="text-align:center;padding:var(--ds-spacing-6);background:var(--ds-color-gray-50);border-radius:var(--ds-radius-base);">
          <div class="ds-text-3xl ds-font-bold ds-text-primary-dark">${scores.operational}/10</div>
          <div class="ds-text-sm ds-text-gray-600">Operational Maturity</div>
        </div>
        <div style="text-align:center;padding:var(--ds-spacing-6);background:var(--ds-color-gray-50);border-radius:var(--ds-radius-base);">
          <div class="ds-text-3xl ds-font-bold ds-text-primary-dark">${scores.intent}/15</div>
          <div class="ds-text-sm ds-text-gray-600">Purchase Intent</div>
        </div>
        <div style="text-align:center;padding:var(--ds-spacing-6);background:var(--ds-color-gray-50);border-radius:var(--ds-radius-base);">
          <div class="ds-text-3xl ds-font-bold ds-text-primary-dark">${scores.urgency}/8</div>
          <div class="ds-text-sm ds-text-gray-600">Urgency Level</div>
        </div>
      </div>
    </div>
  `;
}

