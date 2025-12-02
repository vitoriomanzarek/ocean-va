import React from 'react'
import { 
  FileText, Users, Database, Calendar, BarChart3, 
  CheckCircle2, Building2, Shield, Award, 
  ClipboardCheck, FileCheck, TrendingUp, Settings,
  Zap, Globe, DollarSign, Star
} from 'lucide-react'
import BookingDemo from './components/BookingDemo'
import HeroCTAs from './components/HeroCTAs'
import HeroPlaceholder from './components/HeroPlaceholder'
import WhyOceanSection from './components/WhyOceanSection'
import OutcomesSection from './components/OutcomesSection'
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import { mortgageFaqs } from './data/faqs'

// Helper component for partner logos with fallback
function PartnerLogo({ partner }) {
  const [imgSrc, setImgSrc] = React.useState(partner.logo)
  const [showText, setShowText] = React.useState(false)
  
  const handleError = () => {
    if (partner.fallback && imgSrc === partner.logo) {
      // Try fallback
      setImgSrc(partner.fallback)
    } else {
      // Both failed, show text
      setShowText(true)
    }
  }
  
  return (
    <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
      {!showText ? (
        <img
          src={imgSrc}
          alt={partner.alt}
          className="h-12 md:h-16 w-auto object-contain"
          onError={handleError}
        />
      ) : (
        <span className="text-sm text-gray-500 font-medium text-center">{partner.name}</span>
      )}
    </div>
  )
}

// Helper component for tech stack logos with fallback and modal
function TechLogo({ tool, onOpenModal }) {
  const [imgSrc, setImgSrc] = React.useState(tool.logo)
  const [showText, setShowText] = React.useState(false)
  
  const handleError = () => {
    if (tool.fallback && imgSrc === tool.logo) {
      setImgSrc(tool.fallback)
    } else {
      setShowText(true)
    }
  }
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md border-2 border-ocean-200 hover:border-ocean-500 transition-colors text-center cursor-pointer hover:shadow-lg"
      onClick={() => onOpenModal(tool)}
    >
      {!showText ? (
        <>
          <img
            src={imgSrc}
            alt={tool.name}
            className="h-12 w-auto mx-auto mb-3 object-contain"
            onError={handleError}
          />
          <h3 className="text-lg font-bold text-ocean-700">{tool.name}</h3>
          {tool.fullName && (
            <p className="text-sm text-gray-500 mt-1">{tool.fullName}</p>
          )}
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold text-ocean-700">{tool.name}</h3>
          {tool.fullName && (
            <p className="text-sm text-gray-500 mt-1">{tool.fullName}</p>
          )}
        </>
      )}
    </div>
  )
}

