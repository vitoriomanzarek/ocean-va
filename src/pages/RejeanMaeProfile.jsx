import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function RejeanMaeProfile() {
  const rejeanMaeData = {
    name: 'REJEAN MAE',
    title: 'ENGLISH-SPEAKING VA',
    image: '/images/VAs/Rejean.webp',
    summary: 'Resourceful Virtual Assistant with solid experience in customer service, insurance administration, and healthcare coordination. With a strong background supporting U.S.-based clients in insurance, she brings professionalism and empathy to her work. Rejean can confidently manage tasks such as endorsements, commercial auto insurance, quote generation, policy changes, customer service, inbound/outbound calls, email & calendar management, billing assistance, ACORD forms, prior authorizations & DME intake, COI documentation, and loss runs processing.',
    tagline: 'Rejean delivers dependable support in high-demand industries, helping clients streamline communication, improve insurance workflows, and deliver top-notch customer experiences.',
    videoUrl: 'https://www.youtube.com/embed/yeJ_lskQovU',
    videoThumbnail: 'https://img.youtube.com/vi/yeJ_lskQovU/hqdefault.jpg',
    thumbnail: 'Insurance expertise, Customer service, Healthcare coordination',
    
    skills: [
      'Endorsements',
      'Commercial Auto Insurance',
      'Quote Generation',
      'Policy Changes',
      'Customer Service',
      'Inbound & Outbound Calls',
      'Email & Calendar Management',
      'Billing Assistance',
      'ACORD Forms',
      'Prior Authorizations & DME Intake',
      'COI Documentation',
      'Loss Runs Processing'
    ],
    
    tools: [
      'CRM AMS',
      'Ezlynx',
      'Nowcerts',
      'Nationwide Portal',
      'Microsoft Office',
      'Google Suite',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Rejean Mae is a resourceful Virtual Assistant with solid experience in customer service, insurance administration, and healthcare coordination. She worked as an Insurance Virtual Assistant at UYT, handling email management, document processing, certificates, quotes, endorsements, ACORD forms, claims, loss runs, and binding. She served as a Healthcare Patient Account Coordinator & Case Manager at Superstaff Premier Kids Care, dealing with insurances, eligibility, and DME intake. She worked as a Customer Advisor at Concentrix Healthy Benefits, providing customer service in healthcare accounts. She served as an Executive Telemarketing professional at Wareman Exhibition LLC. She worked as a Customer Service Associate at IQOR PH Sprint, handling telco customer service. She served as a Customer Service Representative at Sutherland Amazon, managing retail customer service. Her strengths include strong customer service skills, insurance knowledge, healthcare coordination expertise, attention to detail, and communication excellence.',
    
    employmentHistory: [
      {
        company: 'UYT',
        position: 'Insurance Virtual Assistant',
        period: 'FEB 2024 - JAN 2025',
        description: '• Responsible for email management, processing documents and certificates, quotes, endorsements, acord forms, claims, loss runs and binding.'
      },
      {
        company: 'SUPERSTAFF, PREMIER KIDS CARE',
        position: 'Healthcare Patient Account Coordinator & Case Manager',
        period: 'JUL 2023 - JAN 2024',
        description: '• Deals with insurances, checkeligibility, requesting documents, submitting prior authorization, DME intakes and setting up orders shipment.'
      },
      {
        company: 'CONCENTRIX, HEALTHY BENEFITS',
        position: 'Customer Advisor 1',
        period: 'DEC 2022 - FEB 2023',
        description: '• Customer service in healthcare account Deals with insurances, checking eligibility assisting card replacement, OTC benefits, tracking orders etc.'
      },
      {
        company: 'WAREMAN EXHIBITION LLC',
        position: 'Executive Telemarketing',
        period: '2017 - 2019',
        description: '• Telemarketing business projects/events & exhibitions in Dubai World Trade Center, setting up meetings meeting clients, design collaboration.'
      },
      {
        company: 'IQOR PH, SPRINT',
        position: 'Customer Service Associate',
        period: 'SEPT 2016 - MAR 2017',
        description: '• Customer service in telco account\n• Answering incoming calls that deals with resolving customers basic technical issues, helps to trouble shoot devices, billing assistance and all other queries.'
      },
      {
        company: 'SUTHERLAND, AMAZON',
        position: 'Customer Service Representative',
        period: 'FEB 2016 - JUL 2016',
        description: '• Customer service in retail account\n• Deals with the orders, delivery inquiries, returns and all other logistics queries'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '90/C1',
    englishDescription: 'Indicates advanced English proficiency with the ability to communicate fluently and spontaneously. Can understand complex texts and use language effectively in social, academic, and professional settings.',
    
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

  return <VAProfilePage vaData={rejeanMaeData} />
}
