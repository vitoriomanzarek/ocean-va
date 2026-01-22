/**
 * Script para extraer información de VAs desde páginas web en línea
 * Extrae datos desde https://www.oceanvirtualassistant.com/{slug}
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const slugsFile = path.join(__dirname, '../src/data/Slugs VAs.csv');
const outputFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');
const baseUrl = 'https://www.oceanvirtualassistant.com';

// Función para hacer fetch a una URL
async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`   ❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

// Función para extraer texto usando regex o selector
function extractText(html, pattern) {
  if (typeof pattern === 'string') {
    // Buscar por clase CSS
    const regex = new RegExp(`<[^>]*class="[^"]*${pattern}[^"]*"[^>]*>([\\s\\S]*?)</[^>]+>`, 'i');
    const match = html.match(regex);
    if (match) {
      return cleanHtml(match[1]);
    }
  } else if (pattern instanceof RegExp) {
    // Usar regex directamente
    const match = html.match(pattern);
    if (match && match[1]) {
      return cleanHtml(match[1]);
    }
  }
  return '';
}

// Función para limpiar HTML y convertir entidades
function cleanHtml(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Función para extraer múltiples elementos
function extractMultiple(html, selector) {
  const regex = new RegExp(`<[^>]*class="[^"]*${selector}[^"]*"[^>]*>([\\s\\S]*?)</[^>]+>`, 'gi');
  const matches = [];
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    const text = cleanHtml(match[1]);
    if (text && text.length > 0) {
      matches.push(text);
    }
  }
  
  return matches;
}

// Función para extraer URL de imagen
function extractImageUrl(html) {
  const patterns = [
    /<img[^>]*src="([^"]+)"[^>]*alt="[^"]*"[^>]*class="[^"]*va-image[^"]*"/i,
    /<img[^>]*class="[^"]*va-image[^"]*"[^>]*src="([^"]+)"/i,
    /<img[^>]*src="([^"]+)"[^>]*alt="[^"]*"[^>]*>/i
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1].replace(/^\/\//, 'https://').replace(/^\//, baseUrl + '/');
    }
  }
  
  return '';
}

// Función para extraer URL de video de YouTube
function extractVideoUrl(html) {
  const patterns = [
    /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i,
    /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i,
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return `https://youtu.be/${match[1]}`;
    }
  }
  
  return '';
}

// Función para extraer CEFR level activo
function extractCEFRLevel(html) {
  const regex = /<div[^>]*class="[^"]*va-cefr-bubble[^"]*va-cefr-bubble-active[^"]*"[^>]*>([A-Z0-9]+)<\/div>/i;
  const match = html.match(regex);
  return match ? match[1] : '';
}

// Función para extraer DISC type
function extractDISCType(html) {
  const regex = /<div[^>]*class="[^"]*va-disc-badge[^"]*"[^>]*>([A-Z+\s]+)<\/div>/i;
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

// Función para extraer English Score
function extractEnglishScore(html) {
  const regex = /<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>(\d+)<\/div>/i;
  const match = html.match(regex);
  return match ? match[1] : '';
}

// Función para extraer Employment History
function extractEmploymentHistory(html) {
  const employmentRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>([\s\S]*?)(?=<div[^>]*class="[^"]*va-employment-accordion|<\/section|<div[^>]*class="[^"]*va-education)/gi;
  const matches = [];
  let match;
  
  while ((match = employmentRegex.exec(html)) !== null) {
    const accordionHtml = match[1];
    const company = extractText(accordionHtml, 'va-employment-accordion-company');
    const position = extractText(accordionHtml, 'va-employment-accordion-position');
    const period = extractText(accordionHtml, 'va-employment-accordion-period');
    let description = extractText(accordionHtml, 'va-employment-accordion-description');
    
    // Limpiar descripción de bullets HTML
    description = description.replace(/•\s*/g, '• ');
    
    if (company) {
      matches.push({
        company,
        position,
        period,
        description
      });
    }
  }
  
  return matches;
}

// Función para extraer Education
function extractEducation(html) {
  const educationRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  const matches = [];
  let match;
  
  while ((match = educationRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    const school = extractText(itemHtml, 'va-education-school');
    const degree = extractText(itemHtml, 'va-education-degree');
    
    // Buscar año - puede estar en varios lugares
    let year = extractText(itemHtml, /<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)</i) || 
               html.match(/<p[^>]*style="[^"]*font-size:[^"]*12px[^"]*"[^>]*>(\d{4})/i)?.[1] || '';
    
    // Extraer año del texto del degree si tiene números
    if (!year && degree) {
      const yearMatch = degree.match(/(\d{4})/);
      if (yearMatch) {
        year = yearMatch[1];
      }
    }
    
    if (school) {
      matches.push({
        school,
        degree: degree.replace(/\d{4}/g, '').trim(), // Remover año del degree
        year: year.replace(/[^0-9]/g, '') // Solo números
      });
    }
  }
  
  return matches;
}

