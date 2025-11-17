#!/usr/bin/env node

/**
 * Script to import VA data into Webflow CMS - WORKING VERSION
 * Uses correct API format discovered through testing
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/import-vas-working.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

const COLLECTION_ID = '691b82a97542c69f3f77fa76'
const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN not set')
  process.exit(1)
}

console.log('🚀 Importing VAs to Webflow CMS (WORKING VERSION)...\n')

// Load VA data
const vasDataPath = path.join(rootDir, 'src', 'data', 'vasData.js')
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')
const vasDataMatch = vasDataContent.match(/export const vasData = \[([\s\S]*)\]/)

let vasData = []
try {
  const arrayContent = '[' + vasDataMatch[1] + ']'
  vasData = eval('(' + arrayContent + ')')
} catch (e) {
  console.error('❌ Error parsing vasData:', e.message)
  process.exit(1)
}

console.log(`✅ Loaded ${vasData.length} VAs\n`)

async function apiCall(method, endpoint, body = null) {
  const url = `https://api.webflow.com/v2${endpoint}`
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept-Version': '2.0'
    }
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
  }

  return data
}

async function main() {
  console.log('📝 Importing items...\n')
  let imported = 0
  let errors = 0
  let skipped = 0

  for (const va of vasData) {
    try {
      // Simple format - just use field names as keys
      const fieldData = {
        'name': va.nombre || '',
        'title': 'Insurance Virtual Assistant',
        'experience-years': va.años_experiencia ? `${va.años_experiencia} years` : 'Trained',
        'languages': va.idiomas || '',
        'specializations': va.especialización ? va.especialización.join(', ') : '',
        'availability': va.disponibilidad || va.categorías?.[0] || '',
        'image-url': va.imagen || '',
        'video-url': va.videoUrl || '',
        'video-thumbnail': va.videoThumbnail || '',
        'summary': va.summary || '',
        'tagline': va.tagline || '',
        'thumbnail-description': va.thumbnail || '',
        'profile-slug': va.slug || ''
      }

      const itemBody = { fieldData }

      await apiCall('POST', `/collections/${COLLECTION_ID}/items`, itemBody)
      imported++
      console.log(`  ✅ ${va.nombre}`)
    } catch (error) {
      if (error.message.includes('409')) {
        skipped++
        console.log(`  ⏭️  ${va.nombre}: Already exists`)
      } else {
        errors++
        console.log(`  ⚠️  ${va.nombre}: ${error.message}`)
      }
    }
  }

  console.log(`\n📊 Results:`)
  console.log(`  ✅ Imported: ${imported}`)
  console.log(`  ⏭️  Skipped: ${skipped}`)
  console.log(`  ⚠️  Errors: ${errors}`)
  console.log(`  📈 Total: ${imported + skipped + errors}/${vasData.length}\n`)

  if (imported > 0 || skipped > 0) {
    console.log('🎉 Success!\n')
    console.log('📝 Next Steps:')
    console.log('  1. Go to Webflow Designer')
    console.log('  2. Navigate to Collections → Virtual Assistants')
    console.log('  3. Verify items were imported')
    console.log('  4. Create dynamic page template')
    console.log('  5. Design VA cards')
  }
}

main()
