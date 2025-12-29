/**
 * Ocean VA Operational Efficiency Scorecard
 * Questions Data Structure
 */

export const contactFields = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your full name'
  },
  {
    id: 'email',
    label: 'Business Email',
    type: 'email',
    required: true,
    placeholder: 'your@email.com'
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: false,
    placeholder: '(555) 123-4567'
  },
  {
    id: 'industry',
    label: 'Industry',
    type: 'select',
    required: true,
    options: [
      { value: 'insurance', label: 'Insurance Agency' },
      { value: 'real-estate', label: 'Real Estate' },
      { value: 'mortgage', label: 'Mortgage' },
      { value: 'property-management', label: 'Property Management' },
      { value: 'other', label: 'Other' }
    ]
  }
];

export const bestPracticesQuestions = [
  {
    id: 'q5',
    number: 5,
    question: 'Do you have a written manual or process documented for at least 5 repetitive tasks (e.g., email/CRM management)?',
    area: 'Process Documentation',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ],
    insight: 'Measures scalability readiness and systems thinking'
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
    ],
    insight: 'Measures mindset and current delegation behavior'
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
    ],
    insight: 'Measures efficiency level and ROI opportunity'
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
    ],
    insight: 'Measures data-driven mindset and ROI awareness'
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
    ],
    insight: 'Measures financial sophistication and buying readiness'
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
    ],
    insight: 'Measures business maturity and growth readiness'
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
    ],
    insight: 'Measures tech readiness and remote work comfort'
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
    ],
    insight: 'Measures industry fit and immediate use case'
  },
  {
    id: 'q13',
    number: 13,
    question: 'Do you have incoming leads that don\'t receive follow-up within the first 24 hours due to lack of capacity?',
    area: 'Highly Delegable Tasks',
    urgencyFlag: true,
    reverseScore: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' }
    ],
    insight: '⚠️ URGENCY FLAG: YES = +5 urgency points. Reveals $26,000/year money loss'
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
    ],
    insight: '⚠️ URGENCY FLAG: YES = +3 urgency points. Knows replacement pain ($5K-15K per employee)'
  }
];

export const big5Questions = [
  {
    id: 'q15',
    number: 15,
    question: 'What is your main goal for the next 3 months?',
    area: 'Priority Need',
    weight: 3,
    options: [
      { value: 'save-money', label: 'Save money' },
      { value: 'increase-capacity', label: 'Increase service capacity' },
      { value: 'focus-sales', label: 'Focus on sales' },
      { value: 'other', label: 'Other' }
    ],
    insight: 'Measures priority need and buying motivation'
  },
  {
    id: 'q16',
    number: 16,
    question: 'What do you think is your biggest obstacle to successful delegation?',
    area: 'Main Objection',
    weight: 1,
    options: [
      { value: 'fear-quality', label: 'Fear of quality' },
      { value: 'lack-processes', label: 'Lack of processes' },
      { value: 'dont-know', label: 'Don\'t know what to delegate' },
      { value: 'cost', label: 'Cost' }
    ],
    insight: 'Measures main objection to address in sales'
  },
  {
    id: 'q17',
    number: 17,
    question: 'How many administrative work hours per week would you like to delegate to a VA?',
    area: 'Service Scale',
    weight: 4,
    options: [
      { value: '10-20', label: '10-20 hours' },
      { value: '20-40', label: '20-40 hours' },
      { value: '40-plus', label: '+40 hours' }
    ],
    insight: 'Measures required service scale and budget ($750 vs $1,300/month)'
  },
  {
    id: 'q18',
    number: 18,
    question: 'What type of solution are you currently seeking?',
    area: 'Purchase Intent',
    weight: 5,
    starQuestion: true,
    options: [
      { value: 'just-guidance', label: 'Just guidance/information' },
      { value: 'process-consulting', label: 'Process consulting' },
      { value: 'part-time-va', label: 'Part-Time VA Support' },
      { value: 'full-time-va', label: 'Full-Time VA Support' }
    ],
    insight: '⭐ MOST IMPORTANT QUESTION - Best closing predictor. Measures purchase intent and ideal plan'
  },
  {
    id: 'q19',
    number: 19,
    question: 'Is there any additional comment we should know about your current situation or VA need?',
    area: 'Open Box',
    weight: 0,
    goldQuestion: true,
    type: 'textarea',
    placeholder: 'This is often the most valuable field! Share any details about your situation, budget, timeline, or concerns...',
    insight: '💎 Reveals critical information: hidden budget, real urgency, unspoken objections'
  }
];

