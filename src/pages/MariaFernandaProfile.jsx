import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MariaFernandaProfile() {
  const mariaFernandaData = {
    name: 'MARIA FERNANDA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Maria.webp',
    summary: 'Maria Fernanda is a dedicated Virtual Assistant with strong experience in the insurance industry. Her background includes handling client communications and coordinating with internal teams to ensure smooth insurance operations. She brings reliability, attention to detail, and a bilingual advantage to every task.',
    tagline: 'Maria is well-prepared to assist insurance professionals and business owners, offering reliable support rooted in effective communication, attention to detail, and a strong commitment to client satisfaction.',
    videoUrl: 'https://www.youtube.com/embed/TNXDeGsyIkM',
    videoThumbnail: 'https://img.youtube.com/vi/TNXDeGsyIkM/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Bilingual support, Customer service',
    
    skills: [
      'Email & Calendar Management',
      'Customer Service',
      'Acord Forms',
      'Policy Changes',
      'Quote Generation',
      'Document Filing',
      'Billing Assistance',
      'Inbound & Outbound Calls',
      'Canva for Social Media',
      'Social Media Management',
      'Presentation & Video Editing'
    ],
    
    tools: [
      'CRM Tools',
      'HR Platforms',
      'Canva',
      'Microsoft Office',
      'Google Workspace',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Maria Fernanda has dedicated experience in the insurance industry and customer service. She worked as a Customer Service representative at Seguros Sura, managing client communications and personnel. She served in Human Resources at Serigas del Caribe S.A., working with hiring and payroll management. She worked as a Reception Manager at Mosaic S.A., leading bilingual reception operations. She served as an Executive Assistant at Frcontent LLC, managing Culture and HR department initiatives. Currently, she works as a Customer Service & Administrative Assistant at Ocean VA Solutions, handling insurance client support, policy management, and administrative tasks. Her strengths include strong customer service skills, bilingual communication, attention to detail, administrative excellence, and insurance knowledge.',
    
    employmentHistory: [
      {
        company: 'SEGUROS SURA',
        position: 'Customer Service',
        period: '2017',
        description: '• I was in charge of customer service, recruitment and management of personnel, database monitoring, hiring management.'
      },
      {
        company: 'SERIGAS DEL CARIBE S.A',
        position: 'Human Resource',
        period: '2018 - 2021',
        description: '• Worked closely with clients and members of the Human Resources team, for hiring and payroll management.'
      },
      {
        company: 'MOSAIC S.A',
        position: 'Reception Manager',
        period: '2021 - 2022',
        description: '• I worked as a bilingual Reception Manager, leading the management and attention to international clientele, ensuring exceptional service and facilitating fluid communication in two languages.'
      },
      {
        company: 'FRCONTENT LLC',
        position: 'Executive Assistant',
        period: '2022 - 2024',
        description: '• I worked as an executive assistant and leader of the Culture and HR department in a bilingual international company, supervising executive administrative functions and managing initiatives related to corporate culture and human resources to ensure an efficient and collaborative work environment.'
      },
      {
        company: 'OCEAN VA SOLUTIONS',
        position: 'Customer Service & Administrative Assistant',
        period: 'AUG 2024 - JUN 2025',
        description: '• Managed inbound/outbound calls, email and calendar coordination, and quote generation for insurance clients.\n• Handled policy changes and client records using Ezlynx, Neptune, TWIA, TFPA, and Wellington platforms.\n• Created branded content, presentations, and short videos using Canva and Adobe; supported social media management.\n• Assisted with billing, HR-related tasks, and data organization using advanced Excel skills.'
      }
    ],
    
    discResult: 'I+S',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '6.9',
    englishDescription: 'Speaks clearly and fluently with good pronunciation and effective use of vocabulary. Demonstrates solid grammar skills and expresses complex ideas with coherence and flexibility.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'IE Centro Inca / U. Autónoma del Caribe',
      degree: 'Commercial Banking Technique / Maritime and River Administrator',
      date: '2015 - 2017 / 2018 - 2023',
      certifications: [
        'Dwelling',
        'Umbrella',
        'Flood',
        'Property',
        'Introduction to Commercial Lines',
        'Introduction to Personal Lines',
        'Employee - A Guide to Seeking and Receiving Feedback',
        'Employee - Driving Your Career with a Growth Mindset',
        'Employee - How to Handle Objections: Getting Customers to Say "Yes"',
        'Employee - Customer Service Essentials',
        'Employee - A Guide to Effective Meetings and Time Management',
        'Employee - Difficult Conversations and Escalating Issues'
      ]
    }
  }

  return <VAProfilePage vaData={mariaFernandaData} />
}
