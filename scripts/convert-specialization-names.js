#!/usr/bin/env node

/**
 * Script to convert Specialization CSV names from slug format to Title Case
 * Converts: "auto-insurance" → "Auto Insurance"
 * Keeps: slug field unchanged
 * 
 * Usage: node scripts/convert-specialization-names.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Converting Specialization names to Title Case...\n')

const csvPath = path.join(__dirname, '../src/data/VAs Database - Specialization.csv')

// Read CSV
const content = fs.readFileSync(csvPath, 'utf-8')
const lines = content.split('\n')

// Helper function to convert slug to Title Case
function slugToTitleCase(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Process lines
const processedLines = lines.map((line, index) => {
  // Skip header
  if (index === 0) {
    return line
  }
  
  // Skip empty lines
  if (!line.trim()) {
    return line
  }
  
  // Split by comma
  const parts = line.split(',')
  if (parts.length < 2) {
    return line
  }
  
  const slug = parts[1].trim()
  const titleCase = slugToTitleCase(slug)
  
  return `${titleCase},${slug}`
})

// Write back
const newContent = processedLines.join('\n')
fs.writeFileSync(csvPath, newContent)

console.log(`✅ Conversion complete!\n`)

// Show sample
console.log('📋 Sample conversions:')
const samples = [
  'auto-insurance',
  'executive-assistant',
  'health-insurance',
  'commercial-&-general-liability-insurance',
  'home-&-auto-insurance'
]

samples.forEach(slug => {
  const titleCase = slugToTitleCase(slug)
  console.log(`  ${slug} → ${titleCase}`)
})

console.log('\n✅ Done!')
