import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function AnaVictoriaProfile() {
  const anaVictoriaData = {
    name: 'ANA VICTORIA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Ana Victoria.webp',
    summary: 'Bilingual Virtual Assistant with hands-on experience in insurance support services, customer interaction, and administrative coordination. With strong bilingual communication skills and a proactive approach, Ana Victoria confidently manages responsibilities such as:',
    tagline: 'Ana Victoria provides dependable, high-level support that empowers busy professionals to concentrate on scaling their business.',
    videoUrl: 'https://www.youtube.com/embed/1d4dWgjd0fE',
    videoThumbnail: 'https://img.youtube.com/vi/1d4dWgjd0fE/maxresdefault.jpg',
    thumbnail: 'Bilingual support, Insurance expertise, Customer service',
    
    skills: [
      'Commercial Trucking Insurance',
      'Inbound & Outbound Calls',
      'Data Entry & CRM',
      'Policy Changes',
      'Client Issue Resolution',
      'Calendar & Email Management',
      'Quote Creation',
      'Endorsements',
      'Insurance Policy Reviews',
      'Payment Assistance',
      'COIs Documentation'
    ],
    
    tools: [
      'Google Suite',
      'Zoom Workplace',
      'Geico & Progressive Portals',
      'CRMs',
      'Nowcerts'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Ana Victoria has diverse experience in customer service, education, and administrative support. She currently works as a Learning Advisor at Learnex English Community, teaching English to Spanish speakers. Previously, she worked in cognitive behavioral therapy at La Posada del Buen Samaritano IAP, provided data entry and customer service at Social Service Department (Unison), worked in telemarketing at Mex Call Center, and managed social media and customer service at Mad Shop Online Store. Her strengths include bilingual communication, customer-focused approach, attention to detail, and strong organizational skills.',
    
    employmentHistory: [
      {
        company: 'LEARNEX ENGLISH COMMUNITY',
        position: 'Learning Advisor',
        period: 'MAY 2023 - PRESENT',
        description: '• English community for spanish speakers. Teaching english through conversation.'
      },
      {
        company: 'LA POSADA DEL BUEN SAMARITANO IAP',
        position: 'Cognitive Behavioral Therapy',
        period: 'FEB 2023 - JUN 2023',
        description: '• Cognitive behavioral therapy to individuals and groups.\n• Addictions rehab center for woman'
      },
      {
        company: 'SOCIAL SERVICE DEPARTMENT (UNISON)',
        position: 'Data Entry and Customer Service',
        period: 'FEB 2019 - DEC 2019',
        description: '• Offering attention by phoneto students gaint through their social service process, supporting or guidingthem to find a solutionto their doubt.\n• Data entry to the social service software'
      },
      {
        company: 'MEX CALL CENTER',
        position: 'Telemarketing',
        period: 'JAN 2021 - JUN 2021',
        description: '• Identifying prospects, operating telephone equipment, giving product information, and updating customer databases.\n• Assists in prospect follow-up and support of sales activities'
      },
      {
        company: 'MAD SHOP ONLINE STORE',
        position: 'Social Media Assistant',
        period: 'AUG 2021 - JAN 2022',
        description: '• Posting content and interacting with clients through social media.\n• Customer service(live chat)'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '7.3',
    englishDescription: 'Speaks fluently with clear pronunciation and minimal accent. Uses a broad vocabulary and complex grammar structures to express ideas effectively and coherently.',
    
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

  return <VAProfilePage vaData={anaVictoriaData} />
}
