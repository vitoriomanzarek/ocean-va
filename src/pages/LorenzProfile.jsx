import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function LorenzProfile() {
  const lorenzData = {
    name: 'LORENZ',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Lorenz.webp',
    summary: 'Focused driven Virtual Assistant with a solid background in insurance processing and customer support. Lorenz has extensive experience assisting U.S.-based clients, particularly in home and auto insurance coverage. With a strong blend of communication, organizational skills, and attention to detail, he confidently manages tasks such as:',
    tagline: 'Lorenz brings a professional presence to any team, with a passion for delivering efficient insurance workflows and top-tier customer experiences.',
    videoUrl: 'https://www.youtube.com/embed/3if5VzuvLNc',
    videoThumbnail: 'https://img.youtube.com/vi/3if5VzuvLNc/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Customer service, Sales support',
    
    skills: [
      'Insurance Processing',
      'Endorsements & Reinstatements',
      'Collaboration with Underwriters',
      'Customer Service',
      'Inbound/Outbound Calls',
      'Email & Calendar Management',
      'Data Entry Support',
      'Renewals',
      'Cancellations',
      'Mortgage Clause Management',
      'Policy Change Verification'
    ],
    
    tools: [
      'CRMs',
      'Ezlynx',
      'Nationwide Portal',
      'Progressive Portal',
      'Microsoft Office',
      'Google Suite',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Lorenz has 2 years of experience in Home and Auto Insurance, gained while working as an Insurance Virtual Assistant at The Woodlands Financial Group. During this time, he handled policy processing, developed endorsements directly through carrier websites, and took charge of renewal, cancellation, and reinstatement communications. Prior to that, he worked as a Health Insurance CSR at Versatel Solutions, where he qualified leads and assisted in converting them to sales. He also spent over two years as a Sales Associate at Fonerange Communication Inc., managing inventory, advertising, and achieving monthly sales targets. Lorenz is highly skilled in customer service, policy processing, email management, and lead qualification. His strengths include attention to detail, adaptability, and strong communication skills.',
    
    employmentHistory: [
      {
        company: 'THE WOODLANDS FINANCIAL GROUP',
        position: 'Insurance Virtual Assistant',
        period: 'JAN 2023 - DEC 2024',
        description: '• Able to process the policy of insured for home and auto insurance.\n• Sending email reminder for renewals, cancellation and reinstatement notice.\n• Able to process trailing documents for new business.\n• Able to process endorsement directly to carrier website.'
      },
      {
        company: 'VERSATEL SOLUTIONS',
        position: 'Health Insurance - CSR',
        period: 'MAY - AUG 2022',
        description: '• We manage to explain our products and services to our client and must shown interest on what we are selling in order to qualify as leads.\n• Transfer a qualify leads to our licensed agent for them to convert and consider as qualified sales.'
      },
      {
        company: 'FONERANGE COMMUNICATION INC.',
        position: 'Sales Associate',
        period: 'APR 2020 - JUN 2022',
        description: '• Able to manage our product inventory.\n• Product marketing advertisement.\n• Able to manage our monthly target quota.\n• Provide a better sales marketing and must shown interest to our product and services'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '6.9',
    englishDescription: 'Speaks clearly with good fluency and pronunciation. Shows comfort with complex ideas and grammar, using vocabulary effectively to convey meaning.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'La Consolacion University Philippines / Centro Escolar University',
      degree: 'Bachelor in Tourism Management / Bachelor in Hotel Management',
      date: '2016 - 2019 / 2008 - 2012'
    }
  }

  return <VAProfilePage vaData={lorenzData} />
}
