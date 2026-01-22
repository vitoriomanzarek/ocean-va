/**
 * Script para analizar campos vacíos en el CMS de Webflow
 * Compara con el CSV para identificar qué campos necesitan actualización
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const csvFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');
const reportFile = path.join(__dirname, '../src/data/analisis-campos-vacios.txt');
const emptyFieldsCSV = path.join(__dirname, '../src/data/vas-con-campos-vacios.csv');

// Mapeo de campos importantes a verificar
const IMPORTANT_FIELDS = {
  'title-2': 'Title',
  'summary': 'Summary',
  'tagline': 'Tagline',
  'thumbnail-description': 'Thumbnail Description',
  'skills-richtext': 'Skills Richtext',
  'tools-richtext': 'Tools Richtext',
  'equipment-richtext': 'Equipment Richtext',
  'employment-summary': 'Employment Summary',
  'employment-richtext': 'Employment Richtext',
  'education-richtext': 'Education Richtext',
  'disc-type-2': 'DISC Type',
  'disc-description': 'DISC Description',
  'type-of-english-test': 'English Test Type',
  'english-score-3': 'English Score',
  'english-description': 'English Description',
  'cerf-result': 'CEFR Result',
  'video': 'Video URL',
  'video-thumbnail-2': 'Video Thumbnail',
  'skills-tags': 'Skills Tags',
  'tools-tags': 'Tools Tags',
  'equipment-tags': 'Equipment Tags',
  'experience-years': 'Experience Years',
  'availability': 'Availability',
  'languages': 'Language'
};

// Mapeo de campos del CSV a campos de Webflow
const CSV_TO_WEBFLOW = {
  'title': 'title-2',
  'summary': 'summary',
  'tagline': 'tagline',
  'thumbnail-description': 'thumbnail-description',
  'skills-richtext': 'skills-richtext',
  'tools-tags': 'tools-tags',
  'equipment-tags': 'equipment-tags',
  'employment-summary': 'employment-summary',
  'employment-richtext': 'employment-richtext',
  'education-richtext': 'education-richtext',
  'disc-type': 'disc-type-2',
  'disc-description': 'disc-description',
  'english-test-type': 'type-of-english-test',
  'english-score': 'english-score-3',
  'english-description': 'english-description',
  'cerf-result': 'cerf-result',
  'video': 'video',
  'video-thumbnail': 'video-thumbnail-2',
  'skills-tags': 'skills-tags',
  'experience-years': 'experience-years',
  'availability': 'availability',
  'language': 'languages'
};

// Función para normalizar nombres
function normalizeName(name) {
  if (!name) return '';
  return name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
}

// Función para normalizar slug
function normalizeSlug(slug) {
  if (!slug) return '';
  return slug.toLowerCase().trim().replace(/^\//, '').replace(/-ocean-va-profile$/, '');
}

// Función para extraer slug de profile-slug-2
function extractSlugFromUrl(url) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)-ocean-va-profile/);
  return match ? match[1] : '';
}

// Función para verificar si un campo está vacío
function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' || trimmed === 'null' || trimmed === 'undefined';
  }
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

// Función principal
async function main() {
  console.log('🔍 Analizando campos vacíos en el CMS...\n');
  
  try {
    // 1. Obtener VAs del CMS
    console.log('📥 Obteniendo VAs del CMS de Webflow...');
    
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];
    
    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }
    
    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    
    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
    
    // Obtener todos los items
    let allCMSItems = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const response = await client.getCollectionItems(vaCollection.id, { limit, offset });
      if (!response.items || response.items.length === 0) break;
      allCMSItems = allCMSItems.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }
    
    console.log(`✅ Total VAs en CMS: ${allCMSItems.length}\n`);
    
    // 2. Leer CSV
    console.log('📄 Leyendo CSV...');
    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const csvRecords = parse(csvContent, { columns: true, skip_empty_lines: true });
    console.log(`✅ Total VAs en CSV: ${csvRecords.length}\n`);
    
    // 3. Crear mapa de CSV por slug/nombre
    const csvMap = new Map();
    csvRecords.forEach(record => {
      const slug = normalizeSlug(record.slug || '');
      const name = normalizeName(record.name || '');
      if (slug) csvMap.set(slug, record);
      if (name) csvMap.set(name, record);
    });
    
    // 4. Analizar campos vacíos
    console.log('🔍 Analizando campos vacíos...\n');
    
    const vasWithEmptyFields = [];
    const fieldStatistics = {};
    
    // Inicializar estadísticas
    Object.keys(IMPORTANT_FIELDS).forEach(field => {
      fieldStatistics[field] = { empty: 0, total: 0 };
    });
    
    allCMSItems.forEach((cmsItem, index) => {
      const cmsData = cmsItem.fieldData;
      const slug = normalizeSlug(cmsData.slug || '');
      const name = normalizeName(cmsData.name || '');
      
      // Buscar en CSV
      const csvRecord = csvMap.get(slug) || csvMap.get(name);
      
      const emptyFields = [];
      const csvHasData = [];
      
      // Verificar cada campo importante
      Object.keys(IMPORTANT_FIELDS).forEach(webflowField => {
        fieldStatistics[webflowField].total++;
        
        const cmsValue = cmsData[webflowField];
        const isEmptyInCMS = isEmpty(cmsValue);
        
        if (isEmptyInCMS) {
          fieldStatistics[webflowField].empty++;
          emptyFields.push({
            field: webflowField,
            displayName: IMPORTANT_FIELDS[webflowField]
          });
          
          // Verificar si CSV tiene datos para este campo
          if (csvRecord) {
            const csvField = Object.keys(CSV_TO_WEBFLOW).find(
              key => CSV_TO_WEBFLOW[key] === webflowField
            );
            if (csvField && csvRecord[csvField] && !isEmpty(csvRecord[csvField])) {
              csvHasData.push({
                field: webflowField,
                displayName: IMPORTANT_FIELDS[webflowField],
                csvValue: csvRecord[csvField]
              });
            }
          }
        }
      });
      
      if (emptyFields.length > 0) {
        vasWithEmptyFields.push({
          cmsId: cmsItem.id,
          name: cmsData.name || 'Unnamed',
          slug: slug,
          emptyFields: emptyFields,
          csvHasData: csvHasData,
          isDraft: cmsItem.isDraft
        });
      }
      
      if ((index + 1) % 20 === 0) {
        console.log(`   ✅ Analizados ${index + 1}/${allCMSItems.length}...`);
      }
    });
    
    // 5. Generar reporte
    let report = '═'.repeat(80) + '\n';
    report += 'ANÁLISIS DE CAMPOS VACÍOS EN CMS\n';
    report += '═'.repeat(80) + '\n\n';
    report += `Fecha: ${new Date().toLocaleString()}\n\n`;
    report += `Total VAs en CMS: ${allCMSItems.length}\n`;
    report += `VAs con campos vacíos: ${vasWithEmptyFields.length}\n\n`;
    
    // Estadísticas por campo
    report += '─'.repeat(80) + '\n';
    report += 'ESTADÍSTICAS POR CAMPO:\n';
    report += '─'.repeat(80) + '\n';
    report += 'Campo'.padEnd(35) + 'Vacíos'.padEnd(10) + 'Total'.padEnd(10) + '% Vacío\n';
    report += '─'.repeat(80) + '\n';
    
    Object.keys(IMPORTANT_FIELDS).forEach(field => {
      const stats = fieldStatistics[field];
      const percentage = stats.total > 0 ? ((stats.empty / stats.total) * 100).toFixed(1) : '0.0';
      report += IMPORTANT_FIELDS[field].padEnd(35) + 
                stats.empty.toString().padEnd(10) + 
                stats.total.toString().padEnd(10) + 
                percentage + '%\n';
    });
    
    // VAs con más campos vacíos
    report += '\n' + '─'.repeat(80) + '\n';
    report += `VAs CON CAMPOS VACÍOS (Top 20):\n`;
    report += '─'.repeat(80) + '\n';
    
    // Ordenar por cantidad de campos vacíos
    vasWithEmptyFields.sort((a, b) => b.emptyFields.length - a.emptyFields.length);
    
    vasWithEmptyFields.slice(0, 20).forEach((va, index) => {
      report += `\n${index + 1}. ${va.name} (${va.slug})\n`;
      report += `   CMS ID: ${va.cmsId}\n`;
      report += `   Estado: ${va.isDraft ? 'Draft' : 'Published'}\n`;
      report += `   Campos vacíos: ${va.emptyFields.length}\n`;
      
      if (va.csvHasData.length > 0) {
        report += `   ⚠️  CSV tiene datos para ${va.csvHasData.length} campo(s) vacío(s):\n`;
        va.csvHasData.forEach(item => {
          const preview = typeof item.csvValue === 'string' 
            ? item.csvValue.substring(0, 60) + (item.csvValue.length > 60 ? '...' : '')
            : JSON.stringify(item.csvValue).substring(0, 60);
          report += `      - ${item.displayName}: ${preview}\n`;
        });
      }
      
      report += `   Campos faltantes:\n`;
      va.emptyFields.forEach(field => {
        report += `      - ${field.displayName} (${field.field})\n`;
      });
    });
    
    if (vasWithEmptyFields.length > 20) {
      report += `\n... y ${vasWithEmptyFields.length - 20} VAs más con campos vacíos\n`;
    }
    
    report += '\n' + '═'.repeat(80) + '\n';
    report += 'RECOMENDACIONES:\n';
    report += '═'.repeat(80) + '\n';
    report += `1. ${vasWithEmptyFields.length} VAs tienen campos vacíos que pueden completarse desde el CSV\n`;
    report += `2. Revisa los VAs con más campos vacíos primero\n`;
    report += `3. Los campos marcados con ⚠️ tienen datos disponibles en el CSV para actualizar\n`;
    report += '═'.repeat(80) + '\n';
    
    fs.writeFileSync(reportFile, report, 'utf8');
    console.log(`✅ Reporte generado: ${reportFile}`);
    
    // 6. Generar CSV con VAs que tienen campos vacíos
    if (vasWithEmptyFields.length > 0) {
      const csvData = vasWithEmptyFields.map(va => ({
        'CMS ID': va.cmsId,
        'Name': va.name,
        'Slug': va.slug,
        'Estado': va.isDraft ? 'Draft' : 'Published',
        'Campos Vacíos': va.emptyFields.length,
        'Campos Faltantes': va.emptyFields.map(f => f.displayName).join('; '),
        'CSV Tiene Datos Para': va.csvHasData.length > 0 ? va.csvHasData.map(f => f.displayName).join('; ') : 'N/A'
      }));
      
      const csvOutput = stringify(csvData, {
        header: true,
        quoted: true,
        quoted_empty: false
      });
      
      fs.writeFileSync(emptyFieldsCSV, csvOutput, 'utf8');
      console.log(`✅ CSV generado: ${emptyFieldsCSV}`);
    }
    
    // Resumen en consola
    console.log('\n═'.repeat(80));
    console.log('\n📊 RESUMEN:\n');
    console.log(`   Total VAs analizados: ${allCMSItems.length}`);
    console.log(`   VAs con campos vacíos: ${vasWithEmptyFields.length}`);
    console.log(`   % VAs con campos vacíos: ${((vasWithEmptyFields.length / allCMSItems.length) * 100).toFixed(1)}%\n`);
    
    console.log('\n📋 CAMPOS CON MÁS VACÍOS:\n');
    const sortedFields = Object.keys(IMPORTANT_FIELDS).sort((a, b) => 
      fieldStatistics[b].empty - fieldStatistics[a].empty
    );
    
    sortedFields.slice(0, 10).forEach(field => {
      const stats = fieldStatistics[field];
      const percentage = ((stats.empty / stats.total) * 100).toFixed(1);
      console.log(`   ${IMPORTANT_FIELDS[field].padEnd(35)}: ${stats.empty}/${stats.total} (${percentage}%)`);
    });
    
    console.log('\n✅ Análisis completado!\n');
    console.log('═'.repeat(80));
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Inicializar cliente Webflow
const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Ejecutar
main();
