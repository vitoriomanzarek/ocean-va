import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function BalbinaProfile() {
  const balbinaData = {
    name: 'BALBINA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Balbina.webp',
    summary: 'Balbina is a highly organized and results-driven Virtual Assistant with a strong background in operations supervision and customer service. With over four years of experience in customer relations and two years in leadership roles, she has successfully managed teams, optimized workflows, and achieved team satisfaction. Her expertise includes:',
    tagline: 'Balbina is proactive, detail-oriented, and always focused on delivering excellence. Click here to learn more about her.',
    videoUrl: 'https://www.youtube.com/embed/sESom3C4Tjk',
    videoThumbnail: 'https://img.youtube.com/vi/sESom3C4Tjk/maxresdefault.jpg',
    thumbnail: 'Operations expertise, Team leadership, Customer service',
    
    skills: [
      'Process Improvement',
      'Team Leadership & Supervision',
      'Operational Efficiency',
      'Customer Service',
      'Complaint Resolution',
      'Appointment Scheduling',
      'Time Management',
      'Performance Monitoring & Coaching',
      'Administrative Support'
    ],
    
    tools: [
      'Avaya',
      'Pega',
      'Tableau',
      'Zoho',
      'Power BI',
      'Microsoft Office',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Balbina has extensive experience in operations and customer service. She worked as an Operations Supervisor at Majorel, where she processed quotes, monitored payment status, managed accounts receivable, processed direct bill statements, reconciled commission statements, performed basic bookkeeping, and made phone calls to mortgage companies and lien holders. Previously, she worked as a Customer Service Agent at Telvista, assisting customers with car rental inquiries, reservations, and issues while identifying security risks and meeting customer satisfaction targets. Her strengths include strong organizational skills, team leadership, customer-focused approach, attention to detail, and operational excellence.',
    
    employmentHistory: [
      {
        company: 'MAJOREL',
        position: 'Operations Supervisor',
        period: '2021 - 2024',
        description: '• Processing Quote in PL Rater and QuoteRush\n• Monitoring Payment Status\n• Accounts receivable - payment follow-up\n• Processing Direct Bill Statements\n• Reconciliation of Agency Commission Statements\n• Basic Bookkeeping\n• Making phone calls to Mortgage Companies, Lien holders, and clients'
      },
      {
        company: 'TELVISTA',
        position: 'Customer Service Agent',
        period: '2019 - 2020',
        description: '• Assist customers with car rental inquiries, reservations, and issues\n• Identify and report potential security risks vulnerabilities.\n• Meet and exceed customer satisfaction and quality targets.'
      }
    ],
    
    discResult: 'I',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '7.2',
    englishDescription: 'Communicates effectively with clear pronunciation. Demonstrates strong fluency with minor pauses and uses a diverse vocabulary, including idiomatic expressions. Conveys complex ideas well with generally accurate grammar and structured speech.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'UTEL / CETYS Preparatoria',
      degree: 'Business Administration / High School',
      date: '2023 - 2025 / 2016 - 2019',
      certifications: [
        'Introduction to Personal Lines',
        'Homeowners',
        'Personal Auto',
        'Dwelling',
        'Umbrella',
        'Flood',
        'Introduction to Commercial Lines',
        'Commercial Auto',
        'Property',
        'Workers\' Compensation',
        'General Liability',
        'Employee Benefits 1 - Benefits Introduction',
        'Employee Benefits 2 - Benefit Plans',
        'Employee - How to Handle Objections: Getting Customers to Say, "Yes"',
        'Employee - Customer Service Essentials',
        'Employee Benefits 3 - The CSR Support Cycle',
        'Business Owner Policy (BOP)'
      ]
    }
  }

  return <VAProfilePage vaData={balbinaData} />
}
