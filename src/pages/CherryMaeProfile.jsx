import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function CherryMaeProfile() {
  const cherryMaeData = {
    name: 'CHERRY MAE',
    title: 'INSURANCE VIRTUAL ASSISTANT | DATA ENTRY SPECIALIST',
    image: '/images/VAs/Cherry Mae.webp',
    summary: 'With one year of experience in the U.S. insurance industry, Cherry Mae is a dependable Virtual Assistant specializing in personal lines. She provides brokers with accurate and efficient support by preparing quotes, managing compliant data entry across carrier portals, and ensuring organized, error-free documentation for client satisfaction.',
    tagline: 'Cherry Mae combines precision, organization, and strong administrative support skills to ensure seamless insurance operations for brokers and clients alike.',
    videoUrl: 'https://www.youtube.com/embed/DIfncidHCpY',
    videoThumbnail: 'https://img.youtube.com/vi/DIfncidHCpY/maxresdefault.jpg',
    thumbnail: 'Personal lines insurance, Data entry expertise, Administrative support',
    
    skills: [
      'Accuracy Audits & Compliance Checking',
      'Personal Lines Quoting & Renewals',
      'Client Data Management',
      'Quote Comparison & Remarketing',
      'Administrative & Broker Support',
      'Policy Documentation & Verification',
      'Watercraft Motorcycle and Recreational Vehicle Quoting',
      'Insurance Data Entry & Recpro Maintenance'
    ],
    
    tools: [
      'Applied Epic',
      'Quickbooks',
      'Canva',
      'Slack',
      'Loom',
      'Krisp',
      'Microsoft Office',
      'Citrix Workspace',
      'Notion',
      'Zoom Workplace',
      'Docusign',
      'Capcut'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Cherry Mae has 1 year of insurance experience, where she gained her Personal Lines Insurance experience as an Insurance Virtual Assistant at Support Zebra (BPO). In this role, she demonstrated strong attention to detail by reviewing and verifying quote sheets, entering customer data into carrier websites, and maintaining a zero-error rate in data entry. She excels in data analysis, identifying sales opportunities, and managing accounts receivable, as shown by her work as a Sales Accounting Specialist. Her strengths also include meticulous financial record-keeping, invoice processing, and ensuring compliance with financial policies. Additionally, she has proven customer service skills, providing timely and professional support while consistently meeting performance metrics.',
    
    employmentHistory: [
      {
        company: 'SUPPORT ZEBRA (BPO)',
        position: 'Insurance Virtual Assistant',
        period: '2024 - 2025',
        description: '• Reviewed and verified quote sheets based on broker requests, flagging missing or inconsistent data to clarify policy details and resolve discrepancies.\n• Entering customer data into multiple carrier websites.\n• Developed and sent PDF quotes to brokers, including emails detailing rates and premiums.\n• Created and maintained detailed comparison spreadsheets to support client decision-making and streamline policy selection.\n• Scrubbed and organized client records in internal databases, improving data integrity and enhancing follow-up efficiency.\n• KPI: Maintained a zero-error rate in insurance data entry through validation and compliance with standard processes.'
      },
      {
        company: 'BOOM MARINE CORPORATION',
        position: 'Sales Accounting Specialist',
        period: '2018 - 2024',
        description: '• Analyzing sales performance data, revenue trends, and product performance.\n• Identifying sales opportunities, risks, and patterns.\n• Managed Accounts Receivable by issuing invoices and generating Aged Receivable Analysis, which strengthened collection efforts and reduced overdue accounts.\n• Allocated purchase orders and booked customer orders based on actual production and available stock, ensuring timely fulfillment and efficient inventory use.\n• Handled daily cash deposits and petty cash with accurate reconciliation, while collaborating with sales and finance teams to align targets and improve forecasting.'
      },
      {
        company: 'GOODFORCE TRADING, INC.',
        position: 'Accounts Payable Specialist',
        period: '2017 - 2018',
        description: '• Processed and verified a high volume of vendor invoices with accuracy, ensuring compliance with company policies and payment terms.\n• Matched purchase orders, receipts, and invoices (3-way matching) to prevent discrepancies and unauthorized payments.\n• Prepared and scheduled vendor payments via checks, bank transfers, and other payment methods, ensuring timely disbursements.\n• Maintained vendor files and reconciled monthly statements to resolve outstanding balances or disputes.\n• Assisted in month-end closing activities by preparing accounts payable reports and supporting documentation.\n• Coordinated with procurement and warehouse teams to resolve billing and delivery discrepancies.\n• Ensured compliance with internal controls and audit requirements.'
      },
      {
        company: 'AZPIRED, INC. (BPO)',
        position: 'Customer Service Representative (E-Commerce)',
        period: '2017 - 2018',
        description: '• Delivered timely and professional support through email and chat, addressing customer inquiries, order issues, refunds, and product concerns.\n• Maintained a high level of customer satisfaction by providing clear resolutions and proactive communication.\n• Documented customer interactions and resolutions in the system to ensure accurate records and smooth follow-ups.\n• Assisted customers with order tracking, product information, returns, and replacements, ensuring a seamless shopping experience.\n• Met and exceeded performance metrics, including response time, accuracy, and customer satisfaction ratings.'
      }
    ],
    
    discResult: 'S+C',
    discResultDescription: 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.\n\nConscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
    
    englishScore: '95',
    englishDescription: 'Shows exceptional fluency and clear pronunciation with natural, confident delivery. Uses advanced vocabulary and complex grammar accurately to express nuanced and well-structured ideas.',
    
    cefr: [
      { label: 'A1', active: false, description: 'Can understand and use familiar everyday expressions and basic questions about personal details.' },
      { label: 'A2', active: false, description: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.' },
      { label: 'B1', active: false, description: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.' },
      { label: 'B2', active: false, description: 'Can communicate confidently in a variety of academic and professional environments.' },
      { label: 'C1', active: true, description: 'Can use the language flexibly and effectively for social, academic and professional purposes.' },
      { label: 'C2', active: false, description: 'Can understand with ease virtually everything heard or read and can summarize information from different sources.' }
    ],
    
    education: {
      school: 'Tagoloan Community College',
      degree: 'Bachelor of Science in Business Administration - Finance',
      date: '2008 - 2012'
    }
  }

  return <VAProfilePage vaData={cherryMaeData} />
}
