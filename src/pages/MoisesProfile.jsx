import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MoisesProfile() {
  const moisesData = {
    name: 'MOISES',
    title: 'BILINGUAL ENGLISH-SPANISH SPEAKING VA',
    image: '/images/VAs/Moises.webp',
    summary: 'Moises is a bilingual insurance specialist with more than two years of experience focused on commercial trucking coverage. He\'s proficient in quoting policies, processing endorsements and claims, and handling filings, all while providing support to underwriting and billing teams. His knowledge includes a wide range of trucking-related coverages such as auto liability, motor truck cargo, and non-trucking liability.',
    tagline: 'Moises combines analytical skills with hands-on experience in commercial trucking insurance, ensuring compliance, precision, and timely service. His proactive mindset and mastery of tools like ConceptOne and CAB help drive accuracy and trust across every policy handled.',
    videoUrl: 'https://www.youtube.com/embed/tbz0iRIWaps',
    videoThumbnail: 'https://img.youtube.com/vi/tbz0iRIWaps/maxresdefault.jpg',
    thumbnail: 'Commercial trucking insurance, Policy processing, Bilingual support',
    
    skills: [
      'Endorsements',
      'Process Optimization',
      'Documentation Review',
      'Billing Tasks',
      'Policy Binding',
      'Legal Format Correction',
      'Data Entry',
      'Claims Support',
      'Vehicle Coverage Modifications',
      'MVR and CAB Report Analysis',
      'Policy Filing'
    ],
    
    tools: [
      'ConceptOne (C1)',
      'CAB',
      'Microsoft Office',
      'Microsoft Teams'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Moises has 2 years of Commercial Trucking Insurance experience from Across America Insurance Services, where he worked as a Department Administrator - Binds. He managed policy issuance, documentation review, and process optimization, achieving a 75-100% faster turnaround and a 50% boost in team productivity. Skilled in ConceptOne, Microsoft Office, and data management, he is detail-oriented and efficient.',
    
    employmentHistory: [
      {
        company: 'ACROSS AMERICA INSURANCE SERVICES',
        position: 'Department Administrator - Binds',
        period: 'Present',
        description: '• Managed the bind department, issuing policies, invoices, binders, and temporary policy numbers.\n• Reviewed and processed documentation for carriers, entering information into the ConceptOne system.\n• Collaborated closely with the Underwriting team to identify errors in legal documentation and update record formats.\n• Spearheaded improvements that resulted in a faster policy issuance process, reducing turnaround time by 75% - 100%.\n• Enhanced department administration by reorganizing workflows, leading to improved efficiency and reduced processing delays.\n• Improved team training programs, leading to a 50% increase in productivity and better alignment with company standards.\n• Identified and resolved discrepancies in documentation, resulting in a 50% reduction in errors and enhanced process optimization.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '80',
    englishDescription: 'Shows confidence and fluent communication with clear pronunciation. Uses a good range of vocabulary and grammar structures effectively to express ideas with clarity and coherence.',
    
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

  return <VAProfilePage vaData={moisesData} />
}
