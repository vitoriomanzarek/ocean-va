import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function KarloProfile() {
  const karloData = {
    name: 'KARL',
    title: 'ENGLISH SPEAKING VA | PERSONAL AND COMMERCIAL LINES INSURANCE',
    image: '/images/VAs/Karl.webp',
    summary: 'Karlo is an Insurance Virtual Assistant with over six years of experience in the BPO industry and three years supporting U.S.-based insurance agencies. He has worked extensively with Personal Lines and selected Commercial Lines, collaborating directly with licensed agents in Florida, Massachusetts, New Hampshire, and Maine. His experience covers the full policy lifecycle, strong carrier coordination, and consistent client-facing support in fast-paced insurance environments.',
    tagline: 'Karlo is a dependable Insurance VA who can independently handle quoting, endorsements, renewals, and COIs with precision and confidence. His familiarity with carrier portals, rating tools, and CRMs allows agencies to streamline operations while maintaining accuracy, compliance, and high service standards.',
    videoUrl: 'https://www.youtube.com/embed/W6f_dt2kiIY',
    videoThumbnail: 'https://img.youtube.com/vi/W6f_dt2kiIY/maxresdefault.jpg',
    thumbnail: '3 yrs of Insurance Experience, PERSONAL & COMMERCIAL LINES, MULTI-STATE EXPERIENCE',
    
    skills: [
      'PERSONAL LINES',
      'COMMERCIAL LINES',
      'INSURANCE QUOTING',
      'POLICY MANAGEMENT',
      'ENDORSEMENTS',
      'RENEWALS',
      'COI ISSUANCE',
      'BILLING SUPPORT',
      'CARRIER COORDINATION',
      'CLIENT COMMUNICATION',
      'CRM MANAGEMENT',
      'DATA ACCURACY'
    ],
    
    tools: [
      'AMS360',
      'EZLYNX',
      'PL RATER',
      'QUOTERUSH',
      'HAWKSOFT',
      'DUCK CREEK',
      'NOWCERTS',
      'BETTER AGENCY',
      'ZENDESK',
      'AVAYA',
      'LIGHTSPEED'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Karlo has 3 years of Personal and Commercial Lines insurance experience, gained as an Insurance Agent Virtual Assistant at Agency VA and Agency Strong MA, where he handled policy support and client communications. He also has solid customer service experience from Valor Global and Filweb Asia Inc., supporting voice, chat, and email accounts in SaaS and technical environments. His background includes IT and technical support roles at Home Defense Technology Corporation and Crosspoint Computers Inc., enhancing his troubleshooting skills. Earlier roles in sales and retail support at Iproximity Offshore Inc. and Games and Gadgets Ent., where he was promoted to Assistant OIC, demonstrate leadership potential. His key strengths include strong communication, insurance support expertise, technical proficiency, adaptability, and attention to detail.',
    
    employmentHistory: [
      {
        company: 'Agency Strong MA',
        position: 'Insurance Agent Virtual Assistant',
        period: '2024 - 2025',
        description: '• Insurance account for personal and commercial lines\n• Policy support and client communications\n• Working with licensed agents in Massachusetts'
      },
      {
        company: 'Valor Global',
        position: 'Customer Service Representative (TSR/CSR, Voice Account)',
        period: '2023 - 2024',
        description: '• Customer service support for voice accounts\n• Handling client inquiries and support requests\n• Maintaining high service standards'
      },
      {
        company: 'Agency VA',
        position: 'Insurance Agent Virtual Assistant',
        period: '2022 - 2023',
        description: '• Insurance account for personal and commercial lines\n• Policy support and client communications\n• Working with licensed agents in multiple states (Florida, Massachusetts, New Hampshire, Maine)'
      },
      {
        company: 'Home Defense Technology Corporation',
        position: 'Emergency Rapid Assistant "ERA" Application SaaS (Inhouse IT Generalist)',
        period: '2020 - 2022',
        description: '• IT support and technical troubleshooting\n• SaaS application support\n• Technical proficiency and problem-solving'
      },
      {
        company: 'Filweb Asia Inc.',
        position: 'Customer Service Representative',
        period: '2017 - 2018',
        description: '• Monitoring Application SaaS (Technical/ Chat/ Email Support and Live Call Agent)\n• Supporting voice, chat, and email accounts\n• Technical and customer service support'
      },
      {
        company: 'Iproximity Offshore Inc.',
        position: 'Customer Service Representative',
        period: '2016',
        description: '• Sales, Voice Account\n• Customer service and sales support'
      },
      {
        company: 'Crosspoint Computers Inc. Head Office',
        position: 'Technical Staff/IT Support',
        period: '2015 - 2016',
        description: '• IT support and technical troubleshooting\n• Technical proficiency and problem-solving skills'
      },
      {
        company: 'Games And Gadgets Ent.',
        position: 'Customer Support Representative',
        period: '2014 - 2015',
        description: '• Customer support and retail operations\n• Promoted as Store/Branch Asst. OIC\n• Leadership and operational management'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '90',
    englishDescription: 'Shows confident and fluent communication with clear pronunciation and a natural flow of speech. Uses advanced vocabulary and well-structured grammar effectively to express complex ideas with clarity and precision.',
    
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

  return <VAProfilePage vaData={karloData} />
}

