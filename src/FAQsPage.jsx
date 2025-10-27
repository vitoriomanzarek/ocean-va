import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQsPage() {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqCategories = [
    {
      id: 'insurance-va',
      title: 'Insurance Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does an Insurance Virtual Assistant do?', a: 'Handle policy servicing, customer service, back office operations, AMS data entry, document management, and multilingual support.' },
        { q: 'Can a VA manage policy servicing and renewals?', a: 'Yes. COIs, endorsements, renewals, mortgagee changes, loss runs, and claims documentation.' },
        { q: 'Do you handle AMS and CRM systems?', a: 'Yes. Applied Epic, AMS360, EZLynx, and other insurance software.' },
        { q: 'Can a VA provide customer service for insurance clients?', a: 'Yes. Inbound calls, emails, policy questions, payment processing, and appointment scheduling.' },
        { q: 'Do you support multilingual operations?', a: 'Yes. 10+ languages including English & Spanish for diverse client bases.' },
        { q: 'Can a VA help with back office and accounting?', a: 'Yes. Document management, accounting tasks, reconciliation, reporting, and database cleanup.' },
        { q: 'Are your VAs familiar with insurance processes?', a: 'Yes. Trained in insurance terminology, compliance, and industry best practices.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week). No setup fees. Month-to-month.' },
        { q: 'What if the VA isn\'t a fit?', a: 'We replace and retrain at no cost.' },
        { q: 'How do we get started?', a: 'Discovery call → shortlist candidates → interviews → onboarding → go live in 2–3 days.' },
      ]
    },
    {
      id: 'insurance-csr',
      title: 'Insurance Customer Service Virtual Assistant',
      count: 12,
      faqs: [
        { q: 'What tasks can an insurance customer service virtual assistant handle for an insurance agency?', a: 'Typical tasks include policy servicing (endorsements, renewals), COIs and accord forms, quote intake, carrier communications, claims follow‑ups, CRM/AMS updates, and inbox/phone coverage.' },
        { q: 'Can a virtual insurance assistant manage claims processing and policy renewals remotely?', a: 'Yes. Your VA can coordinate claims follow‑ups, gather documentation, and manage renewals and endorsements while keeping your AMS up to date.' },
        { q: 'How can an insurance virtual assistant improve customer service for my insurance agency?', a: 'By handling policy servicing, COIs, quote intake, carrier communications, claims follow‑ups, CRM/AMS updates, and inbox/phone coverage, freeing your team to focus on sales and client relationships.' },
        { q: 'Are insurance virtual assistants familiar with common insurance software and CRM systems?', a: 'We commonly work in Applied Epic/AMS360/EZLynx, QuoteRush and similar insurance tools. Your VA will use the systems you specify.' },
        { q: 'Is it secure to share client policy information and claims data with a virtual assistant?', a: 'Yes. We follow strict data‑security practices with principle‑of‑least‑access, NDA/SOP adherence, secure tools, and audit‑friendly workflows.' },
        { q: 'How much does it cost to hire an insurance customer service virtual assistant per month?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements—your quote is tailored to role and scope after a quick discovery call.' },
        { q: 'Is hiring a virtual assistant for insurance more cost-effective than an in-house customer service rep?', a: 'Yes. Ocean VA offers flat monthly pricing with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Can I hire an insurance virtual assistant on a part-time basis, or do they only work full-time?', a: 'Yes. We match your preferred time zone and business hours; extended or round‑the‑clock coverage can be arranged by assigning more than one VA.' },
        { q: 'Will my insurance virtual assistant be dedicated to my agency, or do they work for multiple clients?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
        { q: 'What training do Ocean VA\'s insurance VAs receive to understand insurance processes and terminology?', a: 'We vet the top 1% of applicants with a ~30‑day process and industry‑specific training so your VA arrives job‑ready, with ongoing coaching from our team.' },
        { q: 'Are Ocean VA\'s insurance customer service assistants bilingual in English and Spanish?', a: 'Yes. Many of our assistants are bilingual (English and Spanish). All VAs are fluent in professional English; we can match Spanish support on request.' },
        { q: 'Do I need to sign a long-term contract to use an insurance virtual assistant service?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
      ]
    },
    {
      id: 'admin-assistant',
      title: 'Virtual Administrative Assistant',
      count: 10,
      faqs: [
        { q: 'What does a Virtual Administrative Assistant handle at Ocean VA?', a: 'Calendar, inbox, travel, documents, data entry, research, reporting, and stakeholder coordination.' },
        { q: 'Can a VAA manage my email and calendar end-to-end?', a: 'Yes—priority sorting, responses from templates, meeting booking, buffers, and daily digests.' },
        { q: 'Do you work in my time zone?', a: 'Yes. Your business hours, with optional extended or split coverage.' },
        { q: 'Which tools do you support?', a: 'Google Workspace, Microsoft 365, Slack/Teams, Notion, Asana, Trello, ClickUp, Airtable, Zoom.' },
        { q: 'Can you prepare documents and presentations?', a: 'Yes—docs, decks, spreadsheets, and templates to your brand guidelines.' },
        { q: 'Do you handle travel bookings?', a: 'Yes—flights, hotels, cars, multi-city itineraries, and change management.' },
        { q: 'Are your assistants bilingual?', a: 'Yes—English & Spanish.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week). No setup fees. Month-to-month.' },
        { q: 'What if the assistant isn\'t a fit?', a: 'We replace and retrain at no cost.' },
        { q: 'How do we start?', a: 'Discovery → access & priorities → go live in 2–3 days.' },
      ]
    },
    {
      id: 'customer-service',
      title: 'Customer Service Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What tasks can a customer service virtual assistant take on to improve my customer support?', a: 'VAs cover phones, email, chat, help‑desk tickets, returns/exchanges, order/status questions, and feedback follow‑ups while documenting everything in your system.' },
        { q: 'Can a virtual customer service assistant answer phone calls and respond to customer emails for my business?', a: 'Yes. Your VA can handle phones, emails, chat, and ticketing while maintaining your brand voice and documentation standards.' },
        { q: 'How can a customer service virtual assistant help increase customer satisfaction and retention?', a: 'By providing responsive, professional support across all channels while documenting interactions and following up on feedback.' },
        { q: 'Will a virtual customer service representative be able to use my helpdesk software or CRM system?', a: 'We\'re comfortable with Zendesk/Freshdesk, Gorgias, Intercom, and CRMs like HubSpot or Salesforce.' },
        { q: 'Is outsourcing customer support to a virtual assistant a cost-effective solution for my company?', a: 'Yes. Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to commit to a long-term contract for Ocean VA\'s customer service assistant services?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Are there any setup fees to get started with a virtual customer service assistant?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
        { q: 'Will I have one dedicated virtual customer service rep for my business or multiple assistants handling inquiries?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
        { q: 'Can a customer service virtual assistant work during my business hours or provide support 24/7 if needed?', a: 'Yes. We match your preferred time zone and business hours; extended coverage can be arranged by assigning more than one VA.' },
        { q: 'Is it safe to give a virtual assistant access to customer data and our customer databases?', a: 'We follow strict data‑security practices with principle‑of‑least‑access, NDA/SOP adherence, secure tools, and audit‑friendly workflows.' },
      ]
    },
    {
      id: 'marketing-assistant',
      title: 'Marketing Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does a marketing virtual assistant do, and how can they support my marketing efforts?', a: 'VAs typically take on repeatable admin, scheduling, customer comms, documentation, and data upkeep so your team can focus on high‑value work.' },
        { q: 'How can a virtual marketing assistant help manage my company\'s social media accounts and engagement?', a: 'Yes—VAs can staff live chat, social channels, and shared inboxes using your scripts and tone guidelines.' },
        { q: 'Can a marketing virtual assistant create content or manage my blog and email newsletter campaigns?', a: 'Yes. Your VA can draft posts, blogs, emails, and simple graphics, schedule content, and support paid ads under your strategy and approvals.' },
        { q: 'Will a marketing VA be familiar with tools like SEO software, social media schedulers, or CRM systems?', a: 'We adapt to your software stack quickly, including Hootsuite, Buffer, Mailchimp, and similar tools.' },
        { q: 'How can a virtual marketing assistant help a small business run marketing campaigns more effectively?', a: 'By handling content creation, scheduling, social media management, and campaign coordination so your team can focus on strategy.' },
        { q: 'Is hiring a marketing virtual assistant a cost-effective way to expand my marketing team?', a: 'Yes. Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to sign a long-term contract for marketing virtual assistant services, or is it flexible?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Are there any setup fees or onboarding costs for starting with a marketing VA from Ocean VA?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
        { q: 'Do I get a dedicated marketing assistant focused solely on my business and campaigns?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
        { q: 'Can a marketing virtual assistant run bilingual marketing campaigns in both English and Spanish?', a: 'Yes. Many of our assistants are bilingual (English and Spanish). All VAs are fluent in professional English.' },
      ]
    },
    {
      id: 'general-va',
      title: 'General Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does a General Virtual Assistant do?', a: 'Handle admin tasks, customer support, marketing, sales support, operations, data entry, vendor coordination, and light bookkeeping.' },
        { q: 'Can a VA manage multiple areas of my business?', a: 'Yes—inbox, calendar, customer service, marketing, sales support, and operations all in one dedicated VA.' },
        { q: 'Which tools and platforms do you support?', a: 'Google Workspace, Microsoft 365, Slack/Teams, HubSpot, Salesforce, Zoho, Asana, Trello, ClickUp, and your preferred business tools.' },
        { q: 'Do you handle customer service and support?', a: 'Yes—phone, chat, email, ticketing, appointment booking, and customer follow-ups.' },
        { q: 'Can a VA help with marketing tasks?', a: 'Yes—social media posting, email campaigns, content updates, reporting, and CRM management.' },
        { q: 'Do you support sales and lead management?', a: 'Yes—list building, email sequencing, CRM hygiene, lead follow-ups, and sales support.' },
        { q: 'Are your VAs bilingual?', a: 'Yes—English & Spanish support available.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week). No setup fees. Month-to-month.' },
        { q: 'What if the VA isn\'t a fit?', a: 'We replace and retrain at no cost.' },
        { q: 'How do we get started?', a: 'Discovery call → shortlist candidates → interviews → onboarding → go live in 2–3 days.' },
      ]
    },
    {
      id: 'virtual-receptionist',
      title: 'Virtual Receptionist',
      count: 10,
      faqs: [
        { q: 'What does a Virtual Receptionist do at Ocean VA?', a: 'They answer calls and chats live, qualify leads, book appointments, route or transfer calls, log notes in your CRM, and send confirmations/follow-ups.' },
        { q: 'Do you cover both phone and chat?', a: 'Yes—phone, website chat, SMS/WhatsApp Business, and shared inbox email.' },
        { q: 'How fast do you answer?', a: 'Our target is under 3 rings with >95% call capture during covered hours.' },
        { q: 'Can you book on our calendar?', a: 'Yes—Google, Outlook, Calendly, Acuity (and others) with custom buffers and meeting types.' },
        { q: 'Which CRMs and phone systems do you use?', a: 'HubSpot, Salesforce, Zoho, Pipedrive; RingCentral, Aircall, 8x8, Zoom Phone, Grasshopper (plus others).' },
        { q: 'Are your receptionists bilingual?', a: 'Yes—English & Spanish (default). We can route Spanish calls to bilingual receptionists.' },
        { q: 'How do you ensure quality?', a: 'Recorded calls (if enabled), scorecards, weekly coaching, and KPI reviews.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week). No setup fees. Month-to-month.' },
        { q: 'What if a receptionist isn\'t a fit?', a: 'We\'ll replace at no cost and retrain to your playbook.' },
        { q: 'How do we get started?', a: 'Book a discovery call → share scripts/playbooks → connect tools → go live in 2–3 days.' },
      ]
    },
    {
      id: 'sdr-assistant',
      title: 'SDR Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What tasks can an SDR virtual assistant handle to support my sales team\'s lead generation efforts?', a: 'VAs research leads, build lists, run outbound email/LinkedIn sequences, make discovery/qualification calls, set appointments, and keep the CRM updated.' },
        { q: 'Can a virtual SDR assistant generate leads and set appointments for my business?', a: 'Yes. Your VA can research and qualify leads, run compliant outbound sequences, and book meetings directly on your calendar while keeping the CRM clean.' },
        { q: 'How can a sales development virtual assistant improve my sales pipeline and follow-up process?', a: 'By handling lead research, qualification, outreach, and appointment setting so your sales team can focus on closing deals.' },
        { q: 'Will an SDR virtual assistant make cold calls to prospects, or do they only handle emails and LinkedIn outreach?', a: 'VAs research leads, build lists, run outbound email/LinkedIn sequences, make discovery/qualification calls, set appointments, and keep the CRM updated.' },
        { q: 'Are virtual SDR assistants able to use my CRM and sales tools (like Salesforce or HubSpot) effectively?', a: 'We commonly work in Salesforce, HubSpot, Apollo, and outreach tools you already use.' },
        { q: 'Is hiring an SDR virtual assistant more cost-effective than bringing on an in-house sales development rep?', a: 'Yes. Ocean VA uses a simple flat monthly rate with no setup fees, no lock-in contracts, and free replacements.' },
        { q: 'Do I need to sign a long-term contract when adding a virtual sales assistant to my team?', a: 'Everything is month-to-month. No lock-in or long-term contracts.' },
        { q: 'Are there any setup fees to begin with a sales development virtual assistant service?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
        { q: 'Do I get a dedicated sales development VA who works exclusively for my company\'s sales needs?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
        { q: 'Can a virtual SDR work within my target market\'s time zones and make calls during optimal hours?', a: 'Yes. We match your preferred time zone and business hours; extended coverage can be arranged by assigning more than one VA.' },
      ]
    },
    {
      id: 'transaction-coordinator',
      title: 'Virtual Transaction Coordinator',
      count: 10,
      faqs: [
        { q: 'What is a virtual transaction coordinator, and how do they assist in real estate transactions?', a: 'VAs typically take on repeatable admin, scheduling, customer comms, documentation, and data upkeep so your team can focus on high‑value work.' },
        { q: 'What tasks can a virtual transaction coordinator handle for real estate agents or brokers?', a: 'VAs collect documents, update transaction management systems, track conditions, coordinate with title/appraisal, manage status updates, and schedule calls.' },
        { q: 'How can a virtual transaction coordinator help streamline the property closing process for my real estate deals?', a: 'By managing documentation, coordinating with all parties, tracking deadlines, and keeping clients informed throughout the process.' },
        { q: 'Is a virtual transaction coordinator familiar with real estate contracts, forms, and paperwork requirements?', a: 'Yes. We adapt to your software stack quickly and follow your compliance and documentation procedures.' },
        { q: 'Can a transaction coordinator VA manage communication between agents, clients, lenders, and title companies?', a: 'Yes—VAs coordinate communications, track documents, and manage status updates across all parties.' },
        { q: 'How does hiring a virtual transaction coordinator save time for a busy Realtor or brokerage?', a: 'By handling administrative coordination, document management, and follow‑ups so agents can focus on sales and client relationships.' },
        { q: 'What is the cost of hiring a virtual transaction coordinator through Ocean VA\'s services?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to commit to a long-term agreement, or can I use a transaction coordinator only when needed?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Are there any setup fees or onboarding costs to start with a virtual transaction coordinator?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
        { q: 'Will I have a dedicated transaction coordinator working on all my real estate files?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
      ]
    },
    {
      id: 'property-management',
      title: 'Property Management Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What tasks can a property management virtual assistant handle for a landlord or property manager?', a: 'VAs handle tenant communications, maintenance tickets, rent reminders, listings, application pre‑screening, lease paperwork, and vendor coordination.' },
        { q: 'Can a virtual assistant take care of tenant inquiries, complaints, and maintenance requests remotely?', a: 'Yes—VAs can triage tenant emails/calls, log and dispatch maintenance, send rent reminders, and keep your property management system current.' },
        { q: 'How can a property management VA help with rent collection or tenant screening processes?', a: 'By managing communications, sending reminders, pre‑screening applications, and coordinating the screening process.' },
        { q: 'Will a virtual property management assistant know how to use property management software like AppFolio or Buildium?', a: 'We\'re familiar with AppFolio, Buildium, Rent Manager, Dotloop, and DocuSign, among others.' },
        { q: 'Can a property management virtual assistant advertise rental vacancies and schedule showings for prospects?', a: 'Yes—VAs can manage listings, schedule showings, and coordinate with prospective tenants.' },
        { q: 'How does hiring a virtual assistant reduce the workload and stress for a busy property manager?', a: 'By handling tenant communications, maintenance coordination, rent collection, and administrative tasks.' },
        { q: 'Is hiring a property management VA more cost-effective than employing an in-office assistant or property manager?', a: 'Yes. Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'What is the cost of a property management virtual assistant through Ocean VA\'s services?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to sign a long-term contract to use a property management virtual assistant?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Will I have one dedicated virtual assistant managing my property portfolio tasks?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
      ]
    },
    {
      id: 'medical-assistant',
      title: 'Medical Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does a medical virtual assistant do to help a healthcare practice or doctor\'s office?', a: 'Common tasks include patient scheduling and reminders, intake processing, insurance verification, EMR updates, referral coordination, and front‑desk/telehealth support.' },
        { q: 'Can a medical virtual assistant handle patient appointment scheduling and reminder calls?', a: 'Yes—VAs can schedule appointments, send reminders, and manage patient communications.' },
        { q: 'Is a virtual medical assistant familiar with using EHR/EMR systems to update patient records?', a: 'We frequently work in EMR/EHR and secure communication tools per your practice (e.g., Kareo, Athenahealth, SimplePractice).' },
        { q: 'How can a virtual assistant help a doctor\'s office with administrative tasks like filing and follow-ups?', a: 'Medical VAs handle non‑clinical admin: patient scheduling, reminders, records updates, insurance verification, and can assist with scribing/transcription per your policy.' },
        { q: 'Is it HIPAA-compliant to use a virtual assistant for handling patient information and medical tasks?', a: 'Yes. We support HIPAA‑aligned workflows inside your systems under your policies and access controls.' },
        { q: 'How does Ocean VA ensure patient data privacy and HIPAA compliance with its medical VAs?', a: 'We follow strict data‑security practices with principle‑of‑least‑access, NDA/SOP adherence, secure tools, and audit‑friendly workflows.' },
        { q: 'What is the cost of a medical virtual assistant per month with Ocean VA\'s pricing?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I have to sign a long-term contract for a medical virtual assistant, or can I use the service as needed?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Are there any setup fees to get started with a medical virtual assistant for my practice?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
        { q: 'Will I have a dedicated medical virtual assistant who learns the ins and outs of my practice?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
      ]
    },
    {
      id: 'finance-assistant',
      title: 'Finance Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What tasks can a finance virtual assistant handle for my business or accounting firm?', a: 'VAs handle bookkeeping support, AP/AR coordination, invoice prep, reconciliations, report building, client scheduling, and secure document management.' },
        { q: 'Can a finance virtual assistant help with bookkeeping tasks like recording transactions and invoicing?', a: 'Yes—VAs can prepare invoices, record transactions, reconcile accounts, and build reports inside your accounting tools; final review remains with your accountant/CPA.' },
        { q: 'Will a virtual finance assistant be familiar with accounting software such as QuickBooks, Xero, or Excel?', a: 'We regularly work with QuickBooks/Xero, Excel/Sheets, and CRMs like Wealthbox or Salesforce.' },
        { q: 'How can a virtual assistant help a CPA or financial advisor with administrative and routine tasks?', a: 'VAs can prepare invoices, record transactions, reconcile accounts, and build reports inside your accounting tools; final review remains with your accountant/CPA.' },
        { q: 'Is it secure and confidential to allow a virtual assistant to work with my financial data?', a: 'Yes. We follow strict data‑security practices with principle‑of‑least‑access, NDA/SOP adherence, secure tools, and audit‑friendly workflows.' },
        { q: 'How does Ocean VA ensure data security and confidentiality for sensitive financial information?', a: 'We follow confidentiality best practices and can align to KYC/AML documentation workflows you define.' },
        { q: 'Can a finance virtual assistant reduce the workload of my in-house accounting team by handling routine tasks?', a: 'Yes—VAs handle bookkeeping support, AP/AR coordination, invoice prep, reconciliations, and report building.' },
        { q: 'What is the cost of hiring a finance virtual assistant through Ocean VA\'s service?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Is there a contract required for finance virtual assistant services, or can I use the service flexibly?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Will I have a dedicated virtual assistant for my finance tasks, or different people handling my work?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
      ]
    },
    {
      id: 'hr-assistant',
      title: 'HR Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What tasks can an HR virtual assistant perform to help my HR department or small business?', a: 'VAs help post jobs, screen resumes, schedule interviews, manage onboarding paperwork, maintain HRIS records, and assist with payroll/time tracking coordination.' },
        { q: 'Can a virtual HR assistant help with recruiting tasks like posting jobs, sourcing candidates, and screening resumes?', a: 'Yes—HR VAs post jobs, shortlist candidates, schedule interviews, prepare offer letters, manage HRIS records, and track onboarding paperwork.' },
        { q: 'Will an HR virtual assistant be familiar with HR software or applicant tracking systems (ATS)?', a: 'We often work in BambooHR, Gusto, Zenefits, Greenhouse, Workable, and similar ATS/HRIS tools.' },
        { q: 'Is it secure to share employee data and HR documents with a virtual assistant?', a: 'Yes. We follow strict data‑security practices and protect employee PII by using your HRIS/ATS with scoped access and SOPs you approve.' },
        { q: 'How does Ocean VA ensure confidentiality and data security when handling HR information?', a: 'We follow strict data‑security practices with principle‑of‑least‑access, NDA/SOP adherence, secure tools, and audit‑friendly workflows.' },
        { q: 'Can a virtual HR assistant help manage payroll processing or employee time tracking support?', a: 'Yes—VAs can assist with payroll coordination and time tracking support.' },
        { q: 'Is hiring an HR virtual assistant cost-effective compared to adding another in-house HR staff member?', a: 'Yes. Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'What is the price per month for an HR virtual assistant service with Ocean VA?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to commit to a contract or can I use an HR virtual assistant on a flexible, month-to-month basis?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Will I have one dedicated HR virtual assistant who learns my company\'s policies and culture?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
      ]
    },
    {
      id: 'tech-assistant',
      title: 'Tech Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does a tech virtual assistant do, and how can they support a tech company or startup?', a: 'VAs handle Tier‑1 support, account provisioning, ticket triage, documentation, meeting coordination, backlog grooming support, QA log updates, and license tracking.' },
        { q: 'How can a virtual assistant support an IT team or software project with administrative or coordination tasks?', a: 'We\'re comfortable with Jira, Asana, Monday.com, Freshdesk/Zendesk, and automation tools like Zapier/Power Automate.' },
        { q: 'Can a tech virtual assistant handle tasks like data entry, internet research, or technical documentation prep?', a: 'VAs handle Tier‑1 support, account provisioning, ticket triage, documentation, meeting coordination, backlog grooming support, QA log updates, and license tracking.' },
        { q: 'Are technical virtual assistants familiar with software tools and platforms like project management software or CRMs?', a: 'We\'re comfortable with Jira, Asana, Monday.com, Freshdesk/Zendesk, and automation tools like Zapier/Power Automate.' },
        { q: 'Can a tech virtual assistant provide basic IT support or help desk tasks for my customers or team?', a: 'Yes—VAs can handle Tier‑1 support and help desk tasks.' },
        { q: 'What is the cost of a technology virtual assistant through Ocean VA\'s service plans?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to sign a long-term contract for tech virtual assistant services, or is it a flexible arrangement?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Are there any setup fees to begin working with a tech virtual assistant from Ocean VA?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
        { q: 'Will I get a dedicated virtual assistant who understands my tech business and projects?', a: 'You get one dedicated VA who learns your systems and workflow; we never pool your work across a ticket queue.' },
        { q: 'What qualifications or background do Ocean VA\'s tech virtual assistants have? (Are they tech-savvy or have IT experience?)', a: 'We vet the top 1% of applicants with a ~30‑day process and industry‑specific training so your VA arrives job‑ready.' },
      ]
    },
    {
      id: 'mortgage-assistant',
      title: 'Mortgage Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What tasks can a mortgage virtual assistant perform for a mortgage broker or lender?', a: 'VAs collect borrower docs, update LOS/CRM records, track conditions, coordinate with title/appraisal, manage status updates, and schedule calls.' },
        { q: 'Can a virtual assistant help collect borrower documents and prepare mortgage loan applications?', a: 'VAs collect borrower docs, update LOS/CRM records, track conditions, coordinate with title/appraisal, manage status updates, and schedule calls.' },
        { q: 'How can a mortgage virtual assistant assist with follow-ups and communication with loan clients?', a: 'VAs collect borrower docs, update LOS/CRM records, track conditions, coordinate with title/appraisal, manage status updates, and schedule calls.' },
        { q: 'Is it secure to share financial documents and borrower information with a virtual assistant?', a: 'We follow strict data‑security practices with principle‑of‑least‑access, NDA/SOP adherence, secure tools, and audit‑friendly workflows.' },
        { q: 'Are Ocean VA\'s mortgage assistants knowledgeable about the loan process and mortgage industry terms?', a: 'VAs collect borrower docs, update LOS/CRM records, track conditions, coordinate with title/appraisal, manage status updates, and schedule calls.' },
        { q: 'Can a mortgage virtual assistant handle initial client inquiries and pre-qualify leads for a loan officer?', a: 'VAs collect borrower docs, update LOS/CRM records, track conditions, coordinate with title/appraisal, manage status updates, and schedule calls.' },
        { q: 'How does hiring a virtual assistant help a mortgage office reduce workload and operating costs?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'What is the monthly cost of a mortgage virtual assistant with Ocean VA\'s flat pricing model?', a: 'Ocean VA uses a simple flat monthly rate with no setup fees, no lock‑in contracts, and free replacements.' },
        { q: 'Do I need to sign a long-term contract for mortgage virtual assistant services, or is it a flexible month-to-month service?', a: 'Everything is month-to-month. No lock‑in or long‑term contracts.' },
        { q: 'Are there any setup fees or extra costs to start using a mortgage virtual assistant?', a: 'No setup fees or hidden charges—just a flat monthly rate that covers the service.' },
      ]
    },
    {
      id: 'real-estate',
      title: 'Real Estate Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does a REVA handle day-to-day?', a: 'Lead intake and speed-to-lead, listings/MLS updates, showing coordination, feedback, offer packets, transaction coordination, and client updates.' },
        { q: 'Do you call new internet leads fast?', a: 'Yes—<5-minute speed-to-lead during coverage, with call/SMS/email touches logged in your CRM.' },
        { q: 'Which real estate CRMs do you support?', a: 'kvCORE, Follow Up Boss, BoomTown, Chime, Sierra, LionDesk, RealtyJuggernaut (and others).' },
        { q: 'Can you manage listings in the MLS?', a: 'Yes—data entry, photos, remarks, private remarks, status changes—per broker permissions.' },
        { q: 'Do you schedule and confirm showings?', a: 'Yes—ShowingTime (or your tool), agent notifications, and feedback surveys after showings.' },
        { q: 'Do you prepare offer or listing packets?', a: 'Yes—Dotloop, DocuSign, Skyslope templates, disclosures, initials, and routing for signatures.' },
        { q: 'Will you track dates and deadlines?', a: 'Yes—earnest money, inspections, appraisal, loan milestones, HOA docs, CD/ALTA—no missed deadlines.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week), month-to-month, no setup fees.' },
        { q: 'Do you replace if it\'s not a fit?', a: 'Yes—no-cost replacement and retraining aligned to your playbook.' },
        { q: 'How do we start?', a: 'Discovery call → playbooks/templates → connect tools → launch in 2–3 days.' },
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does an Ecommerce VA do?', a: 'Product listings, catalog hygiene, inventory sync, order management, customer support, returns/RMAs, and marketplace ops.' },
        { q: 'Which platforms do you support?', a: 'Shopify, Amazon, Walmart, eBay, Etsy, WooCommerce, BigCommerce, plus apps (Gorgias, Zendesk, Klaviyo).' },
        { q: 'Can you create and optimize product listings?', a: 'Yes—titles, bullets, descriptions, tags, SEO, attributes, and rich media coordination.' },
        { q: 'Do you handle Amazon Seller Central tasks?', a: 'Yes—listings, flat files, cases, FBA shipments, reimbursements follow-ups, and basic PPC hygiene.' },
        { q: 'Can you manage inventory and stock alerts?', a: 'Yes—stock thresholds, PO reminders, bundle/kit rules, and channel sync checks.' },
        { q: 'Do you process orders and exceptions?', a: 'Yes—order routing, address verification, fraud checks (via your tools), and fulfillment coordination.' },
        { q: 'Will you manage returns and RMAs?', a: 'Yes—policy verification, labels, refunds/exchanges, and defect tracking.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week). Month-to-month. No setup fees.' },
        { q: 'Can we scale for peak seasons?', a: 'Yes—temporary hours or additional VA coverage.' },
        { q: 'How do we start?', a: 'Kickoff → access → playbooks → go live in 2–3 days.' },
      ]
    },
    {
      id: 'small-business',
      title: 'Small Business Virtual Assistant',
      count: 10,
      faqs: [
        { q: 'What does a Small Business VA handle?', a: 'Scheduling, inbox, phones, invoicing/AR follow-ups, light bookkeeping, customer service, vendor coordination, and reporting.' },
        { q: 'Do you support phone + chat + email?', a: 'Yes—multi-channel coverage, routing, and daily summaries.' },
        { q: 'Which tools do you work with?', a: 'Google/Microsoft 365, QuickBooks/Xero, HubSpot/Zoho/Pipedrive, Slack/Teams, Calendly, Asana/Trello/ClickUp.' },
        { q: 'Can you create invoices and follow up on payments?', a: 'Yes—invoice creation, reminders, and escalation per your policies.' },
        { q: 'Do you do light bookkeeping?', a: 'Yes—categorization, reconciliations, receipt management; CPA/Controller guidance recommended.' },
        { q: 'Can you manage appointments and service windows?', a: 'Yes—buffers, confirmations, reschedules, and field tech dispatch coordination.' },
        { q: 'Are your assistants bilingual?', a: 'Yes—English & Spanish.' },
        { q: 'What\'s the pricing?', a: 'Starting at $1,300/mo (40h/week), month-to-month, no setup fees.' },
        { q: 'Will I have a dedicated VA?', a: 'Yes—with trained backup for continuity.' },
        { q: 'How do we get started?', a: 'Discovery call → access & SOPs → launch in 2–3 days.' },
      ]
    }
  ]

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-600 to-ocean-700 text-white py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-ocean-100 leading-relaxed mb-8">
              Find answers to common questions about Ocean Virtual Assistant services across all roles and industries.
            </p>
            <a 
              href="/contact-us" 
              className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Can't Find Your Answer? Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-container bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqCategories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 bg-white hover:bg-ocean-50 border-2 border-gray-200 hover:border-ocean-300 rounded-lg flex items-center justify-between transition-all text-left"
                >
                  <div>
                    <h3 className="text-lg font-bold text-ocean-700">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.count} questions
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-ocean-600 flex-shrink-0 transition-transform ${
                      expandedCategory === category.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedCategory === category.id && (
                  <div className="mt-2 ml-6 bg-white rounded-lg border-2 border-ocean-200">
                    {category.faqs ? (
                      <div className="divide-y divide-gray-200">
                        {category.faqs.map((faq, idx) => (
                          <div key={idx} className="p-4 hover:bg-ocean-50 transition-colors">
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === `${category.id}-${idx}` ? null : `${category.id}-${idx}`)}
                              className="w-full text-left flex items-start justify-between gap-4"
                            >
                              <h4 className="font-medium text-gray-800 text-sm leading-relaxed flex-1">
                                {faq.q}
                              </h4>
                              <ChevronDown
                                className={`w-5 h-5 text-ocean-600 flex-shrink-0 mt-0.5 transition-transform ${
                                  expandedFaq === `${category.id}-${idx}` ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {expandedFaq === `${category.id}-${idx}` && (
                              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                                {faq.a}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-600">
                          FAQs for <strong>{category.title}</strong> coming soon...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-container bg-white py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            General Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-ocean-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-ocean-700 mb-4">Pricing & Contracts</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Flat monthly rate with no setup fees</li>
                <li>✓ No long-term contracts—month-to-month flexibility</li>
                <li>✓ Free replacements if not a good fit</li>
                <li>✓ Tailored quotes after discovery call</li>
              </ul>
            </div>
            <div className="bg-ocean-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-ocean-700 mb-4">Dedication & Support</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ One dedicated VA per client</li>
                <li>✓ Never pooled across ticket queues</li>
                <li>✓ Ongoing account support & check-ins</li>
                <li>✓ Quick replacement if needed</li>
              </ul>
            </div>
            <div className="bg-ocean-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-ocean-700 mb-4">Vetting & Training</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Top 1% of applicants vetted</li>
                <li>✓ ~30-day vetting process</li>
                <li>✓ Industry-specific training</li>
                <li>✓ Ongoing coaching from our team</li>
              </ul>
            </div>
            <div className="bg-ocean-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-ocean-700 mb-4">Security & Compliance</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Principle-of-least-access</li>
                <li>✓ NDA/SOP adherence</li>
                <li>✓ Secure tools & audit-friendly workflows</li>
                <li>✓ HIPAA-compliant where applicable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-ocean-700 text-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-ocean-100">
            Have specific questions about your needs? Our team is ready to help you find the perfect virtual assistant solution.
          </p>
          <a 
            href="/contact-us" 
            className="inline-block bg-white text-ocean-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book Your Free Discovery Call
          </a>
        </div>
      </section>
    </>
  )
}
