import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete list of 65 VAs with their video IDs (211-275)
const vaVideos = [
  { number: 211, name: 'Adrian', videoId: 'k5OatPLSORw' },
  { number: 212, name: 'Yvette', videoId: 'oiZlHPfAjbg' },
  { number: 213, name: 'Grace', videoId: 'J08tAud6nTQ' },
  { number: 214, name: 'Janet', videoId: 'ifyF-owgkDw' },
  { number: 215, name: 'Pavel', videoId: '_reMSeE_gyY' },
  { number: 216, name: 'Albert', videoId: '4sfqBgJ6h3w' },
  { number: 217, name: 'Kathleen', videoId: 't84q0i_wMfs' },
  { number: 218, name: 'Jill', videoId: '7yREE7oxSu0' },
  { number: 219, name: 'Jasmine', videoId: 'WhdFCM1GABs' },
  { number: 220, name: 'Gizelle', videoId: 'xkbMKgYarbk' },
  { number: 221, name: 'Raydon', videoId: '2OIkxzcz-pw' },
  { number: 222, name: 'Michelle', videoId: 'sjVqZfkunbY' },
  { number: 223, name: 'Lorenz', videoId: '3if5VzuvLNc' },
  { number: 224, name: 'Laurice', videoId: '9cz71wjqIX8' },
  { number: 225, name: 'Joji', videoId: '5N_z80i4KrQ' },
  { number: 226, name: 'Jerome', videoId: 'aomGUtRlOiE' },
  { number: 227, name: 'Javier', videoId: 'UCqesVIO_7M' },
  { number: 228, name: 'Jay Alvin', videoId: 'GUe3uCkW8-4' },
  { number: 229, name: 'Francis', videoId: 'Atdu3qVBHLs' },
  { number: 230, name: 'Emmanuel', videoId: 'dZaAfgmaQwk' },
  { number: 231, name: 'Cherry Mae', videoId: 'DIfncidHCpY' },
  { number: 232, name: 'Moises', videoId: 'tbz0iRIWaps' },
  { number: 233, name: 'Karen', videoId: 'TXb9ONnF310' },
  { number: 234, name: 'Ivan', videoId: 'dHojsDPmfHc' },
  { number: 235, name: 'Dafne', videoId: 'habJY_0mpjs' },
  { number: 236, name: 'Alejandro', videoId: 'a_cRiGRSLEs' },
  { number: 237, name: 'Ximena G', videoId: 'UQ2JcPPjEnE' },
  { number: 238, name: 'Tricia', videoId: 'VClb24kDU7s' },
  { number: 239, name: 'Joana', videoId: 'PrZ7xZryyjQ' },
  { number: 240, name: 'Maria Paula', videoId: 'yxgaoJEpdGg' },
  { number: 241, name: 'Abigail', videoId: 'z3hiwu0mPc8' },
  { number: 242, name: 'Antonio', videoId: '3b3R9YoLumE' },
  { number: 243, name: 'Ana', videoId: 'XloA9MBGtGA' },
  { number: 244, name: 'Ana Victoria', videoId: '1d4dWgjd0fE' },
  { number: 245, name: 'Balbina', videoId: 'sESom3C4Tjk' },
  { number: 246, name: 'Brandon L', videoId: 'PVmxKa19Mz0' },
  { number: 247, name: 'Carolina', videoId: '_3cmkdxncdg' },
  { number: 248, name: 'Christine', videoId: 'm0n5unGQ1Bk' },
  { number: 249, name: 'Fernanda', videoId: '7ngbNodl3es' },
  { number: 250, name: 'Ellen', videoId: 'zgEzkCfI3Pw' },
  { number: 251, name: 'Dawn', videoId: 'fMWR-UrNXAg' },
  { number: 252, name: 'Dayana', videoId: '1xTnx_3MRPA' },
  { number: 253, name: 'Gonzalo', videoId: 'DYky1VhKGNQ' },
  { number: 254, name: 'Guillermo', videoId: 'sLtVFyK2b7s' },
  { number: 255, name: 'Kevin', videoId: 'MnlRVthsUYE' },
  { number: 256, name: 'Israel', videoId: 'aSLhEc15mN4' },
  { number: 257, name: 'Janice', videoId: 'P8gcQHNJwsk' },
  { number: 258, name: 'Lois', videoId: 'HSCzM1jVsaE' },
  { number: 259, name: 'Maria D', videoId: 'ALQNI3jsBLs' },
  { number: 260, name: 'Maria', videoId: 'TNXDeGsyIkM' },
  { number: 261, name: 'Melissa', videoId: '6dB2M8wAkjE' },
  { number: 262, name: 'Patricia', videoId: null }, // NO VIDEO
  { number: 263, name: 'Rafael', videoId: 'S19B0sRiohI' },
  { number: 264, name: 'Rainier', videoId: 'Gl_Rijv44Ec' },
  { number: 265, name: 'Geraldine', videoId: 'OAEGigybmFM' },
  { number: 266, name: 'Rochelle', videoId: 'aCJyNu79nto' },
  { number: 267, name: 'Sandra', videoId: 'xrNMiTNBkcg' },
  { number: 268, name: 'Anahi', videoId: null }, // NO VIDEO
  { number: 269, name: 'AC', videoId: 'mfyGOi9mo58' },
  { number: 270, name: 'Mina', videoId: 'k4jmdy8ifrE' },
  { number: 271, name: 'Ma Venus', videoId: 'AgUkZKEWzkw' },
  { number: 272, name: 'Rejean', videoId: 'yeJ_lskQovU' },
  { number: 273, name: 'Rona Mae', videoId: 'eHrDpnlAeoc' },
  { number: 274, name: 'Jimmy', videoId: 'rKDnjVB-dxE' },
  { number: 275, name: 'Joel', videoId: '5n99ZiMc0fs' }
];

