#!/usr/bin/env node

/**
 * Script to create Webflow CMS Collection for Virtual Assistants
 * Creates collection with all fields and imports data from vasData.js
 * 
 * Usage: WEBFLOW_API_TOKEN="your-token" node scripts/create-webflow-cms-collection.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

// Configuration
const SITE_ID = '66e9b3f71eb321a17e92218a'
const API_TOKEN = process.env.WEBFLOW_API_TOKEN
const COLLECTION_NAME = 'Virtual Assistants'
const COLLECTION_SLUG = 'virtual-assistants'

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN environment variable not set')
  console.error('Usage: WEBFLOW_API_TOKEN="your-token" node scripts/create-webflow-cms-collection.js')
  process.exit(1)
}

console.log('🚀 Creating Webflow CMS Collection for Virtual Assistants...\n')

// Import VA data
const vasDataPath = path.join(rootDir, 'src', 'data', 'vasData.js')
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')
const vasDataMatch = vasDataContent.match(/export const vasData = \[([\s\S]*)\]/)
if (!vasDataMatch) {
  console.error('❌ Error: Could not parse vasData.js')
  process.exit(1)
}

// Evaluate the data (careful - only do this with trusted data)
let vasData = []
try {
  // Extract just the array content
  const arrayContent = '[' + vasDataMatch[1] + ']'
  // Use Function constructor to safely evaluate (still be careful!)
  vasData = eval('(' + arrayContent + ')')
} catch (e) {
  console.error('❌ Error parsing vasData:', e.message)
  process.exit(1)
}

console.log(`✅ Loaded ${vasData.length} VAs from vasData.js\n`)

// Define collection fields
const collectionFields = [
  {
    displayName: 'Name',
    slug: 'name',
    type: 'PlainText',
    required: true,
  },
  {
    displayName: 'Title',
    slug: 'title',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Experience (Years)',
    slug: 'experience',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Languages',
    slug: 'languages',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Specializations',
    slug: 'specializations',
    type: 'PlainText',
    required: false,
    notes: 'Comma-separated list of specializations'
  },
  {
    displayName: 'Availability',
    slug: 'availability',
    type: 'PlainText',
    required: false,
    notes: 'Full Time, Part Time, or Assigned'
  },
  {
    displayName: 'Image URL',
    slug: 'image-url',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Video URL',
    slug: 'video-url',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Video Thumbnail',
    slug: 'video-thumbnail',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Summary',
    slug: 'summary',
    type: 'RichText',
    required: false,
  },
  {
    displayName: 'Tagline',
    slug: 'tagline',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Thumbnail Description',
    slug: 'thumbnail-description',
    type: 'PlainText',
    required: false,
  },
  {
    displayName: 'Profile Slug',
    slug: 'profile-slug',
    type: 'PlainText',
    required: false,
  },
]

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
      throw new Error(`API Error: ${response.status} - ${data.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error(`❌ API Call Failed: ${method} ${endpoint}`)
    console.error(`Error: ${error.message}`)
    throw error
  }
}

// Main function
async function main() {
  try {
    // Step 1: Create collection
    console.log('📝 Step 1: Creating collection...')
    const collectionBody = {
      displayName: COLLECTION_NAME,
      singularName: 'Virtual Assistant',
      slug: COLLECTION_SLUG,
    }

    const collection = await apiCall('POST', `/sites/${SITE_ID}/collections`, collectionBody)
    const collectionId = collection.id

    console.log(`✅ Collection created: ${collectionId}\n`)

    // Step 2: Add fields
    console.log('📝 Step 2: Adding fields to collection...')
    for (const field of collectionFields) {
      try {
        const fieldBody = {
          displayName: field.displayName,
          slug: field.slug,
          type: field.type,
          required: field.required || false,
        }

        await apiCall('POST', `/collections/${collectionId}/fields`, fieldBody)
        console.log(`  ✅ Added field: ${field.displayName}`)
      } catch (error) {
        console.log(`  ⚠️  Field already exists or error: ${field.displayName}`)
      }
    }

    console.log(`\n✅ All fields added\n`)

    // Step 3: Import items
    console.log('📝 Step 3: Importing VA data...')
    let importedCount = 0

    for (const va of vasData) {
      try {
        const itemBody = {
          fieldData: {
            name: va.nombre || '',
            title: va.title || 'Insurance Virtual Assistant',
            experience: va.años_experiencia ? `${va.años_experiencia} years` : 'Trained',
            languages: va.idiomas || '',
            specializations: va.especialización ? va.especialización.join(', ') : '',
            availability: va.disponibilidad || va.categorías?.[0] || '',
            'image-url': va.imagen || '',
            'video-url': va.videoUrl || '',
            'video-thumbnail': va.videoThumbnail || '',
            summary: va.summary || '',
            tagline: va.tagline || '',
            'thumbnail-description': va.thumbnail || '',
            'profile-slug': va.slug || '',
          }
        }

        await apiCall('POST', `/collections/${collectionId}/items`, itemBody)
        importedCount++
        console.log(`  ✅ Imported: ${va.nombre}`)
      } catch (error) {
        console.log(`  ⚠️  Error importing ${va.nombre}: ${error.message}`)
      }
    }

    console.log(`\n✅ Imported ${importedCount}/${vasData.length} VAs\n`)

    // Summary
    console.log('🎉 SUCCESS!\n')
    console.log('📊 Collection Summary:')
    console.log(`  - Collection ID: ${collectionId}`)
    console.log(`  - Collection Name: ${COLLECTION_NAME}`)
    console.log(`  - Fields Created: ${collectionFields.length}`)
    console.log(`  - Items Imported: ${importedCount}`)
    console.log(`\n📝 Next Steps:`)
    console.log(`  1. Go to Webflow Designer`)
    console.log(`  2. Navigate to Collections`)
    console.log(`  3. Find "${COLLECTION_NAME}" collection`)
    console.log(`  4. Create a new page template or dynamic page`)
    console.log(`  5. Connect the collection to your page`)
    console.log(`  6. Design your VA cards using the collection fields`)
    console.log(`\n💡 Tips:`)
    console.log(`  - Use the "Name" field as the item title`)
    console.log(`  - Use "Image URL" for VA photos`)
    console.log(`  - Use "Video URL" for YouTube embeds`)
    console.log(`  - Use "Specializations" for filtering`)
    console.log(`  - Use "Availability" for status badges`)

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message)
    process.exit(1)
  }
}

// Run
main()
