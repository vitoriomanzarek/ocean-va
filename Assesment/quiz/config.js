/**
 * Ocean VA Operational Efficiency Scorecard
 * Configuration File
 * 
 * Personaliza aquí los valores, mensajes y URLs del quiz
 */

export const quizConfig = {
  // Branding
  brandName: 'Ocean Virtual Assistant',
  brandColor: '#05bfb9',
  
  // Landing Page
  landingPage: {
    frustrationHook: 'Frustrated by the high cost of staff while your team spends hours on tasks that could be delegated?',
    resultsHook: 'Discover Your Hidden Operational Costs',
    subheading: 'Answer 15 questions in 3 minutes and discover your Efficiency Score + your real monthly savings potential in dollars',
    valueProps: [
      {
        icon: '💰',
        title: 'Save Money',
        description: 'Up to 70% cost reduction vs. local employees'
      },
      {
        icon: '⏱️',
        title: 'Recover Time',
        description: '15+ hours per week back to your team'
      },
      {
        icon: '🛡️',
        title: 'No Turnover Risk',
        description: 'Zero replacement costs, guaranteed coverage'
      }
    ],
    credibility: {
      agencies: 'More than 100 insurance agencies',
      hoursRecovered: '15+ hours weekly'
    }
  },
  
  // Pricing
  pricing: {
    currentEmployeeCost: 4500, // $/month
    partTimeVACost: 750, // $/month
    fullTimeVACost: 1300 // $/month
  },
  
  // Results Page CTAs
  ctas: {
    profileA: {
      text: 'SCHEDULE MY CALL NOW',
      link: '#booking',
      action: 'schedule-call'
    },
    profileB: {
      text: 'DOWNLOAD GUIDE NOW',
      link: '#guide',
      action: 'download-guide'
    },
    profileC: {
      text: 'WATCH VIDEO NOW',
      link: '#video',
      action: 'watch-video'
    },
    profileD: {
      text: 'EXPLORE RESOURCES',
      link: '#resources',
      action: 'explore-resources'
    }
  },
  
  // CRM Integration
  crm: {
    enabled: false,
    webhookUrl: '', // Tu webhook URL aquí
    apiKey: '', // Si es necesario
    sendOnComplete: true
  },
  
  // Analytics
  analytics: {
    googleAnalytics: {
      enabled: false,
      trackingId: '' // GA4 Measurement ID
    },
    facebookPixel: {
      enabled: false,
      pixelId: ''
    }
  },
  
  // Email Integration
  email: {
    enabled: false,
    service: 'mailchimp', // 'mailchimp', 'sendgrid', 'custom'
    apiKey: '',
    listId: '',
    sendResultsEmail: true,
    nurtureSequences: {
      profileA: 'immediate-follow-up',
      profileB: 'warm-nurture',
      profileC: 'urgency-sequence',
      profileD: 'passive-nurture'
    }
  },
  
  // Custom Messages
  messages: {
    validation: {
      required: 'Please select an answer before continuing.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.'
    },
    completion: {
      thankYou: 'Thank you for completing the assessment!',
      resultsReady: 'Your personalized results are ready.'
    }
  },
  
  // Feature Flags
  features: {
    showProgressBar: true,
    showQuestionInsights: true,
    showDetailedScores: true,
    allowSkipQuestions: false,
    saveProgress: false // Guardar progreso en localStorage
  }
};

