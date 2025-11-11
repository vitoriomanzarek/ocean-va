#!/usr/bin/env node

/**
 * Generate Premium Webflow HTML for all Virtual Assistants
 * Matches the JSX design with circular images, teal colors, and icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read vasData.js
const vasDataPath = path.join(__dirname, 'src', 'data', 'vasData.js');
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8');

// Manual parsing - read line by line
const lines = vasDataContent.split('\n');
let currentVA = null;
const vas = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('{')) {
    currentVA = {};
  } else if (line.startsWith('id:')) {
    currentVA.id = parseInt(line.match(/\d+/)[0]);
  } else if (line.startsWith('nombre:')) {
    currentVA.nombre = line.match(/"([^"]+)"/)[1];
  } else if (line.startsWith('idiomas:')) {
    currentVA.idiomas = line.match(/"([^"]+)"/)[1];
  } else if (line.startsWith('años_experiencia:')) {
    const match = line.match(/:\s*(.+?)[,}]/);
    currentVA.años_experiencia = match[1].trim() === 'null' ? null : parseFloat(match[1]);
  } else if (line.startsWith('especialización:')) {
    const specMatch = line.match(/\[(.*?)\]/);
    if (specMatch) {
      currentVA.especialización = specMatch[1].split(',').map(s => s.trim().replace(/"/g, ''));
    }
  } else if (line.startsWith('disponibilidad:')) {
    currentVA.disponibilidad = line.match(/"([^"]+)"/)[1];
  } else if (line.startsWith('slug:')) {
    currentVA.slug = line.match(/"([^"]+)"/)[1];
  } else if (line.startsWith('}') && currentVA && currentVA.id) {
    vas.push(currentVA);
    currentVA = null;
  }
}

console.log(`✅ Parsed ${vas.length} VAs from vasData.js`);

// Generate HTML for each VA
function generateVACard(va) {
  const name = va.nombre || 'Unknown';
  const slug = va.slug || '#';
  const experience = va.años_experiencia;
  const language = va.idiomas || 'English';
  const specialization = va.especialización || [];
  const availability = va.disponibilidad || 'Full Time';

  // Format experience
  let expText = 'Trained';
  if (experience !== null && experience !== undefined) {
    if (experience < 1) {
      expText = `${Math.round(experience * 12)} months`;
    } else {
      expText = `${experience} years`;
    }
  }

  // Generate specialization tags
  const tagsHtml = specialization
    .map(spec => `<span class="va-tag-premium">${spec}</span>`)
    .join('\n        ');

  return `    <!-- ${name} -->
    <div class="va-card-premium">
      <div class="va-card-image-premium">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${name}" alt="${name}" loading="lazy">
        <span class="va-availability-badge-premium">${availability}</span>
      </div>
      <div class="va-card-content-premium">
        <h3 class="va-card-name-premium">${name}</h3>
        <div class="va-card-role-premium">
          🎯 Insurance Virtual Assistant
        </div>
        
        <div class="va-card-info-premium">
          <div class="va-info-block-premium">
            <div class="va-info-label-premium">Experience</div>
            <div class="va-info-value-premium">
              📅 ${expText}
            </div>
          </div>
          <div class="va-info-block-premium">
            <div class="va-info-label-premium">Language</div>
            <div class="va-info-value-premium">
              🌐 ${language}
            </div>
          </div>
        </div>

        <div class="va-specialization-premium">
          <div class="va-spec-title-premium">Specialization</div>
          <div class="va-tags-premium">
            ${tagsHtml}
          </div>
        </div>
      </div>
      
      <div style="padding: 0 24px 24px 24px;">
        <div class="va-card-footer-premium">
          <a href="/${slug}" class="va-btn-premium va-btn-primary-premium">
            View Profile →
          </a>
          <button class="va-btn-secondary-premium" title="Share">
            ▶
          </button>
        </div>
      </div>
    </div>`;
}

// Generate all cards
const allCards = vas.map(va => generateVACard(va)).join('\n\n');

// HTML Template
const htmlTemplate = `<!-- OUR CURRENT VAs - PREMIUM GRID COMPONENT FOR WEBFLOW -->
<!-- This component displays all Virtual Assistants with premium design -->
<!-- Matches the JSX design with circular images, teal colors, and icons -->
<!-- Generated: ${new Date().toISOString()} -->
<!-- Total VAs: ${vas.length} -->

<style>
  .ova-grid-premium {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #f9fafb;
  }

  .ova-header-premium {
    text-align: center;
    margin-bottom: 40px;
  }

  .ova-header-premium h2 {
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
  }

  .ova-header-premium p {
    font-size: 16px;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }

  .ova-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
    margin-bottom: 40px;
  }

  .va-card-premium {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .va-card-premium:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-8px);
  }

  .va-card-image-premium {
    width: 100%;
    height: 280px;
    background: linear-gradient(135deg, #049d98 0%, #037b77 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .va-card-image-premium img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 6px solid white;
    object-fit: cover;
  }

  .va-availability-badge-premium {
    position: absolute;
    top: 16px;
    right: 16px;
    background: white;
    color: #049d98;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .va-card-content-premium {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .va-card-name-premium {
    font-size: 22px;
    font-weight: 700;
    color: #049d98;
    margin-bottom: 12px;
  }

  .va-card-role-premium {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #e8f7f6;
    color: #049d98;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    width: fit-content;
    margin-bottom: 16px;
  }

  .va-card-info-premium {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
  }

  .va-info-block-premium {
    display: flex;
    flex-direction: column;
  }

  .va-info-label-premium {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .va-info-value-premium {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .va-specialization-premium {
    margin-bottom: 20px;
    flex: 1;
  }

  .va-spec-title-premium {
    font-size: 11px;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .va-tags-premium {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .va-tag-premium {
    background: #e8f7f6;
    color: #049d98;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid #b3e5e0;
  }

  .va-card-footer-premium {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .va-btn-premium {
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .va-btn-primary-premium {
    background: #049d98;
    color: white;
  }

  .va-btn-primary-premium:hover {
    background: #037b77;
    transform: translateX(2px);
  }

  .va-btn-secondary-premium {
    width: 44px;
    height: 44px;
    padding: 0;
    background: #f3f4f6;
    color: #049d98;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 16px;
  }

  .va-btn-secondary-premium:hover {
    background: #e5e7eb;
  }

  @media (max-width: 768px) {
    .ova-cards-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .va-card-image-premium {
      height: 240px;
    }

    .va-card-image-premium img {
      width: 140px;
      height: 140px;
    }

    .va-card-content-premium {
      padding: 20px;
    }

    .va-card-name-premium {
      font-size: 20px;
    }

    .ova-header-premium h2 {
      font-size: 24px;
    }

    .ova-grid-premium {
      padding: 24px 16px;
    }
  }

  @media (max-width: 480px) {
    .ova-cards-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .va-card-image-premium {
      height: 220px;
    }

    .va-card-image-premium img {
      width: 120px;
      height: 120px;
    }

    .ova-header-premium h2 {
      font-size: 20px;
    }

    .ova-grid-premium {
      padding: 16px 12px;
    }
  }
</style>

<div class="ova-grid-premium">
  <div class="ova-header-premium">
    <h2>Meet Our Virtual Assistants</h2>
    <p>Highly skilled professionals ready to support your business needs. Each assistant is pre-vetted and trained to deliver exceptional service.</p>
  </div>

  <div class="ova-cards-grid">
${allCards}
  </div>
</div>`;

// Write to file
const outputPath = path.join(__dirname, 'webflow-components', '200-our-current-vas-grid-premium.html');
fs.writeFileSync(outputPath, htmlTemplate, 'utf-8');

console.log(`\n✅ Generated PREMIUM HTML for ${vas.length} Virtual Assistants`);
console.log(`📁 File saved: webflow-components/200-our-current-vas-grid-premium.html`);
console.log(`📊 File size: ${(htmlTemplate.length / 1024).toFixed(2)} KB`);
console.log(`\n🎨 Design Features:`);
console.log(`   ✅ Circular images with white border`);
console.log(`   ✅ Teal color scheme (#049d98)`);
console.log(`   ✅ Icons for experience and language`);
console.log(`   ✅ Teal badge for role`);
console.log(`   ✅ Teal tags for specialization`);
console.log(`   ✅ Premium spacing and typography`);
console.log(`   ✅ Hover effects`);
console.log(`   ✅ Responsive design`);
