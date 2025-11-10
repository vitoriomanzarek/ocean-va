import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function RaydonProfile() {
  const raydonData = {
    name: 'RAYDON',
    title: 'ENGLISH-SPEAKING VA | INSURANCE SPECIALIST',
    image: '/images/VAs/Raydon.webp',
    summary: 'Raydon is an Insurance Virtual Assistant with nearly four years of experience supporting U.S. agencies in personal and property lines. He specializes in renewals, endorsements, cancellations, and claims documentation while ensuring accuracy and compliance across all records. Skilled in Applied Epic and EZLynx, he manages client data, billing, quotes, and insurance quotations.',
    tagline: 'Raydon is the perfect option for insurance agencies looking for outstanding administrative support.',
    videoUrl: 'https://www.youtube.com/embed/2OIkxzcz-pw',
    videoThumbnail: 'https://img.youtube.com/vi/2OIkxzcz-pw/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Mortgage & Lienholder processes, Policy management',
    
    skills: [
      'Carrier Coordination',
      'Billing & E/T Updates',
      'Policy Renewals',
      'Policy Management',
      'Homeowners, Condo, Renters and Auto Lines',
      'COI Generation',
      'Cancellations',
      'Quotations',
      'Mortgage & Lienholder Process',
      'Underwriting',
      'Claims Assistance',
      'Endorsements'
    ],
    
    tools: [
      'Canva',
      'Ezlynx',
      'QQ Catalyst',
      'AMS360',
      'Applied Epic',
      'Microsoft Office',
      'MS Teams',
      'MS Outlook',
      'Zoom Workplace'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Raydon is a highly organized professional with four years of insurance experience, specializing as an Insurance Virtual Assistant. He gained his Personal Lines Insurance experience through Mortgage & Lienholder processes. Skilled in Applied Epic, EZLynx, and AMS360, he handles policy renewals, endorsements, claims, and cancellations efficiently. Raydon also has a strong background in customer service, documentation control, and quality assurance. His strengths include organization, multitasking, communication, and teamwork, making him a reliable and adaptable professional.',
    
    employmentHistory: [
      {
        company: 'MORTGAGE & LIENHOLDER PROCESS',
        position: 'Insurance Virtual Assistant',
        period: 'JANUARY 2022 - 2025',
        description: '• Proficient in Applied Epic and EZLynx\n• Policy Renewal and Endorsement\n• Mortgage & Lienholder Process\n• Claims and Cancellation\n• Talking to Underwriter/Carrier\n• Knowledge in AMS tool\n• Agent\'s Support\n• Customer Service Representative L2\n• Commission Agreement\n• Experts in different types of insurance carrier\'s website\n• Quoting\n• Emailing/Mailing policy documents\n• Knowledge in Life Insurance Processes\n• Knowledge in AMS360 Tool'
      },
      {
        company: 'WIN FORTUNETRAVEL AGENCY INC',
        position: 'Travel Agent',
        period: 'AUGUST 2019 - JULY 2020',
        description: '• Following and improving document control and procedure.\n• Ensuring all the documentation meets formal requirements and required standards.'
      },
      {
        company: 'LIZARDBEARTASKING, INC',
        position: 'Quality Analyst',
        period: 'NOVEMBER 2017 - JULY 2019',
        description: '• Responsible for checking the quality of the tasks of the teammate to the given dataset.\n• Responsible for passing or failing the task of a teammate.'
      },
      {
        company: 'MIASCOR CLARK AVIATION SERVICES CORP',
        position: 'Cabin Crew',
        period: 'NOVEMBER 2016 - NOVEMBER 2017',
        description: '• Assists equipment operation in the preparations dollies/ULD and perform cabin cleaning job and other related activities.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '70',
    englishDescription: 'Speaks clearly with good pronunciation and steady fluency. Uses everyday vocabulary and grammar accurately to express thoughts, with growing confidence in more complex language.',
    
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

  return <VAProfilePage vaData={raydonData} />
}
