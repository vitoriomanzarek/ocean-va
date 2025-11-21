#!/usr/bin/env node

/**
 * Script to debug Webflow collection structure
 * Shows field IDs and correct format for API calls
 * 
 * Usage: WEBFLOW_API_TOKEN="your-token" COLLECTION_ID="id" node scripts/debug-webflow-collection.js
 */

import fs from 'fs'

const API_TOKEN = process.env.WEBFLOW_API_TOKEN
const COLLECTION_ID = process.env.COLLECTION_ID || '691b82a97542c69f3f77fa76'

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN environment variable not set')
  process.exit(1)
}

console.log('🔍 Debugging Webflow Collection...\n')

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

  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
  }

  return data
}

async function main() {
  try {
    // Get collection details
    console.log('📝 Getting collection details...\n')
    const collection = await apiCall('GET', `/collections/${COLLECTION_ID}`)
    
    console.log('✅ Collection Info:')
    console.log(`   ID: ${collection.id}`)
    console.log(`   Name: ${collection.displayName}`)
    console.log(`   Slug: ${collection.slug}`)
    console.log(`   Fields: ${collection.fields.length}\n`)

    // List all fields with their IDs
    console.log('📋 Field Mapping:\n')
    console.log('Field ID | Field Slug | Field Type | Required')
    console.log('---------|------------|------------|----------')
    
    const fieldMap = {}
    collection.fields.forEach(field => {
      fieldMap[field.slug] = field.id
      const required = field.required ? 'Yes' : 'No'
      console.log(`${field.id.padEnd(8)} | ${field.slug.padEnd(10)} | ${field.type.padEnd(10)} | ${required}`)
    })

    console.log('\n📝 Example Item Format:\n')
    console.log('```json')
    console.log('{')
    console.log('  "fieldData": {')
    collection.fields.slice(0, 3).forEach((field, index) => {
      const comma = index < 2 ? ',' : ''
      console.log(`    "${field.id}": { "value": "example value" }${comma}`)
    })
    console.log('    "..."')
    console.log('  }')
    console.log('}')
    console.log('```\n')

    // Save field map to file
    const fieldMapJson = JSON.stringify(fieldMap, null, 2)
    fs.writeFileSync('webflow-field-map.json', fieldMapJson)
    console.log('✅ Field map saved to: webflow-field-map.json\n')

    // Show how to create an item
    console.log('📝 To create an item, use:\n')
    console.log('```bash')
    console.log(`curl -X POST https://api.webflow.com/v2/collections/${COLLECTION_ID}/items \\`)
    console.log('  -H "Authorization: Bearer $WEBFLOW_API_TOKEN" \\')
    console.log('  -H "Content-Type: application/json" \\')
    console.log('  -H "Accept-Version: 2.0" \\')
    console.log('  -d \'{"fieldData": {"' + collection.fields[0].id + '": {"value": "Test Name"}}}\'')
    console.log('```\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()
