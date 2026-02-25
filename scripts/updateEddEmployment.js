/**
 * Update Edd's Employment History from resume
 * Run with: node scripts/updateEddEmployment.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Helper functions (same pattern as other employment scripts)
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function cleanDescription(text) {
  if (!text) return '';
  return text
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return '';

  return entries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = cleanDescription(entry.description || '');

    // Escape HTML but preserve bullet points
    description = escapeHtml(description);
    description = description.replace(/•\s*/g, '<br>• ');
    description = description.replace(/^<br>\s*/, '');

    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
  }).join('');
}

// Employment entries for Edd (based on resume)
const employmentEntries = [
  {
    company: 'Wells Fargo EGS, LLC – Philippines',
    position: 'Outbound Collection Representative',
    period: '02/2017 – Present',
    description:
      '• Resolving overdraft bills and collecting payments from customers. • Assessing a customer’s ability to pay and offering payment plans or settlement amounts.'
  },
  {
    company: 'Wells Fargo EGS, LLC – Philippines',
    position: 'Securities Operations – ICC',
    period: '02/2017 – Present',
    description:
      '• Provide personalized investment advisory services to high net-worth clients, understanding their financial goals, risk tolerance, and investment preferences. • Conduct comprehensive financial reviews and analyze client portfolios and future needs. • Develop customized investment strategies and asset allocation plans tailored to each client’s objectives and risk profile. • Execute trades and manage client portfolios while ensuring compliance with regulatory requirements and internal policies. • Monitor market trends, economic indicators, and geopolitical events to identify investment opportunities and risks. • Proactively communicate with clients to provide updates on portfolio performance, market developments, and investment recommendations. • Respond promptly to client inquiries and collaborate with internal teams to deliver holistic wealth management solutions. • Educate clients on investment products, market dynamics, and wealth management strategies and cultivate long-term client relationships.'
  },
  {
    company: 'Wells Fargo EGS, LLC – Philippines',
    position: 'Operations Analyst – Tax Mortgage Escrow',
    period: '02/2017 – Present',
    description:
      '• Review and analyze mortgage loan documents, including tax and insurance records, to ensure accuracy and compliance with regulatory requirements. • Calculate and process property tax payments and insurance premiums for mortgage escrow accounts. • Reconcile escrow account balances and resolve discrepancies or variances. • Coordinate with tax authorities, insurance companies, and third-party vendors to obtain updated tax assessments, insurance policies, and escrow documents. • Respond to inquiries regarding escrow account status, tax assessments, insurance coverage, and payment processing. • Investigate and resolve escrow-related issues such as payment shortages, overages, or delinquent taxes. • Generate and distribute annual escrow account statements and tax forms, monitor changes in tax laws and regulations, and collaborate with cross-functional teams to streamline processes.'
  },
  {
    company: 'Wells Fargo EGS, LLC – Philippines',
    position: 'Operational Accounting Assistant',
    period: '02/2017 – Present',
    description:
      '• Review and validate sales tax exemption applications and verify eligibility against tax codes. • Coordinate with sales and legal teams and maintain organized records of exemption processes. • Prepare and issue exemption certificates and stay updated on tax regulations. • Support audits and inquiries, respond to client and stakeholder queries, collaborate with accounting teams for accurate reporting, and generate reports on exemption activities and process improvements.'
  },
  {
    company: 'TRT Global Solution',
    position: 'Accounts Payable / Accounts Receivable',
    period: '04/2016 – 09/2016',
    description:
      '• Review and verify invoices, purchase orders, and expense reports for accuracy and completeness. • Process vendor invoices and employee reimbursements in accordance with company policies. • Ensure timely and accurate payments to vendors and service providers, prioritizing critical payments. • Reconcile accounts payable transactions with vendor statements and resolve discrepancies. • Communicate with vendors regarding payment inquiries and invoice discrepancies. • Maintain organized records of accounts payable transactions and prepare reports on aging and cash flow. • Generate and send customer invoices and statements, record and reconcile customer payments, and monitor accounts receivable aging. • Follow up on outstanding invoices, resolve billing issues, and support month-end and year-end closing processes.'
  },
  {
    company: 'WNS Global Services – NYK Logistics Line',
    position: 'Acting Lead Leader',
    period: '01/2015 – 03/2016',
    description:
      '• Supervise and coordinate day-to-day operations of the NYK Logistics Line account. • Provide leadership and direction to team members, acting as subject matter expert on requirements and deliverables. • Serve as primary point of contact for the client and address queries and requests. • Monitor team performance, provide feedback and coaching, and collaborate with operations, quality, and training teams. • Conduct regular team meetings, analyze data and metrics to identify trends and improvement areas, and ensure adherence to policies and SLAs.'
  },
  {
    company: 'Everything Express Inc.',
    position: 'General Accountant',
    period: '03/2012 – 03/2015',
    description:
      '• Manage financial transactions including accounts payable, accounts receivable, and general ledger entries. • Prepare and analyze financial statements such as balance sheets, income statements, and cash flow statements. • Perform month-end and year-end closing procedures and maintain accuracy of the general ledger. • Process accounts payable invoices and monitor accounts receivable aging, coordinating collection efforts. • Prepare and submit various tax filings and assist in budgeting and forecasting. • Collaborate with internal stakeholders to support business decisions and stay current with accounting regulations and GAAP. • Utilize accounting software to streamline processes and participate in internal and external audits.'
  },
  {
    company: 'IBM',
    position: 'Intern',
    period: '12/2011 – 03/2012',
    description:
      '• Assist in research and development projects, contributing to the implementation of innovative solutions and technologies. • Collaborate with team members on tasks and projects and participate in training sessions and workshops. • Support senior staff in day-to-day operations, documentation, and coordination of meetings. • Contribute ideas during team meetings, complete assigned tasks on time, communicate effectively with supervisors, and maintain confidentiality and integrity in handling sensitive information.'
  },
  {
    company: 'Business Solution and Outsourcing – Engagement with Unilever',
    position: 'Business Solutions / Outsourcing Engagement',
    period: '08/2011',
    description:
      '• Conduct analysis of Unilever’s business processes to identify improvement and outsourcing opportunities. • Collaborate with Unilever stakeholders to understand objectives and requirements. • Develop customized business solutions and outsourcing strategies and present proposals to management. • Coordinate implementation with internal teams and vendors, monitor KPIs and SLAs, and provide ongoing support. • Foster strong relationships with Unilever stakeholders as a trusted advisor.'
  }
];

