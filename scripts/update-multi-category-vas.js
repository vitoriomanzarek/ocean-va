#!/usr/bin/env node

/**
 * Script to update mainCategory for VAs with multiple categories
 * Combines multiple main categories with commas
 * 
 * Usage: node scripts/update-multi-category-vas.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Updating mainCategory for VAs with multiple categories...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// VAs that need multiple main categories
const multiCategoryVAs = {
  'Joana': 'Executive Virtual Assistant, Insurance Virtual Assistant',
  'Abigail': 'Executive Virtual Assistant, Insurance Virtual Assistant',
  'Jasmine': 'Executive Virtual Assistant, Healthcare Virtual Assistant, Insurance Virtual Assistant',
  'Jill': 'Executive Virtual Assistant, Insurance Virtual Assistant',
  'Pavel': 'Insurance Virtual Assistant, Marketing Virtual Assistant',
  'Ana': 'Executive Virtual Assistant, Insurance Virtual Assistant',
  'Balbina': 'Executive Virtual Assistant, Insurance Virtual Assistant',
  'Fernanda': 'Insurance Virtual Assistant, Marketing Virtual Assistant',
  'Janice': 'Executive Virtual Assistant, Insurance Virtual Assistant',
  'Kevin': 'Insurance Virtual Assistant, Marketing Virtual Assistant',
  'Lois': 'Insurance Virtual Assistant, Marketing Virtual Assistant',
  'Maria': 'Insurance Virtual Assistant, Marketing Virtual Assistant'
}

let updateCount = 0

// For each VA, find and update their mainCategory
Object.entries(multiCategoryVAs).forEach(([vaName, mainCategories]) => {
  // Find the VA block and update mainCategory
  const vaPattern = new RegExp(
    `(nombre:\\s*"${vaName}"[\\s\\S]*?mainCategory:\\s*)"[^"]*"`,
    'g'
  )
  
  if (vaPattern.test(content)) {
    content = content.replace(
      vaPattern,
      `$1"${mainCategories}"`
    )
    updateCount++
    console.log(`✅ ${vaName}: "${mainCategories}"`)
  } else {
    console.log(`⚠️  ${vaName}: mainCategory field not found or pattern mismatch`)
  }
})

// Write back
fs.writeFileSync(vasDataPath, content)

console.log(`\n✅ Updated ${updateCount} VAs with multiple main categories\n`)

console.log('✅ Done!')
