/**
 * Script para actualizar campos vacíos en el CMS con datos del CSV (VERSIÓN CORREGIDA)
 * Solo actualiza campos que están vacíos en CMS pero tienen datos en CSV
 * NO sobrescribe datos existentes
 * CORRIGE automáticamente valores de DISC Type no permitidos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const csvFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');
const reportFile = path.join(__dirname, '../src/data/actualizacion-campos-vacios-fixed.log');

// Mapeo de campos del CSV a campos de Webflow
const CSV_TO_WEBFLOW = {
  'title': 'title-2',
  'summary': 'summary',
  'tagline': 'tagline',
  'thumbnail-description': 'thumbnail-description',
  'skills-richtext': 'skills-richtext',
  'tools-richtext': 'tools-richtext',
  'equipment-richtext': 'equipment-richtext',
  'employment-summary': 'employment-summary',
  'employment-richtext': 'employment-richtext',
  'education-richtext': 'education-richtext',
  'disc-type': 'disc-type-2',
  'disc-description': 'disc-description',
  'english-test-type': 'type-of-english-test',
  'english-score': 'english-score-3',
  'english-description': 'english-description',
  'cerf-result': 'cerf-result',
  'englishCefrHtml': 'cerf-result', // También puede venir como englishCefrHtml
  'video': 'video',
  'video-thumbnail': 'video-thumbnail-2',
  'skills-tags': 'skills-tags',
  'tools-tags': 'tools-tags',
  'equipment-tags': 'equipment-tags',
  'experience-years': 'experience-years',
  'availability': 'availability',
  'language': 'languages'
};

// Mapeo de valores de DISC Type incorrectos a correctos
// Webflow requiere valores específicos. Si no está en la lista, se omite el campo
const DISC_TYPE_FIXES = {
  'I+D': 'D+I',
  'C+S': 'S+C',
  // Los siguientes no están permitidos en Webflow, se omitirán:
  // 'D+C': 'C+D',  // No permitido
  // 'I+S': 'S+I',  // No permitido
  // 'S+D': 'D+S',  // Puede que no esté permitido
  // 'I+C': 'C+I'   // Puede que no esté permitido
};

// Valores permitidos en Webflow (verificar manualmente si hay dudas)
// NOTA: D+C, I+S, y C+D NO están permitidos según los errores de validación
const ALLOWED_DISC_TYPES = [
  'D', 'I', 'S', 'C',
  'D+I', 'D+S',
  // 'D+C', // NO permitido en Webflow
  'I+D', 
  // 'I+S', // NO permitido en Webflow
  'I+C',
  'S+D', 'S+I', 'S+C',
  // 'C+D', // NO permitido en Webflow
  'C+I', 'C+S'
];

// Inicializar cliente Webflow
const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

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
    return trimmed === '' || trimmed === 'null' || trimmed === 'undefined' || trimmed === '[]';
  }
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

// Función para limpiar valores del CSV
function cleanCSVValue(value) {
  if (!value) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined' || trimmed === '[]') {
      return null;
    }
    return trimmed;
  }
  return value;
}

// Función para corregir valores de DISC Type
// Si el valor no está permitido, retorna null para omitir el campo
function fixDiscType(discType) {
  if (!discType) return null;
  const trimmed = String(discType).trim();
  
  // Si tiene una corrección directa, usarla
  if (DISC_TYPE_FIXES[trimmed]) {
    return DISC_TYPE_FIXES[trimmed];
  }
  
  // Si el valor está en la lista de permitidos, usarlo
  if (ALLOWED_DISC_TYPES.includes(trimmed)) {
    return trimmed;
  }
  
  // Si no está permitido y no tiene corrección, omitir
  console.warn(`   ⚠️  DISC Type "${trimmed}" no está permitido, se omitirá`);
  return null;
}

// Función principal
async function main() {
  // Verificar si se debe ejecutar en modo dry-run
  const dryRun = process.argv.includes('--dry-run') || process.argv.includes('-d');
  
  console.log('🔄 Actualizando campos vacíos en CMS con datos del CSV (VERSIÓN CORREGIDA)...\n');
  if (dryRun) {
    console.log('⚠️  MODO DRY-RUN: No se harán cambios reales, solo simulación\n');
  } else {
    console.log('⚠️  MODO REAL: Se actualizarán los campos en Webflow\n');
  }
  
  const log = [];
  log.push('═'.repeat(80));
  log.push('ACTUALIZACIÓN DE CAMPOS VACÍOS (VERSIÓN CORREGIDA)');
  log.push('═'.repeat(80));
  log.push(`Fecha: ${new Date().toLocaleString()}`);
  log.push(`Modo: ${dryRun ? 'DRY-RUN (simulación)' : 'REAL (actualización)'}`);
  log.push('');
  
  try {
    // 1. Obtener VAs del CMS
    console.log('📥 Obteniendo VAs del CMS de Webflow...');
    log.push('📥 Obteniendo VAs del CMS de Webflow...');
    
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
    log.push(`✅ Total VAs en CMS: ${allCMSItems.length}`);
    log.push('');
    
    // 2. Leer CSV
    console.log('📄 Leyendo CSV...');
    log.push('📄 Leyendo CSV...');
    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const csvRecords = parse(csvContent, { columns: true, skip_empty_lines: true });
    console.log(`✅ Total VAs en CSV: ${csvRecords.length}\n`);
    log.push(`✅ Total VAs en CSV: ${csvRecords.length}`);
    log.push('');
    
    // 3. Crear mapa de CSV por slug/nombre
    const csvMap = new Map();
    csvRecords.forEach(record => {
      const slug = normalizeSlug(record.slug || '');
      const name = normalizeName(record.name || '');
      if (slug) csvMap.set(slug, record);
      if (name) csvMap.set(name, record);
    });
    
    // 4. Procesar todos los VAs (actualizar campos vacíos)
    console.log('🔍 Procesando todos los VAs con campos vacíos...');
    log.push('🔍 Procesando todos los VAs con campos vacíos...');
    
    // Procesar todos los VAs, no solo los que fallaron
    const failedVAs = allCMSItems;
    
    console.log(`✅ Identificados ${failedVAs.length} VAs con errores previos\n`);
    log.push(`✅ Identificados ${failedVAs.length} VAs con errores previos`);
    log.push('');
    
    // 5. Procesar actualizaciones
    console.log('🔄 Procesando actualizaciones...\n');
    log.push('🔄 Procesando actualizaciones...');
    log.push('');
    
    let totalUpdated = 0;
    let totalFieldsUpdated = 0;
    let totalErrors = 0;
    
    const updates = [];
    
    for (let i = 0; i < failedVAs.length; i++) {
      const cmsItem = failedVAs[i];
      const cmsData = cmsItem.fieldData;
      const slug = normalizeSlug(cmsData.slug || '');
      const name = normalizeName(cmsData.name || '');
      const vaName = cmsData.name || 'Unnamed';
      
      // Buscar en CSV
      const csvRecord = csvMap.get(slug) || csvMap.get(name);
      
      if (!csvRecord) {
        console.log(`⚠️  ${vaName} (${slug}): No encontrado en CSV`);
        log.push(`⚠️  ${vaName} (${slug}): No encontrado en CSV`);
        continue;
      }
      
      // Identificar campos a actualizar
      const fieldsToUpdate = {};
      const fieldsList = [];
      const correctedFields = [];
      
      Object.keys(CSV_TO_WEBFLOW).forEach(csvField => {
        const webflowField = CSV_TO_WEBFLOW[csvField];
        
        // Verificar si el campo está vacío en CMS
        const cmsValue = cmsData[webflowField];
        const isEmptyInCMS = isEmpty(cmsValue);
        
        if (isEmptyInCMS) {
          // Verificar si CSV tiene datos
          let csvValue = cleanCSVValue(csvRecord[csvField]);
          
          // Manejar DISC Type por separado (omitir si no está permitido)
          if (webflowField === 'disc-type-2' && csvValue) {
            const originalValue = csvValue;
            csvValue = fixDiscType(csvValue);
            // Solo agregar al update si el valor está permitido
            if (csvValue !== null && !isEmpty(csvValue)) {
              if (originalValue !== csvValue) {
                correctedFields.push(`DISC Type: ${originalValue} → ${csvValue}`);
              }
              fieldsToUpdate[webflowField] = csvValue;
              fieldsList.push(webflowField);
            }
            // Si csvValue es null, simplemente no agregamos este campo y continuamos con el siguiente
            return; // Salir de esta iteración del forEach, continuar con siguiente campo
          } else {
            // Para todos los demás campos
            // También verificar englishCefrHtml si es cerf-result
            if (webflowField === 'cerf-result' && !csvValue) {
              const cefrHtml = cleanCSVValue(csvRecord['englishCefrHtml']);
              if (cefrHtml && !isEmpty(cefrHtml)) {
                csvValue = cefrHtml;
              }
            }
            
            if (csvValue && !isEmpty(csvValue)) {
              fieldsToUpdate[webflowField] = csvValue;
              fieldsList.push(webflowField);
            }
          }
        }
      });
      
      if (Object.keys(fieldsToUpdate).length > 0) {
        updates.push({
          cmsId: cmsItem.id,
          name: vaName,
          slug: slug,
          fields: fieldsToUpdate,
          fieldsList: fieldsList,
          correctedFields: correctedFields,
          isDraft: cmsItem.isDraft
        });
      }
    }
    
    console.log(`✅ Procesados ${failedVAs.length} VAs\n`);
    console.log(`📊 VAs a actualizar: ${updates.length}\n`);
    log.push(`✅ Procesados ${failedVAs.length} VAs`);
    log.push(`📊 VAs a actualizar: ${updates.length}`);
    log.push('');
    
    // 6. Ejecutar actualizaciones
    if (updates.length === 0) {
      console.log('✅ No hay campos vacíos que actualizar.\n');
      log.push('✅ No hay campos vacíos que actualizar.');
    } else {
      console.log('🔄 Ejecutando actualizaciones...\n');
      log.push('🔄 Ejecutando actualizaciones...');
      log.push('');
      
      for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        
        console.log(`\n[${i + 1}/${updates.length}] ${update.name} (${update.slug})`);
        console.log(`   Campos a actualizar: ${update.fieldsList.length}`);
        console.log(`   Campos: ${update.fieldsList.join(', ')}`);
        
        if (update.correctedFields.length > 0) {
          console.log(`   ✅ Correcciones aplicadas:`);
          update.correctedFields.forEach(correction => {
            console.log(`      - ${correction}`);
          });
        }
        
        log.push(`─`.repeat(80));
        log.push(`[${i + 1}/${updates.length}] ${update.name} (${update.slug})`);
        log.push(`   CMS ID: ${update.cmsId}`);
        log.push(`   Estado: ${update.isDraft ? 'Draft' : 'Published'}`);
        log.push(`   Campos a actualizar: ${update.fieldsList.length}`);
        log.push(`   Campos: ${update.fieldsList.join(', ')}`);
        
        if (update.correctedFields.length > 0) {
          log.push(`   ✅ Correcciones aplicadas:`);
          update.correctedFields.forEach(correction => {
            log.push(`      - ${correction}`);
          });
        }
        
        if (!dryRun) {
          try {
            await client.updateCollectionItem(
              vaCollection.id,
              update.cmsId,
              update.fields,
              { isDraft: false }
            );
            
            console.log(`   ✅ Actualizado exitosamente`);
            log.push(`   ✅ Actualizado exitosamente`);
            totalUpdated++;
            totalFieldsUpdated += update.fieldsList.length;
            
            // Pequeña pausa para evitar rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
            
          } catch (error) {
            console.error(`   ❌ Error al actualizar: ${error.message}`);
            log.push(`   ❌ Error al actualizar: ${error.message}`);
            if (error.response) {
              log.push(`   Detalles: ${JSON.stringify(error.response)}`);
              console.error(`   Detalles: ${JSON.stringify(error.response.details || error.response)}`);
            }
            totalErrors++;
          }
        } else {
          console.log(`   🔍 DRY-RUN: Se actualizarían ${update.fieldsList.length} campos`);
          log.push(`   🔍 DRY-RUN: Se actualizarían ${update.fieldsList.length} campos`);
          totalUpdated++;
          totalFieldsUpdated += update.fieldsList.length;
        }
      }
    }
    
    // 7. Resumen final
    console.log('\n═'.repeat(80));
    console.log('\n📊 RESUMEN FINAL:\n');
    console.log(`   VAs actualizados: ${totalUpdated}`);
    console.log(`   Campos actualizados: ${totalFieldsUpdated}`);
    console.log(`   Errores: ${totalErrors}`);
    if (dryRun) {
      console.log(`\n   ⚠️  MODO DRY-RUN: No se hicieron cambios reales`);
      console.log(`   Ejecuta sin --dry-run para hacer las actualizaciones reales`);
    }
    console.log('\n✅ Proceso completado!\n');
    console.log('═'.repeat(80));
    
    log.push('');
    log.push('═'.repeat(80));
    log.push('RESUMEN FINAL:');
    log.push('═'.repeat(80));
    log.push(`VAs actualizados: ${totalUpdated}`);
    log.push(`Campos actualizados: ${totalFieldsUpdated}`);
    log.push(`Errores: ${totalErrors}`);
    if (dryRun) {
      log.push(`Modo: DRY-RUN (no se hicieron cambios reales)`);
    }
    log.push('═'.repeat(80));
    
    // Guardar log
    fs.writeFileSync(reportFile, log.join('\n'), 'utf8');
    console.log(`\n📝 Log guardado en: ${reportFile}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
    log.push('');
    log.push('═'.repeat(80));
    log.push('ERROR:');
    log.push('═'.repeat(80));
    log.push(error.message);
    log.push(error.stack);
    fs.writeFileSync(reportFile, log.join('\n'), 'utf8');
    process.exit(1);
  }
}

// Ejecutar
main();
