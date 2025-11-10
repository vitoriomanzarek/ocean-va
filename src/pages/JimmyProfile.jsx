import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JimmyProfile() {
  const jimmyData = {
    name: 'JIMMY',
    title: 'INSURANCE VIRTUAL ASSISTANT',
    image: '/images/VAs/Jimmy.webp',
    summary: 'Jimmy is a skilled Virtual Assistant with over 10 years of experience in insurance support, customer service, collections and account management. His background in both insurance and finance-related services makes him a versatile professional who can provide support to agencies, call centers, and service-based businesses.',
    tagline: 'Jimmy is the ideal Virtual Assistant for insurance agencies, seeking a customer-focused, detail-oriented professional with proven experience in insurance operations.',
    videoUrl: 'https://www.youtube.com/embed/rKDnjVB-dxE',
    videoThumbnail: 'https://img.youtube.com/vi/rKDnjVB-dxE/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Customer service, Account management',
    
    skills: [
      'Account Assistance',
      'Insurance Policy Review',
      'Quoting',
      'Escalation Management',
      'Customer Service',
      'Complaint Resolution',
      'Team Supervision',
      'Claims Support',
      'Coverage Assistance',
      'Policyholder Communication',
      'Billing Dispute Resolution'
    ],
    
    tools: [
      'Insurance Carrier Systems',
      'Quoting Tools',
      'Microsoft Office',
      'CRM',
      'Web-Based Customer Support Tools'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Jimmy brings over 2 years of solid experience in handling Business-to-Business and Personal Lines insurance accounts, gained during his tenure at Cognizant Technology Solutions as a Senior Process Executive. He specialized in analyzing client insurance policies, assisting agents with quotations and billing, and resolving policyholder concerns with high service quality. With a strong background in customer support and process execution, Jimmy consistently ensures strategic, client-centered solutions. His previous roles have further sharpened his professionalism and leadership in high-volume service environments.',
    
    employmentHistory: [
      {
        company: 'COGNIZANT TECHNOLOGY SOLUTIONS',
        position: 'Senior Process Executive',
        period: 'FEB 6, 2023 - JAN 6, 2025',
        description: '• Handled insurance policy analysis, customer inquiries, agent support, and complaint resolution for personal insurance accounts with a focus on service quality.'
      },
      {
        company: 'TATA CONSULTANCY SERVICES',
        position: 'Senior Process Associate',
        period: 'MAR 2019 - FEB 6, 2023',
        description: '• Provided customer service by managing inquiries, complaints, account validations, and ensuring procedural compliance to enhance customer satisfaction.'
      },
      {
        company: 'WNS GLOBAL SERVICES',
        position: 'Senior Credit Associate',
        period: 'MAY 2014 - DEC 2016',
        description: '• Led outbound collections and account reconciliations, managed overdue debts, and ensured compliance with policies while mitigating high-risk accounts.'
      },
      {
        company: 'VCUSTOMER TECHMAHINDRA PHILS',
        position: 'Customer Service Representative',
        period: 'OCTOBER 2013',
        description: '• Delivered professional customer support for inquiries and complaints, escalating unresolved issues and contributing to team training efforts.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '7.4/9',
    englishDescription: 'Demonstrates clear and fluent communication with natural pronunciation and minimal pauses. Uses advanced vocabulary and complex grammar structures effectively to express nuanced ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={jimmyData} />
}
