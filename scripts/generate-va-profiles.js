import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// VA names to process - Updated with correct names
const vaNames = [
  'Ana', 'AnaVictoria', 'Balbina', 'BrandonL', 'Carolina', 'Christine', 'Dawn', 'Dayana',
  'EllenRose', 'Fernanda', 'Gonzalo', 'Guillermo', 'Israel', 'Janice', 'Kevin', 'Lois',
  'MariaD', 'MariaFernanda', 'Melissa', 'Patricia', 'Rafael', 'Rainier', 'RejeanMae', 'Rochelle',
  'Sandra', 'XimenaG'
];

const srcPath = 'c:\\Users\\USER\\CascadeProjects\\Ocean VA\\src\\pages';
const outputPath = 'c:\\Users\\USER\\CascadeProjects\\Ocean VA\\webflow-components';
const gridPath = 'c:\\Users\\USER\\CascadeProjects\\Ocean VA\\webflow-components\\208-va-grid-part1.html';
const gridPath2 = 'c:\\Users\\USER\\CascadeProjects\\Ocean VA\\webflow-components\\208-va-grid-part2.html';

// Read grid files to extract image URLs
function getImageUrl(vaName) {
  try {
    let gridContent = fs.readFileSync(gridPath, 'utf8');
    let gridContent2 = fs.readFileSync(gridPath2, 'utf8');
    const allContent = gridContent + gridContent2;
    
    // Search for VA name in grid
    const regex = new RegExp(`<!-- ${vaName}[\\s\\S]*?<img src="([^"]+)"`, 'i');
    const match = allContent.match(regex);
    
    if (match) {
      return match[1];
    }
    return null;
  } catch (e) {
    console.error(`Error reading grid: ${e.message}`);
    return null;
  }
}

