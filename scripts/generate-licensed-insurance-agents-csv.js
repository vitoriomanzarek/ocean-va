#!/usr/bin/env node

/**
 * Script to generate CSV with Licensed Insurance Agents from Webflow page
 * Extracts VA names from the page and matches them with vasData.js
 * 
 * Usage: node scripts/generate-licensed-insurance-agents-csv.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Generating CSV for Licensed Insurance Agents from Webflow page...\n')

// Import vasData
const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
const vasDataModule = await import(`file://${vasDataPath}`)
const vasData = vasDataModule.vasData

// VAs from the Webflow page (Licensed Insurance Agents)
const pageVANames = [
  // BILINGUAL ENGLISH-SPANISH INSURANCE AGENTS
  'Jeanette',
  'Jose',
  'Kevin S.',
  'Leah',
  'Liliana',
  'Maria R.',
  // ENGLISH-SPEAKING INSURANCE AGENTS
  'Amber',
  'Anthony',
  'Autumn',
  'Carlo',
  'Christopher',
  'Erika',
  'Jalil',
  'Janki',
  'John',
  'Julie',
  'Katie',
  'Kelly',
  'Laketha',
  'Laura',
  'Lucas',
  'Luke',
  'Mary',
  'Patti',
  'Sarah',
  'Stephanie',
  'Tina',
  'Todd',
  'Tyneisha'
]

console.log(`✅ Found ${pageVANames.length} VAs in the page\n`)

// Match VAs from page with vasData
const pageVAs = []
const notFound = []

pageVANames.forEach(name => {
  const va = vasData.find(v => 
    v.nombre.toLowerCase() === name.toLowerCase() ||
    v.nombre.toLowerCase().includes(name.toLowerCase())
  )
  
  if (va) {
    pageVAs.push(va)
  } else {
    notFound.push(name)
  }
})

console.log(`✅ Matched: ${pageVAs.length} VAs`)
if (notFound.length > 0) {
  console.log(`⚠️  Not found: ${notFound.length}`)
  notFound.forEach(name => console.log(`   - ${name}`))
}
console.log()

// Prepare CSV headers
const headers = [
  'ID',
  'Nombre',
  'Categoría Principal',
  'Main Category',
  'Idiomas',
  'Años Experiencia',
  'Nivel Inglés',
  'Disponibilidad',
  'Especialización',
  'Slug',
  'Imagen',
  'Video URL',
  'YouTube URL'
]

// Prepare CSV rows
const rows = pageVAs.map(va => [
  va.id,
  va.nombre,
  va.categoría_principal,
  va.mainCategory || '',
  va.idiomas,
  va.años_experiencia || '',
  va.nivel_inglés,
  va.disponibilidad,
  Array.isArray(va.especialización) ? va.especialización.join('; ') : va.especialización,
  va.slug,
  va.imagen,
  va.videoUrl || '',
  va.youtubeUrl || ''
])

// Create CSV content
const csvContent = [
  headers.join(','),
  ...rows.map(row => 
    row.map(cell => {
      // Escape quotes and wrap in quotes if contains comma
      const cellStr = String(cell || '')
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`
      }
      return cellStr
    }).join(',')
  )
].join('\n')

// Write CSV file
const outputPath = path.join(__dirname, '../reports/licensed-insurance-agents-page.csv')
const reportsDir = path.dirname(outputPath)

// Create reports directory if it doesn't exist
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true })
}

fs.writeFileSync(outputPath, csvContent)

console.log(`✅ CSV generated successfully!\n`)
console.log(`📁 File: ${outputPath}`)
console.log(`📊 Rows: ${rows.length}`)
console.log(`📋 Columns: ${headers.length}\n`)

console.log('✅ Done!')
