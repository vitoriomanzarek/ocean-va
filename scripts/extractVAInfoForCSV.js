/**
 * Script para extraer información de VAs desde perfiles HTML y generar CSV
 * Compatible con formato del formulario VACreation.jsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const slugsFile = path.join(__dirname, '../src/data/Slugs VAs.csv');
const profilesDir = path.join(__dirname, '../webflow-components-minified');
const outputFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');

// Mapeo de nombres de archivos a nombres de VA
const nameToFileMap = {
  'AC': '269-ac-profile',
  'Aaron': '312-aaron-profile',
  'Abigail': '241-abigail-va-profile',
  'Adrian': '211-adrian-profile',
  'Albert': '216-albert-profile',
  'Alejandro': '236-alejandro-profile',
  'Alyssa': '297-alyssa-profile',
  'Ana': '243-ana-profile',
  'Ana Gabriela': '291-ana-gabriela-profile',
  'Ana Victoria': '244-ana-victoria-profile',
  'Anahi': '268-anahi-profile',
  'Andrea': '309-andrea-profile',
  'Andres': '300-andres-profile',
  'Angel': '290-angel-profile',
  'Antonio': '242-antonio-profile',
  'Balbina': '245-balbina-profile',
  'Bernadette': '305-bernadette-abellana-profile',
  'Brandon L.': '246-brandon-l-profile',
  'Branko': '289-branko-profile',
  'Carolina': '247-carolina-profile',
  'Charley': '308-charley-profile',
  'Cherry Mae': '231-cherry-mae-profile',
  'Christine': '248-christine-profile',
  'Dafne': '235-dafne-profile',
  'Dawn': '251-dawn-profile',
  'Dayana': '252-dayana-profile',
  'Drue': '309-drew-profile',
  'Ella': '295-ella-dimaano-profile',
  'Ellen': '250-ellen-profile',
  'Emmanuel': '230-emmanuel-profile',
  'Fabiola': '288-fabiola-profile',
  'Fernanda': '249-fernanda-profile',
  'Francis': '229-francis-profile',
  'Francis Aldrin': '302-francis-aldrin-profile',
  'Gabriela': '294-gabriela-rodriguez-profile',
  'Gael': '287-gael-profile',
  'Geraldine': '265-geraldine-profile',
  'Gizelle': '220-gizelle-profile',
  'Gonzalo': '253-gonzalo-profile',
  'Grace': '213-Grace-va-profile',
  'Guillermo': '254-guillermo-profile',
  'Hugo': '286-hugo-profile',
  'Israel': '256-israel-profile',
  'Ivan': '234-ivan-profile',
  'Jane': '278-jane-profile',
  'Janet': '214-janet-profile',
  'Janice': '257-janice-profile',
  'Jasmine': '219-jasmine-profile',
  'Javier': '227-javier-profile',
  'Jay Alvin': '228-jay-alvin-profile',
  'Jerome': '226-jerome-profile',
  'Jill': '218-jill-profile',
  'Jimmy': '274-jimmy-profile',
  'Joan Rose': '280-joan-rose-profile',
  'Joana': '239-joana-profile',
  'Joel': '275-joel-profile',
  'Joji Marie': '225-joji-profile',
  'Jomer': '285-jomer-daniel-profile',
  'Jose Luis': '284-jose-luis-profile',
  'Joy': '279-joy-profile',
  'Juname': '301-juname-profile',
  'Karen': '233-karen-profile',
  'Karl': '307-karl-profile',
  'Karl Loyd': '307-karl-profile',
  'Kathleen': '217-kathleen-profile',
  'Kempee': '299-kempee-profile',
  'Kevin': '255-kevin-profile',
  'Lady Ann': '308-lady-ann-aguirre-profile',
  'Laurice': '224-laurice-profile',
  'Lois': '258-lois-profile',
  'Lorenz': '223-lorenz-profile',
  'Louise': '281-louise-profile',
  'Ma. Venus': '271-ma-venus-profile',
  'Marco': '293-marco-profile',
  'Maria': '260-maria-profile',
  'Maria Christine': '296-maria-christine-profile',
  'Maria D.': '259-maria-d-profile',
  'Maria Paula': '240-maria-paula-profile',
  'Maridel': '277-maridel-profile',
  'Maximiliano': '310-maximiliano-profile',
  'Melissa': '261-melissa-profile',
  'Michelle': '222-michelle-profile',
  'Mina': '270-mina-profile',
  'Moises': '232-moises-profile',
  'Patricia': '262-patricia-profile',
  'Patricia Nicole': '298-patricia-nicole-profile',
  'Patricio': '283-patricio-profile',
  'Pavel': '215-pavel-profile',
  'Rafael': '263-rafael-profile',
  'Rainier': '264-rainier-profile',
  'Randean': '276-randean-profile',
  'Raydon': '221-Raydon-profile',
  'Rejean': '272-rejean-profile',
  'Rochelle': '266-rochelle-profile',
  'Rona Mae': '273-rona-mae-profile',
  'Ruel': '303-ruel-profile',
  'Samantha': '282-samantha-profile',
  'Sandra': '267-sandra-profile',
  'Sheila Marie': '306-sheila-marie-rogador-profile',
  'Tricia': '238-Tricia-va-profile',
  'Vicente': '304-vicente-penaflor-profile',
  'Ximena': '292-ximena-profile',
  'Ximena G.': '237-ximena-g-profile',
  'Yvette': '212-yvette-profile'
};

// Función para normalizar nombre de VA
function normalizeName(name) {
  return name.trim()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

// Función para extraer texto de HTML
function extractText(html, selector) {
  const regex = new RegExp(`<[^>]*class="[^"]*${selector}[^"]*"[^>]*>([\\s\\S]*?)</[^>]+>`, 'i');
  const match = html.match(regex);
  if (match) {
    return match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
  return '';
}

// Función para extraer múltiples elementos
function extractMultiple(html, selector) {
  const regex = new RegExp(`<[^>]*class="[^"]*${selector}[^"]*"[^>]*>([\\s\\S]*?)</[^>]+>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    if (text) matches.push(text);
  }
  return matches;
}

// Función para extraer URL de imagen
function extractImageUrl(html) {
  const regex = /<img[^>]*src="([^"]+)"[^>]*alt="[^"]*"[^>]*>/i;
  const match = html.match(regex);
  return match ? match[1] : '';
}

// Función para extraer URL de video de YouTube
function extractVideoUrl(html) {
  // Buscar en onclick del video container
  const onclickMatch = html.match(/onclick="[^"]*youtube\.com\/embed\/([^"]+)"[^"]*"/i);
  if (onclickMatch) {
    return `https://youtu.be/${onclickMatch[1]}`;
  }
  // Buscar en iframe
  const iframeMatch = html.match(/src="https?:\/\/www\.youtube\.com\/embed\/([^"]+)"/i);
  if (iframeMatch) {
    return `https://youtu.be/${iframeMatch[1]}`;
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
  const regex = /<div[^>]*class="[^"]*va-disc-badge[^"]*"[^>]*>([A-Z+]+)<\/div>/i;
  const match = html.match(regex);
  return match ? match[1] : '';
}

// Función para extraer English Score
function extractEnglishScore(html) {
  const regex = /<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>(\d+)<\/div>/i;
  const match = html.match(regex);
  return match ? match[1] : '';
}

// Función para extraer Employment History
function extractEmploymentHistory(html) {
  const employmentRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  const matches = [];
  let match;
  
  while ((match = employmentRegex.exec(html)) !== null) {
    const accordionHtml = match[0];
    const company = extractText(accordionHtml, 'va-employment-accordion-company');
    const position = extractText(accordionHtml, 'va-employment-accordion-position');
    const period = extractText(accordionHtml, 'va-employment-accordion-period');
    const description = extractText(accordionHtml, 'va-employment-accordion-description');
    
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
  const educationRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?=<div|<\/section)/gi;
  const matches = [];
  let match;
  
  while ((match = educationRegex.exec(html)) !== null) {
    const itemHtml = match[0];
    const school = extractText(itemHtml, 'va-education-school');
    const degree = extractText(itemHtml, 'va-education-degree');
    const year = extractText(itemHtml, 'va-education-year') || extractMultiple(itemHtml, 'va-education-degree')[1] || '';
    
    if (school) {
      matches.push({
        school,
        degree,
        year: year.replace(/[^0-9]/g, '') // Solo números
      });
    }
  }
  
  return matches;
}

// Función para leer y procesar un perfil HTML
function processProfileHtml(vaName, slug, filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Archivo no encontrado: ${filePath} para ${vaName}`);
    return null;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  
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
  const tools = extractMultiple(html, 'va-tool-item');
  const toolsClean = tools.map(t => t.replace(/✓\s*/, '').trim()).filter(Boolean);
  const toolsTags = toolsClean.join(', ');
  
  // Extraer equipment
  const equipment = extractMultiple(html, 'va-equipment-item');
  const equipmentClean = equipment.map(e => e.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
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
  const cleanSlug = slug.replace(/^\//, '').replace(/-ocean-va-profile$/, '');
  const profileSlug = `https://www.oceanvirtualassistant.com/${cleanSlug}-ocean-va-profile`;
  
  return {
    name: name.trim(),
    slug: cleanSlug,
    'profile-slug-2': profileSlug,
    'main-category': title || '',
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
    '_file-path': filePath
  };
}

// Función principal
function main() {
  console.log('📋 Extrayendo información de VAs...\n');
  
  // Leer archivo de slugs
  const slugsContent = fs.readFileSync(slugsFile, 'utf8');
  const records = parse(slugsContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  console.log(`📊 Total de VAs encontrados: ${records.length}\n`);
  
  const results = [];
  
  for (const record of records) {
    const vaName = record.Name.trim();
    let slug = record['Profile Slug'].trim();
    
    // Limpiar slug si tiene URL completa
    if (slug.startsWith('http')) {
      slug = slug.replace('https://www.oceanvirtualassistant.com', '').replace('http://www.oceanvirtualassistant.com', '');
    }
    
    // Encontrar archivo
    const fileKey = nameToFileMap[vaName];
    let filePath = null;
    
    if (fileKey) {
      const possibleFiles = [
        `${fileKey}.html`,
        `${fileKey}-correct.html`
      ];
      
      for (const fileName of possibleFiles) {
        const fullPath = path.join(profilesDir, fileName);
        if (fs.existsSync(fullPath)) {
          filePath = fullPath;
          break;
        }
      }
    }
    
    if (!filePath) {
      // Intentar encontrar por nombre normalizado
      const normalizedName = normalizeName(vaName);
      const searchPattern = `${normalizedName}-profile`;
      const files = fs.readdirSync(profilesDir);
      const matchingFile = files.find(f => f.toLowerCase().includes(normalizedName.toLowerCase()) && f.includes('profile'));
      
      if (matchingFile) {
        filePath = path.join(profilesDir, matchingFile);
      }
    }
    
    if (!filePath) {
      console.warn(`⚠️  No se encontró archivo para: ${vaName}`);
      // Crear entrada vacía
      results.push({
        name: vaName,
        slug: slug.replace(/^\//, '').replace(/-ocean-va-profile$/, ''),
        'profile-slug-2': slug.startsWith('http') ? slug : `https://www.oceanvirtualassistant.com${slug}`,
        '_error': 'Archivo no encontrado'
      });
      continue;
    }
    
    console.log(`📄 Procesando: ${vaName}...`);
    const vaData = processProfileHtml(vaName, slug, filePath);
    
    if (vaData) {
      results.push(vaData);
      console.log(`   ✅ Procesado correctamente\n`);
    } else {
      console.warn(`   ⚠️  Error al procesar\n`);
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
  
  const columns = Array.from(allColumns).sort();
  
  // Crear contenido CSV
  const csvRows = [];
  
  // Header
  csvRows.push(columns.join(','));
  
  // Data rows
  results.forEach(row => {
    const values = columns.map(col => {
      let value = row[col] || '';
      // Escapar comillas y comas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
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
  console.log(`  Total procesados: ${results.length}`);
  console.log(`  Archivo generado: ${outputFile}`);
  console.log(`  Columnas: ${columns.length}`);
  console.log('\n✅ CSV generado exitosamente!\n');
  console.log('═'.repeat(80));
}

// Ejecutar
main();
