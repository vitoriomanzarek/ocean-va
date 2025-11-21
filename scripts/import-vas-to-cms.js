#!/usr/bin/env node

/**
 * Script to import VA data into Webflow CMS Collection
 * Uses the correct field mapping for Webflow API v2
 * 
 * Usage: WEBFLOW_API_TOKEN="your-token" COLLECTION_ID="id" node scripts/import-vas-to-cms.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

// Configuration
const API_TOKEN = process.env.WEBFLOW_API_TOKEN
const COLLECTION_ID = process.env.COLLECTION_ID || '691b82a97542c69f3f77fa76'

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN environment variable not set')
  process.exit(1)
}

console.log('🚀 Importing VA data to Webflow CMS...\n')

// Import VA data
const vasDataPath = path.join(rootDir, 'src', 'data', 'vasData.js')
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')
const vasDataMatch = vasDataContent.match(/export const vasData = \[([\s\S]*)\]/)
if (!vasDataMatch) {
  console.error('❌ Error: Could not parse vasData.js')
  process.exit(1)
}

let vasData = []
try {
  const arrayContent = '[' + vasDataMatch[1] + ']'
  vasData = eval('(' + arrayContent + ')')
} catch (e) {
  console.error('❌ Error parsing vasData:', e.message)
  process.exit(1)
}

console.log(`✅ Loaded ${vasData.length} VAs from vasData.js\n`)

// API Helper function
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

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    throw error
  }
}

// Main function
async function main() {
  try {
    // Step 1: Get collection fields to map them correctly
    console.log('📝 Step 1: Getting collection fields...')
    const collection = await apiCall('GET', `/collections/${COLLECTION_ID}`)
    const fields = collection.fields || []
    
    console.log(`✅ Found ${fields.length} fields\n`)

    // Create field mapping
    const fieldMap = {}
    fields.forEach(field => {
      fieldMap[field.slug] = field.id
    })

    console.log('📝 Step 2: Importing VA data...\n')
    let importedCount = 0
    let errorCount = 0

    for (const va of vasData) {
      try {
        // Build field data with correct field IDs
        const fieldData = {}
        
        // Map VA data to collection fields
        if (fieldMap['name']) fieldData[fieldMap['name']] = { value: va.nombre || '' }
        if (fieldMap['title']) fieldData[fieldMap['title']] = { value: 'Insurance Virtual Assistant' }
        if (fieldMap['experience']) fieldData[fieldMap['experience']] = { value: va.años_experiencia ? `${va.años_experiencia} years` : 'Trained' }
        if (fieldMap['languages']) fieldData[fieldMap['languages']] = { value: va.idiomas || '' }
        if (fieldMap['specializations']) fieldData[fieldMap['specializations']] = { value: va.especialización ? va.especialización.join(', ') : '' }
        if (fieldMap['availability']) fieldData[fieldMap['availability']] = { value: va.disponibilidad || va.categorías?.[0] || '' }
        if (fieldMap['image-url']) fieldData[fieldMap['image-url']] = { value: va.imagen || '' }
        if (fieldMap['video-url']) fieldData[fieldMap['video-url']] = { value: va.videoUrl || '' }
        if (fieldMap['video-thumbnail']) fieldData[fieldMap['video-thumbnail']] = { value: va.videoThumbnail || '' }
        if (fieldMap['summary']) fieldData[fieldMap['summary']] = { value: va.summary || '' }
        if (fieldMap['tagline']) fieldData[fieldMap['tagline']] = { value: va.tagline || '' }
        if (fieldMap['thumbnail-description']) fieldData[fieldMap['thumbnail-description']] = { value: va.thumbnail || '' }
        if (fieldMap['profile-slug']) fieldData[fieldMap['profile-slug']] = { value: va.slug || '' }

        const itemBody = {
          fieldData: fieldData
        }

        await apiCall('POST', `/collections/${COLLECTION_ID}/items`, itemBody)
        importedCount++
        console.log(`  ✅ ${va.nombre}`)
      } catch (error) {
        errorCount++
        console.log(`  ⚠️  ${va.nombre}: ${error.message}`)
      }
    }

    console.log(`\n✅ Imported ${importedCount}/${vasData.length} VAs (${errorCount} errors)\n`)

    // Summary
    console.log('🎉 Import Complete!\n')
    console.log('📊 Summary:')
    console.log(`  - Collection ID: ${COLLECTION_ID}`)
    console.log(`  - Items Imported: ${importedCount}`)
    console.log(`  - Errors: ${errorCount}`)
    console.log(`\n📝 Next Steps:`)
    console.log(`  1. Go to Webflow Designer`)
    console.log(`  2. Navigate to Collections`)
    console.log(`  3. Find "Virtual Assistants" collection`)
    console.log(`  4. Verify all items were imported`)
    console.log(`  5. Create a dynamic page or template`)
    console.log(`  6. Design your VA cards`)

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message)
    process.exit(1)
  }
}

// Run
main()
