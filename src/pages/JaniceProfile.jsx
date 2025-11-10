import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JaniceProfile() {
  const janiceData = {
    name: 'JANICE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Janice.webp',
    summary: 'Janice is a highly skilled and detail-oriented Executive Virtual Assistant with over nine years of experience in leadership support, supervision and administrative support. With a strong background in real estate, corporate contracts, and supporting business leaders in making informed decisions, Janice has the ability to successfully manage the following tasks:',
    tagline: 'Janice is a proactive and organized professional, skilled in handling complex tasks with excellence. Click here to learn more about her.',
    videoUrl: 'https://www.youtube.com/embed/P8gcQHNJwsk',
    videoThumbnail: 'https://img.youtube.com/vi/P8gcQHNJwsk/maxresdefault.jpg',
    thumbnail: 'Executive support, Real estate expertise, Administrative excellence',
    
    skills: [
      'Customer Support',
      'Calendar Management',
      'Legal Document Review',
      'Project Coordination',
      'Business Operations',
      'E-commerce Management',
      'Data Reporting',
      'Contract Drafting',
      'Inventory & Invoice Management',
      'Shipment & Logistics Coordination',
      'Presentation Creation'
    ],
    
    tools: [
      'Joor',
      'Canva',
      'Shopify',
      'Richpanel',
      'Microsoft Office',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Janice brings strong administrative experience from her current role at Ocean Virtual Assistant Solutions, where she supports executive-level operations. From her 10-year tenure at SM Development Corporation, she gained insurance-related experience assisting with legal documentation, contract reviews, and client inquiries tied to real estate transactions. Her combined experience demonstrates expertise in executive support, administrative excellence, legal document management, and real estate coordination. Her strengths include strong organizational skills, attention to detail, executive-level communication, legal acumen, and business operations excellence.',
    
    employmentHistory: [
      {
        company: 'OCEAN VIRTUAL ASSISTANT',
        position: 'Virtual Assistant/Executive Assistant',
        period: 'AUG 2023 - PRESENT',
        description: '• Supports the CEO with daily executive tasks, including calendar and email management, inventory tracking, report creation, and coordination of garment shipments.'
      },
      {
        company: 'SM DEVELOPMENT CORPORATION',
        position: 'Legal Supervisor',
        period: 'JUL 2013 - APR 2023',
        description: '• Provided legal and administrative support by drafting and reviewing contracts, managing legal documentation for real estate transactions, assisting with civil case filings, and handling client inquiries.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '7.6',
    englishDescription: 'Communicates fluently and confidently with clear pronunciation, a rich vocabulary, and strong grammar.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Technological University of the Philippines',
      degree: 'BS Entrepreneurial Management',
      date: '2009 - 2013',
      certifications: [
        'Homeowners',
        'Personal Auto',
        'Introduction to Commercial Lines',
        'Introduction to Personal Lines',
        'Dwelling'
      ]
    }
  }

  return <VAProfilePage vaData={janiceData} />
}
