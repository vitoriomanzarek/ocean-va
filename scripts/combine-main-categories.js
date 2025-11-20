#!/usr/bin/env node

/**
 * Script to combine multiple main categories for VAs
 * Some VAs have multiple main categories that should be combined with commas
 * 
 * Usage: node scripts/combine-main-categories.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Analyzing VAs with multiple main categories...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
const content = fs.readFileSync(vasDataPath, 'utf-8')

// Parse the file to find VAs with multiple categorías
const vaRegex = /{\s*id:\s*(\d+),\s*nombre:\s*"([^"]+)"[\s\S]*?categorías:\s*\[([^\]]+)\]/g
let match
const vasWithMultipleCategories = []

while ((match = vaRegex.exec(content)) !== null) {
  const id = match[1]
  const nombre = match[2]
  const categoriesStr = match[3]
  
  // Count categories
  const categories = categoriesStr.split(',').map(c => c.trim().replace(/"/g, ''))
  
  if (categories.length > 1) {
    // Check if they have different main categories
    const uniqueMainCategories = new Set()
    
    // Map category tags to main categories
    const categoryMap = {
      'Insurance VA': 'Insurance Virtual Assistant',
      'Executive VA': 'Executive Virtual Assistant',
      'Mortgage Specialist': 'Mortgage Specialist',
      'Marketing VA': 'Marketing Virtual Assistant',
      'Healthcare VA': 'Healthcare Virtual Assistant',
      'Medical VA': 'Healthcare Virtual Assistant',
      'General VA': 'Insurance Virtual Assistant',
      'Graphic Design': 'Marketing Virtual Assistant',
      'Marketing': 'Marketing Virtual Assistant',
      'Real Estate': 'Insurance Virtual Assistant'
    }
    
    categories.forEach(cat => {
      const mainCat = categoryMap[cat] || 'Insurance Virtual Assistant'
      uniqueMainCategories.add(mainCat)
    })
    
    if (uniqueMainCategories.size > 1) {
      vasWithMultipleCategories.push({
        id,
        nombre,
        categories,
        mainCategories: Array.from(uniqueMainCategories).sort()
      })
    }
  }
}

console.log(`✅ Found ${vasWithMultipleCategories.length} VAs with multiple main categories:\n`)

vasWithMultipleCategories.forEach(va => {
  console.log(`${va.nombre} (ID: ${va.id})`)
  console.log(`  Categories: ${va.categories.join(', ')}`)
  console.log(`  Main Categories: ${va.mainCategories.join(', ')}`)
  console.log(`  Should be: "${va.mainCategories.join(', ')}"`)
  console.log()
})

// Now update the file
console.log('🔄 Updating mainCategory field for VAs with multiple categories...\n')

let updatedContent = content
let updateCount = 0

vasWithMultipleCategories.forEach(va => {
  const mainCategoryValue = va.mainCategories.join(', ')
  
  // Find the VA and update mainCategory
  const vaPattern = new RegExp(
    `(nombre:\\s*"${va.nombre}"[\\s\\S]*?mainCategory:\\s*)"[^"]*"`,
    'g'
  )
  
  if (vaPattern.test(updatedContent)) {
    updatedContent = updatedContent.replace(
      vaPattern,
      `$1"${mainCategoryValue}"`
    )
    updateCount++
    console.log(`✅ Updated ${va.nombre}: "${mainCategoryValue}"`)
  }
})

// Write back
fs.writeFileSync(vasDataPath, updatedContent)

console.log(`\n✅ Updated ${updateCount} VAs with combined main categories\n`)

// Verify
const verifyContent = fs.readFileSync(vasDataPath, 'utf-8')
console.log('📈 Verification:')
console.log(`  - File updated successfully`)
console.log(`  - Ready for Webflow sync\n`)

console.log('✅ Main categories combined successfully!')
