#!/usr/bin/env node

/**
 * Script to create Main Category collection in Webflow
 * Extracts unique main categories from vasData.js
 * Creates collection and loads categories
 * 
 * Usage: WEBFLOW_API_TOKEN="token" WEBFLOW_SITE_ID="site_id" node scripts/create-main-category-collection.js
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

console.log('🚀 Creating Main Category collection...\n')

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

// Extract main categories from vasData.js
function extractMainCategories() {
  const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
  const content = fs.readFileSync(vasDataPath, 'utf-8')
  
  // Extract all categoría_principal values
  const regex = /categoría_principal:\s*"([^"]+)"/g
  const categories = new Set()
  let match
  
  while ((match = regex.exec(content)) !== null) {
    categories.add(match[1])
  }
  
  return Array.from(categories).sort()
}

async function main() {
  try {
    // Extract categories
    console.log('📊 Extracting main categories from vasData.js...\n')
    const mainCategories = extractMainCategories()
    
    console.log(`✅ Found ${mainCategories.length} unique main categories:\n`)
    mainCategories.forEach((cat, i) => {
      console.log(`  ${i + 1}. ${cat}`)
    })
    console.log()

    // Create collection
    console.log('📝 Creating Main Category collection in Webflow...\n')
    
    const collectionBody = {
      displayName: 'Main Category',
      singularName: 'Main Category',
      pluralName: 'Main Categories'
    }

    let mainCategoryCollection
    try {
      mainCategoryCollection = await apiCall('POST', `/sites/${SITE_ID}/collections`, collectionBody)
      console.log(`✅ Collection created: ${mainCategoryCollection.displayName} (ID: ${mainCategoryCollection.id})\n`)
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️  Collection already exists, fetching existing collection...\n`)
        const collectionsResponse = await apiCall('GET', `/sites/${SITE_ID}/collections`)
        mainCategoryCollection = collectionsResponse.collections.find(c => c.displayName === 'Main Category')
        if (!mainCategoryCollection) {
          throw new Error('Main Category collection not found')
        }
        console.log(`✅ Using existing collection: ${mainCategoryCollection.id}\n`)
      } else {
        throw error
      }
    }

    // Add Name field
    console.log('📌 Adding Name field...\n')
    try {
      await apiCall('POST', `/collections/${mainCategoryCollection.id}/fields`, {
        displayName: 'Name',
        slug: 'name',
        type: 'plainText',
        required: true
      })
      console.log(`✅ Name field added\n`)
    } catch (error) {
      console.log(`⚠️  Name field might already exist: ${error.message}\n`)
    }

    // Load categories
    console.log('📝 Loading categories into collection...\n')
    let loaded = 0
    let failed = 0

    for (const category of mainCategories) {
      try {
        await apiCall('POST', `/collections/${mainCategoryCollection.id}/items`, {
          fieldData: {
            name: category
          }
        })
        loaded++
        console.log(`  ✅ ${category}`)
        await sleep(500) // Avoid rate limiting
      } catch (error) {
        failed++
        console.error(`  ❌ Failed to load ${category}: ${error.message}`)
      }
    }

    console.log(`\n✅ Loading complete: ${loaded} loaded, ${failed} failed\n`)

    // Save collection ID
    const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')
    const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))
    collectionIds.maincategory = mainCategoryCollection.id
    fs.writeFileSync(collectionIdsPath, JSON.stringify(collectionIds, null, 2))
    console.log(`✅ Collection ID saved to data/collection-ids.json\n`)

    // Save categories list
    const categoriesPath = path.join(__dirname, '../data/main-categories.json')
    fs.writeFileSync(categoriesPath, JSON.stringify({
      total: mainCategories.length,
      categories: mainCategories,
      collectionId: mainCategoryCollection.id
    }, null, 2))
    console.log(`✅ Categories list saved to data/main-categories.json\n`)

    console.log('✅ Main Category collection created successfully!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
