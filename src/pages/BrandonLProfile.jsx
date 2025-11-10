import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function BrandonLProfile() {
  const brandonLData = {
    name: 'BRANDON L.',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Brandon L.webp',
    summary: 'Highly resourceful and analytical Virtual Assistant with over 7 years of experience in customer service and administrative support. Brandon has worked across real estate, home improvement industries, excelling in both remote and fast-paced environments. Brandon thrives in roles that demand precision, proactive communication, and strategic thinking.',
    tagline: 'Brandon is committed to delivering accurate and detail-oriented virtual support tailored to the needs of property management and client service operations.',
    videoUrl: 'https://www.youtube.com/embed/PVmxKa19Mz0',
    videoThumbnail: 'https://img.youtube.com/vi/PVmxKa19Mz0/maxresdefault.jpg',
    thumbnail: 'Property management, Customer service, Administrative support',
    
    skills: [
      'Email & Calendar Management',
      'Tenant & Resident Relations',
      'Documentation & Reporting',
      'Lead & Data Verification',
      'Service Request Tracking',
      'Property Maintenance',
      'Vacancy Scheduling',
      'Customer Service',
      'Inbound & Outbound Calls',
      'Lease & Documentation Support'
    ],
    
    tools: [
      'Salesforce',
      'SQL',
      'Power BI',
      'Buildium',
      'AppFolio',
      'Microsoft Office'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Brandon has extensive experience in property management and customer service. He worked as a Lead Verification Agent at Porch, handling lead verification for home improvement services, de-escalating frustrated customers, connecting them with professionals, managing outbound calls, and collaborating with team members on best practices. Currently, he works in Logistics at True Work, entering service requests, following up with residents on completed work orders, and scheduling vacant unit turns. His strengths include analytical thinking, customer-focused approach, attention to detail, proactive communication, and operational excellence.',
    
    employmentHistory: [
      {
        company: 'PORCH',
        position: 'Lead Verification Agent',
        period: 'JAN 2022 - MAY 2023',
        description: '• Lead verification, for home improvement services\n• De-escalated frustrated customers, resolving their concerns and ensuring their satisfaction with the company\'s services.\n• Connecting the customer with the professional after the information has been verified\n• Effectively handled outbound calls from potential customers, providing detailed information about the request they applied for\n• Collaborated with team members to share best practices and strategies, contributing to overall team success.'
      },
      {
        company: 'TRUE WORK',
        position: 'Logistics',
        period: 'MAY 2023 - JUL 2024',
        description: '• Enter service requesting software and respond immediately by phone to reside\n• Follow up with residents on completed work orders\n• Schedule and track vacant unit turns'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '7.2',
    englishDescription: 'Indicates advanced English proficiency with the ability to understand and use complex language. Suitable for effective communication in professional, academic, and social settings with fluency and confidence.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Universidad Autónoma de México',
      degree: 'Bachelor\'s Degree: Economics',
      date: 'AUG 2019 - DEC 2024'
    }
  }

  return <VAProfilePage vaData={brandonLData} />
}
