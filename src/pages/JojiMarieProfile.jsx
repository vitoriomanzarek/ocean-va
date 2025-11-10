import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JojiMarieProfile() {
  const jojiMarieData = {
    name: 'JOJI MARIE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Joji Marie.webp',
    summary: 'Virtual Assistant with robust experience in the insurance industry, customer service, and administrative support. She excels at streamlining processes, managing data entry, and supporting client relationships through clear communication and precision. She brings to the table reliability and commitment to efficiency in every task.',
    tagline: 'Joji is fully equipped to support insurance professionals, customer-facing teams, and business owners, delivering dependable service marked by adaptability, organization, and attention to detail.',
    videoUrl: 'https://www.youtube.com/embed/5N_z80i4KrQ?t=1s',
    videoThumbnail: 'https://img.youtube.com/vi/5N_z80i4KrQ/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Customer service, Administrative support',
    
    skills: [
      'Customer Service',
      'Email & Calendar Management',
      'Personal & Commercial Insurance',
      'Data Entry',
      'Mortgage Updates',
      'ACORD Forms',
      'Quote Generation',
      'COI Downloads',
      'Proposal Creation',
      'Endorsements',
      'Policy Renewals',
      'Af-Fueled Epic CRM',
      'Policy Documentation',
      'Accounting Tasks'
    ],
    
    tools: [
      'Applied Epic',
      'Zendesk',
      'Salesforce',
      'Google Workspace',
      'Microsoft Office'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Joji has 4 years of Auto, Home, Commercial, and Health Insurance experience gained as an Administrative Assistant at an Insurance Company. In that role, she handled high-accuracy data entry, proposal creation, accounting/reconciliation, ACORD/COI processing, mortgage updates, and Applied EPIC workflows while coordinating with carriers and insureds. Earlier roles in Telecommunication Services and Home Warranty built strong customer service, troubleshooting, billing support, and scheduling skills. Strengths include precision, process compliance, documentation, cross-team coordination, and clear communication, with proven speed in learning systems like Applied EPIC.',
    
    employmentHistory: [
      {
        company: 'INSURANCE COMPANY',
        position: 'Administrative Assistant',
        period: 'APRIL 2023 - FEB 2025',
        description: '• Adding prospect to APPLIED EPIC\n• Downloading ACORDS, COI Etc.\n• Updating Insurance Mortgage\n• Communicating with carriers and insured\n• Creating Activity to Applied EPIC\n• Assisting account manager'
      },
      {
        company: 'INSURANCE COMPANY',
        position: 'Administrative Assistant',
        period: 'JAN 2021 - APRIL 2023',
        description: '• Data Entry\n• Creating proposal\n• Accounting task\n• Reconciliation\n• Checking balances'
      },
      {
        company: 'TELECOMMUNICATION SERVICES',
        position: 'Customer Support Representative',
        period: 'MAY 2020 - JAN 2021',
        description: '• Set up devices\n• Troubleshoot\n• Provide current new services\n• Answer billing inquiries'
      },
      {
        company: 'TELECOMMUNICATION SERVICES',
        position: 'Technical Support Representative',
        period: 'SEPT 2019 - APR 2020',
        description: '• Set up devices\n• Troubleshoot\n• Set up a schedule for a tech visit'
      },
      {
        company: 'HOME WARRANTY',
        position: 'Customer Service Representative',
        period: 'AUG 2018 - SEPT 2019',
        description: '• Provide details to the customer\n• Contacting contractor for maintenance\n• Setting up schedule'
      },
      {
        company: 'TELECOMMUNICATION SERVICES',
        position: 'Data Entry Specialist',
        period: 'FEB 2014 - AUG 2018',
        description: '• Add customer device into the system\n• Make sure the line is active\n• Correcting error\n• Input customer information into the system'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '70',
    englishDescription: 'Communicates confidently on familiar topics with clear pronunciation and well-structured speech. Uses basic grammar and vocabulary effectively to express thoughts and maintain conversations.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={jojiMarieData} />
}
