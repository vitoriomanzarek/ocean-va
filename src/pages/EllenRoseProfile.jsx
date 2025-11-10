import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function EllenRoseProfile() {
  const ellenRoseData = {
    name: 'ELLEN ROSE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Ellen.webp',
    summary: 'Top-performing Virtual Insurance Assistant with comprehensive experience in personal lines insurance, including homeowners, auto, dwelling fire, umbrella, and health insurance. Known for her proactive mindset and professionalism, Ellen consistently delivers accurate, compliant, and timely insurance administrative support for U.S.-based clients.',
    tagline: 'Ellen Rose delivers reliable, precision-focused virtual assistance designed to support complex insurance processes and elevate client satisfaction.',
    videoUrl: 'https://www.youtube.com/embed/zgEzkCfI3Pw',
    videoThumbnail: 'https://img.youtube.com/vi/zgEzkCfI3Pw/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Customer service, Administrative support',
    
    skills: [
      'Endorsements',
      'PPC Insurance Support',
      'Email & Calendar Management',
      'COIs Generation',
      'Customer Service',
      'Quoting Ezlynx & Carrier Portals',
      'Claims Coordination',
      'Cancellations',
      'Inbound & Outbound Calls',
      'Underwriting Support',
      'Document Preparation',
      'Renewals'
    ],
    
    tools: [
      'Ezlynx',
      'Nowcerts',
      'Zoho',
      'Dialpad',
      'Zendesk',
      'Smart Lookup',
      'Google Calendar',
      'Google Suite',
      'Microsoft Excel (Advanced)'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Ellen Rose has extensive experience in insurance support and virtual assistance. She worked as a Virtual Assistant at Regency Insurance Group, delivering quotations, processing documentation, and managing client communications. She served as a Life Insurance Virtual Assistant at Woodbows (Part-Time), supporting client renewals and policy documentation. She worked as a Customer Service Representative at Concentrix: Aetna Life Insurance, handling customer calls and maintaining detailed records. She also worked as a General Virtual Assistant at Taskus (Part-Time) and Advance VA (Part-Time), providing comprehensive virtual support services. Her strengths include strong attention to detail, excellent communication skills, customer service excellence, and technical proficiency with insurance systems.',
    
    employmentHistory: [
      {
        company: 'REGENCY INSURANCE GROUP',
        position: 'Virtual Assistant',
        period: 'MAY 2022 - JAN 2025',
        description: '• This distinguished global firm offers efficient, risk-managed insurance solutions worldwide, with focus on serving in-house and outside teams.\n• I delivered precise quotations with minimal premiums, submitted required documentation, and managed the entire quotation process from inception to conclusion.\n• I processed endorsements, cancellations, and renewals, ensuring data compliance, tracked expirations by coordinating with clients and claims, and developed notes to prospects.\n• I proactively communicated critical updates, including modified declarations and upcoming cancellations (with or without non-payment) to clients via multiple channels like call, email, and text.'
      },
      {
        company: 'WOODBOWS (PART-TIME)',
        position: 'Life Insurance Virtual Assistant',
        period: 'APR 2024- DEC 2024',
        description: '• I worked as a virtual assistant for a dynamic company with offices in the UK and operations located across the US, Philippines, and India.\n• As Administrative Support, I managed client communications, scheduled agent appointments, prepared reports and summaries, and maintained client records and policy documents.\n• I assisted clients with renewals, payments, and claims, answered basic inquiries, supported efficient onboarding, and addressed concerns and complaints.\n• I processed insurance applications and renewals, ensured data compliance, tracked expirations by coordinating with clients and claims, and developed notes to prospects.'
      },
      {
        company: 'CONCENTRIX: AETNA LIFE INSURANCE',
        position: 'Customer Service Representative',
        period: 'JUL 2021- APR 2022',
        description: '• I work for a major American health insurance company providing life insurance and other services since the 1800s.\n• I as CSR Life Insurance Virtual Assistant, I professionally answered customer calls, addressed policy questions, provided details on Aetna\'s offerings, and collaborated with teams to resolve issues.\n• I maintained documents and detailed records of customer interactions and consistently demonstrated a passion for wellness and helping others.\n• I developed strong customer service, communication, focus, multitasking, adaptability, excellent people skills (listening, empathy, and converted empathy into development).'
      },
      {
        company: 'TASKUS (PART-TIME)',
        position: 'General Virtual Assistant',
        period: 'AUG 2023- MAR 2024',
        description: '• I helped provide next-generation outsourced digital and user experience services to innovative businesses, helping them protect their brand and maximize profits.\n• As a customer experience representative, my primary responsibility was managing and responding to customer inquiries via various support channels, including voice, email, chat, social media, and messaging.\n• I satisfied client expectations by providing introductory information to new customers, ensuring their satisfaction through follow-ups, and informing them about additional products or services.\n• I determined difficult matters for responding to inquiries, escalated concerns when necessary, and collaborated with teams to find solutions for common product or service issues.'
      },
      {
        company: 'ADVANCE VA (PART-TIME)',
        position: 'General Virtual Assistant',
        period: 'NOV 2022- JUL 2023',
        description: '• I served as a general virtual assistant, managing emails and phone calls on behalf of my supervisor.\n• I enhanced my essential oral and written communication skills through handling various business communications and resolving customer concerns and inquiries.\n• I independently managed assigned administrative projects, consistently delivering high-quality work with minimal supervision.\n• I became more dependable in handling tasks and built a trusting, productive working relationship with my team.\n• My responsibilities included preparing appointments, maintaining online records, organizing management calendars, conducting market research, and developing presentations.\n• I became more proficient in managing necessary resources in recognition of my consistently high performance.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '75/B1',
    englishDescription: 'Speaks clearly on familiar topics with good control of basic grammar and vocabulary. Pronunciation is generally clear, and ideas are communicated with confidence and coherence.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Quezon City University',
      degree: 'Bachelor of Science in Entrepreneurship',
      date: '2022'
    }
  }

  return <VAProfilePage vaData={ellenRoseData} />
}
