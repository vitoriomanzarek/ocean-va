import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JoanaProfile() {
  const joanaData = {
    name: 'JOANA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Joana.webp',
    summary: 'Reliable Virtual Assistant with hands-on experience in administrative support, customer interaction, and digital communication. With strong bilingual communication skills and a proactive approach, Joana confidently manages responsibilities such as:',
    tagline: 'Joana delivers high-quality support that allows busy professionals to stay focused on growth.',
    videoUrl: 'https://www.youtube.com/embed/PrZ7xZryyjQ',
    videoThumbnail: 'https://img.youtube.com/vi/PrZ7xZryyjQ/maxresdefault.jpg',
    thumbnail: 'Administrative support, Bilingual communication, Operations leadership',
    
    skills: [
      'Social Media Management',
      'Online Research & Report Preparation',
      'Invoice Generation',
      'Insurance Policy Guidance',
      'Travel Planning & Booking',
      'Files Organization',
      'Data Entry',
      'Calendar & Email Management',
      'Inbound & Outbound Calls',
      'Content Creation'
    ],
    
    tools: [
      'CRMs',
      'Canva',
      'Cloud Storage Platform',
      'Google Suite',
      'Microsoft Office',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Joana has over 8 years of combined experience in administrative support and operations leadership, with a strong foundation in customer service and team coordination. She gained her administrative expertise at Poder Judicial managing documents, hearings, and public inquiries, and honed her operational and managerial skills at TTEC and Listen Trust, overseeing teams and streamlining business processes. Her career reflects a blend of administrative precision, communication strength, and strategic execution.',
    
    employmentHistory: [
      {
        company: 'OCEAN VA SOLUTIONS',
        position: 'Virtual Assistant',
        period: 'JUL 2024 - MAY 2025',
        description: '• Supported insurance agents by handling policy documentation, client onboarding, scheduling, inbox monitoring, and reporting to ensure timely and accurate insurance processing.'
      },
      {
        company: 'TTEC',
        position: 'Operations Manager',
        period: '2021 - 2024',
        description: '• Oversaw business operations by monitoring production, handling payroll and timecards, implementing efficiency strategies, and ensuring quality control.'
      },
      {
        company: 'PODER JUDICIAL TERCERO PENAL',
        position: 'Administrative Assistant',
        period: '2019 - 2021',
        description: '• Provided public-facing administrative support by drafting and digitizing documents, managing calls and mail, and attending court hearings weekly.'
      },
      {
        company: 'LISTEN TRUST',
        position: 'Supervisor',
        period: '2016 - 2019',
        description: '• Led the Customer Service Division by training staff, managing performance, overseeing operations, and contributing to budget preparation.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '6.6',
    englishDescription: 'Speaks with reasonable fluency and clarity, using a variety of connectives and grammar structures to express ideas. Pronunciation is clear and easy to understand, and vocabulary is generally effective for discussion across topics.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Universidad Interamericana para el Desarrollo',
      degree: 'Law Degree',
      date: '2016 - 2019',
      certifications: [
        'Harvard Business School Online\'s Financial Analysis and Valuation for Lawyers Program',
        'Certification Six Sigma: White Belt - Yellow Belt',
        'Diplomado "Juicio de Amparo" - Casas de la Cultura Jurídica, SCJN Edición 2022'
      ]
    }
  }

  return <VAProfilePage vaData={joanaData} />
}
