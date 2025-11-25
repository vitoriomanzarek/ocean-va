import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script mejorado para corregir todos los problemas en los perfiles de VAs
 * 
 * Correcciones:
 * 1. Restaurar URLs de imágenes desde el backup
 * 2. Corregir estructura del video (divs extra, cierre correcto)
 * 3. Cambiar maxresdefault.jpg a hqdefault.jpg
 * 4. Agregar propiedades CSS para thumbnails
 * 5. Corregir indentación
 */

const webflowComponentsDir = __dirname;
const backupDir = path.join(webflowComponentsDir, 'backup-va-profiles-20251124-145215');

console.log('🔧 Script mejorado de corrección de perfiles VA');
console.log(`📁 Directorio: ${webflowComponentsDir}`);
console.log(`💾 Backup: ${backupDir}\n`);

// Función para extraer URL de imagen del backup
function getImageUrlFromBackup(fileName) {
  const backupFile = path.join(backupDir, fileName);
  if (!fs.existsSync(backupFile)) {
    return null;
  }
  
  const content = fs.readFileSync(backupFile, 'utf8');
  const imgMatch = content.match(/<img src="([^"]+)" alt="[^"]*" loading="lazy">/);
  if (imgMatch && imgMatch[1] && !imgMatch[1].includes('PLACEHOLDER')) {
    return imgMatch[1];
  }
  return null;
}

// Obtener todos los archivos del 211 al 275 (excluyendo -correct.html)
const files = fs.readdirSync(webflowComponentsDir)
  .filter(file => {
    const match = file.match(/^(21[1-9]|2[2-7][0-9])-.*\.html$/);
    return match && !file.includes('-correct.html') && fs.statSync(path.join(webflowComponentsDir, file)).isFile();
  })
  .sort();

console.log(`📋 Encontrados ${files.length} archivos para procesar\n`);

let fixedCount = 0;
let fixesApplied = {
  imageRestored: 0,
  videoStructure: 0,
  thumbnailUrl: 0,
  cssProperties: 0,
  divsExtra: 0
};

