/**
 * Update Angel Alberto in Webflow CMS: DISC Description, English level,
 * Employment richtext, Education richtext.
 * Run with: node scripts/updateAngelAlbertoMissingFields.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

if (!token || !siteId) {
  console.error('❌ WEBFLOW_API_TOKEN and WEBFLOW_SITE_ID required in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateEmploymentAccordionHTML(entries) {
  if (!entries || entries.length === 0) return '';
  const iconSvg = `<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

  const accordions = entries.map((entry) => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = entry.description || '';
    if (description.includes('\n')) {
      description = description.replace(/\n/g, '<br>');
    }
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

function generateEducationHTML(educationEntries) {
  if (!educationEntries || educationEntries.length === 0) return '';
  return educationEntries
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

const DISC_S_DESCRIPTION =
  'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.';

const ENGLISH_DESCRIPTION =
  'Demonstrates strong fluency, excellent comprehension, and confident professional communication in complex business environments.';

const employmentHistory = [
  {
    company: 'Royal Holiday | Vacations Club',
    position: 'New Members Department/Recovery/Collections/Portfolio Conversion/Sales',
    period: 'SEP 15, 2024 – DEC 4, 2025',
    description: `Strengthened client relationships following the recent sale of their membership. Delivered immediate onboarding for membership usage, consistently promoting and closing sales of associated services (travel destinations, insurance products, and other benefits). Supported clients by addressing a wide range of needs, from general inquiries to complex cases.
Specialized in client retention and cancellation management, implementing strategies to recover accounts and maintain loyalty. Managed client portfolios by ensuring payment follow-up and leading the recovery of delinquent accounts through effective negotiation.
Handled and supported client portfolios in both English and French. Recovered previously cancelled accounts through effective negotiation strategies. Performed portfolio conversions between different companies to expand the client base, particularly through the sale of new products. Conducted direct product sales to prospects.
Developed efficient internal communication across company departments to resolve member needs. Proficient in Microsoft Office (Advanced Level).`,
  },
  {
    company: 'Landing | Premium Furnished Apartment Rentals | Start-Up',
    position: 'Member Support Analyst',
    period: 'JUN 10, 2024 – JUL 19, 2024',
    description: `Member Support Analyst Responsibilities: I was responsible for assisting clients with both general and complex inquiries regarding their Landing leaseholder memberships. My role included supporting immediate reservation changes, resolving emergency and maintenance unit requests, and quoting new stays by analyzing variables such as unit and building characteristics. I also provided guidance on billing issues while fostering strong relationships with clients, ensuring their concerns and emotions were addressed to create an excellent customer experience. Additionally, I developed efficient internal communication across departments to report and resolve member issues, while leveraging advanced iOS software and hardware tools to support daily operations.`,
  },
  {
    company: 'Allstate Insurance Company-Qualfon Mexico',
    position: 'Insurance Customer Care Representative | Unlicensed Agent and Roadside Assistance Department',
    period: 'AUG 21 – JUN 4',
    description: `Unlicensed Agent Key Responsibilities: Assisting general and elaborated inquiries about client's insurance products in each USA state. Explaining and educating how policy holder's insurance or policy works. Supporting and following up customers´ endorsements and billings critical scenarios. Endorsing and quoting policies. Developing relations with customers and taking care their thoughts and emotions. Creating a splendid customer experience | Coaching partner and Floor Support: Assisting and educating internal Allstate agents about insurance product´s processes.
Roadside Assistance Key Responsibilities: Assisting motor vehicles emergency scenes by offering different services as towing, winch, tire change, jump start and fuel delivery support. Quoting and dealing with providers to obtain the best inquired services: Price-Quality-ETA. Explaining and Educating how Roadside services work. Developing relations with customers and taking care their thoughts and emotions in any situation. Creating a splendid customer experience.
Advanced Microsoft software and hardware usage: Office most used package apps.`,
  },
  {
    company: 'CILEC or Centro Internacional de Lenguas Extranjeras y Educación Continua (International Center for Foreign Languages and Continuing Education)',
    position: 'English and French Teacher',
    period: 'JAN 22 – DEC 22',
    description: `Key Responsibilities: Educating English and French Languages divided in three ways of teaching: Grammar, Listening and Speaking. Developing pedagogy strategies for language learning. Creating relations with students and taking care of their thoughts and emotions to ameliorate the quality of education.`,
  },
  {
    company: 'MDK Narvarte or Moo Du Kwan Narvarte',
    position: 'Tae Kwon Do Teacher',
    period: 'JAN 15 – OCT 21',
    description: `Key Responsibilities: Educating children, teenagers and adults about Tae Kwon Do Martial Art divided in three ways of teaching: Philosophy, Martial and Sportive practice. Preparing for belt upgrade and tournaments. Refereeing national and international tournaments. Developing strategies for motor and psychological skills to ameliorate the learning of ethical and moral values. Creating relations with students and taking care of their thoughts and emotions to ameliorate the quality of education.`,
  },
  {
    company: 'Galia Chef',
    position: 'Restaurant Customer Care',
    period: 'MAY 18 – AUG 18',
    description: `Key Responsibilities: Assisting client's inquiries. Facilitating the translate of customer's needs in different languages, commonly in English, French and Portuguese. Developing communication skills to provide a splendid customer experience and increase the business sales. Administrating the business' bills and supplies.`,
  },
];

const education = [
  { school: 'CNSF or Comision Nacional de Seguros y Fianzas', degree: 'Insurance Agent A1.', year: '' },
  { school: 'UNAM or National Autonomous University of Mexico', degree: 'Modern Literature and Letters in French Language | French Level C1-C2.', year: '' },
  { school: "Bachelor's degree in CCH SUR-UNAM or Colegio de Ciencias y Humanidades", degree: 'DELF-DALF French Diplomas | Foreign Exchange to France-Paris.', year: '' },
  { school: 'CEI or Centro de Capacitación Ejecutiva en Idiomas', degree: 'Advanced B2 English Diploma.', year: '' },
];

async function main() {
  try {
    console.log('🔧 Updating Angel Alberto: DISC Description, English, Employment richtext, Education richtext...\n');

    const collectionsResponse = await client.getCollections(siteId);
    const vaCollection = collectionsResponse.collections.find((c) => c.slug === 'virtual-assistants');
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    let allVAs = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      const res = await client.getCollectionItems(vaCollection.id, { limit, offset });
      if (!res.items || res.items.length === 0) break;
      allVAs = allVAs.concat(res.items);
      if (res.items.length < limit) break;
      offset += limit;
    }

    const angel = allVAs.find((v) => (v.fieldData.slug || '').toLowerCase().trim() === 'angel-alberto');
    if (!angel) {
      console.error('❌ Angel Alberto (slug: angel-alberto) not found in CMS');
      process.exit(1);
    }

    console.log(`✅ Found Angel Alberto (${angel.id})\n`);

    const employmentHTML = generateEmploymentAccordionHTML(employmentHistory);
    const educationHTML = generateEducationHTML(education);
    const discDescriptionHTML = `<p>${DISC_S_DESCRIPTION}</p>`;
    const englishDescriptionHTML = `<p>${ENGLISH_DESCRIPTION}</p>`;

    const updates = {
      'disc-description': discDescriptionHTML,
      'english-description': englishDescriptionHTML,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
    };

    await client.updateCollectionItem(vaCollection.id, angel.id, updates, { isDraft: false });

    console.log('✅ Angel Alberto updated successfully.\n');
    console.log('  - DISC Description: S (Steadiness)');
    console.log('  - English level / description: C1 description');
    console.log(`  - Employment richtext: ${employmentHistory.length} entries`);
    console.log(`  - Education richtext: ${education.length} entries`);
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
