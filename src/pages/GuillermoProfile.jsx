import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function GuillermoProfile() {
  const guillermoData = {
    name: 'GUILLERMO',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Guillermo.webp',
    summary: 'Virtual Assistant with a strong background in customer service, insurance policy management, and quality assurance. Guillermo brings over 5 years of experience in U.S. Property and Casualty insurance markets. His detail-oriented approach and adaptability make him a reliable partner for insurance providers and customer-centric businesses.',
    tagline: 'Guillermo is well-equipped to support insurance agencies, call centers, and administrative teams with bilingual virtual support rooted in empathy, precision, and professionalism.',
    videoUrl: 'https://www.youtube.com/embed/sLtVFyK2b7s',
    videoThumbnail: 'https://img.youtube.com/vi/sLtVFyK2b7s/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Bilingual support, Quality assurance',
    
    skills: [
      'Customer Service',
      'Policy Quoting',
      'FNOl (First Notice of Loss) Processing',
      'Claims Follow-up',
      'Email & Calendar Management',
      'Policy Changes',
      'Customer Retention & Upselling',
      'Personal Lines Insurance',
      'Billing & Extensions',
      'Quality Assurance',
      'Document Handling'
    ],
    
    tools: [
      'Insurance Carrier Portals',
      'Call Center Quality',
      'Monitoring Systems',
      'CRM Platforms',
      'Microsoft Office',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Guillermo has extensive experience in insurance policy management, quality assurance, and customer service. He worked as a Senior Insurance Policy Management Group at Automobile Club of Southern California (AAA), managing Property and Casualty insurance policies and handling claims. He served as a Quality Assurance Analyst at Centris, Aguascalientes, Mexico, managing teams and implementing strategies to improve call center metrics. He worked as a Bilingual Call Center Agent at Centris, Aguascalientes, Mexico, providing customer service for various insurance companies. He also worked as a Bilingual Tech Support Agent at Teleperformance, Aguascalientes, Mexico. His strengths include strong customer service skills, attention to detail, bilingual communication, quality assurance expertise, and insurance knowledge.',
    
    employmentHistory: [
      {
        company: 'AUTOMOBILE CLUB OF SOUTHERN CALIFORNIA (AAA)',
        position: 'Senior Insurance Policy Management Group',
        period: 'DEC 2022 - JAN 2025',
        description: '• Managed existing Property and casualty insurance policies including Auto, Home, Umbrella, Watercraft, Classic Car and Earthquake for Collisions and Comprehensive working with underwriting to ensure they follow guidelines\n• Answer inbound calls from customers answering questions about coverage, making amendments to their policy and manage and resolve billing including extensions and payments\n• FNOL agent filing new claims and answering questions about existing claims while setting up communication with their adjuster for all Insurance policies mentioned before\n• Create leads offering other services to single product customers which were warm transferred to our sales dept.'
      },
      {
        company: 'CENTRIS, AGUASCALIENTES, MEXICO',
        position: 'Quality Assurance Analyst',
        period: 'FEB 2020 - AUG 2022',
        description: '• Promoted to manage team of agents (whose duties are listed in my last position below) providing feedback after listening to and grading recorded interactions with customers, while still completing certain hours of phone time taking calls listed in my last position\n• Implemented new strategies to our scripts and process to help better call center metrics and customer experience.\n• Presented recorded calls of our agents with our near-shore clients to strategize a better call flow to improve first call resolution.\n• Produced reports of our agent\'s metrics which were presented to our clients on a weekly basis.'
      },
      {
        company: 'CENTRIS, AGUASCALIENTES, MEXICO',
        position: 'Bilingual Call Center Agent',
        period: 'JUL 2018 - FEB 2020',
        description: '• Claim FNOL agent for various Property and casualty homeowners insurance companies (Narragansett bay insurance company, Heritage insurance, Saint John\'s Insurance company and New London County mutual insurance company) as well as for 2 Auto insurance companies (Assurance America and Insuremex)\n• Customer service representative for SafeAuto Property and casualty insurance company providing customer service for Auto Property and casualty insurance claims including endorsements for existing policies, receiving policy payments and sending and receiving documents from customers.\n• Live interpreter for Auto insurance claims adjusters from Aspen MGA\n• Customer service representative for Networkib which provided long distance calling for various prepaid distributors and mobile operators.'
      },
      {
        company: 'TELEPERFORMANCE, AGUASCALIENTES, MEXICO',
        position: 'Bilingual Tech Support Agent',
        period: 'JUL 2018 - FEB 2020',
        description: '• Claim FNOL agent for various Property and casualty homeowners insurance companies (Narragansett bay insurance company, Heritage insurance, Saint John\'s Insurance company and New London County mutual insurance company) as well as for 2 Auto insurance companies (Assurance America and Insuremex)\n• Customer service representative for SafeAuto Property and casualty insurance company providing customer service for Auto Property and casualty insurance claims including endorsements for existing policies, receiving policy payments and sending and receiving documents from customers.\n• Live interpreter for Auto insurance claims adjusters from Aspen MGA\n• Customer service representative for Networkib which provided long distance calling for various prepaid distributors and mobile operators.'
      }
    ],
    
    discResult: 'C+D',
    discResultDescription: 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.\n\nDominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
    
    englishScore: '95',
    englishDescription: 'Communicates fluently and naturally with clear pronunciation and strong command of grammar. Uses a wide range of vocabulary and expressions to convey ideas accurately and confidently across various topics.',
    
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

  return <VAProfilePage vaData={guillermoData} />
}
