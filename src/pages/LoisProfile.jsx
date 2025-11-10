import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function LoisProfile() {
  const loisData = {
    name: 'LOIS',
    title: 'VIRTUAL ASSISTANT | INSURANCE',
    image: '/images/VAs/Lois.webp',
    summary: 'Lois is an experienced Virtual Assistant with a strong background in insurance operations, customer service, and client retention. She has supported multiple U.S.-based insurance firms. With over 5 years of VA and insurance experience, Lois brings proven expertise in policy servicing, client relationship management, combined with excellent communication skills and a strong work ethic.',
    tagline: 'Lois is the ideal Virtual Assistant for insurance agencies and service-based organizations seeking a skilled, detail-oriented professional.',
    videoUrl: 'https://www.youtube.com/embed/HSCzM1jVsaE',
    videoThumbnail: 'https://img.youtube.com/vi/HSCzM1jVsaE/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Customer service, Client retention',
    
    skills: [
      'Billing Inquiries',
      'Customer Relationship Management',
      'Inbound/Outbound Calls',
      'Coverage Updates',
      'Quoting & Policy Servicing',
      'Payment Follow-ups',
      'Lead Research',
      'Personal & Commercial Lines Insurance',
      'Client Retention',
      'Email Support',
      'Policyholder Assistance',
      'Multichannel Customer Service'
    ],
    
    tools: [
      'Ezlynx',
      'Better Agency',
      'AMS360',
      'Nowcerts',
      'Salesforce',
      'Microsoft Office',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Lois have 5 years of dedicated insurance experience, she excels in virtual assistant roles, primarily in personal lines. Her expertise was developed across notable firms like Palomino Insurance, One Stop Insurance, and We Insure, where she managed client support, communication and handled quoting through Ezlynx and various carriers. Furthermore, her tenure at Agency VA provided a strong foundation in both Personal and Commercial Insurance, alongside proficiency in multiple CRM and AMS platforms. Her skills in client retention, technical support, and diverse software make her a highly capable insurance professional.',
    
    employmentHistory: [
      {
        company: 'PALOMINO INSURANCE',
        position: 'Virtual Assistant',
        period: 'SEPT 2024 - PRESENT',
        description: '• Manages comprehensive client communication, including inbound/outbound calls, email, and text support to handle inquiries and ensure client retention.\n• They are experienced in quoting insurance through Ezlynx and other carriers and are proficient with both Ezlynx and Better Agency software.'
      },
      {
        company: 'ONE STOP INSURANCE',
        position: 'Virtual Assistant',
        period: 'MAY 2022 - MAY 2024',
        description: '• Managed comprehensive client communication, including inbound/outbound calls, email, and text support to handle customer inquiries, new client assistance, and billing follow-ups to ensure client retention.\n• They are experienced in quoting insurance through Ezlynx and other carriers.'
      },
      {
        company: 'WE INSURE',
        position: 'Virtual Assistant',
        period: 'OCT 2021 - MAY 2022',
        description: '• Managed comprehensive client communication, including inbound/outbound calls, email, and text support to handle customer inquiries, new client assistances, and billing follow-ups, ensuring client retention.\n• They are experienced in quoting insurance through Ezlynx and other carriers and are proficient in the Ezlynx platform.'
      },
      {
        company: 'AGENCY VA',
        position: 'Virtual Assistant',
        period: 'AUG 2020 - JAN 2022',
        description: '• Provided virtual assistance to US-based insurance firms, leveraging a background in both Personal and Commercial Insurance.\n• They are highly experienced with various CRM and AMS platforms, including Ezlynx, Nocerts, AMS360, and Salesforce, and are adept at tailoring their skills to meet diverse client needs.'
      },
      {
        company: 'TELETECH PHILIPPINES',
        position: 'Customer Service Representative III',
        period: 'JUL 2018 - MAY 2020',
        description: '• Managed an advertising and marketing account for Sensio White Pages, providing comprehensive customer support through inbound/outbound calls, email, and chat.\n• They possess technical skills in lead research, data mining for businesses, and working with APIs, complemented by a background in Salesforce.'
      },
      {
        company: 'SWEET G CAKES AND PASTRY MANUFACTURING',
        position: 'Pastry Cook',
        period: 'APR 2018 - DEC 2020',
        description: '• As a Pastry Cook, they managed a wide range of duties including baking, cake decorating, menu planning, and product research and development.\n• Their responsibilities also extended to operational tasks such as monitoring and managing stock levels.'
      },
      {
        company: 'SALVATORE CUOMO BAR AND RESTAURANT',
        position: 'Pastry Cook',
        period: 'APR 2016 - FEB 2018',
        description: '• Responsible for a variety of baking duties including pastry and bread making, as well as contributing to menu planning and research and development.\n• This included gaining versatile experience as a pizza maker.'
      },
      {
        company: 'HOLIDAY INN & SUITES MAKATI',
        position: 'Intern Cook',
        period: 'SEPT 2015 - DEC 2015',
        description: '• Gained comprehensive, hands-on experience across all kitchen stations, including Hot, Cold, Pastry, Vegetable Prep, and Butchery.\n• They were actively involved in the full production cycle for breakfast and lunch buffets, which included cooking hot dishes, preparing salads and a la carte items, and handling the preparation, baking, and decoration of desserts.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '95',
    englishDescription: 'Shows excellent fluency and clear pronunciation with natural flow. Effectively uses advanced vocabulary and complex grammar to communicate precise and nuanced ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={loisData} />
}
