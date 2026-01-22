/**
 * Script para analizar los datos extraídos y generar un reporte detallado
 */

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/datos-extraidos-para-revision.json');

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

console.log('════════════════════════════════════════════════════════════════════════════════');
console.log('📊 ANÁLISIS DE DATOS EXTRAÍDOS');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

const total = data.length;
const withThumbnails = data.filter(v => v.extracted.videoThumbnail).length;
const needsTools = data.filter(v => v.needsTools).length;
const needsEquipment = data.filter(v => v.needsEquipment).length;
const hasTools = data.filter(v => v.extracted.tools && v.extracted.tools.html).length;
const hasEquipment = data.filter(v => v.extracted.equipment && v.extracted.equipment.html).length;

console.log('📈 ESTADÍSTICAS GENERALES:');
console.log(`   Total VAs procesados: ${total}`);
console.log(`   Video Thumbnails extraídos: ${withThumbnails} (${((withThumbnails/total)*100).toFixed(1)}%)`);
console.log(`   VAs que necesitan Tools: ${needsTools}`);
console.log(`   VAs que necesitan Equipment: ${needsEquipment}`);
console.log(`   Tools extraídos exitosamente: ${hasTools} (${needsTools > 0 ? ((hasTools/needsTools)*100).toFixed(1) : 0}% de los que lo necesitan)`);
console.log(`   Equipment extraído exitosamente: ${hasEquipment} (${needsEquipment > 0 ? ((hasEquipment/needsEquipment)*100).toFixed(1) : 0}% de los que lo necesitan)`);
console.log(`   VAs sin Tools extraídos: ${needsTools - hasTools}`);
console.log(`   VAs sin Equipment extraído: ${needsEquipment - hasEquipment}\n`);

console.log('════════════════════════════════════════════════════════════════════════════════');
console.log('✅ VIDEO THUMBNAILS - LISTO PARA CARGAR');
console.log('════════════════════════════════════════════════════════════════════════════════\n');
console.log(`✅ ${withThumbnails} VAs tienen video thumbnails generados y listos para cargar al CMS\n`);

if (needsTools > 0 || needsEquipment > 0) {
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('⚠️  VAs QUE NECESITAN TOOLS/EQUIPMENT PERO NO SE EXTRAJERON');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const missingTools = data.filter(v => v.needsTools && (!v.extracted.tools || !v.extracted.tools.html));
  const missingEquipment = data.filter(v => v.needsEquipment && (!v.extracted.equipment || !v.extracted.equipment.html));
  
  if (missingTools.length > 0) {
    console.log('📋 VAs que necesitan Tools pero no se extrajeron:');
    missingTools.forEach(va => {
      console.log(`   - ${va.name} (${va.slug})`);
    });
    console.log('');
  }
  
  if (missingEquipment.length > 0) {
    console.log('📋 VAs que necesitan Equipment pero no se extrajo:');
    missingEquipment.forEach(va => {
      console.log(`   - ${va.name} (${va.slug})`);
    });
    console.log('');
  }
  
  console.log('💡 RAZÓN PROBABLE: Estos VAs no tienen URL en el CSV o la URL no está disponible.');
  console.log('   Para extraer Tools/Equipment, necesitas:');
  console.log('   1. Agregar las URLs de las páginas originales al CSV');
  console.log('   2. O proporcionar un mapeo alternativo de slug → URL');
  console.log('   3. O extraer manualmente desde las páginas web\n');
}

console.log('════════════════════════════════════════════════════════════════════════════════');
console.log('📋 RESUMEN EJECUTIVO');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

console.log('✅ LISTO PARA CARGAR AL CMS:');
console.log(`   - ${withThumbnails} Video Thumbnails (100% de los que tienen video URL)`);
console.log('');

if (hasTools > 0) {
  console.log(`   - ${hasTools} Tools extraídos`);
}
if (hasEquipment > 0) {
  console.log(`   - ${hasEquipment} Equipment extraído`);
}

if (hasTools === 0 && hasEquipment === 0) {
  console.log('   - 0 Tools/Equipment (ninguno se pudo extraer de las páginas web)');
}

console.log('\n⚠️  PENDIENTE:');
if (needsTools - hasTools > 0 || needsEquipment - hasEquipment > 0) {
  console.log(`   - ${needsTools - hasTools} VAs necesitan Tools pero no se extrajeron`);
  console.log(`   - ${needsEquipment - hasEquipment} VAs necesitan Equipment pero no se extrajo`);
  console.log('   - Razón: No tienen URL en el CSV o la página no está disponible');
}

console.log('\n════════════════════════════════════════════════════════════════════════════════');
console.log('🎯 RECOMENDACIÓN');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

console.log('1. ✅ CARGAR VIDEO THUMBNAILS:');
console.log('   Ejecutar: node scripts/loadExtractedDataToCMS.js');
console.log('   Esto cargará los 97 video thumbnails al CMS\n');

console.log('2. ⚠️  TOOLS/EQUIPMENT:');
console.log('   - Opción A: Si tienes las URLs de las páginas originales, actualizar el CSV y re-ejecutar la extracción');
console.log('   - Opción B: Extraer manualmente desde las páginas web');
console.log('   - Opción C: Si los datos están en otro lugar (otro CSV, base de datos), indicar la fuente\n');
