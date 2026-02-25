/**
 * Script to fix Patricio's Employment History by restoring original entries
 * and adding the new Influencer Marketing Manager entry correctly
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

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

function generateEmploymentHTML(entries) {
  if (!entries || entries.length === 0) return '';
  
  return entries.map(entry => {
    const company = escapeHtml(entry.company || '');
    const position = escapeHtml(entry.position || '');
    const period = escapeHtml(entry.period || '');
    let description = entry.description || '';
    
    // Preserve <br> tags by temporarily replacing them, then escaping, then restoring
    const brPlaceholder = '___BR_TAG___';
    description = description.replace(/<br\s*\/?>/gi, brPlaceholder);
    
    // Escape HTML
    description = escapeHtml(description);
    
    // Restore <br> tags (they should not be escaped)
    description = description.replace(new RegExp(brPlaceholder, 'g'), '<br>');
    
    // Also handle newlines if they exist
    description = description.replace(/\n/g, '<br>');
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
  }).join('');
}

// Original employment entries from the HTML file
const originalEntries = [
  {
    company: 'JELLYFISH MEXICO',
    position: 'Paid Search Analyst Sr / SEO Analyst',
    period: 'JANUARY 2024 - MAY 2025',
    description: `• Led the implementation, optimization, and scaling of high-impact campaigns across Google Ads (Search, Display, Demand Gen, Performance Max) and Meta Ads platforms.<br>• Managed a monthly advertising budget exceeding MXN $15M, ensuring cost-effective allocation aligned with business objectives.<br>• Oversaw DSP campaigns, including Amazon Ads, Mercado Libre Ads, and Criteo, with a strong focus on retargeting strategies and ROAS improvement.<br>• Launched and optimized Bing Ads campaigns targeted to U.S. audiences, adapting messaging and targeting based on regional behavior and funnel stage.<br>• Delivered monthly performance reports to stakeholders, presenting KPIs and actionable insights using platforms such as Looker Studio and Google Sheets, ensuring strategic alignment and accountability.<br>• Collaborated cross-functionally with internal creative teams, copywriters, account managers, and IT departments to address technical issues, align messaging, and drive campaign performance.<br>• Consistently maintained ROAS above 12 across all managed campaigns by applying rigorous A/B testing, budget pacing, and segmentation strategies.<br>• Key KPIs tracked: ROAS, ROI, CPA, CPC, CTR, Conversion Rate`
  },
  {
    company: 'MOBILITY ADO',
    position: 'SEO / SEM Manager',
    period: 'MARCH 2020 - DECEMBER 2023',
    description: `• Coordinated the design, content, PR, and IT teams for creating campaign assets.<br>• Brainstormed with the team to generate campaign strategies.<br>• Created and optimized Google Ads, Facebook Ads, Twitter Ads, and LinkedIn Ads campaigns.<br>• Conducted keywords and Google Trends research.<br>• Generated weekly Search Query Reports to find and negate irrelevant terms.<br>• Managed budget distribution for campaigns.<br>• Delivered monthly reports and KPI measurement.<br>• Developed SEO strategies for MOBILITY ADO blog.<br>• Created content for the blog.`
  },
  {
    company: 'ESQGO LAW FIRM',
    position: 'SEO Manager',
    period: 'APRIL 2022 - JULY 2024',
    description: `• Planned and implemented SEO campaigns.<br>• Analyzed sites and compared competitors using SEO tools - Ahrefs, SEMrush, MOZ.<br>• Managed content indexing through GSC (Google Search Console).<br>• Executed link building, Link Intersect, and guest posting strategies.<br>• Implemented SEO on-page and off-page strategies.<br>• Fixed errors through Google Search Console in collaboration with IT team.<br>• Created roadmaps of the website's technical situation: Breadcrumbs, Core Web Vitals, Errors, Warnings.<br>• Generated sitemaps.`
  },
  {
    company: 'FREELANCE PROJECTS',
    position: 'Paid Search / Email Marketing',
    period: '2018 - 2024',
    description: `• Managed and executed B2B email marketing campaigns, sending approximately 20,000 emails monthly to business clients.<br>• Achieved an average open rate of 25%, a click-through rate of 5%, and a conversion rate of 2%. Maintained a bounce rate below 1% and an unsubscribe rate below 0.5%.<br>• Utilized tools like Mailchimp, SendGrid, and Gmass for creating, sending, and tracking email campaigns. Conducted A/B testing to optimize subject lines and content.<br>• Implemented list segmentation and double opt-in policies to improve email relevance and deliverability. Maintained domain reputation using DKIM and SPF authentications.<br>• KPIs: CTR, Conversion Rate, Unsubscribe Rate, SPAM complete rate, Engagement Over Time: Tracking how engagement metrics (open, click, conversion rates) change over different periods.<br>• Edited and produced video content for brands such as SpeedTalk, Jolt Mobile, and NivelarTec, transforming raw footage into polished, publication-ready assets.<br>• Applied narrative editing, audio enhancement, color correction, and visual optimization to ensure professional quality.<br>• Adapted videos to fit multiple formats and platforms, including Meta, TikTok, and YouTube, respecting platform-specific requirements and best practices.<br>• Ensured brand consistency and high visual standards across all videos, including product showcases, campaign creatives, and social media content.<br>• Proficient in video editing software such as Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, CapCut, and Adobe After Effects for motion graphics and visual storytelling.`
  }
];

// New employment entry
const newEmploymentEntry = {
  company: 'INFLUENCER MARKETING AGENCY (MEXICO)',
  position: 'Influencer Marketing Manager (Mexico)',
  period: '2018 – 2020',
  description: `• Brand Portfolio Management: I led influencer marketing strategies for a premium portfolio including Heineken, Dos Equis (XX), Amstel Light, and Miller High Life.<br>• Performance-Driven Negotiations: I managed direct outreach and negotiations with influencers and talent agencies, aligning content deliverables and usage rights with specific budget and ROI targets.<br>• Contractual Compliance & Oversight: I personally oversaw contract reviews to ensure all legal terms, exclusivity clauses, and brand guidelines were fully met before execution.<br>• On-Site Brand Activation: I accompanied selected influencers to brand events to ensure real-time fulfillment of contracted deliverables, including live stories and on-site content creation.<br>• High-Conversion Sourcing: I scaled influencer prospecting via Instagram, maintaining a 20% conversion rate by successfully converting 60 live posts from 300 monthly outreach contacts.<br>• Full-Cycle Execution: I handled the entire collaboration workflow, from initial seeding and gifting to final content approval and KPI reporting using Social Snowball, Google Sheets, and Archive.`
};

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
    console.log('🚀 Fixing Patricio\'s Employment History...\n');

    // Find Patricio
    const vaName = 'Patricio';
    console.log(`🔍 Searching for ${vaName}...`);
    
    const va = await getVAByName(vaName);
    
    if (!va) {
      console.error(`❌ VA "${vaName}" not found`);
      process.exit(1);
    }

    console.log(`✅ Found VA: ${va.fieldData?.name} (ID: ${va.id})`);
    console.log(`   Slug: ${va.fieldData?.slug || 'N/A'}\n`);

    // Rebuild employment HTML with all original entries + new entry
    // The new entry (2018-2020) should go after Mobility ADO (2020-2023) and before Esqgo (2022-2024)
    // Actually, let's put it chronologically: after Freelance (2018-2024) since it's more specific
    const allEntries = [
      originalEntries[0], // Jellyfish (2024-2025)
      originalEntries[1], // Mobility ADO (2020-2023)
      originalEntries[2], // Esqgo (2022-2024)
      originalEntries[3], // Freelance (2018-2024)
      newEmploymentEntry  // New entry (2018-2020)
    ];

    const updatedEmploymentHTML = generateEmploymentHTML(allEntries);
    
    console.log('📝 Rebuilt Employment History with:');
    console.log(`   - ${allEntries.length} total entries`);
    console.log(`   - New entry: ${newEmploymentEntry.company}`);
    console.log(`   - Total HTML length: ${updatedEmploymentHTML.length} characters\n`);

    // Update the VA item
    const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';
    
    console.log('🔄 Updating VA item in Webflow...\n');
    
    const fieldData = {
      'employment-richtext': updatedEmploymentHTML
    };

    const result = await client.updateCollectionItem(
      VA_COLLECTION_ID,
      va.id,
      fieldData,
      {
        isDraft: false // Keep published
      }
    );

    console.log('✅ Successfully updated Patricio\'s employment history!');
    console.log(`   Item ID: ${result.item?.id || result.id}`);
    console.log(`   Name: ${result.fieldData?.name || va.fieldData?.name}\n`);

    // Publish the item
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

    console.log('🎉 Patricio\'s employment history fixed and updated successfully!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${va.fieldData?.slug || 'patricio'}\n`);

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
