#!/usr/bin/env node

/**
 * Script to convert categoría_principal from string to array
 * Prepares vasData.js for multi-reference field
 * 
 * Usage: node scripts/convert-main-category-to-array.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Converting categoría_principal to array format...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// Replace categoría_principal: "string" with categoría_principal: ["string"]
const regex = /categoría_principal:\s*"([^"]+)"/g
let count = 0

content = content.replace(regex, (match, category) => {
  count++
  return `categoría_principal: ["${category}"]`
})

// Write back
fs.writeFileSync(vasDataPath, content)

console.log(`✅ Conversion complete!\n`)
console.log(`📊 Updated ${count} VAs\n`)

// Verify
const updatedContent = fs.readFileSync(vasDataPath, 'utf-8')
const arrayCount = (updatedContent.match(/categoría_principal:\s*\[/g) || []).length

console.log(`📈 Verification:`)
console.log(`  - Total VAs with array format: ${arrayCount}`)
console.log(`  - Expected: ${count}`)
console.log(`  - Status: ${arrayCount === count ? '✅ OK' : '❌ MISMATCH'}\n`)

console.log('✅ vasData.js updated successfully!')
