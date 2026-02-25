/**
 * Script para debuggear las descripciones de Ana Victoria
 */

import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.cwd(), 'webflow-components-minified', '244-ana-victoria-profile.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Extraer Employment History
const employmentListMatch = htmlContent.match(/<div class="va-employment-list">([\s\S]*?)<\/div><\/div><\/section>/);

if (employmentListMatch) {
  const employmentHTML = employmentListMatch[1];
  const accordionMatches = employmentHTML.matchAll(/<div class="va-employment-accordion">([\s\S]*?)<\/div><\/div>/g);
  
  console.log('🔍 DESCRIPCIONES EXTRAÍDAS:\n');
  
  let idx = 1;
  for (const match of accordionMatches) {
    const accordionHTML = match[1];
    
    // Extraer company
    const companyMatch = accordionHTML.match(/<h4 class="va-employment-accordion-company">(.*?)<\/h4>/);
    const company = companyMatch ? companyMatch[1].trim() : '';
    
    // Extraer description
    const descriptionMatch = accordionHTML.match(/<div class="va-employment-accordion-content">([\s\S]*?)<\/div>/);
    
    console.log(`\n${idx}. ${company}`);
    if (descriptionMatch) {
      const descContent = descriptionMatch[1];
      console.log(`   Contenido RAW:`);
      console.log(`   ${descContent}`);
      console.log(`   Longitud: ${descContent.length} caracteres`);
      
      // Extraer <p> tags
      const pMatches = descContent.matchAll(/<p class="va-employment-accordion-description">([\s\S]*?)<\/p>/g);
      const pLines = [];
      for (const pMatch of pMatches) {
        pLines.push(pMatch[1]);
      }
      
      if (pLines.length > 0) {
        console.log(`   ✅ Encontrados ${pLines.length} <p> tags:`);
        pLines.forEach((line, i) => {
          console.log(`      ${i + 1}. "${line}"`);
        });
      } else {
        console.log(`   ⚠️  No se encontraron <p> tags`);
        console.log(`   Contenido sin tags: "${descContent.trim()}"`);
      }
    } else {
      console.log(`   ❌ No se encontró descripción`);
    }
    
    idx++;
  }
} else {
  console.log('❌ No se encontró Employment History');
}
