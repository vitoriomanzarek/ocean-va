import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function SandraProfile() {
  const sandraData = {
    name: 'SANDRA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Sandra.webp',
    summary: 'Bilingual Virtual Assistant with strong communication skills in both English and Spanish. With extensive experience providing customer service and being a sales consultant for Home, Auto, and Health insurance, Sandra can skillfully handle all aspects of insurance operations and client support.',
    tagline: 'She is ready to start helping your business grow right away! If you\'d like to learn more about her and how she can assist you, click here to watch her video.',
    videoUrl: 'https://www.youtube.com/embed/xrNMiTNBkcg',
    videoThumbnail: 'https://img.youtube.com/vi/xrNMiTNBkcg/hqdefault.jpg',
    thumbnail: 'Bilingual support, Insurance expertise, Sales consultant',
    
    skills: [
      'Commercial Home & Auto',
      'Email & Calendar',
      'Quote Generation',
      'Billing Assistance',
      'Policy Changes',
      'Mortgage Changes',
      'ACORD Forms',
      'COI Documentation',
      'Cancellation Notices',
      'Ezlynx Management'
    ],
    
    tools: [
      'CRMs',
      'Slack',
      'Ezlynx',
      'Insurance Agents Portals',
      'Google Workspace',
      'Microsoft Office'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Sandra Salinas brings over 3 years of experience in the insurance industry, with a strong background in personal lines gained during her time as a Sales Consultant at Pacific Prime Insurance. In this role, she managed the end-to-end client journey—from initial contact and quote generation to policy application, client support, and claims assistance. Her proven ability to deliver high-quality service, maintain structured processes, and communicate effectively with clients makes her an excellent fit for insurance service roles that demand accuracy, consistency, and customer care. Beyond insurance, she has diverse experience as a Travel Guide at RCI, CEO/Founder of Con Sabor a Achiote, Financial Advisor at American Express, Business Coach at Cooperativa de Transformadores, Administrator at Consultoría de Comercio, Corporate Trainer at AT&T, and Customer Service Sales Promoter at Walt Disney World.',
    
    employmentHistory: [
      {
        company: 'PACIFIC PRIME INSURANCE',
        position: 'Sales Consultant',
        period: 'Current',
        description: '• Managed full-cycle client support including quotes, policy processing, claims assistance, and performance reporting in personal lines insurance.'
      },
      {
        company: 'RCI',
        position: 'Travel Guide',
        period: 'Previous',
        description: '• Booked domestic and international vacations, upsold memberships and insurance products, and delivered top-tier customer service.'
      },
      {
        company: 'CON SABOR A ACHIOTE',
        position: 'CEO / Founder',
        period: 'Previous',
        description: '• Founded and operated a small food business, overseeing everything from cooking and service to marketing and supply management.'
      },
      {
        company: 'AMERICAN EXPRESS',
        position: 'Financial Advisor',
        period: 'Previous',
        description: '• Provided bilingual customer support, coached clients on financial tools, and mentored new hires while consistently achieving strong sales.'
      },
      {
        company: 'COOPERATIVA DE TRANSFORMADORES',
        position: 'Business Coach',
        period: 'Previous',
        description: '• Coached cooperatives in improving production and business strategies, including marketing and product positioning.'
      },
      {
        company: 'CONSULTORÍA DE COMERCIO',
        position: 'Administrator',
        period: 'Previous',
        description: '• Managed general business administration tasks including payroll, invoicing, collections, and Airbnb property oversight.'
      },
      {
        company: 'AT&T',
        position: 'Corporate Trainer',
        period: 'Previous',
        description: '• Led direct marketing efforts, trained new hires, and contributed to customer acquisition through sales presentations and travel-based outreach.'
      },
      {
        company: 'WALT DISNEY WORLD',
        position: 'Customer Service, Sales Promoter',
        period: 'Previous',
        description: '• Delivered exceptional customer service in merchandise and attraction operations, handling guest relations and logistics.'
      }
    ],
    
    discResult: 'I+D',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.\n\nDominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
    
    englishScore: '7.4',
    englishDescription: 'Speaks with clarity and fluency, using a broad vocabulary and idiomatic expressions effectively. Pronunciation is clear and easy to understand, with confident use of grammar structures to express complex ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Universidad Iberoamericana Puebla',
      degree: 'Bachelor in International Commerce',
      date: '2010 - 2014'
    }
  }

  return <VAProfilePage vaData={sandraData} />
}
