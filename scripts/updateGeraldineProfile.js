/**
 * Update Geraldine core profile fields in Webflow CMS.
 * Run with: node scripts/updateGeraldineProfile.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

if (!siteId) {
  console.error('❌ WEBFLOW_SITE_ID not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateSkillsHTML(skills) {
  if (!skills || skills.length === 0) return '';
  const tags = skills
    .map((skill) => `<span class="va-skill-tag">${escapeHtml(skill)}</span>`)
    .join('');
  return `<div class="va-skills-container">${tags}</div>`;
}

function generateToolsHTML(tools) {
  if (!tools || tools.length === 0) return '';
  const items = tools
    .map(
      (tool) =>
        `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(
          tool,
        )}</span></div>`,
    )
    .join('');
  return `<div class="va-tools-list two-column">${items}</div>`;
}

// Same structure as addAngelAlbertoToWebflow / addAngelEnriqueToWebflow (accordion = styles load in Webflow)
function generateEmploymentAccordionHTML(entries) {
  if (!entries || entries.length === 0) return '';
  const iconSvg = `<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

  const accordions = entries.map((entry) => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let bullets = entry.bullets;
    if (!bullets || bullets.length === 0) {
      const raw = entry.description || '';
      const liMatches = raw.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      bullets = liMatches
        ? liMatches.map((m) => m.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]+>/g, '').trim()).filter(Boolean)
        : raw.trim().split(/\n+/).map((s) => s.replace(/^[\s•\-*]+/, '').trim()).filter(Boolean);
    }
    const descriptionText = bullets.length ? bullets.map((b) => escapeHtml(b)).join('\n') : '';
    let description = descriptionText;
    if (description.includes('\n')) description = description.replace(/\n/g, '<br>');
    description = description.replace(/&(?!amp;|lt;|gt;|quot;|#39;|nbsp;|#\d+;)/g, '&amp;');

    return `
<div class="va-employment-accordion">
  <div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
    <div class="va-employment-accordion-title">
      <h4 class="va-employment-accordion-company">${company}</h4>
      <p class="va-employment-accordion-position">${position}</p>
      <p class="va-employment-accordion-period">${period}</p>
    </div>
    ${iconSvg}
  </div>
  <div class="va-employment-accordion-content">
    <p class="va-employment-accordion-description">${description}</p>
  </div>
</div>`.trim();
  });

  return `<div class="va-employment-list">\n${accordions.join('\n')}\n</div>`;
}

// Same structure as addAngelAlbertoToWebflow / addAngelEnriqueToWebflow
function generateEducationHTML(entries) {
  if (!entries || entries.length === 0) return '';
  return entries
    .map((entry, index) => {
      const school = escapeHtml(entry.school || '');
      const degree = escapeHtml(entry.degree || '');
      const year = entry.year != null && entry.year !== '' ? escapeHtml(String(entry.year)) : '';
      const yearHtml = year ? `<p class="va-education-year">${year}</p>` : '';
      const margin = index > 0 ? ' style="margin-top: 16px;"' : '';
      return `<div class="va-education-item"${margin}><h3 class="va-education-school">${school}</h3><p class="va-education-degree">${degree}</p>${yearHtml}</div>`;
    })
    .join('\n');
}

async function main() {
  try {
    console.log('🔧 Updating Geraldine core profile fields in Webflow CMS...\n');

    const collectionsResponse = await client.getCollections(siteId);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants',
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    let allItems = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;
    while (hasMore) {
      const itemsResponse = await client.getCollectionItems(vaCollection.id, { limit, offset });
      allItems = allItems.concat(itemsResponse.items);
      hasMore = itemsResponse.items.length === limit;
      offset += limit;
    }

    let geraldine = allItems.find(
      (item) => (item.fieldData.slug || '').toLowerCase().trim() === 'geraldine',
    );
    if (!geraldine) {
      geraldine = allItems.find(
        (item) => (item.fieldData.name || '').trim() === 'Geraldine',
      );
    }
    if (!geraldine) {
      geraldine = allItems.find((item) =>
        (item.fieldData.name || '').toLowerCase().includes('geraldine'),
      );
    }

    if (!geraldine) {
      console.error('❌ Geraldine not found in CMS (by slug "geraldine" or name "Geraldine")');
      console.error('   Total items in collection:', allItems.length);
      process.exit(1);
    }

    console.log(`✅ Found Geraldine in CMS (id: ${geraldine.id})\n`);

    const skills = [
      'Strong interpersonal and communication skills',
      'Ability to work collaboratively as part of a team',
      'Positive mental attitude',
      'Ability to adapt and polite & engaging personality',
      'Meticulous attention to detail',
      'Excellent organization skills',
    ];

    const tools = [
      'Applied Epic Software',
      'Ezylynx',
      'Zendesk',
      'Salesforce',
      'Dash',
      'Ease',
      'Microsoft Office',
      'Google Suite',
    ];

    const employmentEntries = [
      {
        company: 'Insurance Virtual Assistant',
        position: 'Commercial & Personal Lines',
        period: 'October 2021 – May 2024',
        description: `
            <ul>
              <li>Managing and updating client databases and records.</li>
              <li>Generating insurance quotes and proposals based on client needs.</li>
              <li>Processing new insurance applications and policy endorsements.</li>
              <li>Verifying policy details and ensuring accuracy in documentation.</li>
              <li>Quoting in different carrier sites.</li>
              <li>Policy checking on the renewal declaration page.</li>
              <li>Processing and sending notices of cancellation.</li>
              <li>Preparing renewal proposals.</li>
              <li>Maintaining and updating client records and policy information in databases.</li>
              <li>Handling general office duties such as managing emails, preparing reports, and creating presentations.</li>
              <li>Helping clients file claims and tracking the status of claim submissions.</li>
              <li>Assisting with the preparation and organization of insurance documents, including policy renewals and updates.</li>
              <li>Renaming and attaching files to client accounts in agency management systems.</li>
              <li>Issuing renewals and cancellations to insureds and sending declaration pages and other documents as requested.</li>
              <li>Verifying endorsements for accuracy based on client requests and protocol.</li>
              <li>Processing non-premium-bearing endorsements.</li>
              <li>Processing certificates and evidence of insurance as requested by clients.</li>
              <li>Preparing ACORD forms (125, 126, 130, 140) and other supplemental forms required by clients.</li>
              <li>Processing ACORD 25, ACORD 28, and ACORD 27 for liability and property insurance evidence.</li>
              <li>Quoting multiple lines of insurance including workers’ compensation, commercial property, business auto, umbrella, auto, and home.</li>
            </ul>`.trim(),
      },
      {
        company: 'OutForce BPO',
        position: 'Account Executive',
        period: 'January 2020 – September 2021',
        bullets: [
          'Identifying potential customers or leads through inbound calling, networking, referrals, and online research.',
          'Assessing customer needs, interests, and budgets to determine purchase intent.',
          'Building and maintaining relationships with new and existing customers to drive loyalty and repeat business.',
          'Presenting product features and benefits and addressing customer questions and concerns.',
          'Using dialers to contact potential customers and share company information and benefits.',
          'Initiating contact via phone and email to create interest and move prospects through the sales funnel.',
          'Maintaining accurate records of sales activities, interactions, and transactions.',
          'Negotiating terms, pricing, and delivery to close sales and achieve targets.',
          'Following up after sales to ensure satisfaction and identify upsell or cross-sell opportunities.',
          'Onboarding customers, processing orders, tracking deliveries, and assisting via email, voice, and chat.',
        ],
      },
      {
        company: 'T-Mobile (100R RMS Collect Phils Inc)',
        position: 'Sales Expert / Virtual Retail Expert',
        period: 'December 2018 – January 2020',
        bullets: [
          'Assisting customers with inquiries, product availability, and store policies.',
          'Processing sales transactions, returns, and exchanges.',
          'Supporting customers with technology products such as phones and devices.',
          'Informing customers about promotions, loyalty programs, and pricing.',
        ],
      },
      {
        company: 'Sitel Philippines',
        position: 'Customer Service / Retail',
        period: 'November 2016 – December 2018',
        bullets: [
          'Assisting customers with inquiries, product availability, and store policies.',
          'Processing sales transactions, returns, and exchanges.',
          'Helping customers with technology products.',
          'Informing customers about ongoing promotions, loyalty programs, and pricing.',
        ],
      },
      {
        company: 'Sitel Philippines',
        position: 'Customer Support / Technical Support',
        period: 'February 2015 – November 2016',
        bullets: [
          'Diagnosing and resolving customer problems, technical issues, and service disruptions.',
          'Identifying root causes of technical issues and guiding customers through troubleshooting steps.',
          'Assisting with orders, tracking shipments, and handling returns or exchanges.',
          'Managing customer accounts and maintaining accurate records of interactions.',
          'Providing technical guidance and recommendations on product and service use.',
        ],
      },
    ];

    const educationEntries = [
      {
        school: 'STI College',
        degree: 'Hotel and Restaurant Services',
        year: '2011–2013',
      },
    ];

    const skillsHTML = generateSkillsHTML(skills);
    const toolsHTML = generateToolsHTML(tools);
    const employmentHTML = generateEmploymentAccordionHTML(employmentEntries);
    const educationHTML = generateEducationHTML(educationEntries);

    const updates = {
      name: 'Geraldine',
      'main-category': 'Insurance Virtual Assistant',
      'experience-years': '3+ years',
      languages: 'English',
      availability: 'Full Time',
      'title-2': 'INSURANCE VIRTUAL ASSISTANT | PERSONAL & COMMERCIAL LINES',
      summary:
        'Geraldine is an experienced Insurance Virtual Assistant with a background in both personal and commercial lines. She has handled quoting, endorsements, renewals, cancellations, certificates, and policy documentation while ensuring accuracy and compliance with industry standards. Her experience also includes preparing ACORD forms and supporting clients, mortgage companies, and carriers through email and phone communication.',
      tagline:
        'Detail-oriented insurance virtual assistant for personal and commercial lines support',
      'thumbnail-description':
        'Insurance virtual assistant supporting personal and commercial lines with quoting, ACORD forms, renewals, and policy processing.',
      'skills-tags': skills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': tools.join(', '),
      'tools-richtext': toolsHTML,
      'employment-summary':
        'Geraldine has over three years of experience as an Insurance Virtual Assistant handling personal and commercial lines, including quoting, endorsements, renewals, cancellations, and policy documentation. She has prepared and processed ACORD forms, certificates, and evidence of insurance while maintaining accurate client records in agency management systems. In addition, she brings several years of experience in sales and customer service roles, supporting clients through phone, email, and chat while maintaining high service standards.',
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
    };

    console.log('📤 Sending updates for Geraldine:');
    console.log(JSON.stringify(updates, null, 2));

    await client.updateCollectionItem(vaCollection.id, geraldine.id, updates, { isDraft: false });

    console.log('✅ Geraldine core profile updated successfully.\n');
  } catch (error) {
    console.error('❌ Error updating Geraldine:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

