#!/usr/bin/env node

/**
 * Script to add missing mainCategory field to VAs
 * 
 * Usage: node scripts/add-missing-main-category.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Adding missing mainCategory fields...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// VAs that need mainCategory added
const vasToUpdate = {
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

// For each VA, find and add mainCategory after categoría_principal
Object.entries(vasToUpdate).forEach(([vaName, mainCategories]) => {
  // Pattern to find the VA and insert mainCategory after categoría_principal
  const pattern = new RegExp(
    `(nombre:\\s*"${vaName}"[\\s\\S]*?categoría_principal:\\s*"[^"]*",)`,
    'g'
  )
  
  if (pattern.test(content)) {
    content = content.replace(
      pattern,
      `$1\n    mainCategory: "${mainCategories}",`
    )
    updateCount++
    console.log(`✅ ${vaName}: Added mainCategory`)
  }
})

// Write back
fs.writeFileSync(vasDataPath, content)

console.log(`\n✅ Added mainCategory to ${updateCount} VAs\n`)

console.log('✅ Done!')
