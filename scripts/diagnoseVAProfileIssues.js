/**
 * Script de diagnóstico completo para identificar problemas en los perfiles de VAs
 * Analiza: Employment History, Education, Tools, Equipment, Employment Summary
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Estructuras esperadas
const EXPECTED_STRUCTURES = {
  employment: {
    accordion: 'va-employment-accordion',
    header: 'va-employment-accordion-header',
    content: 'va-employment-accordion-content',
    description: 'va-employment-accordion-description'
  },
  education: {
    item: 'va-education-item',
    school: 'va-education-school',
    degree: 'va-education-degree',
    year: 'va-education-year'
  },
  tools: {
    item: 'va-tool-item',
    checkmark: 'va-tool-checkmark'
  },
  equipment: {
    item: 'va-equipment-item',
    icon: 'va-equipment-icon'
  }
};

// Función para analizar un campo
function analyzeField(fieldName, content, expectedStructure) {
  const issues = [];
  
  if (!content || content.trim() === '') {
    return { isEmpty: true, issues: ['Campo vacío'] };
  }
  
  const isEmpty = content.trim() === '';
  const hasExpectedStructure = expectedStructure 
    ? Object.values(expectedStructure).some(className => content.includes(className))
    : false;
  
  // Análisis específico por campo
  if (fieldName === 'employment-richtext') {
    const hasAccordion = content.includes(EXPECTED_STRUCTURES.employment.accordion);
    const hasHeader = content.includes(EXPECTED_STRUCTURES.employment.header);
    const hasContent = content.includes(EXPECTED_STRUCTURES.employment.content);
    
    if (!hasAccordion) {
      issues.push('No tiene estructura de accordion');
    }
    if (!hasHeader) {
      issues.push('No tiene header de accordion');
    }
    if (!hasContent) {
      issues.push('No tiene content de accordion');
    }
    
    // Verificar si tiene contenido vacío en description
    const descriptionMatches = content.match(/<p class="va-employment-accordion-description">(.*?)<\/p>/gis);
    if (descriptionMatches) {
      const emptyDescriptions = descriptionMatches.filter(match => {
        const content = match.replace(/<[^>]+>/g, '').trim();
        return !content || content === '';
      });
      if (emptyDescriptions.length > 0) {
        issues.push(`${emptyDescriptions.length} accordion(s) con descripción vacía`);
      }
    }
    
    // Verificar si tiene HTML mal formado (etiquetas sueltas)
    if (content.includes('<strong>') && !content.includes('va-employment-accordion')) {
      issues.push('Tiene HTML mal formado (etiquetas sueltas sin estructura de accordion)');
    }
    
    // Verificar si es JSON
    const trimmed = content.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      issues.push('Está en formato JSON (necesita conversión a HTML)');
    }
    
    // Verificar si es formato antiguo <ul><li>
    if (content.includes('<ul>') && content.includes('<li>') && !content.includes('va-employment-accordion')) {
      issues.push('Está en formato antiguo <ul><li> (necesita conversión)');
    }
  }
  
  if (fieldName === 'education-richtext') {
    const hasItem = content.includes(EXPECTED_STRUCTURES.education.item);
    const hasSchool = content.includes(EXPECTED_STRUCTURES.education.school);
    const hasDegree = content.includes(EXPECTED_STRUCTURES.education.degree);
    
    if (!hasItem) {
      issues.push('No tiene estructura va-education-item');
    }
    if (!hasSchool) {
      issues.push('No tiene clase va-education-school');
    }
    if (!hasDegree) {
      issues.push('No tiene clase va-education-degree');
    }
    
    // Verificar duplicación
    const itemMatches = content.match(/<div class="va-education-item"/g);
    if (itemMatches && itemMatches.length > 1) {
      // Verificar si hay contenido duplicado
      const schoolMatches = content.match(/<h3 class="va-education-school">(.*?)<\/h3>/gis);
      if (schoolMatches) {
        const schools = schoolMatches.map(m => m.replace(/<[^>]+>/g, '').trim().toLowerCase());
        const uniqueSchools = new Set(schools);
        if (schools.length !== uniqueSchools.size) {
          issues.push('Tiene contenido duplicado (misma escuela/degree repetida)');
        }
      }
    }
    
    // Verificar si tiene HTML mal formado
    if (content.includes('<ul>') || content.includes('<li>')) {
      issues.push('Tiene formato antiguo <ul><li> (necesita conversión)');
    }
  }
  
  if (fieldName === 'tools-richtext') {
    const hasItem = content.includes(EXPECTED_STRUCTURES.tools.item);
    const hasCheckmark = content.includes(EXPECTED_STRUCTURES.tools.checkmark);
    
    if (!hasItem) {
      issues.push('No tiene estructura va-tool-item');
    }
    if (!hasCheckmark) {
      issues.push('No tiene checkmark');
    }
  }
  
  if (fieldName === 'equipment-richtext') {
    const hasItem = content.includes(EXPECTED_STRUCTURES.equipment.item);
    const hasIcon = content.includes(EXPECTED_STRUCTURES.equipment.icon);
    
    if (!hasItem) {
      issues.push('No tiene estructura va-equipment-item');
    }
    if (!hasIcon) {
      issues.push('No tiene icon');
    }
  }
  
  if (fieldName === 'employment-summary') {
    // Verificar si tiene etiquetas HTML que no deberían estar
    if (content.includes('<strong>') || content.includes('<p>') || content.includes('<br>')) {
      issues.push('Tiene etiquetas HTML que no funcionan (debería ser texto plano)');
    }
  }
  
  return { isEmpty, hasExpectedStructure, issues };
}

async function main() {
  console.log('🔍 Iniciando diagnóstico completo de perfiles de VAs...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
  // Obtener sitio y collection
  const site = await apiClient.getSite(SITE_ID);
  if (!site) {
    console.error('❌ Sitio no encontrado');
    return;
  }
  
  console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
  
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  if (!vaCollection) {
    console.error('❌ Collection "Virtual Assistants" no encontrada');
    return;
  }
  
  console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
  
  // Obtener todos los VAs (con paginación)
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
  
  console.log(`✅ Total VAs en CMS: ${allVAs.length}\n`);
  
  const report = {
    total: allVAs.length,
    byField: {
      'employment-richtext': { total: 0, empty: 0, issues: [] },
      'education-richtext': { total: 0, empty: 0, issues: [] },
      'tools-richtext': { total: 0, empty: 0, issues: [] },
      'equipment-richtext': { total: 0, empty: 0, issues: [] },
      'employment-summary': { total: 0, empty: 0, issues: [] }
    },
    vasWithIssues: []
  };
  
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  for (const va of allVAs) {
    const vaName = va.fieldData.name || 'Sin nombre';
    const vaSlug = va.fieldData.slug || 'sin-slug';
    
    const vaIssues = {
      name: vaName,
      slug: vaSlug,
      cmsId: va.id,
      fields: {}
    };
    
    // Analizar cada campo
    const fieldsToCheck = [
      'employment-richtext',
      'education-richtext',
      'tools-richtext',
      'equipment-richtext',
      'employment-summary'
    ];
    
    let hasAnyIssue = false;
    
    for (const fieldName of fieldsToCheck) {
      const content = va.fieldData[fieldName] || '';
      const expectedStructure = EXPECTED_STRUCTURES[fieldName.split('-')[0]] || null;
      const analysis = analyzeField(fieldName, content, expectedStructure);
      
      report.byField[fieldName].total++;
      
      if (analysis.isEmpty) {
        report.byField[fieldName].empty++;
      }
      
      if (analysis.issues && analysis.issues.length > 0) {
        hasAnyIssue = true;
        vaIssues.fields[fieldName] = {
          isEmpty: analysis.isEmpty,
          issues: analysis.issues
        };
        
        // Agregar issues al reporte general
        analysis.issues.forEach(issue => {
          if (!report.byField[fieldName].issues.includes(issue)) {
            report.byField[fieldName].issues.push(issue);
          }
        });
      }
    }
    
    if (hasAnyIssue) {
      report.vasWithIssues.push(vaIssues);
      
      // Mostrar en consola
      console.log(`📋 ${vaName.toUpperCase()} (${vaSlug})`);
      console.log(`   CMS ID: ${va.id}`);
      
      for (const [fieldName, fieldIssues] of Object.entries(vaIssues.fields)) {
        console.log(`   ${fieldName}:`);
        if (fieldIssues.isEmpty) {
          console.log(`      ⚠️  Campo vacío`);
        }
        fieldIssues.issues.forEach(issue => {
          console.log(`      ⚠️  ${issue}`);
        });
      }
      console.log('');
    }
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN FINAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`Total VAs analizados: ${report.total}`);
  console.log(`VAs con problemas: ${report.vasWithIssues.length}\n`);
  
  console.log('PROBLEMAS POR CAMPO:\n');
  
  for (const [fieldName, fieldReport] of Object.entries(report.byField)) {
    console.log(`📌 ${fieldName}:`);
    console.log(`   Total: ${fieldReport.total}`);
    console.log(`   Vacíos: ${fieldReport.empty}`);
    console.log(`   Con problemas: ${fieldReport.total - fieldReport.empty}`);
    if (fieldReport.issues.length > 0) {
      console.log(`   Tipos de problemas encontrados:`);
      fieldReport.issues.forEach(issue => {
        console.log(`      - ${issue}`);
      });
    }
    console.log('');
  }
  
  // Guardar reporte detallado
  const reportPath = path.join(process.cwd(), 'src/data/diagnostico-perfiles-vas.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`✅ Reporte detallado guardado en: ${reportPath}\n`);
  
  // Guardar CSV de VAs con problemas
  const csvPath = path.join(process.cwd(), 'src/data/vas-con-problemas.csv');
  const csvLines = ['Nombre,Slug,CMS ID,Campo,Problema'];
  
  for (const va of report.vasWithIssues) {
    for (const [fieldName, fieldIssues] of Object.entries(va.fields)) {
      const issuesText = fieldIssues.issues.join('; ');
      csvLines.push(`"${va.name}","${va.slug}","${va.cmsId}","${fieldName}","${issuesText}"`);
    }
  }
  
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf-8');
  console.log(`✅ CSV de VAs con problemas guardado en: ${csvPath}\n`);
}

main().catch(console.error);
