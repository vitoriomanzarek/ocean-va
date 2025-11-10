import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JasmineProfile() {
  const jasmineData = {
    name: 'JASMINE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Jasmine.webp',
    summary: 'English speaking virtual assistant with extensive experience in customer service, administrative support, marketing, and real estate assistance. Jasmine is highly adaptable, detail-oriented and excels at managing multiple tasks efficiently. Jasmine is ready to start immediately and can assist with the following tasks:',
    tagline: 'Jasmine is excited to collaborate and bring her skills to your team. Want to learn more? Click here to watch her video and see how she can help!',
    videoUrl: 'https://www.youtube.com/embed/WhdFCM1GABs',
    videoThumbnail: 'https://img.youtube.com/vi/WhdFCM1GABs/maxresdefault.jpg',
    thumbnail: 'Customer service, Marketing support, Real estate assistance',
    
    skills: [
      'Reception & Customer Support',
      'Graphic Design',
      'Email Marketing',
      'Guest Reservations Monitoring',
      'Meeting Scheduling',
      'Calendar Management',
      'Property Management',
      'Property Maintenance Coordination',
      'Documents Organization',
      'Social Media Management',
      'Guest Check-in/Check-out Management'
    ],
    
    tools: [
      'CRM',
      'Zoho',
      'Zendesk',
      'Canva',
      'Buzzsprout',
      'Instagram & Facebook Ads',
      'Microsoft Office',
      'Google Suite'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Jasmine has diverse experience across customer service, marketing, and administrative roles. She worked as a General Real Estate VA at Sphere Rocket VA, handling customer service and health insurance inquiries. As a Digital Marketing Virtual Assistant at Outsourced Doers, she created email campaigns, managed social media, and produced graphic designs. At LTS Malls, Inc., she progressed from Administrative Assistant to Marketing Assistant to Tenant Relations Supervisor, managing tenant accounts, coordinating events, and overseeing mall operations. Her strengths include clear communication, problem-solving, adaptability, and strong organizational skills.',
    
    employmentHistory: [
      {
        company: 'SPHERE ROCKET VA',
        position: 'General Real Estate VA',
        period: 'JUL 2023 - OCT 2023',
        description: '• Full time customer service representative with health insurance in the US.\n• Addresses inquiries and understands coverage, benefits, and claim status.\n• Assists customers with enrollment and ensures data protection compliance.\n• Investigate and resolve customer complaints and claim denials in a timely manner.'
      },
      {
        company: 'OUTSOURCED DOERS',
        position: 'Digital Marketing Virtual Assistant',
        period: 'SEP 2022 - JAN 2023',
        description: '• Create weekly email newsletters and email campaigns.\n• Promoting weekly podcast episodes through sending emails to subscribers.\n• Posting and managing social media accounts (Facebook and Instagram).\n• Create graphical designs for all social media posts and email weekly newsletters.\n• Edit audios, inserting intros and outros for the podcast episode.\n• Release weekly podcast episodes on Buzzsprout and all major podcast platforms.'
      },
      {
        company: 'LTS MALLS, INC.',
        position: 'Tenant Relations Supervisor',
        period: 'SEP 2016 - JUN 2018',
        description: '• Tenancy Management. Handle tenants accounts and coordinate with the billing department.\n• Maintenance of good relationship with tenants.\n• Ensuring to help them with their daily sales and foot traffic.\n• Resolve customer complaints regarding tenants or tenant employees.\n• Monitoring tenants\' sales to come up with more ideas on how to help them earn more sales and customers.'
      },
      {
        company: 'LTS MALLS, INC.',
        position: 'Marketing Assistant',
        period: 'OCT 2014 - AUG 2016',
        description: '• Conceptualize and implement seasonal events and promotions for NCCC Mall Davao to increase foot traffic.\n• Oversee the distribution and installation of marketing materials for events and new tenants.\n• Ensuring the participation of mall tenants for all mall wide events.\n• Create linkages with private and government institutions.'
      },
      {
        company: 'LTS MALLS, INC.',
        position: 'Administrative Assistant',
        period: 'SEP 2013 - SEP 2014',
        description: '• Receptionist of NCCC Mall Davao Administration Office.\n• Set accurate appointments between tenants and Mall Administration Officers.\n• Cater to mall customer complaints.\n• Proper documentation and filing of Mall Administration files.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '6.4',
    englishDescription: 'Communicates clearly with reasonable fluency and coherence. Pronunciation is easily understood. Uses a good vocabulary and grammar structures with flexibility, effectively expressing ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Davao Doctors College, Inc.',
      degree: 'BS Hospitality Management - Dean\'s List - 3rd Honors',
      date: 'APRIL 2011',
      certifications: [
        'Introduction to Personal Lines',
        'Homeowners',
        'Personal Auto',
        'Dwelling',
        'Umbrella',
        'Introduction to Commercial Lines',
        'Commercial Auto',
        'Property',
        'Workers\' Compensation',
        'General Liability'
      ]
    }
  }

  return <VAProfilePage vaData={jasmineData} />
}
