import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MariaPaulaProfile() {
  const mariaPaulaData = {
    name: 'MARIA PAULA',
    title: 'ENGLISH-SPANISH BILINGUAL VA | MEDICAL ASSISTANT',
    image: '/images/VAs/Maria Paula.webp',
    summary: 'Maria Paula is a bilingual professional with over three years of experience supporting medical offices and healthcare professionals. Her background includes managing patient information, coordinating appointments, updating medical records, and ensuring billing accuracy and HIPAA compliance. With strong organizational skills, Maria Paula brings a service-oriented approach that blends administrative efficiency with cultural and linguistic proficiency.',
    tagline: 'Maria Paula combines healthcare administration expertise with professional bilingual communication, offering dependable and empathetic support to patients, providers, and clients alike.',
    videoUrl: 'https://www.youtube.com/embed/yxgaoJEpdGg',
    videoThumbnail: 'https://img.youtube.com/vi/yxgaoJEpdGg/maxresdefault.jpg',
    thumbnail: 'Medical administration experience, Bilingual interpretation, Healthcare support',
    
    skills: [
      'Bilingual Interpretation',
      'Customer Care',
      'Data Entry',
      'Administrative Assistance',
      'Patient Coordination',
      'HIPAA Compliance',
      'Appointment Scheduling',
      'Record Management',
      'Medical Office Support',
      'Billing / Documentation Accuracy',
      'Client Communication'
    ],
    
    tools: [
      'Zoom Workplace',
      'Google Workspace',
      'Microsoft Office',
      'Microsoft Teams',
      'Trello',
      'Slack'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Maria Paula has 3 years of Medical Administrative Office experience gained as a Medical Interpreter at VRI Millennials Virtual Services and OPI Language Service Associates. She managed patient data, scheduled appointments, and interpreted medical interviews for insurance and healthcare cases. Previously, she worked as a Bilingual Agent at Teleperformance S.A.S. and a Freelance Business Advisor at Profin Colombia S.A.S. She holds a degree in Economics with an emphasis in International Business. Her key strengths include project management, data analysis, translation, interpretation, and communication.',
    
    employmentHistory: [
      {
        company: 'OPI LANGUAGE SERVICE ASSOCIATES',
        position: 'Medical Interpreter',
        period: 'DECEMBER 2024 - 2025',
        description: '• Bilingual remote interpreting with medical emphasis, also bilingual interpreting during preliminary hearings, arraignments, depositions and meetings between attorneys and clients, vehicle insurance, life insurance, medical and dental insurance and worker\'s compensation.'
      },
      {
        company: 'VRI MILLENNIALS VIRTUAL SERVICES',
        position: 'Medical Interpreter',
        period: 'NOVEMBER 2022 - DECEMBER 2024',
        description: '• Simultaneous interpretation between patients and health care providers, appointment scheduling for patients who have been on the waiting lists, and interpretation of medical interviews, and provide information about medical procedures and instructions to limited English proficiency patients.'
      },
      {
        company: 'TELEPERFORMANCE S.A.S.',
        position: 'Bilingual Agent',
        period: 'MARCH 2021 - SEPTEMBER 2022',
        description: '• Customer service to more than 60 people daily, problem solving, answering questions, product returns. Problem solving range to a 95%.'
      },
      {
        company: 'PROFIN COLOMBIA S.A.S.',
        position: 'Freelance Business Advisor',
        period: 'JUNE 2018 - APRIL 2019',
        description: '• Cold calling and data management. Use of office tools for results displaying, business and legal advising, quotations, business closing and after-sales services.'
      }
    ],
    
    discResult: 'I+S',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '7.3/9',
    englishDescription: 'Demonstrates clear and confident communication with natural pronunciation and smooth fluency. Uses a wide range of vocabulary and complex grammar accurately to express detailed and well-structured ideas.',
    
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
      degree: 'Degree in Economics with an emphasis in International Business',
      date: ''
    }
  }

  return <VAProfilePage vaData={mariaPaulaData} />
}
