/**
 * Analizar VAs específicos con problemas identificados
 * Extraer datos del CMS para comparar con el modelo Drue
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

// VAs con problemas identificados
const PROBLEMATIC_VAS = [
  'ac',
  'aaron-a0d16',
  'abigail',
  'albert',
  'alejandro',
  'alyssa',
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

async function fetchAllVAs() {
  try {
    console.log('🔗 Fetching all VAs from Webflow CMS...\n');

    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    // Fetch all items
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

    return allItems;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

function analyzeVA(va, drueModel) {
  const issues = [];
  const fieldData = va.fieldData;

  // 1. Employment Summary
  if (!fieldData['employment-summary'] || fieldData['employment-summary'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'employment-summary',
      severity: 'high',
    });
  }

  // 2. Employment History (richtext)
  if (!fieldData['employment-richtext'] || fieldData['employment-richtext'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'employment-richtext',
      severity: 'high',
    });
  } else {
    // Verificar estructura
    const employmentHtml = fieldData['employment-richtext'];
    
    // Verificar títulos de empresas
    if (!employmentHtml.includes('va-employment-accordion-company')) {
      issues.push({
        type: 'structure',
        field: 'employment-richtext',
        issue: 'Missing company titles',
        severity: 'high',
      });
    }

    // Verificar bullet points
    if (!employmentHtml.includes('<p>•') && !employmentHtml.includes('<li>')) {
      issues.push({
        type: 'structure',
        field: 'employment-richtext',
        issue: 'Missing bullet points',
        severity: 'medium',
      });
    }
  }

  // 3. Education
  if (!fieldData['education-richtext'] || fieldData['education-richtext'].trim() === '') {
    // No es problema si no tiene educación
  } else {
    const educationHtml = fieldData['education-richtext'];
    
    // Verificar duplicados (contar ocurrencias de va-education-item)
    const educationItemCount = (educationHtml.match(/va-education-item/g) || []).length;
    if (educationItemCount > 1) {
      issues.push({
        type: 'duplicate',
        field: 'education-richtext',
        count: educationItemCount,
        severity: 'high',
      });
    }

    // Verificar año
    if (!educationHtml.includes('va-education-year')) {
      issues.push({
        type: 'missing',
        field: 'education-richtext',
        issue: 'Missing year',
        severity: 'medium',
      });
    }

    // Verificar símbolos raros
    if (educationHtml.match(/[^\x00-\x7F]/g)) {
      const weirdChars = educationHtml.match(/[^\x00-\x7F]/g);
      issues.push({
        type: 'format',
        field: 'education-richtext',
        issue: 'Weird characters found',
        characters: [...new Set(weirdChars)],
        severity: 'medium',
      });
    }
  }

  // 4. DISC
  const discType = fieldData['disc-type-2'];
  const discDescription = fieldData['disc-description'] || '';
  
  if (discType && discDescription) {
    // Verificar orden (S+C vs C+S, D+I vs I+D)
    const typeStr = discType; // Esto es un ID, necesitamos el valor real
    const descStr = discDescription.toLowerCase();
    
    // Verificar saltos de línea
    if (!discDescription.includes('<p>') && !discDescription.includes('<br')) {
      issues.push({
        type: 'format',
        field: 'disc-description',
        issue: 'Missing line breaks between paragraphs',
        severity: 'low',
      });
    }
  }

  // 5. English Results
  if (!fieldData['type-of-english-test'] || fieldData['type-of-english-test'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'type-of-english-test',
      severity: 'medium',
    });
  }

  // 6. Skills
  if (!fieldData['skills-richtext'] || fieldData['skills-richtext'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'skills-richtext',
      severity: 'high',
    });
  }

  // 7. Thumbnail Description
  if (!fieldData['thumbnail-description'] || fieldData['thumbnail-description'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'thumbnail-description',
      severity: 'medium',
    });
  }

  // 8. Video
  if (!fieldData['video'] || fieldData['video'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'video',
      severity: 'medium',
    });
  }

  // 9. CERF Result
  if (!fieldData['cerf-result'] || fieldData['cerf-result'].trim() === '') {
    issues.push({
      type: 'missing',
      field: 'cerf-result',
      severity: 'high',
    });
  }

  return issues;
}

async function main() {
  try {
    console.log('🔍 Analyzing problematic VAs...\n');

    // Fetch Drue as reference
    const allVAs = await fetchAllVAs();
    const drue = allVAs.find(
      (va) => va.fieldData.slug === 'drue' || va.fieldData.name?.toLowerCase().includes('drue')
    );

    if (!drue) {
      console.error('❌ Drue not found');
      process.exit(1);
    }

    console.log('✅ Drue found as reference model\n');

    // Analyze each problematic VA
    const analysis = {};

    for (const slug of PROBLEMATIC_VAS) {
      const va = allVAs.find((v) => v.fieldData.slug === slug);
      
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        analysis[slug] = { found: false };
        continue;
      }

      const issues = analyzeVA(va, drue);
      analysis[slug] = {
        found: true,
        name: va.fieldData.name,
        issues,
        issueCount: issues.length,
        highSeverityCount: issues.filter((i) => i.severity === 'high').length,
      };

      console.log(`\n📊 ${va.fieldData.name} (${slug}):`);
      console.log(`   Issues: ${issues.length} (${issues.filter((i) => i.severity === 'high').length} high)`);
      
      if (issues.length > 0) {
        issues.forEach((issue) => {
          const icon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
          console.log(`   ${icon} ${issue.field}: ${issue.type} - ${issue.issue || 'N/A'}`);
        });
      }
    }

    // Save analysis
    const reportPath = 'reports/vas-problems-analysis.json';
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));

    // Summary
    console.log('\n' + '═'.repeat(80));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(80));
    
    const totalIssues = Object.values(analysis).reduce((sum, va) => sum + (va.issueCount || 0), 0);
    const totalHigh = Object.values(analysis).reduce((sum, va) => sum + (va.highSeverityCount || 0), 0);
    
    console.log(`Total VAs analyzed: ${PROBLEMATIC_VAS.length}`);
    console.log(`Total issues found: ${totalIssues}`);
    console.log(`High severity issues: ${totalHigh}`);
    console.log(`\n💾 Full analysis saved to: ${reportPath}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
