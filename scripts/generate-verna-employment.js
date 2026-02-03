/**
 * Script to generate Employment History HTML for Verna
 * Format: Accordion structure for Webflow template
 */

function escapeHtml(text) {
  if (typeof text !== 'string') return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return ''
  
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '')
    const position = escapeHtml(entry.position || '')
    const period = escapeHtml(entry.period || '')
    let description = entry.description || ''
    
    // First, handle the description that may already have <br><br> tags
    // Split by <br><br> or double line breaks to get paragraphs
    let paragraphs = description
      .split(/<br><br>|<br\s*\/?><br\s*\/?>|\n\n/)
      .map(p => {
        // Remove any existing <br> tags and clean up
        p = p.replace(/<br\s*\/?>/gi, ' ').trim()
        // Escape HTML for security
        p = escapeHtml(p)
        return p
      })
      .filter(p => p.length > 0)
      .map(p => {
        // Add bullet point at the beginning if not already present
        if (!p.startsWith('•') && !p.startsWith('&bull;')) {
          p = '• ' + p
        }
        return p
      })
      .join('<br>') // Single <br> between paragraphs
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${paragraphs}</p></div></div>`
  }).join('')
}

// Verna's Employment History
const vernaEmployment = [
  {
    company: 'RayWhite',
    position: 'Assistant Property Manager',
    period: 'August 2024 – Sept 2025',
    description: `Assisted with daily property management, coordinated tasks related to listings, contracts preparation, and property documentation.<br><br>Processing new renter applications from rental reference for rental providers' approval, to systematically creating and or adding the renter details in the system.<br><br>Prepare Comparative Market Analysis (CMA) reports to support decision-making in property acquisition and pricing strategies.<br><br>Assisted in the preparation of the Lease Agreement and other documents needed for new renters.<br><br>Ensuring accurate allocation of rent payments and recording of receipts and daily reconciliation of bank transactions.<br><br>Maintain an up-to-date record of rental arrears and regularly notify renters of arrears.<br><br>Processing Invoices and bills for the renter and rental provider.<br><br>Assisting in managing, scheduling, and overseeing all maintenance and repair activities for a property, specifically residential property.<br><br>Creating templates and other correspondence for all communication needs of the office.<br><br>Assisted with lease renewals, maintenance coordination, and property compliance aligned with relevant state laws and regulations.<br><br>Assisting in ensuring compliance with Australian tenancy legislation across multiple states (QLD, NSW, VIC, WA,TAS).<br><br>Complete and file relevant paperwork to maintain an organized and systematic work environment.<br><br>Managed Statement of Account (SOA) and helped prepare Healthy Homes Standards (HHS) reports and compliance.<br><br>Supported listing processes using OneAgency contracts and the Sphere of Influence (SOI) method'<br><br>Ensured seamless communication between clients, agents, and internal teams to keep projects on track.`
  },
  {
    company: 'Song Properties',
    position: 'Assistant Property Manager',
    period: 'January 2024 – May 2025',
    description: `Assisted with daily property management, coordinated tasks related to listings, contracts preparation, and property documentation.<br><br>Prepare Comparative Market Analysis (CMA) reports to support decision-making in property acquisition and pricing strategies.<br><br>Assisted in the preparation of the Lease Agreement and other documents needed for new renters.`
  },
  {
    company: 'Goldilocks BakeShop',
    position: 'Customer Service & Inventory Coordinator',
    period: 'August 2009 - September 2017',
    description: `Delivered excellent customer service during high-traffic hours, maintaining a friendly and professional atmosphere.<br><br>Monitored daily inventory levels, coordinated with suppliers, and ensured timely replenishment of stock.<br><br>Assisted in organizing and managing monthly stock takes, minimizing losses through accurate documentation.<br><br>Collaborated with the branch manager to plan product displays and seasonal promotions.<br><br>Handled cash register operations, balanced end-of-day sales reports, and ensured cash accountability.<br><br>Trained new staff on store procedures, customer service standards, and safety guidelines.<br><br>Demonstrated multitasking and time management in a fast paced environment, ensuring smooth store operations.`
  }
]

// Generate HTML
const employmentHTML = generateEmploymentHTML(vernaEmployment)

console.log('📋 Employment History HTML for Rosa Verna:\n')
console.log('═'.repeat(80))
console.log(employmentHTML)
console.log('═'.repeat(80))
console.log('\n📝 Copy the HTML above and paste it into the "Employment Richtext" field in Webflow CMS for Rosa Verna\n')

// Also generate Employment Summary
const employmentSummary = `Rosa Verna has over 8 years of experience in property management and customer service, with recent specialized roles at RayWhite and Song Properties as an Assistant Property Manager, where she coordinated property management tasks, prepared CMA reports, managed rental applications, and ensured compliance with Australian tenancy legislation. Her earlier experience at Goldilocks BakeShop as a Customer Service & Inventory Coordinator developed her skills in customer service, inventory management, and operations coordination.`

console.log('📋 Employment Summary for Rosa Verna:\n')
console.log('═'.repeat(80))
console.log(employmentSummary)
console.log('═'.repeat(80))
console.log('\n📝 Copy the text above and paste it into the "Employment Summary" field in Webflow CMS for Rosa Verna\n')
