#!/usr/bin/env node

/**
 * Script to add mainCategory field to vasData.js
 * Maps categoría_principal to mainCategory for Webflow
 * 
 * Usage: node scripts/add-main-category-to-vasdata.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Adding mainCategory field to vasData.js...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// Map to track which VAs we've updated
let updated = 0
let lines = content.split('\n')
let result = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  result.push(line)
  
  // Look for categoría_principal line
  if (line.includes('categoría_principal:')) {
    // Extract the value
    const match = line.match(/categoría_principal:\s*"([^"]+)"/)
    if (match) {
      const category = match[1]
      
      // Find the next line that's not empty and add mainCategory before it
      let j = i + 1
      while (j < lines.length && lines[j].trim() === '') {
        result.push(lines[j])
        j++
      }
      
      // Add mainCategory field
      const indent = line.match(/^\s*/)[0]
      result.push(`${indent}mainCategory: "${category}",`)
      
      updated++
      
      // Skip the empty lines we already added
      i = j - 1
    }
  }
}

// Write back
fs.writeFileSync(vasDataPath, result.join('\n'))

console.log(`✅ Updated ${updated} VAs with mainCategory field\n`)

// Verify
const updatedContent = fs.readFileSync(vasDataPath, 'utf-8')
const mainCategoryCount = (updatedContent.match(/mainCategory:/g) || []).length

console.log(`📈 Verification:`)
console.log(`  - Total VAs with mainCategory: ${mainCategoryCount}`)
console.log(`  - Expected: ${updated}`)
console.log(`  - Status: ${mainCategoryCount === updated ? '✅ OK' : '❌ MISMATCH'}\n`)

console.log('✅ vasData.js updated successfully!')
