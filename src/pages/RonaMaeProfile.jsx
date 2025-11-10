import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function RonaMaeProfile() {
  const ronaMaeData = {
    name: 'RONA MAE',
    title: 'INSURANCE VIRTUAL ASSISTANT',
    image: '/images/VAs/Rona Mae.webp',
    summary: 'Rona Mae is a professional Insurance Virtual Assistant with a strong background in policy servicing, quoting, renewals, and administrative operations. She has supported agencies by processing renewals, handling applications, managing invoices, checking policies, and handling client documentation. She ensures accuracy and efficiency in managing policies, billing, and client communication.',
    tagline: 'Rona is an ideal Virtual Assistant for insurance agencies, HR teams, and service-based businesses seeking a professional who can combine insurance operations expertise with strong HR and administrative support to ensure seamless day-to-day efficiency.',
    videoUrl: 'https://www.youtube.com/embed/eHrDpnlAeoc',
    videoThumbnail: 'https://img.youtube.com/vi/eHrDpnlAeoc/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, HR support, Administrative operations',
    
    skills: [
      'Processing Quarterly',
      'Payroll Compliance',
      'Insurance Quoting',
      'Recruitment',
      'Customer & Carrier Communication',
      'Documentation Management',
      'Invoice Processing',
      'Policy & Mortgage Updates',
      'Marketing Support',
      'Reshop Renewals',
      'Policy Updates'
    ],
    
    tools: [
      'Ezlynx',
      'AMS',
      'QQ Catalyst',
      'Slack',
      'Canva',
      'Adobe Photoshop',
      'Ring Central',
      'Microsoft Office',
      'Microsoft Teams'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Rona Mae gained her 2 years of experience in Personal Lines Insurance while working as an Insurance Virtual Assistant in a freelance role. During this time, she handled tasks such as reshoping renewals, quote preparation, submitting applications, policy documentation, endorsements, billing updates, and ACORD forms. She was also proficient in using CRM systems and carrier platforms like Vertafore, AMS, QQ Catalyst, and EZLynx, directly supporting U.S.-based insurance agencies with a strong focus on personal lines support.',
    
    employmentHistory: [
      {
        company: 'FREELANCER',
        position: 'Insurance Virtual Assistant',
        period: '2023 - 2025',
        description: '• Provided comprehensive support in Personal Lines Insurance, including quoting, renewals, policy documentation, CRM and carrier site management, billing updates, and client communication using tools like EZLynx, AMS, QQ Catalyst, and Vertafore.'
      },
      {
        company: 'SUNWEST, INC.',
        position: 'HR Assistant',
        period: '2022 - 2024',
        description: '• Handled full-cycle recruitment, onboarding, timekeeping, payroll processing, employee relations, and HRIS data management to support organizational HR functions.'
      },
      {
        company: 'LRWC',
        position: 'HR Generalist',
        period: '2013 - 2021',
        description: '• Managed payroll, government compliance, loan processing, timekeeping, and HR reporting while ensuring accurate documentation and adherence to labor regulations.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '85',
    englishDescription: 'Speaks clearly with good fluency and coherence, using a solid range of vocabulary to express ideas. Demonstrates accurate grammar and clear pronunciation.',
    
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

  return <VAProfilePage vaData={ronaMaeData} />
}