files.forEach(file => {
  const filePath = path.join(webflowComponentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let fixed = false;
  const fixes = [];

  // ============================================
  // CORRECCIÓN 1: Restaurar URL de imagen desde backup
  // ============================================
  const currentImgMatch = content.match(/<img src="([^"]+)" alt="([^"]*)" loading="lazy">/);
  if (currentImgMatch) {
    const currentUrl = currentImgMatch[1];
    const altText = currentImgMatch[2];
    
    // Si es un placeholder, intentar restaurar desde backup
    if (currentUrl.includes('PLACEHOLDER')) {
      const backupUrl = getImageUrlFromBackup(file);
      if (backupUrl) {
        content = content.replace(
          /<img src="[^"]+" alt="[^"]*" loading="lazy">/,
          `<img src="${backupUrl}" alt="${altText}" loading="lazy">`
        );
        fixed = true;
        fixesApplied.imageRestored++;
        fixes.push('URL de imagen restaurada desde backup');
      }
    }
  }

  // ============================================
  // CORRECCIÓN 2: Cambiar maxresdefault.jpg a hqdefault.jpg
  // ============================================
  if (content.includes('maxresdefault.jpg')) {
    content = content.replace(/maxresdefault\.jpg/g, 'hqdefault.jpg');
    fixed = true;
    fixesApplied.thumbnailUrl++;
    fixes.push('Thumbnail cambiado a hqdefault.jpg');
  }

  // ============================================
  // CORRECCIÓN 3: Estructura del video - Divs extra
  // ============================================
  // Buscar y corregir divs extra después del modal
  // Patrón correcto: </div> (modal) </div> (modal wrapper) </div> (video wrapper) </div> (tools-grid)
  
  // Patrón 1: Con modal, múltiples divs extra (3+ divs extra)
  const extraDivsPattern1 = /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->|<\/div>\s*<!-- Thumbnail Box -->)/;
  if (extraDivsPattern1.test(content)) {
    content = content.replace(
      extraDivsPattern1,
      '$1\n          </div>\n        </div>\n\n        $2'
    );
    fixed = true;
    fixesApplied.divsExtra++;
    fixes.push('Eliminados divs extra (3+)');
  }

  // Patrón 2: Con modal, dos divs extra
  const extraDivsPattern2 = /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->|<\/div>\s*<!-- Thumbnail Box -->)/;
  if (extraDivsPattern2.test(content) && !extraDivsPattern1.test(content)) {
    content = content.replace(
      extraDivsPattern2,
      '$1\n          </div>\n        </div>\n\n        $2'
    );
    fixed = true;
    fixesApplied.divsExtra++;
    if (!fixes.includes('Eliminados divs extra')) {
      fixes.push('Eliminados divs extra (2)');
    }
  }

  // Patrón 3: Sin modal, múltiples divs extra
  const extraDivsPattern3 = /(<!-- Video -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->|<\/div>\s*<!-- Thumbnail Box -->)/;
  if (extraDivsPattern3.test(content)) {
    content = content.replace(
      extraDivsPattern3,
      '$1\n          </div>\n        </div>\n\n        $2'
    );
    fixed = true;
    fixesApplied.divsExtra++;
    if (!fixes.includes('Eliminados divs extra')) {
      fixes.push('Eliminados divs extra (sin modal)');
    }
  }

  // ============================================
  // CORRECCIÓN 4: Estructura del video container
  // ============================================
  // Asegurar que el video container esté correctamente cerrado antes del modal
  // Buscar: video container sin cerrar antes del modal
  const videoContainerPattern = /<div class="va-video-container"([^>]*)>([\s\S]*?<div class="va-video-overlay">[\s\S]*?<\/div>\s*<\/div>)\s*(<!-- Video Modal -->)/;
  if (videoContainerPattern.test(content)) {
    // Verificar si falta el cierre del video container
    const match = content.match(videoContainerPattern);
    if (match && !match[2].includes('</div>') || match[2].split('</div>').length < 3) {
      content = content.replace(
        /(<div class="va-video-container"[^>]*>[\s\S]*?<div class="va-video-overlay">[\s\S]*?<\/div>)\s*(<\/div>)\s*(<!-- Video Modal -->)/,
        '$1\n            </div>\n\n            $3'
      );
      fixed = true;
      fixesApplied.videoStructure++;
      fixes.push('Estructura del video container corregida');
    }
  }

  // ============================================
  // CORRECCIÓN 5: Agregar propiedades CSS para thumbnail
  // ============================================
  // Asegurar que el video container tenga todas las propiedades CSS necesarias
  content = content.replace(
    /<div class="va-video-container" style="([^"]*)"/g,
    (match, currentStyle) => {
      // Verificar si ya tiene las propiedades necesarias
      const hasBackgroundSize = currentStyle.includes('background-size');
      const hasBackgroundPosition = currentStyle.includes('background-position');
      const hasBackgroundRepeat = currentStyle.includes('background-repeat');
      const hasMinHeight = currentStyle.includes('min-height');
      const hasCursor = currentStyle.includes('cursor');
      
      // Si ya tiene todas las propiedades, no hacer cambios
      if (hasBackgroundSize && hasBackgroundPosition && hasBackgroundRepeat && hasMinHeight && hasCursor) {
        return match;
      }
      
      // Construir el nuevo style
      let newStyle = currentStyle.trim();
      
      // Agregar propiedades si no están
      const propsToAdd = [];
      if (!hasBackgroundSize) propsToAdd.push('background-size: cover');
      if (!hasBackgroundPosition) propsToAdd.push('background-position: center');
      if (!hasBackgroundRepeat) propsToAdd.push('background-repeat: no-repeat');
      if (!hasMinHeight) propsToAdd.push('min-height: 208px');
      if (!hasCursor) propsToAdd.push('cursor: pointer');
      
      if (propsToAdd.length > 0) {
        if (newStyle && !newStyle.endsWith(';')) {
          newStyle += '; ';
        } else if (newStyle) {
          newStyle += ' ';
        }
        newStyle += propsToAdd.join('; ');
        
        if (!fixed) {
          fixed = true;
        }
        fixesApplied.cssProperties++;
        if (!fixes.includes('Propiedades CSS agregadas')) {
          fixes.push('Propiedades CSS agregadas para thumbnail');
        }
      }
      
      return `<div class="va-video-container" style="${newStyle}"`;
    }
  );

  // ============================================
  // CORRECCIÓN 6: Indentación del video container y overlay
  // ============================================
  // Corregir indentación para que sea consistente
  // Video container debe tener 12 espacios
  content = content.replace(
    /^(\s{0,10})<div class="va-video-container"/gm,
    '            <div class="va-video-container"'
  );
  
  // Overlay debe tener 14 espacios
  content = content.replace(
    /^(\s{0,12})<div class="va-video-overlay">/gm,
    '              <div class="va-video-overlay">'
  );
  
  // Div interno del overlay debe tener 16 espacios
  content = content.replace(
    /^(\s{0,14})<div>\s*<svg class="va-video-play-icon"/gm,
    '                <div>\n                  <svg class="va-video-play-icon"'
  );

  // ============================================
  // CORRECCIÓN 7: Asegurar que va-video-text use <div>
  // ============================================
  if (content.includes('<p class="va-video-text">')) {
    content = content.replace(
      /<p class="va-video-text">(.*?)<\/p>/g,
      '<div class="va-video-text">$1</div>'
    );
    if (!fixed) {
      fixed = true;
    }
    fixes.push('va-video-text ahora usa <div>');
  }

  // Guardar solo si hubo cambios
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ ${file}:`);
    fixes.forEach(fix => console.log(`   - ${fix}`));
  } else {
    console.log(`⏭️  ${file}: Sin cambios necesarios`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE CORRECCIONES');
console.log('='.repeat(60));
console.log(`✅ Archivos corregidos: ${fixedCount} de ${files.length}`);
console.log(`   - URLs de imagen restauradas: ${fixesApplied.imageRestored}`);
console.log(`   - Estructura de video corregida: ${fixesApplied.videoStructure}`);
console.log(`   - Thumbnails cambiados a hqdefault.jpg: ${fixesApplied.thumbnailUrl}`);
console.log(`   - Propiedades CSS agregadas: ${fixesApplied.cssProperties}`);
console.log(`   - Divs extra eliminados: ${fixesApplied.divsExtra}`);
console.log(`\n💾 Backup disponible en: ${backupDir}`);
console.log('\n✨ ¡Corrección completada!');

