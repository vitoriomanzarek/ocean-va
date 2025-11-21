import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function AlbertProfile() {
  const albertData = {
    name: 'ALBERT JOHN D. CARPIO',
    title: 'ENGLISH-SPEAKING VA | INSURANCE SPECIALIST',
    image: '/images/VAs/Albert.webp',
    summary: 'Albert has three years of experience supporting U.S. insurance agencies in both personal and commercial lines. His work covers quoting, renewals, endorsements, COIs, and servicing for home, auto, condo, renters, mobile homes, farm, dwelling fire, general liability, commercial auto, trucking, inland marine, and commercial package. He is highly proficient in EZLynx and Applied Epic. His experience also includes manual quoting, ACORD 125/126 preparation, and direct-to-underwriter submissions through Tarmica.',
    tagline: 'Albert is an excellent option for agencies seeking a highly trained VA who can independently manage personal and commercial insurance workflows, support licensed agents, and deliver high-quality quoting and policy servicing with consistency and accuracy.',
    videoUrl: 'https://www.youtube.com/embed/4sfqBgJ6h3w',
    videoThumbnail: 'https://img.youtube.com/vi/4sfqBgJ6h3w/maxresdefault.jpg',
    thumbnail: '3 YEARS INSURANCE EXPERIENCE • PERSONAL & COMMERCIAL LINES • EZLYNX & APPLIED EPIC EXPERT • OHIO & PENNSYLVANIA INSURANCE',
    
    skills: [
      'Personal Lines',
      'Commercial Lines',
      'Quotations',
      'Remarketing',
      'Renewals',
      'Endorsements',
      'Policy Servicing',
      'COI Generation',
      'ACORD Forms (125/126)',
      'General Liability',
      'Commercial Auto',
      'Trucking'
    ],
    
    tools: [
      'EZLynx',
      'Applied Epic',
      'Tarmica',
      'RingCentral',
      'Carrier Websites',
      'MS Suite',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Albert has three years of Personal and Commercial Lines insurance experience, gained through his work as an Admin/Executive Virtual Assistant at Holden Insurance Agency, where he supported licensed agents by preparing accurate quotes across multiple lines, including auto, workers compensation, general liability, commercial property, and more. He also brings a strong technical background from his prior role as a Technical Representative at Transcom, where he handled advanced troubleshooting and escalated cases. His strengths include exceptional attention to detail, accuracy in documentation, and the ability to quickly learn and adapt to carrier guidelines. He is highly skilled in coordinating with teams, managing deadlines, and ensuring competitive, timely proposals. Albert also demonstrates strong analytical thinking, communication skills, and proficiency in supporting operational workflows. Overall, he combines technical expertise with solid insurance knowledge to deliver reliable and efficient administrative support.',
    
    employmentHistory: [
      {
        company: 'HOLDEN INSURANCE AGENCY (Freelance)',
        position: 'Admin Assistant / Executive Virtual Assistant',
        period: 'AUG 2022 - SEPT 2025',
        description: '• Supported insurance operations by preparing accurate Personal and Commercial Lines quotes (auto, Workers Comp, General Liability, Commercial Property, Inland Marine, Commercial Auto, home, rental, RVs) for licensed agents.\n• Ensured timely, competitive proposals while adhering to carrier guidelines.'
      },
      {
        company: 'TRANSCOM',
        position: 'Technical Representative',
        period: 'MAR 2019 - JUN 2022',
        description: '• Provided advanced troubleshooting and support for complex technical issues.\n• Handled escalated cases, coordinated with internal teams and vendors, and ensured timely resolution and follow-up.'
      }
    ],
    
    discResult: 'C+S',
    discResultDescription: 'Conscientiousness (C) & Steadiness (S) - Detail-oriented and analytical with strong follow-through, combined with dependability and patience. Albert balances accuracy with reliability, ensuring consistent quality in all insurance workflows.',
    
    englishScore: '7/9',
    englishDescription: 'Speaks clearly and fluently with good pronunciation, showing strong control of vocabulary and grammar. Communicates ideas confidently and uses a range of expressions effectively.',
    
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

  return <VAProfilePage vaData={albertData} />
}
