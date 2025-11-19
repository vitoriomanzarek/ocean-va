#!/usr/bin/env node

/**
 * Script to load extracted data into CMS collections
 * Loads: Skills, Tools, Equipment, Employment, Education
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/load-collections-data.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN required')
  console.error('Usage: WEBFLOW_API_TOKEN="token" node scripts/load-collections-data.js')
  process.exit(1)
}

console.log('🚀 Loading data into CMS collections...\n')

// Load data files
const uniqueValuesPath = path.join(__dirname, '../data/unique-values.json')
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')

if (!fs.existsSync(uniqueValuesPath)) {
  console.error('❌ Error: unique-values.json not found. Run extract-unique-values.js first.')
  process.exit(1)
}

if (!fs.existsSync(collectionIdsPath)) {
  console.error('❌ Error: collection-ids.json not found. Run create-cms-collections.js first.')
  process.exit(1)
}

const uniqueValues = JSON.parse(fs.readFileSync(uniqueValuesPath, 'utf-8'))
const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))

console.log('✅ Data files loaded\n')

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
    console.error(`❌ API Error: ${error.message}`)
    throw error
  }
}

// Load items into collection
async function loadItemsToCollection(collectionId, items, collectionName) {
  console.log(`📝 Loading ${items.length} items to ${collectionName}...`)

  let loaded = 0
  let failed = 0

  for (const item of items) {
    try {
      const body = {
        fieldData: item
      }

      await apiCall('POST', `/collections/${collectionId}/items`, body)
      loaded++

      // Show progress every 10 items
      if (loaded % 10 === 0) {
        console.log(`  ✅ ${loaded}/${items.length} loaded`)
      }
    } catch (error) {
      failed++
      console.error(`  ❌ Failed to load item: ${JSON.stringify(item)}`)
    }
  }

  console.log(`✅ ${collectionName}: ${loaded} loaded, ${failed} failed\n`)
  return { loaded, failed }
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
    console.log(`  Skills: ${skillsResult.loaded} loaded, ${skillsResult.failed} failed`)
    console.log(`  Tools: ${toolsResult.loaded} loaded, ${toolsResult.failed} failed`)
    console.log(`  Equipment: ${equipmentResult.loaded} loaded, ${equipmentResult.failed} failed`)
    console.log(`  Employment: ${employmentResult.loaded} loaded, ${employmentResult.failed} failed`)
    console.log(`  Education: ${educationResult.loaded} loaded, ${educationResult.failed} failed`)

    const totalLoaded = skillsResult.loaded + toolsResult.loaded + equipmentResult.loaded + employmentResult.loaded + educationResult.loaded
    const totalFailed = skillsResult.failed + toolsResult.failed + equipmentResult.failed + employmentResult.failed + educationResult.failed

    console.log(`\n  TOTAL: ${totalLoaded} loaded, ${totalFailed} failed`)

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
