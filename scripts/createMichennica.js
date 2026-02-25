/**
 * Create Michennica VA in Webflow CMS
 * Run with: node scripts/createMichennica.js
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

function generateEquipmentHTML(equipmentList) {
  if (!equipmentList || equipmentList.length === 0) return '';
  
  const equipmentIcons = {
    'Two-Monitor Setup': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-Cancelling Headset': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
    'Two monitors': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-canceling headset': `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`
  };
  
  const items = equipmentList.map(equip => {
    const icon = equipmentIcons[equip] || equipmentIcons[equip.replace(/[^a-zA-Z0-9\s-]/g, '')] || '';
    return `<div class="va-equipment-item">${icon}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
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

function generateCEFRHTML(activeLevel) {
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const cefrDescriptions = [
    'Can understand and use familiar everyday expressions and basic questions about personal details.',
    'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    'Can communicate confidently in a variety of academic and professional environments.',
    'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'Can interact with ease and can differentiate their shades of meaning.'
  ];
  
  const items = cefrLevels.map((level, idx) => {
    const isActive = level === activeLevel;
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    const description = cefrDescriptions[idx];
    
    return `<div class="va-cefr-item">
  <div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div>
  <p class="va-cefr-description">${escapeHtml(description)}</p>
</div>`;
  }).join('\n');
  
  return items;
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

// Get DISC Type option ID from collection field
async function getDISCOptionId(collectionId, discTypeName) {
  try {
    const collection = await client.getCollection(collectionId);
    const discField = collection.fields.find(f => f.slug === 'disc-type-2');
    
    if (!discField || !discField.validations || !discField.validations.options) {
      console.warn('⚠️  DISC field not found or has no options');
      return null;
    }
    
    // Find option by name (case insensitive)
    const option = discField.validations.options.find(
      opt => opt.name.toLowerCase() === discTypeName.toLowerCase()
    );
    
    if (option) {
      return option.id;
    }
    
    console.warn(`⚠️  DISC option "${discTypeName}" not found`);
    return null;
  } catch (error) {
    console.error('Error getting DISC option ID:', error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('🚀 Creating Michennica VA in Webflow CMS...\n');

    // Michennica data
    const name = 'Michennica';
    const slug = generateSlug(name);
    const imageUrl = 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/6993980ab80b846a01aecf6c_Michennica.webp';
    const videoUrl = ''; // Video URL to be added later if available
    const videoThumbnail = videoUrl ? generateVideoThumbnail(videoUrl) : null;

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
    const mainCategoryName = 'Property Management Virtual Assistant';
    const mainCategoryId = mainCategoriesMap.get(mainCategoryName.toLowerCase()) || 
                          mainCategoriesMap.get('property-management-virtual-assistant') ||
                          mainCategoriesMap.get('real-estate-virtual-assistant');

    if (!mainCategoryId && mainCategoryName) {
      console.warn(`⚠️  Main Category "${mainCategoryName}" not found. Available categories:`, Array.from(mainCategoriesMap.keys()));
    }

    // Employment History
    const employmentEntries = [
      {
        company: 'Admin 24 Seven INC.',
        position: 'Sales Administrator & Property Management Assistant',
        period: 'May 2024 - Current',
        description: 'Sales Admin Duties:\n• Managing sales inquiries and client follow-ups.\n• Preparing and processing sales contracts, agreements, and documentation.\n• Updating and maintaining CRM systems (e.g., Agentbox).\n• Coordinating with agents, buyers, and solicitors for contract progression.\n• Organizing property marketing materials, listings, and advertising.\n• Scheduling property inspections and appointments.\n• Assisting with reports, market research, and sales data entry.\n• Handling general administrative tasks, including emails and phone calls.\n• Uploading photos of \'For Sale,\' \'Just Sold,\' and \'For Rent\' properties on social media.\n• Booking personal errands for the director via calls and emails.\n\nProperty Manager Assistant Duties:\n• Assisting with tenant inquiries and lease applications.\n• Processing rental applications and conducting reference checks.\n• Managing maintenance requests and coordinating with contractors.\n• Preparing lease agreements, renewal notices, and rental documentation.\n• Updating property management software (e.g., PropertyMe).\n• Assisting with property inspections, entry/exit reports, and routine checks.\n• Liaising with landlords and tenants regarding property updates.'
      },
      {
        company: 'Office Beacon Inc.PH',
        position: 'Customer Service & Sales Support Specialist',
        period: 'Sept 2021 - Jan 2024',
        description: '• Respond promptly and professionally to customer inquiries via phone, email, and live chat.\n• Provide accurate information about products, services, pricing, and promotions.\n• Resolve customer complaints and ensure customer satisfaction.\n• Process orders, returns, and exchanges efficiently and accurately.\n• Assist the sales team with administrative tasks such as preparing quotes, proposals, and sales contracts.\n• Collaborate with the marketing team to develop sales materials and presentations.\n• Maintain customer records and update the CRM system with relevant information.\n• Work closely with the customer service team, sales team, and other departments to ensure a seamless customer experience.\n• Share customer feedback and insights with the relevant teams to improve products and services.'
      },
      {
        company: 'EastWest BPO Inc.',
        position: 'Customer Service & Order Entry',
        period: 'Apr 2021 - Sept 2021',
        description: '• Provide prompt and professional assistance across an eclectic mix of communication channels including phone, email, and live chat, showcasing exceptional multitasking abilities.\n• Navigate the complexities of order processing, returns, and exchanges with a meticulous eye for detail, ensuring operational efficiency and accuracy at every turn.\n• Craft compelling quotes, proposals, and sales contracts, lending administrative prowess to support the sales team in their endeavors.\n• Proactively engage with leads and prospects, nurturing relationships and driving conversions through strategic follow-up communication.\n• Collaborate seamlessly with the marketing department to develop captivating sales materials and presentations that resonate with diverse audiences.\n• Maintain meticulous customer records and update the CRM system with pertinent insights, facilitating personalized interactions that leave a lasting impression.'
      },
      {
        company: 'AM Savvy Solutions United Inc.',
        position: 'Sales Agent / Outbound Caller',
        period: 'Mar 2020 - Nov 2020',
        description: '• Maximizing the efficiency and effectiveness of outbound calls through strategic management.\n• Maximizing outreach potential with efficiency and effectiveness by handling a high volume of outbound calls.\n• Consider offering a membership program to potential customers as it can lead to an increase in sales.\n• Assists new and existing accounts with their correct information (Name, Address, contact & etc.)'
      }
    ];

    // Education
    const educationEntries = [
      {
        school: 'Systems Plus College Foundation',
        degree: 'Computer Secretarial',
        year: '2010-2011'
      }
    ];

    // Skills
    const skills = [
      'Tenant Communication',
      'Maintenance Coordination',
      'Vendor Management',
      'Inspection Scheduling',
      'Lease Renewals',
      'Lease Administration',
      'Entry/Exit Reports',
      'Move-in Coordination',
      'Move-out Coordination',
      'Listing Management',
      'Document Preparation',
      'CRM Updates',
      'Customer Service',
      'Sales Support',
      'Data Entry',
      'Calendar Management',
      'Research and Analysis',
      'Effective Communication',
      'Critical Thinking',
      'Property Management'
    ];

    // Tools
    const tools = [
      'DocuSign',
      'Mailchimp',
      'GoHighLevel',
      'Canva',
      'HubSpot',
      'ClickUp',
      'Monday.com',
      'RingCentral',
      'Xero',
      'MS Office',
      'Corelogic RP Data',
      'PropertyMe',
      'Agentbox',
      'G-Suite',
      'Amazon Workspace',
      'Smartsheet',
      'Power BI',
      'Realworks',
      'Ignite',
      'Inspect Real Estate'
    ];

    // Equipment
    const equipment = [
      'Noise-canceling headset',
      'Two monitors'
    ];

    // Generate HTML
    const employmentHTML = generateEmploymentHTML(employmentEntries);
    const educationHTML = generateEducationHTML(educationEntries);
    const skillsHTML = generateSkillsHTML(skills);
    const toolsHTML = generateToolsHTML(tools);
    const equipmentHTML = generateEquipmentHTML(equipment);

    // Employment Summary
    const employmentSummary = `${name} has four years of experience in the BPO industry and currently works as a Real Estate Virtual Assistant since 2024. She has supported entrepreneurs and businesses across various industries by managing administrative tasks, organizing schedules, conducting research, and ensuring smooth communication. Currently serving as Sales Administrator & Property Management Assistant at Admin 24 Seven INC., managing tenant communication, lease administration, maintenance coordination, and property listings. Previous roles include Customer Service & Sales Support Specialist at Office Beacon Inc.PH, Customer Service & Order Entry at EastWest BPO Inc., and Sales Agent at AM Savvy Solutions United Inc.`;

    // Summary
    const summary = `${name} is a Property Management Virtual Assistant with 1 year and 8 months of experience supporting Australian residential long-term rentals (LTR). She manages tenant communication, schedules routine inspections, and coordinates maintenance requests with trades and vendors. She prepares key documentation such as entry notices and lease renewals, and supports move-in/move-out workflows including entry/exit routines, bond cleaning, and smoke alarm checks. She also assists with property listings and leasing support, including advertising approvals and photography coordination.`;

    // Calculate experience years (4 years BPO + 1.8 years property management = ~5-6 years total, but focusing on property management: 2 years)
    const experienceYears = '2';

    // Languages
    const languages = 'English';

    // Availability
    const availability = 'Full Time';

    // Title
    const title = 'Property Management Virtual Assistant';

    // Tagline
    const tagline = `${name} is a strong candidate for long-term rental support, with hands-on experience managing tenant communication, inspection scheduling, maintenance coordination, and leasing documentation.`;

    // Thumbnail Description
    const thumbnailDescription = 'LEASE ADMINISTRATION, VENDOR COORDINATION, RESIDENT COMMUNICATIONS';

    // DISC Type
    const discTypeName = 'S';
    const discTypeId = await getDISCOptionId(vaCollection.id, discTypeName);
    
    if (!discTypeId) {
      console.warn('⚠️  Could not get DISC Type ID. You may need to set it manually in Webflow.');
    }

    // DISC Description
    const discDescription = `Steadiness (S) - Reliable and methodical. S-type VAs excel in maintaining consistency, following established processes, and providing stable, dependable support. They work well in structured environments and are excellent at building long-term relationships with clients and team members.`;

    // English Test Information
    const englishTestType = 'EF English Test';
    const englishScore = '75';
    const englishDescription = 'Demonstrating clear and reliable English for day-to-day professional communication. She can confidently handle routine coordination, written updates, and workplace conversations in English.';

    // CEFR Level
    const cefrLevel = 'B1';
    const cefrHTML = generateCEFRHTML(cefrLevel);

    // Prepare field data
    const fieldData = {
      name: name,
      slug: slug,
      'profile-slug-2': `/virtual-assistants/${slug}`,
      'main-category': mainCategoryName,
      'main-categories': mainCategoryId ? [mainCategoryId] : [],
      'experience-years': experienceYears,
      languages: languages,
      availability: availability,
      'title-2': title,
      image: imageUrl,
      video: videoUrl,
      'video-thumbnail-2': videoThumbnail,
      summary: summary,
      tagline: tagline,
      'thumbnail-description': thumbnailDescription,
      'employment-richtext': employmentHTML,
      'employment-summary': employmentSummary,
      'education-richtext': educationHTML,
      'skills-richtext': `<div class="va-skills-container">${skillsHTML}</div>`,
      'tools-richtext': toolsHTML,
      'equipment-richtext': equipmentHTML,
      'skills-tags': skills.join(', '),
      'tools-tags': tools.join(', '),
      'equipment-tags': equipment.join(', ')
    };

    // Add DISC, English, and CEFR fields if available
    if (discTypeId) {
      fieldData['disc-type-2'] = discTypeId;
    }
    if (discDescription) {
      fieldData['disc-description'] = discDescription;
    }
    if (englishTestType) {
      fieldData['type-of-english-test'] = englishTestType;
    }
    if (englishScore) {
      fieldData['english-score-3'] = englishScore;
    }
    if (englishDescription) {
      fieldData['english-description'] = englishDescription;
    }
    if (cefrHTML) {
      fieldData['cerf-result'] = cefrHTML;
    }

    console.log('📋 Field Data Prepared:');
    console.log(`   Name: ${name}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Main Category: ${mainCategoryName || 'NOT SET'}`);
    console.log(`   Experience Years: ${experienceYears || 'NOT SET'}`);
    console.log(`   Languages: ${languages || 'NOT SET'}`);
    console.log(`   Availability: ${availability || 'NOT SET'}`);
    console.log(`   Employment Entries: ${employmentEntries.length}`);
    console.log(`   Education Entries: ${educationEntries.length}`);
    console.log(`   Skills: ${skills.length}`);
    console.log(`   Tools: ${tools.length}`);
    console.log(`   Equipment: ${equipment.length}\n`);

    // Validate required fields
    if (!mainCategoryId) {
      console.warn('⚠️  Main Category ID not found. The VA will be created but may need manual category assignment.');
    }

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

    console.log('🎉 Michennica VA created and published in Webflow CMS!');
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