// Extract VA data from JSX
function extractVAData(vaName) {
  const jsxFile = path.join(srcPath, `${vaName}Profile.jsx`);
  
  if (!fs.existsSync(jsxFile)) {
    console.log(`⚠️  File not found: ${jsxFile}`);
    return null;
  }
  
  try {
    const content = fs.readFileSync(jsxFile, 'utf8');
    
    // Extract basic data
    const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    const summaryMatch = content.match(/summary:\s*['"]([^'"]+)['"]/);
    const taglineMatch = content.match(/tagline:\s*['"]([^'"]+)['"]/);
    const videoUrlMatch = content.match(/videoUrl:\s*['"]([^'"]+)['"]/);
    const videoThumbnailMatch = content.match(/videoThumbnail:\s*['"]([^'"]+)['"]/);
    const thumbnailMatch = content.match(/thumbnail:\s*['"]([^'"]+)['"]/);
    const discResultMatch = content.match(/discResult:\s*['"]([^'"]+)['"]/);
    const discDescMatch = content.match(/discResultDescription:\s*['"]([^'"]+)['"]/);
    const englishScoreMatch = content.match(/englishScore:\s*['"]([^'"]+)['"]/);
    const englishDescMatch = content.match(/englishDescription:\s*['"]([^'"]+)['"]/);
    
    // Extract CEFR active level
    const cefrMatch = content.match(/{\s*label:\s*['"]([A-C][12]?)['"],[^}]*active:\s*true/);
    const cefrActive = cefrMatch ? cefrMatch[1] : 'B1';
    
    // Extract skills array
    const skillsMatch = content.match(/skills:\s*\[([\s\S]*?)\]/);
    const skills = [];
    if (skillsMatch) {
      const skillsStr = skillsMatch[1];
      const skillMatches = skillsStr.match(/['"]([^'"]+)['"]/g);
      if (skillMatches) {
        skillMatches.forEach(skill => {
          skills.push(skill.replace(/['"]/g, ''));
        });
      }
    }
    
    // Extract tools array
    const toolsMatch = content.match(/tools:\s*\[([\s\S]*?)\]/);
    const tools = [];
    if (toolsMatch) {
      const toolsStr = toolsMatch[1];
      const toolMatches = toolsStr.match(/['"]([^'"]+)['"]/g);
      if (toolMatches) {
        toolMatches.forEach(tool => {
          tools.push(tool.replace(/['"]/g, ''));
        });
      }
    }
    
    // Extract equipment array
    const equipmentMatch = content.match(/equipment:\s*\[([\s\S]*?)\]/);
    const equipment = [];
    if (equipmentMatch) {
      const equipmentStr = equipmentMatch[1];
      const equipMatches = equipmentStr.match(/['"]([^'"]+)['"]/g);
      if (equipMatches) {
        equipMatches.forEach(equip => {
          equipment.push(equip.replace(/['"]/g, ''));
        });
      }
    }
    
    // Extract employment summary
    const employmentSummaryMatch = content.match(/employmentSummary:\s*['"]([^'"]+)['"]/);
    
    // Extract employment history
    const employmentHistoryMatch = content.match(/employmentHistory:\s*\[([\s\S]*?)\]/);
    const employmentHistory = [];
    if (employmentHistoryMatch) {
      const historyStr = employmentHistoryMatch[1];
      const jobMatches = historyStr.match(/{\s*company:[^}]*?}/g);
      if (jobMatches) {
        jobMatches.forEach(job => {
          const companyMatch = job.match(/company:\s*['"]([^'"]+)['"]/);
          const positionMatch = job.match(/position:\s*['"]([^'"]+)['"]/);
          const periodMatch = job.match(/period:\s*['"]([^'"]+)['"]/);
          const descMatch = job.match(/description:\s*['"]([^'"]+)['"]/);
          
          if (companyMatch) {
            employmentHistory.push({
              company: companyMatch[1],
              position: positionMatch ? positionMatch[1] : '',
              period: periodMatch ? periodMatch[1] : '',
              description: descMatch ? descMatch[1] : ''
            });
          }
        });
      }
    }
    
    // Extract education
    const educationMatch = content.match(/education:\s*{([\s\S]*?)}\s*}/);
    const education = { school: '', degree: '', date: '' };
    if (educationMatch) {
      const eduStr = educationMatch[1];
      const schoolMatch = eduStr.match(/school:\s*['"]([^'"]+)['"]/);
      const degreeMatch = eduStr.match(/degree:\s*['"]([^'"]+)['"]/);
      const dateMatch = eduStr.match(/date:\s*['"]([^'"]+)['"]/);
      
      education.school = schoolMatch ? schoolMatch[1] : '';
      education.degree = degreeMatch ? degreeMatch[1] : '';
      education.date = dateMatch ? dateMatch[1] : '';
    }
    
    return {
      name: nameMatch ? nameMatch[1] : vaName,
      title: titleMatch ? titleMatch[1] : '',
      summary: summaryMatch ? summaryMatch[1] : '',
      tagline: taglineMatch ? taglineMatch[1] : '',
      videoUrl: videoUrlMatch ? videoUrlMatch[1] : '',
      videoThumbnail: videoThumbnailMatch ? videoThumbnailMatch[1] : '',
      thumbnail: thumbnailMatch ? thumbnailMatch[1] : '',
      discResult: discResultMatch ? discResultMatch[1] : '',
      discDescription: discDescMatch ? discDescMatch[1] : '',
      englishScore: englishScoreMatch ? englishScoreMatch[1] : '',
      englishDescription: englishDescMatch ? englishDescMatch[1] : '',
      cefrActive: cefrActive,
      skills: skills,
      tools: tools,
      equipment: equipment,
      employmentSummary: employmentSummaryMatch ? employmentSummaryMatch[1] : '',
      employmentHistory: employmentHistory,
      education: education
    };
  } catch (e) {
    console.error(`Error reading ${jsxFile}: ${e.message}`);
    return null;
  }
}

// Generate HTML profile - COMPLETE VERSION
function generateHTML(vaData, imageUrl, fileNumber) {
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const cefrDescriptions = [
    'Can understand and use familiar everyday expressions and basic questions about personal details.',
    'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
    'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
    'Can communicate confidently in a variety of academic and professional environments.',
    'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'Can understand with ease virtually everything heard or read and can summarize information from different sources.'
  ];
  
  const cefrBubbles = cefrLevels.map((level, idx) => {
    const isActive = level === vaData.cefrActive;
    const className = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    return `        <div class="va-cefr-item">
          <div class="va-cefr-bubble ${className}">${level}</div>
          <p class="va-cefr-description">${cefrDescriptions[idx]}</p>
        </div>`;
  }).join('\n');
  
  // Generate skills tags
  const skillsTags = vaData.skills.map(skill => `            <span class="va-skill-tag">${skill}</span>`).join('\n');
  
  // Generate tools list
  const toolsList = vaData.tools.map(tool => `              <div class="va-tool-item">
                <span class="va-tool-checkmark">✓</span>
                <span>${tool}</span>
              </div>`).join('\n');
  
  // Generate equipment list
  const equipmentList = vaData.equipment.map(equip => {
    const icon = equip.includes('Monitor') ? 'M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z' : 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3';
    return `              <div class="va-equipment-item">
                <svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"></path>
                </svg>
                <span>${equip}</span>
              </div>`;
  }).join('\n');
  
  // Generate employment history
  const employmentHistoryHTML = vaData.employmentHistory.map(job => `        <div class="va-employment-item">
          <h4 class="va-employment-company">${job.company}</h4>
          <p class="va-employment-position">${job.position}</p>
          <p class="va-employment-period">${job.period}</p>
          <p class="va-employment-description">${job.description}</p>
        </div>`).join('\n');
  
  // Generate education section
  let educationHTML = '';
  if (vaData.education.school) {
    educationHTML = `      <div class="va-education-item">
        <h3 class="va-education-school">${vaData.education.school}</h3>
        <p class="va-education-degree">${vaData.education.degree}</p>
        ${vaData.education.date ? `<p class="va-education-degree" style="font-size: 12px; margin-top: 4px;">${vaData.education.date}</p>` : ''}
      </div>`;
  } else {
    educationHTML = `      <div class="va-education-item">
        <p class="va-education-degree" style="color: white; font-size: 14px;">Not provided</p>
      </div>`;
  }
  
  const html = `<!-- ${vaData.name.toUpperCase()} PROFILE - CONTENT -->
<!-- Include 210-VA-profile-styles.html and 210 VA-profile-sticky-footer.html -->

<div class="va-profile-page">
  <!-- Back Link -->
  <div class="va-back-link">
    <a href="/ovas-current-vas">
      <svg class="va-back-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      Back to VAs
    </a>
  </div>

  <!-- Hero Section -->
  <section class="va-hero-section">
    <div class="va-hero-container">
      <!-- Hero Grid -->
      <div class="va-hero-grid">
        <!-- Left - Image -->
        <div class="va-image-container">
          <div class="va-image-frame">
            <img src="${imageUrl || '/images/placeholder.webp'}" alt="${vaData.name}" loading="lazy">
          </div>
        </div>

        <!-- Right - Info -->
        <div class="va-info-box">
          <h1 class="va-profile-name">${vaData.name}</h1>
          <p class="va-title">${vaData.title}</p>
          <p class="va-summary">${vaData.summary}</p>

          <!-- Skills Tags -->
          <div class="va-skills-container">
${skillsTags}
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="va-bottom-section">
        <!-- Tools & Equipment Grid -->
        <div class="va-tools-grid">
          <!-- Tools -->
          <div>
            <h3 class="va-column-header">TOOLS</h3>
            <div class="va-tools-list">
${toolsList}
            </div>
          </div>

          <!-- Equipment -->
          <div>
            <h3 class="va-column-header">EQUIPMENT</h3>
            <div class="va-equipment-list">
${equipmentList}
            </div>
          </div>

          <!-- Video -->
          <div class="va-video-container" style="background-image: url('${vaData.videoThumbnail}')">
            <div class="va-video-overlay">
              <svg class="va-video-play-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
              </svg>
              <p class="va-video-text">CLICK HERE</p>
            </div>
          </div>
        </div>

        <!-- Thumbnail Box -->
        <div class="va-thumbnail-box">
          <p class="va-thumbnail-text">${vaData.thumbnail}</p>
        </div>

        <!-- Tagline Box -->
        <div class="va-tagline-box">
          <p class="va-tagline-text">${vaData.tagline}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Employment History Section -->
  <section class="va-employment-section">
    <div class="va-employment-container">
      <h2 class="va-section-title">EMPLOYMENT SUMMARY</h2>
      <p class="va-employment-summary">${vaData.employmentSummary}</p>

      <h3 class="va-employment-history-title">EMPLOYMENT HISTORY</h3>
      <div class="va-employment-list">
${employmentHistoryHTML}
      </div>
    </div>
  </section>

  <!-- DISC & English Results Row -->
  <div style="padding: 48px 16px;">
    <h2 class="va-section-title" style="max-width: 1151px; margin: 0 auto 24px;">ASSESSMENT RESULTS</h2>
    <div class="va-results-row">
      <!-- DISC Result Section -->
      <section class="va-disc-section">
        <div class="va-disc-container">
          <h3 style="font-size: 14px; font-weight: 700; color: white; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">DISC PERSONALITY RESULT</h3>
          <div class="va-disc-result">
            <div class="va-disc-badge">${vaData.discResult}</div>
            <p class="va-disc-description">${vaData.discDescription}</p>
          </div>
        </div>
      </section>

      <!-- English Score Section -->
      <section class="va-english-section">
        <div class="va-english-container">
          <h3 style="font-size: 14px; font-weight: 700; color: white; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">EF ENGLISH TEST RESULT</h3>
          <div class="va-english-result">
            <div class="va-english-score">${vaData.englishScore}</div>
            <p class="va-english-description">${vaData.englishDescription}</p>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- CEFR Levels Section -->
  <section class="va-cefr-section">
    <div class="va-cefr-container">
      <h2 class="va-section-title">COMMON EUROPEAN FRAMEWORK OF REFERENCE FOR LANGUAGES (CEFR)</h2>
      <!-- Ovals Grid with Descriptions -->
      <div class="va-cefr-grid">
${cefrBubbles}
      </div>
      <!-- Categories -->
      <div class="va-cefr-categories">
        <div>BEGINNER</div>
        <div>INTERMEDIATE</div>
        <div>ADVANCED</div>
      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section class="va-education-section">
    <div class="va-education-container">
      <h2 class="va-section-title">EDUCATION</h2>
${educationHTML}
    </div>
  </section>
</div>`;
  
  return html;
}

// Main process
function processVAs() {
  let startNumber = 241; // Next file number after Pavel (240)
  let successCount = 0;
  let failCount = 0;
  
  vaNames.forEach((vaName) => {
    const vaData = extractVAData(vaName);
    
    if (!vaData) {
      console.log(`❌ Failed to extract data for ${vaName}`);
      failCount++;
      return;
    }
    
    const imageUrl = getImageUrl(vaData.name);
    
    if (!imageUrl) {
      console.log(`⚠️  Image URL not found for ${vaData.name}, using placeholder`);
    }
    
    const html = generateHTML(vaData, imageUrl, startNumber);
    const outputFile = path.join(outputPath, `${startNumber}-${vaName.toLowerCase()}-profile.html`);
    
    try {
      fs.writeFileSync(outputFile, html, 'utf8');
      console.log(`✅ Created: ${startNumber}-${vaName.toLowerCase()}-profile.html`);
      successCount++;
    } catch (e) {
      console.error(`❌ Error writing ${outputFile}: ${e.message}`);
      failCount++;
    }
    
    startNumber++;
  });
  
  console.log(`\n📊 Summary: ${successCount} created, ${failCount} failed`);
}

// Run
processVAs();
