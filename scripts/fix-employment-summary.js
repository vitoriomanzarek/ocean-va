/**
 * Corregir Employment Summary para VAs específicos
 * Genera employment-summary basado en employment-richtext o datos disponibles
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

// VAs que necesitan Employment Summary corregido
const VAS_TO_FIX = [
  'alyssa',
  'ana',
  'ana-gabriela',
  'ana-victoria',
  'andrea',
  'andres',
  'balbina',
  'bernadette-abellana',
  'brandon',
];

// Función para generar employment summary desde employment-richtext
function generateEmploymentSummary(va) {
  const employmentHtml = va.fieldData['employment-richtext'] || '';
  const summary = va.fieldData['employment-summary'] || '';
  const name = va.fieldData.name || '';
  const title = va.fieldData['title-2'] || '';
  
  // Si ya tiene un summary bueno, usarlo
  if (summary && summary.length > 100) {
    return null; // Ya tiene summary
  }
  
  // Extraer información de employment-richtext
  const companies = [];
  const positions = [];
  
  // Buscar nombres de empresas
  const companyMatches = employmentHtml.match(/<h4 class="va-employment-accordion-company">([^<]+)<\/h4>/g);
  if (companyMatches) {
    companyMatches.forEach(match => {
      const company = match.replace(/<[^>]+>/g, '').trim();
      if (company) companies.push(company);
    });
  }
  
  // Buscar posiciones
  const positionMatches = employmentHtml.match(/<p class="va-employment-accordion-position">([^<]+)<\/p>/g);
  if (positionMatches) {
    positionMatches.forEach(match => {
      const position = match.replace(/<[^>]+>/g, '').trim();
      if (position) positions.push(position);
    });
  }
  
  // Generar summary básico
  if (companies.length > 0 || positions.length > 0) {
    const experience = companies.length > 0 
      ? `with experience at ${companies.join(', ')}`
      : `with experience as ${positions.join(', ')}`;
    
    return `${name} is a ${title.toLowerCase()} ${experience}. ${name} brings structured support and professional expertise to help clients manage operations efficiently.`;
  }
  
  // Si no hay información, usar template genérico
  return `${name} is a ${title.toLowerCase()} with extensive experience in virtual assistance. ${name} brings structured support and professional expertise to help clients manage operations efficiently.`;
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

async function updateVA(collectionId, itemId, fieldData, vaName) {
  try {
    const result = await client.updateCollectionItem(collectionId, itemId, fieldData, {
      isDraft: false,
    });
    return { success: true, result };
  } catch (error) {
    console.error(`   ❌ Error updating ${vaName}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  try {
    console.log('🔧 Fixing Employment Summary...\n');
    console.log('⚠️  DRY RUN MODE - No changes will be made to CMS\n');
    console.log('   Set DRY_RUN=false in .env to apply changes\n');

    const { allItems, vaCollection } = await fetchAllVAs();
    const dryRun = process.env.DRY_RUN !== 'false';
    
    const results = {
      timestamp: new Date().toISOString(),
      dryRun,
      fixes: {}
    };

    for (const slug of VAS_TO_FIX) {
      const va = allItems.find((v) => v.fieldData.slug === slug);
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        continue;
      }

      const currentSummary = va.fieldData['employment-summary'] || '';
      const newSummary = generateEmploymentSummary(va);
      
      if (newSummary && currentSummary !== newSummary) {
        console.log(`\n✅ ${va.fieldData.name} (${slug}):`);
        console.log(`   Current: ${currentSummary.substring(0, 100)}...`);
        console.log(`   New: ${newSummary.substring(0, 100)}...`);
        
        if (!dryRun) {
          const updateResult = await updateVA(
            vaCollection.id,
            va.id,
            { 'employment-summary': newSummary },
            va.fieldData.name
          );
          results.fixes[slug] = {
            success: updateResult.success,
            newSummary
          };
        } else {
          results.fixes[slug] = {
            wouldUpdate: true,
            newSummary
          };
        }
      } else if (!newSummary) {
        console.log(`⏭️  ${va.fieldData.name} (${slug}): Already has good summary`);
      }
    }

    // Save results
    const reportPath = 'reports/employment-summary-fix-results.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(80));
    console.log(`Mode: ${dryRun ? 'DRY RUN (no changes made)' : 'LIVE (changes applied)'}`);
    console.log(`VAs processed: ${VAS_TO_FIX.length}`);
    console.log(`Fixes prepared: ${Object.keys(results.fixes).length}`);
    console.log(`\n💾 Results saved to: ${reportPath}`);
    
    if (dryRun) {
      console.log('\n⚠️  To apply changes, set DRY_RUN=false in .env and run again');
      console.log('⚠️  NOTE: Review generated summaries and adjust manually if needed');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
