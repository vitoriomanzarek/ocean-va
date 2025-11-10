import React from 'react'
import VAProfilePage from '../components/VAProfile/VAProfilePage'

const adrianData = {
  name: 'ADRIAN',
  title: 'VIRTUAL ASSISTANT | INSURANCE SUPPORT SPECIALIST',
  image: '/images/VAs/Adrian.webp',
  summary: 'Adrian is a highly adaptable Virtual Assistant with extensive experience in insurance operations, client communication, and bilingual interpretation. With a strong background in project management and customer service, Adrian has supported U.S.-based insurance firms, helping streamline operations and manage offices in Mexico for both client and internal operations.',
  skills: [
    'High-Volume Inbound Calls',
    'Insurance Quoting',
    'Appointment Settings',
    'Project Management',
    'Insurance Customer Service & Sales',
    'Document Translation',
    'Client Relationship Management',
    'Medical & General Interpretation',
    'Policy Changes',
    'Cross-Selling',
    'Training & Team Supervision'
  ],
  tagline: 'Adrian is an ideal Virtual Assistant for insurance agencies, healthcare providers, and service-based businesses seeking a bilingual professional with proven experience in administrative support.',
  videoUrl: 'https://www.youtube.com/embed/k5OatPLSORw',
  videoThumbnail: 'https://img.youtube.com/vi/k5OatPLSORw/maxresdefault.jpg',
  
  tools: [
    'CRM Systems',
    'Insurance Carrier Platforms',
    'Microsoft Office',
    'Google Workspace',
    'Telephony & Call Handling Systems',
    'EzyLinx'
  ],
  
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  
  thumbnail: 'Extensive insurance operations experience, Bilingual support, Project management',
  
  employmentSummary: 'Adrian gained 2 years of experience in Auto, Home, and Life Insurance while working at Atlas Insurance Services. In this role, he was responsible for opening and managing customer service and sales offices in Mexico, supporting over 40 insurance companies in Texas. He led operations for both customer service and commercial insurance sales, including staff recruitment, training, and the implementation of systems used for selling insurance products across Auto, Home, and Life lines.',
  
  employmentHistory: [
    {
      company: 'AMN HEALTHCARE',
      position: 'Virtual Medical Interpreter',
      period: 'OCT 2023 - AUG 2024',
      description: 'Provided accurate real-time medical interpretation for healthcare providers and patients in clinical settings.'
    },
    {
      company: 'KELLY SERVICES / LANGUAGE LINE SOLUTIONS',
      position: 'Medical Interpreter',
      period: 'JAN 2023 - JUN 2023',
      description: 'Served as a medical interpreter for sensitive healthcare-related calls, ensuring accurate and confidential communication between patients and providers.'
    },
    {
      company: 'WELCOME WAGON',
      position: 'Appointment Setter',
      period: 'AUG 2022 - DEC 2022',
      description: 'Worked as an appointment setter, using CRM tools and research to generate leads and book meetings for marketing and advertising services.'
    },
    {
      company: 'ATLAS INSURANCE SERVICES',
      position: 'Project Manager',
      period: 'AUG 2021 - AUG 2022',
      description: 'Led the setup and operations of customer service and commercial insurance sales offices, supporting Auto, Home, and Life insurance processes for over 40 companies in Texas.'
    },
    {
      company: 'SUMMER SCAPE',
      position: 'Sales',
      period: '2021',
      description: 'Sold vacation packages for major resort destinations and later managed sales closings, staff training, and call monitoring.'
    },
    {
      company: 'AHMSA',
      position: 'Translator',
      period: '2014 - 2018',
      description: 'Translated technical documents and interpreted training sessions for engineers in Latin America\'s largest steel company.'
    },
    {
      company: 'INSTITUTO DE IDIOMAS PLATINO',
      position: 'Public School Teacher',
      period: 'ONGOING',
      description: 'Taught English to students ranging from middle school to professionals, following structured curriculum.'
    },
    {
      company: 'TELEPERFORMANCE - WESTERN UNION',
      position: 'Agent Support',
      period: '2014 - 2015',
      description: 'Handled U.S.-based customer inquiries and agent support tasks, including error resolution and materials management.'
    }
  ],
  
  discResult: 'C+S',
  discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized, C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nSteadiness (S) - Dependable and patient, S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
  
  englishScore: '85',
  englishDescription: 'Shows strong fluency and clear pronunciation, making speech easy to understand. Uses a wide range of vocabulary and grammar with confidence to express complex ideas effectively.',
  
  cefr: [
    { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
    { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
    { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
    { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
    { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
    { label: 'C2', active: false, description: 'Can interact with ease and can differentiate their shades of meaning.' }
  ],
  
  education: {
    school: 'NORMAL SCHOOL OF HIGHER STUDIES CAMPUS SALTILLO',
    degree: 'SPECIALIZING IN THE ENGLISH LANGUAGE',
    date: ''
  }
}

export default function AdrianProfile() {
  return <VAProfilePage vaData={adrianData} />
}
