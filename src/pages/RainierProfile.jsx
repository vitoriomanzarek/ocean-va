import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function RainierProfile() {
  const rainierData = {
    name: 'RAINIER',
    title: 'BILINGUAL VA | COMMERCIAL AND P&C INSURANCE SPECIALIST',
    image: '/images/VAs/Rainier.webp',
    summary: 'Rainier is an experienced Insurance Virtual Assistant with 7 years supporting U.S. brokers across personal and commercial lines. He has worked on quoting, submissions, renewals, endorsements, certificates, claims, and loss payee updates while liaising with underwriters and policyholders.',
    tagline: 'Rainier is a bilingual Virtual Assistant with broad insurance experience in personal and commercial P&C lines. Self-motivated and result-oriented, he is skilled in quoting, endorsements, certificates, and carrier portal servicing.',
    videoUrl: 'https://www.youtube.com/embed/Gl_Rijv44Ec',
    videoThumbnail: 'https://img.youtube.com/vi/Gl_Rijv44Ec/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Commercial lines, Bilingual support',
    
    skills: [
      'Loss Payee Updates',
      'Personal Lines - Auto, Home, Condo, Renters, Dwelling, Fire',
      'Quoting & Submissions',
      'Direct Broker & Underwriter Communication',
      'Policy Renewals & Cancellations',
      'Certificates of Insurance (COI)',
      'Claims Reporting & Processing',
      'Commercial Lines - BOPs, Workers\' Comp, Umbrella, E&O',
      'Endorsements'
    ],
    
    tools: [
      'AMS360',
      'Ezlynx',
      'QQ Catalyst',
      'Carrier Portals',
      'Microsoft Office',
      'Applied Epic'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Rainier possesses 7 years of experience in personal and commercial lines insurance, cultivated through his dedicated work as a Freelance Insurance VA and an Insurance VA Specialist. In these roles, he has consistently supported insurance brokers by creating submissions, quotes, bindings, and managing policy servicing including endorsements, cancellations, certificates, and audits. His comprehensive experience spans various policy types, from auto and home to commercial BOPs, workers\' compensation, and E&O, utilizing tools like AMS360, EZLynx, and Applied Epic. Insurance carriers he\'s worked with include Guard, Progressive, Travelers, Amtrust, Chubb, Hartford, Hanover, and Liberty Mutual.',
    
    employmentHistory: [
      {
        company: 'FREELANCE INSURANCE VA',
        position: 'Insurance Virtual Assistant',
        period: 'SEPT 2021 - MARCH 2025',
        description: '• Help insurance brokers in growing their business. Creating submissions, Quotes, Binding, and Policy Servicing like, endorsement, cancellations, certificate, recommendations and audits.'
      },
      {
        company: 'INSURANCE VA SPECIALIST',
        position: 'Insurance VA Specialist',
        period: 'DEC 2018 - SEPT 2021',
        description: '• Help insurance brokers in growing their business. Creating submissions, Quotes, Binding, and Policy Servicing like, endorsement, cancellations, certificate, recommendations and audits.'
      },
      {
        company: 'GAMING TECHNICIAN',
        position: 'Gaming Technician',
        period: 'MAY 2018 - NOV 2018',
        description: '• Inspects troubleshoots, and repairs electronic equipment in an arcade, gaming center, or another facility with video game equipment. In this role, you are required to test electronic and mechanical functions of games, replace broken or missing parts, and ensure the games are running smoothly.'
      },
      {
        company: 'SERVICE TECH./ CARPET INSTALLER',
        position: 'Service Technician / Carpet Installer',
        period: 'NOV 2017 - MAR 2018',
        description: '• Carried out day-day-day duties accurately and efficiently. Created plans and communicated deadlines to ensure projects were completed on time. Performed accurate measurements, cuts and trims to help flooring pieces fit specific room arrangements.'
      },
      {
        company: 'GAMING TECHNICIAN',
        position: 'Gaming Technician',
        period: 'DEC 2016 - SEPT 2017',
        description: '• Inspects troubleshoots, and repairs electronic equipment in an arcade, gaming center, or another facility with video game equipment. In this role, you are required to test electronic and mechanical functions of games, replace broken or missing parts, and ensure the games are running smoothly.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '80',
    englishDescription: 'Communicates fluently with clear pronunciation and only occasional pauses. Uses a good range of vocabulary and grammar to express ideas effectively, including some complex thoughts.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={rainierData} />
}
