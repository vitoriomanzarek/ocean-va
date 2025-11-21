import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function KathleenProfile() {
  const kathleenData = {
    name: 'MARIE KATHLEEN S. MORENO',
    title: 'ENGLISH SPEAKING VA | LOAN SERVICES & CLIENT SUPPORT',
    image: '/images/VAs/Kathleen.webp',
    summary: 'Kathleen has over five years of experience supporting U.S. clients in the loan services division of a major bank. She handled credit card support, loan eligibility reviews, and document verification while coordinating directly with bankers and clients. Her background includes wire transfers, fund investigations, and transaction reconciliation, as well as overseeing loan documentation, account maintenance, client communication, and compliance tracking through the bank\'s internal systems.',
    tagline: 'Kathleen brings a detail-oriented, compliance-driven approach to loan servicing and financial operations. Her experience supporting U.S. banking workflows makes her a strong choice for teams seeking a reliable and structured virtual assistant.',
    videoUrl: 'https://www.youtube.com/embed/t84q0i_wMfs',
    videoThumbnail: 'https://img.youtube.com/vi/t84q0i_wMfs/maxresdefault.jpg',
    thumbnail: '5 YEARS OF EXPERIENCE • LOAN OPERATIONS • DOCUMENT COMPLIANCE • CLIENT COORDINATION • FUNDS RESEARCH • APPLICATION PROCESSING',
    
    skills: [
      'Loan Application',
      'Document Verification',
      'Compliance',
      'Client Communication',
      'Loan Tracking',
      'Wire Transfer',
      'Funds Research',
      'Account Maintenance',
      'Underwriting Coordination',
      'Data Accuracy',
      'Reporting',
      'Administrative Support'
    ],
    
    tools: [
      'Genesys',
      'Microsoft Office Suite',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Kathleen gained five years of loan processing and servicing experience through handling small business loans and reviewing loan documentation as Client Operations Specialist IV with JP Morgan Chase & Co. She supported Relationship Managers and bankers by resolving KYC issues, updating business account structures, and assisting with account maintenance. Her work included initiating wire transfers, conducting wire and ACH research, and managing escalated concerns from branch teams. She also handled client communication through phone, email, and Zoom while processing card applications and related inquiries. Kathleen demonstrates strong analytical skills, excellent client service, and the ability to manage complex operational tasks efficiently.',
    
    employmentHistory: [
      {
        company: 'JP MORGAN CHASE & CO.',
        position: 'Client Operations Specialist IV',
        period: 'MAR 2020 - OCT 2025',
        description: '• Worked with Private Client Servicing Operations team who handles Relationship Managers request to assist clients with account maintenance.\n• Assisting bankers via zoom calls on how to resolve KYC on customers\' accounts.\n• Making outbound calls to the client/customer to initiate wire transfers.\n• Handling account maintenance for business accounts.\n• Assisting Relationship Managers via zoom call in updating accounts business structure.\n• Taking in phone calls and answering emails to assist clients and bankers with wire and ACH research.\n• Handled loan servicing for small business and reviewing loan documentation.\n• Was assigned to handle branch Relationship Managers escalated concern.\n• Process card applications and answering phone calls related to card application status.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) & Conscientiousness (C) - Reliable and patient with strong attention to detail. Kathleen combines dependability with precision, ensuring accuracy in compliance-driven loan operations.',
    
    englishScore: '6.8/9',
    englishDescription: 'Communicates clearly with steady pronunciation and smooth pacing, showing growing confidence in spoken English. Uses everyday vocabulary and grammar effectively to express ideas, with continued progress in handling more detailed or structured responses.',
    
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

  return <VAProfilePage vaData={kathleenData} />
}
