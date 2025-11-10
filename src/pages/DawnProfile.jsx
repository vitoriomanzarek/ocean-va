import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function DawnProfile() {
  const dawnData = {
    name: 'DAWN',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Dawn.webp',
    summary: 'Dawn is a detail-oriented Virtual Assistant with over 6 years of combined experience in insurance support, sales operations, and administrative coordination. Dawn is also skilled in customer service, team supervision, and daily operations—making her an excellent all-around support professional.',
    tagline: 'Dawn\'s insurance knowledge, sales support, and administrative discipline makes her a valuable VA for agencies, sales teams, and service providers.',
    videoUrl: 'https://www.youtube.com/embed/fMWR-UrNXAg',
    videoThumbnail: 'https://img.youtube.com/vi/fMWR-UrNXAg/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Sales operations, Customer service',
    
    skills: [
      'Quote Proposal Generation',
      'Client Inquiry Handling',
      'Policy Implementation',
      'Email Management',
      'Customer Service',
      'Inventory Oversight',
      'Transaction Auditing',
      'Insurance Support (Home & Auto)',
      'Policy Changes',
      'Sales Operations'
    ],
    
    tools: [
      'Callfire',
      'Carrier Portals',
      'Email Systems',
      'Zoom Workplace',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Dawn has extensive experience in insurance support, sales operations, and administrative management. She worked as a Support Sales Associate at Support Zebra, providing back office support, processing insurance requests, managing email inquiries, and generating quote proposals. She served as an Area Sales Supervisor at Sabella Mktg. Corporation, managing daily sales operations and inventory. She also worked as a Mall Checker/Cashier at Unitpace Corporation, ensuring accurate transactions and smooth operations. Her strengths include strong organizational skills, customer service excellence, sales acumen, attention to detail, and team leadership.',
    
    employmentHistory: [
      {
        company: 'SUPPORT ZEBRA',
        position: 'Support Sales Associate (Back Office)',
        period: 'OCT 2016 - SEP 2023',
        description: '• Back office support.\n• Responsible for processing client\'s insurance request.\n• Manage email inboxes and assist in responding to clients\' inquiries.\n• Generate insurance quote proposals\n• Responsible for a uniform process within the organization'
      },
      {
        company: 'SABELLA MKTG. CORPORATION',
        position: 'Area Sales Supervisor',
        period: 'JUL 2011 - AUG 2016',
        description: '• Responsible for day to day sales operations and inventory.\n• Implementing policies and delegate duties properly.\n• Handles hiring and recruitment process.'
      },
      {
        company: 'UNITPACE CORPORATION',
        position: 'Mall Checker/Cashier',
        period: 'NOV 2007 - MAY 2010',
        description: '• Ensures transactions made by the cashier are accurate and assist cashier on duty.\n• Act as a Department Supervisor ensuring that the day to day operation runs smoothly and efficiently.'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '90',
    englishDescription: 'Speaks fluently and confidently on a wide range of topics. Demonstrates strong command of vocabulary and idiomatic language. Pronunciation is clear and natural, with consistent grammatical accuracy and the ability to express complex ideas with ease.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Capitol University',
      degree: 'BSBA Major in Human Resource Management',
      date: '2022 - 2023'
    }
  }

  return <VAProfilePage vaData={dawnData} />
}