// Función para procesar un perfil HTML
function processProfileHtml(vaName, slug, html) {
  if (!html) {
    return null;
  }
  
  // Extraer información básica
  const name = extractText(html, 'va-profile-name') || vaName.toUpperCase();
  const title = extractText(html, 'va-title');
  const summary = extractText(html, 'va-summary');
  const tagline = extractText(html, 'va-tagline-text');
  const thumbnailDescription = extractText(html, 'va-thumbnail-text');
  const imageUrl = extractImageUrl(html);
  const videoUrl = extractVideoUrl(html);
  
  // Extraer skills
  const skills = extractMultiple(html, 'va-skill-tag');
  const skillsTags = skills.join(', ');
  
  // Extraer tools
  const toolsRaw = extractMultiple(html, 'va-tool-item');
  const toolsClean = toolsRaw.map(t => t.replace(/✓\s*/, '').replace(/^[\s✓]+/, '').trim()).filter(Boolean);
  const toolsTags = toolsClean.join(', ');
  
  // Extraer equipment
  const equipmentRaw = extractMultiple(html, 'va-equipment-item');
  const equipmentClean = equipmentRaw
    .map(e => e.replace(/<[^>]+>/g, '').trim())
    .filter(e => e && !e.match(/^(svg|path|line|circle|rect)/i))
    .filter(Boolean);
  const equipmentTags = equipmentClean.join(', ');
  
  // Extraer employment
  const employmentSummary = extractText(html, 'va-employment-summary');
  const employmentHistory = extractEmploymentHistory(html);
  
  // Extraer education
  const education = extractEducation(html);
  
  // Extraer DISC
  const discType = extractDISCType(html);
  const discDescription = extractText(html, 'va-disc-description');
  
  // Extraer English
  const englishScore = extractEnglishScore(html);
  const englishDescription = extractText(html, 'va-english-description');
  
  // Extraer CEFR
  const cefrLevel = extractCEFRLevel(html);
  
  // Limpiar slug
  let cleanSlug = slug.replace(/^\//, '').replace(/-ocean-va-profile$/, '');
  
  // Si el slug tiene URL completa, extraer solo el slug
  if (slug.startsWith('http')) {
    const slugMatch = slug.match(/oceanvirtualassistant\.com\/([^\/]+)/i);
    if (slugMatch) {
      cleanSlug = slugMatch[1].replace(/-ocean-va-profile$/, '');
    }
  }
  
  const profileSlug = `https://www.oceanvirtualassistant.com/${cleanSlug}-ocean-va-profile`;
  
  // Determinar main-category basado en el title
  let mainCategory = '';
  if (title) {
    if (title.toLowerCase().includes('insurance')) {
      mainCategory = 'Insurance Virtual Assistant';
    } else if (title.toLowerCase().includes('executive') || title.toLowerCase().includes('admin')) {
      mainCategory = 'Executive Virtual Assistant';
    } else if (title.toLowerCase().includes('mortgage')) {
      mainCategory = 'Mortgage Specialist';
    } else if (title.toLowerCase().includes('healthcare') || title.toLowerCase().includes('medical')) {
      mainCategory = 'Healthcare Virtual Assistant';
    } else {
      mainCategory = title.split('|')[0].trim();
    }
  }
  
  return {
    name: name.trim(),
    slug: cleanSlug,
    'profile-slug-2': profileSlug,
    'main-category': mainCategory,
    'experience-years': '',
    language: '',
    availability: 'Full Time',
    title: title || '',
    image: imageUrl,
    video: videoUrl,
    summary: summary || '',
    tagline: tagline || '',
    'thumbnail-description': thumbnailDescription || '',
    'skills-tags': skillsTags,
    'tools-tags': toolsTags,
    'equipment-tags': equipmentTags,
    'employment-summary': employmentSummary || '',
    'employment-richtext': JSON.stringify(employmentHistory),
    'education-richtext': JSON.stringify(education),
    'disc-type': discType || '',
    'disc-description': discDescription || '',
    'english-test-type': 'EF English Test',
    'english-score': englishScore || '',
    'english-description': englishDescription || '',
    'cerf-result': cefrLevel || '',
    // Campos adicionales para referencia
    '_employment-history': JSON.stringify(employmentHistory),
    '_education': JSON.stringify(education),
    '_source-url': profileSlug
  };
}

// Función principal
async function main() {
  console.log('🌐 Extrayendo información de VAs desde páginas web en línea...\n');
  
  // Leer archivo de slugs
  const slugsContent = fs.readFileSync(slugsFile, 'utf8');
  const records = parse(slugsContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  console.log(`📊 Total de VAs encontrados: ${records.length}\n`);
  
  const results = [];
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const vaName = record.Name.trim();
    let slug = record['Profile Slug'].trim();
    
    // Construir URL
    let url;
    if (slug.startsWith('http')) {
      url = slug;
    } else {
      // Limpiar slug si tiene /
      slug = slug.replace(/^\//, '');
      if (!slug.endsWith('-ocean-va-profile')) {
        slug = `${slug}-ocean-va-profile`;
      }
      url = `${baseUrl}/${slug}`;
    }
    
    console.log(`[${i + 1}/${records.length}] 📄 Procesando: ${vaName}...`);
    console.log(`   URL: ${url}`);
    
    try {
      // Fetch página
      const html = await fetchPage(url);
      
      if (!html) {
        console.warn(`   ⚠️  No se pudo obtener HTML\n`);
        failCount++;
        results.push({
          name: vaName,
          slug: slug.replace(/-ocean-va-profile$/, ''),
          'profile-slug-2': url,
          '_error': 'No se pudo obtener HTML'
        });
        continue;
      }
      
      // Verificar si la página existe (no es 404)
      if (html.includes('404') || html.includes('Not Found') || html.length < 1000) {
        console.warn(`   ⚠️  Página no encontrada o vacía\n`);
        failCount++;
        results.push({
          name: vaName,
          slug: slug.replace(/-ocean-va-profile$/, ''),
          'profile-slug-2': url,
          '_error': 'Página no encontrada'
        });
        continue;
      }
      
      // Procesar HTML
      const vaData = processProfileHtml(vaName, slug, html);
      
      if (vaData) {
        results.push(vaData);
        successCount++;
        console.log(`   ✅ Procesado correctamente\n`);
      } else {
        console.warn(`   ⚠️  Error al procesar datos\n`);
        failCount++;
      }
      
      // Delay para no sobrecargar el servidor
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      failCount++;
      results.push({
        name: vaName,
        slug: slug.replace(/-ocean-va-profile$/, ''),
        'profile-slug-2': url,
        '_error': error.message
      });
    }
  }
  
  // Generar CSV
  if (results.length === 0) {
    console.error('❌ No se generó ningún resultado');
    return;
  }
  
  // Obtener todas las columnas únicas
  const allColumns = new Set();
  results.forEach(row => {
    Object.keys(row).forEach(key => allColumns.add(key));
  });
  
  // Ordenar columnas - poner las más importantes al principio
  const priorityColumns = [
    'name',
    'slug',
    'profile-slug-2',
    'title',
    'main-category',
    'image',
    'video',
    'summary',
    'tagline',
    'thumbnail-description',
    'availability',
    'language',
    'experience-years',
    'skills-tags',
    'tools-tags',
    'equipment-tags',
    'employment-summary',
    'employment-richtext',
    'education-richtext',
    'disc-type',
    'disc-description',
    'english-test-type',
    'english-score',
    'english-description',
    'cerf-result'
  ];
  
  // Agregar columnas prioritarias primero
  const columns = [];
  priorityColumns.forEach(col => {
    if (allColumns.has(col)) {
      columns.push(col);
      allColumns.delete(col);
    }
  });
  
  // Agregar el resto ordenado alfabéticamente (campos auxiliares)
  const remainingColumns = Array.from(allColumns).sort();
  columns.push(...remainingColumns);
  
  // Crear contenido CSV
  const csvRows = [];
  
  // Header
  csvRows.push(columns.map(col => `"${col}"`).join(','));
  
  // Data rows
  results.forEach(row => {
    const values = columns.map(col => {
      let value = row[col] || '';
      
      // Convertir a string
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      } else {
        value = String(value);
      }
      
      // Escapar comillas y envolver en comillas si contiene comas, comillas o saltos de línea
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    });
    csvRows.push(values.join(','));
  });
  
  // Escribir archivo
  fs.writeFileSync(outputFile, csvRows.join('\n'), 'utf8');
  
  console.log('═'.repeat(80));
  console.log('\n📊 RESUMEN:\n');
  console.log(`  ✅ Exitosos: ${successCount}`);
  console.log(`  ⚠️  Fallidos: ${failCount}`);
  console.log(`  📁 Total procesados: ${results.length}`);
  console.log(`  📄 Archivo generado: ${outputFile}`);
  console.log(`  📋 Columnas: ${columns.length}`);
  console.log('\n✅ CSV generado exitosamente!\n');
  console.log('═'.repeat(80));
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
