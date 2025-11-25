import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para corregir la estructura del video en los perfiles de VAs
 * 
 * Errores detectados:
 * 1. Tipo 1: Video container sin wrapper y header "VIDEO"
 * 2. Tipo 2: Divs de cierre extra después del video modal
 */

const webflowComponentsDir = __dirname;

// Obtener el directorio de backup más reciente
const backupDirs = fs.readdirSync(webflowComponentsDir)
  .filter(f => {
    const fullPath = path.join(webflowComponentsDir, f);
    return fs.statSync(fullPath).isDirectory() && f.startsWith('backup-va-profiles-');
  })
  .sort()
  .reverse();

const backupDir = backupDirs.length > 0 
  ? path.join(webflowComponentsDir, backupDirs[0])
  : null;

console.log('🔧 Script de corrección de estructura de video en perfiles VA');
console.log(`📁 Directorio: ${webflowComponentsDir}`);
if (backupDir) {
  console.log(`💾 Backup: ${backupDir}\n`);
} else {
  console.log(`⚠️  No se encontró directorio de backup\n`);
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
let errorsFixed = {
  type1: 0, // Falta wrapper y header
  type2: 0  // Divs extra
};

files.forEach(file => {
  const filePath = path.join(webflowComponentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let fixed = false;
  let fixes = [];

  // ============================================
  // ERROR TIPO 1: Video container sin wrapper y header
  // ============================================
  // Buscar: <!-- Video --> seguido directamente de <div class="va-video-container"
  // Debe ser: <!-- Video -->\n<div>\n<h3>VIDEO</h3>\n<div class="va-video-container"
  const type1Pattern = /(<!-- Video -->)\s*<div class="va-video-container"/;
  if (type1Pattern.test(content)) {
    // Reemplazar agregando el wrapper y header
    content = content.replace(
      /(<!-- Video -->)\s*<div class="va-video-container"/,
      '$1\n          <div>\n            <h3 class="va-column-header">VIDEO</h3>\n            <div class="va-video-container"'
    );
    
    // Ahora necesitamos cerrar el wrapper después del modal o del video container
    // Buscar el patrón donde el modal termina y luego viene Thumbnail Box o cierre de tools-grid
    const needsClosing = content.match(/(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*)(<!-- Thumbnail Box -->)/);
    if (needsClosing && !needsClosing[2].trim().includes('</div>')) {
      // Agregar el cierre del wrapper después del modal
      content = content.replace(
        /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*)(<!-- Thumbnail Box -->)/,
        '$1\n          </div>\n        </div>\n\n        $3'
      );
    } else {
      // Si no hay modal, buscar el cierre del video container
      const videoOnlyPattern = content.match(/(<!-- Video -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*)(<!-- Thumbnail Box -->|<\/div>\s*<\/div>\s*<!-- Thumbnail Box -->)/);
      if (videoOnlyPattern && !videoOnlyPattern[2].includes('</div>')) {
        content = content.replace(
          /(<!-- Video -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)(\s*)(<!-- Thumbnail Box -->|<\/div>\s*<\/div>\s*<!-- Thumbnail Box -->)/,
          '$1\n          </div>\n        $3'
        );
      }
    }
    
    fixed = true;
    errorsFixed.type1++;
    fixes.push('Tipo 1: Agregado wrapper y header "VIDEO"');
  }

  // ============================================
  // ERROR TIPO 2: Divs de cierre extra
  // ============================================
  // Buscar múltiples </div> después del modal antes de Thumbnail Box
  // El patrón correcto debe tener solo un </div> (cierre del wrapper del video) + </div> (cierre del tools-grid)
  
  // Patrón 1: Con modal, múltiples divs extra
  const type2Pattern1 = /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->)/;
  if (type2Pattern1.test(content)) {
    content = content.replace(
      /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->)/,
      '$1\n          </div>\n        </div>\n\n        $2'
    );
    if (!fixed) {
      fixed = true;
    }
    errorsFixed.type2++;
    fixes.push('Tipo 2: Eliminados divs de cierre extra (con modal)');
  }

  // Patrón 2: Con modal, dos divs extra (como en Pavel)
  const type2Pattern2 = /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->)/;
  if (type2Pattern2.test(content) && !type2Pattern1.test(content)) {
    content = content.replace(
      /(<!-- Video Modal -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->)/,
      '$1\n          </div>\n        </div>\n\n        $2'
    );
    if (!fixed) {
      fixed = true;
    }
    errorsFixed.type2++;
    if (!fixes.includes('Tipo 2: Eliminados divs de cierre extra')) {
      fixes.push('Tipo 2: Eliminados divs de cierre extra (2 divs)');
    }
  }

  // Patrón 3: Sin modal, múltiples divs extra
  const type2PatternAlt = /(<!-- Video -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->)/;
  if (type2PatternAlt.test(content) && !type1Pattern.test(content)) {
    content = content.replace(
      /(<!-- Video -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*(<!-- Thumbnail Box -->)/,
      '$1\n          </div>\n        </div>\n\n        $2'
    );
    if (!fixed) {
      fixed = true;
    }
    errorsFixed.type2++;
    if (!fixes.includes('Tipo 2: Eliminados divs de cierre extra')) {
      fixes.push('Tipo 2: Eliminados divs de cierre extra (sin modal)');
    }
  }

  // ============================================
  // CORRECCIÓN ADICIONAL: Estructura del overlay
  // ============================================
  // Asegurar que va-video-text use <div> en lugar de <p>
  if (content.includes('<p class="va-video-text">')) {
    content = content.replace(
      /<p class="va-video-text">(.*?)<\/p>/g,
      '<div class="va-video-text">$1</div>'
    );
    if (!fixed) {
      fixed = true;
    }
    fixes.push('Corregido: va-video-text ahora usa <div>');
  }

  // Asegurar que el overlay tenga el div wrapper interno correcto y la indentación correcta
  const overlayNeedsFix = /<div class="va-video-overlay">\s*<svg class="va-video-play-icon"/;
  if (overlayNeedsFix.test(content)) {
    // Verificar si falta el div wrapper interno o tiene indentación incorrecta
    const overlaySection = content.match(/<div class="va-video-overlay">([\s\S]*?)<\/div>\s*<\/div>/);
    if (overlaySection && !overlaySection[1].trim().startsWith('<div>')) {
      content = content.replace(
        /<div class="va-video-overlay">\s*<svg class="va-video-play-icon"([\s\S]*?)<\/svg>\s*<div class="va-video-text">([\s\S]*?)<\/div>\s*<\/div>/,
        '<div class="va-video-overlay">\n                <div>\n                  <svg class="va-video-play-icon"$1</svg>\n                  <div class="va-video-text">$2</div>\n                </div>\n              </div>'
      );
      if (!fixed) {
        fixed = true;
      }
      fixes.push('Corregido: Estructura del overlay');
    }
  }

  // ============================================
  // CORRECCIÓN: Propiedades CSS para el thumbnail
  // ============================================
  // Agregar propiedades CSS inline al video container para asegurar que la imagen se vea
  content = content.replace(
    /<div class="va-video-container" style="([^"]*)"/g,
    (match, currentStyle) => {
      // Verificar si ya tiene las propiedades necesarias
      const hasBackgroundSize = currentStyle.includes('background-size');
      const hasBackgroundPosition = currentStyle.includes('background-position');
      const hasBackgroundRepeat = currentStyle.includes('background-repeat');
      const hasMinHeight = currentStyle.includes('min-height');
      
      // Si ya tiene todas las propiedades, no hacer cambios
      if (hasBackgroundSize && hasBackgroundPosition && hasBackgroundRepeat && hasMinHeight) {
        return match;
      }
      
      // Construir el nuevo style
      let newStyle = currentStyle.trim();
      
      // Agregar propiedades de background si no están
      if (!hasBackgroundSize || !hasBackgroundPosition || !hasBackgroundRepeat) {
        const bgProps = 'background-size: cover; background-position: center; background-repeat: no-repeat';
        if (newStyle && !newStyle.endsWith(';')) {
          newStyle += '; ';
        } else if (newStyle) {
          newStyle += ' ';
        }
        newStyle += bgProps;
      }
      
      // Agregar min-height si no está
      if (!hasMinHeight) {
        if (newStyle && !newStyle.endsWith(';')) {
          newStyle += '; ';
        } else if (newStyle) {
          newStyle += ' ';
        }
        newStyle += 'min-height: 208px';
      }
      
      if (!fixed) {
        fixed = true;
      }
      if (!fixes.includes('Agregadas propiedades CSS para thumbnail')) {
        fixes.push('Agregadas propiedades CSS para thumbnail');
      }
      
      return `<div class="va-video-container" style="${newStyle}"`;
    }
  );

  // ============================================
  // CORRECCIÓN: Indentación del video container y overlay
  // ============================================
  // Asegurar que el video container y overlay tengan la indentación correcta
  // Solo corregir si la indentación es claramente incorrecta (muy pocos espacios)
  
  // Corregir video container (debe tener 12 espacios)
  content = content.replace(
    /^(\s{0,8})<div class="va-video-container"/gm,
    '            <div class="va-video-container"'
  );
  
  // Corregir overlay (debe tener 14 espacios)
  content = content.replace(
    /^(\s{0,10})<div class="va-video-overlay">/gm,
    '              <div class="va-video-overlay">'
  );
  
  // Corregir el div interno del overlay (debe tener 16 espacios)
  content = content.replace(
    /^(\s{0,12})<div>\s*<svg class="va-video-play-icon"/gm,
    '                <div>\n                  <svg class="va-video-play-icon"'
  );

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
console.log(`   - Tipo 1 (Falta wrapper/header): ${errorsFixed.type1}`);
console.log(`   - Tipo 2 (Divs extra): ${errorsFixed.type2}`);
if (backupDir) {
  console.log(`\n💾 Backup guardado en: ${backupDir}`);
}
console.log('\n✨ ¡Corrección completada!');
