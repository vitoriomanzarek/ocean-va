import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import VA data
import { vasData } from './src/data/vasData.js';

const outputPath = path.join(__dirname, 'webflow-components');

// Image URL mapping with correct hashes (extracted from profile HTML files)
const imageUrlMap = {
  'Adrian': '690ca8d41f7b9bba8c7a930b_Adrian',
  'Alejandro': '690ca8d4cd15fbec43d91276_Alejandro',
  'Dafne': '690ca8d53cbf1ca607b02b2d_Dafne',
  'Ivan': '690ca8d6b37f8c43bae099f6_Ivan',
  'Joana': '690ca8d7d3a9269a232c087c_Johana',
  'Karen': '690ca8d7cc9f336cba3243d1_Karen',
  'Maria Paula': '690ca8d8bf0d16a67d796ebc_Maria%20Paula',
  'Moises': '690ca8d82ea0944cf9a27fad_Moises',
  'Abigail': '690ca8d48591ce6093bdf2c2_Abigail',
  'Antonio': '690ca8d51f3842a99b786f41_Antonio',
  'Cherry Mae': '690ca8d4cf44374e7f56a63e_Rona%20Mae',
  'Emmanuel': '690ca8d603e4c20b7c797f5f_Emmanuel',
  'Francis': '690ca8d6663e37de486152d3_Francis',
  'Geraldine': '690ca8d6ad9bbbbea950cd39_Geraldine',
  'Jay Alvin': '690ca8d7b62ec13fcdb2352e_Jay%20Alvin',
  'Javier': '690ca8d74162d50e2a4cf540_Javier',
  'Jerome': '690ca8d7756529b8d6f82e64_Jerome',
  'Jimmy': '690ca8d755a86cdc95a748bb_Jimmy',
  'Joel': '690ca8d790d2b6dd52e49d1d_Joel',
  'Joji Marie': '690ca8d7bfb51d07abc54804_Joji%20Marie',
  'Laurice': '690ca8d7d6b8bb8899b909af_Laurice',
  'Lorenz': '690ca8d808ab483ef413b5a4_Lorenz',
  'Ma. Venus': '690ca8d84a0eb5d1ec0e85db_Ma%20Venus',
  'Michelle': '690ca8d8a2c4eaefc8bdf89b_Michelle',
  'Raydon': '690ca8d460710f374d2ce4ff_Raidon',
  'Rona Mae': '690ca8d4cf44374e7f56a63e_Rona%20Mae',
  'Gizelle': '690ca8d6d2c85bb443792446_Gizelle',
  'Jasmine': '690ca8d6e926a944fc9b3bdd_Jasmine',
  'Jill': '690ca8d7dc544fabb458df9b_Jill',
  'Pavel': '690ca8d48ceb2e681075ee67_Pavel',
  'Ana': '690ca8d57d576b7fccbc87e0_Anna%20Victoria',
  'Ana Victoria': '690ca8d57d576b7fccbc87e0_Anna%20Victoria',
  'Balbina': '690ca8d5e8b404bf07609f0f_Balbina',
  'Brandon L.': '690ca8d58619558948531fd2_Brandon%20L',
  'Carolina': '690ca8d5ebcbcb8ae3572a64_Carolina',
  'Christine': '690ca8d5fe1f53093ba3bfe6_Christine',
  'Dawn': '690ca8d5374a8caa568a7ffa_Dawn',
  'Dayana': '690ca8d5d746a6cf5bb7267c_Dayana',
  'Ellen': '690ca8d637032e6e94653a02_Janice',
  'Fernanda': '690ca8d69bc6c6b305798a5e_Fernanda',
  'Gonzalo': '690ca8d66009cfe9aa7246f0_Gonzalo',
  'Guillermo': '690ca8d66b6a9ccb30f922f0_Guillermo',
  'Israel': '690ca8d6b01c191263cccfdb_Israel',
  'Janice': '690ca8d637032e6e94653a02_Janice',
  'Kevin': '690ca8d7201c78ec545b7e2c_Kevin',
  'Lois': '690ca8d7d2c85bb443792446_Gizelle',
  'Maria D.': '690ca8d8fb4cb934bf34fbea_Maria%20D',
  'Maria': '690ca8d8fb4cb934bf34fbea_Maria%20D',
  'Melissa': '690ca8d87955a4dd132ab57b_Melissa',
  'Patricia': '690ca8d800cade68370ae2bd_Patricia',
  'Rafael': '690ca8d46a128c664d29b2f9_Rafael',
  'Rainier': '690ca8d496a4c098ace60d8e_Rainier',
  'Rejean': '690ca8d4a0a265a4f24afd4b_Rejean',
  'Rochelle': '690ca8d4d13b93a2381cc23a_Rochelle',
  'Sandra': '690ca8d468814006ba9e4466_Sandra',
  'Ximena G.': '690ca8d46fef50cb33110012_Ximena%20G',
  'Tricia': '6914f0f46544f9a189f0769a_Tricia',
  'Yojaira': '6914f3c2fc5e29f95f6d938b_Yojaira'
};

