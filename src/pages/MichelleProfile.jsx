import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MichelleProfile() {
  const michelleData = {
    name: 'MICHELLE',
    title: 'ENGLISH-SPEAKING VA | INSURANCE SPECIALIST',
    image: '/images/VAs/Michelle.webp',
    summary: 'Michelle has one year of experience in the U.S. insurance industry, supporting personal lines. She specializes in quoting, remarketing, and policy servicing for auto, homeowners, renters, dwelling fire, condo, umbrella, and personal articles policies. Michelle also assists with billing inquiries, payments, and endorsements—ensuring that every update and communication meets agency and carrier standards for accuracy and compliance.',
    tagline: 'Michelle combines strong technical proficiency with exceptional attention to detail. Her hands-on experience across multiple CRMs and carrier platforms enables her to deliver reliable, end-to-end insurance support that enhances client satisfaction and operational efficiency.',
    videoUrl: 'https://www.youtube.com/embed/sjVqZfkunbY',
    videoThumbnail: 'https://img.youtube.com/vi/sjVqZfkunbY/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Multi-CRM proficiency, Customer service',
    
    skills: [
      'Endorsements',
      'Quoting',
      'Renewals',
      'Client Support',
      'Billing Inquiries',
      'Auto',
      'Homeowners',
      'COIs',
      'Documentation Uploads',
      'Payments',
      'Renters',
      'Umbrella',
      'Remarketing',
      'Cancellations',
      'E-Signature',
      'Policy Servicing'
    ],
    
    tools: [
      'PL Rater',
      'Applied Rater',
      'Applied Epic',
      'QQ Catalyst',
      'AMS360',
      'Ezlynx',
      'HawkSoft',
      'ImageRight',
      'Cisco Webex',
      'RingCentral',
      'Zoom Workplace',
      'Microsoft Office/Teams'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Michelle has 1 year of experience in Home and Auto Insurance, which she gained while working as an office-based Virtual Assistant at CoverDesk. During this time, she handled quoting and remarketing for Auto, Home, Umbrella, and Package policies, managed emails, supported both inbound and outbound client calls, and processed policy changes, payments, and cancellations. She also communicated directly with carriers and maintained accurate client records in management systems. Michelle is highly organized, detail-oriented, and skilled in handling customer inquiries and documentation. Additionally, her background includes teaching English to young children and creating social media content for marketing purposes. Her strong communication skills and ability to multitask make her a well-rounded and dependable professional.',
    
    employmentHistory: [
      {
        company: 'COVERDESK',
        position: 'Office-Based Virtual Assistant',
        period: 'AUG 2024 - SEPT 2025',
        description: '• Quote remarket insurance Auto, Home, Umbrella, Package (Home and Auto)\n• Handles and organizes emails.\n• Assists inbound and outbound calls regarding documents, billing questions, endorsement requests, and general policy questions or concerns. Calls carriers regarding insured policy information.\n• Send cancellation forms for e-signature and processes policy cancellation in carrier.\n• Assists with processing of payments in the carrier and send receipt and updates billing schedule.\n• Perform manual downloads, as well as updating of insured\'s personal information to utilize management systems.'
      },
      {
        company: 'LINGOSTAR',
        position: 'Online ESL Tutor',
        period: 'MAR 2024 - APR 2024',
        description: '• Teach basic English to children aged 5-8 years old'
      },
      {
        company: 'CITIGLOBAL REALTY AND DEVELOPMENT INCORPORATION',
        position: 'Marketing Specialist',
        period: 'SEPT 2022 - OCT 2022',
        description: '• Rendered 200-hr immersion\n• Create Facebook posts\n• Answer Facebook chat and comment inquiries'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '75',
    englishDescription: 'Communicates clearly with generally good pronunciation and fluency. Uses appropriate vocabulary and grammar to express ideas effectively, with growing confidence in more complex structures.',
    
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

  return <VAProfilePage vaData={michelleData} />
}
