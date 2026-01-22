/**
 * Script maestro para corregir TODOS los problemas identificados en los perfiles de VAs
 * 
 * Problemas a corregir:
 * 1. Employment History sin estructura de accordion
 * 2. Employment Summary con etiquetas HTML
 * 3. Education sin estructura correcta
 * 4. Tools/Equipment vacíos (extraer de páginas web si es posible)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

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

// Función para limpiar Employment Summary (remover HTML, dejar solo texto)
function cleanEmploymentSummary(text) {
  if (!text || typeof text !== 'string') return '';
  
  // Remover todas las etiquetas HTML
  let cleaned = text.replace(/<[^>]+>/g, '');
  
  // Decodificar entidades HTML comunes
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Limpiar espacios múltiples
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

// Función para convertir Employment History a accordions
function convertEmploymentToAccordions(oldHTML) {
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
        const accordions = jsonData.map(entry => {
          const company = escapeHtml(entry.company || '');
          const position = escapeHtml(entry.position || '');
          const period = escapeHtml(entry.period || '');
          let description = entry.description || '';
          description = escapeHtml(description).replace(/\n/g, '<br>');
          
          return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${company}</h4><p class="va-employment-accordion-position">${position}</p><p class="va-employment-accordion-period">${period}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${description}</p></div></div>`;
        }).join('');
        return accordions;
      }
    } catch (error) {
      // Continuar con otros métodos
    }
  }
  
  // Si tiene <ul> o <li> (con o sin atributos), parsearlo
  if (oldHTML.includes('<ul') || oldHTML.includes('<li')) {
    try {
      const liMatches = oldHTML.match(/<li[^>]*>(.*?)<\/li>/gis);
      if (liMatches && liMatches.length > 0) {
        const accordions = liMatches.map(li => {
          let content = li.replace(/<\/?li[^>]*>/gi, '');
          const strongMatch = content.match(/<strong[^>]*>(.*?)<\/strong>/i);
          const positionAndCompany = strongMatch ? strongMatch[1].trim() : '';
          const atMatch = positionAndCompany.match(/^(.+?)\s+at\s+(.+)$/i);
          const position = atMatch ? atMatch[1].trim() : positionAndCompany;
          const company = atMatch ? atMatch[2].trim() : '';
          const periodMatch = content.match(/\(([^)]+)\)/);
          const period = periodMatch ? periodMatch[1].trim() : '';
          const brMatch = content.indexOf('<br>');
          let description = brMatch > -1 ? content.substring(brMatch + 4).trim() : '';
          description = description.replace(/<[^>]+>/g, '').replace(/^•\s*/gm, '').replace(/^\*\s*/gm, '').trim();
          
          const escapedCompany = escapeHtml(company);
          const escapedPosition = escapeHtml(position);
          const escapedPeriod = escapeHtml(period);
          const escapedDescription = escapeHtml(description).replace(/\n/g, '<br>');
          
          return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${escapedCompany}</h4><p class="va-employment-accordion-position">${escapedPosition}</p><p class="va-employment-accordion-period">${escapedPeriod}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content"><p class="va-employment-accordion-description">${escapedDescription}</p></div></div>`;
        }).join('');
        return accordions;
      }
    } catch (error) {
      // Si falla, retornar original
    }
  }
  
  // Si no se pudo convertir, retornar vacío (mejor que formato incorrecto)
  return '';
}