// Helper function to create VA card HTML
function createVACard(va) {
  const imageKey = va.nombre;
  const imageHash = imageUrlMap[imageKey] || `690ca8d_${va.nombre}`;
  const imageUrl = `https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/${imageHash}.webp`;
  
  // Add class for Assigned VAs
  const availabilityClass = va.disponibilidad === 'Assigned' ? 'va-grid-availability-assigned' : '';
  
  return `      <!-- ${va.nombre} -->
      <div class="va-grid-card">
        <div class="va-grid-card-image">
          <img src="${imageUrl}" alt="${va.nombre}" loading="lazy">
          <span class="va-grid-availability ${availabilityClass}">✓ ${va.disponibilidad}</span>
        </div>
        <div class="va-grid-card-body">
          <h3 class="va-grid-card-name">${va.nombre}</h3>
          <div class="va-grid-card-role">⊙ Insurance Virtual Assistant</div>
          <div class="va-grid-card-info">
            <div class="va-grid-info-item">
              <span class="va-grid-info-label">Experience</span>
              <span class="va-grid-info-value">📅 ${va.años_experiencia ? va.años_experiencia + ' years' : 'Trained'}</span>
            </div>
            <div class="va-grid-info-item">
              <span class="va-grid-info-label">Language</span>
              <span class="va-grid-info-value">🌐 ${va.idiomas}</span>
            </div>
          </div>
          <div class="va-grid-specialization">
            <div class="va-grid-spec-label">Specialization</div>
            <div class="va-grid-tags">
              ${va.especialización.map(spec => `<span class="va-grid-tag">${spec}</span>`).join('\n              ')}
            </div>
          </div>
        </div>
        <div class="va-grid-card-footer">
          <a href="/${va.slug}" class="va-grid-btn">View Profile →</a>
          <button class="va-grid-btn-secondary" title="Watch Video">▶</button>
        </div>
      </div>
`;
}

