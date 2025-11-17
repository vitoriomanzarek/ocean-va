#!/usr/bin/env node

/**
 * Script to extract video URLs from VA profile files and inject them into:
 * 1. vasData.js (add videoUrl field to each VA)
 * 2. HTML grid files (add onclick handlers to video buttons)
 * 
 * Usage: node scripts/extract-and-inject-videos.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

console.log('🎬 Extracting video URLs from VA profiles...\n')

// Step 1: Extract video URLs from JSX profile files
const videoMap = {}
const profileDir = path.join(rootDir, 'src', 'pages')

// Get all profile files
const profileFiles = fs.readdirSync(profileDir).filter(f => f.endsWith('Profile.jsx'))

profileFiles.forEach(file => {
  const filePath = path.join(profileDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // Extract VA name from filename (e.g., "AdrianProfile.jsx" -> "Adrian")
  const vaName = file.replace('Profile.jsx', '')
  
  // Extract videoUrl from the file
  const videoUrlMatch = content.match(/videoUrl:\s*['"]([^'"]+)['"]/);
  
  if (videoUrlMatch && videoUrlMatch[1]) {
    videoMap[vaName] = videoUrlMatch[1]
    console.log(`✅ ${vaName}: ${videoUrlMatch[1]}`)
  } else {
    console.log(`⚠️  ${vaName}: No video URL found`)
  }
})

console.log(`\n📊 Found ${Object.keys(videoMap).length} video URLs\n`)

// Step 2: Update vasData.js with video URLs
console.log('📝 Updating vasData.js...\n')

const vasDataPath = path.join(rootDir, 'src', 'data', 'vasData.js')
let vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')

// For each VA in vasData, add videoUrl if available
let updatedCount = 0

// Find all VA objects and add videoUrl
const vaRegex = /(\{\s*id:\s*\d+,[\s\S]*?nombre:\s*['"]([^'"]+)['"][\s\S]*?imagen:\s*['"][^'"]*['"])([\s\S]*?)(\})/g

vasDataContent = vasDataContent.replace(vaRegex, (match, before, vaName, middle, after) => {
  // Check if videoUrl already exists
  if (middle.includes('videoUrl:')) {
    return match
  }
  
  // Find matching video URL
  let videoUrl = null
  
  // Try exact match
  if (videoMap[vaName]) {
    videoUrl = videoMap[vaName]
  } else {
    // Try with different name variations
    const variations = [
      vaName,
      vaName.replace(/\s+/g, ''),
      vaName.toLowerCase(),
      vaName.replace(/\s+/g, '-')
    ]
    
    for (const variation of variations) {
      for (const [key, url] of Object.entries(videoMap)) {
        if (key.toLowerCase() === variation.toLowerCase()) {
          videoUrl = url
          break
        }
      }
      if (videoUrl) break
    }
  }
  
  if (videoUrl) {
    updatedCount++
    // Add videoUrl before the closing brace
    return before + middle + `,\n    videoUrl: '${videoUrl}'` + after
  }
  
  return match
})

fs.writeFileSync(vasDataPath, vasDataContent, 'utf-8')
console.log(`✅ Updated vasData.js: Added ${updatedCount} video URLs\n`)

// Step 3: Update HTML grid files with video button handlers
console.log('🎬 Updating HTML grid files...\n')

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

  // For each VA in the video map, find and update the button
  Object.entries(videoMap).forEach(([vaName, videoUrl]) => {
    // Find the VA card by name and update the video button
    
    // Create regex to find the VA card with the name
    const cardPattern = new RegExp(
      `(<div class="va-grid-card-name">[\\s\\S]*?${vaName}[\\s\\S]*?</div>)[\\s\\S]*?(<button class="va-grid-btn-secondary" title="Watch Video">▶</button>)`,
      'i'
    )
    
    if (cardPattern.test(content)) {
      // Replace the button with one that has onclick handler
      const replacement = `$1</div>\n          <button class="va-grid-btn-secondary" title="Watch Video" onclick="window.open('${videoUrl}', '_blank')">▶</button>`
      content = content.replace(cardPattern, replacement)
      updatedCount++
    }
  })

  if (updatedCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf-8')
    console.log(`✅ ${filePath}: Updated ${updatedCount} video buttons`)
    totalUpdated += updatedCount
  } else {
    console.log(`⚠️  ${filePath}: No updates made`)
  }
})

console.log(`\n🎉 Done! Updated ${totalUpdated} video buttons total.\n`)
console.log('📝 Next steps:')
console.log('1. Review the changes in vasData.js and HTML files')
console.log('2. Commit: git add -A && git commit -m "feat: Add video URLs to VA cards"')
console.log('3. Push: git push origin feature/webflow-code-components')
console.log('4. Test in Webflow\n')
