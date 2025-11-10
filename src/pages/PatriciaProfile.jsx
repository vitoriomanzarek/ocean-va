import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function PatriciaProfile() {
  const patriciaData = {
    name: 'PATRICIA',
    title: 'ENGLISH SPEAKING VA | INSURANCE SPECIALIST',
    image: '/images/VAs/Patricia.webp',
    summary: 'Patricia is an experienced Insurance Virtual Assistant with around five years of U.S. insurance experience, supporting agencies across both personal and commercial lines. Her background includes homeowners, condo, renters, dwelling fire, auto, earthquake, flood, business & property, workers\' compensation, umbrella, and commercial auto. She is proficient in managing renewals, endorsements, cancellations, certificates, billing, and client communications with utmost precision and responsiveness in every task.',
    tagline: 'Patricia\'s highly organized, client-centered approach and deep familiarity with service websites enable her to manage complex policy tasks, ensuring accuracy and seamless service. Her expertise and precision make her a valuable asset to any insurance operations team.',
    videoUrl: '',
    videoThumbnail: '',
    thumbnail: 'Insurance expertise, Client service, Policy management',
    
    skills: [
      'Renewals',
      'Certificates of Insurance',
      'Endorsements',
      'Client & Carrier Communication',
      'Underwriting',
      'Billing & Payment Coordination',
      'Documentation Review',
      'Commercial Lines',
      'Quoting',
      'Cancellations',
      'Policy Servicing',
      'Claims History Requests',
      'Personal Lines'
    ],
    
    tools: [
      'Ezlynx',
      'Airtable',
      'AMS360',
      'Salesforce',
      'Zendesk',
      'Applied Epic',
      'Google Workspace',
      'Microsoft Office'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Patricia has over 5 years of Personal and Commercial lines Insurance Experience. Her expertise was developed as an Assistant Account Manager at Leslie Sawyer Insurance Agency, and further refined as an Underwriting Insurance Assistant at GOTEAM Virtual Assistants and an Insurance Virtual Assistant at Russ Insurance Agency, handling personal and commercial policies, renewals, and various documentation. Beyond insurance, she excels in customer support and technical assistance, proficient in CRMs like EZ Lynx, Salesforce, and Zendesk. She adeptly manages high call volumes, solves problems efficiently, and maintains accurate client data. Her background highlights an organized, customer-focused professional with exceptional communication and data management skills.',
    
    employmentHistory: [
      {
        company: 'RENTBIRD',
        position: 'Appointment Setter',
        period: 'MAY 2025 - 2025',
        description: '• Call or message leads from provided databases or CRMs.\n• Update CRM records with prospect notes and status.\n• Schedule meetings between sales representatives and leads.\n• Send confirmations and follow-up reminders to prospects.'
      },
      {
        company: 'RUSS INSURANCE AGENCY',
        position: 'Insurance Virtual Assistant',
        period: 'APR 2025 - 2025',
        description: '• Prepare, update, and send Certificates of Insurance (COIs).\n• Assist in policy renewals, including gathering updated info and loss runs.\n• Process endorsements, cancellations, and policy changes.\n• Organize and maintain digital records of client files and policies.\n• Fill out ACORD forms and application documents.'
      },
      {
        company: 'GOTEAM VIRTUAL ASSISTANTS',
        position: 'Underwriting Insurance Assistant',
        period: 'AUG 2024 - DEC 2024',
        description: '• Processed commercial insurance policy applications, ensuring accuracy and completion of necessary documentation.\n• Prepared quotes for commercial insurance policies and ensured timely renewals of existing policies.\n• Updated Salesforce with accurate client and policy information and ensured compliance with underwriting standards.\n• Collaborated with underwriting teams to ensure smooth policy issuance and resolution of issues.'
      },
      {
        company: 'LESLIE SAWYER INSURANCE AGENCY',
        position: 'Assistant Account Manager',
        period: 'FEB 2019 - MAY 2023',
        description: '• Supported daily operations of account management, handling insurance inquiries via email, calls, and SMS.\n• Proficient in quoting personal insurance services using the EZ Lynx CRM system.\n• Managed policy renewals, non-renewals, and handled underwriting memos and non-payment policies.\n• Maintained accurate policy and client data in Google Sheets, ensuring compliance with industry standards.\n• Provided excellent customer support by addressing policy inquiries, coverage details, and billing issues.'
      },
      {
        company: 'MICROSOURCING',
        position: 'Camp Australia - Customer Care Associate',
        period: 'SEPT 2016 - FEB 2019',
        description: '• Handled high volumes of inbound and outbound calls while maintaining a focus on customer satisfaction.\n• Responded to inquiries via email using Microsoft Outlook and managed customer concerns related to childcare bookings and entitlements.\n• Utilized Zendesk to manage and resolve customer issues efficiently, ensuring data accuracy.'
      },
      {
        company: 'ALTISOURCE',
        position: 'Technical Support Representative',
        period: 'JAN 2016 - JUL 2016',
        description: '• Installed/repaired hardware & software, particularly with the POS system.\n• Utilized Zendesk Ticketing System to address client concerns and create tickets if necessary.\n• Managed call flow and provided technical support to customers.'
      },
      {
        company: 'CONVERGYS',
        position: 'Technical Sales Customer Service Representative',
        period: 'APR 2015 - JAN 2016',
        description: '• Addressed billing inquiries, provided basic troubleshooting, and upsell products promptly.\n• Offered on-call support for critical issues and accurately described solutions to customers persuasively.\n• Logging call notes to the client\'s CRM system.'
      },
      {
        company: 'TELEPERFORMANCE',
        position: 'Technical Customer Service Associate',
        period: 'JAN 2014 - MAR 2015',
        description: '• Promptly answered telephone calls, minimizing abandoned calls.\n• Utilized scripting skills to enhance internet calls.\n• Performed basic troubleshooting'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '100',
    englishDescription: 'Demonstrates exceptional fluency and precision with native-like pronunciation and effortless delivery. Uses an extensive vocabulary and flawless grammar to express complex and nuanced ideas naturally.',
    
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

  return <VAProfilePage vaData={patriciaData} />
}
