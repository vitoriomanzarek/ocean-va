import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function IsraelProfile() {
  const israelData = {
    name: 'ISRAEL',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Israel.webp',
    summary: 'Israel is a detail-oriented and proactive Virtual Assistant with a strong foundation in customer service, administrative support, and talent acquisition. With over three years of experience in bilingual roles, he excels in communication, problem-solving, and workflow optimization. His expertise includes:',
    tagline: 'Israel ensures smooth operations and top-tier support. His adaptability and organizational skills make him a valuable asset to any team. Click here to learn more about him.',
    videoUrl: 'https://www.youtube.com/embed/aSLhEc15mN4',
    videoThumbnail: 'https://img.youtube.com/vi/aSLhEc15mN4/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Bilingual support, Customer service',
    
    skills: [
      'Patient Account Management',
      'Customer Service & Support',
      'Documentation Management',
      'Process Optimization',
      'Data Entry',
      'Insurance Verification & Compliance',
      'Administrative & HR Assistance',
      'Quality Assurance',
      'Talent Acquisition',
      'Recruitment Coordination',
      'Claims Processing'
    ],
    
    tools: [
      'Salesforce',
      'Vonage',
      'Verbex',
      'Genesys',
      'Microsoft Office',
      'Google Workspace',
      'HIPAA Compliance'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Israel has 2 years of experience in the insurance industry, primarily gained through his roles at SWBC and Teleperformance. At SWBC, he worked as an Inbound Customer Service Representative supporting financial institutions and insurance agents by managing collateral protection insurance for auto and mortgage loans. Prior to that, at Teleperformance, he verified commercial health insurance, processed Medicare-related tasks, and supported patients with insurance authorizations and documentation for medical devices. His combined experience in both roles demonstrates a solid foundation in insurance processes, client communication, and policy-related support. His strengths include strong customer service skills, attention to detail, bilingual communication, administrative excellence, and insurance knowledge.',
    
    employmentHistory: [
      {
        company: 'SWBC',
        position: 'Inbound Customer Service Representative',
        period: '2024',
        description: '• Provides support to financial institutions and insurance agents by managing auto and mortgage loan insurance coverage and identifying uninsured loans.'
      },
      {
        company: 'DMF SERVICE SOLUTIONS',
        position: 'Talent Acquisition Coordinator',
        period: 'NOV 2021 - AUG 2022',
        description: '• Managed bilingual recruitment, coordinated interviews, supported HR processes, and assisted with equipment and onboarding logistics for remote customer service teams.'
      },
      {
        company: 'TELEPERFORMANCE',
        position: 'Medicare and Commercial Reorder Specialist',
        period: 'FEB 2020 - JUL 2021',
        description: '• Supported U.S. patients by verifying health insurance, processing Medicare information, coordinating with pharmacies, and handling medical documentation for Dexcom CGM devices.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '6.5',
    englishDescription: 'Communicates clearly with good pronunciation. Demonstrates solid fluency and coherence with occasional pauses. Uses a varied vocabulary, including some idiomatic expressions, and conveys complex ideas with mostly accurate grammar and moderate level of flexibility.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={israelData} />
}
