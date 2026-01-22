/**
 * Script para comparar VAs problemáticos con Drue como referencia
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// VAs problemáticos a analizar
const PROBLEMATIC_VAs = ['ac', 'aaron-a0d16', 'abigail', 'albert', 'alejandro'];

// Cargar referencia de Drue
const drueReference = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/data/drue-reference-data.json'), 'utf8')
);

async function main() {
  console.log('🔍 Comparando VAs problemáticos con Drue (referencia)...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener todos los VAs
  let allVAs = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const response = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
    if (!response.items || response.items.length === 0) break;
    allVAs = allVAs.concat(response.items);
    if (response.items.length < limit) break;
    offset += limit;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DRUE (REFERENCIA)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('ESTRUCTURA CORRECTA:');
  console.log(`   Employment History: ${drueReference.extracted.employmentHistory.length} items con accordion`);
  drueReference.extracted.employmentHistory.forEach((emp, idx) => {
    console.log(`      ${idx + 1}. ${emp.company} - ${emp.position} (${emp.period})`);
    console.log(`         Descripción: ${emp.description ? 'Sí' : 'No'}`);
  });
  console.log('');
  console.log(`   Education: ${drueReference.extracted.education.length} items sin duplicados`);
  drueReference.extracted.education.forEach((edu, idx) => {
    console.log(`      ${idx + 1}. ${edu.school} - ${edu.degree} (${edu.year})`);
  });
  console.log('');
  console.log(`   Video Thumbnail: ${drueReference.extracted.videoThumbnail ? 'Sí' : 'No'}`);
  console.log(`   English Score: ${drueReference.extracted.englishScore || 'N/A'}`);
  console.log(`   DISC Type: ${drueReference.extracted.discType || 'N/A'}\n`);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 COMPARACIÓN CON VAs PROBLEMÁTICOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const comparison = [];
  
  for (const slug of PROBLEMATIC_VAs) {
    const va = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === slug.toLowerCase());
    
    if (!va) {
      console.log(`❌ ${slug.toUpperCase()}: NO ENCONTRADO EN CMS\n`);
      continue;
    }
    
    const vaName = va.fieldData.name || 'Sin nombre';
    console.log(`📋 ${vaName.toUpperCase()} (${slug})`);
    console.log(`   CMS ID: ${va.id}\n`);
    
    const issues = [];
    const vaData = {
      name: vaName,
      slug,
      cmsId: va.id,
      issues: []
    };
    
    // Verificar Video Thumbnail
    const videoThumbnail = va.fieldData['video-thumbnail-2'] || '';
    const video = va.fieldData['video'] || '';
    if (video && !videoThumbnail) {
      issues.push('Falta video thumbnail');
      console.log(`   ⚠️  Falta video thumbnail (tiene video: ${video})`);
    }
    
    // Verificar Employment History
    const employmentRichtext = va.fieldData['employment-richtext'] || '';
    if (employmentRichtext) {
      const hasAccordion = employmentRichtext.includes('va-employment-accordion');
      const accordionCount = (employmentRichtext.match(/va-employment-accordion/g) || []).length;
      const hasDescription = employmentRichtext.includes('va-employment-accordion-description');
      
      if (!hasAccordion) {
        issues.push('Employment History sin estructura de accordion');
        console.log(`   ⚠️  Employment History sin estructura de accordion`);
      } else {
        // Verificar si tiene descripciones vacías
        const emptyDescriptions = (employmentRichtext.match(/<p class="va-employment-accordion-description"><\/p>/g) || []).length;
        if (emptyDescriptions > 0) {
          issues.push(`${emptyDescriptions} accordion(s) con descripción vacía`);
          console.log(`   ⚠️  ${emptyDescriptions} accordion(s) con descripción vacía`);
        }
        
        // Verificar si tiene company
        const hasCompany = employmentRichtext.includes('va-employment-accordion-company');
        if (!hasCompany) {
          issues.push('Employment History sin campo company');
          console.log(`   ⚠️  Employment History sin campo company`);
        }
      }
    } else {
      issues.push('Employment History vacío');
      console.log(`   ⚠️  Employment History vacío`);
    }
    
    // Verificar Education
    const educationRichtext = va.fieldData['education-richtext'] || '';
    if (educationRichtext) {
      const itemCount = (educationRichtext.match(/va-education-item/g) || []).length;
      const schoolMatches = educationRichtext.match(/<h3 class="va-education-school">([^<]+)<\/h3>/gi);
      
      if (schoolMatches) {
        const schools = schoolMatches.map(m => m.replace(/<[^>]+>/g, '').trim().toLowerCase());
        const uniqueSchools = new Set(schools);
        if (schools.length !== uniqueSchools.size) {
          issues.push('Education duplicado');
          console.log(`   ⚠️  Education duplicado (${schools.length} items, ${uniqueSchools.size} únicos)`);
        }
      }
    } else {
      issues.push('Education vacío');
      console.log(`   ⚠️  Education vacío`);
    }
    
    // Verificar English Score
    const englishScore = va.fieldData['english-score-3'] || '';
    if (!englishScore) {
      issues.push('Falta English Score');
      console.log(`   ⚠️  Falta English Score`);
    }
    
    vaData.issues = issues;
    comparison.push(vaData);
    
    console.log('');
  }
  
  // Guardar comparación
  const comparisonPath = path.join(process.cwd(), 'src/data/comparacion-con-drue.json');
  fs.writeFileSync(comparisonPath, JSON.stringify({
    reference: drueReference,
    problematicVAs: comparison
  }, null, 2), 'utf-8');
  
  console.log(`✅ Comparación guardada en: ${comparisonPath}\n`);
}

main().catch(console.error);
