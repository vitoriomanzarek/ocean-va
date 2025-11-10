import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function GonzaloProfile() {
  const gonzaloData = {
    name: 'GONZALO',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Gonzalo.webp',
    summary: 'Resourceful Virtual Assistant with proven insurance sector experience who is also insurance trained. With great interpersonal and communication skills and looking forward to skillfully handle tasks.',
    tagline: 'Gonzalo is fully equipped to support insurance agencies, real estate businesses, and professionals seeking a proactive, detail-oriented assistant.',
    videoUrl: 'https://www.youtube.com/embed/DYky1VhKGNQ',
    videoThumbnail: 'https://img.youtube.com/vi/DYky1VhKGNQ/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Bilingual support, Customer service',
    
    skills: [
      'Claims Processing & Handling',
      'Client Satisfaction & Relationship',
      'Event Scheduling & Coordination',
      'Complaint Resolution',
      'Data Entry & Management',
      'Cancellation Handling',
      'Inbound & Outbound Calls',
      'Account Management',
      'Renewals & Endorsements',
      'Policy Support & Follow-up'
    ],
    
    tools: [
      'CRM',
      'Hawksoft',
      'Ezlynx',
      'Hubspot',
      'Google Suite',
      'Microsoft Office',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Gonzalo gained his 3 years of experience in Auto, Home, Commercial, and Health Insurance while working at EDGE SA and at First Service Consulting. At EDGE SA, he supported a U.S.-based insurance agency with reporting, automation, and client data management for personal and commercial lines. At First Service Consulting, he served as a Health Insurance Sales Agent, assisting clients with plan selection, objections handling, and customer support. His strengths include strong communication skills, attention to detail, customer service excellence, and technical proficiency with insurance systems.',
    
    employmentHistory: [
      {
        company: 'EDGE SA',
        position: 'Senior Associate',
        period: 'DEC 2021 - MAY 2024',
        description: '• Supported a U.S.-based insurance agency by handling reporting, process automation, data collection, and administrative tasks across Auto, Home, and Commercial lines.'
      },
      {
        company: 'TELEPERFORMANCE PERÚ',
        position: 'Bilingual Agent - Floor Support',
        period: 'DEC 2020 - DEC 2021',
        description: '• Provided bilingual customer service and operational support, resolved escalated inquiries, and enhanced overall satisfaction and efficiency on the floor.'
      },
      {
        company: 'FIRST SERVICE CONSULTING',
        position: 'Health Insurance Sales Agent',
        period: 'MAR 2020 - DEC 2020',
        description: '• Sold personalized health insurance plans, handled customer objections, and used automated email marketing to improve lead conversion and client engagement.'
      },
      {
        company: 'LOS PRODUCTORES',
        position: 'Host',
        period: 'FEB 2018 - JAN 2019',
        description: '• Managed guest flow and safety in a busy hospitality environment while ensuring high customer satisfaction and operational order.'
      }
    ],
    
    discResult: 'C+S',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '90',
    englishDescription: 'Speaks fluently and confidently on a wide range of topics. Demonstrates strong command of vocabulary and idiomatic language. Pronunciation is clear and natural, with consistent grammatical accuracy and the ability to express complex ideas with ease.',
    
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

  return <VAProfilePage vaData={gonzaloData} />
}
