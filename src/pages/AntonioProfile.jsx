import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function AntonioProfile() {
  const antonioData = {
    name: 'ANTONIO',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Antonio.webp',
    summary: 'Dedicated and highly organized Virtual Assistant with strong experience in the insurance industry, client communication, and back-office operations. He has supported North American insurance agencies, demonstrated excellent knowledge of corridor systems, CRM tools, and quoting platforms.',
    tagline: 'Antonio brings vast insurance expertise, responsiveness, and a service-oriented mindset. With a strong commitment to quality and timeliness, he\'s the ideal VA for insurance brokers and business owners seeking dependable virtual support.',
    videoUrl: 'https://www.youtube.com/embed/3b3R9YoLumE?t=2s',
    videoThumbnail: 'https://img.youtube.com/vi/3b3R9YoLumE/maxresdefault.jpg',
    thumbnail: 'Auto and home insurance expertise, Policy servicing, Bilingual support',
    
    skills: [
      'Customer Service',
      'Claims Entry',
      'Policy Quoting',
      'Mortgage Updates',
      'Billing Assistance',
      'Email & Calendar Management',
      'Policy Changes',
      'Manual Renewals',
      'Cancellation Reporting',
      'Personal Lines Insurance',
      'COI Generation',
      'Cancellations',
      'CRM & Database Updates'
    ],
    
    tools: [
      'PL Rater',
      'Ezlynx',
      'Carrier Portals',
      'Google Workspace',
      'Microsoft Office',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Antonio has 3 years of hands-on experience in Auto and Home Insurance gained through his roles at Towe Insurance Service-Virginia and Billiyard Insurance Group-Canada. At Towe, he managed policy servicing tasks including quotes, endorsements, renewals, and billing inquiries using tools like PL Rater, Partner XE, and Ezylynx. At Billiyard, he reviewed, corrected, and issued auto/home policies using Applied Rating Services across multiple carriers. His experience reflects strong technical skills and deep knowledge of insurance workflows across U.S. and Canadian markets.',
    
    employmentHistory: [
      {
        company: 'TOWE INSURANCE SERVICE - VIRGINIA',
        position: 'Virtual Assistant',
        period: 'SEPT 2022 - APR 2025',
        description: '• Handled full-cycle policy servicing for auto and home insurance including quoting, endorsements, billing inquiries, mortgage changes, and CRM updates using PL Rater, Partner XE, and Ezylynx.'
      },
      {
        company: 'BILLIYARD INSURANCE GROUP- CANADA',
        position: 'Underwriter',
        period: 'NOV 2023 - MAR 2025',
        description: '• Reviewed and issued auto and home insurance policies by validating producer-submitted quotes and correcting errors via Applied Rating Services across multiple carrier portals.'
      },
      {
        company: 'SITEL PHILIPPINES - INBOUND SALES',
        position: 'Customer Service Representative',
        period: 'JAN 2021 - AUG 2022',
        description: '• Delivered empathetic and efficient customer support, consistently ranked among top agents, and served as Subject Matter Expert (SME) for four months.'
      },
      {
        company: 'STA. CRUZ NATIONAL HIGH SCHOOL',
        position: 'Public High School Teacher',
        period: 'JUN 2019 - OCT 2020',
        description: '• Facilitated classroom instruction and holistic student development by integrating values and managing daily academic activities.'
      },
      {
        company: 'EARL\'S CARWASH',
        position: 'Cashier',
        period: '2017 - 2018',
        description: '• Audited daily revenue, assisted customers, and addressed inquiries professionally to ensure a smooth customer experience.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '75',
    englishDescription: 'Communicates clearly on familiar topics with good control of basic grammar and vocabulary. Pronunciation is clear, and speech flows naturally with occasional pauses. Confident in expressing ideas in everyday conversations.',
    
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

  return <VAProfilePage vaData={antonioData} />
}