// Función para convertir Education a formato correcto
function convertEducationToCorrectFormat(oldHTML) {
  if (!oldHTML || typeof oldHTML !== 'string') return '';
  
  // Si ya tiene la estructura correcta, verificar duplicados
  if (oldHTML.includes('va-education-item')) {
    const itemMatches = oldHTML.match(/<div class="va-education-item"[^>]*>(.*?)<\/div>/gis);
    if (itemMatches) {
      const seen = new Set();
      const uniqueItems = [];
      
      for (const item of itemMatches) {
        const content = item.replace(/<[^>]+>/g, '').trim().toLowerCase();
        if (!seen.has(content)) {
          seen.add(content);
          uniqueItems.push(item);
        }
      }
      
      if (uniqueItems.length < itemMatches.length) {
        return uniqueItems.join('');
      }
    }
    return oldHTML;
  }
  
  // Si tiene <ul> o <li> (con o sin atributos), convertir
  if (oldHTML.includes('<ul') || oldHTML.includes('<li')) {
    try {
      const liMatches = oldHTML.match(/<li[^>]*>(.*?)<\/li>/gis);
      if (liMatches && liMatches.length > 0) {
        const seen = new Set();
        const uniqueItems = [];
        
        liMatches.forEach((li, index) => {
          let content = li.replace(/<\/?li[^>]*>/gi, '');
          
          // Intentar extraer información
          // Formato común: <strong>Degree</strong> - Institution
          const strongMatch = content.match(/<strong[^>]*>(.*?)<\/strong>/i);
          const degree = strongMatch ? strongMatch[1].trim() : '';
          const rest = content.replace(/<strong[^>]*>.*?<\/strong>/i, '').replace(/^[\s\-]+/, '').trim();
          
          // Separar institution y year si es posible
          const parts = rest.split(' - ');
          const school = parts[0] || rest;
          const year = parts[1] || '';
          
          // Crear clave única para detectar duplicados
          const key = `${school.toLowerCase()}|${degree.toLowerCase()}|${year.toLowerCase()}`;
          if (!seen.has(key)) {
            seen.add(key);
            
            const marginTop = uniqueItems.length > 0 ? ' style="margin-top: 16px;"' : '';
            uniqueItems.push(`<div class="va-education-item"${marginTop}><h3 class="va-education-school">${escapeHtml(school)}</h3><p class="va-education-degree">${escapeHtml(degree)}</p>${year ? `<p class="va-education-year">${escapeHtml(year)}</p>` : ''}</div>`);
          }
        });
        
        return uniqueItems.join('');
      }
    } catch (error) {
      // Si falla, retornar vacío
    }
  }
  
  // Si no se pudo convertir, retornar vacío
  return '';
}

async function main() {
  console.log('🔧 Corrigiendo TODOS los problemas en perfiles de VAs...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
  // Obtener sitio y collection
  const site = await apiClient.getSite(SITE_ID);
  console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
  
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  if (!vaCollection) {
    console.error('❌ Collection "Virtual Assistants" no encontrada');
    return;
  }
  
  console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
  
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
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const stats = {
    employmentFixed: 0,
    employmentSummaryFixed: 0,
    educationFixed: 0,
    errors: 0,
    skipped: 0
  };
  
  for (const va of allVAs) {
    const vaName = va.fieldData.name || 'Sin nombre';
    const vaSlug = va.fieldData.slug || 'sin-slug';
    
    const updates = {};
    let hasUpdates = false;
    
    // 1. Corregir Employment History
    const employmentRichtext = va.fieldData['employment-richtext'] || '';
    if (employmentRichtext && !employmentRichtext.includes('va-employment-accordion')) {
      const converted = convertEmploymentToAccordions(employmentRichtext);
      if (converted && converted !== employmentRichtext) {
        updates['employment-richtext'] = converted;
        hasUpdates = true;
      }
    }
    
    // 2. Corregir Employment Summary
    const employmentSummary = va.fieldData['employment-summary'] || '';
    if (employmentSummary && (employmentSummary.includes('<') || employmentSummary.includes('&'))) {
      const cleaned = cleanEmploymentSummary(employmentSummary);
      if (cleaned && cleaned !== employmentSummary) {
        updates['employment-summary'] = cleaned;
        hasUpdates = true;
      }
    }
    
    // 3. Corregir Education
    const educationRichtext = va.fieldData['education-richtext'] || '';
    if (educationRichtext && !educationRichtext.includes('va-education-item')) {
      const converted = convertEducationToCorrectFormat(educationRichtext);
      if (converted && converted !== educationRichtext) {
        updates['education-richtext'] = converted;
        hasUpdates = true;
      }
    }
    
    if (hasUpdates) {
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, updates);
        
        console.log(`✅ ${vaName.toUpperCase()} (${vaSlug})`);
        if (updates['employment-richtext']) {
          console.log(`   ✓ Employment History corregido`);
          stats.employmentFixed++;
        }
        if (updates['employment-summary']) {
          console.log(`   ✓ Employment Summary limpiado`);
          stats.employmentSummaryFixed++;
        }
        if (updates['education-richtext']) {
          console.log(`   ✓ Education corregido`);
          stats.educationFixed++;
        }
        console.log('');
      } catch (error) {
        console.error(`❌ Error actualizando ${vaName}:`, error.message);
        stats.errors++;
      }
    } else {
      stats.skipped++;
    }
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN FINAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`   VAs procesados: ${allVAs.length}`);
  console.log(`   Employment History corregidos: ${stats.employmentFixed}`);
  console.log(`   Employment Summary limpiados: ${stats.employmentSummaryFixed}`);
  console.log(`   Education corregidos: ${stats.educationFixed}`);
  console.log(`   VAs omitidos (ya correctos): ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
