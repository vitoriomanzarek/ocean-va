/**
 * Script para verificar el estado actual de Arlene en el CMS
 * y comparar con lo que debería tener según el script original
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const CSV_FILE_PATH = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');

async function main() {
  console.log('🔍 Verificando estado de Arlene en el CMS...\n');
  
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
  
  const arlene = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'arlene');
  
  if (!arlene) {
    console.error('❌ Arlene no encontrado en CMS');
    return;
  }
  
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
  }
  
  const arleneCSV = csvData.find(r => (r.name || '').toUpperCase() === 'ARLENE');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 ARLENE - ESTADO ACTUAL EN CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Campos importantes a verificar
  const importantFields = [
    'name',
    'slug',
    'title',
    'main-category',
    'experience-years',
    'languages',
    'availability',
    'summary',
    'tagline',
    'thumbnail-description',
    'image',
    'video',
    'video-thumbnail-2',
    'employment-summary',
    'employment-richtext',
    'education-richtext',
    'tools-richtext',
    'equipment-richtext',
    'skills-richtext',
    'disc-type-2',
    'disc-description',
    'english-score-3',
    'english-description',
    'cerf-result'
  ];
  
  const missingFields = [];
  const emptyFields = [];
  
  importantFields.forEach(field => {
    const value = arlene.fieldData[field];
    if (value === undefined || value === null) {
      missingFields.push(field);
    } else if (value === '' || (typeof value === 'string' && value.trim() === '')) {
      emptyFields.push(field);
    }
  });
  
  console.log('Campos con datos:');
  importantFields.forEach(field => {
    const value = arlene.fieldData[field];
    if (value && value !== '' && (typeof value !== 'string' || value.trim() !== '')) {
      const preview = typeof value === 'string' ? value.substring(0, 80) : String(value);
      console.log(`   ✓ ${field}: ${preview}${typeof value === 'string' && value.length > 80 ? '...' : ''}`);
    }
  });
  
  console.log('\nCampos vacíos:');
  if (emptyFields.length > 0) {
    emptyFields.forEach(field => {
      console.log(`   ⚠️  ${field}: (vacío)`);
    });
  } else {
    console.log('   ✅ Ninguno');
  }
  
  console.log('\nCampos faltantes:');
  if (missingFields.length > 0) {
    missingFields.forEach(field => {
      console.log(`   ❌ ${field}: (no existe)`);
    });
  } else {
    console.log('   ✅ Ninguno');
  }
  
  // Comparar con CSV
  if (arleneCSV) {
    console.log('\n════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 COMPARACIÓN CON CSV');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    
    const csvFields = [
      'name', 'slug', 'main-category', 'experience-years', 'language', 'availability',
      'summary', 'tagline', 'thumbnail-description', 'video', 'employment-summary'
    ];
    
    csvFields.forEach(field => {
      const csvValue = arleneCSV[field];
      const cmsValue = arlene.fieldData[field];
      
      if (csvValue && (!cmsValue || cmsValue === '')) {
        console.log(`   ⚠️  ${field}:`);
        console.log(`      CSV: ${csvValue.substring(0, 100)}${csvValue.length > 100 ? '...' : ''}`);
        console.log(`      CMS: (vacío)`);
      }
    });
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 RESUMEN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Total campos verificados: ${importantFields.length}`);
  console.log(`Campos con datos: ${importantFields.length - missingFields.length - emptyFields.length}`);
  console.log(`Campos vacíos: ${emptyFields.length}`);
  console.log(`Campos faltantes: ${missingFields.length}`);
  
  if (emptyFields.length > 0 || missingFields.length > 0) {
    console.log('\n💡 Campos que necesitan ser actualizados:');
    [...emptyFields, ...missingFields].forEach(field => {
      console.log(`   - ${field}`);
    });
  }
}

main().catch(console.error);
