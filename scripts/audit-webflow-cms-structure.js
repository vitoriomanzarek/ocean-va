/**
 * Audit Webflow CMS Structure
 * Downloads all collections and fields from Webflow CMS
 * Compares with expected structure and generates a detailed report
 * 
 * Usage: node scripts/audit-webflow-cms-structure.js
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Expected fields structure based on documentation
const EXPECTED_VA_FIELDS = {
  // Basic Info (Auto-generated)
  'Name': { type: 'PlainText', required: true, existing: false },
  'Slug': { type: 'PlainText', required: true, existing: false },
  
  // Existing Basic Fields
  'name': { type: 'PlainText', existing: false },
  'title': { type: 'PlainText', existing: false },
  'main-category': { type: 'PlainText', existing: false },
  'experience-years': { type: 'PlainText', existing: false },
  'languages': { type: 'PlainText', existing: false },
  'availability': { type: 'PlainText', existing: false },
  'video-thumbnail': { type: 'PlainText', existing: false },
  'summary': { type: 'RichText', existing: false },
  'tagline': { type: 'PlainText', existing: false },
  'thumbnail-description': { type: 'PlainText', existing: false },
  'va-image': { type: 'Image', existing: false },
  'profile-slug': { type: 'Link', existing: false },
  'video-url': { type: 'VideoLink', existing: false },
  'specialization': { type: 'MultiReference', existing: false },
  
  // New Fields Needed
  'disc-badge': { type: 'Option', existing: false, needed: true },
  'disc-description': { type: 'RichText', existing: false, needed: true },
  'english-score': { type: 'Option', existing: false, needed: true },
  'english-description': { type: 'RichText', existing: false, needed: true },
  'youtube-url': { type: 'PlainText', existing: false, needed: true },
  'skills-html': { type: 'RichText', existing: false, needed: true },
  'tools-html': { type: 'RichText', existing: false, needed: true },
  'equipment-html': { type: 'RichText', existing: false, needed: true },
  'employment-history-html': { type: 'RichText', existing: false, needed: true },
  'education-html': { type: 'RichText', existing: false, needed: true },
  
  // Alternative: Multi-Reference fields (if not using HTML)
  'skills': { type: 'MultiReference', existing: false, needed: false, alternative: true },
  'tools': { type: 'MultiReference', existing: false, needed: false, alternative: true },
  'equipment': { type: 'MultiReference', existing: false, needed: false, alternative: true },
  'employment-history': { type: 'MultiReference', existing: false, needed: false, alternative: true },
  'education': { type: 'MultiReference', existing: false, needed: false, alternative: true },
};

const EXPECTED_COLLECTIONS = {
  'Virtual Assistants': { needed: true, fields: EXPECTED_VA_FIELDS },
  'VA Specializations': { needed: true, fields: {} },
  'Main Categories': { needed: true, fields: {} },
  'Skills': { needed: false, fields: {} }, // Optional
  'Tools': { needed: false, fields: {} }, // Optional
  'Equipment': { needed: false, fields: {} }, // Optional
  'Employment': { needed: false, fields: {} }, // Optional (if using multi-reference)
  'Education': { needed: false, fields: {} }, // Optional (if using multi-reference)
};

async function getAllCollectionItems(collectionId) {
  let allItems = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    try {
      const response = await client.getCollectionItems(collectionId, { limit, offset });
      const items = response.items || [];
      
      if (items.length === 0) break;
      
      allItems = allItems.concat(items);
      offset += limit;
      
      // If we got less than limit, we're done
      if (items.length < limit) break;
    } catch (error) {
      console.error(`Error fetching items from collection ${collectionId}:`, error.message);
      break;
    }
  }
  
  return allItems;
}

async function main() {
  try {
    console.log('🔍 Auditing Webflow CMS Structure...\n');
    
    // Step 1: Get sites
    console.log('📍 Step 1: Fetching sites...');
    const sitesResponse = await client.getSites();
    if (!sitesResponse.sites || sitesResponse.sites.length === 0) {
      console.error('❌ No sites found');
      process.exit(1);
    }
    
    const site = sitesResponse.sites[0];
    console.log(`✅ Site: ${site.displayName || site.name || 'Unnamed'}`);
    console.log(`   Site ID: ${site.id}\n`);
    
    // Step 2: Get all collections
    console.log('📍 Step 2: Fetching all collections...');
    const collectionsResponse = await client.getCollections(site.id);
    const collections = collectionsResponse.collections || [];
    console.log(`✅ Found ${collections.length} collection(s)\n`);
    
    // Step 3: Get detailed info for each collection
    console.log('📍 Step 3: Analyzing collections and fields...\n');
    
    const auditReport = {
      site: {
        id: site.id,
        name: site.displayName || site.name,
      },
      timestamp: new Date().toISOString(),
      collections: [],
      summary: {
        totalCollections: collections.length,
        expectedCollections: Object.keys(EXPECTED_COLLECTIONS).length,
        vaCollectionFound: false,
        vaCollectionFields: {
          total: 0,
          existing: 0,
          missing: 0,
          needed: 0,
          optional: 0,
        },
      },
    };
    
    let vaCollection = null;
    
    for (const collection of collections) {
      console.log(`📋 Analyzing: ${collection.displayName || collection.name || collection.slug}`);
      
      const collectionDetails = await client.getCollection(collection.id);
      
      const collectionInfo = {
        id: collection.id,
        name: collection.displayName || collection.name || collection.slug,
        slug: collection.slug,
        fields: [],
        itemCount: 0,
      };
      
      // Get field details
      for (const field of collectionDetails.fields || []) {
        const fieldInfo = {
          id: field.id,
          name: field.displayName || field.name,
          slug: field.slug,
          type: field.type,
          required: field.required || false,
          isSystemField: field.isSystemField || false,
          validations: field.validations || {},
        };
        
        // For Option fields, get options
        if (field.type === 'Option') {
          fieldInfo.options = field.validations?.options?.choices || [];
        }
        
        // For Multi-Reference fields, get referenced collection
        if (field.type === 'Set' && field.validations?.items?.ref) {
          fieldInfo.referencedCollection = field.validations.items.ref.collectionId;
        }
        
        collectionInfo.fields.push(fieldInfo);
      }
      
      // Get item count
      try {
        const items = await getAllCollectionItems(collection.id);
        collectionInfo.itemCount = items.length;
      } catch (error) {
        console.error(`  ⚠️  Could not get item count: ${error.message}`);
      }
      
      auditReport.collections.push(collectionInfo);
      
      // Check if this is the Virtual Assistants collection
      if (collection.slug === 'virtual-assistants' || 
          (collection.displayName || '').toLowerCase().includes('virtual assistant')) {
        vaCollection = collectionInfo;
        auditReport.summary.vaCollectionFound = true;
      }
      
      console.log(`  ✅ ${collectionInfo.fields.length} fields, ${collectionInfo.itemCount} items\n`);
    }
    
    // Step 4: Analyze Virtual Assistants collection specifically
    if (vaCollection) {
      console.log('📍 Step 4: Analyzing Virtual Assistants collection fields...\n');
      
      const fieldMap = {};
      vaCollection.fields.forEach(field => {
        fieldMap[field.slug] = field;
        fieldMap[field.name.toLowerCase()] = field; // Also map by display name
      });
      
      // Compare with expected fields
      const fieldAnalysis = {
        existing: [],
        missing: [],
        needed: [],
        optional: [],
        unexpected: [],
      };
      
      for (const [expectedSlug, expectedInfo] of Object.entries(EXPECTED_VA_FIELDS)) {
        const found = fieldMap[expectedSlug];
        
        if (found) {
          expectedInfo.existing = true;
          expectedInfo.foundField = found;
          fieldAnalysis.existing.push({
            slug: expectedSlug,
            name: found.name,
            type: found.type,
            expectedType: expectedInfo.type,
            match: found.type.toLowerCase() === expectedInfo.type.toLowerCase() || 
                   (expectedInfo.type === 'MultiReference' && found.type === 'Set'),
          });
        } else {
          expectedInfo.existing = false;
          if (expectedInfo.needed) {
            fieldAnalysis.missing.push({
              slug: expectedSlug,
              type: expectedInfo.type,
              reason: 'Required for form',
            });
          } else if (expectedInfo.alternative) {
            fieldAnalysis.optional.push({
              slug: expectedSlug,
              type: expectedInfo.type,
              reason: 'Alternative to HTML approach',
            });
          }
        }
      }
      
      // Find unexpected fields (fields in CMS not in our expected list)
      vaCollection.fields.forEach(field => {
        if (!field.isSystemField && !Object.keys(EXPECTED_VA_FIELDS).includes(field.slug)) {
          fieldAnalysis.unexpected.push({
            slug: field.slug,
            name: field.name,
            type: field.type,
          });
        }
      });
      
      auditReport.summary.vaCollectionFields = {
        total: vaCollection.fields.length,
        existing: fieldAnalysis.existing.length,
        missing: fieldAnalysis.missing.length,
        needed: fieldAnalysis.missing.filter(f => f.reason === 'Required for form').length,
        optional: fieldAnalysis.optional.length,
        unexpected: fieldAnalysis.unexpected.length,
      };
      
      auditReport.vaCollectionAnalysis = {
        collectionId: vaCollection.id,
        collectionName: vaCollection.name,
        fieldAnalysis,
        allFields: vaCollection.fields,
      };
      
      // Print summary
      console.log('📊 Virtual Assistants Collection Analysis:\n');
      console.log(`  Total Fields: ${vaCollection.fields.length}`);
      console.log(`  ✅ Existing (matched): ${fieldAnalysis.existing.length}`);
      console.log(`  ❌ Missing (needed): ${fieldAnalysis.missing.length}`);
      console.log(`  ⚠️  Optional (alternatives): ${fieldAnalysis.optional.length}`);
      console.log(`  🔍 Unexpected (not in expected list): ${fieldAnalysis.unexpected.length}\n`);
      
      if (fieldAnalysis.existing.length > 0) {
        console.log('✅ Existing Fields:');
        fieldAnalysis.existing.forEach(f => {
          const match = f.match ? '✅' : '⚠️  (type mismatch)';
          console.log(`  ${match} ${f.name} (${f.slug}) - Type: ${f.type}`);
        });
        console.log();
      }
      
      if (fieldAnalysis.missing.length > 0) {
        console.log('❌ Missing Required Fields:');
        fieldAnalysis.missing.forEach(f => {
          console.log(`  - ${f.slug} (${f.type}) - ${f.reason}`);
        });
        console.log();
      }
      
      if (fieldAnalysis.unexpected.length > 0) {
        console.log('🔍 Unexpected Fields (not in expected list):');
        fieldAnalysis.unexpected.forEach(f => {
          console.log(`  - ${f.name} (${f.slug}) - Type: ${f.type}`);
        });
        console.log();
      }
    } else {
      console.log('⚠️  Virtual Assistants collection not found!\n');
    }
    
    // Step 5: Save detailed report
    const reportPath = path.join(__dirname, '../data/webflow-cms-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));
    console.log(`✅ Detailed report saved to: ${reportPath}\n`);
    
    // Step 6: Generate markdown summary
    const markdownPath = path.join(__dirname, '../docs/WEBFLOW-CMS-AUDIT-REPORT.md');
    const markdown = generateMarkdownReport(auditReport);
    fs.writeFileSync(markdownPath, markdown);
    console.log(`✅ Markdown report saved to: ${markdownPath}\n`);
    
    // Final summary
    console.log('📊 FINAL SUMMARY:\n');
    console.log(`  Site: ${auditReport.site.name}`);
    console.log(`  Total Collections: ${auditReport.summary.totalCollections}`);
    console.log(`  VA Collection Found: ${auditReport.summary.vaCollectionFound ? '✅' : '❌'}`);
    
    if (auditReport.summary.vaCollectionFound) {
      const vaFields = auditReport.summary.vaCollectionFields;
      console.log(`  VA Fields:`);
      console.log(`    Total: ${vaFields.total}`);
      console.log(`    Existing: ${vaFields.existing}`);
      console.log(`    Missing (Required): ${vaFields.needed}`);
      console.log(`    Optional: ${vaFields.optional}`);
    }
    
    console.log('\n✅ Audit Complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function generateMarkdownReport(auditReport) {
  let md = `# Webflow CMS Structure Audit Report\n\n`;
  md += `**Generated**: ${auditReport.timestamp}\n`;
  md += `**Site**: ${auditReport.site.name} (${auditReport.site.id})\n\n`;
  
  md += `## Summary\n\n`;
  md += `- **Total Collections**: ${auditReport.summary.totalCollections}\n`;
  md += `- **VA Collection Found**: ${auditReport.summary.vaCollectionFound ? '✅ Yes' : '❌ No'}\n\n`;
  
  if (auditReport.summary.vaCollectionFound) {
    const vaFields = auditReport.summary.vaCollectionFields;
    md += `### Virtual Assistants Collection\n\n`;
    md += `- **Total Fields**: ${vaFields.total}\n`;
    md += `- **Existing (Matched)**: ${vaFields.existing} ✅\n`;
    md += `- **Missing (Required)**: ${vaFields.needed} ❌\n`;
    md += `- **Optional (Alternatives)**: ${vaFields.optional} ⚠️\n`;
    md += `- **Unexpected**: ${vaFields.unexpected} 🔍\n\n`;
  }
  
  md += `## All Collections\n\n`;
  auditReport.collections.forEach(collection => {
    md += `### ${collection.name}\n\n`;
    md += `- **ID**: \`${collection.id}\`\n`;
    md += `- **Slug**: \`${collection.slug}\`\n`;
    md += `- **Items**: ${collection.itemCount}\n`;
    md += `- **Fields**: ${collection.fields.length}\n\n`;
    
    if (collection.fields.length > 0) {
      md += `| Field Name | Slug | Type | Required |\n`;
      md += `|------------|------|------|----------|\n`;
      collection.fields.forEach(field => {
        const name = field.name.replace(/\|/g, '\\|');
        const slug = field.slug.replace(/\|/g, '\\|');
        md += `| ${name} | \`${slug}\` | ${field.type} | ${field.required ? '✅' : ''} |\n`;
      });
      md += `\n`;
    }
  });
  
  if (auditReport.vaCollectionAnalysis) {
    md += `## Virtual Assistants Collection - Detailed Analysis\n\n`;
    
    const analysis = auditReport.vaCollectionAnalysis.fieldAnalysis;
    
    if (analysis.existing.length > 0) {
      md += `### ✅ Existing Fields\n\n`;
      md += `| Field Name | Slug | Type | Match |\n`;
      md += `|------------|------|------|-------|\n`;
      analysis.existing.forEach(f => {
        md += `| ${f.name} | \`${f.slug}\` | ${f.type} | ${f.match ? '✅' : '⚠️  Type mismatch'} |\n`;
      });
      md += `\n`;
    }
    
    if (analysis.missing.length > 0) {
      md += `### ❌ Missing Required Fields\n\n`;
      md += `| Slug | Type | Reason |\n`;
      md += `|------|------|--------|\n`;
      analysis.missing.forEach(f => {
        md += `| \`${f.slug}\` | ${f.type} | ${f.reason} |\n`;
      });
      md += `\n`;
    }
    
    if (analysis.optional.length > 0) {
      md += `### ⚠️  Optional Fields (Alternatives)\n\n`;
      md += `| Slug | Type | Reason |\n`;
      md += `|------|------|--------|\n`;
      analysis.optional.forEach(f => {
        md += `| \`${f.slug}\` | ${f.type} | ${f.reason} |\n`;
      });
      md += `\n`;
    }
    
    if (analysis.unexpected.length > 0) {
      md += `### 🔍 Unexpected Fields (Not in Expected List)\n\n`;
      md += `| Field Name | Slug | Type |\n`;
      md += `|------------|------|------|\n`;
      analysis.unexpected.forEach(f => {
        md += `| ${f.name} | \`${f.slug}\` | ${f.type} |\n`;
      });
      md += `\n`;
    }
  }
  
  md += `---\n\n`;
  md += `*Report generated automatically by \`scripts/audit-webflow-cms-structure.js\`*\n`;
  
  return md;
}

main();

