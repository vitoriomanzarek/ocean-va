import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function ChristineProfile() {
  const christineData = {
    name: 'CHRISTINE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Christine.webp',
    summary: 'Christine is a highly skilled and detail-oriented Virtual Assistant with expertise in administrative support, e-commerce management, insurance and bookkeeping, and customer service. Her ability to multitask, problem-solve, and maintain high accuracy makes her a valuable asset to any team.',
    tagline: 'Christine is resourceful, proactive, and dedicated to helping businesses operate efficiently while providing excellent support. Click here to learn more about her.',
    videoUrl: 'https://www.youtube.com/embed/m0n5unGQ1Bk',
    videoThumbnail: 'https://img.youtube.com/vi/m0n5unGQ1Bk/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, E-commerce management, Administrative support',
    
    skills: [
      'Policy Processing',
      'Basic Bookkeeping & Accounts Receivable',
      'Data Management',
      'Home & Auto Insurance Quoting',
      'Certificates of Insurance Issue',
      'Product & Market Research',
      'Customer Service',
      'Email & Calendar Management',
      'Insurance Documentation',
      'Social Media Management',
      'PPC Campaign Management',
      'Payment Monitoring'
    ],
    
    tools: [
      'Zoho',
      'PL Rater',
      'QuoteRush',
      'QuickBooks',
      'Nowcerts',
      'PPC Management',
      'Microsoft Office',
      'Google Workspace',
      'Amazon Seller Central'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Christine has extensive experience in insurance, e-commerce, and administrative support. She worked as a Personal Lines VA at an Insurance Company, processing quotes, monitoring payment status, managing accounts receivable, and handling various insurance documents. She worked as an Amazon Marketing VA at Inspiratek and Ecotero, managing PPC campaigns, keyword research, and social media. As an Amazon Business Manager at OFP Outsourcing, she handled product research and sourcing. Most recently, she worked as a CSR at Nowcerts, processing insurance documents and managing customer communications. Her strengths include attention to detail, strong organizational skills, customer service excellence, and technical proficiency.',
    
    employmentHistory: [
      {
        company: 'INSURANCE COMPANY',
        position: 'Personal Lines VA',
        period: 'JUN 2022 - MAR 2024',
        description: '• Processing Quote in PL Rater and QuoteRush\n• Sending Invoices and reviewing receipts\n• Monitoring Payment Status\n• Maintaining and updating Client details to CRM\n• Accounts receivable - payment follow-up\n• Auditing Nowcerts Renewal Center and Lost report\n• Processing Direct Bill Statements\n• Processing New business documents and Renewals\n• Reconciliation of Agency Commission Statements\n• Processing Mortgage Change\n• Basic Bookkeeping\n• SOP Creation\n• Making phone calls to Mortgage Companies, Lien holders, and clients\n• General Research'
      },
      {
        company: 'INSPIRATEK AND ECOTERO',
        position: 'Amazon Marketing VA',
        period: 'NOV 2021 - AUG 2022',
        description: '• Keyword Research\n• PPC Campaign Management\n• FB Ads Management\n• Influencer Marketing\n• Social Media Management\n• Competitor Research\n• Social Media Management'
      },
      {
        company: 'OFP OUTSOURCING',
        position: 'Amazon Business Manager',
        period: 'SEP 2021 - NOV 2021',
        description: '• Product Research\n• Product Sourcing\n• Product Listing\n• Optimizing Product Listing Content'
      },
      {
        company: 'NOWCERTS CSR',
        position: 'Personal and Commercial Lines',
        period: 'SEP 2021 - NOV 2021',
        description: '• Processing and sending COI/EOI to Certificate Holders\n• Monitoring of Pending Cancellations\n• Processing Direct Bill Statements\n• Sending Notice of Cancellation to Insured via Zoho (Email and SMS)\n• Reconciliation of Agency Commission Statements\n• Data Entry of Company Expenses thru QuickBooks\n• Processing Quote in PL Rater and QuoteRush\n• Administrative Task'
      }
    ],
    
    discResult: 'C+D',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nDominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
    
    englishScore: '7.3',
    englishDescription: 'Communicates clearly with strong fluency and coherence. Pronunciation is easily understood. Uses a flexible vocabulary with idiomatic expressions and complex grammar structures, effectively developing topics.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Universidad de Manila',
      degree: 'Bachelor of Science in Business Administration',
      date: '2012 - 2016',
      certifications: [
        'Introduction to Personal Lines',
        'Homeowners',
        'Personal Auto',
        'Dwelling',
        'Umbrella',
        'Flood',
        'Introduction to Commercial Lines',
        'Workers\' Compensation',
        'General Liability',
        'Earthquake',
        'Business Communications',
        'Employee - How to Handle Objections: Getting Customers to Say, "Yes"',
        'Working Across Generations and Cultures',
        'Employee - Sexual Harassment Training',
        'Personal Articles Floater'
      ]
    }
  }

  return <VAProfilePage vaData={christineData} />
}
