#!/usr/bin/env node

/**
 * Script to import VA data into Copy of Ocean VA Webflow CMS
 * Collection ID: 691b83c16a1da497c17e41bb
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/import-vas-copy-site.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

const COLLECTION_ID = '691b83c16a1da497c17e41bb'
const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN not set')
  process.exit(1)
}

// Field ID mapping
const fieldMap = {
  'name': 'a44bf3a5bc4aab108c5dd3ba1cde4f4d',
  'experience': '85e90687b87582253b71a5a5ba325eecb8',
  'languages': '482c279bb7ca9935efdf412595fc4ad0',
  'specializations': 'ebbff3eba8b550c960e56c95f1695c80',
  'availability': '887066db58860bac038cfa6a933a786c',
  'image-url': '57e1c15ba4007de91eefa65e9ba9a644',
  'video-url': '93f47bdf85a0ba11ba650470ab8be799',
  'video-thumbnail': '87a9dfbca7b2e402af28ea36709981eb',
  'summary': 'ad17bd91d1fd027856921cc7d938143b',
  'tagline': '4417b3c76bf7aa6b23726fc3c5f5ddb7',
  'thumbnail-description': '404819441483e32e3047df0711effbf',
  'profile-slug': '652ea874da9234b530964acddaa27528'
}

console.log('🚀 Importing VAs to Copy of Ocean VA...\n')

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

  for (const va of vasData) {
    try {
      const fieldData = {}
      
      // Map VA data to field IDs
      // All fields must be present in fieldData
      fieldData['name'] = va.nombre || ''  // Use 'name' as key, not field ID
      fieldData[fieldMap.experience] = va.años_experiencia ? `${va.años_experiencia} years` : 'Trained'
      fieldData[fieldMap.languages] = va.idiomas || ''
      fieldData[fieldMap.specializations] = va.especialización ? va.especialización.join(', ') : ''
      fieldData[fieldMap.availability] = va.disponibilidad || va.categorías?.[0] || ''
      fieldData[fieldMap['image-url']] = va.imagen || ''
      fieldData[fieldMap['video-url']] = va.videoUrl || ''
      fieldData[fieldMap['video-thumbnail']] = va.videoThumbnail || ''
      fieldData[fieldMap.summary] = va.summary || ''
      fieldData[fieldMap.tagline] = va.tagline || ''
      fieldData[fieldMap['thumbnail-description']] = va.thumbnail || ''
      fieldData[fieldMap['profile-slug']] = va.slug || ''

      const itemBody = {
        fieldData
      }

      await apiCall('POST', `/collections/${COLLECTION_ID}/items`, itemBody)
      imported++
      console.log(`  ✅ ${va.nombre}`)
    } catch (error) {
      errors++
      console.log(`  ⚠️  ${va.nombre}: ${error.message}`)
    }
  }

  console.log(`\n✅ Imported ${imported}/${vasData.length} VAs (${errors} errors)\n`)
  console.log('🎉 Done!\n')
  console.log('📝 Next Steps:')
  console.log('  1. Go to Webflow Designer (Copy of Ocean VA)')
  console.log('  2. Navigate to Collections')
  console.log('  3. Find "Virtual Assistants" collection')
  console.log('  4. Verify all items were imported')
  console.log('  5. Create dynamic page or template')
  console.log('  6. Design your VA cards')
}

main()
