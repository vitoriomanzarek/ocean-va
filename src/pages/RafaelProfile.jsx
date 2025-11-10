import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function RafaelProfile() {
  const rafaelData = {
    name: 'RAFAEL',
    title: 'ENGLISH SPEAKING VA | INSURANCE',
    image: '/images/VAs/Rafael.webp',
    summary: 'Rafael is a versatile Virtual Assistant with six years of experience in the insurance industry, primarily in personal lines. He has handled policy enrollments, terminations, renewals, mortgage changes, data entry, and inbound/outbound calls with professionalism and precision. Proficient in trading platforms and CRM systems, Rafael brings reliability, attention to detail, and a calm demeanor to every task.',
    tagline: 'Rafael finds joy in assisting colleagues and clients, delivering quality results under pressure. His experience across multiple insurance sectors and CRM platforms allows him to adapt quickly and contribute to smooth operations and client satisfaction.',
    videoUrl: 'https://www.youtube.com/embed/S19B0sRiohI',
    videoThumbnail: 'https://img.youtube.com/vi/S19B0sRiohI/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Personal lines, CRM proficiency',
    
    skills: [
      'Personal Health Insurance Support',
      'Renewals & Cancellations',
      'Email & Schedule Management',
      'General Office Support',
      'Insurance Verification & Authorization',
      'Data Entry & Management',
      'Policy Enrollments & Terminations',
      'Quote Preparation & Price Quotation',
      'Administrative Support'
    ],
    
    tools: [
      'Hawksoft',
      'Ezlynx',
      'Q Catalyst',
      'PL Plater',
      'AgencyBloc',
      'AgencyZoom'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Rafael gained over 6 years of insurance experience through multiple roles as an Insurance Virtual Assistant, supporting U.S.-based agencies such as Health Wealth Advocates, Affinity Insurance Group, and Strachan Novak Insurance Services. Across these roles, he handled policy enrollments, terminations, renewals, audits, insurance verification, client communication, and administrative support across Auto, Home, Health, Medicare, and Personal Lines Insurance, demonstrating a strong foundation in end-to-end insurance service operations.',
    
    employmentHistory: [
      {
        company: 'STRACHAN NOVAK INSURANCE SERVICES',
        position: 'Insurance Virtual Assistant',
        period: 'JUNE 2024 - APRIL 2025',
        description: '• Most recent and comprehensive role, where he managed insurance verification, authorizations, and client relationship tasks across personal lines.'
      },
      {
        company: 'OFFICE BEACON PHILIPPINES, INC.',
        position: 'Insurance Virtual Assistant',
        period: 'JAN 2023 - APR 2024',
        description: '• Provided general support for insurance operations including verification, authorization, and email management.'
      },
      {
        company: 'CORNERSTONE INSURANCE GROUP',
        position: 'Insurance Virtual Assistant',
        period: 'SEPT 2023 - JAN 2024',
        description: '• Focused on Healthcare/Medicare insurance support tasks like patient follow-ups, prescription refills, and scheduling.'
      },
      {
        company: 'AFFINITY INSURANCE GROUP',
        position: 'Insurance Virtual Assistant',
        period: 'JUL 2023 - SEPT 2023',
        description: '• Supported Auto and Home Insurance processes such as quotes, cancellations, renewals, and data entry.'
      },
      {
        company: 'HEALTH WEALTH ADVOCATES',
        position: 'Insurance Virtual Assistant',
        period: 'MAR 2023 - JUN 2023',
        description: '• Worked on Health Insurance policy terminations, enrollments, data entry, and quoting.'
      },
      {
        company: 'BOOMERING, INC.',
        position: 'Insurance Virtual Assistant',
        period: 'OCT 2021 - SEPT 2022',
        description: '• Supported Farmers Insurance clients in Personal Auto and Home Lines, offering policy options and assisting clients through the insurance process.'
      }
    ],
    
    discResult: 'C+S',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nSteadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '6.8/9',
    englishDescription: 'Speaks clearly with generally good fluency and pronunciation, making communication easy to follow. Uses a solid range of vocabulary and grammar to express ideas, with occasional pauses that affect clarity.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Holy Angel University',
      degree: 'Bachelor of Science in Psychology',
      date: '2019 - 2022'
    }
  }

  return <VAProfilePage vaData={rafaelData} />
}
