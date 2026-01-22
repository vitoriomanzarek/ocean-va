/**
 * Script para comparar el estado actual del CMS de Webflow con el CSV de carga
 * Identifica VAs nuevos y actualizaciones necesarias sin sobrescribir datos existentes
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
const outputFile = path.join(__dirname, '../src/data/carga-vas-nuevos-y-actualizaciones.csv');
const reportFile = path.join(__dirname, '../src/data/comparacion-cms-reporte.txt');

// Inicializar cliente Webflow
const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Función para normalizar nombres para comparación
function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
}

// Función para normalizar slug
function normalizeSlug(slug) {
  if (!slug) return '';
  return slug
    .toLowerCase()
    .trim()
    .replace(/^\//, '')
    .replace(/-ocean-va-profile$/, '');
}

// Función para extraer slug de profile-slug-2
function extractSlugFromUrl(url) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)-ocean-va-profile/);
  return match ? match[1] : '';
}

// Función principal
async function main() {
  console.log('🔍 Comparando CMS actual con CSV de carga...\n');
  
  try {
    // 1. Obtener VAs actuales del CMS
    console.log('📥 Obteniendo VAs actuales del CMS de Webflow...');
    
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];
    
    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }
    
    console.log(`📍 Site: ${site.displayName || site.name}\n`);
    
    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    
    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
    
    // Obtener todos los items (paginación si es necesario)
    console.log('📥 Fetching all VA items from CMS...');
    let allCMSItems = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const response = await client.getCollectionItems(vaCollection.id, { 
        limit, 
        offset 
      });
      
      if (!response.items || response.items.length === 0) {
        break;
      }
      
      allCMSItems = allCMSItems.concat(response.items);
      console.log(`   ✅ Fetched ${allCMSItems.length} items so far...`);
      
      if (response.items.length < limit) {
        break; // No hay más items
      }
      
      offset += limit;
    }
    
    console.log(`\n✅ Total VAs en CMS: ${allCMSItems.length}\n`);
    
    // Crear mapa de VAs en CMS (por slug y por nombre normalizado)
    const cmsBySlug = new Map();
    const cmsByName = new Map();
    
    allCMSItems.forEach(item => {
      const slug = normalizeSlug(item.fieldData.slug || '');
      const name = normalizeName(item.fieldData.name || '');
      const profileSlug = extractSlugFromUrl(item.fieldData['profile-slug-2'] || '');
      
      if (slug) {
        cmsBySlug.set(slug, item);
      }
      if (profileSlug) {
        cmsBySlug.set(profileSlug, item);
      }
      if (name) {
        cmsByName.set(name, item);
      }
    });
    
    // 2. Leer CSV de carga
    console.log('📄 Leyendo CSV de carga...');
    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const csvRecords = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`✅ Total VAs en CSV: ${csvRecords.length}\n`);
    
    // 3. Comparar y categorizar
    console.log('🔍 Comparando VAs...\n');
    
    const nuevos = [];
    const existentes = [];
    const faltantesEnCMS = [];
    
    csvRecords.forEach((csvRecord, index) => {
      const csvName = normalizeName(csvRecord.name || '');
      const csvSlug = normalizeSlug(csvRecord.slug || '');
      
      // Intentar encontrar en CMS por slug primero, luego por nombre
      let foundItem = null;
      
      if (csvSlug) {
        foundItem = cmsBySlug.get(csvSlug);
      }
      
      if (!foundItem && csvName) {
        foundItem = cmsByName.get(csvName);
      }
      
      if (foundItem) {
        // VA existe en CMS
        existentes.push({
          csvIndex: index,
          csvRecord: csvRecord,
          cmsItem: foundItem,
          cmsId: foundItem.id,
          matchMethod: cmsBySlug.get(csvSlug) ? 'slug' : 'name'
        });
      } else {
        // VA nuevo - no existe en CMS
        nuevos.push({
          csvIndex: index,
          csvRecord: csvRecord
        });
      }
      
      if ((index + 1) % 10 === 0) {
        console.log(`   ✅ Comparados ${index + 1}/${csvRecords.length}...`);
      }
    });
    
    // Identificar VAs en CMS que no están en CSV
    csvRecords.forEach(record => {
      const csvSlug = normalizeSlug(record.slug || '');
      const csvName = normalizeName(record.name || '');
      
      // Esto ya lo hicimos arriba, pero podemos verificar si hay VAs en CMS que no están en CSV
    });
    
    // 4. Generar reporte
    console.log('\n═'.repeat(80));
    console.log('\n📊 RESUMEN DE COMPARACIÓN:\n');
    console.log(`  ✅ VAs existentes en CMS: ${existentes.length}`);
    console.log(`  🆕 VAs nuevos (no en CMS): ${nuevos.length}`);
    console.log(`  📋 Total en CSV: ${csvRecords.length}`);
    console.log(`  📦 Total en CMS: ${allCMSItems.length}`);
    
    // 5. Generar CSV solo con VAs nuevos
    if (nuevos.length > 0) {
      console.log('\n📝 Generando CSV con VAs nuevos...');
      
      // Usar las mismas columnas que el CSV original
      const allColumns = Object.keys(csvRecords[0]);
      const nuevosRecords = nuevos.map(n => n.csvRecord);
      
      const output = stringify(nuevosRecords, {
        header: true,
        columns: allColumns,
        quoted: true,
        quoted_empty: false
      });
      
      fs.writeFileSync(outputFile, output, 'utf8');
      console.log(`✅ CSV generado: ${outputFile}`);
      console.log(`   VAs nuevos a cargar: ${nuevos.length}`);
    } else {
      console.log('\n✅ Todos los VAs del CSV ya existen en el CMS');
    }
    
    // 6. Generar reporte detallado
    let report = '═'.repeat(80) + '\n';
    report += 'REPORTE DE COMPARACIÓN: CMS vs CSV\n';
    report += '═'.repeat(80) + '\n\n';
    report += `Fecha: ${new Date().toLocaleString()}\n\n`;
    report += `Total VAs en CMS: ${allCMSItems.length}\n`;
    report += `Total VAs en CSV: ${csvRecords.length}\n\n`;
    report += `─`.repeat(80) + '\n';
    report += 'VAs NUEVOS (No existen en CMS):\n';
    report += `─`.repeat(80) + '\n';
    
    if (nuevos.length === 0) {
      report += '✅ No hay VAs nuevos. Todos ya existen en el CMS.\n\n';
    } else {
      nuevos.forEach((nuevo, index) => {
        const record = nuevo.csvRecord;
        report += `${index + 1}. ${record.name} (slug: ${record.slug})\n`;
      });
      report += `\nTotal VAs nuevos: ${nuevos.length}\n\n`;
    }
    
    report += `─`.repeat(80) + '\n';
    report += 'VAs EXISTENTES (Ya están en CMS):\n';
    report += `─`.repeat(80) + '\n';
    
    if (existentes.length > 0) {
      existentes.slice(0, 20).forEach((exist, index) => {
        const record = exist.csvRecord;
        const cmsItem = exist.cmsItem;
        report += `${index + 1}. ${record.name} (slug: ${record.slug})\n`;
        report += `   CMS ID: ${exist.cmsId}\n`;
        report += `   Match por: ${exist.matchMethod}\n`;
        report += `   Estado en CMS: ${cmsItem.isDraft ? 'Draft' : 'Published'}\n`;
        report += '\n';
      });
      
      if (existentes.length > 20) {
        report += `... y ${existentes.length - 20} más\n\n`;
      }
      
      report += `Total VAs existentes: ${existentes.length}\n\n`;
    }
    
    report += `═`.repeat(80) + '\n';
    report += 'RECOMENDACIONES:\n';
    report += `═`.repeat(80) + '\n';
    report += `1. Solo cargar los ${nuevos.length} VAs nuevos al CMS\n`;
    report += `2. Los ${existentes.length} VAs existentes NO se sobrescribirán\n`;
    report += `3. Si necesitas actualizar un VA existente, hazlo manualmente por ID\n`;
    report += `4. Revisa el CSV generado: ${path.basename(outputFile)}\n`;
    report += `═`.repeat(80) + '\n';
    
    fs.writeFileSync(reportFile, report, 'utf8');
    console.log(`\n✅ Reporte generado: ${reportFile}`);
    
    console.log('\n═'.repeat(80));
    console.log('\n📋 DETALLES:\n');
    
    if (nuevos.length > 0) {
      console.log(`\n🆕 VAs NUEVOS (${nuevos.length}):`);
      nuevos.slice(0, 10).forEach(n => {
        console.log(`   - ${n.csvRecord.name} (${n.csvRecord.slug})`);
      });
      if (nuevos.length > 10) {
        console.log(`   ... y ${nuevos.length - 10} más`);
      }
    }
    
    console.log('\n✅ Análisis completado!\n');
    console.log('═'.repeat(80));
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar
main();