// Modal component for tech stack tool information
function TechModal({ tool, isOpen, onClose }) {
  if (!isOpen || !tool) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-12 w-auto mr-4 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
              {tool.fullName && (
                <p className="text-sm text-gray-500">{tool.fullName}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-ocean-700 mb-2">What is {tool.name}?</h4>
            <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-ocean-700 mb-2">How Our VAs Use It:</h4>
            <p className="text-gray-700 leading-relaxed">{tool.useCase}</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Improved FAQs with more technical detail
const improvedMortgageFaqs = [
  { 
    q: 'What tasks can a mortgage virtual assistant perform for a mortgage broker or lender?', 
    a: 'Our mortgage VAs handle loan file setup, document organization, LOS cleanliness, lender registration (for non-del), initial disclosures, COC\'s, appraisal ordering, initial submission review, closing disclosure preparation, CD balancing, doc drawing, funding conditions, warehouse line registration, trailing documentation, finalizing LOS final figures, file stacking, audit preparation, and pre-qualification documentation review with 1003 completeness and AUS runs.' 
  },
  { 
    q: 'Can a virtual assistant help collect borrower documents and prepare mortgage loan applications?', 
    a: 'Yes. Our VAs collect borrower docs, organize documentation, ensure LOS cleanliness, coordinate with borrowers and partners for missing documents, and prepare loan files for submission. They also handle pre-qualification documentation review, ensuring complete income, asset, credit, and property documents.' 
  },
  { 
    q: 'How can a mortgage virtual assistant assist with closing and funding processes?', 
    a: 'Our VAs handle closing disclosure preparation, CD balancing, doc drawing, funding conditions tracking, and warehouse line registration. They ensure all closing documents are properly prepared and coordinate with all parties involved in the closing process.' 
  },
  { 
    q: 'What is post-closing and QC support from a mortgage virtual assistant?', 
    a: 'Post-closing support includes trailing documentation collection, finalizing LOS final figures, file stacking for compliance, and audit preparation. Our VAs ensure all post-closing requirements are met and files are properly organized for audits.' 
  },
  { 
    q: 'Can a mortgage virtual assistant handle pre-qualification and initial loan setup?', 
    a: 'Yes. Our VAs review pre-qualification documentation, ensure complete income, asset, credit, and property documents, confirm 1003 completeness, and run AUS (Automated Underwriting System) reports. They also handle loan file setup, document organization, and LOS cleanliness from day one.' 
  },
  { 
    q: 'Is it secure to share financial documents and borrower information with a virtual assistant?', 
    a: 'Yes. We follow strict data-security practices with principle-of-least-access, NDA/SOP adherence, secure tools, and audit-friendly workflows. All VAs are trained on mortgage industry compliance and data protection standards.' 
  },
  { 
    q: 'Are Ocean VA\'s mortgage assistants knowledgeable about LOS systems like Encompass, LendingPad, or Calyx?', 
    a: 'Yes. Our mortgage VAs have experience with Encompass, LendingPad, Calyx, ARIVE, DocMagic, CLASS VALUATION, Rocket Mortgage, Flōify, and other common LOS and mortgage technology platforms. They can work with your existing tech stack immediately.' 
  },
  { 
    q: 'Can a mortgage virtual assistant handle initial client inquiries and pre-qualify leads for a loan officer?', 
    a: 'Yes. Our VAs can handle initial client inquiries, review pre-qualification documentation, ensure complete documentation (income, assets, credit, property), confirm 1003 completeness, and run AUS reports. They coordinate with loan officers to ensure leads are properly qualified and documented.' 
  },
  { 
    q: 'How does hiring a virtual assistant help a mortgage office reduce workload and operating costs?', 
    a: 'Our mortgage VAs handle time-consuming administrative tasks like document collection, LOS updates, status communications, and pipeline management, allowing loan officers and processors to focus on originating loans and closing deals. Ocean VA uses a simple flat monthly rate with no setup fees, no lock-in contracts, and free replacements.' 
  },
  { 
    q: 'What is the monthly cost of a mortgage virtual assistant with Ocean VA\'s flat pricing model?', 
    a: 'Ocean VA uses a simple flat monthly rate starting at $750/month with no setup fees, no lock-in contracts, and free replacements. Pricing is tailored to your specific needs and scope of work.' 
  },
  { 
    q: 'Do I need to sign a long-term contract for mortgage virtual assistant services, or is it a flexible month-to-month service?', 
    a: 'Everything is month-to-month. No lock-in or long-term contracts. You can adjust or cancel your service as needed.' 
  },
  { 
    q: 'Are there any setup fees or extra costs to start using a mortgage virtual assistant?', 
    a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service. We also offer free replacements if you\'re not satisfied with your VA.' 
  },
  { 
    q: 'Will I have a dedicated mortgage virtual assistant, or do they work for multiple clients?', 
    a: 'You get one dedicated VA who learns your systems and workflow. We never pool your work across a ticket queue. Your VA becomes an extension of your team.' 
  },
  { 
    q: 'Are Ocean VA\'s mortgage assistants certified or have mortgage industry experience?', 
    a: 'Many of our mortgage VAs have LendingPad Loan Processor certifications and experience working with mortgage companies. We also work with partners like AIME (Association of Independent Mortgage Experts) and are familiar with industry standards and best practices.' 
  }
]

export default function MortgageVA() {
  const [selectedTool, setSelectedTool] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleOpenModal = (tool) => {
    setSelectedTool(tool)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTool(null)
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mortgage Virtual Assistant",
    "provider": {"@type": "Organization", "name": "Ocean Virtual Assistant"},
    "areaServed": "US",
    "description": "Certified mortgage virtual assistants for loan file setup, document collection, LOS updates (Encompass, LendingPad, Calyx), closing and funding support, post-closing QC, and pre-qualification. Trusted by leading mortgage companies.",
    "offers": {"@type": "Offer", "price": "750", "priceCurrency": "USD"},
    "url": "https://www.oceanvirtualassistant.com/industries/mortgage-virtual-assistant"
  }

  // Partners/Certifications logos data
  const partners = [
    { 
      name: 'AIME', 
      logo: 'https://logo.clearbit.com/aime.org', 
      fallback: 'https://www.aime.org/wp-content/uploads/2021/06/AIME-Logo-Color.png',
      alt: 'AIME - Association of Independent Mortgage Experts' 
    },
    { 
      name: 'Encompass', 
      logo: 'https://logo.clearbit.com/encompass.com', 
      fallback: 'https://www.elliemae.com/sites/default/files/2021-06/encompass-logo.png',
      alt: 'Encompass by Ellie Mae' 
    },
    { 
      name: 'LendingPad', 
      logo: 'https://logo.clearbit.com/lendingpad.com', 
      fallback: 'https://www.lendingpad.com/wp-content/uploads/2021/01/lendingpad-logo.png',
      alt: 'LendingPad Loan Processor Certified Badge' 
    },
    { 
      name: 'ARIVE', 
      logo: 'https://logo.clearbit.com/arive.com', 
      fallback: 'https://www.arive.com/images/arive-logo.png',
      alt: 'ARIVE' 
    },
    { 
      name: 'Next Door Lending', 
      logo: 'https://logo.clearbit.com/nextdoorlending.com', 
      fallback: 'https://www.nextdoorlending.com/images/logo.png',
      alt: 'Next Door Lending' 
    },
    { 
      name: 'EDGE Home Finance', 
      logo: 'https://logo.clearbit.com/edgehomefinance.com', 
      fallback: 'https://www.edgehomefinance.com/images/edge-logo.png',
      alt: 'EDGE Home Finance' 
    },
    { 
      name: 'C2 Financial', 
      logo: 'https://logo.clearbit.com/c2financial.com', 
      fallback: 'https://www.c2financial.com/images/c2-logo.png',
      alt: 'C2 Financial' 
    }
  ]

  // Tech Stack tools with descriptions
  const techStack = [
    { 
      name: 'Calyx', 
      logo: 'https://logo.clearbit.com/calyxsoftware.com',
      fallback: 'https://www.calyxsoftware.com/images/calyx-logo.png',
      description: 'Calyx is a comprehensive loan origination system (LOS) that helps mortgage professionals manage the entire loan process from application to closing. Our VAs are experienced in document management, workflow automation, and loan file processing within Calyx.',
      useCase: 'Document organization, loan file setup, and pipeline management'
    },
    { 
      name: 'UWM', 
      logo: 'https://logo.clearbit.com/uwm.com',
      fallback: 'https://www.uwm.com/images/uwm-logo.png',
      fullName: 'United Wholesale Mortgage',
      description: 'United Wholesale Mortgage (UWM) is one of the largest wholesale mortgage lenders in the US. Our VAs understand UWM\'s systems and processes, helping with loan submissions, status tracking, and partner coordination.',
      useCase: 'Loan submissions, status tracking, and lender communications'
    },
    { 
      name: 'ARIVE', 
      logo: 'https://logo.clearbit.com/arive.com',
      fallback: 'https://www.arive.com/images/arive-logo.png',
      description: 'ARIVE is a modern loan origination platform designed for mortgage brokers. Our VAs are proficient in ARIVE\'s interface, handling loan applications, document collection, and borrower communications.',
      useCase: 'Loan applications, document management, and borrower outreach'
    },
    { 
      name: 'DocMagic', 
      logo: 'https://logo.clearbit.com/docmagic.com',
      fallback: 'https://www.docmagic.com/images/docmagic-logo.png',
      description: 'DocMagic is a document generation and e-signature platform for mortgage professionals. Our VAs use DocMagic to prepare closing documents, manage e-signatures, and ensure compliance with lending regulations.',
      useCase: 'Document generation, e-signatures, and compliance management'
    },
    { 
      name: 'Encompass', 
      logo: 'https://logo.clearbit.com/encompass.com',
      fallback: 'https://www.elliemae.com/sites/default/files/2021-06/encompass-logo.png',
      description: 'Encompass by Ellie Mae is the industry-leading loan origination system. Our VAs have extensive experience with Encompass workflows, including loan file setup, conditions tracking, document management, and pipeline reporting.',
      useCase: 'Complete LOS management, from application to closing'
    },
    { 
      name: 'CLASS VALUATION', 
      logo: 'https://logo.clearbit.com/classvaluation.com',
      fallback: 'https://www.classvaluation.com/images/class-logo.png',
      description: 'CLASS VALUATION provides appraisal management services for mortgage lenders. Our VAs coordinate with CLASS VALUATION to order appraisals, track status, and ensure timely completion for loan closings.',
      useCase: 'Appraisal ordering, status tracking, and vendor coordination'
    },
    { 
      name: 'LendingPad', 
      logo: 'https://logo.clearbit.com/lendingpad.com',
      fallback: 'https://www.lendingpad.com/wp-content/uploads/2021/01/lendingpad-logo.png',
      description: 'LendingPad is a cloud-based loan origination system popular with mortgage brokers. Many of our VAs are LendingPad certified processors, experienced in loan processing, document management, and borrower communication.',
      useCase: 'Certified loan processing and LOS management'
    },
    { 
      name: 'Rocket Mortgage', 
      logo: 'https://logo.clearbit.com/rocketmortgage.com',
      fallback: 'https://www.rocketmortgage.com/images/rocket-logo.png',
      description: 'Rocket Mortgage is a leading digital mortgage platform. Our VAs understand Rocket Mortgage\'s processes and can assist with loan file coordination, document collection, and status updates for brokers working with Rocket.',
      useCase: 'Loan coordination and status management with Rocket Mortgage'
    },
    { 
      name: 'Flōify', 
      logo: 'https://logo.clearbit.com/floify.com',
      fallback: 'https://www.floify.com/images/floify-logo.png',
      description: 'Flōify is a loan origination software designed for mortgage brokers and loan officers. Our VAs use Flōify to manage loan applications, collect borrower documents, send status updates, and coordinate with all parties in the loan process.',
      useCase: 'Loan application management and borrower communication portal'
    }
  ]

  // Workflow processes
  const workflowProcesses = [
    {
      title: 'Loan Setup & Processing',
      icon: FileText,
      tasks: [
        'Document organization',
        'LOS cleanliness',
        'Lender registration (for non-del)',
        'Initial disclosures',
        'COC\'s (Change of Circumstance)',
        'Appraisal ordering',
        'Initial submission review'
      ]
    },
    {
      title: 'Closing and Funding',
      icon: CheckCircle2,
      tasks: [
        'Closing disclosure',
        'CD balancing',
        'Doc drawing',
        'Funding conditions',
        'Warehouse line registration'
      ]
    },
    {
      title: 'Post-Closing and QC',
      icon: ClipboardCheck,
      tasks: [
        'Trailing documentation',
        'Finalizing LOS final figures',
        'File stacking',
        'Audit preparation'
      ]
    },
    {
      title: 'Pre-Qualification Checklist',
      icon: FileCheck,
      tasks: [
        'Review pre-qualification documentation',
        'Ensure complete income, asset, credit, and property documents',
        'Confirm 1003 completeness',
        'AUS run'
      ]
    }
  ]

  // Improved Use Cases with more technical detail
  const useCases = [
    { 
      icon: FileText, 
      title: 'Loan File Setup', 
      description: 'Loan file setup, document organization, LOS cleanliness, lender registration (for non-del), initial disclosures, and COC\'s management' 
    },
    { 
      icon: Users, 
      title: 'Document Collection', 
      description: 'Borrower and partner outreach for missing docs, ensuring complete income, asset, credit, and property documentation' 
    },
    { 
      icon: Database, 
      title: 'LOS Updates', 
      description: 'LOS updates and conditions tracking in Encompass, LendingPad, Calyx, ARIVE, and other platforms' 
    },
    { 
      icon: Calendar, 
      title: 'Status Communications', 
      description: 'Status calls/emails, calendar coordination, and milestone reminders to keep borrowers informed' 
    },
    { 
      icon: BarChart3, 
      title: 'Pipeline Summaries', 
      description: 'Weekly pipeline summaries for LO/processor teams with detailed status updates and condition tracking' 
    },
    {
      icon: CheckCircle2,
      title: 'Closing & Funding',
      description: 'Closing disclosure preparation, CD balancing, doc drawing, funding conditions, and warehouse line registration'
    }
  ]

  // Why Ocean VA specific benefits for mortgage
  const mortgageBenefits = [
    {
      icon: Award,
      title: 'Certified Mortgage Processors',
      description: 'Many of our VAs have LendingPad Loan Processor certifications and real-world mortgage industry experience'
    },
    {
      icon: Building2,
      title: 'LOS Expertise',
      description: 'Hands-on experience with Encompass, LendingPad, Calyx, ARIVE, DocMagic, and other mortgage technology platforms'
    },
    {
      icon: Shield,
      title: 'Compliance & Security',
      description: 'Strict data-security practices, NDA/SOP adherence, and audit-friendly workflows for mortgage industry compliance'
    },
    {
      icon: Globe,
      title: 'Bilingual Support',
      description: 'English-Spanish support for borrower communications and partner coordination'
    }
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-700 via-ocean-600 to-ocean-500 text-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Mortgage Virtual Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-ocean-50">
                Keep files moving and borrowers informed. Your certified mortgage VA supports doc collection, LOS updates (Encompass, LendingPad, Calyx), status calls, closing and funding, and milestone reminders.
              </p>
              <HeroCTAs />
            </div>

            {/* Right Column - Image Placeholder */}
            <div>
              <HeroPlaceholder 
                title="Mortgage VA Hero Image"
                description="Mortgage professionals managing loan files, documentation, and client coordination. (1200x800px recommended)"
                imageSrc="/images/Industries/mortgage-va-hero.webp"
                imageAlt="Mortgage Virtual Assistant managing loan files and documentation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Certifications Section - Full Width */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Mortgage Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Certified by industry leaders and trusted by mortgage professionals across the US
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 max-w-7xl mx-auto items-center">
            {partners.map((partner, idx) => (
              <PartnerLogo key={idx} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Workflow Process Section - Ocean Brand Colors - Full Width */}
      <section className="w-full bg-gradient-to-br from-ocean-900 via-ocean-700 to-ocean-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mortgage VA Workflow Process
            </h2>
            <p className="text-xl text-ocean-100 max-w-3xl mx-auto">
              Comprehensive support across the entire loan lifecycle—from pre-qualification to post-closing QC
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {workflowProcesses.map((process, idx) => (
              <div 
                key={idx} 
                className="bg-ocean-800/50 backdrop-blur-sm border border-ocean-600 rounded-xl p-8 hover:border-ocean-500 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-ocean-500 p-3 rounded-lg mr-4">
                    <process.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{process.title}</h3>
                </div>
                <ul className="space-y-3">
                  {process.tasks.map((task, taskIdx) => (
                    <li key={taskIdx} className="flex items-start text-ocean-100">
                      <CheckCircle2 className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section - Improved */}
      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your mortgage VA handles the coordination that keeps your loan pipeline moving—from initial setup to closing and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-ocean-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section - Full Width */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Work With Your Tech Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Some of our client's tools. Our mortgage VAs have hands-on experience with the exact systems your company uses daily. Click on any tool to learn more.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {techStack.map((tool, idx) => (
              <TechLogo key={idx} tool={tool} onOpenModal={handleOpenModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Modal */}
      <TechModal 
        tool={selectedTool} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      {/* Pre-Qualification Section */}
      <section className="section-container bg-white py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-ocean-600 to-ocean-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-3 rounded-lg mr-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Pre-Qualification Support</h2>
            </div>
            <p className="text-xl text-ocean-50 mb-8">
              Our mortgage VAs handle pre-qualification documentation review and ensure your loan files are ready for processing from day one.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Review pre-qualification documentation',
                'Ensure complete income, asset, credit, and property documents',
                'Confirm 1003 completeness',
                'AUS run (Automated Underwriting System)'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start bg-white/10 rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-ocean-200 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-ocean-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Ocean VA - Mortgage Specific - Full Width */}
      <div className="w-full bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhyOceanSection 
            subtitle="Mortgage support that keeps your loan pipeline moving and borrowers informed."
            benefits={mortgageBenefits}
            noBackground={true}
          />
        </div>
      </div>

      <Pricing />

      {/* Outcomes Section - Full Width */}
      <div className="w-full bg-ocean-600 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OutcomesSection 
            subtitle="Real results that improve your mortgage operations."
            outcomes={[
              { icon: '📋', title: 'Fewer Stalled Files', description: 'Fewer stalled files and clearer status with proactive document collection and LOS updates' },
              { icon: '😊', title: 'Better Experience', description: 'Better borrower experience with timely status communications and milestone reminders' },
              { icon: '💼', title: 'More Time to Originate', description: 'More time for loan officers to originate while VAs handle administrative coordination' },
              { icon: '✅', title: 'Compliance Ready', description: 'Audit-ready files with proper documentation, file stacking, and trailing document management' }
            ]}
            noBackground={true}
          />
        </div>
      </div>

      <BookingDemo id="booking" />

      {/* FAQ Section - Full Width */}
      <div className="w-full bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={improvedMortgageFaqs} noBackground={true} />
        </div>
      </div>

      {/* Final CTA Section - Full Width */}
      <section className="w-full bg-ocean-700 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your Loan Pipeline?</h2>
            <p className="text-xl mb-8 text-ocean-100">
              Get started today with a dedicated mortgage VA who keeps your files moving and borrowers informed. 
              Certified processors with LOS expertise ready to support your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#booking" 
                onClick={(e) => handleScroll(e, 'booking')}
                className="bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Book a Discovery Call
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => handleScroll(e, 'pricing')}
                className="bg-ocean-600 hover:bg-ocean-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white transition-all duration-200 cursor-pointer"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

