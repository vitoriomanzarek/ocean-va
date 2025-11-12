import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function KevinProfile() {
  const kevinData = {
    name: 'KEVIN',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Kevin.webp',
    summary: 'Kevin is a highly skilled and adaptable Virtual Assistant with a strong background in customer service, data management, and digital marketing. With years of experience across multiple industries, Kevin brings technical proficiency and leadership to every role. His expertise includes:',
    tagline: 'Kevin\'s proactive problem-solving approach ensures smooth workflows and optimized business processes. Click here to learn more about him.',
    videoUrl: 'https://www.youtube.com/embed/MnlRVthsUYE',
    videoThumbnail: 'https://img.youtube.com/vi/MnlRVthsUYE/hqdefault.jpg',
    thumbnail: 'Process optimization, Digital marketing, Team leadership',
    
    skills: [
      'Process Optimization',
      'Data Analysis',
      'Content Creation',
      'Team Supervision',
      'Social Media Management',
      'Advertising',
      'Video Editing',
      'Customer Service',
      'Account Management',
      'Quality Assurance'
    ],
    
    tools: [
      'Celigo',
      'Netsuite',
      'Adobe Suite',
      'Advanced Excel',
      'AI Labschool',
      'Microsoft Office',
      'Lightwave 3D',
      'Animation',
      'CRM & Workflow Automation'
    ],
    
    equipment: [
      'Three-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Kevin has extensive experience in team supervision, quality assurance, account management, and digital marketing. He worked as a Supervisor at Infinitech (Order Hero, Order Venture), managing customer service teams and developing automation tools. He served as a Quality Assurance Assistant at Aesbus, assessing agent performance and providing coaching. He worked as a Cash Apps & Account Management specialist at CCSI KBS, evaluating and improving account processes. He also works as a Freelance Digital Marketing professional, creating and managing advertising campaigns. His strengths include strong leadership skills, technical proficiency, attention to detail, customer service excellence, and digital marketing expertise.',
    
    employmentHistory: [
      {
        company: 'INFINITECH (ORDER HERO, ORDER VENTURE)',
        position: 'Supervisor',
        period: '2017 - 2020',
        description: '• Managed customer service teams, ensuring goal achievement and efficient data organization.\n• Developed tools for automation and improved customer tracking.\n• Managed Excel pipelines to evaluate performance and order conversion.'
      },
      {
        company: 'AESBUS',
        position: 'Quality Assurance Assistant',
        period: '2020 - 2022',
        description: '• Assessed agent performance in customer interactions.\n• Provided coaching and training to optimize communication and results.\n• Used advanced Excel for trend and performance analysis.'
      },
      {
        company: 'CCSI KBS',
        position: 'Cash Apps & Account Management',
        period: '2022 - 2025',
        description: '• Evaluated and improved processes in account and payment management.\n• Advised and trained teams to optimize call flow.\n• Conducted data analysis to enhance team performance.'
      },
      {
        company: 'FREELANCE DIGITAL MARKETING',
        position: 'Digital Marketing Specialist',
        period: '2017 - PRESENT',
        description: '• Created and managed advertising campaigns on Meta.\n• Produced and edited audiovisual content for social media.\n• Developed growth and positioning strategies for digital platforms.'
      }
    ],
    
    discResult: 'C+S',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '8',
    englishDescription: 'Speaks fluently with clear pronunciation. Uses a broad vocabulary, including idiomatic expressions, with strong grammatical accuracy. Communicates ideas coherently, developing topics effectively with smooth transitions.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Autonomous University of Baja California / Instituto Altazor',
      degree: 'Nanotechnology Engineering / Honor Student with Training in Basic Excel, Photoshop, Programming, 3D Animation, and Video Editing',
      date: '2020 - 2022 (On Hold, Sabbatical) / 2014 - 2017'
    }
  }

  return <VAProfilePage vaData={kevinData} />
}
