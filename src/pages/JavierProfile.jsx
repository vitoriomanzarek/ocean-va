import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JavierProfile() {
  const javierData = {
    name: 'JAVIER',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Javier.webp',
    summary: 'Javier is a detail-oriented and bilingual Virtual Assistant with a unique blend of experience in insurance claims, customer service, and HSE compliance within the automotive and chemical industries. With a strong foundation in legal and safety standards, Javier excels at managing complex processes like:',
    tagline: 'Javier is a versatile VA prepared to support insurance agencies, safety teams, and administrative departments with a process-driven mindset.',
    videoUrl: 'https://www.youtube.com/embed/UCqesVIO_7M',
    videoThumbnail: 'https://img.youtube.com/vi/UCqesVIO_7M/hqdefault.jpg',
    thumbnail: 'Insurance expertise, HSE compliance, Bilingual support',
    
    skills: [
      'Auto Claims Adjustment',
      'Policyholder Communication',
      'Audits & Corrective Actions',
      'Root Cause Analysis (RCA)',
      'Legal Compliance',
      'Productivity Tracking',
      'HSE Management',
      'Technical Documentation',
      'Roadside Assistance',
      'Certified DOT Safety Training'
    ],
    
    tools: [
      'Aspen',
      'Remote Call',
      'Case Handling Platforms',
      'Solidworks',
      'Microsoft 365',
      'Advanced Excel'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Javier has extensive experience in HSE compliance, insurance claims, and customer service. He worked as an HSE Specialist at Faurecia (Forvia) - Injection Molding Plant, coordinating audits, implementing corrective actions, and leading health and safety campaigns. He served as a Bilingual Customer Service Representative at Nation Safe Drivers, providing remote support to insurance clients and handling roadside emergencies. He worked as an Auto Claims Adjuster at The General Insurance, assessing vehicle damage and performing root cause analysis. His strengths include strong HSE knowledge, attention to detail, bilingual communication, customer service excellence, and technical proficiency with insurance and safety systems.',
    
    employmentHistory: [
      {
        company: 'FAURECIA (FORVIA) - INJECTION MOLDING PLANT',
        position: 'HSE Specialist',
        period: '2021 - 2022',
        description: '• Coordinated internal audits and recertification processes (Clean Industry - PROFEPA).\n• Implemented corrective actions in compliance with ISO 9001, ISO 14001, ISO 45001, and NOMIMX standards, achieving Clean Industry recertification.\n• Led bilingual health and safety campaigns, promoting a risk prevention culture that contributed to a 50+ reduction in workplace accidents during my tenure.\n• Supervised the handling and storage of urban, biohazardous, and hazardous waste.\n• Managed PPE, COVID-19 prevention protocols, and delivered certified training (DC3).\n• Designed and executed a comprehensive ergonomic study of workstations (lighting analysis, postural risk evaluation)'
      },
      {
        company: 'NATION SAFE DRIVERS',
        position: 'Bilingual Customer Service - Roadside Assistance & Towing',
        period: '2022 - 2023',
        description: '• Provided remote bilingual support to insurance clients (Farmers, Progressive, Allstate, Chubb).\n• Coordinated with service providers to deliver prompt solutions during roadside emergencies.\n• Handled confidential information in compliance with quality and security protocols.'
      },
      {
        company: 'THE GENERAL INSURANCE',
        position: 'Auto Claims Adjuster',
        period: '2024 - 2025',
        description: '• Assessed vehicle damage and performed root cause and loss analysis for auto claims.\n• Ensured legal and regulatory compliance throughout the claims process.\n• Recognized for high performance and adaptability, achieving a 25% productivity improvement within a 3-month period'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '95',
    englishDescription: 'Communicates fluently and naturally with clear pronunciation and strong command of grammar. Uses a wide range of vocabulary and expressions to convey ideas accurately and confidently across various topics.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Universidad Autónoma Popular del Estado de Puebla',
      degree: 'Not specified',
      date: '2016 - 2022'
    }
  }

  return <VAProfilePage vaData={javierData} />
}
