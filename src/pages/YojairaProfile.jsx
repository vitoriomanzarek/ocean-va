import React from 'react';

const AnahiProfile = () => {
  const vaData = {
    nombre: 'Anahi',
    titulo: 'BILINGUAL VA | INSURANCE SUPPORT SPECIALIST',
    resumen: 'Anahi Adame is an insurance professional with four years of experience supporting U.S. homeowners insurance agencies across 20 states. She manages endorsements, renewals, new business reviews, and policy updates while ensuring compliance and accurate documentation. Skilled in handling mortgage updates, cancellations, billing, and proof of insurance, Anahi combines technical accuracy with strong coordination and adaptability across regulatory environments.',
    
    skills: [
      'Quoting',
      'Endorsements',
      'Mortgage Updates',
      'Renewals',
      'Cancellations',
      'Billing',
      'COI Generation',
      'Customer Service',
      'Policy Assistance',
      'Document Management',
      'Compliance'
    ],

    tools: [
      'Carrier\'s Platform',
      'Microsoft Office',
      'RingCentral',
      'Nextiva',
      'InContact',
      'Microsoft Teams',
      'Zoom Workplace'
    ],

    equipment: [],

    employment: [
      {
        company: 'HOMEOWNERS OF AMERICA INS CO',
        position: 'CUSTOMER SERVICE REPRESENTATIVE',
        period: 'AUG 2021 - 2025',
        description: [
          'Started in the mortgage department; currently working in the customer service department assisting customers with basic coverage questions they might have and doing new business reviews in between calls.'
        ]
      },
      {
        company: 'UBER AND LYFT DRIVER LONGVIEW, TEXAS',
        position: 'SELF-EMPLOYED DRIVER',
        period: 'JAN 2017 - 2019',
        description: [
          'Became self-employee for almost a year.',
          'I would drive customers to places and was require to maintain a 4.5 or above rating.',
          'This job gave me a chance to meet many people from around the world.'
        ]
      },
      {
        company: 'E-Z MART CO. LONGVIEW, TEXAS',
        position: 'CASHIER / ASSISTANT MANAGER / STORE MANAGER',
        period: '2012 - 2018',
        description: [
          'Started as a cashier in October of 2012 was promoted to assistant manager after a month.',
          'After 2 months I became a store manager and managed my hiring store for one year and got transfer around helping stores with their budgets and inventory.',
          'After 6 years of service to this family own company they decided to sell to a bigger company and that\'s when I decided to become self-employed.'
        ]
      }
    ],

    disc: {
      type: 'C+S',
      description: 'Conscientiousness (C) - Detail-oriented and organized. Anahi structures systems and maintains structured systems and delivers high-quality work. Steadiness (S) - Dependable and patient. Anahi provides consistent support, builds strong client relationships and adaptable smooth workflows.'
    },

    english: {
      score: '80',
      description: 'Communicates clearly with generally good pronunciation and natural pacing. Uses a natural range of vocabulary and grammar with confidence and generally accurate to express ideas with confidence and effectiveness.'
    },

    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: true, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: false, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],

    education: [
      {
        institution: 'HOMEOWNERS OF AMERICA INS CO',
        credential: 'INSURANCE TRAINING PROGRAM',
        year: '2021'
      }
    ],

    disponibilidad: 'Full Time',
    idiomas: 'Bilingual (EN-ES)',
    años_experiencia: 4,
    especialización: ['Homeowners Insurance'],
    nivel_inglés: 'Proficient',
    slug: 'anahi-ocean-va-profile',
    imagen: '/images/VAs/Anahi.webp'
  };

  return (
    <div>
      {/* This component is for data structure reference */}
      <pre>{JSON.stringify(vaData, null, 2)}</pre>
    </div>
  );
};

export default AnahiProfile;
