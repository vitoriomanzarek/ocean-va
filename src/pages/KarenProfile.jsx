import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function KarenProfile() {
  const karenData = {
    name: 'KAREN',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Karen.webp',
    summary: 'Dedicated and highly trained Insurance Virtual Assistant with experience supporting U.S.-based insurance organizations and executive assistance taking calls with a track record of exceeding performance expectations. She has demonstrated ability to manage the following core competencies:',
    tagline: 'Karen is committed to delivering accurate, detail-oriented virtual support tailored to the needs of insurance operations and client service workflows.',
    videoUrl: 'https://www.youtube.com/embed/TXb9ONnF310',
    videoThumbnail: 'https://img.youtube.com/vi/TXb9ONnF310/maxresdefault.jpg',
    thumbnail: 'Home-insurance experience, High-volume calling, Bilingual support',
    
    skills: [
      'Appraisal-Coordination',
      'Appointment Setting',
      'US Insurance Regulations (FL & TX)',
      'Quotation Handling',
      'Insurance Documentation Review & Prep',
      'Home-Risk Evaluations',
      'Homeowners, Umbrella & Dwelling Insurance',
      'Customer Service',
      'Inbound & Outbound Calls',
      'Email & Calendar',
      'Policy Coverage & Renewals'
    ],
    
    tools: [
      'Salesforce',
      'Hubspot',
      'Slack',
      'Google Workspace',
      'Zoom Workplace',
      'Microsoft Office Suite'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Karen has 1 year of home-insurance experience from Farmers Insurance, averaging 100-120 outbound calls daily and setting 40-50 appointments monthly. At NWPMC Homes & Remodels, she rose from Appointment Setter to Assistant Manager in three months, managing calendars, schedules, provider meetings, and project timelines. Earlier roles at Language Line Solutions, Good Neighbor Podcasts, and Estacion Mexico strengthened her interpretation, customer support, and client engagement. Core skills include high-volume cold calling, lead qualification, CRM/email and calendar management, project coordination, persuasive communication, rapid learning, and Spanish-English fluency.',
    
    employmentHistory: [
      {
        company: 'NWPMC HOMES & REMODELS',
        position: 'Virtual Assistant | Assistant Manager',
        period: 'JAN 2022 - JAN 2025',
        description: '• Managed company schedules, ensuring seamless appointment setting. Provided top-tier customer service, including email follow-ups, responding to inquiries, and sending quotes.\n• Coordinated meetings with providers, monitored project timelines, and maintained customer satisfaction.\n• Promoted within 3 months from Appointment Setter to Assistant Manager due to exceptional performance.'
      },
      {
        company: 'FARMERS INSURANCE',
        position: 'Inside Sales Agent | Appointment Setter',
        period: 'MAY 2021 - AUG 2022',
        description: '• Conducted 100-120 outbound calls daily to cold, warm, and referral leads, qualifying them for insurance products.\n• Consistently set 40-50 appointments per month, contributing to the growth of the business.'
      },
      {
        company: 'LANGUAGE LINE SOLUTIONS',
        position: 'Appointment Setter',
        period: 'DEC 2020 - AUG 2021',
        description: '• Focused on cold calling, lead generation, and scheduling appointments to maximize office calendar efficiency.\n• Generated leads for future follow-up and maintained regular client interaction for successful conversion.'
      },
      {
        company: 'GOOD NEIGHBOR PODCASTS',
        position: 'Bilingual Customer Support Representative',
        period: 'JAN 2021 - JAN 2022',
        description: '• Provided on-demand bilingual interpretation between Spanish and English speakers across various industries.'
      },
      {
        company: 'ESTACION MEXICO',
        position: 'Tour Guide and Hostess',
        period: 'MAR 2018 - JAN 2021',
        description: '• Led groups of tourists on educational and engaging tours, providing in-depth information on historical, cultural, and local landmarks.\n• Adapted tours based on client needs and preferences, ensuring a unique and tailored experience for diverse audiences.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '85/B2',
    englishDescription: 'Speaks confidently with clear pronunciation and well-structured, fluent speech. Uses a broad range of vocabulary and grammar to express ideas effectively in both casual and professional contexts.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={karenData} />
}
