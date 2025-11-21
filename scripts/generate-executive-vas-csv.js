#!/usr/bin/env node

/**
 * Script to generate CSV with all Executive VAs from vasData.js
 * 
 * Usage: node scripts/generate-executive-vas-csv.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Generating Executive VAs CSV...\n')

// Import vasData
const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
const vasDataModule = await import(`file://${vasDataPath}`)
const vasData = vasDataModule.vasData

// Filter Executive VAs
const executiveVAs = vasData.filter(va => 
  va.categoría_principal === 'Executive Virtual Assistant' ||
  (va.mainCategory && va.mainCategory.includes('Executive Virtual Assistant'))
)

console.log(`✅ Found ${executiveVAs.length} Executive VAs\n`)

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
const rows = executiveVAs.map(va => [
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
const outputPath = path.join(__dirname, '../reports/executive-vas.csv')
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
