import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function AlejandroProfile() {
  const alejandroData = {
    name: 'ALEJANDRO',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Alejandro.webp',
    summary: 'Alejandro is a bilingual Virtual Assistant with a solid foundation in insurance, business development, and operational support. With direct experience in customer retention, lead prospecting, and policy sales, he combines analytical thinking with people skills to drive results.',
    tagline: 'Alejandro brings a rare mix of sales acumen, operational insight, and bilingual fluency—making him a valuable VA for insurance firms, startups, and service providers.',
    videoUrl: 'https://www.youtube.com/embed/a_cRiGRSLEs',
    videoThumbnail: 'https://img.youtube.com/vi/a_cRiGRSLEs/maxresdefault.jpg',
    thumbnail: 'Extensive insurance operations experience, Bilingual support, Sales acumen',
    
    skills: [
      'Policy Quoting',
      'Insurance Customer Service (Auto, Life, Property)',
      'Policy Changes',
      'Underwriting',
      'Email Campaigns & Outreach',
      'Cancellations',
      'Operational Support',
      'Claims Entry',
      'CRM & Lead Generation',
      'Report Building',
      'Quality Auditing'
    ],
    
    tools: [
      'Turborater',
      'Freshworks',
      'InsurancePro',
      'Hubspot',
      'Slack',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Alejandro brings 2.5 years of robust experience in the insurance industry, specializing in Home, Auto, and Commercial Insurance. During his tenure as a Max Insurance Agent and a Summer Bilingual Account Representative, he honed his skills in customer education, lead development, and maintaining strong carrier relationships. He consistently achieved monthly sales goals and managed accurate financial reporting. His insurance career has spanned across Texas (TX) and Oregon (OR), where he has effectively utilized a customer-focused approach to educate clients on various insurance options and resolve payment discrepancies.',
    
    employmentHistory: [
      {
        company: 'LATAM PARTNERS',
        position: 'Operations Manager',
        period: 'JUL 2025 - 2025',
        description: '• Ensured customer satisfaction by achieving an 80% positive rating through Google surveys.\n• Structured a comprehensive workflow incorporating calls, voicemails, texts, and emails with follow-up to support account coordination.\n• Held weekly check-ins with the leadership team.\n• Delegated tasks equitably across the organization and coached staff to ensure consistent performance and task completion.\n• Trained and coached staff to increase sales of life policies.\n• Served as the main point of contact between carriers and first-time responders.\n• Audited tasks, phone calls, emails, and texts to ensure quality and meet expectations based on a ranking system.\n• Developed corporate handbook to ensure standardized workflows company-wide.'
      },
      {
        company: 'GDI CONNECT',
        position: 'Business Development',
        period: 'DEC 2023 - APR 2025',
        description: '• Prospected 1,000 companies monthly to generate new business opportunities, consistently securing 15-20 meetings per month.\n• Executed approximately 100 calls, emails, SMS, and LinkedIn messages daily to engage potential clients.\n• Designed and managed targeted email campaign sequences across various industries, including IT, Non-Profits, Government Agencies, Marketing, Mortgage, Healthcare, Construction, Accounting, Sales, HR, and Software Development.\n• Developed a comprehensive sales funnel to effectively engage C-Level Executives, VPs, Directors, and Managers through multi-channel outreach (phone, SMS, LinkedIn, email).\n• Delivered persuasive pitches to high-level decision-makers, enhancing client acquisition and relationship building.'
      },
      {
        company: 'A-MAX AUTO INSURANCE',
        position: 'Insurance Agent',
        period: 'AUG 2022 - JUN 2023',
        description: '• Prepared end-of-day (EOD) reports to ensure accurate accounts payable by reviewing receipts and vouchers.\n• Maintained positive and effective communication with insurance providers to resolve payment discrepancies.\n• Fostered positive relationships through in-person visits to allied agencies, securing referrals to generate additional business.\n• Consistently achieved monthly sales goals, earning commissions and ensuring timely payment collections.'
      },
      {
        company: 'STATE FARM',
        position: 'Summer Bilingual Account Representative',
        period: 'JUN 2022 - AUG 2022',
        description: '• Utilized a customer-focused, needs-based review process to educate clients on insurance options.\n• Developed leads by troubleshooting customer issues and identifying needs to recommend appropriate products.\n• Executed various office duties, including processing payments, managing inbound and outbound calls, sending and receiving emails, scheduling appointments, managing the company\'s Facebook account, and servicing customer accounts.'
      },
      {
        company: 'COLLEGE OF BUSINESS ADMINISTRATION, UTEP',
        position: 'Undergraduate Research Assistant',
        period: 'JAN 2022 - JUN 2022',
        description: '• Collected and compiled data from over 180 Latin American academic institutions\' websites using Excel.\n• Assessed diversity and inclusion practices within these institutions to promote and enhance effective institutional strategies.\n• Designed the outline for the research report to be presented and published by the Academy of Management (AoM).'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '95',
    englishDescription: 'Communicates fluently and naturally with clear pronunciation and strong command of grammar. Uses a wide range of vocabulary and expressions to convey ideas accurately and confidently across various topics.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'The University of Texas at El Paso (UTEP)',
      degree: 'Bachelor of Business Administration in International Business',
      date: '2022'
    }
  }

  return <VAProfilePage vaData={alejandroData} />
}
