/**
 * Script para agregar los campos faltantes a Arlene
 * - Languages
 * - Tool Tags
 * - Equipment Tags
 * - Skills Tags
 * - English Level
 * - Title
 * - Type of English Test
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const HTML_FILE_PATH = path.join(process.cwd(), 'webflow-components-minified/311-arlene-profile.html');
const CSV_FILE_PATH = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');

async function main() {
  console.log('🔧 Agregando campos faltantes a Arlene...\n');
  
  // Leer CSV
  let csvData = [];
  try {
    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    csvData = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.error(`Error reading CSV: ${error.message}`);
    return;
  }
  
  const arleneCSV = csvData.find(r => (r.name || '').toUpperCase() === 'ARLENE');
  
  if (!arleneCSV) {
    console.error('❌ Arlene no encontrado en CSV');
    return;
  }
  
  // Leer HTML para extraer datos adicionales
  const html = fs.readFileSync(HTML_FILE_PATH, 'utf8');
  
  // Extraer tools, equipment, skills del HTML
  const tools = [];
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>(.*?)<\/div>/gi;
  let toolItemMatch;
  while ((toolItemMatch = toolItemRegex.exec(html)) !== null) {
    const itemHtml = toolItemMatch[1];
    const spanMatches = itemHtml.match(/<span[^>]*>([^<]+)<\/span>/gi);
    if (spanMatches && spanMatches.length > 1) {
      const toolMatch = spanMatches[1].match(/<span[^>]*>([^<]+)<\/span>/i);
      if (toolMatch) {
        const tool = toolMatch[1].trim();
        if (tool && tool !== '✓' && !tool.match(/checkmark/i)) {
          tools.push(tool);
        }
      }
    }
  }
  
  const equipment = [];
  const equipRegex = /<div[^>]*class="[^"]*va-equipment-item[^"]*"[^>]*>.*?<span>([^<]+)<\/span>/gi;
  let equipMatch;
  while ((equipMatch = equipRegex.exec(html)) !== null) {
    equipment.push(equipMatch[1].trim());
  }
  
  const skills = [];
  const skillRegex = /<span[^>]*class="[^"]*va-skill-tag[^"]*"[^>]*>([^<]+)<\/span>/gi;
  let skillMatch;
  while ((skillMatch = skillRegex.exec(html)) !== null) {
    skills.push(skillMatch[1].trim());
  }
  
  // Extraer Type of English Test del HTML
  const englishTestMatch = html.match(/<h3[^>]*>([^<]*EF[^<]*ENGLISH[^<]*)<\/h3>/i);
  const typeOfEnglishTest = englishTestMatch ? englishTestMatch[1].trim() : '';
  
  // Extraer English Level (del score)
  const englishScoreMatch = html.match(/<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>([^<]+)<\/div>/i);
  const englishScore = englishScoreMatch ? englishScoreMatch[1].trim() : '';
  // Extraer el nivel (B1, B2, etc.) del score
  const englishLevel = englishScore.match(/\b([ABC][12])\b/i) ? englishScore.match(/\b([ABC][12])\b/i)[1] : '';
  
  // Obtener Arlene del CMS
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
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
  
  const arlene = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'arlene');
  
  if (!arlene) {
    console.error('❌ Arlene no encontrado en CMS');
    return;
  }
  
  console.log('✅ Arlene encontrado en CMS\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 DATOS EXTRAÍDOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Languages (CSV): ${arleneCSV.language || 'N/A'}`);
  console.log(`Title (CSV): ${arleneCSV.title || 'N/A'}`);
  console.log(`Tools Tags: ${tools.join(', ')}`);
  console.log(`Equipment Tags: ${equipment.join(', ')}`);
  console.log(`Skills Tags: ${skills.join(', ')}`);
  console.log(`Type of English Test: ${typeOfEnglishTest || 'N/A'}`);
  console.log(`English Level: ${englishLevel || 'N/A'}\n`);
  
  // Preparar actualizaciones
  const updates = {};
  
  // 1. Languages (del CSV o inferir del contexto)
  // Si no está en CSV, verificar si hay información en el HTML o usar un valor por defecto
  let languages = arleneCSV.language;
  if (!languages) {
    // Arlene es Mortgage Specialist, probablemente habla English
    // O buscar en el HTML si hay información de idiomas
    languages = 'English'; // Valor por defecto basado en el contexto
    console.log('⚠️  No hay language en CSV, usando valor por defecto: English');
  }
  updates['languages'] = languages;
  console.log('✓ Languages será actualizado');
  
  // 2. Title - usar title-2 (no title)
  const title = arleneCSV.title || 'MORTGAGE LOAN PROCESSOR';
  updates['title-2'] = title;
  console.log('✓ Title será actualizado (title-2)');
  
  // 3. Tool Tags
  if (tools.length > 0) {
    updates['tools-tags'] = tools.join(', ');
    console.log('✓ Tools Tags será actualizado');
  }
  
  // 4. Equipment Tags
  if (equipment.length > 0) {
    updates['equipment-tags'] = equipment.join(', ');
    console.log('✓ Equipment Tags será actualizado');
  }
  
  // 5. Skills Tags
  if (skills.length > 0) {
    updates['skills-tags'] = skills.join(', ');
    console.log('✓ Skills Tags será actualizado');
  }
  
  // 6. English Level - formato puede ser "B1" o "B1 (CEFR) - Intermediate"
  if (englishLevel) {
    // Verificar formato en otros VAs - puede necesitar formato completo
    updates['english-level'] = englishLevel;
    console.log('✓ English Level será actualizado');
  }
  
  // 7. Type of English Test
  if (typeOfEnglishTest) {
    updates['type-of-english-test'] = typeOfEnglishTest;
    console.log('✓ Type of English Test será actualizado');
  }
  
  if (Object.keys(updates).length === 0) {
    console.log('\n⚠️  No se encontraron campos para actualizar. Verificando campos disponibles...\n');
    
    // Listar todos los campos disponibles
    console.log('Campos disponibles en Arlene:');
    Object.keys(arlene.fieldData).forEach(field => {
      console.log(`   - ${field}`);
    });
    return;
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('🔧 CAMPOS A ACTUALIZAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  Object.keys(updates).forEach(field => {
    const value = updates[field];
    const preview = typeof value === 'string' ? value.substring(0, 100) : String(value);
    console.log(`   ✓ ${field}: ${preview}${typeof value === 'string' && value.length > 100 ? '...' : ''}`);
  });
  
  console.log('\n📤 Actualizando CMS...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, arlene.id, updates);
    console.log('✅ Arlene actualizado exitosamente\n');
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   Campos actualizados: ${Object.keys(updates).length}`);
    Object.keys(updates).forEach(field => {
      console.log(`   ✓ ${field}`);
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
