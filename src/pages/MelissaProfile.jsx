import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MelissaProfile() {
  const melissaData = {
    name: 'MELISSA',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Melissa.webp',
    summary: 'Melissa is an experienced and detail-oriented Virtual Assistant with over 10 years of combined expertise in project management, insurance support, customer service, and process training. Known for her reliability, results-driven mindset, and ability to thrive under pressure, Melissa provides outstanding support tailored to each client\'s specific needs.',
    tagline: 'Melissa is fully equipped to support businesses and professionals seeking dependable assistance with a focus on insurance servicing, client communication, and operational efficiency.',
    videoUrl: 'https://www.youtube.com/embed/6dB2M8wAkjE',
    videoThumbnail: 'https://img.youtube.com/vi/6dB2M8wAkjE/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Project management, Customer service',
    
    skills: [
      'Home & Auto Insurance',
      'Client Issue Resolution',
      'Policy Review & Update',
      'Project Coordination',
      'Calendar & Email Management',
      'Inbound & Outbound Calls',
      'Payment Processing',
      'Insurance Claims Follow-ups',
      'Quote Generation',
      'COI (Certificate of Insurance) & Declaration Pages',
      'Documentation Management'
    ],
    
    tools: [
      'CRMs',
      'Google Suite',
      'Microsoft Office',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Melissa has over 10 years of combined expertise in project management, insurance support, customer service, and process training. She worked as a Project Manager at Translationz, managing and coordinating interpreters and translators. She served as a Process Specialist/Process Trainer/Quality Analyst at Cognizant Technology Solutions, coordinating training and facilitating domain and process training for insurance accounts. She worked as a Customer Service Representative at Altisource Business Solutions, meeting customer needs while maintaining performance targets. She served as an Insurance Service Representative at Convergys, providing billing assistance and customer support. She worked as an Insurance Service Representative at EXL Services, processing payments and assisting callers with insurance queries. Her strengths include strong customer service skills, attention to detail, project management expertise, insurance knowledge, and training proficiency.',
    
    employmentHistory: [
      {
        company: 'TRANSLATIONZ',
        position: 'Project Manager',
        period: 'APR 2022 - CURRENT',
        description: '• Manages and coordinates interpreters or translators and the client\'s language service request.\n• Ensures that projects adhere to frameworks and all documentations are maintained appropriately.\n• Provides administrative support when and as needed.'
      },
      {
        company: 'COGNIZANT TECHNOLOGY SOLUTIONS',
        position: 'Process Specialist / Process Trainer / Quality Analyst',
        period: 'FEB 2016 - MAR 2022',
        description: '• Coordinated with the appropriate department during pre-process and process training to discuss training preparations including the timeline and the agenda.\n• Facilitated domain and process training for insurance accounts - voice and chat support.\n• Helped the team in meeting the service level targets by taking chats as needed, reviewing the recorded chats and provide feedback as deemed necessary.\n• Conducted huddlesessions to discussthe challenges of the team and how to improve them.'
      },
      {
        company: 'ALTISOURCE BUSINESS SOLUTIONS',
        position: 'Customer Service Representative',
        period: 'OCT 2015 - JAN 2016',
        description: '• Met inbound customer needs while maintaining strict performance targets.\n• Provided solutions that fit those individualized situations and prioritize the customer\'s needs at each step of the process.\n• Protected the company and customers information with strict use of established security procedures.'
      },
      {
        company: 'CONVERGYS',
        position: 'Insurance Service Representative',
        period: 'NOV 2014 - SEP 2015',
        description: '• Provided billing assistance like processing payments and discussed billing activities on the account.\n• Assisted callers with their queries about the policyholder\'s personal insurance and sent appropriate documents as needed'
      },
      {
        company: 'EXL SERVICES',
        position: 'Insurance Service Representative',
        period: 'JAN 2010 - OCT 2014',
        description: '• Processed insurance payments and discussed billing activities on the account.\n• Assisted callers with their queries about the policy holder\'s personal insurance and sort appropriate documents as needed'
      }
    ],
    
    discResult: 'I+S',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '81',
    englishDescription: 'Communicates fluently and clearly on a wide range of topics with good command of grammar and vocabulary. Pronunciation is easy to understand and ideas are expressed with confidence and coherence.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Philippine Normal University, Manila / National Teachers College, Manila',
      degree: 'Bachelor of Science in Biology / Certificate in Teaching Program Education',
      date: ''
    }
  }

  return <VAProfilePage vaData={melissaData} />
}
