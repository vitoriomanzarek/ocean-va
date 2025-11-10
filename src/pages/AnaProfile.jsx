import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function AnaProfile() {
  const anaData = {
    name: 'ANA',
    title: 'BILINGUAL ENGLISH-SPANISH VA',
    image: '/images/VAs/Ana.webp',
    summary: 'Bilingual virtual assistant, proficient, experienced in handling complex administrative tasks and supporting customer focused strategies. Passionate about using technology to streamline processes and achieve results. Effectively manage a variety of responsibilities, such as:',
    tagline: 'She is ready to make an immediate impact on your business\'s success! Click here to learn more about her.',
    videoUrl: 'https://www.youtube.com/embed/XloA9MBGtGA',
    videoThumbnail: 'https://img.youtube.com/vi/XloA9MBGtGA/maxresdefault.jpg',
    thumbnail: 'Bilingual support, Customer service, Administrative expertise',
    
    skills: [
      'Insurance Claim Submission',
      'Payment Link Sending',
      'Outstanding Balance Tracking',
      'Explanation of Benefits (EOB)',
      'Appointment Scheduling',
      'Patient Followup',
      'Insurance Verification',
      'Dental Software Navigation',
      'Email & Calendar',
      'Inbound & Outbound Calls',
      'Administrative Support',
      'Team Collaboration',
      'Cross-Department Assistance'
    ],
    
    tools: [
      'Canva',
      'Zoho CRM',
      'Opera Software',
      'Microsoft Office',
      'Zoom Workplace',
      'Google Workspace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Ana has diverse experience in hospitality, customer service, and insurance operations. She started as a Front Office Agent at Smart Fit Dublin, managing customer interactions and administrative functions. She progressed to Front Office at Hilton Dublin Hotel, coordinating with departments and supporting executive-level operations. As a Reservations Agent at Gibson Hotel, she managed multi-channel reservations and customer interactions. Most recently, she worked as a Claims Assessor at Amex Assurance Company, handling customer communications and insurance policy/claims data. Her strengths include bilingual communication, customer-centric approach, administrative excellence, and attention to detail.',
    
    employmentHistory: [
      {
        company: 'GIBSON HOTEL',
        position: 'Reservations Agent',
        period: 'JUL 2023 - DEC 2023',
        description: '• Project Management: Managed multi-channel guest reservations to a high standard while multitasking customer interactions and administrative tasks.\n• Customer Centric & Communication: Successfully closed international sales by understanding client needs and effectively communicating with relevant teams for seamless services.\n• Administrative Functions: Managed the entire reservation process, coordinated with departments, ensured timely and accurate administrative work, and maintained the sales/events calendar for strategic alignment.\n• Technology Savvy: Improved booking processes and customer satisfaction by utilizing new technologies and quickly adapting to various software systems.'
      },
      {
        company: 'HILTON DUBLIN HOTEL',
        position: 'Front Office',
        period: 'MAR 2022 - JUN 2023',
        description: '• Strategic & Communication Skills: Effectively coordinated with various departments to achieve desired guest experiences, demonstrating a customer-focused approach and clear communication with the sales team and other departments in support of the hotels strategic objectives.\n• Multitasking & Process Control: Managed check-ins/outs, customer complaints, and administrative tasks, ensuring smooth operations and control of the entire process.\n• Support to Executive Level: Provided support to senior management by ensuring that all guest-related operations were aligned with the broader business strategy.'
      },
      {
        company: 'SMART FIT DUBLIN',
        position: 'Front Office',
        period: 'APR 2019 - JAN 2022',
        description: '• Cross-Cultural Communication & Customer Centric: Communicated effectively with diverse clients, ensuring excellent customer service. Promoted the brand via social media and used tailored marketing for different cultures.\n• Administrative Functions & Technology Savvy: Produced detailed daily/weekly sales reports for strategic insights. Reconciled accounts, managed payments, and used CRM/technology to improve operations and customer relations.'
      },
      {
        company: 'AMEX ASSURANCE COMPANY',
        position: 'Claims Assessor',
        period: 'JUN 2018 - FEB 2019',
        description: '• Customer Centric & Communication: Actively listened to customer calls, providing accurate and efficient service based on customer experiences.\n• Administrative Functions: Prepared and recorded insurance policy/claims data in the database accurately and compliantly.\n• Process Control: Completed tasks on time, meeting customer expectations and maintaining high service standards.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '7.3',
    englishDescription: 'Communicates clearly with strong fluency and minimal pauses. Pronunciation is consistently clear and easy to understand. Uses a broad range of vocabulary, including idiomatic expressions, and applies complex grammar structures effectively to express ideas with accuracy and coherence.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Dublin Business School | Dublin, Ireland',
      degree: 'Bachelor of Arts (Hons) in Business',
      date: 'NOV 2022',
      certifications: [
        'Introduction to Personal Lines',
        'Homeowners',
        'Personal Auto',
        'Dwelling',
        'Introduction to Commercial Lines',
        'Commercial Auto',
        'Property',
        'Workers\' Compensation',
        'General Liability',
        'Manager - Project Management 101',
        'Manager - A Guide to Seeking and Giving Feedback',
        'Business Communications',
        'Employee - A Guide to Seeking and Receiving Feedback',
        'Employee - How to Handle Objections: Getting Customers to Say, "Yes"',
        'Employee - Customer Service Essentials',
        'Employee - A Guide to Effective Meetings and Time Management',
        'Employee - Difficult Conversations and Escalating Issues',
        'Workplace Communication Basics'
      ]
    }
  }

  return <VAProfilePage vaData={anaData} />
}
