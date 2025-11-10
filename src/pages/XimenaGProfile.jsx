import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function XimenaGProfile() {
  const ximenaGData = {
    name: 'XIMENA G.',
    title: 'INSURANCE VIRTUAL ASSISTANT',
    image: '/images/VAs/Ximena G.webp',
    summary: 'Ximena is an experienced Insurance Virtual Assistant with a strong background in policy servicing, client communication, and administrative support. She has extensive experience managing home and auto insurance policies. Her ability to communicate effectively with both clients and insurance carriers has allowed her to provide efficient, reliable, and customer-focused service.',
    tagline: 'Ximena is the ideal Virtual Assistant for insurance agencies and service-oriented teams seeking a detail-oriented, client-focused professional experienced in policy servicing, billing coordination, and customer communication.',
    videoUrl: 'https://www.youtube.com/embed/UQ2JcPPjEnE',
    videoThumbnail: 'https://img.youtube.com/vi/UQ2JcPPjEnE/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Policy servicing, Customer communication',
    
    skills: [
      'Home & Auto Policy Management',
      'Cross-Selling & Client Retention',
      'Back-Office Support',
      'Customer Service',
      'Billing Resolution',
      'Carrier Communication',
      'Quoting on Existing Policies',
      'Payments & Cancellations',
      'Underwriting',
      'Renewals',
      'Documentation Requests'
    ],
    
    tools: [
      'Microsoft Office Suite',
      'Google Workspace',
      'Insurance Carrier Platforms',
      'CRM & Communication Tools',
      'Email & Calendar Management Systems'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Ximena G. has 2 years of insurance experience, gained through her roles at Qualfon, where she worked on the Allstate Insurance Campaign, and Ocean Virtual Assistant Solutions. At Qualfon, she specialized in home and auto insurance policies, providing bilingual customer service to U.S. clients. Her expertise includes managing policy changes, renewals, cancellations, billing, and coordinating with carriers for issue resolution. Additionally, she has strong skills in customer service, training new agents, and cross-selling insurance products to enhance client coverage. She also has experience in educational advisement, demonstrating her ability to provide guidance and manage detailed processes effectively.',
    
    employmentHistory: [
      {
        company: 'OCEAN VIRTUAL ASSISTANT SOLUTIONS',
        position: 'Virtual Assistant',
        period: '2023 - 2025',
        description: '• Provide remote support to U.S. insurance agencies in policy management, client services, and administrative processes.\n• Manage policies (renewals, endorsements, cancellations, billing).\n• Offer customer service via email, phone, and text.\n• Communicate with carriers for issue resolution.\n• Cross-sell products and train new team members.\n• Oversee payment processing and documentation management.'
      },
      {
        company: 'QUALFON - ALLSTATE INSURANCE CAMPAIGN',
        position: 'Bilingual Customer Service Agent & Training Support',
        period: '2021 - 2023',
        description: '• Delivered bilingual customer service to U.S. clients for home and auto insurance policies.\n• Assisted in training new agents and maintained service quality standards.\n• Managed policy changes, renewals, cancellations, and billing.\n• Coordinated with carriers to resolve client issues.\n• Trained and mentored new agents.\n• Cross-sold insurance products to strengthen client coverage.'
      },
      {
        company: 'UNIVERSIDAD CUGS',
        position: 'Educational Advisor / Call Center',
        period: '2018 - 2019',
        description: '• Provided guidance to prospective students on admissions and enrollment processes.\n• Handled calls, answered inquiries, and maintained accurate student records while ensuring excellent customer service.\n• Supported students with academic program details and documentation.\n• Managed inbound/outbound calls and follow-ups.\n• Assisted in orientations and enrollment support.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '7.6/9',
    englishDescription: 'Speaks fluently with natural pronunciation and minimal pauses, making communication clear and engaging. Uses advanced vocabulary and complex grammar structures effectively to express nuanced ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={ximenaGData} />
}
