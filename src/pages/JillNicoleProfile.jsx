import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JillNicoleProfile() {
  const jillNicoleData = {
    name: 'JILL NICOLE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Jill.webp',
    summary: 'Tech savvy Virtual Assistant with strong computer literacy, specializing in customer service, time management, and administrative support. Excited and ready to start handling tasks such as:',
    tagline: 'Jill can begin working with you right away! Want to learn more about her skills and experience? Click here to watch her video and see how she can help.',
    videoUrl: 'https://www.youtube.com/embed/7yREE7oxSu0',
    videoThumbnail: 'https://img.youtube.com/vi/7yREE7oxSu0/maxresdefault.jpg',
    thumbnail: 'Customer service, Administrative support, Data analysis',
    
    skills: [
      'Data Entry',
      'Review Data for Accuracy',
      'Training Coordination',
      'CRM',
      'Managing Calendar and Setup Meetings',
      'Workforce Analytics',
      'Staff Scheduling',
      'Social Media Management',
      'Timekeeping',
      'Reporting and Analyzing Data',
      'Inbound & Outbound Calls',
      'Email Management',
      'Customer Support'
    ],
    
    tools: [
      'Google Workspace',
      'Microsoft Office',
      'Workforce Optimization Systems',
      'Zendesk',
      'Zoho'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Jill Nicole has diverse experience in customer service, content moderation, and workforce management. She started as a Customer Service Representative at Sutherland, handling Amazon retail support. She progressed to Sales Agent/CSR at IQOR, managing customer orders and inquiries. At Majorel/TP, she worked as a Content Moderator reviewing user-generated content, then as a WFM Real Time Analyst monitoring agent activities and performance, and finally as a WFM Scheduling Analyst optimizing schedules and workforce resources. Her strengths include strong computer literacy, attention to detail, customer service excellence, and analytical skills.',
    
    employmentHistory: [
      {
        company: 'MAJOREL/TP',
        position: 'WFM Scheduling Analyst',
        period: 'FEB 2023 - FEB 2024',
        description: '• Responsible to create/optimize schedules and maximize efficient utilization of resources through schedules that have been released/created in the most cost effective way i.e. holidays, voluntary time-offs, break planning.\n• Workforce Management Tool optimization, proactively ensuring sufficient coverage at all times to deliver contractual requirements consistently.'
      },
      {
        company: 'MAJOREL/TP',
        position: 'WFM Real Time Analyst',
        period: 'JUN 2022 - FEB 2023',
        description: '• Our responsibility is to monitor agent activities by monitoring their attendance, queues, and adherence.\n• Sending an hourly, end of week and end of month reports for Operations visibility.\n• Attending meetings with Clients discussing the performance of the account'
      },
      {
        company: 'MAJOREL/TP',
        position: 'Content Moderator',
        period: 'APR 2018 - JUN 2022',
        description: '• We review and monitor user-generated content to look for messages and content that go against policy and/or community guidelines.'
      },
      {
        company: 'IQOR',
        position: 'Sales Agent/CSR',
        period: 'NOV 2017 - MAR 2018',
        description: '• Handled incoming calls for customers who wants to place an order and helping them on tracking their replacement or any order concerns.\n• Offering Ad-Ons like products related to what they ordered'
      },
      {
        company: 'SUTHERLAND',
        position: 'Customer Service Representative',
        period: 'NOV 2016 - MAR 2017',
        description: '• Supporting Amazon retail customers by taking inbound calls, outbound calls, and chat.\n• Processing and tracking of orders either new one, returns and replacements.'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '6.2',
    englishDescription: 'Speaks clearly with generally good fluency. Uses a varied vocabulary and idiomatic expressions. Grammar is solid, with a mix of simple and complex structures. At times, may pause while formulating thoughts, but overall communication remains clear.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'AMA Computer Learning Center',
      degree: 'Business and Office Administration Services',
      date: '2012 - 2015',
      certifications: [
        'Introduction to Personal Lines',
        'Homeowners',
        'Personal Auto',
        'Dwelling',
        'Umbrella',
        'Excess & Umbrella Liability',
        'Flood',
        'Introduction to Commercial Lines',
        'Commercial Auto',
        'Property',
        'Property: Advanced',
        'Workers\' Compensation',
        'General Liability',
        'Inland Marine',
        'Personal Articles Floater',
        'Cyber Liability Insurance',
        'Ethics for Insurance',
        'Workplace Communication Basics',
        'Manager - Project Management 101',
        'Manager - A Guide to Seeking and Giving Feedback',
        'Manager - Leading Through Difficult Times',
        'Information Security Training',
        'Business Communications',
        'Business Owner Policy (BOP)',
        'Employee - Resolving Conflict with Coworkers',
        'Employee Benefits',
        'Employee - A Guide to Seeking and Receiving Feedback',
        'Employee - Driving Your Career with a Growth Mindset',
        'Employee - How to Handle Objections: Getting Customers to Say, "Yes"',
        'Employee - Customer Service Essentials',
        'Employee - A Guide to Effective Meetings and Time Management',
        'Employee - Difficult Conversations and Escalating Issues',
        'A Guide to Effective Meetings and Time Management'
      ]
    }
  }

  return <VAProfilePage vaData={jillNicoleData} />
}
