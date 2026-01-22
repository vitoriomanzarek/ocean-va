/**
 * Script para corregir el formato de Employment History
 * Asegura que los bullet points tengan saltos de línea correctos
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Función para corregir el formato de Employment History
function fixEmploymentHistoryFormat(employmentHTML) {
  if (!employmentHTML || !employmentHTML.includes('va-employment-accordion')) {
    return employmentHTML;
  }
  
  // Buscar todos los accordions
  const accordionRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis;
  let match;
  const fixedAccordions = [];
  
  while ((match = accordionRegex.exec(employmentHTML)) !== null) {
    let accordionHtml = match[0];
    
    // Extraer la descripción actual
    const descMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
    
    if (descMatch && descMatch[0]) {
      let description = descMatch[0];
      
      // Si la descripción contiene bullet points sin saltos de línea
      // Formato problemático: <p>• Item 1• Item 2• Item 3</p>
      // Formato correcto: <p>• Item 1</p><p>• Item 2</p><p>• Item 3</p>
      
      // Extraer el contenido sin las etiquetas <p>
      let content = description
        .replace(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>/i, '')
        .replace(/<\/p>/gi, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
      
      // Si contiene bullet points (•) sin separación adecuada
      if (content.includes('•')) {
        // Separar por bullet points
        const bullets = content.split('•').map(b => b.trim()).filter(b => b.length > 0);
        
        // Reconstruir con formato correcto: cada bullet en su propio <p>
        const formattedBullets = bullets.map(bullet => {
          return `<p>• ${bullet}</p>`;
        }).join('');
        
        // Reemplazar la descripción en el accordion
        accordionHtml = accordionHtml.replace(descMatch[0], 
          `<p class="va-employment-accordion-description">${formattedBullets}</p>`
        );
      } else if (content.includes('\n')) {
        // Si tiene saltos de línea, separar por líneas
        const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const formattedLines = lines.map(line => {
          // Si la línea no tiene bullet, agregarlo
          if (!line.startsWith('•')) {
            return `<p>• ${line}</p>`;
          }
          return `<p>${line}</p>`;
        }).join('');
        
        accordionHtml = accordionHtml.replace(descMatch[0],
          `<p class="va-employment-accordion-description">${formattedLines}</p>`
        );
      }
    }
    
    fixedAccordions.push(accordionHtml);
  }
  
  // Si se hicieron cambios, reconstruir el HTML
  if (fixedAccordions.length > 0 && fixedAccordions.some((acc, idx) => {
    const originalMatch = employmentHTML.match(accordionRegex);
    return acc !== originalMatch?.[idx];
  })) {
    // Reemplazar todos los accordions
    let fixedHTML = employmentHTML;
    let offset = 0;
    
    accordionRegex.lastIndex = 0; // Reset regex
    while ((match = accordionRegex.exec(employmentHTML)) !== null) {
      const index = fixedAccordions.findIndex((acc, idx) => {
        return acc !== match[0];
      });
      if (index >= 0) {
        fixedHTML = fixedHTML.substring(0, match.index + offset) + 
                   fixedAccordions[index] + 
                   fixedHTML.substring(match.index + match[0].length + offset);
        offset += fixedAccordions[index].length - match[0].length;
      }
    }
    
    return fixedHTML;
  }
  
  return employmentHTML;
}

// Función mejorada para extraer y corregir formato
function fixEmploymentHistoryFormatV2(employmentHTML) {
  if (!employmentHTML || !employmentHTML.includes('va-employment-accordion')) {
    return employmentHTML;
  }
  
  // Dividir por accordions
  const accordions = employmentHTML.split(/<\/div>\s*<\/div>\s*(?=<div[^>]*class="[^"]*va-employment-accordion)/gi);
  
  const fixedAccordions = accordions.map(accordion => {
    if (!accordion.trim()) return accordion;
    
    // Encontrar la descripción
    const descPattern = /(<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>)(.*?)(<\/p>)/gis;
    const descMatch = descPattern.exec(accordion);
    
    if (descMatch) {
      let descContent = descMatch[2];
      
      // Limpiar HTML dentro de la descripción
      descContent = descContent
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/<\/?[^>]+>/g, ''); // Remover cualquier HTML restante
      
      // Si contiene bullet points pero están juntos sin saltos
      if (descContent.includes('•')) {
        // Separar por bullet points
        let bullets = descContent.split('•');
        bullets = bullets.map(b => b.trim()).filter(b => b.length > 0);
        
        // Formatear cada bullet en su propio <p>
        const formattedContent = bullets.map(bullet => {
          return `<p>• ${bullet}</p>`;
        }).join('');
        
        // Reemplazar en el accordion
        accordion = accordion.replace(descMatch[0], 
          `${descMatch[1]}${formattedContent}${descMatch[3]}`
        );
      } else if (descContent.includes('\n')) {
        // Si tiene saltos de línea
        const lines = descContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const formattedContent = lines.map(line => {
          if (!line.startsWith('•')) {
            return `<p>• ${line}</p>`;
          }
          return `<p>${line}</p>`;
        }).join('');
        
        accordion = accordion.replace(descMatch[0],
          `${descMatch[1]}${formattedContent}${descMatch[3]}`
        );
      }
    }
    
    return accordion;
  });
  
  return fixedAccordions.join('</div></div>');
}

async function main() {
  console.log('🔧 Corrigiendo formato de Employment History para todos los VAs...\n');
  
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
  
  console.log(`✅ Total VAs en CMS: ${allVAs.length}\n`);
  console.log('═'.repeat(80));
  console.log('');
  
  const stats = {
    fixed: 0,
    skipped: 0,
    errors: 0
  };
  
  for (const va of allVAs) {
    const vaName = va.fieldData.name || 'Sin nombre';
    const vaSlug = va.fieldData.slug || '';
    const employmentHTML = va.fieldData['employment-richtext'] || '';
    
    if (!employmentHTML || !employmentHTML.includes('va-employment-accordion')) {
      stats.skipped++;
      continue;
    }
    
    // Corregir formato
    const fixedHTML = fixEmploymentHistoryFormatV2(employmentHTML);
    
    if (fixedHTML !== employmentHTML) {
      console.log(`📋 ${vaName.toUpperCase()} (${vaSlug})`);
      console.log(`   CMS ID: ${va.id}`);
      console.log(`   ✓ Formato corregido`);
      
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, {
          'employment-richtext': fixedHTML
        });
        console.log(`   ✅ Actualizado exitosamente\n`);
        stats.fixed++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        stats.errors++;
      }
      
      // Delay para evitar rate limits
      await new Promise(resolve => setTimeout(resolve, 300));
    } else {
      stats.skipped++;
    }
  }
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   VAs con formato corregido: ${stats.fixed}`);
  console.log(`   VAs sin cambios: ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
