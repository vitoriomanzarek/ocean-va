/**
 * Create Clark Chua VA in Webflow CMS
 * Run with: node scripts/createClarkChua.js
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

// Helper functions
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

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return '';
  
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = entry.description || '';
    
    // Escape HTML but preserve line breaks
    description = escapeHtml(description);
    description = description.replace(/\n/g, '<br>');
    description = description.replace(/•/g, '•');
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
  }).join('');
}

function generateEducationHTML(entries) {
  if (!entries || entries.length === 0) return '';
  
  return entries.map((entry, index) => {
    const school = escapeHtml(entry.school || '');
    const degree = escapeHtml(entry.degree || '');
    const year = escapeHtml(entry.year || '');
    
    const marginTop = index > 0 ? ' style="margin-top: 16px;"' : '';
    
    return `<div class="va-education-item"${marginTop}><h3 class="va-education-school">${school}</h3><p class="va-education-degree">${degree}</p><p class="va-education-year">${year}</p></div>`;
  }).join('');
}

function generateToolsHTML(toolsList) {
  if (!toolsList || toolsList.length === 0) return '';
  
  const items = toolsList.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  
  const listClass = toolsList.length > 6 ? 'va-tools-list two-column' : 'va-tools-list';
  
  return `<div class="${listClass}">${items}</div>`;
}

function generateSkillsHTML(skillsList) {
  if (!skillsList || skillsList.length === 0) return '';
  
  const tags = skillsList.map(skill => 
    `<span class="va-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');
  
  return tags;
}

function generateVideoThumbnail(videoUrl) {
  // Extract YouTube video ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = videoUrl.match(pattern);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  }
  return null;
}

// Get Main Categories IDs
async function getMainCategoriesIds() {
  const MAIN_CATEGORIES_COLLECTION_ID = process.env.WEBFLOW_MAIN_CATEGORIES_COLLECTION_ID || '691f65ddf62cb29a405fc022';
  
  try {
    const response = await client.getCollectionItems(MAIN_CATEGORIES_COLLECTION_ID);
    const map = new Map();
    if (response.items && Array.isArray(response.items)) {
      response.items.forEach(item => {
        const name = item.fieldData?.name;
        if (name) {
          map.set(name.toLowerCase(), item.id);
          if (item.fieldData?.slug) {
            map.set(item.fieldData.slug.toLowerCase(), item.id);
          }
        }
      });
    }
    return map;
  } catch (error) {
    console.error('Error fetching Main Categories:', error);
    return new Map();
  }
}

async function main() {
  try {
    console.log('🚀 Creating Clark Chua VA in Webflow CMS...\n');

    // Clark Chua data from resume
    const name = 'Clark Chua';
    const slug = generateSlug(name);
    const imageUrl = 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/698cd503c7117dd09cb2a498_Clark%20Chua.webp';
    const videoUrl = 'https://youtu.be/jIOxy0cLHG4';
    const videoThumbnail = generateVideoThumbnail(videoUrl);

    // Get sites and collection
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    // Get Main Categories
    const mainCategoriesMap = await getMainCategoriesIds();
    const mainCategoryName = 'Real Estate Virtual Assistant';
    const mainCategoryId = mainCategoriesMap.get(mainCategoryName.toLowerCase()) || 
                          mainCategoriesMap.get('real-estate-virtual-assistant');

    if (!mainCategoryId) {
      console.warn(`⚠️  Main Category "${mainCategoryName}" not found. Available categories:`, Array.from(mainCategoriesMap.keys()));
    }

    // Employment History
    const employmentEntries = [
      {
        company: 'Ray White Maleny',
        position: 'Assistant Property Management',
        period: 'May 2023 - Nov 2025',
        description: 'Creating Entry Notice Forms\nOrdering Sign Boards\nProcessing Smoke Alarm Compliance, Safety Switch, Pool Certificate etc\nData Entry in our AirTable\nUpdating Rental Appraisal\nCalling/Email Property Manager to obtain relevant information of Tenancy before selling the Property\nCreating Listing for sale properties using PropertyME and REX and Ailo\nCommunicating with Tenants for maintenance, open homes, etc.\nNew Business Compliance\nUploading New tenancy Doc\'s: Application form, Forms of ID, Reference Checks\nMinimum Housing Standards (AU)'
      },
      {
        company: 'IQOR',
        position: 'Team Leader',
        period: 'Oct 2020 - Dec 2022',
        description: 'I was part of T-Mobile\'s sales department selling devices and mobile phone services. Providing coaching sessions, ensure experts are updated on promotions, and huddle with the team daily to ensure they follow instructions to close sales. I listen to calls to identify strengths and weaknesses of agents and handle admin tasks such as preparing and sending reports to management.'
      },
      {
        company: 'TATA CONSULTANCY SERVICES',
        position: 'Business Development Manager',
        period: 'June 2019 - Sept 2020',
        description: 'We update business information of the customer that are advertise on our website.\nWe assist customer through emails, tickets and during this pandemic, we are trained and become multi skilled to different platforms and back office works like Data Management, Data entry, Lead generation and Content Creator for their Listing.\nAssist clients and determine a suitable package for their business\nProvide a flow chart on how many clicks and visits has their advert made in a month or year.\nSchedule meetings with their Account Manager for further discussion about their product with us.\nWhenever some consumer put a review on our client\'s advert, we are informing our clients about the positive and negative reviews.'
      },
      {
        company: 'IQOR',
        position: 'Debt Collection Specialist',
        period: 'February 2017 - January 2019',
        description: 'Arrange for debt repayment or establish repayment schedules, based on customers\' financial situation.\nRecord information about financial status of customers and status of collection efforts. Monitor overdue accounts, receive payment and post amounts paid to customer accounts.\nI also do call listening for my teammates, a task given by my supervisor to me.\nI fill up the coaching points and needs to improve basic call handling skills and send it back to my supervisor.'
      }
    ];

    // Education
    const educationEntries = [
      {
        school: 'Holy Angel University',
        degree: 'Bachelor of Science in Aeronautical Engineering',
        year: ''
      }
    ];

    // Skills
    const skills = [
      'Leadership and Management',
      'Skills Coaching Skills',
      'Microsoft Office and Excel',
      'Autocad Drawing and Drafting',
      'Excellent Communication Skills',
      'Call Listening Skills',
      'Property Management',
      'Data Entry',
      'Customer Service',
      'Sales',
      'Account Management'
    ];

    // Tools
    const tools = [
      'Microsoft Office',
      'Excel',
      'Autocad',
      'AirTable',
      'PropertyME',
      'REX',
      'Ailo',
      'Email',
      'CRM Systems'
    ];

    // Generate HTML
    const employmentHTML = generateEmploymentHTML(employmentEntries);
    const educationHTML = generateEducationHTML(educationEntries);
    const skillsHTML = generateSkillsHTML(skills);
    const toolsHTML = generateToolsHTML(tools);

    // Employment Summary
    const employmentSummary = `${name} has extensive experience in Sales, Customer Service, and Account Management, with recent specialization in Property Management. Currently serving as Assistant Property Manager at Ray White Maleny, managing property listings, tenant communications, and compliance documentation. Previous roles include Team Leader at IQOR, Business Development Manager at TATA Consultancy Services, and Debt Collection Specialist.`;

    // Summary
    const summary = `${name} is an experienced professional with a strong background in Sales, Customer Service, and Account Management. Currently working as an Associate Property Manager, he brings expertise in property management, data entry, tenant relations, and compliance. With experience in team leadership, coaching, and customer service, ${name} is well-equipped to handle various administrative and client-facing responsibilities.`;

    // Calculate experience years (from 2017 to now = ~8 years)
    const experienceYears = '8';

    // Prepare field data
    const fieldData = {
      name: name,
      slug: slug,
      'profile-slug-2': `/virtual-assistants/${slug}`,
      'main-category': mainCategoryName,
      'main-categories': mainCategoryId ? [mainCategoryId] : [],
      'experience-years': experienceYears,
      languages: 'Bilingual (EN-ES)',
      availability: 'Full Time',
      'title-2': 'Associate Property Manager',
      image: imageUrl,
      video: videoUrl,
      'video-thumbnail-2': videoThumbnail,
      summary: summary,
      tagline: 'Experienced Property Management & Sales Professional',
      'thumbnail-description': 'Experienced Property Management & Sales Professional with expertise in customer service and account management.',
      'employment-richtext': employmentHTML,
      'employment-summary': employmentSummary,
      'education-richtext': educationHTML,
      'skills-richtext': `<div class="va-skills-container">${skillsHTML}</div>`,
      'tools-richtext': toolsHTML,
      'skills-tags': skills.join(', '),
      'tools-tags': tools.join(', ')
    };

    console.log('📋 Field Data Prepared:');
    console.log(`   Name: ${name}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Main Category: ${mainCategoryName}`);
    console.log(`   Experience Years: ${experienceYears}`);
    console.log(`   Languages: Bilingual (EN-ES)`);
    console.log(`   Availability: Full Time`);
    console.log(`   Employment Entries: ${employmentEntries.length}`);
    console.log(`   Education Entries: ${educationEntries.length}`);
    console.log(`   Skills: ${skills.length}`);
    console.log(`   Tools: ${tools.length}\n`);

    // Create VA item
    console.log('🔄 Creating VA item in Webflow...\n');

    const result = await client.createCollectionItem(vaCollection.id, fieldData, {
      isDraft: false, // Publish immediately
    });

    console.log('✅ VA created successfully!');
    console.log(`   Item ID: ${result.item?.id || result.id}`);
    console.log(`   Name: ${name}`);
    console.log(`   Slug: ${slug}\n`);

    // Publish the item
    if (result.item?.id) {
      console.log('🔄 Publishing item...');
      try {
        await client.publishItems(vaCollection.id, [result.item.id]);
        console.log('✅ Item published successfully!\n');
      } catch (publishError) {
        console.warn('⚠️  Could not publish item automatically:', publishError.message);
        console.log('   You may need to publish it manually in Webflow.\n');
      }
    }

    console.log('🎉 Clark Chua VA created and published in Webflow CMS!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${slug}\n`);

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
