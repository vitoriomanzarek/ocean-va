import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

let successCount = 0;
let errorCount = 0;

files.forEach(file => {
  const fileNumber = parseInt(file.split('-')[0]);
  
  // Only process files 211-275
  if (fileNumber < 211 || fileNumber > 275) {
    return;
  }

  const filePath = path.join(componentsDir, file);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let hasChanges = false;

    // FIX 1: Replace \n with <br>
    if (content.includes('\\n')) {
      content = content.replace(/\\n/g, '<br>');
      hasChanges = true;
    }

    // FIX 2: Fix video structure - replace incorrect onclick="window.open(...
    const videoIdMatch = content.match(/onclick="window\.open\('https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)'/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      
      // Replace the incorrect video structure with correct modal structure
      const incorrectPattern = new RegExp(
        `<div class="va-video-container"[^>]*onclick="window\\.open\\('https:\\/\\/www\\.youtube\\.com\\/embed\\/${videoId}'[^>]*>\\s*<div class="va-video-overlay">\\s*<div>\\s*<svg[^>]*>[\\s\\S]*?<\\/svg>\\s*<div class="va-video-text">CLICK HERE<\\/div>\\s*<\\/div>\\s*<\\/div>\\s*<\\/div>`,
        'g'
      );

      if (incorrectPattern.test(content)) {
        const correctReplacement = `<div class="va-video-container" style="background-image: url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg'); cursor: pointer;" onclick="document.getElementById('va-video-modal-${videoId}').style.display='flex'">
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
            </div>`;

        content = content.replace(incorrectPattern, correctReplacement);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${fileNumber}: Fixed`);
      successCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Fixed: ${successCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📁 Total processed: 65`);
