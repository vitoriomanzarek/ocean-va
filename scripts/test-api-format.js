#!/usr/bin/env node

/**
 * Script to test API format for loading items
 * Tests a single item to see what format works
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

console.log('🧪 Testing API format...\n')

// Load collection IDs
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')
const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))

const skillsCollectionId = collectionIds.skills

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
      console.error(`Response Status: ${response.status}`)
      console.error(`Response Body:`, JSON.stringify(data, null, 2))
      throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    throw error
  }
}

async function main() {
  try {
    console.log(`Testing Skills Collection: ${skillsCollectionId}\n`)

    // Test 1: Simple format
    console.log('Test 1: Simple format')
    console.log('Body:', JSON.stringify({
      fieldData: {
        name: 'Test Skill',
        category: 'Other'
      }
    }, null, 2))

    try {
      const result = await apiCall('POST', `/collections/${skillsCollectionId}/items`, {
        fieldData: {
          name: 'Test Skill',
          category: 'Other'
        }
      })
      console.log('✅ Success!\n')
      console.log('Response:', JSON.stringify(result, null, 2))
    } catch (error) {
      console.log('❌ Failed\n')
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
