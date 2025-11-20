#!/usr/bin/env node

/**
 * Script to fix categoría_principal format
 * Converts arrays to strings
 * 
 * Usage: node scripts/fix-categoria-principal-format.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔧 Fixing categoría_principal format...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// Fix: categoría_principal: ["..."] → categoría_principal: "..."
const regex = /categoría_principal:\s*\["([^"]+)"\]/g
let count = 0

content = content.replace(regex, (match, category) => {
  count++
  return `categoría_principal: "${category}"`
})

// Write back
fs.writeFileSync(vasDataPath, content)

console.log(`✅ Fixed ${count} VAs with array format\n`)

// Verify
const updatedContent = fs.readFileSync(vasDataPath, 'utf-8')
const arrayCount = (updatedContent.match(/categoría_principal:\s*\[/g) || []).length
const stringCount = (updatedContent.match(/categoría_principal:\s*"/g) || []).length

console.log(`📈 Verification:`)
console.log(`  - categoría_principal as arrays: ${arrayCount}`)
console.log(`  - categoría_principal as strings: ${stringCount}`)
console.log(`  - Status: ${arrayCount === 0 ? '✅ OK' : '❌ MISMATCH'}\n`)

console.log('✅ Format fixed successfully!')
