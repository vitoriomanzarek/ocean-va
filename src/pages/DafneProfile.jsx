import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function DafneProfile() {
  const dafneData = {
    name: 'DAFNE',
    title: 'INSURANCE VIRTUAL ASSISTANT',
    image: '/images/VAs/Dafne.webp',
    summary: 'Dafne is a dedicated and detail-oriented professional with experience in patient care, customer service, and insurance operations. She has successfully supported clients by resolving billing inquiries, providing accurate personal lines insurance quotes, and maintaining strong client relationships through effective communication.',
    tagline: 'Dafne is the ideal Virtual Assistant for insurance agencies and service-based businesses seeking a multilingual, detail-oriented professional with expertise in billing support, client communication, and customer care.',
    videoUrl: 'https://www.youtube.com/embed/habJY_0mpjs',
    videoThumbnail: 'https://img.youtube.com/vi/habJY_0mpjs/maxresdefault.jpg',
    thumbnail: 'Insurance operations experience, Bilingual support, Detail-oriented professional',
    
    skills: [
      'Client Support',
      'Personal Lines Insurance Quoting',
      'Issue Resolution',
      'Inbound & Outbound Calls',
      'Email & Multichannel Communication',
      'Patient Care',
      'Client Retention',
      'Billing Inquiries',
      'Customer Service'
    ],
    
    tools: [
      'Pilater',
      'AppJedepic',
      'Google Workspace',
      'Microsoft Office'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Dafne has 1 year of insurance experience, gained as a Virtual Assistant at Ocean Virtual Assistant Solutions from July 2024 to October 2025, where she provided accurate quotes for personal lines insurance. Prior to this, she worked as a Medical and Auto Insurance Qualifier at Boomsourcing in August 2022, focusing on outbound calls. Her earlier roles include Customer Service Representative at Surge Call BPO - USA and Bilingual Customer Service Representative at Atento, where she handled various customer inquiries and managed orders.',
    
    employmentHistory: [
      {
        company: 'OCEAN VIRTUAL ASSISTANT SOLUTIONS',
        position: 'Virtual Assistant',
        period: 'JUL 2024 - OCT 2025',
        description: '• Resolved billing inquiries in a timely and professional manner, improving customer satisfaction.\n• Provided accurate quotes for personal lines insurance, resulting in increased sales.\n• Developed strong relationships with clients through effective email communication and issue resolution.'
      },
      {
        company: 'BOOMSOURCING',
        position: 'Medical and Auto Insurance Qualifier',
        period: 'AUG 2022',
        description: '• Outbound calls.\n• More than 400 calls a day.'
      },
      {
        company: 'SURGE CALL BPO - USA',
        position: 'Customer Service Representative',
        period: 'FEB 2022 - JUL 2022',
        description: '• Making refunds if customer is not happy with the products.\n• Cancelling memberships and subscriptions upon customer request.\n• Resolving billing-shipping questions.\n• Described product highlights.\n• Used to have 25 different campaigns.\n• Became a manager for one camp.'
      },
      {
        company: 'ATENTO',
        position: 'Bilingual Customer Service Representative',
        period: 'OCT 2021 - DEC 2021',
        description: '• Processed orders, credits and raised returns.\n• Answered up to 90 calls per day in busy, fast-paced office for both English and Spanish-speaking customers.\n• Described product highlights and benefits to help guide purchasing decisions.'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '6.1',
    englishDescription: 'Speaks with clarity and understandable pronunciation, showing steady progress in fluency. Can express ideas using everyday vocabulary and grammar, with growing ability to handle more complex sentences.',
    
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

  return <VAProfilePage vaData={dafneData} />
}
