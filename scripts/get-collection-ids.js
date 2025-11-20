#!/usr/bin/env node

/**
 * Script to get collection IDs from existing Webflow collections
 * Finds: Skills, Tools, Equipment, Employment, Education, Virtual Assistants
 * 
 * Usage: WEBFLOW_API_TOKEN="token" WEBFLOW_SITE_ID="site_id" node scripts/get-collection-ids.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_TOKEN = process.env.WEBFLOW_API_TOKEN
const SITE_ID = process.env.WEBFLOW_SITE_ID

if (!API_TOKEN || !SITE_ID) {
  console.error('❌ Error: WEBFLOW_API_TOKEN and WEBFLOW_SITE_ID required')
  process.exit(1)
}

console.log('🔍 Fetching collection IDs from Webflow...\n')

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
    console.log('📊 Fetching all collections...\n')
    
    const collectionsResponse = await apiCall('GET', `/sites/${SITE_ID}/collections`)
    const collections = collectionsResponse.collections || []

    console.log(`✅ Found ${collections.length} collections\n`)

    const collectionIds = {}
    const targetCollections = ['Skills', 'Tools', 'Equipment', 'Employment', 'Education', 'Virtual Assistants']

    for (const collection of collections) {
      if (targetCollections.includes(collection.displayName)) {
        const key = collection.displayName
          .toLowerCase()
          .replace(/\s+/g, '')
        
        collectionIds[key] = collection.id
        console.log(`✅ ${collection.displayName}: ${collection.id}`)
      }
    }

    console.log()

    // Save collection IDs
    const outputPath = path.join(__dirname, '../data/collection-ids.json')
    fs.writeFileSync(outputPath, JSON.stringify(collectionIds, null, 2))
    console.log(`✅ Collection IDs saved to: ${outputPath}\n`)

    // Print summary
    console.log('📊 SUMMARY:\n')
    console.log(JSON.stringify(collectionIds, null, 2))

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
