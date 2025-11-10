import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function FernandaProfile() {
  const fernandaData = {
    name: 'FERNANDA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Fernanda.webp',
    summary: 'Experienced and results-driven Virtual Assistant with over nine years of experience in key account management, sales operations, and marketing coordination. She consistently delivers top-quality support engagement, sales pipeline, and marketing coordination. She consistently delivers top-quality support engagement, sales pipeline, and marketing coordination. Her expertise includes:',
    tagline: 'Fernanda is organized, solution-oriented, and passionate about enhancing operational workflows while providing top-tier client support. Click here to learn more about her.',
    videoUrl: 'https://www.youtube.com/embed/7ngbNodl3es',
    videoThumbnail: 'https://img.youtube.com/vi/7ngbNodl3es/maxresdefault.jpg',
    thumbnail: 'Account management, Sales operations, Marketing coordination',
    
    skills: [
      'Supplier & Vendor Coordination',
      'Client Relationship Management',
      'Proposal Creation',
      'Sales Metrics Creation',
      'Onboarding & Training',
      'Data Reporting',
      'Workflow Optimization',
      'CRM Support',
      'Relationship Management',
      'Calls Support'
    ],
    
    tools: [
      'CRMs',
      'Zoho',
      'Teams',
      'Canva',
      'Microsoft Office',
      'Google Workspace',
      'Excel Pivot Tables'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Fernanda has extensive experience in account management, sales, and marketing. She worked as a Key Account Manager at Inmera, crafting persuasive proposals and preparing detailed reports to track performance. She served as a Sales Assistant at Totto, submitting KPIs and managing the onboarding process for sales agents. She also worked as a Marketing Assistant at Totto, coordinating with agencies and suppliers, analyzing marketing metrics, and designing professional materials. Her strengths include strong organizational skills, excellent communication, attention to detail, sales acumen, and marketing expertise.',
    
    employmentHistory: [
      {
        company: 'INMERA',
        position: 'Key Account Manager',
        period: 'JUL 2021 - SEP 2023',
        description: '• Craft persuasive proposals tailored to customers specific needs and preferences\n• Drafting professional, visually engaging sales material with great attention to detail using Canva and similar tools\n• Prepare detailed reports and sales metrics to track performance and drive strategic decisions.\n• Pivot table management.\n• Handle and solve clients complaints by providing resourceful solutions and responding effectively to client requirements.'
      },
      {
        company: 'TOTTO',
        position: 'Sales Assistant',
        period: 'AUG 2014 - NOV 2020',
        description: '• Submit KPIs and relevant business metrics to track performance and client satisfaction.\n• Address client requirements promptly, identifying plan points and providing effective solutions.\n• Manage the onboarding process for sales agents'
      },
      {
        company: 'TOTTO',
        position: 'Marketing Assistant',
        period: 'OCT 2011 - AUG 2014',
        description: '• Coordinate and Communicate effectively with agencies and suppliers to ensure smooth operations.\n• Analyze and track marketing metrics to measure campaign performance and optimize strategies.\n• Design professional advertisements with a strong visual impact and attention to detail.\n• Support lead generation efforts by carrying out engaging potential customers.'
      }
    ],
    
    discResult: 'I+S',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '7.1',
    englishDescription: 'Communicates clearly with strong fluency and coherence. Pronunciation is easily understood with minimal accent. Uses a sufficient vocabulary and complex grammar structures with flexibility, effectively expressing complex thoughts.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Internacional University',
      degree: 'Master in Business Administration / Corporate Communicator',
      date: '2023 - 2024 / 2008 - 2011'
    }
  }

  return <VAProfilePage vaData={fernandaData} />
}
