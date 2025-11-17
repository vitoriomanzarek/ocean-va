#!/usr/bin/env node

/**
 * Script to fix missing video URLs in HTML grid files
 * Handles special cases like "Ma. Venus" vs "Ma Venus"
 * 
 * Usage: node scripts/fix-missing-videos.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

console.log('🎬 Fixing missing video URLs...\n')

// Manual mapping for VAs with special cases or missing videos
const videoMap = {
  'Ma. Venus': 'https://www.youtube.com/embed/AgUkZKEWzkw', // From MaVenusProfile.jsx
  'Brandon L.': 'https://www.youtube.com/embed/PVmxKa19Mz0', // From BrandonLProfile.jsx
  'Ellen': 'https://www.youtube.com/embed/zgEzkCfI3Pw', // From EllenRoseProfile.jsx
  'Maria D.': 'https://www.youtube.com/embed/ALQNI3jsBLs', // From MariaDProfile.jsx
  'Rejean': 'https://www.youtube.com/embed/yeJ_lskQovU', // From RejeanMaeProfile.jsx
  'Ximena G.': 'https://www.youtube.com/embed/UQ2JcPPjEnE', // From XimenaGProfile.jsx
  // Note: Anahi, Geraldine, Jill, Maria, Patricia, Tricia don't have videos in their profiles
}

// Update HTML files
const htmlFiles = [
  'webflow-components/200-our-current-vas-grid-premium-PART1.html',
  'webflow-components/200-our-current-vas-grid-premium-PART2.html'
]

let totalUpdated = 0

htmlFiles.forEach(filePath => {
  const fullPath = path.join(rootDir, filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf-8')
  let updatedCount = 0

  // For each VA with a video URL
  Object.entries(videoMap).forEach(([vaName, videoUrl]) => {
    // Find the VA card by name and update the video button
    const pattern = new RegExp(
      `(<h3 class="va-grid-card-name">${vaName}</h3>[\\s\\S]*?)<button class="va-grid-btn-secondary" title="Watch Video">▶</button>`,
      'i'
    )
    
    if (pattern.test(content)) {
      const replacement = `$1<button class="va-grid-btn-secondary" title="Watch Video" onclick="window.open('${videoUrl}', '_blank')">▶</button>`
      content = content.replace(pattern, replacement)
      updatedCount++
      console.log(`  ✅ Updated button for: ${vaName}`)
    }
  })

  if (updatedCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf-8')
    console.log(`\n✅ ${filePath}: Updated ${updatedCount} video buttons\n`)
    totalUpdated += updatedCount
  }
})

console.log(`🎉 Done! Updated ${totalUpdated} video buttons total.\n`)
console.log('📝 VAs without videos (no profile videos available):')
console.log('  - Anahi')
console.log('  - Geraldine')
console.log('  - Jill')
console.log('  - Tricia')
console.log('\n💡 To add videos for these VAs:')
console.log('1. Create/update their profile files with videoUrl')
console.log('2. Run: node scripts/inject-video-buttons.js\n')
