#!/usr/bin/env node

/**
 * Generate Webflow HTML for all Virtual Assistants
 * Reads from vasData.js and generates complete HTML
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read vasData.js
const vasDataPath = path.join(__dirname, 'src', 'data', 'vasData.js');
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8');

// Extract the array using regex
const match = vasDataContent.match(/export const vasData = \[([\s\S]*?)\];/);
if (!match) {
  console.error('❌ Error: Could not find vasData array');
  process.exit(1);
}

// Parse the data manually (since it's JavaScript, not JSON)
const vasArray = [];
const vaMatches = vasDataContent.matchAll(/\{\s*id:\s*(\d+),[\s\S]*?nombre:\s*"([^"]+)"[\s\S]*?idiomas:\s*"([^"]+)"[\s\S]*?años_experiencia:\s*([\d.]+|null)[\s\S]*?especialización:\s*\[([\^\]]*)\][\s\S]*?disponibilidad:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/g);

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
    .map(spec => `<span class="ova-tag">${spec}</span>`)
    .join('\n            ');

  return `    <!-- ${name} -->
    <div class="ova-card">
      <div class="ova-card-image">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${name}" alt="${name}" loading="lazy">
        <span class="ova-availability-badge">${availability}</span>
      </div>
      <div class="ova-card-content">
        <h3 class="ova-card-name">${name}</h3>
        <p class="ova-card-role">Insurance Virtual Assistant</p>
        <div class="ova-card-info">
          <span class="ova-info-item"><span class="ova-info-label">Experience:</span> ${expText}</span>
          <span class="ova-info-item"><span class="ova-info-label">Language:</span> ${language}</span>
        </div>
        <div class="ova-specialization">
          <div class="ova-spec-title">Specialization</div>
          <div class="ova-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
      <div class="ova-card-footer">
        <a href="/${slug}" class="ova-btn ova-btn-primary">View Profile</a>
      </div>
    </div>`;
}

// Generate all cards
const allCards = vas.map(va => generateVACard(va)).join('\n\n');

// HTML Template
const htmlTemplate = `<!-- OUR CURRENT VAs - GRID COMPONENT FOR WEBFLOW -->
<!-- This component displays all Virtual Assistants in a responsive grid -->
<!-- Generated: ${new Date().toISOString()} -->
<!-- Total VAs: ${vas.length} -->

<style>
  .ova-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #f9fafb;
  }

  .ova-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .ova-header h2 {
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
  }

  .ova-header p {
    font-size: 16px;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }

  .ova-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
  }

  .ova-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .ova-card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  .ova-card-image {
    width: 100%;
    height: 240px;
    background: linear-gradient(135deg, #037b77 0%, #049d98 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }

  .ova-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ova-availability-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: white;
    color: #049d98;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .ova-card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ova-card-name {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
  }

  .ova-card-role {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 12px;
  }

  .ova-card-info {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .ova-info-item {
    font-size: 13px;
    color: #6b7280;
  }

  .ova-info-label {
    font-weight: 600;
    color: #374151;
  }

  .ova-specialization {
    margin-bottom: 16px;
    flex: 1;
  }

  .ova-spec-title {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .ova-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .ova-tag {
    background: #e5e7eb;
    color: #374151;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  .ova-card-footer {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }

  .ova-btn {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    text-align: center;
    display: inline-block;
  }

  .ova-btn-primary {
    background: #049d98;
    color: white;
  }

  .ova-btn-primary:hover {
    background: #037b77;
  }

  .ova-btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
  }

  .ova-btn-secondary:hover {
    background: #e5e7eb;
  }

  @media (max-width: 768px) {
    .ova-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    .ova-header h2 {
      font-size: 24px;
    }

    .ova-container {
      padding: 24px 16px;
    }
  }
</style>

<div class="ova-container">
  <div class="ova-header">
    <h2>Meet Our Virtual Assistants</h2>
    <p>Highly skilled professionals ready to support your business needs. Each assistant is pre-vetted and trained to deliver exceptional service.</p>
  </div>

  <div class="ova-grid">
${allCards}
  </div>
</div>`;

// Write to file
const outputPath = path.join(__dirname, 'webflow-components', '200-our-current-vas-grid-complete.html');
fs.writeFileSync(outputPath, htmlTemplate, 'utf-8');

console.log(`\n✅ Generated HTML for ${vas.length} Virtual Assistants`);
console.log(`📁 File saved: webflow-components/200-our-current-vas-grid-complete.html`);
console.log(`📊 File size: ${(htmlTemplate.length / 1024).toFixed(2)} KB`);
console.log(`\n📋 Summary:`);
console.log(`   - Total VAs: ${vas.length}`);
console.log(`   - Bilingual VAs: ${vas.filter(v => v.idiomas.includes('Bilingual')).length}`);
console.log(`   - English-only VAs: ${vas.filter(v => v.idiomas === 'English').length}`);
console.log(`   - Full-time: ${vas.filter(v => v.disponibilidad === 'Full Time').length}`);
console.log(`   - Part-time: ${vas.filter(v => v.disponibilidad === 'Part Time').length}`);
console.log(`   - Assigned: ${vas.filter(v => v.disponibilidad === 'Assigned').length}`);
