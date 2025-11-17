#!/usr/bin/env node

/**
 * Script to import VA data into main Ocean VA Webflow CMS
 * Collection ID: 691b82a97542c69f3f77fa76
 * Site ID: 66e9b3f71eb321a17e92218a
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/import-vas-main-site.js
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

// Field ID mapping from main site (corrected)
const fieldMap = {
  'name': '5b1119ba28150b2faa93ad16dbad344f',
  'title': '3ac419cc62c2c8f5fa85fa441bacf3b7',
  'experience-years': '1cced435999cdc44f9004f7472fdc340',
  'languages': '9b3845e690d2bb02eb4cbcb49f6a82e8',
  'specializations': '337abe1c16b0297b16395cdaa814fbe1',
  'availability': '0d1c3a6fa67d6b46886de36165336c5d',
  'image-url': 'f3d80c6327bf4f61ed4a12891183f117',
  'video-url': '84a877fb015f489065a27196c183aea4',
  'video-thumbnail': '99ca9e697fe0d259d9f09c0f6bc5afb1',
  'summary': 'b3acf7488f08137bd61d7f9c05d7cceb',
  'tagline': 'b60126d1ba1fe7e2eda4efbbe42176c8',
  'thumbnail-description': 'b8f1627b40ddccc678b0720530981ecd',
  'profile-slug': '4bae06f1eaacf941945bc26b3694332c'
}

console.log('🚀 Importing VAs to main Ocean VA site...\n')

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
      fieldData['name'] = va.nombre || ''
      fieldData[fieldMap.title] = 'Insurance Virtual Assistant'
      fieldData[fieldMap['experience-years']] = va.años_experiencia ? `${va.años_experiencia} years` : 'Trained'
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

      const itemBody = { fieldData }

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
  console.log('  1. Go to Webflow Designer (Main Ocean VA site)')
  console.log('  2. Navigate to Collections')
  console.log('  3. Find "Virtual Assistants" collection')
  console.log('  4. Verify all items were imported')
  console.log('  5. Create dynamic page or template')
  console.log('  6. Design your VA cards')
}

main()
