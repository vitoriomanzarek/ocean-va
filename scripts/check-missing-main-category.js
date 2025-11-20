#!/usr/bin/env node

/**
 * Script to check which VAs are missing mainCategory field
 * 
 * Usage: node scripts/check-missing-main-category.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 Checking for missing mainCategory fields...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
const content = fs.readFileSync(vasDataPath, 'utf-8')

// Parse VA blocks
const vaRegex = /{\s*id:\s*(\d+),\s*nombre:\s*"([^"]+)"[\s\S]*?(?=\n  \},|\n\];)/g
let match
const missingMainCategory = []
const withMainCategory = []

while ((match = vaRegex.exec(content)) !== null) {
  const id = match[1]
  const nombre = match[2]
  const vaBlock = match[0]
  
  if (vaBlock.includes('mainCategory:')) {
    withMainCategory.push({ id, nombre })
  } else {
    missingMainCategory.push({ id, nombre })
  }
}

console.log(`✅ VAs with mainCategory: ${withMainCategory.length}`)
console.log(`❌ VAs missing mainCategory: ${missingMainCategory.length}\n`)

if (missingMainCategory.length > 0) {
  console.log('VAs MISSING mainCategory:\n')
  missingMainCategory.forEach(va => {
    console.log(`  - ${va.nombre} (ID: ${va.id})`)
  })
  console.log()
}

console.log(`Total VAs: ${withMainCategory.length + missingMainCategory.length}`)
