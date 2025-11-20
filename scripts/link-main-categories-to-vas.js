#!/usr/bin/env node

/**
 * Script to link Main Categories to Virtual Assistants
 * Updates each VA with their main category reference
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/link-main-categories-to-vas.js
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

console.log('🚀 Linking Main Categories to VAs...\n')

// Load data
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')
const mainCategoriesPath = path.join(__dirname, '../data/main-categories.json')
const vasDataPath = path.join(__dirname, '../src/data/vasData.js')

const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))
const mainCategories = JSON.parse(fs.readFileSync(mainCategoriesPath, 'utf-8'))

// Read vasData.js to get VA names and their categories
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')

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

    console.log('📊 Fetching Main Category items...\n')
    
    // Get all main category items
    const mainCategoryItems = await apiCall('GET', `/collections/${mainCategoryCollectionId}/items`)
    const categoryMap = new Map()
    
    if (mainCategoryItems.items) {
      mainCategoryItems.items.forEach(item => {
        categoryMap.set(item.fieldData?.name, item.id)
      })
    }

    console.log(`✅ Found ${categoryMap.size} main categories\n`)

    // Parse vasData.js to extract VA names and categories
    console.log('📊 Parsing vasData.js...\n')
    
    const vaRegex = /nombre:\s*"([^"]+)"[\s\S]*?categoría_principal:\s*\[([^\]]+)\]/g
    const vasMap = new Map()
    let match

    while ((match = vaRegex.exec(vasDataContent)) !== null) {
      const vaName = match[1]
      const categoryStr = match[2]
      const categories = categoryStr.split(',').map(c => c.trim().replace(/"/g, ''))
      vasMap.set(vaName, categories)
    }

    console.log(`✅ Found ${vasMap.size} VAs\n`)

    // Get all VAs from Webflow
    console.log('📊 Fetching VAs from Webflow...\n')
    
    const vasResponse = await apiCall('GET', `/collections/${vaCollectionId}/items`)
    const vas = vasResponse.items || []

    console.log(`✅ Found ${vas.length} VAs in Webflow\n`)

    // Link categories
    console.log('🔗 Linking categories to VAs...\n')
    
    let updated = 0
    let failed = 0

    for (const va of vas) {
      try {
        const vaName = va.fieldData?.name
        if (!vaName) continue

        const categories = vasMap.get(vaName)
        if (!categories || categories.length === 0) {
          console.log(`  ⚠️  No categories found for ${vaName}`)
          continue
        }

        // Get category IDs
        const categoryIds = categories
          .map(cat => categoryMap.get(cat))
          .filter(id => id)

        if (categoryIds.length === 0) {
          console.log(`  ⚠️  No matching category IDs for ${vaName}`)
          continue
        }

        // Update VA with category references
        await apiCall('PATCH', `/collections/${vaCollectionId}/items/${va.id}`, {
          fieldData: {
            'main-categories': categoryIds
          }
        })

        updated++
        console.log(`  ✅ ${vaName} (${categoryIds.length} categories)`)
        await sleep(500) // Avoid rate limiting

      } catch (error) {
        failed++
        console.error(`  ❌ Error: ${error.message}`)
      }
    }

    console.log(`\n✅ Linking complete: ${updated} updated, ${failed} failed\n`)
    console.log('✅ Main Categories linked successfully!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
