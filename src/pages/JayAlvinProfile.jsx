import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JayAlvinProfile() {
  const jayAlvinData = {
    name: 'JAY ALVIN',
    title: 'INSURANCE VA | COMMERCIAL & PERSONAL LINES',
    image: '/images/VAs/Jay Alvin.webp',
    summary: 'With over three years in the U.S. insurance industry, Jay Alvin has supported agencies across personal and commercial lines. He is skilled in managing quoting, renewals, billing, and COIs, using his background in workload management and client coordination to deliver dependable, results-oriented support.',
    tagline: 'Jay brings over 15 years of BPO leadership and 3 years of U.S. insurance support, combining strong operational discipline, technical expertise, and hands-on policy servicing to deliver consistent results for agencies and brokers nationwide.',
    videoUrl: 'https://www.youtube.com/embed/GUe3uCkW8-4',
    videoThumbnail: 'https://img.youtube.com/vi/GUe3uCkW8-4/maxresdefault.jpg',
    thumbnail: 'Insurance expertise, Team leadership, Commercial and personal lines',
    
    skills: [
      'Premium Audits & Billing',
      'Policy Servicing',
      'Property Manager Updates for Renters and Dwellings',
      'Client Relationship Management',
      'Certificates of Insurance (COIs) & Binders',
      'Billing Payments & Reinstatements',
      'Quoting, Renewals & Endorsements',
      'Team Leadership & Task Delegation',
      'Personal and Commercial Lines Servicing'
    ],
    
    tools: [
      'AMS360',
      'Ezlynx',
      'Ringcentral',
      'Dialpad',
      'Multiple Carrier Platforms'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Jay Alvin has 3 years of insurance experience, specializing in personal lines from Atkinson Insurance Groupe and expanding to commercial lines at Greenway and Patriot Insurance. Throughout his career, he has consistently taken on leadership roles, managing teams of virtual assistants and sales agents. His strengths include workload distribution, team management, and client servicing, showcasing strong organizational and leadership skills. He is also proficient with industry tools like Ezlynx and various carrier systems.',
    
    employmentHistory: [
      {
        company: 'PATRIOT INSURANCE - U.S BASED',
        position: 'Virtual Assistant',
        period: '2023 - 2024',
        description: '• Team Leader / Insurance VA\n• Insurance account for personal and commercial lines\n• Quoting and Service works\n• Managing task and workload distribution for the team'
      },
      {
        company: 'GREENWAY INSURANCE - TX, USA',
        position: 'Freelance Virtual Assistant',
        period: '2022 - 2023',
        description: '• Team Leader - Cutbound program with 10-15 VA\'s\n• Insurance account for personal and commercial lines\n• Managing workload distribution\n• Team management and service works with licensed professionals.'
      },
      {
        company: 'ATKINSON INSURANCE GROUPE - OR, USA',
        position: 'Freelance Virtual Assistant',
        period: '2020 - 2022',
        description: '• Team manager - Handling 8 associates\n• Insurance account for personal lines\n• Managing workload distribution, basis policy changes, Binders, Billing, Payment and Cancellation.\n• Using Ezlynx also familiar with most of the carriers mortgagee system.'
      },
      {
        company: 'AFNI PHIL INC.',
        position: 'Inbound Sales Team Leader',
        period: '2016 - 2020',
        description: '• Inbound Sales Team leader handling 15-20 agents\n• Satellite radio subscription\n• Handling Sale for SiriusXM Satellite radio - US Account\n• Inbound Sales and Retention Department.'
      },
      {
        company: 'WNS INC.',
        position: 'Team Leader',
        period: '2014 - 2016',
        description: '• Team leader handling 20 agents - Global account\n• Travel account - Vacation packages\n• Inside sale Bookings for Airline, Car rental, Hotel and Cruise\n• Accounts are Expedia and Travelocity\n• GDS system is Altheo'
      },
      {
        company: 'PCCW TELESERVICES',
        position: 'Team Leader',
        period: '2012 - 2014',
        description: '• Team leader handling 15-20 agents - Global account\n• Airlines - Travel account International\n• Inside sale for Booking, Ticking and Redemption\n• GDS System are Altheo and Amadeus'
      },
      {
        company: 'UNIVERSAL GENESIS BPO',
        position: 'Outbound/Inbound Sales Agent',
        period: '2008 - 2012',
        description: '• Outbound/Inbound Sales Agent - US Account\n• B2B and B2C Campaign\n• Lead generation\n• Telemarketer'
      }
    ],
    
    discResult: 'S+I',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nInfluence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.',
    
    englishScore: '75',
    englishDescription: 'Shows good communication skills with clear pronunciation and steady fluency. Uses everyday vocabulary and grammar effectively.',
    
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

  return <VAProfilePage vaData={jayAlvinData} />
}
