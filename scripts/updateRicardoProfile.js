/**
 * Update Ricardo core profile fields in Webflow CMS.
 * Run with: node scripts/updateRicardoProfile.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { ricardoData } from './addRicardoToWebflow.js';

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

function generateEquipmentHTML(equipment) {
  if (!equipment || equipment.length === 0) return '';
  const monitorSVG =
    '<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
  const headsetSVG =
    '<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a9 9 0 00-9 9v7a3 3 0 003 3h1a2 2 0 002-2v-4a2 2 0 00-2-2H5v-2a7 7 0 0114 0v2h-2a2 2 0 00-2 2v4a2 2 0 002 2h1a3 3 0 003-3v-7a9 9 0 00-9-9z"></path></svg>';

  const items = equipment
    .map((eq) => {
      const lower = eq.toLowerCase();
      const isMonitor = lower.includes('monitor');
      const svg = isMonitor ? monitorSVG : headsetSVG;
      return `<div class="va-equipment-item">${svg}<span>${escapeHtml(eq)}</span></div>`;
    })
    .join('');

  return `<div class="va-equipment-list">${items}</div>`;
}

function generateCEFRHTML(activeLevel) {
  if (!activeLevel) return '';
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const descriptions = {
    A1: 'Can understand and use familiar everyday expressions and basic questions about personal details.',
    A2: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    B1: 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    B2: 'Can communicate confidently in a variety of academic and professional environments.',
    C1: 'Can use the language flexibly and effectively for social, academic and professional purposes.',
    C2: 'Can interact with ease and can differentiate their shades of meaning.',
  };

  const items = levels
    .map((level) => {
      const isActive = level === activeLevel;
      const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
      return `<div class="va-cefr-item"><div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(
        level,
      )}</div><p class="va-cefr-description">${escapeHtml(descriptions[level])}</p></div>`;
    })
    .join('\n');

  return `<div class="va-cefr-grid">\n${items}\n</div>`;
}

function generateEmploymentAccordionHTML(entries) {
  if (!entries || entries.length === 0) return '';
  const iconSvg = `<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

  const accordions = entries.map((entry) => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = entry.description || '';
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

async function main() {
  try {
    console.log('🔧 Updating Ricardo core profile fields in Webflow CMS...\n');

    const collectionsResponse = await client.getCollections(siteId);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants',
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    // Fetch all VAs to find Ricardo by slug or name
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

    let ricardo = allItems.find(
      (item) => (item.fieldData.slug || '').toLowerCase().trim() === ricardoData.slug,
    );
    if (!ricardo) {
      ricardo = allItems.find(
        (item) => (item.fieldData.name || '').toLowerCase().trim() === 'ricardo',
      );
    }

    if (!ricardo) {
      console.error('❌ Ricardo not found in CMS (by slug or name)');
      console.error('   Total items in collection:', allItems.length);
      process.exit(1);
    }

    console.log(`✅ Found Ricardo in CMS (id: ${ricardo.id})\n`);

    const data = ricardoData;

    const skillsHTML = generateSkillsHTML(data.allSkills);
    const toolsHTML = generateToolsHTML(data.tools);
    const equipmentHTML = generateEquipmentHTML(data.equipment);
    const cefrHTML = data.cefrResult ? generateCEFRHTML(data.cefrResult) : '';
    const employmentHTML = generateEmploymentAccordionHTML(data.employmentHistory);
    const educationHTML = generateEducationHTML(data.education);
    const discDescriptionHTML = data.discDescription
      ? `<p>${escapeHtml(data.discDescription)}</p>`
      : '';
    const englishDescriptionHTML = data.englishDescription
      ? `<p>${escapeHtml(data.englishDescription)}</p>`
      : '';

    const updates = {
      name: data.name,
      'main-category': data.mainCategory,
      'experience-years': data.experienceYears,
      languages: data.languages,
      availability: data.availability,
      'title-2': data.title,
      summary: data.summary,
      tagline: data.tagline,
      'thumbnail-description': data.thumbnailDescription,
      image: data.imageUrl,
      video: data.videoUrl || '',
      'video-thumbnail-2': data.videoThumbnail || '',
      'skills-tags': data.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': data.tools.join(', '),
      'tools-richtext': toolsHTML,
      'equipment-tags': data.equipment.join(', '),
      'equipment-richtext': equipmentHTML,
      'employment-summary': data.employmentSummary,
      'employment-richtext': employmentHTML,
      'education-richtext': educationHTML,
    };

    if (data.discType) {
      updates['disc-type-2'] = data.discType;
    }
    if (discDescriptionHTML) {
      updates['disc-description'] = discDescriptionHTML;
    }
    if (data.englishTestType) {
      updates['type-of-english-test'] = data.englishTestType;
    }
    if (data.englishScore) {
      updates['english-score-3'] = data.englishScore;
    }
    if (englishDescriptionHTML) {
      updates['english-description'] = englishDescriptionHTML;
    }
    if (cefrHTML) {
      updates['cerf-result'] = cefrHTML;
    }

    console.log('📤 Sending updates for Ricardo:');
    console.log(JSON.stringify(updates, null, 2));

    await client.updateCollectionItem(vaCollection.id, ricardo.id, updates, { isDraft: false });

    console.log('✅ Ricardo core profile updated successfully.\n');
  } catch (error) {
    console.error('❌ Error updating Ricardo:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

