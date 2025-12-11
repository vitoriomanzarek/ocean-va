import React from 'react'
import VAProfilePage from '../components/VAProfile/VAProfilePage'

const gabrielaData = {
  name: 'GABRIELA RODRIGUEZ',
  title: 'BILINGUAL VA | PERSONAL LINES INSURANCE SUPPORT',
  image: '/images/VAs/GabrielaRodriguez.webp',
  summary: 'Gabriela is an insurance professional with 3 years of U.S. personal-lines experience, specializing in renewals, quoting, endorsements, billing support, and client communication. She has handled full-cycle servicing for auto and home policies, including P&C coverage explanations, premium reviews, re-marketing, policy changes, cancellations, and carrier follow-ups. Gabriela also supports underwriting tasks by gathering documentation, verifying risk details, updating systems, and assisting with new business processing under a licensed agent.',
  skills: [
    'Renewals Management',
    'Quoting Support',
    'Carrier Shopping',
    'Policy Changes',
    'Endorsement Processing',
    'Billing Support',
    'Mortgage Follow-up',
    'Document Handling',
    'Underwriter Support',
    'Customer Communication',
    'Payment Tracking',
    'COI Generation'
  ],
  tagline: 'Gabriela brings a strong service mindset, exceptional attention to detail, and extensive experience supporting U.S. agencies with high-volume personal lines operations. She is an excellent option for teams needing a reliable, client-focused insurance VA.',
  videoUrl: '', // To be added when available
  videoThumbnail: '', // To be added when available
  
  tools: [
    'Applied Epic',
    'AMS360',
    'PL Rater',
    'EasyLinks',
    'Hawksoft',
    'Hubsoft',
    'UMA',
    'OpenPhone',
    'Google Voice',
    'Skype'
  ],
  
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  
  thumbnail: '3 years of Insurance Experience, Personal Lines, Home and Auto Insurance',
  
  employmentSummary: 'Gabriela Rodriguez has 3 years of specialized experience in U.S. personal lines insurance, focusing on auto and home policies. She has extensive experience in renewals management, quoting support, carrier shopping, and full-cycle policy servicing. Gabriela excels in client communication, billing support, and underwriting assistance, making her an ideal choice for insurance agencies seeking a reliable bilingual virtual assistant.',
  
  employmentHistory: [
    {
      company: 'INSURANCE AGENCY SUPPORT',
      position: 'Personal Lines Insurance Specialist',
      period: '2021 - PRESENT',
      description: 'Handled full-cycle servicing for auto and home policies including renewals, quoting, endorsements, billing support, and client communication. Supported underwriting tasks by gathering documentation, verifying risk details, and assisting with new business processing under licensed agents.'
    }
  ],
  
  discResult: '', // To be determined
  discResultDescription: '', // To be determined
  
  englishScore: '95',
  englishDescription: 'Advanced English level. Communicates fluently and naturally with clear pronunciation and strong command of grammar. Uses a wide range of vocabulary and expressions to convey ideas accurately and confidently across various topics.',
  
  cefr: [
    { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
    { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
    { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
    { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
    { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
    { label: 'C2', active: false, description: 'Can interact with ease and can differentiate their shades of meaning.' }
  ],
  
  education: {
    school: '', // To be added
    degree: '', // To be added
    date: '' // To be added
  }
}

export default function GabrielaRodriguezProfile() {
  return <VAProfilePage vaData={gabrielaData} />
}

