/**
 * Script para corregir el HTML de Employment History
 * Convierte la estructura antigua <ul><li> a la estructura de accordions
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;

// Función para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Función para convertir HTML antiguo o JSON a estructura de accordions
function convertEmploymentHTML(oldHTML) {
  if (!oldHTML || typeof oldHTML !== 'string') return '';
  
  // Si ya tiene la estructura de accordions, retornar tal cual
  if (oldHTML.includes('va-employment-accordion')) {
    return oldHTML;
  }
  
  // Si es JSON, parsearlo y convertir a HTML
  const trimmed = oldHTML.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const jsonData = JSON.parse(oldHTML);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        // Convertir JSON a HTML accordions
        const accordions = jsonData.map(entry => {
          const company = escapeHtml(entry.company || '');
          const position = escapeHtml(entry.position || '');
          const period = escapeHtml(entry.period || '');
          let description = entry.description || '';
          
          // Escapar HTML en la descripción
          description = escapeHtml(description);
          
          // Convertir saltos de línea a <br>
          description = description.replace(/\n/g, '<br>');
          
          // Generar estructura de accordion
          return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
        }).join('');
        
        return accordions;
      }
    } catch (error) {
      console.warn(`   ⚠️  Error al parsear JSON: ${error.message}`);
      // Continuar con el siguiente método si JSON falla
    }
  }
  
  // Si está vacío o no tiene la estructura esperada, retornar vacío
  if (!oldHTML.includes('<ul>') && !oldHTML.includes('<li>')) {
    return oldHTML; // Retornar tal cual si no es HTML antiguo ni JSON
  }
  
  // Parsear el HTML antiguo
  // Estructura esperada: <ul><li><strong>Position</strong> at COMPANY (PERIOD)<br>• Description</li>...</ul>
  
  try {
    // Usar regex para extraer la información
    const liMatches = oldHTML.match(/<li[^>]*>(.*?)<\/li>/gis);
    
    if (!liMatches || liMatches.length === 0) {
      return oldHTML; // No se pudo parsear, retornar original
    }
    
    const accordions = liMatches.map(li => {
      // Remover etiquetas HTML básicas
      let content = li.replace(/<\/?li[^>]*>/gi, '');
      
      // Extraer posición y compañía
      const strongMatch = content.match(/<strong[^>]*>(.*?)<\/strong>/i);
      const positionAndCompany = strongMatch ? strongMatch[1].trim() : '';
      
      // Separar posición y compañía (formato: "Position at COMPANY")
      const atMatch = positionAndCompany.match(/^(.+?)\s+at\s+(.+)$/i);
      const position = atMatch ? atMatch[1].trim() : positionAndCompany;
      const company = atMatch ? atMatch[2].trim() : '';
      
      // Extraer período (formato: "(PERIOD)" al final de la línea)
      const periodMatch = content.match(/\(([^)]+)\)/);
      const period = periodMatch ? periodMatch[1].trim() : '';
      
      // Extraer descripción (después del <br>)
      const brMatch = content.indexOf('<br>');
      let description = brMatch > -1 ? content.substring(brMatch + 4).trim() : '';
      
      // Limpiar descripción: remover etiquetas HTML y bullets
      description = description
        .replace(/<[^>]+>/g, '') // Remover todas las etiquetas HTML
        .replace(/^•\s*/gm, '') // Remover bullets
        .replace(/^\*\s*/gm, '') // Remover asteriscos
        .trim();
      
      // Escapar HTML
      const escapedCompany = escapeHtml(company);
      const escapedPosition = escapeHtml(position);
      const escapedPeriod = escapeHtml(period);
      const escapedDescription = escapeHtml(description);
      
      // Convertir saltos de línea a <br>
      const descriptionWithBreaks = escapedDescription.replace(/\n/g, '<br>');
      
      // Generar estructura de accordion
      return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${escapedCompany}</h4><p class="va-employment-accordion-position">${escapedPosition}</p><p class="va-employment-accordion-period">${escapedPeriod}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${descriptionWithBreaks}</p></div></div>`;
    }).join('');
    
    return accordions;
    
  } catch (error) {
    console.error('Error converting employment HTML:', error);
    return oldHTML; // Retornar original si hay error
  }
}

async function main() {
  console.log('🔧 Corrigiendo HTML de Employment History en todos los VAs...\n');
  
  const apiClient = new WebflowApiClient(process.env.WEBFLOW_API_TOKEN);
  
  try {
    // Obtener el sitio
    const site = await apiClient.getSite(SITE_ID);
    console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
    
    // Obtener la colección
    const collectionsResponse = await apiClient.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    
    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
    
    // Obtener todos los items
    let allItems = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const response = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
      if (!response.items || response.items.length === 0) break;
      allItems = allItems.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }
    
    console.log(`✅ Total VAs en CMS: ${allItems.length}\n`);
    console.log('═'.repeat(80));
    console.log('');
    
    let totalUpdated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    
    for (const item of allItems) {
      const name = item.fieldData?.name || 'Unnamed';
      const slug = item.fieldData?.slug || '';
      const employmentRichtext = item.fieldData?.['employment-richtext'] || '';
      
      // Verificar si tiene contenido y si necesita conversión
      if (!employmentRichtext || employmentRichtext.trim() === '') {
        totalSkipped++;
        continue;
      }
      
      // Verificar si ya tiene la estructura correcta
      if (employmentRichtext.includes('va-employment-accordion')) {
        totalSkipped++;
        continue;
      }
      
      // Convertir HTML
      console.log(`\n📋 ${name.toUpperCase()} (${slug})`);
      console.log(`   CMS ID: ${item.id}`);
      
      const newHTML = convertEmploymentHTML(employmentRichtext);
      
      if (newHTML === employmentRichtext) {
        console.log(`   ⚠️  No se pudo convertir (mantiene estructura original)`);
        totalSkipped++;
        continue;
      }
      
      // Actualizar en Webflow
      try {
        const fieldData = {
          'employment-richtext': newHTML
        };
        
        await apiClient.updateCollectionItem(vaCollection.id, item.id, fieldData);
        
        console.log(`   ✅ Actualizado exitosamente`);
        totalUpdated++;
        
        // Pequeño delay para evitar rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`   ❌ Error al actualizar: ${error.message}`);
        if (error.response) {
          if (error.response.details && Array.isArray(error.response.details)) {
            error.response.details.forEach(detail => {
              console.error(`      - Campo: ${detail.param || 'unknown'}, Error: ${detail.description || detail.message || 'unknown'}`);
            });
          } else {
            console.error(`      Response: ${JSON.stringify(error.response, null, 2)}`);
          }
        }
        totalErrors++;
      }
    }
    
    console.log('\n');
    console.log('═'.repeat(80));
    console.log('📊 RESUMEN FINAL');
    console.log('═'.repeat(80));
    console.log(`   VAs procesados: ${allItems.length}`);
    console.log(`   VAs actualizados: ${totalUpdated}`);
    console.log(`   VAs omitidos (ya correctos o vacíos): ${totalSkipped}`);
    console.log(`   Errores: ${totalErrors}`);
    console.log('═'.repeat(80));
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Detalles:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
