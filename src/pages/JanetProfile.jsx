import VAProfilePage from '../components/VAProfile/VAProfilePage'

export default function JanetProfile() {
  const janetData = {
    name: 'JANET BALDERAS',
    title: 'ENGLISH-SPEAKING VA | LOAN & MORTGAGE PROCESSING',
    image: '/images/VAs/Janet.webp',
    summary: 'Janet Balderas brings close to two years of experience in the banking sector as a Credit Underwriting Specialist, where she evaluated credit cards, personal loans, salary loans, and mortgage applications. She reviewed and verified borrower documentation, assessed creditworthiness and financial capacity, analyzed income and collateral, detected fraud indicators, and ensured lending decisions aligned with internal risk and compliance policies. Her responsibilities also included coordinating with brokers, validating requirements, tracking loan documentation, and maintaining accuracy throughout the lending process.',
    tagline: 'Janet brings a strong blend of underwriting accuracy, documentation validation, and end-to-end lending support. She evaluates borrowers and manages loan files with precision in high-volume banking environments. Her coordination with brokers and underwriters ensures smooth, compliant workflows across the lending process.',
    videoUrl: 'https://www.youtube.com/embed/ifyF-owgkDw',
    videoThumbnail: 'https://img.youtube.com/vi/ifyF-owgkDw/maxresdefault.jpg',
    thumbnail: '2 YEARS OF Credit Underwriting Specialist LOAN & MORTGAGE PROCESSING, FRAUD DETECTION',
    
    skills: [
      'Credit Underwriting',
      'Loan Application',
      'Mortgage Processing',
      'Document Verification',
      'Financial Capacity Analysis',
      'Collateral Assessment',
      'Fraud Detection',
      'Credit Card Underwriting',
      'Quality Control',
      'Lending Compliance',
      'Workflow Tracking',
      'Record Management'
    ],
    
    tools: [
      'Salesforce',
      'Avaya',
      'AMS 360',
      'Instinct',
      'Cisco Webex',
      'SPI',
      'ACSR',
      'Nuance',
      'Slack',
      'Microsoft Teams',
      'G Suite'
    ],
    
    equipment: [
      'Two-Monitor Setup',
      'Noise-Cancelling Headset'
    ],
    
    employmentSummary: 'Janet has 2 years of experience in credit underwriting and insurance support, gained from her roles at HSBC Data Electronic Processing Inc. and Cover Desk Philippines. At HSBC, she evaluated credit risk by analyzing financial documents, verifying applicant details, and ensuring compliance with credit policies. At Cover Desk, she assisted an insurance agency with policy reviews, administrative tasks, and client communication. She also has a strong background in customer service from her previous roles at AFNI Philippines and Convergys. Additionally, her time at Strave enhanced her attention to detail and quality control through content editing and XML validation. Janet is skilled in analysis, communication, and task management, making her a reliable and efficient professional.',
    
    employmentHistory: [
      {
        company: 'HSBC DATA ELECTRONIC PROCESSING INC.',
        position: 'Credit Underwriting Specialist',
        period: 'MAR 2024 - 2025',
        description: '• Responsible in assessing the credit risk of loan or policy applicants by analyzing financial statements, credit histories, and other documentation to determine creditworthiness.\n• It includes verifying applicant information, performing risk assessments, ensuring compliance with credit policies and regulations, making recommendations on loan approvals or denials, and communicating findings to relevant parties.'
      },
      {
        company: 'COVER DESK PHILIPPINES',
        position: 'Virtual Assistant',
        period: 'DEC 2022 - AUG 2023',
        description: '• Reviewing policies and administrative tasks for an insurance agency including client communication claims follow up.'
      },
      {
        company: 'AFNI PHILIPPINES',
        position: 'Chat Support Representative',
        period: 'JUN 2015 - OCT 2022',
        description: '• Provides customer service, technical support, bill disputes, processing payments, device, data plan upgrade, adding or removing features, enrolling new customers, troubleshooting defective phones.'
      },
      {
        company: 'CONVERGYS',
        position: 'Chat Support Representative',
        period: 'MAR 2014 - JUN 2015',
        description: '• Provides assistance in billing, technical support and customer service to Comcast customers. Sends truck roll when troubleshooting via chat is not possible.'
      },
      {
        company: 'SPI GLOBAL SOLUTIONS INC. (STRAIVE)',
        position: 'PDF Editor/XML Checker/QA Specialist',
        period: 'SEP 2003 - OCT 2008',
        description: '• Responsible for Structuring the input raw file, quality check, parsing and validation, moving the file onto the next stage and forward to copy editors.\n• Responsible to make error-free XML documents, validate XML against a DTD or a schema, and force to stick to a valid XML structure.\n• Checking for things that can be checked manually, such as punctuation, capitalization, figures quality and proofread online contents and documents for factual and grammatical accuracy since the automated QA tool has already caught the technical issues, we focus on the actual transition and not a missing period, proper layout of figures and number of tags.'
      },
      {
        company: 'SPI GLOBAL SOLUTIONS INC. (STRAIVE)',
        position: 'Content Support Specialist',
        period: 'OCT 2008 - JUL 2010',
        description: '• Directly reporting to the Authors of the Journals by providing updates via email, coordinates and integrates the work of writers and designers to help produce a final layout compatible with corporate standards.\n• Collects, produces, and edits website material to maintain and improve the quality of information provided.'
      }
    ],
    
    discResult: 'S',
    discResultDescription: 'Steadiness (S) - Dependable and patient, S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
    
    englishScore: '8.4/9',
    englishDescription: 'Demonstrates excellent fluency and clear pronunciation with natural pacing and tone. Uses advanced vocabulary and complex grammar structures with precision to express ideas confidently and effectively.',
    
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

  return <VAProfilePage vaData={janetData} />
}
