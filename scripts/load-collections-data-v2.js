#!/usr/bin/env node

/**
 * Script to load extracted data into CMS collections (v2 - with better rate limiting)
 * Loads: Skills, Tools, Equipment, Employment, Education
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/load-collections-data-v2.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN required')
  console.error('Usage: WEBFLOW_API_TOKEN="token" node scripts/load-collections-data-v2.js')
  process.exit(1)
}

console.log('🚀 Loading data into CMS collections (v2)...\n')

// Load data files
const uniqueValuesPath = path.join(__dirname, '../data/unique-values.json')
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')

if (!fs.existsSync(uniqueValuesPath)) {
  console.error('❌ Error: unique-values.json not found. Run extract-unique-values.js first.')
  process.exit(1)
}

if (!fs.existsSync(collectionIdsPath)) {
  console.error('❌ Error: collection-ids.json not found. Run get-collection-ids.js first.')
  process.exit(1)
}

const uniqueValues = JSON.parse(fs.readFileSync(uniqueValuesPath, 'utf-8'))
const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))

console.log('✅ Data files loaded\n')

// Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// API Helper with better error handling
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
        // Rate limited
        const waitTime = 10000 + (retryCount * 5000) // Exponential backoff
        console.log(`  ⏳ Rate limited (429). Waiting ${waitTime}ms before retry...`)
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

// Load items into collection
async function loadItemsToCollection(collectionId, items, collectionName) {
  console.log(`📝 Loading ${items.length} items to ${collectionName}...`)

  let loaded = 0
  let failed = 0
  let skipped = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    
    try {
      // Filter out empty or invalid items
      if (!item || !item.name || item.name.trim() === '' || item.name === ',') {
        skipped++
        continue
      }

      const body = {
        fieldData: item
      }

      await apiCall('POST', `/collections/${collectionId}/items`, body)
      loaded++

      // Show progress every 10 items
      if (loaded % 10 === 0) {
        console.log(`  ✅ ${loaded}/${items.length - skipped} loaded`)
      }

      // Add delay to avoid rate limiting (500ms between requests)
      await sleep(500)
    } catch (error) {
      failed++
      // Only log first 3 errors to avoid spam
      if (failed <= 3) {
        const itemName = item?.name?.substring(0, 40) || 'unknown'
        console.error(`  ❌ Failed to load "${itemName}": ${error.message}`)
      }
    }
  }

  console.log(`✅ ${collectionName}: ${loaded} loaded, ${failed} failed, ${skipped} skipped\n`)
  return { loaded, failed, skipped }
}

// Main execution
async function main() {
  try {
    console.log('🔨 PHASE 1: Loading Skills...\n')
    const skillsResult = await loadItemsToCollection(
      collectionIds.skills,
      uniqueValues.skills.items,
      'Skills'
    )

    console.log('🔨 PHASE 2: Loading Tools...\n')
    const toolsResult = await loadItemsToCollection(
      collectionIds.tools,
      uniqueValues.tools.items,
      'Tools'
    )

    console.log('🔨 PHASE 3: Loading Equipment...\n')
    const equipmentResult = await loadItemsToCollection(
      collectionIds.equipment,
      uniqueValues.equipment.items,
      'Equipment'
    )

    console.log('🔨 PHASE 4: Loading Employment...\n')
    const employmentResult = await loadItemsToCollection(
      collectionIds.employment,
      uniqueValues.employmentHistory.items,
      'Employment'
    )

    console.log('🔨 PHASE 5: Loading Education...\n')
    const educationResult = await loadItemsToCollection(
      collectionIds.education,
      uniqueValues.education.items,
      'Education'
    )

    // Summary
    console.log('\n✅ Data loading complete!\n')
    console.log('📊 SUMMARY:\n')
    console.log(`  Skills: ${skillsResult.loaded} loaded, ${skillsResult.failed} failed, ${skillsResult.skipped} skipped`)
    console.log(`  Tools: ${toolsResult.loaded} loaded, ${toolsResult.failed} failed, ${toolsResult.skipped} skipped`)
    console.log(`  Equipment: ${equipmentResult.loaded} loaded, ${equipmentResult.failed} failed, ${equipmentResult.skipped} skipped`)
    console.log(`  Employment: ${employmentResult.loaded} loaded, ${employmentResult.failed} failed, ${employmentResult.skipped} skipped`)
    console.log(`  Education: ${educationResult.loaded} loaded, ${educationResult.failed} failed, ${educationResult.skipped} skipped`)

    const totalLoaded = skillsResult.loaded + toolsResult.loaded + equipmentResult.loaded + employmentResult.loaded + educationResult.loaded
    const totalFailed = skillsResult.failed + toolsResult.failed + equipmentResult.failed + employmentResult.failed + educationResult.failed
    const totalSkipped = skillsResult.skipped + toolsResult.skipped + equipmentResult.skipped + employmentResult.skipped + educationResult.skipped

    console.log(`\n  TOTAL: ${totalLoaded} loaded, ${totalFailed} failed, ${totalSkipped} skipped`)
    console.log(`\n⏱️  Total time: ~${Math.round((totalLoaded * 0.5) / 60)} minutes`)

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
