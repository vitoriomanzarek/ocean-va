import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function PavelProfile() {
  const pavelData = {
    name: 'PAVEL',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Pavel.webp',
    summary: 'Bilingual Virtual Assistant with a strong foundation in customer service, insurance operations, and creative marketing. He brings 6+ years of experience in graphic design, SEO, content creation, and digital campaign management across multiple industries. He can successfully manage:',
    tagline: 'He\'s well prepared to help your business thrive from day one! Click here to learn more about him.',
    videoUrl: 'https://www.youtube.com/embed/_reMSeE_gyY',
    videoThumbnail: 'https://img.youtube.com/vi/_reMSeE_gyY/maxresdefault.jpg',
    thumbnail: 'Marketing expertise, Content creation, Bilingual support',
    
    skills: [
      'Email & Calendar',
      'Event Organization & Coordination',
      'Copywriting',
      'Audiovisual Content Production',
      'Inbound & Outbound Calls',
      'Graphic Design',
      'Social Media Campaign Management',
      'UX/UI Web Design',
      'Video Editing',
      'Data Entry & CRM Updates',
      'Branding',
      'SEO & AEO',
      'Landing Page Creation',
      'E-Commerce Optimization'
    ],
    
    tools: [
      'Adobe CC',
      'AgencyZoom',
      'Canva',
      'Ezlynx',
      'MS Office',
      'Zoom Workplace',
      'Google Workspace'
    ],
    
    equipment: [
      'One-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Pavel is a marketing professional with 6 years of experience across marketing, sales, and customer service, gained at Java Planet Coffee Roasters, Sandunga, and Propositive Agency. At Java Planet, he supported storytelling-led campaigns, revamped the e-commerce site (UX/UI), and executed on-page/technical SEO while managing multi-platform brand presence. At Sandunga, he led digital strategy for events and a medical business, delivering SEO/AEO, accessible and compliant websites, and high-performing social campaigns, videos, and landing pages. At Propositive, he produced end-to-end video content for restaurants, e-commerce brands, and small businesses, iterating from analytics and audience insights. His strengths include content strategy, copywriting, SEO/AEO, UX/UI and web design, e-commerce integration, data-driven optimization, and full-cycle audiovisual production.',
    
    employmentHistory: [
      {
        company: 'JAVA PLANET COFFEE ROASTERS',
        position: 'Content Creator & Marketing Strategist Assistant',
        period: '2024 - 2025',
        description: '• Developed storytelling-driven marketing campaigns to highlight sustainable coffee practices\n• Redesigned and managed the online store, improving UX/UI and integrating e-commerce solutions.\n• Implemented on-page and technical SEO strategies to boost organic traffic to the website and blog.\n• Wrote optimized copy and managed the brand\'s presence across search engines and social platforms.\n• Produced high-quality audiovisual content that increased engagement and conversions on social media.'
      },
      {
        company: 'SANDUNGA',
        position: 'Content Creator & Marketing Strategist',
        period: '2022 - 2025',
        description: '• Designed visual content and digital campaigns for concerts and cultural events featuring national and international artists.\n• Created social media campaigns, promotional videos, and branding materials to increase event attendance and online engagement.\n• Led the digital marketing strategy for medical business, including SEO and AEO (Answer Engine Optimization) to improve online discoverability.\n• Built and optimized professional websites, implementing accessibility standards, legal compliance, and user-friendly design.\n• Produced blog posts, landing pages, and audiovisual content for social media and patient outreach.\n• Developed a tiered digital service model for professionals, combining content creation, SEO, and web design solutions.'
      },
      {
        company: 'PROPOSITIVE AGENCY',
        position: 'Audiovisual Content Creator',
        period: '2020 - 2022',
        description: '• Produced tailored content for restaurants, e-commerce brands, and small businesses.\n• Managed full cycle video production including scripting, shooting, editing, and post-production.\n• Enhanced content performance based on data analytics and audience insights'
      }
    ],
    
    discResult: 'I+D',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.\n\nDominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.',
    
    englishScore: '6.7',
    englishDescription: 'Speaks clearly and fluently with minimal effort, using a range of vocabulary and expressions to convey ideas effectively. Grammar and pronunciation are generally accurate, supporting coherent communication.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Universidad de Guadalajara / University of New Mexico',
      degree: 'Bachelor\'s Degree in Graphic Communication Design / Media Arts Program',
      date: '2016 - 2020 / 2019',
      certifications: [
        'Introduction to Personal Lines',
        'Homeowners',
        'Personal Auto',
        'Dwelling',
        'Introduction to Commercial Lines',
        'Social Media Marketing',
        'Sales'
      ]
    }
  }

  return <VAProfilePage vaData={pavelData} />
}
