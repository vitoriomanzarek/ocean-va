#!/usr/bin/env node

/**
 * Script to add missing specializations to the CSV
 * Converts specialization names to proper slug format
 * 
 * Usage: node scripts/add-missing-specializations.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Adding missing specializations to CSV...\n')

// Missing specializations from analysis
const missingSpecializations = [
  "State License - Multiple States",
  "State License - Florida",
  "State License - All States",
  "State License - Texas",
  "State License - Michigan",
  "Personal Lines, Home & Auto Insurance",
  "Medical Admin (HIPAA Compliant)",
  "U.S. Commercial Trucking Insurance",
  "U.S. Personal",
  "State License - Illinois",
  "Personal, Commercial & Health Insurance",
  "Property, Casualty, Life & Health Insurance",
  "Personal Lines, Auto & Home Insurance",
  "State License - Nebraska, Iowa",
  "State License - Oklahoma",
  "State License - Nebraska",
  "State License - Georgia",
  "Homeowners, Auto Insurance",
  "State License - California",
  "State License - Utah",
  "Auto, Umbrella, Secondary Homes, General Liability",
  "State License - CT, CA, MA",
  "Personal Lines, Auto Insurance",
  "State License - Alabama, Georgia",
  "Personal, Commercial Home, Motorcycle Insurance",
  "Auto, Home, Umbrella, Property, Commercial Building & Liability",
  "Auto, Home & Umbrella Insurance"
]

// Helper function to convert name to slug
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/&/g, '&') // Keep ampersand
}

// Read CSV
const csvPath = path.join(__dirname, '../src/data/VAs Database - Specialization.csv')
let content = fs.readFileSync(csvPath, 'utf-8')
const lines = content.split('\n')
const header = lines[0]

// Create new lines for missing specializations
const newLines = missingSpecializations.map(spec => {
  const slug = nameToSlug(spec)
  return `${spec},${slug}`
})

// Combine and sort
const allLines = [header, ...lines.slice(1).filter(l => l.trim()), ...newLines]
  .filter((line, index) => index === 0 || line.trim()) // Keep header and non-empty lines
  .sort((a, b) => {
    if (a === header) return -1 // Header first
    if (b === header) return 1
    return a.localeCompare(b) // Alphabetical sort
  })

// Write back
const newContent = allLines.join('\n')
fs.writeFileSync(csvPath, newContent)

console.log(`✅ Added ${missingSpecializations.length} missing specializations\n`)

// Verify
const updatedContent = fs.readFileSync(csvPath, 'utf-8')
const updatedLines = updatedContent.split('\n').filter(l => l.trim())

console.log(`📊 Updated CSV:`)
console.log(`  Total lines: ${updatedLines.length}`)
console.log(`  Header + Specializations: ${updatedLines.length - 1}\n`)

console.log('✅ Done!')
