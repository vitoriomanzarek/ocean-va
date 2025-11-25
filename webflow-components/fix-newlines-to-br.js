import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para reemplazar \n literales por <br> en los perfiles de VAs
 * 
 * Busca y reemplaza secuencias \n que aparecen como texto literal
 * dentro del contenido HTML (especialmente en descripciones)
 */

const webflowComponentsDir = __dirname;

console.log('🔧 Script de corrección de saltos de línea \\n a <br>');
console.log(`📁 Directorio: ${webflowComponentsDir}\n`);

// Obtener todos los archivos del 211 al 275
const files = fs.readdirSync(webflowComponentsDir)
  .filter(file => {
    const match = file.match(/^(21[1-9]|2[2-7][0-9])-.*\.html$/);
    return match && !file.includes('-correct.html') && fs.statSync(path.join(webflowComponentsDir, file)).isFile();
  })
  .sort();

console.log(`📋 Encontrados ${files.length} archivos para procesar\n`);

let fixedCount = 0;
let totalReplacements = 0;

files.forEach(file => {
  const filePath = path.join(webflowComponentsDir, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let replacements = 0;
    
    // Buscar y reemplazar \n literales
    // Patrón: busca \n que no estén dentro de atributos de estilo o URLs
    // Reemplazamos \n por <br> pero solo cuando aparecen como texto literal
    
    // Contar cuántos \n hay antes del reemplazo
    const beforeCount = (content.match(/\\n/g) || []).length;
    
    if (beforeCount > 0) {
      // Reemplazar \n por <br>
      // Usamos una expresión regular que busca \n literal (no saltos de línea reales)
      content = content.replace(/\\n/g, '<br>');
      
      replacements = beforeCount;
      totalReplacements += replacements;
      
      // Guardar solo si hubo cambios
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
        console.log(`✅ ${file}: ${replacements} reemplazos realizados`);
      }
    }
  } catch (error) {
    console.error(`❌ Error procesando ${file}:`, error.message);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN');
console.log('='.repeat(60));
console.log(`📁 Archivos procesados: ${files.length}`);
console.log(`✅ Archivos corregidos: ${fixedCount}`);
console.log(`🔄 Total de reemplazos: ${totalReplacements}`);
console.log('\n✨ Proceso completado!');

