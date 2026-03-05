/**
 * Update Angel Alberto core profile fields in Webflow CMS.
 * Run with: node scripts/updateAngelAlbertoCoreProfile.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { angelData } from './addAngelAlbertoToWebflow.js';

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

async function main() {
  try {
    console.log('🔧 Updating Angel Alberto core profile fields in Webflow CMS...\n');

    const collectionsResponse = await client.getCollections(siteId);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants',
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    const itemsResponse = await client.getCollectionItems(vaCollection.id, { limit: 200 });
    const angel = itemsResponse.items.find(
      (item) => (item.fieldData.slug || '').toLowerCase().trim() === angelData.slug,
    );

    if (!angel) {
      console.error(`❌ Angel Alberto (slug: ${angelData.slug}) not found in CMS`);
      process.exit(1);
    }

    console.log(`✅ Found Angel Alberto in CMS (id: ${angel.id})\n`);

    const skillsHTML = generateSkillsHTML(angelData.allSkills);
    const toolsHTML = generateToolsHTML(angelData.tools);

    const updates = {
      'title-2': angelData.title,
      summary: angelData.summary,
      tagline: angelData.tagline,
      'skills-tags': angelData.allSkills.join(', '),
      'skills-richtext': skillsHTML,
      'tools-tags': angelData.tools.join(', '),
      'tools-richtext': toolsHTML,
    };

    console.log('📤 Sending updates:');
    console.log(`  Title: ${updates['title-2']}`);
    console.log(`  Summary: ${updates.summary}`);
    console.log(`  Tagline: ${updates.tagline}`);
    console.log(`  Skills: ${updates['skills-tags']}`);
    console.log(`  Tools: ${updates['tools-tags']}\n`);

    await client.updateCollectionItem(vaCollection.id, angel.id, updates, { isDraft: false });

    console.log('✅ Angel Alberto core profile updated successfully.\n');
  } catch (error) {
    console.error('❌ Error updating Angel Alberto:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();

