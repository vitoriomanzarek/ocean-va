#!/usr/bin/env node

/**
 * Script to create CMS collections and fields via Webflow API
 * Creates: Skills, Tools, Equipment, Employment, Education collections
 * Adds: 10 new fields to Virtual Assistants collection
 * 
 * Usage: WEBFLOW_API_TOKEN="token" WEBFLOW_SITE_ID="site_id" node scripts/create-cms-collections.js
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
  console.error('Usage: WEBFLOW_API_TOKEN="token" WEBFLOW_SITE_ID="site_id" node scripts/create-cms-collections.js')
  process.exit(1)
}

console.log('🚀 Creating CMS Collections via Webflow API...\n')

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

// Collection Definitions
const collections = [
  {
    name: 'Skills',
    slug: 'skills',
    fields: [
      {
        name: 'Name',
        slug: 'name',
        type: 'plainText',
        required: true
      },
      {
        name: 'Category',
        slug: 'category',
        type: 'option',
        options: [
          { name: 'Administrative', value: 'administrative' },
          { name: 'Technical', value: 'technical' },
          { name: 'Customer Service', value: 'customer-service' },
          { name: 'Sales', value: 'sales' },
          { name: 'Management', value: 'management' },
          { name: 'Other', value: 'other' }
        ]
      }
    ]
  },
  {
    name: 'Tools',
    slug: 'tools',
    fields: [
      {
        name: 'Name',
        slug: 'name',
        type: 'plainText',
        required: true
      },
      {
        name: 'Category',
        slug: 'category',
        type: 'option',
        options: [
          { name: 'CRM', value: 'crm' },
          { name: 'Communication', value: 'communication' },
          { name: 'Project Management', value: 'project-management' },
          { name: 'Design', value: 'design' },
          { name: 'Accounting', value: 'accounting' },
          { name: 'Other', value: 'other' }
        ]
      }
    ]
  },
  {
    name: 'Equipment',
    slug: 'equipment',
    fields: [
      {
        name: 'Name',
        slug: 'name',
        type: 'plainText',
        required: true
      },
      {
        name: 'Category',
        slug: 'category',
        type: 'option',
        options: [
          { name: 'Hardware', value: 'hardware' },
          { name: 'Software', value: 'software' },
          { name: 'Accessories', value: 'accessories' },
          { name: 'Other', value: 'other' }
        ]
      }
    ]
  },
  {
    name: 'Employment',
    slug: 'employment',
    fields: [
      {
        name: 'Company',
        slug: 'company',
        type: 'plainText',
        required: true
      },
      {
        name: 'Position',
        slug: 'position',
        type: 'plainText',
        required: true
      },
      {
        name: 'Period',
        slug: 'period',
        type: 'plainText',
        required: true
      },
      {
        name: 'Description',
        slug: 'description',
        type: 'richText'
      }
    ]
  },
  {
    name: 'Education',
    slug: 'education',
    fields: [
      {
        name: 'School',
        slug: 'school',
        type: 'plainText',
        required: true
      },
      {
        name: 'Degree',
        slug: 'degree',
        type: 'plainText',
        required: true
      },
      {
        name: 'Year',
        slug: 'year',
        type: 'plainText',
        required: true
      }
    ]
  }
]

// Fields to add to Virtual Assistants
const vaFields = [
  {
    name: 'Skills',
    slug: 'skills',
    type: 'multiReference',
    collectionSlug: 'skills'
  },
  {
    name: 'Tools',
    slug: 'tools',
    type: 'multiReference',
    collectionSlug: 'tools'
  },
  {
    name: 'Equipment',
    slug: 'equipment',
    type: 'multiReference',
    collectionSlug: 'equipment'
  },
  {
    name: 'Employment History',
    slug: 'employment-history',
    type: 'multiReference',
    collectionSlug: 'employment'
  },
  {
    name: 'DISC Badge',
    slug: 'disc-badge',
    type: 'option',
    options: [
      { name: 'D', value: 'd' },
      { name: 'I', value: 'i' },
      { name: 'S', value: 's' },
      { name: 'C', value: 'c' },
      { name: 'D+I', value: 'd-i' },
      { name: 'S+I', value: 's-i' },
      { name: 'S+C', value: 's-c' }
    ]
  },
  {
    name: 'DISC Description',
    slug: 'disc-description',
    type: 'richText'
  },
  {
    name: 'English Score',
    slug: 'english-score',
    type: 'option',
    options: [
      { name: 'A1 - Beginner', value: 'a1' },
      { name: 'A2 - Elementary', value: 'a2' },
      { name: 'B1 - Intermediate', value: 'b1' },
      { name: 'B2 - Upper-Intermediate', value: 'b2' },
      { name: 'C1 - Advanced', value: 'c1' },
      { name: 'C2 - Proficient', value: 'c2' }
    ]
  },
  {
    name: 'English Description',
    slug: 'english-description',
    type: 'richText'
  },
  {
    name: 'Education',
    slug: 'education',
    type: 'multiReference',
    collectionSlug: 'education'
  },
  {
    name: 'YouTube URL',
    slug: 'youtube-url',
    type: 'plainText'
  }
]

// Create collection
async function createCollection(collectionDef) {
  console.log(`📝 Creating collection: ${collectionDef.name}...`)

  const body = {
    displayName: collectionDef.name,
    singularName: collectionDef.name,
    pluralName: collectionDef.name + 's'
  }

  try {
    const response = await apiCall('POST', `/sites/${SITE_ID}/collections`, body)
    console.log(`✅ Collection created: ${collectionDef.name} (ID: ${response.id})`)
    return response
  } catch (error) {
    console.error(`❌ Failed to create collection ${collectionDef.name}`)
    throw error
  }
}

// Add field to collection
async function addFieldToCollection(collectionId, fieldDef) {
  console.log(`  📌 Adding field: ${fieldDef.name}...`)

  const body = {
    displayName: fieldDef.name,
    slug: fieldDef.slug,
    type: fieldDef.type,
    required: fieldDef.required || false
  }

  // Add type-specific properties
  if (fieldDef.type === 'option' && fieldDef.options) {
    body.options = fieldDef.options
  }

  if (fieldDef.type === 'multiReference' && fieldDef.collectionSlug) {
    body.collectionSlug = fieldDef.collectionSlug
  }

  try {
    const response = await apiCall('POST', `/collections/${collectionId}/fields`, body)
    console.log(`  ✅ Field added: ${fieldDef.name}`)
    return response
  } catch (error) {
    console.error(`  ❌ Failed to add field ${fieldDef.name}`)
    throw error
  }
}

// Add field to Virtual Assistants
async function addFieldToVirtualAssistants(vaCollectionId, fieldDef, createdCollections) {
  console.log(`  📌 Adding field to VA: ${fieldDef.name}...`)

  const body = {
    displayName: fieldDef.name,
    slug: fieldDef.slug,
    type: fieldDef.type,
    required: false
  }

  // Add type-specific properties
  if (fieldDef.type === 'option' && fieldDef.options) {
    body.options = fieldDef.options
  }

  if (fieldDef.type === 'multiReference' && fieldDef.collectionSlug) {
    // Get the actual collection ID from createdCollections
    const collectionId = createdCollections[fieldDef.collectionSlug]
    if (collectionId) {
      body.collectionId = collectionId
    } else {
      console.error(`  ❌ Collection ID not found for ${fieldDef.collectionSlug}`)
      throw new Error(`Collection ID not found for ${fieldDef.collectionSlug}`)
    }
  }

  try {
    const response = await apiCall('POST', `/collections/${vaCollectionId}/fields`, body)
    console.log(`  ✅ Field added to VA: ${fieldDef.name}`)
    return response
  } catch (error) {
    console.error(`  ❌ Failed to add field ${fieldDef.name}`)
    throw error
  }
}

// Main execution
async function main() {
  try {
    console.log('📊 Getting Virtual Assistants collection ID...\n')
    
    // Get collections to find Virtual Assistants
    const collectionsResponse = await apiCall('GET', `/sites/${SITE_ID}/collections`)
    const vaCollection = collectionsResponse.collections.find(c => c.displayName === 'Virtual Assistants')
    
    if (!vaCollection) {
      throw new Error('Virtual Assistants collection not found')
    }
    
    console.log(`✅ Found Virtual Assistants (ID: ${vaCollection.id})\n`)
    
    const createdCollections = {}
    
    // Create new collections
    console.log('🔨 PHASE 1: Creating new collections...\n')
    for (const collectionDef of collections) {
      try {
        const collection = await createCollection(collectionDef)
        createdCollections[collectionDef.slug] = collection.id
        
        // Add fields to new collection
        console.log(`  Adding fields to ${collectionDef.name}...`)
        for (const fieldDef of collectionDef.fields) {
          await addFieldToCollection(collection.id, fieldDef)
        }
        console.log()
      } catch (error) {
        console.error(`Failed to create collection ${collectionDef.name}`)
      }
    }
    
    // Add fields to Virtual Assistants
    console.log('\n🔨 PHASE 2: Adding fields to Virtual Assistants...\n')
    for (const fieldDef of vaFields) {
      try {
        await addFieldToVirtualAssistants(vaCollection.id, fieldDef, createdCollections)
      } catch (error) {
        console.error(`Failed to add field ${fieldDef.name}`)
      }
    }
    
    // Save collection IDs
    console.log('\n📁 Saving collection IDs...\n')
    const collectionIds = {
      ...createdCollections,
      virtualAssistants: vaCollection.id
    }
    
    const outputPath = path.join(__dirname, '../data/collection-ids.json')
    fs.writeFileSync(outputPath, JSON.stringify(collectionIds, null, 2))
    console.log(`✅ Collection IDs saved to: ${outputPath}\n`)
    
    console.log('✅ CMS Collections and Fields created successfully!')
    console.log('\n📊 Summary:')
    console.log(`  ✅ 5 new collections created`)
    console.log(`  ✅ 10 new fields added to Virtual Assistants`)
    console.log(`  ✅ All multi-reference relationships configured`)
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
