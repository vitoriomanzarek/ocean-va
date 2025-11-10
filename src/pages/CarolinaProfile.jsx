import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function CarolinaProfile() {
  const carolinaData = {
    name: 'CAROLINA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Carolina.webp',
    summary: 'Experienced bilingual virtual assistant with a solid background in real estate and project management across the fashion and automotive industries. Her comprehensive expertise enables her to effectively manage responsibilities such as:',
    tagline: 'Ready to help drive your business growth from day one! Click here to learn more about her.',
    videoUrl: 'https://www.youtube.com/embed/_3cmkdxncdg',
    videoThumbnail: 'https://img.youtube.com/vi/_3cmkdxncdg/maxresdefault.jpg',
    thumbnail: 'Real estate expertise, Project management, Bilingual support',
    
    skills: [
      'Email & Calendar',
      'Billing & Invoice Processing',
      'Policy Payments',
      'Incoming Installments Tracking',
      'Inbound & Outbound Calls',
      'Purchase Order Creation',
      'Financial Analysis',
      'Policy Updates',
      'Quoting',
      'Customer Service',
      'Mortgagee Updates',
      'Policy Renewals',
      'Certificates of Insurance Issue'
    ],
    
    tools: [
      'SAE',
      'Citrix',
      'Contpaq',
      'AdminPaq',
      'Ezlynx',
      'MS Office',
      'Google Workspace',
      'Zoom Workplace',
      'InsuredMine'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Carolina has extensive experience in real estate, finance, and administrative support. She gained 3 years of real estate experience while working as an Accounting Clerk at Gordian Staffing, managing property onboarding, deed reviews, and coordinating conveyances for a U.S.-based real estate team. She brings over 6 years of administrative experience from previous roles supporting finance, HR, logistics, and vendor coordination across multiple companies in both English and Spanish-speaking environments. Her roles include Production Assistant at Tech Style, Staff Tool Division at Jatco Mexico, and Funder I at NR Finance. Her strengths include attention to detail, bilingual communication, organizational excellence, and financial acumen.',
    
    employmentHistory: [
      {
        company: 'GORDIAN STAFFING',
        position: 'Accounting Clerk',
        period: '2022 - 2025',
        description: '• Managed real estate administrative tasks including property onboarding, deed reviews, and client communication for a U.S.-based property firm.'
      },
      {
        company: 'TECH STYLE',
        position: 'Production Assistant',
        period: '2021 - 2022',
        description: '• Oversee customs procedures, coordinated with brokers and transport providers, and supported internal teams with shipping documentation and operations.'
      },
      {
        company: 'JATCO MEXICO',
        position: 'Staff Tool Division',
        period: '2020 - 2022',
        description: '• Handled recruitment logistics, coordinated job fairs, managed candidate evaluations, and provided bilingual support across HR functions.'
      },
      {
        company: 'NR FINANCE',
        position: 'Funder I',
        period: '2017 - 2019',
        description: '• Supported financial processes by managing purchase orders, updating internal records, and coordinating with vendors for account payables.'
      }
    ],
    
    discResult: 'C+S',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '6.9',
    englishDescription: 'Communicates clearly with good fluency and coherence. Pronunciation is strong and easily understood. Uses a sufficient vocabulary and complex grammar structures with flexibility, effectively expressing complex thoughts.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'TEC Milenio',
      degree: 'Bachelor of Business Administration',
      date: '2011 - 2016',
      certifications: [
        'Introduction to Personal Lines',
        'Personal Auto',
        'Dwelling',
        'Introduction to Commercial Lines',
        'Commercial Auto',
        'Property',
        'General Liability'
      ]
    }
  }

  return <VAProfilePage vaData={carolinaData} />
}
