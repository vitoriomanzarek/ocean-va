import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function LauriceProfile() {
  const lauriceData = {
    name: 'LAURICE',
    title: 'INSURANCE VIRTUAL ASSISTANT | HOME INSURANCE',
    image: '/images/VAs/Laurice.webp',
    summary: 'Laurice is an Insurance Virtual Assistant and Closer supporting U.S.-based agencies. She specializes in home insurance quoting, renewals, and policy management, ensuring full compliance with underwriting guidelines. Laurice updates policies, manages client pipelines, and reviews premiums to maintain competitive rates. She delivers accurate, efficient, and client-focused insurance support.',
    tagline: 'Laurice distinguishes herself through her precision, dependability, and commitment to client-centered service. Her keen attention to detail, combined with proactive and thoughtful communication, allows her to consistently provide high-quality support that drives operational efficiency and strengthens overall client satisfaction.',
    videoUrl: 'https://www.youtube.com/embed/9cz71wjqIX8',
    videoThumbnail: 'https://img.youtube.com/vi/9cz71wjqIX8/maxresdefault.jpg',
    thumbnail: 'Home insurance expertise, Policy management, Customer service',
    
    skills: [
      'Renewals',
      'Underwriting Compliance',
      'Client Pipeline',
      'Data Accuracy',
      'Customer Communication',
      'Deductibles',
      'Lead Management',
      'Quoting',
      'Policy Updates',
      'Endorsement',
      'Property Verification',
      'Email Support'
    ],
    
    tools: [
      'Quoush',
      'Ezlynx',
      'InsuredMine',
      'Salesforce',
      'Microsoft 365',
      'Google Workspace',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Laurice has 1.4 years of comprehensive home insurance experience, primarily gained as a Virtual Assistant at CoverDesk. In this role, she specialized in quoting homes and handling home insurance coverage. Prior to this, she served as a Customer Service Agent at Teleperformance, managing a Healthcare account. Her responsibilities included account management, overseeing the billing department, and ensuring customer billing statements were accurate. Additionally, she did training in healthcare insurance regarding claims and benefits concerns. These experiences highlight her strong skills in customer service, account management, and specialized insurance knowledge.',
    
    employmentHistory: [
      {
        company: 'COVERDESK',
        position: 'Virtual Assistant',
        period: 'MAY 2024 - SEPT 2025',
        description: '• 1 year of experience as a Virtual Assistant in CoverDesk, handling home insurance.\n• Specialized in quoting homes and requested home insurance coverage.'
      },
      {
        company: 'TELEPERFORMANCE',
        position: 'Customer Service Agent',
        period: 'SEPT 2023 - MAY 2024',
        description: '• Tenured for 8 months in Teleperformance, handling Healthcare account as a Customer Service Agent.\n• Has experience in maintaining account management, the billing department, and making sure that the customer\'s billing statements are up to date.'
      },
      {
        company: 'HEALTHCARE INSURANCE',
        position: 'Claims and Benefits',
        period: '',
        description: '• Trained for claims and benefits concerns in Healthcare Insurance for 2 months.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '8.4/9',
    englishDescription: 'Demonstrates fluent and natural communication with clear pronunciation and minimal pauses. Uses advanced vocabulary and complex grammar accurately to convey nuanced and well-structured ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={lauriceData} />
}
