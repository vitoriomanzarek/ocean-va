import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function IvanProfile() {
  const ivanData = {
    name: 'IVAN',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Ivan.webp',
    summary: 'Ivan is a Virtual Assistant with a strong foundation in medical interpretation and insurance documentation. He is known for his professionalism, loyalty, and eagerness to continually expand his skills to better serve clients.',
    tagline: 'Ivan is equipped to handle diverse administrative tasks for professionals who require multilingual, detail-focused support.',
    videoUrl: 'https://www.youtube.com/embed/dHojsDPmfHc',
    videoThumbnail: 'https://img.youtube.com/vi/dHojsDPmfHc/maxresdefault.jpg',
    thumbnail: 'Medical interpretation experience, Insurance documentation, Bilingual support',
    
    skills: [
      'Auto Insurance Support',
      'Declaration Page Review',
      'Inbound & Outbound Calls',
      'Client Issue Resolution',
      'Insurance Claims Follow-ups',
      'Data Entry & CRM',
      'Medical Interpretation',
      'Policy Review & Adjustments',
      'Calendar & Email Management',
      'Cancellations & Endorsements',
      'Underwriting & Documentation'
    ],
    
    tools: [
      'Google Suite',
      'Microsoft Office',
      'Zoom Workplace',
      'CRM',
      'MGA System',
      'Ring Central'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Ivan have 2 years of experience in both Auto and Health Insurance, gained at Peru Process Solutions. In this role, he managed policies documentation and engaged directly with brokers within the First Notice of Loss (Claims) and Underwriting Departments. Furthermore, he has extensive experience as a Medical Specialized Interpreter, working for several interpretation centers including Bilingual LS, Teleperformance, Elite LS, E-voque, and Interpretia. He demonstrates native-level proficiency in both Spanish and English, particularly in speaking and writing. His strong skills also encompass Microsoft Office proficiency, leadership, responsibility, loyalty, and multitasking. Ivan is consistently described as honest, always ready, and eager to learn.',
    
    employmentHistory: [
      {
        company: 'PERU PROCESS SOLUTIONS',
        position: 'Legal and Insurance Office',
        period: 'OCT 2023 - JAN 2024',
        description: 'First Notice of Loss Department (Claims)\n\nUnderwriting Department\nFEB 2024 - FEB 2025\n• In both claims department and underwriting, having direct contact with brokers, and in charge of policies documentation.'
      },
      {
        company: 'BILINGUAL LS, INTERPRETATION CENTER',
        position: 'Medical Specialized Interpreter',
        period: 'JAN 2023 - JUL 2023',
        description: ''
      },
      {
        company: 'TELEPERFORMANCE, INTERPRETATION CENTER',
        position: 'Medical Specialized Interpreter',
        period: 'JUN 2022 - JAN 2023',
        description: ''
      },
      {
        company: 'ELITE LS, INTERPRETATION CENTER',
        position: 'Medical Specialized Interpreter',
        period: 'NOV 2021 - JUN 2022',
        description: ''
      },
      {
        company: 'E-VOQUE, INTERPRETATION CENTER',
        position: 'Medical Specialized Interpreter',
        period: 'JUL 2021 - NOV 2021',
        description: ''
      },
      {
        company: 'INTERPRETIA, INTERPRETATION CENTER',
        position: 'English-Spanish Interpreter',
        period: 'MAY 2018 - DEC 2018',
        description: ''
      },
      {
        company: 'PERÚ MAILING, ADVERTISING COMPANY',
        position: 'Graphical Editor',
        period: 'JAN 2015 - MAR 2015',
        description: ''
      }
    ],
    
    discResult: 'C',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '100',
    englishDescription: 'Speaks fluently and clearly, using a wide range of vocabulary and natural expressions with ease. Pronunciation is smooth and intelligible, supported by strong command of grammar to convey complex ideas accurately.',
    
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

  return <VAProfilePage vaData={ivanData} />
}
