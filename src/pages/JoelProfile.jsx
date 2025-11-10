import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JoelProfile() {
  const joelData = {
    name: 'JOEL',
    title: 'ENGLISH-SPEAKING VA | INSURANCE',
    image: '/images/VAs/Joel.webp',
    summary: 'Joel has over 6 years of experience in the insurance industry, handling both personal lines and commercial lines. He has performed quoting, endorsements, certificates of insurance, renewals, cancellations, and quality checks. Joel brings a detail-oriented, client-focused approach to insurance underwriting support and back-office operations, ensuring accuracy and reliability in every task.',
    tagline: 'Joel combines his strong analytical and organizational skills with a solid insurance background, making him a reliable professional ready to support clients with accuracy, professionalism, and efficiency.',
    videoUrl: 'https://www.youtube.com/embed/5n99ZiMc0fs',
    videoThumbnail: 'https://img.youtube.com/vi/5n99ZiMc0fs/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Data processing, Quality analysis',
    
    skills: [
      'Executive Support',
      'Content Creation',
      'Workflow Optimization with AI Tools',
      'Event Planning',
      'Calendar Management',
      'Marketing Campaign Coordination',
      'Contract Handling',
      'Expense Reporting',
      'Social Media Management',
      'Travel Arrangements',
      'Vendor Coordination',
      'Budget Tracking'
    ],
    
    tools: [
      'Slack',
      'Salesforce',
      'CRM Systems',
      'Notion',
      'Asana',
      'Atlassian',
      'Quickbooks',
      'Canva',
      'Wordpress',
      'Microsoft Office'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Joel gained his 6 months of insurance experience while working as a Personal Lines Portfolio Underwriter (Insurance VA) at BIG Insurance. In this role, he was responsible for verifying information, processing policy applications, issuing insurance policies, and resolving discrepancies to ensure accuracy and completeness.',
    
    employmentHistory: [
      {
        company: 'BIG INSURANCE',
        position: 'Insurance VA - Personal Lines Portfolio Underwriter',
        period: 'SEPT 2024 - MAY 2025',
        description: '• Ensuring the accuracy and completeness of insurance policies. This involves tasks like verifying information, processing policy applications, issuing policies, and resolving discrepancies.'
      },
      {
        company: 'SWAK BPO - CLARKFIELD, PAMPANGA',
        position: 'Data Processing Representative (Policy Processor)',
        period: 'OCT 2021 - AUG 2024',
        description: '• Worked as a Data Processing Representative, managing policy endorsements, cancellations, renewals, and client communication for insurance documentation.'
      },
      {
        company: 'TASKUS',
        position: 'Data Analyst / Quality Analyst',
        period: 'NOV 2017 - JUN 2020',
        description: '• Held the role of Data Analyst/Quality Analyst, supporting data-driven operations and ensuring quality standards in a fast-paced customer service environment.'
      }
    ],
    
    discResult: 'I',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '7.9',
    englishDescription: 'Speaks fluently with clear pronunciation and minimal accent, maintaining coherence throughout. Uses a wide range of vocabulary and grammar flexibly to express complex ideas with confidence.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Holy Angel University',
      degree: 'Bachelor of Science in Hotel and Restaurant Management',
      date: 'BATCH 2013'
    }
  }

  return <VAProfilePage vaData={joelData} />
}
