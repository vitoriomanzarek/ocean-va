const fs = require('fs');
const path = require('path');

// Video IDs mapping
const videoIds = {
  '211': 'k5OatPLSORw',      // Adrian
  '212': 'oiZlHPfAjbg',      // Yvette
  '213': 'J08tAud6nTQ',      // Grace
  '214': 'ifyF-owgkDw',      // Janet
  '215': '_reMSeE_gyY',      // Pavel
  '216': '4sfqBgJ6h3w',      // Albert
  '217': 't84q0i_wMfs',      // Kathleen (already done)
  '218': '7yREE7oxSu0',      // Jill
  '219': 'WhdFCM1GABs',      // Jasmine (already done)
  '220': 'xkbMKgYarbk',      // Gizelle
  '221': '2OIkxzcz-pw',      // Raydon
  '222': 'sjVqZfkunbY',      // Michelle
  '223': '3if5VzuvLNc',      // Lorenz
  '224': '9cz71wjqIX8',      // Laurice
  '225': '5N_z80i4KrQ',      // Joji Marie
  '226': 'aomGUtRlOiE',      // Jerome
  '227': 'UCqesVIO_7M',      // Javier
  '228': 'GUe3uCkW8-4',      // Jay Alvin
  '229': 'Atdu3qVBHLs',      // Francis
  '230': 'dZaAfgmaQwk',      // Emmanuel
  '231': 'DIfncidHCpY',      // Cherry Mae
  '232': 'tbz0iRIWaps',      // Moises
  '233': 'TXb9ONnF310',      // Karen
  '234': 'dHojsDPmfHc',      // Ivan
  '235': 'habJY_0mpjs',      // Dafne
  '236': 'a_cRiGRSLEs',      // Alejandro
  '237': 'UQ2JcPPjEnE',      // Ximena G.
  '238': 'VClb24kDU7s',      // Tricia
  '239': 'PrZ7xZryyjQ',      // Joana
  '240': 'yxgaoJEpdGg',      // Maria Paula
  '241': 'z3hiwu0mPc8',      // Abigail
  '242': '3b3R9YoLumE',      // Antonio
  '243': 'XloA9MBGtGA',      // Ana
  '244': '1d4dWgjd0fE',      // Ana Victoria
  '245': 'sESom3C4Tjk',      // Balbina
  '246': 'PVmxKa19Mz0',      // Brandon L.
  '247': '_3cmkdxncdg',      // Carolina
  '248': 'm0n5unGQ1Bk',      // Christine
  '249': '7ngbNodl3es',      // Fernanda
  '250': 'zgEzkCfI3Pw',      // Ellen
  '251': 'fMWR-UrNXAg',      // Dawn
  '252': '1xTnx_3MRPA',      // Dayana
  '253': 'DYky1VhKGNQ',      // Gonzalo
  '254': 'sLtVFyK2b7s',      // Guillermo
  '255': 'MnlRVthsUYE',      // Kevin
  '256': 'aSLhEc15mN4',      // Israel
  '257': 'P8gcQHNJwsk',      // Janice
  '258': 'HSCzM1jVsaE',      // Lois
  '259': 'ALQNI3jsBLs',      // Maria D.
  '260': 'TNXDeGsyIkM',      // Maria
  '261': '6dB2M8wAkjE',      // Melissa
  '262': 'NO_VIDEO',         // Patricia
  '263': 'S19B0sRiohI',      // Rafael
  '264': 'Gl_Rijv44Ec',      // Rainier
  '265': 'OAEGigybmFM',      // Geraldine
  '266': 'aCJyNu79nto',      // Rochelle
  '267': 'xrNMiTNBkcg',      // Sandra
  '268': 'NO_VIDEO',         // Anahi
  '269': 'mfyGOi9mo58',      // AC
  '270': 'k4jmdy8ifrE',      // Mina
  '271': 'AgUkZKEWzkw',      // Ma. Venus
  '272': 'yeJ_lskQovU',      // Rejean
  '273': 'eHrDpnlAeoc',      // Rona Mae
  '274': 'rKDnjVB-dxE',      // Jimmy
  '275': '5n99ZiMc0fs'       // Joel
};

function fixVideoStructure(filePath, videoId) {
  if (videoId === 'NO_VIDEO') {
    console.log(`Skipping ${path.basename(filePath)} - No video`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern to find old video structure (simplified or with modal)
    const oldPattern1 = new RegExp(
      `<!-- Video -->\\s*<div class="va-video-container"[^>]*style="[^"]*background-image: url\\('https://img\\.youtube\\.com/vi/${videoId}/[^']*'\\)[^"]*"[^>]*>\\s*<div class="va-video-overlay">\\s*(?:<svg[^>]*>.*?</svg>\\s*)?(?:<p class="va-video-text">CLICK HERE</p>)?\\s*</div>\\s*</div>(?:\\s*<!-- Video Modal -->.*?</div>)?`,
      'gs'
    );

    const newStructure = `<!-- Video -->
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

    if (oldPattern1.test(content)) {
      content = content.replace(oldPattern1, newStructure);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${path.basename(filePath)}`);
    } else {
      console.log(`⚠ Pattern not found in ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error.message);
  }
}

// Process all files
const componentDir = __dirname;
Object.entries(videoIds).forEach(([fileNum, videoId]) => {
  if (videoId === 'NO_VIDEO') return;
  
  const filePath = path.join(componentDir, `${fileNum}-*.html`);
  // Find the actual file
  const files = fs.readdirSync(componentDir).filter(f => f.startsWith(fileNum + '-') && f.endsWith('.html'));
  
  files.forEach(file => {
    fixVideoStructure(path.join(componentDir, file), videoId);
  });
});

console.log('\n✓ All videos processed!');
