import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para corregir la estructura del video y agregar el modal
 * Basado en la estructura correcta de Kathleen
 * 
 * Cambios aplicados:
 * 1. Agregar wrapper <div> con header <h3>VIDEO</h3>
 * 2. Agregar onclick al video container
 * 3. Cambiar maxresdefault.jpg a hqdefault.jpg
 * 4. Agregar propiedades CSS completas
 * 5. Agregar <div> interno wrapper en overlay
 * 6. Cambiar <p> a <div> para va-video-text
 * 7. Agregar modal completo con ID correcto
 */

const webflowComponentsDir = __dirname;

console.log('🔧 Script de corrección de estructura de video con modal');
console.log(`📁 Directorio: ${webflowComponentsDir}\n`);

// Función para extraer el ID del video de YouTube de la URL
function extractVideoId(url) {
  const match = url.match(/\/vi\/([^\/]+)\//);
  return match ? match[1] : null;
}

// Función para corregir la estructura del video
function fixVideoStructure(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Extraer el ID del video de la URL existente
    // Busca tanto maxresdefault.jpg como hqdefault.jpg
    const videoIdMatch = content.match(/background-image:\s*url\('https:\/\/img\.youtube\.com\/vi\/([^\/]+)\//);
    if (!videoIdMatch) {
      // Si no encuentra URL válida, verificar si tiene URL vacía (sin video)
      if (content.includes("background-image: url('')")) {
        console.log(`⏭️  ${path.basename(filePath)}: Sin video (URL vacía) - Saltando`);
      } else {
        console.log(`⚠️  ${path.basename(filePath)}: No se encontró ID de video válido`);
      }
      return false;
    }
    
    const videoId = videoIdMatch[1];
    console.log(`📹 ${path.basename(filePath)}: Video ID encontrado: ${videoId}`);
    
    // Patrón para detectar la estructura actual del video
    // Busca desde <!-- Video --> hasta el cierre del video container
    const videoPattern = /(<!-- Video -->)\s*(<div class="va-video-container"[^>]*>[\s\S]*?<\/div>\s*<\/div>)/;
    
    if (!videoPattern.test(content)) {
      console.log(`⚠️  ${path.basename(filePath)}: No se encontró la estructura del video esperada`);
      return false;
    }
    
    // Verificar si ya tiene el modal (estructura correcta)
    if (content.includes(`va-video-modal-${videoId}`)) {
      console.log(`⏭️  ${path.basename(filePath)}: Ya tiene el modal configurado`);
      return false;
    }
    
    // Verificar si ya tiene el wrapper con header VIDEO pero falta el modal
    const hasVideoHeader = content.includes('<h3 class="va-column-header">VIDEO</h3>');
    const hasModal = content.includes('va-video-modal-');
    
    if (hasVideoHeader && hasModal) {
      console.log(`⏭️  ${path.basename(filePath)}: Estructura ya está completa`);
      return false;
    }
    
    // Construir la nueva estructura
    const newVideoStructure = `<!-- Video -->
          <div>
            <h3 class="va-column-header">VIDEO</h3>
            <div class="va-video-container" style="background-image: url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; min-height: 208px; cursor: pointer;" onclick="document.getElementById('va-video-modal-${videoId}').style.display='flex'">
              <div class="va-video-overlay">
                <div>
                  <svg class="va-video-play-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                  <div class="va-video-text">CLICK HERE</div>
                </div>
              </div>
            </div>

            <!-- Video Modal -->
            <div id="va-video-modal-${videoId}" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); z-index: 9999; align-items: center; justify-content: center;">
              <div style="position: relative; width: 90%; max-width: 900px; aspect-ratio: 16/9;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <button onclick="document.getElementById('va-video-modal-${videoId}').style.display='none'" style="position: absolute; top: -50px; right: 0; background: transparent; border: none; font-size: 40px; cursor: pointer; color: white; padding: 0; line-height: 1; font-weight: bold;">×</button>
              </div>
            </div>
          </div>`;
    
    // Reemplazar la estructura antigua
    // Buscar diferentes variaciones de la estructura actual
    let replaced = false;
    
    // Patrón 1: Video sin wrapper, sin modal (estructura más común)
    // Busca desde <!-- Video --> hasta el cierre del video container, pero NO incluye el cierre del tools-grid
    const pattern1 = /(<!-- Video -->)\s*<div class="va-video-container"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*(?=\n\s*<!-- Thumbnail Box -->|\n\s*<\/div>\s*\n\s*<!-- Thumbnail Box -->)/;
    
    if (pattern1.test(content)) {
      content = content.replace(pattern1, newVideoStructure);
      replaced = true;
    } else {
      // Patrón 2: Video con wrapper pero sin modal
      const pattern2 = /(<!-- Video -->)\s*<div>\s*<h3 class="va-column-header">VIDEO<\/h3>\s*<div class="va-video-container"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*(?=\n\s*<!-- Thumbnail Box -->|\n\s*<\/div>\s*\n\s*<!-- Thumbnail Box -->)/;
      
      if (pattern2.test(content)) {
        // Ya tiene el wrapper, solo necesitamos reemplazar todo y agregar el modal
        content = content.replace(pattern2, newVideoStructure);
        replaced = true;
      }
    }
    
    // Limpiar cualquier div extra que pueda haberse generado
    // Buscar patrones como </div></div> seguidos de Thumbnail Box y separarlos
    content = content.replace(/(<\/div>)\s*(<\/div>)\s*(?=\n\s*<!-- Thumbnail Box -->)/g, '$1\n        $2');
    
    if (!replaced) {
      console.log(`⚠️  ${path.basename(filePath)}: No se pudo encontrar un patrón compatible`);
      return false;
    }
    
    // Guardar el archivo
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${path.basename(filePath)}: Estructura corregida exitosamente`);
      return true;
    } else {
      console.log(`⏭️  ${path.basename(filePath)}: Sin cambios necesarios`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error procesando ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

// Procesar todos los archivos del 222 al 275 (excluyendo 262-Patricia y 268-Anahi que no tienen video)
const files = fs.readdirSync(webflowComponentsDir)
  .filter(file => {
    const match = file.match(/^(22[2-9]|2[3-7][0-9])-.*\.html$/);
    // Excluir Patricia (262) y Anahi (268) - se manejarán después con mensaje "video in progress"
    const excludeFiles = ['262-patricia-profile.html', '268-anahi-profile.html'];
    return match && !file.includes('-correct.html') && !excludeFiles.some(ex => file.toLowerCase().includes(ex.toLowerCase())) && fs.statSync(path.join(webflowComponentsDir, file)).isFile();
  })
  .sort();

console.log(`📋 Encontrados ${files.length} archivos para procesar (222-275)\n`);

let processedCount = 0;
let fixedCount = 0;
let skippedCount = 0;

files.forEach(file => {
  const filePath = path.join(webflowComponentsDir, file);
  processedCount++;
  if (fixVideoStructure(filePath)) {
    fixedCount++;
  } else {
    skippedCount++;
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN');
console.log('='.repeat(60));
console.log(`📁 Archivos procesados: ${processedCount}`);
console.log(`✅ Archivos corregidos: ${fixedCount}`);
console.log(`⏭️  Archivos saltados: ${skippedCount}`);
console.log('\n✨ Proceso completado!');