// Function to generate thumbnail URL
function getThumbnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

// Function to update video section
function updateVideoSection(content, videoId) {
  if (!videoId) {
    // No video - replace with "VIDEO IN PROGRESS"
    const videoPattern = /<div class="va-video-container"[\s\S]*?<\/div>\s*<\/div>/;
    const replacement = `<div class="va-video-container" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
              <div class="va-video-overlay">
                <p class="va-video-text">VIDEO IN PROGRESS</p>
              </div>
            </div>`;
    return content.replace(videoPattern, replacement);
  }

  // Has video - update with new thumbnail and URL with modal
  const thumbnailUrl = getThumbnailUrl(videoId);
  const videoPattern = /<div class="va-video-container"[\s\S]*?<\/div>\s*<\/div>/;
  const replacement = `<div class="va-video-container" style="background-image: url('${thumbnailUrl}'); cursor: pointer;" onclick="document.getElementById('va-video-modal-${videoId}').style.display='flex'">
            <div class="va-video-overlay">
              <svg class="va-video-play-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
              </svg>
              <p class="va-video-text">CLICK HERE</p>
            </div>
          </div>

          <!-- Video Modal -->
          <div id="va-video-modal-${videoId}" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); z-index: 9999; align-items: center; justify-content: center;">
            <div style="position: relative; width: 90%; max-width: 900px; aspect-ratio: 16/9;">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <button onclick="document.getElementById('va-video-modal-${videoId}').style.display='none'" style="position: absolute; top: -50px; right: 0; background: transparent; border: none; font-size: 40px; cursor: pointer; color: white; padding: 0; line-height: 1; font-weight: bold;">×</button>
            </div>
          </div>`;
  return content.replace(videoPattern, replacement);
}

// Process all VAs
const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

let successCount = 0;
let noVideoCount = 0;
let errorCount = 0;

vaVideos.forEach(va => {
  // Find the actual file for this VA number
  const actualFile = files.find(f => {
    const num = parseInt(f.split('-')[0]);
    return num === va.number;
  });

  if (!actualFile) {
    console.log(`⚠️  File not found for ${va.number}: ${va.name}`);
    return;
  }

  const filePath = path.join(componentsDir, actualFile);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Update the video section
    const updatedContent = updateVideoSection(content, va.videoId);

    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');

    if (va.videoId) {
      console.log(`✅ ${va.number}: ${va.name}`);
      successCount++;
    } else {
      console.log(`⚠️  ${va.number}: ${va.name} - VIDEO IN PROGRESS`);
      noVideoCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${actualFile}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 FINAL SUMMARY:`);
console.log(`✅ Videos updated: ${successCount}`);
console.log(`⚠️  No video (VIDEO IN PROGRESS): ${noVideoCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📁 Total processed: ${successCount + noVideoCount + errorCount}`);