async function getVAByName(name) {
  try {
    const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';
    const response = await client.getCollectionItems(VA_COLLECTION_ID);

    if (response.items && Array.isArray(response.items)) {
      const va = response.items.find(item =>
        item.fieldData?.name?.toLowerCase() === name.toLowerCase()
      );
      return va;
    }

    return null;
  } catch (error) {
    console.error('Error fetching VA:', error);
    return null;
  }
}

async function main() {
  try {
    console.log('🚀 Updating Edd\'s Employment History...\n');

    const vaName = 'Edd';
    console.log(`🔍 Searching for ${vaName}...`);

    const va = await getVAByName(vaName);

    if (!va) {
      console.error(`❌ VA "${vaName}" not found`);
      process.exit(1);
    }

    console.log(`✅ Found VA: ${va.fieldData?.name} (ID: ${va.id})`);
    console.log(`   Slug: ${va.fieldData?.slug || 'N/A'}\n`);

    const employmentHTML = generateEmploymentHTML(employmentEntries);

    console.log(`📄 Generated Employment HTML length: ${employmentHTML.length} characters\n`);

    const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';

    console.log('🔄 Updating VA item in Webflow...\n');

    const fieldData = {
      'employment-richtext': employmentHTML
    };

    const result = await client.updateCollectionItem(
      VA_COLLECTION_ID,
      va.id,
      fieldData,
      { isDraft: false }
    );

    console.log('✅ Successfully updated Edd\'s employment history!');
    console.log(`   Item ID: ${result.item?.id || result.id}`);
    console.log(`   Name: ${result.fieldData?.name || va.fieldData?.name}\n`);

    if (result.item?.id || result.id) {
      console.log('🔄 Publishing item...');
      try {
        await client.publishItems(VA_COLLECTION_ID, [result.item?.id || result.id]);
        console.log('✅ Item published successfully!\n');
      } catch (publishError) {
        console.warn('⚠️  Could not publish item automatically:', publishError.message);
        console.log('   You may need to publish it manually in Webflow.\n');
      }
    }

    console.log('🎉 Edd\'s employment history updated successfully!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${va.fieldData?.slug || 'edd'}\n`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main();

