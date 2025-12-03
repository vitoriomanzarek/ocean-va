import React from 'react';

const TriciaProfile = () => {
  const vaData = {
    nombre: 'Tricia',
    titulo: 'ENGLISH-SPEAKING VA | INSURANCE ASSISTANT',
    resumen: 'TJ is an Insurance Virtual Assistant with over two years of experience in personal lines, including home, auto, motorcycle, umbrella, and boat insurance. She manages quoting, renewals, endorsements, cross-selling, and lender communications, ensuring policy accuracy and client satisfaction. Skilled in EZLynx and major U.S. carrier portals, she also supports retention through automated email marketing campaigns.',
    
    skills: [
      'Quoting',
      'Renewals',
      'Endorsements',
      'Policy Updates',
      'Carrier Communications',
      'Evidence of Insurance',
      'Document Management',
      'Cross-Selling',
      'Retention Support',
      'Email Campaigns',
      'Administrative Support'
    ],

    tools: [
      'EZLynx',
      'Applied Epic',
      'HawkSoft',
      'AMS360',
      'PL Rater',
      'GoTru',
      'Microsoft Office Suite',
      'Canva',
      'Zoom Workplace'
    ],

    equipment: [],

    employment: [
      {
        company: 'WESTERN INSURANCE ASSOCIATES',
        position: 'INSURANCE VIRTUAL ASSISTANT',
        period: 'APRIL 2023 - SEPTEMBER 2025',
        description: [
          'Assists the Account Manager with quoting home, auto, umbrella and other policies.',
          'Also process servicing tasks such as mortgagee updates, lienholder change, cross referencing and sending emails to the insured.'
        ]
      },
      {
        company: 'RMR GROUP OF COMPANIES - ST. ANSELM BUSINESS DEV. CORP.',
        position: 'LEASE ADMIN OFFICER / MALL MANAGER',
        period: 'MARCH 2023 - MAY 2024',
        description: [
          'Manages the entire building including the structure or properties within the premises.',
          'Plans Marketing Activities. Helps with the tenant concerns, dispatching and scheduling of drivers, security and housekeeping matters.'
        ]
      },
      {
        company: 'WORLD ENGLISH REVIEWS',
        position: 'ADMIN ASSISTANT / OFFICE STAFF',
        period: 'AUG 2021 - SEPT 2022',
        description: [
          'Communicate with the clients, manager and supervisor.',
          'Facilitate students\' practice tests for the International English Language Testing System.',
          'Also helps with the marketing of the services offered.'
        ]
      }
    ],

    disc: {
      type: 'C+S',
      description: 'Conscientiousness (C) - Detail-oriented and organized. Tricia structures systems and delivers high-quality work. Steadiness (S) - Dependable and patient. Tricia provides consistent support and builds reliable relationships and adaptable smooth workflows.'
    },

    english: {
      score: '6.7/9',
      description: 'Communicates clearly with generally good pronunciation and fluency. Uses a diverse range of vocabulary and grammar structures effectively.'
    },

    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],

    education: [
      {
        institution: 'WESTERN INSURANCE ASSOCIATES',
        credential: 'INSURANCE TRAINING PROGRAM',
        year: '2023'
      }
    ],

    disponibilidad: 'Full Time',
    idiomas: 'English',
    años_experiencia: 2,
    especialización: ['Home Insurance', 'Auto Insurance'],
    nivel_inglés: 'Proficient',
    slug: 'tricia-ocean-va-profile',
    imagen: '/images/VAs/Tricia.webp',
    videoId: '[VIDEO_ID_NEEDED]'
  };

  return (
    <div>
      {/* This component is for data structure reference */}
      <pre>{JSON.stringify(vaData, null, 2)}</pre>
    </div>
  );
};

export default TriciaProfile;
