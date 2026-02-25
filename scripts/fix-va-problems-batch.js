/**
 * Script para corregir problemas en VAs y cargar al CMS
 * Corrige: Employment History bullet points, Employment Summary, Education duplicado, DISC format
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

// Mapeo de correcciones necesarias
const FIXES = {
  // Employment History - Agregar bullet points
  'employment-history-bullets': {
    vas: ['anahi', 'andrea', 'andres', 'angel', 'antonio', 'bernadette-abellana'],
    fix: (html) => {
      if (!html) return html;
      // Si ya tiene bullet points, no hacer nada
      if (html.includes('<p>•') || html.includes('<li>')) return html;
      
      // Buscar contenido dentro de va-employment-accordion-description
      // y agregar bullet points si no los tiene
      return html.replace(
        /(<p class="va-employment-accordion-description">)(.*?)(<\/p>)/gs,
        (match, open, content, close) => {
          // Si el contenido ya tiene bullet points, no cambiar
          if (content.includes('<p>•') || content.includes('<li>')) return match;
          
          // Dividir por líneas y agregar bullet points
          const lines = content
            .replace(/<[^>]+>/g, '') // Remover tags HTML
            .split(/\n|\. /)
            .filter(line => line.trim().length > 0)
            .map(line => line.trim().replace(/^[•\-\*]\s*/, '')); // Remover bullets existentes
          
          const bulletedContent = lines
            .map(line => `<p>• ${line}</p>`)
            .join('');
          
          return `${open}${bulletedContent}${close}`;
        }
      );
    }
  },
  
  // DISC Format - Corregir orden
  'disc-format': {
    vas: {
      'albert': { from: 'S+C', to: 'C+S' }, // ID: 66849bb5e3c9eca1b8d887bfec208b4d
      'anahi': { from: 'S+C', to: 'C+S' },
      'andrea': { from: 'D+I', to: 'I+D' }, // ID: b68c0c2b2f05478c7ffa034f4349ba80
      'bernadette-abellana': { from: 'S+C', to: 'C+S' }
    },
    // IDs de opciones DISC del modelo Drue
    discOptionIds: {
      'D': '98fc52fe67a221da1b7ff13c642f9c86',
      'I': '6e45ac02de98a68482a875d8646ab49e',
      'S': '49ee7f5fd4baca315009cca5bb4cb60f',
      'C': 'c612290ce9a805d70e5f8dd3d5870a21',
      'D+I': 'b68c0c2b2f05478c7ffa034f4349ba80',
      'S+I': '83cbc127c3ccd02e1cb91bea429d21c0',
      'S+C': '66849bb5e3c9eca1b8d887bfec208b4d',
      'C+S': '66849bb5e3c9eca1b8d887bfec208b4d', // Mismo ID que S+C, verificar en CMS
      'C+D': 'cdbecaf82c1b7ec9592d5f9c0594c9c8',
      'I+D': 'b68c0c2b2f05478c7ffa034f4349ba80' // Mismo ID que D+I, verificar en CMS
    }
  },
  
  // Education - Eliminar duplicados
  'education-duplicate': {
    vas: ['abigail', 'alejandro', 'ana', 'anahi', 'balbina'],
    fix: (html) => {
      if (!html) return html;
      
      // Contar cuántos va-education-item hay
      const items = html.match(/<div class="va-education-item"[^>]*>[\s\S]*?<\/div>/g) || [];
      
      if (items.length <= 1) return html; // No hay duplicados
      
      // Tomar solo el primero
      return items[0];
    }
  },
  
  // DISC Description - Agregar saltos de línea
  'disc-description-breaks': {
    vas: ['ana-victoria', 'anahi'],
    fix: (description) => {
      if (!description) return description;
      
      // Si ya tiene párrafos, verificar formato
      if (description.includes('<p>')) {
        // Ya tiene formato, solo asegurar que esté bien
        return description;
      }
      
      // Dividir por letras DISC (D, I, S, C) y crear párrafos
      const discPattern = /(Dominance|Influence|Steadiness|Conscientiousness)\s*\(([DISC])\)\s*-\s*([^DISC]+?)(?=(?:Dominance|Influence|Steadiness|Conscientiousness)\(|$)/gi;
      const matches = [...description.matchAll(discPattern)];
      
      if (matches.length > 0) {
        return matches.map(match => {
          const type = match[1];
          const letter = match[2];
          const desc = match[3].trim();
          return `<p>${type} (${letter}) - ${desc}</p>`;
        }).join('');
      }
      
      // Si no coincide el patrón, intentar dividir por puntos
      const sentences = description.split(/\.\s+/).filter(s => s.trim().length > 0);
      return sentences.map(s => `<p>${s.trim()}.</p>`).join('');
    }
  }
};

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
      isDraft: false, // Publicar directamente
    });
    return { success: true, result };
  } catch (error) {
    console.error(`   ❌ Error updating ${vaName}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  try {
    console.log('🔧 Fixing VA Problems and Loading to CMS...\n');
    console.log('⚠️  DRY RUN MODE - No changes will be made to CMS\n');
    console.log('   Set DRY_RUN=false in .env to apply changes\n');

    const { allItems, vaCollection } = await fetchAllVAs();
    const dryRun = process.env.DRY_RUN !== 'false';
    
    const results = {
      timestamp: new Date().toISOString(),
      dryRun,
      fixes: {}
    };

    // Fix 1: Employment History - Bullet Points
    console.log('📋 Fix 1: Employment History - Bullet Points\n');
    for (const slug of FIXES['employment-history-bullets'].vas) {
      const va = allItems.find((v) => v.fieldData.slug === slug);
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        continue;
      }

      const currentHtml = va.fieldData['employment-richtext'] || '';
      const fixedHtml = FIXES['employment-history-bullets'].fix(currentHtml);
      
      if (currentHtml !== fixedHtml) {
        console.log(`✅ ${va.fieldData.name} (${slug}):`);
        console.log(`   Employment History will be updated`);
        
        if (!dryRun) {
          const updateResult = await updateVA(
            vaCollection.id,
            va.id,
            { 'employment-richtext': fixedHtml },
            va.fieldData.name
          );
          results.fixes[slug] = {
            field: 'employment-richtext',
            success: updateResult.success
          };
        } else {
          results.fixes[slug] = {
            field: 'employment-richtext',
            wouldUpdate: true
          };
        }
      } else {
        console.log(`⏭️  ${va.fieldData.name} (${slug}): No changes needed`);
      }
    }

    // Fix 2: DISC Format
    console.log('\n📋 Fix 2: DISC Format\n');
    for (const [slug, change] of Object.entries(FIXES['disc-format'].vas)) {
      const va = allItems.find((v) => v.fieldData.slug === slug);
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        continue;
      }

      const currentDiscType = va.fieldData['disc-type-2'];
      const targetId = FIXES['disc-format'].discOptionIds[change.to];
      
      if (currentDiscType && targetId) {
        console.log(`✅ ${va.fieldData.name} (${slug}):`);
        console.log(`   DISC will change from ${change.from} to ${change.to}`);
        
        if (!dryRun) {
          const updateResult = await updateVA(
            vaCollection.id,
            va.id,
            { 'disc-type-2': targetId },
            va.fieldData.name
          );
          results.fixes[slug] = {
            ...results.fixes[slug],
            discFormat: { success: updateResult.success }
          };
        } else {
          results.fixes[slug] = {
            ...results.fixes[slug],
            discFormat: { wouldUpdate: true }
          };
        }
      }
    }

    // Fix 3: Education Duplicate
    console.log('\n📋 Fix 3: Education Duplicate\n');
    for (const slug of FIXES['education-duplicate'].vas) {
      const va = allItems.find((v) => v.fieldData.slug === slug);
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        continue;
      }

      const currentHtml = va.fieldData['education-richtext'] || '';
      const fixedHtml = FIXES['education-duplicate'].fix(currentHtml);
      
      if (currentHtml !== fixedHtml) {
        console.log(`✅ ${va.fieldData.name} (${slug}):`);
        console.log(`   Education duplicate will be removed`);
        
        if (!dryRun) {
          const updateResult = await updateVA(
            vaCollection.id,
            va.id,
            { 'education-richtext': fixedHtml },
            va.fieldData.name
          );
          results.fixes[slug] = {
            ...results.fixes[slug],
            education: { success: updateResult.success }
          };
        } else {
          results.fixes[slug] = {
            ...results.fixes[slug],
            education: { wouldUpdate: true }
          };
        }
      } else {
        console.log(`⏭️  ${va.fieldData.name} (${slug}): No duplicates found`);
      }
    }

    // Fix 4: DISC Description Breaks
    console.log('\n📋 Fix 4: DISC Description - Line Breaks\n');
    for (const slug of FIXES['disc-description-breaks'].vas) {
      const va = allItems.find((v) => v.fieldData.slug === slug);
      if (!va) {
        console.log(`⚠️  ${slug}: NOT FOUND`);
        continue;
      }

      const currentDesc = va.fieldData['disc-description'] || '';
      const fixedDesc = FIXES['disc-description-breaks'].fix(currentDesc);
      
      if (currentDesc !== fixedDesc) {
        console.log(`✅ ${va.fieldData.name} (${slug}):`);
        console.log(`   DISC Description will be reformatted`);
        
        if (!dryRun) {
          const updateResult = await updateVA(
            vaCollection.id,
            va.id,
            { 'disc-description': fixedDesc },
            va.fieldData.name
          );
          results.fixes[slug] = {
            ...results.fixes[slug],
            discDescription: { success: updateResult.success }
          };
        } else {
          results.fixes[slug] = {
            ...results.fixes[slug],
            discDescription: { wouldUpdate: true }
          };
        }
      } else {
        console.log(`⏭️  ${va.fieldData.name} (${slug}): Already formatted correctly`);
      }
    }

    // Save results
    const reportPath = 'reports/fix-results.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(80));
    console.log(`Mode: ${dryRun ? 'DRY RUN (no changes made)' : 'LIVE (changes applied)'}`);
    console.log(`Total fixes attempted: ${Object.keys(results.fixes).length}`);
    console.log(`\n💾 Results saved to: ${reportPath}`);
    
    if (dryRun) {
      console.log('\n⚠️  To apply changes, set DRY_RUN=false in .env and run again');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
