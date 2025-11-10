import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function MariaDProfile() {
  const mariaDData = {
    name: 'MARIA D.',
    title: 'BILINGUAL ENGLISH-SPANISH SPEAKING VA',
    image: '/images/VAs/Maria D.webp',
    summary: 'Maria is a bilingual insurance professional with three years of experience supporting U.S.-based insurance agencies across Property & Casualty and Commercial lines. She has managed renewals, endorsements, billing, underwriting coordination, and claims support for both personal and business accounts. Plus, she has extensive experience servicing VIP commercial clients, preparing certificates of insurance, and ensuring timely policy updates.',
    tagline: 'Maria brings a strong background in customer service across both personal and commercial lines, paired with a proactive, detail-driven approach to insurance operations. Her commitment to excellence ensures compliance with every policy she handles and every interaction she supports.',
    videoUrl: 'https://www.youtube.com/embed/ALQNI3jsBLs',
    videoThumbnail: 'https://img.youtube.com/vi/ALQNI3jsBLs/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Bilingual support, Customer service',
    
    skills: [
      'Property & Casualty Insurance',
      'Commercial Insurance',
      'Client Relations',
      'Team Training & Support',
      'Commercial Lines Servicing',
      'Account Maintenance',
      'Compliance & Quality Assurance',
      'Claims Support',
      'Renewals & Endorsements',
      'Billing',
      'Underwriting Coordination',
      'Policy Documentation Management'
    ],
    
    tools: [
      'Applied Epic',
      'Slack',
      'Microsoft Office',
      'Microsoft Teams',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Maria D. has 3 years of Property & Casualty and Commercial lines insurance experience, primarily gained as an Office & Customer Service Manager at Rizo Insurance Group LLC. In this role, she expertly managed renewals, endorsements, billing, underwriting coordination, and claims support for both personal and business accounts. Plus, she achieved a 98% VIP client retention rate by resolving complex underwriting, claims, and billing issues while guiding commercial audits. She demonstrated strong leadership by training new employees and enhanced operational efficiency through implementing a responsibility assignment matrix. Her diverse background also includes experience as a Communication Specialist, Production Planning Analyst Assistant, and Financial Administrative Assistant. Across these positions, she consistently developed compliance practices and optimized workflows, highlighting her strong analytical and problem-solving skills.',
    
    employmentHistory: [
      {
        company: 'RIZO INSURANCE GROUP LLC - INSURANCE AGENCY',
        position: 'Office & Customer Service Manager',
        period: 'NOV 2022 - SEPT 2025',
        description: '• Oversee commercial and personal line renewals, reviewing documentation, billing, underwriting memos, and payments to ensure accuracy and timely continuation of policies.\n• Bind personal and commercial insurance policies, ensuring regulatory compliance and high levels of client satisfaction.\n• Act as the primary point of contact for VIP clients, resolving underwriting, claims, and billing issues while protecting client interests.\n• Guide commercial clients through insurance audits, clarifying compliance requirements and supporting timely submissions.\n• Serve as liaison between office staff and senior management, fostering open communication and a positive workplace culture.\n• Improved operational efficiency by designing and implementing a responsibility assignment matrix, increasing role clarity and workflow efficiency.\n• Lead onboarding and training for new employees, delivering practical instruction on tools, SOPs, and weekly Q&A sessions to accelerate integration.\n• Key Achievement: solely managed VIP client relationships, implementing custom tracking tools and regular policy review meetings, strengthening long-term partnerships, and proactively addressed client needs.'
      },
      {
        company: 'NAVEX GLOBAL',
        position: 'Communication Specialist',
        period: 'FEB 2022 - AUG 2022',
        description: '• Conducted and documented time-sensitive interviews, ensuring accurate reporting and compliance with client regulatory requirements.\n• Optimized call intake and documentation workflows, maintaining 100% adherence to established protocols and consistently exceeding company KPIs.\n• Delivered high-quality service that reduced call hold times, improving caller experience and supporting contractual service-level agreements.\n• Translated sensitive documents with accuracy and confidentiality to meet client expectations.\n• Key Achievement: recognized for excellence in customer service by facilitating concise, tailored interviews that met and exceeded performance expectations.'
      },
      {
        company: 'ALIAR SA',
        position: 'Production Planning Analyst Assistant',
        period: 'DEC 2020 - NOV 2021',
        description: '• Led weekly production planning by analyzing demand and calculating output requirements.\n• Coordinated national dispatches with the logistics team to ensure timely distribution.\n• Resolved production issues in real time to minimize downtime and maintain workflow continuity.\n• Generated daily, weekly, and monthly compliance reports to monitor performance and address process deviations.\n• Key Achievements:\n  ○ Standardized and optimized Excel planning tools using the Kaizen method, reducing weekly planning time by 20%.\n  ○ Created new tracking systems and a comprehensive instruction manual, enabling seamless adoption and continuity by team members.'
      },
      {
        company: 'VISIÓN Y FINANZAS SAS',
        position: 'Financial Administrative Assistant',
        period: 'MAR 2019 - DEC 2020',
        description: '• Supported clients in reducing mortgage loans by providing guidance and tailored customer service.\n• Collected and organized sensitive credit documentation for submission to banking entities, ensuring accuracy and compliance.\n• Built and maintained databases of client information and generated process reports for management.\n• Onboarded and trained new hires, enhancing team productivity and consistency.\n• Key Achievement: Developed and implemented the company\'s Occupational Health and Safety Management Manual as part of one of my university research projects, establishing foundational compliance practices.'
      },
      {
        company: 'VANGUARDIA LIBERAL - REGIONAL NEWSPAPER',
        position: 'Intern',
        period: 'APR 2016 - SEPT 2016',
        description: '• Developed and executed online loyalty strategies to enhance subscriber engagement.\n• Tracked and analyzed subscriber requests, ensuring accurate and timely resolution.\n• Audited partner entities to monitor compliance with alliance agreements.\n• Oversaw subscriber card inventory control to maintain accuracy and availability.\n• Delivered customer support to subscribers, strengthening retention and satisfaction.\n• Key Achievement: Analyzed workflow bottlenecks in the audit process and recommended a data solution that was approved by senior leadership. The initiative reduced delays, increased efficiency, and enhanced data accuracy.'
      }
    ],
    
    discResult: 'I',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '6.6/9',
    englishDescription: 'Demonstrates clear communication with understandable pronunciation and steady pacing. Uses everyday vocabulary and basic grammar accurately, showing confidence in familiar topics and improving control in extended speech.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: true, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Not provided',
      degree: 'Not provided',
      date: ''
    }
  }

  return <VAProfilePage vaData={mariaDData} />
}
