#!/usr/bin/env node

/**
 * Script to analyze specialization mapping between vasData.js and CSV
 * Identifies which specializations exist in vasData and which are missing from CSV
 * 
 * Usage: node scripts/analyze-specialization-mapping.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 Analyzing Specialization Mapping...\n')

// Import vasData
const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
const vasDataModule = await import(`file://${vasDataPath}`)
const vasData = vasDataModule.vasData

// Read CSV
const csvPath = path.join(__dirname, '../src/data/VAs Database - Specialization.csv')
const csvContent = fs.readFileSync(csvPath, 'utf-8')
const csvLines = csvContent.split('\n').slice(1) // Skip header
const csvSpecializations = new Set(
  csvLines
    .filter(line => line.trim())
    .map(line => line.split(',')[0].trim())
)

console.log(`📊 CSV Specializations: ${csvSpecializations.size}\n`)

// Extract all specializations from vasData
const vasSpecializations = new Map() // Map of specialization -> count
const vasSpecializationsByVA = new Map() // Map of VA name -> specializations

vasData.forEach(va => {
  if (va.especialización && Array.isArray(va.especialización)) {
    vasSpecializationsByVA.set(va.nombre, va.especialización)
    
    va.especialización.forEach(spec => {
      const count = vasSpecializations.get(spec) || 0
      vasSpecializations.set(spec, count + 1)
    })
  }
})

console.log(`📈 Specializations in vasData: ${vasSpecializations.size}\n`)

// Find missing specializations
const missingSpecializations = []
const foundSpecializations = []

vasSpecializations.forEach((count, spec) => {
  if (csvSpecializations.has(spec)) {
    foundSpecializations.push({ spec, count })
  } else {
    missingSpecializations.push({ spec, count })
  }
})

// Sort by frequency
foundSpecializations.sort((a, b) => b.count - a.count)
missingSpecializations.sort((a, b) => b.count - a.count)

console.log(`✅ FOUND IN CSV: ${foundSpecializations.length}`)
console.log(`❌ MISSING FROM CSV: ${missingSpecializations.length}\n`)

if (missingSpecializations.length > 0) {
  console.log('🔴 MISSING SPECIALIZATIONS (need to add to CSV):\n')
  missingSpecializations.forEach(({ spec, count }) => {
    console.log(`  - "${spec}" (used by ${count} VA${count > 1 ? 's' : ''})`)
  })
  console.log()
}

// Generate CSV lines for missing specializations
if (missingSpecializations.length > 0) {
  console.log('📝 CSV LINES TO ADD:\n')
  missingSpecializations.forEach(({ spec }) => {
    const slug = spec
      .toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .replace(/&/g, '&')
    console.log(`${spec},${slug}`)
  })
  console.log()
}

// Summary
console.log('📋 SUMMARY:')
console.log(`  Total VAs: ${vasData.length}`)
console.log(`  Total specializations in vasData: ${vasSpecializations.size}`)
console.log(`  Total specializations in CSV: ${csvSpecializations.size}`)
console.log(`  Coverage: ${((foundSpecializations.length / vasSpecializations.size) * 100).toFixed(1)}%`)
console.log()

// Show some examples
console.log('📌 EXAMPLE VA SPECIALIZATIONS:')
const examples = Array.from(vasSpecializationsByVA.entries()).slice(0, 5)
examples.forEach(([name, specs]) => {
  console.log(`  ${name}: ${specs.join(', ')}`)
})

console.log('\n✅ Analysis complete!')
