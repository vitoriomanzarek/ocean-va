import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function DayanaProfile() {
  const dayanaData = {
    name: 'DAYANA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Dayana.webp',
    summary: 'Dayana is an experienced Customer Service professional with over 8 years of delivering exceptional customer support. She combines strong organizational skills with excellent problem-solving abilities and attention to detail, enabling her to build strong relationships and enhance brand reputation. Dayana is well-prepared to efficiently manage the following tasks:',
    tagline: 'Click to watch her Introduction Video.',
    videoUrl: 'https://www.youtube.com/embed/1xTnx_3MRPA',
    videoThumbnail: 'https://img.youtube.com/vi/1xTnx_3MRPA/maxresdefault.jpg',
    thumbnail: 'Customer service, Bilingual support, Safety coordination',
    
    skills: [
      'Quality Control',
      'Occupational Health & Safety Coordination',
      'Safety Audits Supervision',
      'Customer Support',
      'Data Entry',
      'Inbound & Outbound Calls',
      'Hazard Investigation & Corrective Actions',
      'Policy & Procedure Development',
      'Calendar & Email',
      'Emergency Readiness Coordination',
      'Appointment Scheduling',
      'Report Generation'
    ],
    
    tools: [
      'Slack',
      'Lawmatics',
      'Smokeball',
      'CRM Systems',
      'Ring Central',
      'Microsoft Office',
      'Google Workspace',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Dayana has extensive experience in customer service, occupational health and safety, and administrative support. She worked as a Customer Service Assistant at Navex (Medellin - Remote), providing friendly service and building strong customer relationships. She served as an Occupational Health and Safety Officer at Prefel (Medellin - On Site), developing programs and investigating hazardous incidents. She worked as a Customer Service Representative at Bilateral (Medellin - On Site), fulfilling customer orders and resolving service issues. She also worked as a Customer Service Representative at AT&T Emergia (Medellin - On Site), handling customer inquiries and cross-selling services. Her strengths include excellent customer service skills, strong organizational abilities, attention to detail, bilingual communication, and safety expertise.',
    
    employmentHistory: [
      {
        company: 'NAVEX (MEDELLIN - REMOTE)',
        position: 'Customer Service Assistant',
        period: 'SEPT 2021 - SEPT 2024',
        description: '• Provide friendly and attentive service by promptly responding to customer inquiries and processing order requests.\n• Enhanced customer experience and brand reputation through attentive and helpful service.\n• Built strong relationships with customers through courteous and professional communications.\n• Built rapport with customers through courteous and professional communications.'
      },
      {
        company: 'PREFEL (MEDELLIN - ON SITE)',
        position: 'Occupational Health and Safety Officer',
        period: 'OCT 2020 - MAY 2021',
        description: '• Developed and enforced a range of programs, policies, and procedures aimed at minimizing workplace injuries and hazards.\n• Examined hazardous incidents and accidents to uncover causes and provided corrective actions.\n• Coordinated monthly fire ensuring emergency readiness, drills. Instructed staffers during fire drills to gain awareness of proper evacuation routes and reporting techniques.\n• Supervised safety audits and oversaw investigations into plant quality issues.'
      },
      {
        company: 'BILATERAL (MEDELLIN - ON SITE)',
        position: 'Customer Service Representative',
        period: 'OCT 2018 - SEPT 2020',
        description: '• Assisted in fulfilling customer orders placed in person, via email, online, and by telephone.\n• Maximized customer satisfaction by promptly resolving service issues.\n• Handled confidential and sensitive data with discretion, reducing the risk of fraud and theft'
      },
      {
        company: 'AT&T EMERGIA (MEDELLIN - ON SITE)',
        position: 'Customer Service Representative',
        period: 'JAN 2016 - AUG 2018',
        description: '• Resolved customer queries over the phone and by email.\n• Ensured fine customer service by enthusiastically anticipating and catering to customer needs and requirements.\n• Assisted customers with product related questions, feedback, and complaints.\n• Re-scheduling appointments.\n• Cross-selling for services and products'
      }
    ],
    
    discResult: 'I',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '7.7',
    englishDescription: 'Demonstrates excellent fluency and clear pronunciation. Communicates ideas effectively using a broad vocabulary, including idiomatic expressions. Uses complex grammar structures with flexibility, maintaining coherence and clarity.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'CESDE - Colombia, Medellin',
      degree: 'Occupational Health and Safety Officer',
      date: '2021',
      certifications: [
        'Agency 101',
        'Employee Benefits 1 - Benefits Introduction',
        'Employee Benefits 2 - Benefit Plans',
        'Employee Benefits 3 - The CSR Support Cycle',
        'How to Navigate Our Courses',
        'Ethics for Insurance',
        'Personal Auto'
      ]
    }
  }

  return <VAProfilePage vaData={dayanaData} />
}
