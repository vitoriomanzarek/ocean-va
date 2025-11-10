import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function GizelleProfile() {
  const gizelleData = {
    name: 'GIZELLE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Gizelle.webp',
    summary: 'English-speaking Virtual Assistant with extensive experience in customer service, administrative support, and health insurance assistance. Gizelle is highly adaptable, client-oriented, and a novice in managing multiple tasks efficiently. She is ready to start immediately and can assist with the following:',
    tagline: 'Gizelle is excited to collaborate and bring her expertise to your team. Click here to connect and see how she can help!',
    videoUrl: 'https://www.youtube.com/embed/xkbMKgYarbk',
    videoThumbnail: 'https://img.youtube.com/vi/xkbMKgYarbk/maxresdefault.jpg',
    thumbnail: 'Health insurance expertise, Customer service, Administrative support',
    
    skills: [
      'Meeting Scheduling',
      'Confidential Data Management',
      'Insurance Policy Update',
      'Customer Support',
      'Calendar & Email Management',
      'Administrative Support',
      'Data Entry',
      'Claims Assistance',
      'Insurance Verification & Eligibility',
      'Billing & Transactions'
    ],
    
    tools: [
      'Zoho',
      'Zendesk',
      'Zoom Workplace',
      'Google Workspace',
      'Microsoft Office',
      'Insurance & Financial Systems'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Gizelle is a Customer Service Representative with 3 years of U.S. health insurance experience gained at Inspiro Relia Inc. and Hinduja Global Solutions. She expertly addresses member inquiries on coverage, benefits, and claim status, assists with plan enrollments, and ensures strict adherence to data protection and confidentiality. She investigates and resolves complaints and claim denials promptly and accurately. Her strengths include clear communication, problem-solving, empathy, attention to detail, and dependable follow-through in dynamic, remote environments.',
    
    employmentHistory: [
      {
        company: 'HINDUJA GLOBAL SOLUTIONS',
        position: 'Customer Service Representative (Remote Receptionist)',
        period: 'OCT 2021 - FEB 2024',
        description: '• Full time customer service representative with health insurance in the US.\n• Addresses customer inquiries and concerns promptly and understands the customer\'s insurance coverage, benefits and claim status.\n• Assist customers with enrolling with their insurance plans and ensuring compliance with data protection regulations and confidentiality policies.\n• Investigate and resolve customer complaints and claim denials in a timely manner.'
      },
      {
        company: 'INSPIRO RELIA INC.',
        position: 'Customer Service Representative (Remote Receptionist)',
        period: 'MAR 2021 - OCT 2021',
        description: '• Full time customer service representative with health insurance in the US.\n• Addresses customer inquiries and concerns promptly and understands the customer\'s insurance coverage, benefits and claim status.\n• Assist customers with enrolling with their insurance plans and ensuring compliance with data protection regulations and confidentiality policies.\n• Investigate and resolve customer complaints and claim denials in a timely manner.'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '6.3',
    englishDescription: 'Communicates understandably with fluency and coherence. Pronunciation is generally clear. Uses an adequate vocabulary and grammar structures with some flexibility and effectively conveying ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Our Lady of Fatima University / Don An Roces Sr. Science & Technology High School / Uson Elementary School',
      degree: 'BS Business Administration Major in Banking and Finance / High School / Elementary',
      date: '2016-2021 / 2009-2013 / 2003-2009',
      certifications: [
        'Introduction to Personal Lines',
        'Personal Auto',
        'Dwelling',
        'Umbrella',
        'Flood',
        'Introduction to Commercial Lines',
        'Property',
        'Workers\' Compensation',
        'General Liability'
      ]
    }
  }

  return <VAProfilePage vaData={gizelleData} />
}
