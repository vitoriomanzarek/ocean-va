import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MaVenusProfile() {
  const maVenusData = {
    name: 'MA. VENUS',
    title: 'INSURANCE AGENT | AUTO INSURANCE SPECIALIST',
    image: '/images/VAs/Ma Venus.webp',
    summary: 'Ma. Venus is an insurance agent with 1.5 years of experience, specializing in auto insurance sales, policy servicing, coverage guidance, quoting, and policy adjustments. She brings together solid technical skills and a client-centered approach, ensuring pre-sale policy review and clear, effective communication with insured clients.',
    tagline: 'Venus brings a well-rounded blend of insurance knowledge, sales experience, technical skills, and customer service expertise to help agencies deliver efficient and accurate insurance operations.',
    videoUrl: 'https://www.youtube.com/embed/AgUkZKEWzkw',
    videoThumbnail: 'https://img.youtube.com/vi/AgUkZKEWzkw/maxresdefault.jpg',
    thumbnail: 'Auto insurance expertise, Sales management, Policy servicing',
    
    skills: [
      'Auto Insurance Sales & Policy Management',
      'Quotes & Policy Changes',
      'Coverage Explanations & Client Support',
      'Endorsement Handling',
      'Payment & Billing Coordination',
      'Certificate of Insurance Preparation'
    ],
    
    tools: [
      'Salesforce',
      'Microsoft Excel',
      'Microsoft Office',
      'Financial Software'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Ma. Venus has 2 years of auto insurance experience, gained through her role as an Insurance Agent at Motor Vehicle Insurance CTPL/TPL ALPHA Insurance. There, she excelled in sales, policy servicing, explaining coverage, generating quotes, and processing policy changes. Her skills include Salesforce, Excel, and financial software, which complement her strong technical and client-service abilities. Additionally, she has experience as a freelance private tutor and an encoder at the Motor Vehicle Inspection Center.',
    
    employmentHistory: [
      {
        company: 'MOTOR VEHICLE INSURANCE CTPL/TPL ALPHA INSURANCE',
        position: 'Insurance Agent',
        period: '2024 - 2024',
        description: ''
      },
      {
        company: 'MOTOR VEHICLE INSPECTION CENTER',
        position: 'Encoder',
        period: '2024 - 2024',
        description: ''
      },
      {
        company: 'FREELANCE - BACOLOD CITY',
        position: 'Private Tutor',
        period: '2022 - 2025',
        description: ''
      }
    ],
    
    discResult: 'C+S',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '70',
    englishDescription: 'Speaks clearly with understandable pronunciation and reasonable fluency. Uses vocabulary and grammar effectively, with a growing ability to express more complex ideas.',
    
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

  return <VAProfilePage vaData={maVenusData} />
}
