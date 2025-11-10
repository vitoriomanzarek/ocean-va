import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JeromeProfile() {
  const jeromeData = {
    name: 'JEROME',
    title: 'ENGLISH-SPEAKING VA | INSURANCE SPECIALIST',
    image: '/images/VAs/Jerome.webp',
    summary: 'Jerome is an Insurance Virtual Assistant with experience in home and auto insurance. He manages quoting, policy servicing, endorsements, renewals, and MVR reports. Skilled in coordinating with clients, underwriters, and carriers, he maintains smooth operations through proactive communication and attention to detail. His previous five years in customer service enhanced his ability to handle complex client interactions effectively.',
    tagline: 'Jerome combines technical precision with a service-oriented mindset—ensuring policy accuracy, timely updates, and seamless coordination across clients, underwriters, and carriers. His mix of analytical and interpersonal skills makes him a dependable asset for any insurance team.',
    videoUrl: 'https://www.youtube.com/embed/aomGUtRlOiE',
    videoThumbnail: 'https://img.youtube.com/vi/aomGUtRlOiE/maxresdefault.jpg',
    thumbnail: 'Home and auto insurance expertise, Policy servicing, Customer service',
    
    skills: [
      'Customer Service',
      'Policy Servicing',
      'Client Communication',
      'Billing',
      'Payments Verification',
      'Endorsements',
      'MVR Reports',
      'Coverage Review',
      'Renewals',
      'Quoting',
      'Underwriter Coordination',
      'Claims Follow-up'
    ],
    
    tools: [
      'HawkSoft',
      'Ezlynx',
      'Asana',
      'AgentX',
      'Slack',
      'Nice CXone',
      'Avaya One-X',
      'Microsoft Teams',
      'Microsoft Outlook'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Jerome has 1 year of experience in the Home and Auto Insurance industry, gained while working as a General Virtual Assistant for an independent insurance agency. During this time, he managed full-cycle policy servicing, including quoting, policy changes, and client communications. He is highly proficient in tools such as HawkSoft, Mercury, Safeco, GEICO, Progressive, and other major carrier systems. Jerome also brings over 7 years of customer service experience from roles at Alorica and Teleperformance, where he excelled in handling complex client concerns and mentoring new hires. His strengths include insurance policy processing, technical troubleshooting, and professional communication. He is known for his reliability, attention to detail, and ability to learn systems quickly.',
    
    employmentHistory: [
      {
        company: 'INDEPENDENT CONTRACT',
        position: 'General Virtual Assistant - Home & Auto Insurance Agency',
        period: 'JAN 2025 - 2025',
        description: '• Managed end-to-end policy servicing for Home and Auto insurance clients, including quoting, policy amendments, and client updates.\n• Generated and revised insurance quotes based on client coverage needs and eligibility criteria.\n• Processed Auto policy updates, including adding loss payees, removing vehicles, and modifying coverage limits and deductibles.\n• Updated Home insurance coverage categories such as Dwelling, Liability, and Personal Belongings.\n• Ran MVR (Motor Vehicle Records) reports to evaluate driver risk profiles.\n• Drafted and sent professional communications to insurance carriers (underwriters and service departments).\n• Utilized multiple insurance platforms and carrier tools, including: HawkSoft, Mercury, Safeco, GEICO, Progressive, Acuity, Nationwide, Dairyland, and Travelers.'
      },
      {
        company: 'ALORICA',
        position: 'Customer Service Representative',
        period: '2020 - 2025',
        description: '• Supported customers with Home Internet-related issues, including billing inquiries, technical troubleshooting, and account updates.\n• Resolved online account access and billing disputes with professionalism and accuracy.\n• Assisted guests with hotel reservations, ensuring prompt resolution of booking issues.\n• Served as Mentor for new hires and Associate Coach, supporting call escalations and agent performance.'
      },
      {
        company: 'TELEPERFORMANCE',
        position: 'Customer Service Representative',
        period: '2018 - 2020',
        description: '• Assisted healthcare customers with insurance claims, benefits, and eligibility concerns.\n• Supported clients in Primary Care Physician changes and technical account troubleshooting.\n• Handled AT&T account inquiries, including billing and Fox channel access issues.\n• Recognized for exceptional performance, reliability, and customer satisfaction scores.'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '90',
    englishDescription: 'Speaks clearly and fluently with natural pronunciation and confident delivery. Demonstrates strong command of advanced vocabulary and grammar, effectively expressing complex and nuanced ideas.',
    
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

  return <VAProfilePage vaData={jeromeData} />
}
