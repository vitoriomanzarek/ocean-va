import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function GeraldinProfile() {
  const geraldinData = {
    name: 'GERALDINE',
    title: 'INSURANCE VIRTUAL ASSISTANT',
    image: '/images/VAs/Geraldine.webp',
    summary: 'Geraldine is an experienced Insurance Virtual Assistant with a strong background in Commercial and Personal Lines support, customer service, and sales operations. From 2021 to 2024, she worked as an Insurance VA where she managed quoting, policy check-ins, processing endorsements, preparing renewal proposals, sending cancellation notices, and assisting with claims filing.',
    tagline: 'Geraldine is the ideal Virtual Assistant for insurance agencies, customer service teams, and sales-driven organizations seeking a detail-oriented professional with hands-on insurance knowledge and strong client communication skills.',
    videoUrl: 'https://www.youtube.com/embed/OAEGigybmFM',
    videoThumbnail: 'https://img.youtube.com/vi/OAEGigybmFM/maxresdefault.jpg',
    thumbnail: 'Commercial and personal lines expertise, Customer service, Sales support',
    
    skills: [
      'Upselling & Cross-Selling',
      'Policy-Checking',
      'Customer Service',
      'Order Processing',
      'Insurance Quoting & Proposals',
      'Documentation',
      'Commercial & Personal Lines',
      'Renewals & Endorsements',
      'Claims Assistance',
      'Technical Support',
      'Sales Support'
    ],
    
    tools: [
      'Applied Epic',
      'Ezlynx',
      'Salesforce',
      'Zendesk',
      'Dash',
      'Ease',
      'Microsoft Office',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Geraldine gained her 3 years of experience in Auto, Home, and Commercial Insurance through her role as an Insurance Virtual Assistant. During this time, she handled both personal and commercial lines–processing certificates and evidence of insurance, quoting across different carrier sites, verifying policy endorsements, preparing ACORD forms, issuing renewals and cancellations, and maintaining client records and insurance documentation, all while supporting U.S.-based insurance agencies.',
    
    employmentHistory: [
      {
        company: 'INSURANCE VA',
        position: 'Insurance Virtual Assistant',
        period: 'OCT 2021 - MAY 2024',
        description: '• Handled policy quoting, endorsements, ACORD forms, renewals, cancellations, and insurance documentation for Auto, Home, and Commercial lines while supporting U.S.-based insurance agencies.'
      },
      {
        company: 'ALORICA',
        position: 'Customer Service Representative',
        period: 'MAR 2021 - SEPT 2021',
        description: '• Assisted U.S.-based customers with billing concerns and account inquiries for a telecommunications provider in a high-volume call center.'
      },
      {
        company: 'TELETECH',
        position: 'Customer Service Representative',
        period: 'NOV 2019 - JAN 2021',
        description: '• Provided billing and account support to clients of a major U.S. telecommunications company, resolving service-related issues effectively.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '75',
    englishDescription: 'Communicates clearly with good pronunciation and generally fluent speech. Uses a solid vocabulary and grammar range to express ideas effectively, with growing flexibility.',
    
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

  return <VAProfilePage vaData={geraldinData} />
}
