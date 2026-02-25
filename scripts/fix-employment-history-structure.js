/**
 * Corregir estructura de Employment History
 * Asegurar que tenga títulos de empresas y bullet points correctos
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// VAs que necesitan corrección de Employment History
const VAS_TO_FIX = [
  'ac',
  'aaron-a0d16',
  'albert',
  'ana',
  'ana-gabriela',
  'ana-victoria',
  'anahi',
  'andrea',
  'andres',
  'angel',
  'antonio',
  'balbina',
  'bernadette-abellana',
  'brandon',
];

// Estructura correcta de un empleo (basada en Drue)
function createEmploymentItem(company, position, period, bullets) {
  const bulletsHtml = bullets.map(bullet => `<p>• ${bullet}</p>`).join('');
  
  return `<div class="va-employment-accordion">
<div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
<div class="va-employment-accordion-title">
<h4 class="va-employment-accordion-company">${company.toUpperCase()}</h4>
<p class="va-employment-accordion-position">${position}</p>
<p class="va-employment-accordion-period">${period}</p>
</div>
<svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
</svg>
</div>
<div class="va-employment-accordion-content">
<p class="va-employment-accordion-description">
${bulletsHtml}
</p>
</div>
</div>`;
}

function fixEmploymentHistory(employmentHtml) {
  if (!employmentHtml || employmentHtml.trim() === '') {
    return null; // No hay contenido para corregir
  }

  // Verificar si ya tiene la estructura correcta
  const hasCompanyTitle = employmentHtml.includes('va-employment-accordion-company');
  const hasBulletPoints = employmentHtml.includes('<p>•') || employmentHtml.includes('<li>');
  
  if (hasCompanyTitle && hasBulletPoints) {
    return null; // Ya está correcto
  }

  // Intentar extraer información del HTML existente
  // Esto es complejo, mejor hacerlo manualmente o con datos estructurados
  
  return employmentHtml; // Por ahora, retornar original
}

async function fetchAllVAs() {
  const sitesResponse = await client.getSites();
  const site = sitesResponse.sites[0];
  const collectionsResponse = await client.getCollections(site.id);
  const vaCollection = collectionsResponse.collections.find(
    (col) => col.slug === 'virtual-assistants'
  );

  let allItems = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const itemsResponse = await client.getCollectionItems(vaCollection.id, {
      limit,
      offset,
    });
    allItems = allItems.concat(itemsResponse.items);
    hasMore = itemsResponse.items.length === limit;
    offset += limit;
  }

  return { allItems, vaCollection };
}

async function main() {
  try {
    console.log('🔧 Fixing Employment History structure...\n');

    const { allItems, vaCollection } = await fetchAllVAs();
    
    const analysis = {};
    const needsManualFix = [];

    for (const slug of VAS_TO_FIX) {
      const va = allItems.find((v) => v.fieldData.slug === slug);
      
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        continue;
      }

      const employmentHtml = va.fieldData['employment-richtext'] || '';
      const hasCompanyTitle = employmentHtml.includes('va-employment-accordion-company');
      const hasBulletPoints = employmentHtml.includes('<p>•') || employmentHtml.includes('<li>');
      const isEmpty = !employmentHtml || employmentHtml.trim() === '';

      analysis[slug] = {
        name: va.fieldData.name,
        hasCompanyTitle,
        hasBulletPoints,
        isEmpty,
        needsFix: !hasCompanyTitle || !hasBulletPoints || isEmpty,
      };

      if (analysis[slug].needsFix) {
        needsManualFix.push({
          slug,
          name: va.fieldData.name,
          issues: [
            !hasCompanyTitle && 'Missing company titles',
            !hasBulletPoints && 'Missing bullet points',
            isEmpty && 'Empty content',
          ].filter(Boolean),
          currentHtml: employmentHtml.substring(0, 200) + '...',
        });

        console.log(`\n🔴 ${va.fieldData.name} (${slug}):`);
        if (!hasCompanyTitle) console.log('   ❌ Missing company titles');
        if (!hasBulletPoints) console.log('   ❌ Missing bullet points');
        if (isEmpty) console.log('   ❌ Empty content');
      } else {
        console.log(`✅ ${va.fieldData.name} (${slug}): OK`);
      }
    }

    // Save analysis
    const reportPath = 'reports/employment-history-fix-needed.json';
    fs.writeFileSync(reportPath, JSON.stringify({
      analysis,
      needsManualFix,
      template: createEmploymentItem('COMPANY NAME', 'Position Title', 'Period', ['Bullet 1', 'Bullet 2', 'Bullet 3']),
    }, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(80));
    console.log(`Total VAs checked: ${VAS_TO_FIX.length}`);
    console.log(`VAs needing fix: ${needsManualFix.length}`);
    console.log(`\n💾 Report saved to: ${reportPath}`);
    console.log('\n⚠️  NOTE: This script only identifies issues.');
    console.log('   Manual correction in CMS is required for each VA.');
    console.log('   Use the template structure provided in the report.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