// CSS styles (shared between both grids)
const styles = `<style>
  .va-grid-section {
    background: #f9fafb;
    padding: 40px 20px;
  }

  .va-grid-title {
    max-width: 1400px;
    margin: 0 auto 40px;
    font-size: 32px;
    font-weight: 700;
    color: #1a8b7e;
    text-align: center;
  }

  .va-grid-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .va-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
  }

  .va-grid-card {
    background: white;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.1),
      0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .va-grid-card:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 25px 70px rgba(0, 0, 0, 0.15),
      0 15px 40px rgba(0, 0, 0, 0.08);
  }

  .va-grid-card-image {
    width: 100%;
    height: 200px;
    background: 
      radial-gradient(ellipse at 50% 30%, rgba(180, 255, 240, 0.8) 0%, transparent 60%),
      radial-gradient(ellipse at 60% 70%, rgba(100, 220, 200, 0.5) 0%, transparent 50%),
      radial-gradient(circle at 30% 50%, rgba(120, 235, 215, 0.4) 0%, transparent 55%),
      linear-gradient(180deg, #6de5d0 0%, #4dd4bf 30%, #3ec4b0 60%, #2fb09d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(93, 217, 193, 0.2);
    border-radius: 25px 25px 0 0;
  }

  .va-grid-card-image img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 6px solid rgba(255, 255, 255, 0.4);
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .va-grid-availability {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: #05bfb9;
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 11px;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 10;
  }

  .va-grid-availability-assigned {
    background: #fff5f0 !important;
    color: #f97316 !important;
    border: 1px solid #fed7aa;
  }

  .va-grid-card-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .va-grid-card-name {
    font-size: 28px;
    font-weight: 700;
    color: #1a8b7e;
    margin-bottom: 12px;
    line-height: 1.2;
  }

  .va-grid-card-role {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #e8f9f6;
    color: #1a8b7e;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    width: fit-content;
    margin-bottom: 16px;
    border: 1.5px solid #1eb8a6;
  }

  .va-grid-card-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
  }

  .va-grid-info-item {
    display: flex;
    flex-direction: column;
  }

  .va-grid-info-label {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .va-grid-info-value {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }

  .va-grid-specialization {
    margin-bottom: 20px;
    flex: 1;
  }

  .va-grid-spec-label {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .va-grid-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .va-grid-tag {
    background: #c8f0e8;
    color: #1a8b7e;
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #a8e5d8;
  }

  .va-grid-card-footer {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 24px 24px 24px;
  }

  .va-grid-btn {
    flex: 1;
    padding: 12px 20px;
    background: #1eb8a6;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .va-grid-btn:hover {
    background: #189e8f;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(30, 184, 166, 0.3);
  }

  .va-grid-btn-secondary {
    width: 44px;
    height: 44px;
    padding: 0;
    background: white;
    color: #1eb8a6;
    border: 2px solid #e0e0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    flex: 0 0 auto;
  }

  .va-grid-btn-secondary:hover {
    border-color: #1eb8a6;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(30, 184, 166, 0.2);
  }

  @media (max-width: 768px) {
    .va-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .va-grid-section {
      padding: 24px 16px;
    }

    .va-grid-card-image {
      height: 240px;
    }

    .va-grid-card-image img {
      width: 140px;
      height: 140px;
    }

    .va-grid-card-body {
      padding: 20px;
    }

    .va-grid-card-name {
      font-size: 20px;
    }

    .va-grid-title {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    .va-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .va-grid-section {
      padding: 16px 12px;
    }

    .va-grid-card-image {
      height: 220px;
    }

    .va-grid-card-image img {
      width: 120px;
      height: 120px;
    }

    .va-grid-card-body {
      padding: 16px;
    }

    .va-grid-card-footer {
      padding: 0 16px 16px 16px;
    }

    .va-grid-title {
      font-size: 20px;
    }
  }
</style>`;

// Generate Part 1: Full Time + Part Time
function generatePart1() {
  const availableVAs = vasData.filter(va => 
    va.disponibilidad === 'Full Time' || va.disponibilidad === 'Part Time'
  );

  const cards = availableVAs.map(va => createVACard(va)).join('\n');

  const html = `<!-- VA GRID - PART 1 of 2: AVAILABLE VAs (Full Time & Part Time) -->
<!-- Auto-generated by generate-va-grids.js -->

${styles}

<section class="va-grid-section">
  <div class="va-grid-container">
    <h2 class="va-grid-title">Available VAs - Full Time & Part Time</h2>
    <div class="va-grid">
${cards}
    </div>
  </div>
</section>`;

  fs.writeFileSync(path.join(outputPath, '208-va-grid-part1.html'), html);
  console.log(`✅ Created: 208-va-grid-part1.html (${availableVAs.length} VAs)`);
}

// Generate Part 2: Assigned
function generatePart2() {
  const assignedVAs = vasData.filter(va => va.disponibilidad === 'Assigned');

  const cards = assignedVAs.map(va => createVACard(va)).join('\n');

  const html = `<!-- VA GRID - PART 2 of 2: ASSIGNED VAs -->
<!-- Auto-generated by generate-va-grids.js -->

${styles}

<section class="va-grid-section">
  <div class="va-grid-container">
    <h2 class="va-grid-title">Assigned VAs</h2>
    <div class="va-grid">
${cards}
    </div>
  </div>
</section>`;

  fs.writeFileSync(path.join(outputPath, '208-va-grid-part2.html'), html);
  console.log(`✅ Created: 208-va-grid-part2.html (${assignedVAs.length} VAs)`);
}

// Main execution
try {
  console.log('🚀 Generating VA Grids...\n');
  generatePart1();
  generatePart2();
  console.log('\n✅ VA Grids generated successfully!');
} catch (error) {
  console.error('❌ Error generating grids:', error.message);
  process.exit(1);
}
