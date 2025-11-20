#!/usr/bin/env node

/**
 * Script to get field IDs from collections
 * Needed for proper API v2 item creation
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN required')
  process.exit(1)
}

console.log('🔍 Fetching field IDs from collections...\n')

// Load collection IDs
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')
const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))

// API Helper
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

async function main() {
  try {
    const fieldIds = {}

    // Get field IDs for each collection
    for (const [collectionKey, collectionId] of Object.entries(collectionIds)) {
      if (collectionKey === 'virtualassistants') continue // Skip VA collection for now

      console.log(`📊 Getting fields for ${collectionKey}...`)
      
      try {
        const response = await apiCall('GET', `/collections/${collectionId}`)
        const collection = response
        
        fieldIds[collectionKey] = {}
        
        if (collection.fields) {
          for (const field of collection.fields) {
            fieldIds[collectionKey][field.slug] = field.id
            console.log(`  ✅ ${field.slug}: ${field.id}`)
          }
        }
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`)
      }
    }

    // Save field IDs
    const outputPath = path.join(__dirname, '../data/field-ids.json')
    fs.writeFileSync(outputPath, JSON.stringify(fieldIds, null, 2))
    console.log(`\n✅ Field IDs saved to: ${outputPath}\n`)

    // Print summary
    console.log('📊 SUMMARY:\n')
    console.log(JSON.stringify(fieldIds, null, 2))

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
