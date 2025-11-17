#!/usr/bin/env node

/**
 * Script to inject video URLs into HTML grid files
 * Matches VA names and adds onclick handlers to video buttons
 * 
 * Usage: node scripts/inject-video-buttons.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

console.log('🎬 Injecting video URLs into HTML grid files...\n')

// Read vasData.js to get video URLs
const vasDataPath = path.join(rootDir, 'src', 'data', 'vasData.js')
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')

// Extract video URLs from vasData.js
const videoMap = {}
const videoRegex = /nombre:\s*['"]([^'"]+)['"][^}]*?videoUrl:\s*['"]([^'"]+)['"]/gs

let match
while ((match = videoRegex.exec(vasDataContent)) !== null) {
  const vaName = match[1]
  const videoUrl = match[2]
  videoMap[vaName] = videoUrl
  console.log(`✅ Found: ${vaName} → ${videoUrl}`)
}

console.log(`\n📊 Extracted ${Object.keys(videoMap).length} video URLs from vasData.js\n`)

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
    // Pattern: <!-- VA Name --> ... <h3 class="va-grid-card-name">VA Name</h3> ... <button class="va-grid-btn-secondary" title="Watch Video">▶</button>
    
    // Create a pattern that finds the VA name in the card and the video button after it
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
  } else {
    console.log(`\n⚠️  ${filePath}: No updates made\n`)
  }
})

console.log(`🎉 Done! Updated ${totalUpdated} video buttons total.\n`)
console.log('📝 Next steps:')
console.log('1. Review the changes in HTML files')
console.log('2. Commit: git add -A && git commit -m "feat: Inject video URLs into VA grid buttons"')
console.log('3. Push: git push origin feature/webflow-code-components')
console.log('4. Test in Webflow\n')
