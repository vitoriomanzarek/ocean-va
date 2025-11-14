#!/usr/bin/env node

/**
 * Generate VA Grid for Webflow - Divided into 2 parts
 * Based on OurCurrentVAs.jsx and VAGrid.jsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read vasData.js
const vasDataPath = path.join(__dirname, '..', 'src', 'data', 'vasData.js');
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8');

// Manual parsing
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

// Generate HTML for each VA card
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
    .map(spec => `<span class="va-grid-tag">${spec}</span>`)
    .join('\n            ');

  return `    <!-- ${name} -->
    <div class="va-grid-card">
      <div class="va-grid-card-image">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${name}" alt="${name}" loading="lazy">
        <span class="va-grid-availability">✓ ${availability}</span>
      </div>
      <div class="va-grid-card-body">
        <h3 class="va-grid-card-name">${name}</h3>
        <div class="va-grid-card-role">
          ⊙ Insurance Virtual Assistant
        </div>
        
        <div class="va-grid-card-info">
          <div class="va-grid-info-item">
            <span class="va-grid-info-label">Experience</span>
            <span class="va-grid-info-value">📅 ${expText}</span>
          </div>
          <div class="va-grid-info-item">
            <span class="va-grid-info-label">Language</span>
            <span class="va-grid-info-value">🌐 ${language}</span>
          </div>
        </div>

        <div class="va-grid-specialization">
          <div class="va-grid-spec-label">Specialization</div>
          <div class="va-grid-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
      
      <div class="va-grid-card-footer">
        <a href="/${slug}" class="va-grid-btn">View Profile →</a>
      </div>
    </div>`;
}

// CSS Template - Premium Design matching JSX
const cssTemplate = `<style>
  .va-grid-section {
    background: #f9fafb;
    padding: 40px 20px;
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
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .va-grid-card:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-8px);
  }

  .va-grid-card-image {
    width: 100%;
    height: 280px;
    background: linear-gradient(135deg, #05bfb9 0%, #049d98 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .va-grid-card-image img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 6px solid white;
    object-fit: cover;
  }

  .va-grid-availability {
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
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .va-grid-card-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .va-grid-card-name {
    font-size: 22px;
    font-weight: 700;
    color: #049d98;
    margin-bottom: 12px;
  }

  .va-grid-card-role {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #e8f7f6;
    color: #049d98;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    width: fit-content;
    margin-bottom: 16px;
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
    background: #e8f7f6;
    color: #049d98;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid #b3e5e0;
  }

  .va-grid-card-footer {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 24px 24px 24px;
  }

  .va-grid-btn {
    flex: 1;
    padding: 12px 16px;
    background: #049d98;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .va-grid-btn:hover {
    background: #1eb8a6;
    color: white;
    transform: translateX(2px);
  }

  .va-grid-btn-secondary {
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

  .va-grid-btn-secondary:hover {
    background: #e5e7eb;
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
  }
</style>`;

// Generate all cards
const allCards = vas.map(va => generateVACard(va)).join('\n\n');

// Split into two parts - find a safe split point after a complete card
const midpoint = Math.floor(vas.length / 2);

// Generate Part 1 cards (first half)
const part1VAs = vas.slice(0, midpoint);
const part1Cards = part1VAs.map(va => generateVACard(va)).join('\n\n');

// Generate Part 2 cards (second half)
const part2VAs = vas.slice(midpoint);
const part2Cards = part2VAs.map(va => generateVACard(va)).join('\n\n');

// Part 1 HTML
const part1HTML = `<!-- VA GRID - PART 1 of 2 -->
<!-- Based on OurCurrentVAs.jsx and VAGrid.jsx -->

${cssTemplate}

<section class="va-grid-section">
  <div class="va-grid-container">
    <div class="va-grid">
${part1Cards}
    </div>
  </div>
</section>`;

// Part 2 HTML (without CSS, just cards)
const part2HTML = `<!-- VA GRID - PART 2 of 2 -->
<!-- Paste this after PART 1 in the same HTML Embed -->

<section class="va-grid-section">
  <div class="va-grid-container">
    <div class="va-grid">
${part2Cards}
    </div>
  </div>
</section>`;

// Write files
const part1Path = path.join(__dirname, '..', 'webflow-components', '200-our-current-vas-grid-premium-PART1.html');
fs.writeFileSync(part1Path, part1HTML, 'utf-8');

const part2Path = path.join(__dirname, '..', 'webflow-components', '200-our-current-vas-grid-premium-PART2.html');
fs.writeFileSync(part2Path, part2HTML, 'utf-8');

console.log(`\n✅ VA Grid generated successfully!\n`);
console.log(`📄 PART 1: ${(part1HTML.length / 1024).toFixed(2)} KB`);
console.log(`   File: webflow-components/208-va-grid-part1.html`);
console.log(`   Contains: CSS + First ${Math.ceil(vas.length / 2)} VAs\n`);
console.log(`📄 PART 2: ${(part2HTML.length / 1024).toFixed(2)} KB`);
console.log(`   File: webflow-components/208-va-grid-part2.html`);
console.log(`   Contains: Last ${Math.floor(vas.length / 2)} VAs\n`);
console.log(`📋 Instructions:`);
console.log(`   1. Copy PART 1 and paste into Webflow HTML Embed`);
console.log(`   2. Then copy PART 2 and paste into the SAME HTML Embed`);
console.log(`   3. Both parts will combine into one complete grid`);
