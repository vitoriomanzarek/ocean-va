/**
 * Create Federico VA in Webflow CMS
 * Run with: node scripts/createFederico.js
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
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
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

  return entries
    .map((entry) => {
      const company = escapeHtml(entry.company || '');
      const position = escapeHtml(entry.position || '');
      const period = escapeHtml(entry.period || '');
      let description = entry.description || '';

      // Escape HTML but preserve line breaks
      description = escapeHtml(description);
      description = description.replace(/\n/g, '<br>');
      description = description.replace(/•/g, '•');

      return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
    })
    .join('');
}

function generateEducationHTML(entries) {
  if (!entries || entries.length === 0) return '';

  return entries
    .map((entry, index) => {
      const school = escapeHtml(entry.school || '');
      const degree = escapeHtml(entry.degree || '');
      const year = escapeHtml(entry.year || '');

      const marginTop = index > 0 ? ' style="margin-top: 16px;"' : '';

      return `<div class="va-education-item"${marginTop}><h3 class="va-education-school">${school}</h3><p class="va-education-degree">${degree}</p><p class="va-education-year">${year}</p></div>`;
    })
    .join('');
}

function generateToolsHTML(toolsList) {
  if (!toolsList || toolsList.length === 0) return '';

  const items = toolsList
    .map(
      (tool) =>
        `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(
          tool,
        )}</span></div>`,
    )
    .join('');

  const listClass =
    toolsList.length > 6 ? 'va-tools-list two-column' : 'va-tools-list';

  return `<div class="${listClass}">${items}</div>`;
}

function generateSkillsHTML(skillsList) {
  if (!skillsList || skillsList.length === 0) return '';

  const tags = skillsList
    .map(
      (skill) =>
        `<span class="va-skill-tag">${escapeHtml(skill)}</span>`,
    )
    .join('');

  return tags;
}

function generateEquipmentHTML(equipmentList) {
  if (!equipmentList || equipmentList.length === 0) return '';

  const equipmentIcons = {
    'Two-Monitor Setup':
      `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-Cancelling Headset':
      `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
    'Two monitors':
      `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
    'Noise-canceling headset':
      `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
  };

  const items = equipmentList
    .map((equip) => {
      const icon =
        equipmentIcons[equip] ||
        equipmentIcons[equip.replace(/[^a-zA-Z0-9\s-]/g, '')] ||
        '';
      return `<div class="va-equipment-item">${icon}<span>${escapeHtml(
        equip,
      )}</span></div>`;
    })
    .join('');

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
    'Can interact with ease and can differentiate their shades of meaning.',
  ];

  const items = cefrLevels
    .map((level, idx) => {
      const isActive = level === activeLevel;
      const bubbleClass = isActive
        ? 'va-cefr-bubble-active'
        : 'va-cefr-bubble-inactive';
      const description = cefrDescriptions[idx];

      return `<div class="va-cefr-item">
  <div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(
    level,
  )}</div>
  <p class="va-cefr-description">${escapeHtml(description)}</p>
</div>`;
    })
    .join('\n');

  return items;
}

// Get Main Categories IDs
async function getMainCategoriesIds() {
  const MAIN_CATEGORIES_COLLECTION_ID =
    process.env.WEBFLOW_MAIN_CATEGORIES_COLLECTION_ID ||
    '691f65ddf62cb29a405fc022';

  try {
    const response = await client.getCollectionItems(
      MAIN_CATEGORIES_COLLECTION_ID,
    );
    const map = new Map();
    if (response.items && Array.isArray(response.items)) {
      response.items.forEach((item) => {
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
    const discField = collection.fields.find(
      (f) => f.slug === 'disc-type-2',
    );

    if (!discField || !discField.validations || !discField.validations.options) {
      console.warn('⚠️  DISC field not found or has no options');
      return null;
    }

    // Find option by name (case insensitive)
    const option = discField.validations.options.find(
      (opt) => opt.name.toLowerCase() === discTypeName.toLowerCase(),
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
    console.log('🚀 Creating Federico VA in Webflow CMS...\n');

    // Federico data
    const name = 'Federico';
    const slug = generateSlug(name);
    const imageUrl =
      'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69949acbe12b7efeacacf8fc_Federico.webp';
    const videoUrl = 'https://youtu.be/bKFwyeHv5ck';
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
      (col) => col.slug === 'virtual-assistants',
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(
      `📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`,
    );

    // Get Main Categories
    const mainCategoriesMap = await getMainCategoriesIds();
    const mainCategoryName = 'Property Management Virtual Assistant';
    const mainCategoryId =
      mainCategoriesMap.get(mainCategoryName.toLowerCase()) ||
      mainCategoriesMap.get('property-management-virtual-assistant') ||
      mainCategoriesMap.get('real-estate-virtual-assistant');

    if (!mainCategoryId && mainCategoryName) {
      console.warn(
        `⚠️  Main Category "${mainCategoryName}" not found. Available categories:`,
        Array.from(mainCategoriesMap.keys()),
      );
    }

    // Employment History
    const employmentEntries = [
      {
        company:
          'Assistant Property Manager & Maintenance Coordinator (Remote, US Portfolio)',
        position:
          'Assistant Property Manager & Maintenance Coordinator',
        period: 'Feb 2022 - Jan 2026',
        description:
          'Coordinated maintenance operations across 181 single-family and multi-family properties (250+ units) in Rochester, NY, managing ~20 work orders per day across electrical, mechanical, HVAC, plumbing, roofing, pest control, and safety systems.\n' +
          'Oversaw ~$30K average monthly maintenance budget, reviewing estimates, approving invoices, and reconciling final costs to ensure budget adherence and cost efficiency.\n' +
          'Managed and dispatched 7+ active contractors daily, balancing availability, trade specialization, urgency level, and service quality.\n' +
          'Reviewed and challenged technical scopes and estimates up to $18K per job, preventing overpricing and correcting incorrect or incomplete work proposals.\n' +
          'Enforced SLA-based response times: emergencies <24h, routine maintenance within 3 days, and capital or large corrective works up to 30 days.\n' +
          'Coordinated weekly city, safety, and compliance inspections, managing contractor follow-ups, corrective actions, and documentation for owners, municipalities, and insurance carriers.\n' +
          'Simultaneously managed ~10 active maintenance or repair projects, ensuring timeline adherence through assertive follow-up, detailed documentation, and proactive stakeholder communication.\n' +
          'Reduced unnecessary costs by proposing alternative repair strategies, preventive maintenance plans, and right-sizing contractor selection (specialist vs handyman) without compromising safety or compliance.\n' +
          'Acted as an escalation point for health, safety, and compliance-related incidents, ensuring regulatory alignment and risk mitigation.',
      },
      {
        company: 'H2NO Aguascalientes (Hybrid: remote/on-site)',
        position: 'Logistics, Customer Service, Sales & Team Management',
        period: 'Dec 2019 - May 2022',
        description:
          'Managed logistics and delivery operations, including route design and scheduling.\n' +
          'Led communication with customers and delivery teams to ensure on-time service.\n' +
          'Prepared estimates for large sales and supported bookkeeping and business administration.\n' +
          'Handled data analysis, project management, and digital marketing initiatives.',
      },
      {
        company: 'Freelance Property Manager Mexico (Hybrid: remote/on-site)',
        position: 'Freelance Property Manager',
        period: 'Sep 2018 - May 2022',
        description:
          'Managed maintenance, leasing, accounting, and inspections for rental properties.\n' +
          'Handled minor maintenance tasks personally and coordinated vendors for larger jobs.\n' +
          'Managed resident service, lease agreements, marketing, screening applicants, and rental analysis.\n' +
          'Acted as middleman between tenants and owners for communication and issue resolution.',
      },
    ];

    // Education
    const educationEntries = [
      {
        school:
          'Universidad Autónoma de Aguascalientes / UNADM / Universidad Cuauhtémoc Aguascalientes',
        degree:
          'Construction Engineer (incomplete), Renewable Energy Engineer (incomplete), Architecture (in progress)',
        year: '2018 - 2027 (expected)',
      },
      {
        school:
          'University of Pennsylvania (Coursera), Google (Coursera), UNAM',
        degree:
          'Courses in finance and accounting, business administration, and project management',
        year: '2023 - 2024',
      },
    ];

    // Skills (reduced to top 10)
    const skills = [
      'Maintenance Coordination',
      'Vendor Management',
      'Emergency Response',
      'Work Order Management',
      'Repair Troubleshooting',
      'Renovation Projects',
      'Tenant Communication',
      'Guest Support',
      'Lease Administration',
      'Move-in Support',
    ];

    // Tools (reduced to top 10)
    const tools = [
      'Airbnb Dashboard',
      'Booking.com',
      'AppFolio',
      'Buildium',
      'Property Meld',
      'Propertyware',
      'QuickBooks',
      'Monday.com',
      'Canva',
      'DocuSign',
    ];

    // Equipment
    const equipment = ['Noise-canceling headset', 'Two monitors'];

    // Generate HTML
    const employmentHTML = generateEmploymentHTML(employmentEntries);
    const educationHTML = generateEducationHTML(educationEntries);
    const skillsHTML = generateSkillsHTML(skills);
    const toolsHTML = generateToolsHTML(tools);
    const equipmentHTML = generateEquipmentHTML(equipment);

    // Employment Summary
    const employmentSummary =
      'Federico has almost eight years of experience in property management across residential, multifamily, and commercial portfolios in Mexico and the U.S. He has worked as a Maintenance Coordinator and Assistant Property Manager, managing high-volume maintenance workflows, vendor coordination, tenant and guest communication, emergency response, leasing support, move-ins/move-outs, delinquency follow-ups, and budget tracking.';

    // Summary
    const summary =
      'Federico has almost eight years of experience in property management, supporting residential, multifamily, and commercial properties. He has managed short-term and long-term rentals in Mexico and the U.S., working as a Maintenance Coordinator and Assistant Property Manager. His experience includes high-volume maintenance workflows, vendor coordination, tenant and guest communication, emergency response, leasing support, move-ins/move-outs, delinquency follow-ups, and budget tracking.';

    // Experience years (from CV: nearly 8 years)
    const experienceYears = '8';

    // Languages
    const languages = 'English, Spanish';

    // Availability
    const availability = 'Full Time';

    // Title
    const title =
      'Property Management Virtual Assistant | Maintenance Coordinator';

    // Tagline
    const tagline =
      'Federico is a strong hire with hands-on experience managing maintenance operations across U.S. and Mexico-based portfolios. He coordinates vendors, resolves urgent repairs, supports resident communication, and tracks budgets with consistency and accountability.';

    // Thumbnail Description (card highlights)
    const thumbnailDescription =
      'MAINTENANCE COORDINATION, SHORT-TERM RENTALS, LONG-TERM RENTALS, VENDOR COORDINATION';

    // DISC Type
    const discTypeName = 'C+S';
    const discTypeId = await getDISCOptionId(vaCollection.id, discTypeName);

    if (!discTypeId) {
      console.warn(
        '⚠️  Could not get DISC Type ID. You may need to set it manually in Webflow.',
      );
    }

    // DISC Description
    const discDescription =
      'C+S profile – Detail-oriented, structured, and steady. Federico combines analytical thinking and reliability, making him well-suited for maintenance coordination, documentation, and process-driven property management tasks where accuracy and consistency are critical.';

    // English Test Information
    const englishTestType = 'EF English Test';
    const englishScore = '90';
    const englishDescription =
      'Strong fluency for professional communication, including complex discussions, writing, and daily business interactions.';

    // CEFR Level
    const cefrLevel = 'C1';
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
      'equipment-tags': equipment.join(', '),
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
    console.log(
      `   Experience Years: ${experienceYears || 'NOT SET'}`,
    );
    console.log(`   Languages: ${languages || 'NOT SET'}`);
    console.log(`   Availability: ${availability || 'NOT SET'}`);
    console.log(`   Employment Entries: ${employmentEntries.length}`);
    console.log(`   Education Entries: ${educationEntries.length}`);
    console.log(`   Skills: ${skills.length}`);
    console.log(`   Tools: ${tools.length}`);
    console.log(`   Equipment: ${equipment.length}\n`);

    // Validate required fields
    if (!mainCategoryId) {
      console.warn(
        '⚠️  Main Category ID not found. The VA will be created but may need manual category assignment.',
      );
    }

    // Create VA item
    console.log('🔄 Creating VA item in Webflow...\n');

    const result = await client.createCollectionItem(
      vaCollection.id,
      fieldData,
      {
        isDraft: false, // Publish immediately
      },
    );

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
        console.warn(
          '⚠️  Could not publish item automatically:',
          publishError.message,
        );
        console.log(
          '   You may need to publish it manually in Webflow.\n',
        );
      }
    }

    console.log('🎉 Federico VA created and published in Webflow CMS!');
    console.log(
      `   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${slug}\n`,
    );
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

