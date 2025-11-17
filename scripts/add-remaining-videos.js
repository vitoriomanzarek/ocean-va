#!/usr/bin/env node

/**
 * Script to add remaining video URLs directly to HTML
 * Extracts from profile files and injects into HTML buttons
 * 
 * Usage: node scripts/add-remaining-videos.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

console.log('🎬 Adding remaining video URLs to HTML...\n')

// VAs that still need videos
const vasToFix = [
  { name: 'Ana Victoria', profileFile: 'AnaVictoriaProfile.jsx' },
  { name: 'Anahi', profileFile: 'AnahiProfile.jsx' },
  { name: 'Geraldine', profileFile: 'GeraldinProfile.jsx' },
  { name: 'Jill Nicole', profileFile: 'JillNicoleProfile.jsx' },
  { name: 'Maria', profileFile: 'MariaProfile.jsx' },
]

// Extract video URLs from profile files
const videoMap = {}

vasToFix.forEach(va => {
  const profilePath = path.join(rootDir, 'src', 'pages', va.profileFile)
  
  if (fs.existsSync(profilePath)) {
    const content = fs.readFileSync(profilePath, 'utf-8')
    const videoMatch = content.match(/videoUrl:\s*['"]([^'"]+)['"]/)
    
    if (videoMatch && videoMatch[1] && videoMatch[1].trim() !== '') {
      videoMap[va.name] = videoMatch[1]
      console.log(`✅ ${va.name}: ${videoMatch[1]}`)
    } else {
      console.log(`⚠️  ${va.name}: No video URL found`)
    }
  } else {
    console.log(`⚠️  ${va.name}: Profile file not found`)
  }
})

console.log(`\n📊 Found ${Object.keys(videoMap).length} video URLs\n`)

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
