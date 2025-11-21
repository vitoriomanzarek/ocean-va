#!/usr/bin/env node

/**
 * Script to analyze Main Categories mapping between VA CSV and Main Categories CSV
 * Identifies which main categories exist and which need to be populated
 * 
 * Usage: node scripts/analyze-main-categories-mapping.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 Analyzing Main Categories Mapping...\n')

// Simple CSV parser
function parseCSV(content) {
  const lines = content.split('\n')
  const header = lines[0].split(',').map(h => h.trim())
  const records = []
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    const values = lines[i].split(',').map(v => v.trim())
    const record = {}
    header.forEach((h, idx) => {
      record[h] = values[idx] || ''
    })
    records.push(record)
  }
  
  return records
}

// Read VA CSV
const vasCsvPath = path.join(__dirname, '../src/data/VAs Database - VA Merged with licenced VA.csv')
const vasContent = fs.readFileSync(vasCsvPath, 'utf-8')
const vasRecords = parseCSV(vasContent)

// Read Main Categories CSV
const mainCatCsvPath = path.join(__dirname, '../src/data/VAs Database - Main Categories.csv')
const mainCatContent = fs.readFileSync(mainCatCsvPath, 'utf-8')
const mainCatRecords = parseCSV(mainCatContent)

console.log(`📊 VA CSV: ${vasRecords.length} VAs`)
console.log(`📊 Main Categories CSV: ${mainCatRecords.length} categories\n`)

// Extract main categories from VA CSV
const mainCategoriesFromVAs = new Map() // Map of category name -> count
const mainCategoriesMultiRef = new Map() // Map of category name -> slug

vasRecords.forEach(va => {
  const mainCat = va['Main Category']
  const mainCatMultiRef = va['Main Categories']
  
  if (mainCat) {
    // Handle multiple categories separated by comma
    const categories = mainCat.split(',').map(c => c.trim())
    categories.forEach(cat => {
      const count = mainCategoriesFromVAs.get(cat) || 0
      mainCategoriesFromVAs.set(cat, count + 1)
    })
  }
  
  if (mainCatMultiRef) {
    mainCategoriesMultiRef.set(mainCat, mainCatMultiRef)
  }
})

// Extract from Main Categories CSV
const csvCategories = new Map() // Map of name -> slug
mainCatRecords.forEach(record => {
  if (record.Name && record.Slug) {
    csvCategories.set(record.Name, record.Slug)
  }
})

console.log(`📈 Unique Main Categories in VA CSV: ${mainCategoriesFromVAs.size}`)
console.log(`📈 Main Categories in Main Categories CSV: ${csvCategories.size}\n`)

// Compare
const found = []
const missing = []

mainCategoriesFromVAs.forEach((count, name) => {
  if (csvCategories.has(name)) {
    found.push({ name, count, slug: csvCategories.get(name) })
  } else {
    missing.push({ name, count })
  }
})

found.sort((a, b) => b.count - a.count)
missing.sort((a, b) => b.count - a.count)

console.log(`✅ FOUND IN CSV: ${found.length}`)
found.forEach(({ name, count, slug }) => {
  console.log(`  - "${name}" (${count} VAs) → slug: ${slug}`)
})

if (missing.length > 0) {
  console.log(`\n❌ MISSING FROM CSV: ${missing.length}`)
  missing.forEach(({ name, count }) => {
    console.log(`  - "${name}" (${count} VAs)`)
  })
} else {
  console.log(`\n✅ All main categories are in CSV!`)
}

// Analyze Multi-Reference field
console.log(`\n📋 MULTI-REFERENCE FIELD ANALYSIS:`)
const multiRefValues = new Map()
vasRecords.forEach(va => {
  const multiRef = va['Main Categories']
  if (multiRef) {
    const count = multiRefValues.get(multiRef) || 0
    multiRefValues.set(multiRef, count + 1)
  }
})

console.log(`  Unique values in "Main Categories" field: ${multiRefValues.size}`)
console.log(`  Values:`)
Array.from(multiRefValues.entries())
  .sort((a, b) => b[1] - a[1])
  .forEach(([value, count]) => {
    console.log(`    - "${value}" (${count} VAs)`)
  })

console.log(`\n✅ Analysis complete!`)
