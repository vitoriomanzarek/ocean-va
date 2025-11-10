import React from 'react'
import VAProfilePage from '../components/VAProfile/VAProfilePage'

const abigailData = {
  name: 'ABIGAIL FAITH',
  title: 'ENGLISH-SPEAKING VA',
  image: '/images/VAs/Abigail.webp',
  summary: 'Abigail Faith is a proactive and results-driven Executive Virtual Assistant with over 6 years of combined experience in customer service, virtual operations, and administrative support. She has supported U.S.-based teams in industries such as fitness, insurance, food delivery, and gaming. Consistently delivering exceptional service through clear communication, structured workflows, and efficient client management.',
  skills: [
    'Executive & Administrative Support',
    'Email & Calendar Management',
    'Process Improvement',
    'Client Onboarding',
    'Social Media Asset Creation',
    'SOP Documentation',
    'Lead Tracking',
    'Discovery Call Management'
  ],
  tagline: 'Abigail is a dependable virtual partner for business owners, coaches, and service providers seeking long-term support in client management, admin operations, and customer experience.',
  videoUrl: 'https://www.youtube.com/embed/z3hiwu0mPc8',
  videoThumbnail: 'https://img.youtube.com/vi/z3hiwu0mPc8/maxresdefault.jpg',
  
  tools: [
    'Salesforce',
    'Zoom Workspace',
    'Google Meet',
    'Google Workspace',
    'Asana',
    'Canva'
  ],
  
  equipment: [
    'Two-Monitor Setup',
    'Noise-Cancelling Headset'
  ],
  
  thumbnail: '3 years of insurance experience, Health insurance, Executive Assistant',
  
  employmentSummary: 'Abigail Faith has 3 years of combined experience in executive assistance and administrative support. Her journey began as a pioneer in the Business Process Outsourcing (BPO) industry. She provided high-level administrative support, managed scheduling and task coordination, handled email communications, conducted research, and managed various projects. She also has experience in customer service, addressing client inquiries, resolving issues, processing orders, and maintaining customer records. Her experience in various industries has provided her with a comprehensive understanding of client needs and expectations. She is a highly organized, detail-oriented, and proactive virtual assistant who excels in providing efficient and effective support to clients.',
  
  employmentHistory: [
    {
      company: 'OUTSOURCE PLUG',
      position: 'Executive Virtual Assistant',
      period: 'MAY 2023 - JUN 2025',
      description: 'Provided administrative and operational support to a fitness studio, handled lead tracking, scheduling, SOP documentation, and marketing content creation using tools like Canva.'
    },
    {
      company: 'TASKUS',
      position: 'Executive Virtual Assistant',
      period: 'FEB 2022 - MAR 2023',
      description: 'Managed client communication, email correspondence, scheduling, and Salesforce CRM operations while delivering personalized client support via Zoom and Google Meet.'
    },
    {
      company: 'TELETECH',
      position: 'Customer Care Representative (Seasonal Food Delivery Campaign)',
      period: 'AUG 2021 - JAN 2022',
      description: 'Handled virtual customer support for a food delivery service, resolving delivery issues and coordinating with partners to ensure smooth order fulfillment.'
    },
    {
      company: 'INFOSYS',
      position: 'Customer Care Representative (Insurance Account)',
      period: 'APR 2021 - AUG 2021',
      description: 'Assisted customers with insurance-related inquiries including policy coverage, renewals, and claims, while managing account updates and virtual support needs.'
    },
    {
      company: 'CONCENTRIX',
      position: 'Customer Care Representative (Gaming Account)',
      period: 'AUG 2017 - APR 2021',
      description: 'Managed high call volumes for a gaming account, resolved technical issues, and optimized reservation workflows in a fast-paced virtual environment.'
    }
  ],
  
  discResult: 'S',
  discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
  
  englishScore: '95',
  englishDescription: 'Communicates fluently and naturally with clear pronunciation and strong command of grammar. Uses a wide range of vocabulary and expressions to convey ideas accurately and confidently across various topics.',
  
  cefr: [
    { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
    { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
    { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
    { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
    { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
    { label: 'C2', active: false, description: 'Can interact with ease and can differentiate their shades of meaning.' }
  ],
  
  education: {
    school: 'PAMANTASAN NG LUNGSOD NG PASIG',
    degree: "BACHELOR'S DEGREE IN ELEMENTARY EDUCATION",
    date: '2011 - 2015'
  }
}

export default function AbigailProfile() {
  return <VAProfilePage vaData={abigailData} />
}
