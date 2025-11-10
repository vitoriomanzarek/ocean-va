import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function EmmanuelProfile() {
  const emmanuelData = {
    name: 'EMMANUEL',
    title: 'ENGLISH-SPEAKING VA | INSURANCE SPECIALIST',
    image: '/images/VAs/Emmanuel.webp',
    summary: 'Emmanuel is a dedicated Insurance Virtual Assistant with over six years of industry experience including four years supporting U.S.-based agencies remotely. He specializes in both personal and commercial lines, handling auto, property, and business insurance with precision and reliability. His expertise includes quoting, renewals, endorsements, billing, claims coordination, and COI issuance for diverse client portfolios.',
    tagline: 'Emmanuel provides end-to-end insurance support, focusing on precision, responsiveness, and clear communication. He ensures accurate policies, efficient processes, and smooth collaboration among all parties.',
    videoUrl: 'https://www.youtube.com/embed/dZaAfgmaQwk',
    videoThumbnail: 'https://img.youtube.com/vi/dZaAfgmaQwk/maxresdefault.jpg',
    thumbnail: 'Personal and commercial lines expertise, Claims processing, Insurance operations',
    
    skills: [
      'Commercial Auto',
      'Renewals',
      'Policy Servicing',
      'Carrier Coordination',
      'Personal Lines',
      'Claims Support',
      'Underwriting Assistance',
      'Billing',
      'Quotations',
      'Endorsements',
      'Mortgage Communication',
      'COI Issuance'
    ],
    
    tools: [
      'Applied Epic',
      'Applied Rater',
      'PL Rater',
      'MS Outlook',
      'MS Teams',
      'Microsoft Office',
      'Zoom Workplace',
      'Ezlynx',
      'Slack'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Emmanuel has 4 years of experience in Personal and Commercial Lines insurance, including home, auto, and commercial auto policies. As an Executive Virtual Assistant at Lapointe Insurance Agency, he managed renewals, new business policies, and issued binders, showcasing proficiency in creating quotes using Applied Epic and other tools. His strong skills include communicating with mortgagee companies for payments and updates, as well as training other VAs on workflow and mortgagee relations systems. He also has valuable experience in claims processing from his roles at Insurance Australia Group and Petsure services, where he validated claims and managed settlements. Emmanuel demonstrates robust analytical, organizational, and client communication abilities within the insurance sector.',
    
    employmentHistory: [
      {
        company: 'HAWAII PACIFIC NEUROSCIENCE',
        position: 'Patient Care Coordinator',
        period: 'JAN 2025 - JUN 2025',
        description: '• Appointment setting – scheduling, managing cancellations, and sending reminders to patients.\n• Calendar management – creating a schedule that includes appointments, meetings and events for providers/patients.\n• Fax document Management.\n• Follow-ups and checking on patients after appointments.\n• Email management – responding to messages and cleaning your inbox.\n• Taking incoming and outgoing calls and transfer urgent calls to providers/staffs.'
      },
      {
        company: 'LAPOINTE INSURANCE AGENCY',
        position: 'Executive Virtual Assistant',
        period: 'OCT 2020 - OCT 2024',
        description: '• Communicated with mortgagee company on payments, closings & binder updates.\n• Generated binders and issuance of policies/COIs on various insurance carriers.\n• Called mortgagee companies to check on mortgagee payments/settlements.\n• Lead the agency group on mortgagee relations.\n• Trained other VAs on the workflow and mortgagee relations systems.\n• Process renewals, new business policies for Personal Home, Auto & Umbrella as well as Commercial Limos and trucks.\n• Well versed on creating quotes using PLRater Applied Epic and efficient on creating multiple quotes for reshopping.\n• Proficient on CRMS such as AMS360, Applied Epic, HawkSoft and Ezlynx.'
      },
      {
        company: 'INSURANCE AUSTRALIA GROUP',
        position: 'Claims/Repairs Specialist',
        period: 'JUL 2019 - OCT 2020',
        description: '• Validate claims lodged by the policyholder & check whether claim is acceptable or not.\n• Process repairs invoices.\n• Monitor repairs of policyholders Processing for repairs and other claim related settlements.'
      },
      {
        company: 'PETSURE SERVICES – ANIMAL FRIENDS UK',
        position: 'Assessor',
        period: 'NOV 2019 - MAY 2019',
        description: '• Assessed invoices and prepare settlements.\n• Reviews/cross examine cases and filed claims.'
      }
    ],
    
    discResult: 'I',
    discResultDescription: 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '85',
    englishDescription: 'Communicates clearly and confidently with smooth pronunciation and good fluency. Uses a broad vocabulary and varied grammar structures to express ideas effectively in most situations.',
    
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

  return <VAProfilePage vaData={emmanuelData} />
}
