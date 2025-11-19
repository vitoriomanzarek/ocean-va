#!/usr/bin/env node

/**
 * Script para extraer datos de perfiles de VAs desde archivos JSX
 * Genera un archivo JSON con toda la información de los perfiles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const outputFile = path.join(__dirname, '../data/va-profiles-complete.json');

// Función para extraer el objeto de datos del archivo JSX
function extractVAData(fileContent) {
  try {
    // Buscar el patrón: const [name]Data = { ... }
    const dataMatch = fileContent.match(/const\s+\w+Data\s*=\s*(\{[\s\S]*?\n\s*\})\s*\n\s*return/);
    
    if (!dataMatch) {
      return null;
    }

    // Evaluar el objeto (seguro porque es nuestro código)
    const dataStr = dataMatch[1];
    
    // Reemplazar comillas simples con comillas dobles para JSON válido
    let jsonStr = dataStr
      .replace(/'/g, '"')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ');

    // Intentar parsear como JSON
    try {
      const data = JSON.parse(jsonStr);
      return data;
    } catch (e) {
      // Si falla, intentar una aproximación más robusta
      console.warn(`⚠️  No se pudo parsear JSON para archivo, intentando extracción manual...`);
      return null;
    }
  } catch (error) {
    console.error(`Error extrayendo datos:`, error.message);
    return null;
  }
}

// Función más robusta para extraer datos
function extractVADataRobust(fileContent, fileName) {
  try {
    // Buscar patrones específicos
    const nameMatch = fileContent.match(/name:\s*['"]([^'"]+)['"]/);
    const titleMatch = fileContent.match(/title:\s*['"]([^'"]+)['"]/);
    const imageMatch = fileContent.match(/image:\s*['"]([^'"]+)['"]/);
    const summaryMatch = fileContent.match(/summary:\s*['"]([^'"]+)['"]/);
    const taglineMatch = fileContent.match(/tagline:\s*['"]([^'"]+)['"]/);
    const videoUrlMatch = fileContent.match(/videoUrl:\s*['"]([^'"]+)['"]/);
    
    // Extraer arrays
    const skillsMatch = fileContent.match(/skills:\s*\[([\s\S]*?)\],/);
    const toolsMatch = fileContent.match(/tools:\s*\[([\s\S]*?)\],/);
    const equipmentMatch = fileContent.match(/equipment:\s*\[([\s\S]*?)\],/);
    
    // Extraer employment history
    const employmentMatch = fileContent.match(/employmentHistory:\s*\[([\s\S]*?)\],/);
    
    // Extraer DISC
    const discMatch = fileContent.match(/discResult:\s*['"]([^'"]+)['"]/);
    const discDescMatch = fileContent.match(/discResultDescription:\s*['"]([^'"]+)['"]/);
    
    // Extraer English
    const englishScoreMatch = fileContent.match(/englishScore:\s*['"]([^'"]+)['"]/);
    const englishDescMatch = fileContent.match(/englishDescription:\s*['"]([^'"]+)['"]/);
    
    // Extraer Education
    const educationMatch = fileContent.match(/education:\s*(\{[\s\S]*?\}),?\s*\}/);

    const data = {
      name: nameMatch ? nameMatch[1] : null,
      title: titleMatch ? titleMatch[1] : null,
      image: imageMatch ? imageMatch[1] : null,
      summary: summaryMatch ? summaryMatch[1] : null,
      tagline: taglineMatch ? taglineMatch[1] : null,
      videoUrl: videoUrlMatch ? videoUrlMatch[1] : null,
      skills: skillsMatch ? extractArray(skillsMatch[1]) : [],
      tools: toolsMatch ? extractArray(toolsMatch[1]) : [],
      equipment: equipmentMatch ? extractArray(equipmentMatch[1]) : [],
      employmentHistory: employmentMatch ? extractEmploymentHistory(employmentMatch[1]) : [],
      discResult: discMatch ? discMatch[1] : null,
      discResultDescription: discDescMatch ? discDescMatch[1] : null,
      englishScore: englishScoreMatch ? englishScoreMatch[1] : null,
      englishDescription: englishDescMatch ? englishDescMatch[1] : null,
      education: educationMatch ? extractEducation(educationMatch[1]) : null,
      sourceFile: fileName
    };

    return data;
  } catch (error) {
    console.error(`Error en extracción robusta:`, error.message);
    return null;
  }
}

// Función para extraer arrays de strings
function extractArray(arrayStr) {
  const items = arrayStr.match(/['"]([^'"]+)['"]/g);
  if (!items) return [];
  return items.map(item => item.replace(/['"]/g, ''));
}

// Función para extraer employment history
function extractEmploymentHistory(historyStr) {
  const entries = [];
  const entryPattern = /\{\s*company:\s*['"]([^'"]+)['"]\s*,\s*position:\s*['"]([^'"]+)['"]\s*,\s*period:\s*['"]([^'"]+)['"]\s*,\s*description:\s*['"]([^'"]+)['"]\s*\}/g;
  
  let match;
  while ((match = entryPattern.exec(historyStr)) !== null) {
    entries.push({
      company: match[1],
      position: match[2],
      period: match[3],
      description: match[4]
    });
  }
  
  return entries;
}

// Función para extraer education
function extractEducation(eduStr) {
  const schoolMatch = eduStr.match(/school:\s*['"]([^'"]+)['"]/);
  const degreeMatch = eduStr.match(/degree:\s*['"]([^'"]+)['"]/);
  const dateMatch = eduStr.match(/date:\s*['"]([^'"]+)['"]/);

  return {
    school: schoolMatch ? schoolMatch[1] : null,
    degree: degreeMatch ? degreeMatch[1] : null,
    date: dateMatch ? dateMatch[1] : null
  };
}

// Función principal
function extractAllProfiles() {
  console.log('📂 Buscando archivos de perfiles en:', pagesDir);
  
  const files = fs.readdirSync(pagesDir).filter(file => 
    file.endsWith('Profile.jsx') && file !== 'VAProfilePage.jsx'
  );

  console.log(`📋 Encontrados ${files.length} archivos de perfiles\n`);

  const profiles = [];
  let successCount = 0;
  let failCount = 0;

  files.forEach((file, index) => {
    const filePath = path.join(pagesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Intentar extracción robusta
    const vaData = extractVADataRobust(fileContent, file);
    
    if (vaData && vaData.name) {
      profiles.push(vaData);
      successCount++;
      console.log(`✅ ${index + 1}/${files.length} - ${vaData.name}`);
    } else {
      failCount++;
      console.log(`❌ ${index + 1}/${files.length} - ${file} (No se pudo extraer)`);
    }
  });

  // Ordenar alfabéticamente por nombre
  profiles.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  // Crear estructura final
  const output = {
    metadata: {
      totalProfiles: profiles.length,
      successfulExtractions: successCount,
      failedExtractions: failCount,
      extractedAt: new Date().toISOString(),
      sourceDirectory: pagesDir
    },
    profiles: profiles
  };

  // Guardar archivo
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n✅ Extracción completada!`);
  console.log(`📊 Total: ${successCount} exitosos, ${failCount} fallidos`);
  console.log(`📁 Archivo guardado: ${outputFile}`);
  console.log(`📈 Tamaño: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
}

// Ejecutar
extractAllProfiles();
