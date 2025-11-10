import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function RochelleProfile() {
  const rochelleData = {
    name: 'ROCHELLE',
    title: 'INSURANCE VIRTUAL ASSISTANT | COMMERCIAL LINES SPECIALIST',
    image: '/images/VAs/Rochelle.webp',
    summary: 'Rochelle is an experienced Insurance Virtual Assistant with a strong background in commercial lines policy, processing and administrative support. Her role involves ensuring accuracy in submissions, managing documents, and supporting agency workflows using platforms such as Applied Epic, Microsoft Office, Outlook, and Teams.',
    tagline: 'She is the ideal Virtual Assistant for insurance agencies and service-based businesses seeking a detail-oriented professional with hands-on experience in Commercial Lines policy processing and administrative support.',
    videoUrl: 'https://www.youtube.com/embed/aCJyNu79nto',
    videoThumbnail: 'https://img.youtube.com/vi/aCJyNu79nto/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Commercial lines, Administrative support',
    
    skills: [
      'Administrative Assistance & Reporting Support',
      'Commercial Lines Policy Processing',
      'Client Communication',
      'Claims Assistance',
      'Training & Assessment Experience',
      'Insurance Submission Desk Support',
      'Endorsements',
      'Renewals & Cancellations',
      'Collaboration Across Remote Teams',
      'Documentation Preparation',
      'Customer Service',
      'Data Entry & File Organization'
    ],
    
    tools: [
      'Applied Epic',
      'Microsoft Office',
      'Microsoft Teams',
      'Google Workspace',
      'Zoom & Online Collaboration Tools'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Rochelle gained her 4 years of experience in Personal and Commercial Lines Insurance through her ongoing role at SWAK BPO Corp as a Submission Desk staff. In this position, she processes various commercial insurance policies including GLTA, PROP, CPKG, BOP, WCOM, BAUT, and CUMB, demonstrating direct and specific experience in both Personal and Commercial Lines Insurance using platforms such as Applied Epic. She also served as a Language Assessor and ESL Teacher at GNGN Eikaiwa Phils., Inc., conducting English lessons and language assessments. She worked as a Trainee at Carlos P. Romulo Memorial Library and Museum, assisting with library operations and administrative tasks. Her strengths include strong attention to detail, administrative excellence, customer service skills, insurance knowledge, and communication proficiency.',
    
    employmentHistory: [
      {
        company: 'SWAK BPO CORP',
        position: 'Submission Desk Staff',
        period: 'AUG 2021 - 2025',
        description: '• Processes and submits commercial and personal lines insurance policies such as GLTA, PROP, CPKG, BOP, WCOM, BAUT, and CUMB for U.S.-based agencies using Applied Epic.'
      },
      {
        company: 'GNGN EIKAIWA PHILS., INC',
        position: 'Language Assessor and ESL Teacher',
        period: 'JUN 2019 - AUG 2021',
        description: '• Conducted English lessons and language assessments for students focusing on grammar, pronunciation, and communication skills.'
      },
      {
        company: 'CARLOS P. ROMULO MEMORIAL LIBRARY AND MUSEUM',
        position: 'Trainee',
        period: 'JAN 2019 - APR 2019',
        description: '• Assisted with library operations, including organizing materials, supporting visitors, and managing administrative tasks.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
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

  return <VAProfilePage vaData={rochelleData} />
}
