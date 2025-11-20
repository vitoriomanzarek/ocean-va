#!/usr/bin/env node

/**
 * Script to add Main Category multi-reference field to Virtual Assistants collection
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/add-main-category-field.js
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

console.log('🚀 Adding Main Category field to Virtual Assistants...\n')

// Load collection IDs
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')
const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))

// Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// API Helper
async function apiCall(method, endpoint, body = null, retryCount = 0) {
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
      if (response.status === 429) {
        const waitTime = 10000 + (retryCount * 5000)
        console.log(`  ⏳ Rate limited. Waiting ${waitTime}ms...`)
        await sleep(waitTime)
        
        if (retryCount < 3) {
          return apiCall(method, endpoint, body, retryCount + 1)
        } else {
          throw new Error(`429 - Too Many Requests (max retries exceeded)`)
        }
      }
      throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    throw error
  }
}

async function main() {
  try {
    const vaCollectionId = collectionIds.virtualassistants
    const mainCategoryCollectionId = collectionIds.maincategory

    if (!mainCategoryCollectionId) {
      throw new Error('Main Category collection ID not found. Run create-main-category-collection.js first.')
    }

    console.log(`📝 Adding Main Category field to Virtual Assistants...\n`)

    const fieldBody = {
      displayName: 'Main Categories',
      slug: 'main-categories',
      type: 'multiReference',
      collectionId: mainCategoryCollectionId
    }

    try {
      const response = await apiCall('POST', `/collections/${vaCollectionId}/fields`, fieldBody)
      console.log(`✅ Field added: Main Categories (ID: ${response.id})\n`)
    } catch (error) {
      if (error.message.includes('already exists') || error.message.includes('same name')) {
        console.log(`⚠️  Field might already exist: ${error.message}\n`)
      } else {
        throw error
      }
    }

    console.log('✅ Main Category field added successfully!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
