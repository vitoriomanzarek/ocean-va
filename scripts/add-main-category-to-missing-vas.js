#!/usr/bin/env node

/**
 * Script to add mainCategory to VAs that are missing it
 * 
 * Usage: node scripts/add-main-category-to-missing-vas.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Adding mainCategory to missing VAs...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// VAs missing mainCategory
const missingVAs = [
  'Maria Paula',
  'Ana Gabriela',
  'Angel',
  'Branko',
  'Fabiola',
  'Gael',
  'Hugo',
  'Jomer',
  'Jose Luis',
  'Marco',
  'Patricio',
  'Samantha',
  'Ximena',
  'Joan Rose',
  'Joy',
  'Jane',
  'Maridel'
]

let updateCount = 0

// For each VA, find their categoría_principal and add mainCategory
missingVAs.forEach(vaName => {
  // Find the VA and extract categoría_principal
  const vaPattern = new RegExp(
    `(nombre:\\s*"${vaName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?categoría_principal:\\s*)"([^"]+)"`,
    'g'
  )
  
  if (vaPattern.test(content)) {
    const match = content.match(vaPattern)
    if (match) {
      // Extract the category value
      const categoryMatch = match[0].match(/categoría_principal:\s*"([^"]+)"/)
      if (categoryMatch) {
        const category = categoryMatch[1]
        
        // Now add mainCategory after categoría_principal
        const insertPattern = new RegExp(
          `(nombre:\\s*"${vaName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?categoría_principal:\\s*"[^"]*",)`,
          'g'
        )
        
        if (insertPattern.test(content)) {
          content = content.replace(
            insertPattern,
            `$1\n    mainCategory: "${category}",`
          )
          updateCount++
          console.log(`✅ ${vaName}: Added mainCategory: "${category}"`)
        }
      }
    }
  }
})

// Write back
fs.writeFileSync(vasDataPath, content)

console.log(`\n✅ Added mainCategory to ${updateCount} VAs\n`)

console.log('✅ Done!')
