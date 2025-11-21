#!/usr/bin/env node

/**
 * Script to populate the "Main Categories" multi-reference field in VA CSV
 * Maps plain text "Main Category" to slug format in "Main Categories"
 * 
 * Usage: node scripts/populate-main-categories-field.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Populating Main Categories Multi-Reference Field...\n')

// Read Main Categories CSV to build mapping
const mainCatCsvPath = path.join(__dirname, '../src/data/VAs Database - Main Categories.csv')
const mainCatContent = fs.readFileSync(mainCatCsvPath, 'utf-8')
const mainCatLines = mainCatContent.split('\n').slice(1).filter(l => l.trim())

const categoryMapping = new Map() // Map of name -> slug
mainCatLines.forEach(line => {
  const [name, slug] = line.split(',').map(s => s.trim())
  categoryMapping.set(name, slug)
})

console.log(`📊 Category Mapping Loaded: ${categoryMapping.size} categories\n`)

// Read VA CSV
const vasCsvPath = path.join(__dirname, '../src/data/VAs Database - VA Merged with licenced VA.csv')
const vasContent = fs.readFileSync(vasCsvPath, 'utf-8')
const vasLines = vasContent.split('\n')

// Parse header to find column indices
const headerLine = vasLines[0]
const header = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''))
const mainCategoryIdx = header.indexOf('Main Category')
const mainCategoriesIdx = header.indexOf('Main Categories')

console.log(`📋 Column Indices:`)
console.log(`  Main Category (plain text): ${mainCategoryIdx}`)
console.log(`  Main Categories (multi-ref): ${mainCategoriesIdx}\n`)

if (mainCategoryIdx === -1 || mainCategoriesIdx === -1) {
  console.error('❌ Error: Could not find required columns')
  console.error('Available columns:', header)
  process.exit(1)
}

// Process each VA row
let updated = 0
let errors = 0
const updatedLines = [vasLines[0]] // Keep header

for (let i = 1; i < vasLines.length; i++) {
  if (!vasLines[i].trim()) continue
  
  const line = vasLines[i]
  const parts = line.split(',')
  
  if (parts.length <= mainCategoryIdx) {
    updatedLines.push(line)
    continue
  }
  
  const mainCat = parts[mainCategoryIdx].trim().replace(/^"|"$/g, '')
  
  if (!mainCat) {
    updatedLines.push(line)
    continue
  }
  
  // Handle multiple categories separated by comma
  const categories = mainCat.split(';').map(c => c.trim())
  const slugs = []
  
  categories.forEach(cat => {
    if (categoryMapping.has(cat)) {
      slugs.push(categoryMapping.get(cat))
    } else {
      console.warn(`⚠️  Warning: Category not found: "${cat}"`)
      errors++
    }
  })
  
  // Update the Main Categories field
  parts[mainCategoriesIdx] = slugs.join('; ')
  
  updatedLines.push(parts.join(','))
  updated++
}

// Write back
const newContent = updatedLines.join('\n')
fs.writeFileSync(vasCsvPath, newContent)

console.log(`✅ Updated ${updated} VA records`)
if (errors > 0) {
  console.log(`⚠️  ${errors} warnings`)
}

// Show sample
console.log(`\n📋 Sample Updates:`)
const samples = updatedLines.slice(1, 6)
samples.forEach((line, idx) => {
  const parts = line.split(',')
  const name = parts[0]
  const mainCat = parts[mainCategoryIdx]
  const mainCats = parts[mainCategoriesIdx]
  console.log(`  ${name}: "${mainCat}" → "${mainCats}"`)
})

console.log(`\n✅ Done!`)
