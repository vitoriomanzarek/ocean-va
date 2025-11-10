import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function FrancisProfile() {
  const francisData = {
    name: 'FRANCIS',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Francis.webp',
    summary: 'Francis is an experienced Virtual Assistant with a deep background in insurance, eagles, and client relations. With a decade of experience across customer service and account management roles, Francis is licensed in Property & Casualty, Life, and Health insurance.',
    tagline: 'Francis is a seasoned professional ready to support insurance brokers, sales teams, and client service departments with integrity and proven experience.',
    videoUrl: 'https://www.youtube.com/embed/Atdu3qVBHLs?t=1s',
    videoThumbnail: 'https://img.youtube.com/vi/Atdu3qVBHLs/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Sales management, Client relations',
    
    skills: [
      'Claims Resolution',
      'Consultative Sales',
      'Performance Coaching',
      'Lead Management',
      'Customer Service',
      'Escalation Management',
      'Campaign Planning',
      'Direct Sales',
      'Licensed Insurance Support (P&C, Life & Health)',
      'Team Training'
    ],
    
    tools: [
      'Insurance Quoting Systems',
      'CRM & Call Center Tools',
      'Microsoft Office',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Francis brings 9 years of experience in Home, Auto, Health, and Life Insurance, having built his expertise through roles at Liberty Mutual Insurance, Preferred Partners Group, and Evergreen Public Adjuster Services. At Liberty Mutual, he served as an Insurance Agent where he skillfully guided clients through their coverage options and handled quoting and policy issuance. He later advanced to Sales Manager at Preferred Partners Group, where he led sales campaigns, managed teams, and trained new representatives. Most recently, he worked as an Account Manager at Evergreen Public Adjuster Services, consistently exceeding quotas and resolving complex client issues. Francis is known for his strong leadership, strategic sales execution, and excellent communication skills. His ability to build and maintain client relationships has been a constant throughout his career.',
    
    employmentHistory: [
      {
        company: 'EVERGREEN PUBLIC ADJUSTER SERVICES',
        position: 'Account Manager',
        period: 'JULY 2025 - 2025',
        description: '• Developed and implemented strategies to increase business and revenue for the company.\n• Recognized as a top performer by consistently exceeding monthly quotas.\n• Resolved complex customer issues in a timely manner while maintaining positive relationships with clients.'
      },
      {
        company: 'PREFERRED PARTNERS GROUP',
        position: 'Sales Manager',
        period: 'NOV 2011 - JUL 2019',
        description: '• Prepare and Launch sales campaigns for our clients.\n• Manage a team of sales people to ensure they have the support they need to be successful.\n• Interview and train new sales representatives.\n• Provided coaching and feedback to staff on an ongoing basis in order to improve job performance.'
      },
      {
        company: 'LIBERTY MUTUAL INSURANCE',
        position: 'Insurance Agent',
        period: 'FEB 2008 - NOV 2011',
        description: '• Demonstrated excellent communication skills when discussing insurance policies with customers to ensure they were fully informed of their coverage options.\n• Used company software to analyze customer coverage needs, write quotes, and issue policies.\n• Built and maintained relationships with clients to support satisfaction.'
      }
    ],
    
    discResult: 'I',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '85',
    englishDescription: 'Indicates upper-intermediate English proficiency with the ability to communicate clearly and effectively in a variety of contexts. Can understand and produce more complex language with a strong command of both spoken and written.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Christian Vocational Academy, Dallas, TX',
      degree: 'High School Diploma',
      date: 'JUNE 2005'
    }
  }

  return <VAProfilePage vaData={francisData} />
}
