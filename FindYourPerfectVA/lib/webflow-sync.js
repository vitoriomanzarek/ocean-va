/**
 * Webflow Data Synchronization
 * Fetches and caches Virtual Assistant data from Webflow CMS
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const CACHE_FILE = path.join(__dirname, '../data/vas-cache.json');

/**
 * Fetch all Virtual Assistants from Webflow CMS
 * @returns {Promise<Array>} Array of VA objects
 */
export async function fetchVAsFromWebflow() {
  const token = process.env.WEBFLOW_API_TOKEN;
  const siteId = process.env.WEBFLOW_SITE_ID;
  const collectionId = process.env.WEBFLOW_VA_COLLECTION_ID;

  if (!token || !siteId || !collectionId) {
    throw new Error('Missing Webflow API credentials. Check your .env file.');
  }

  try {
    // Fetch all items with pagination
    let allItems = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const url = `${WEBFLOW_API_BASE}/collections/${collectionId}/items?limit=${limit}&offset=${offset}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Webflow API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      allItems = allItems.concat(data.items || []);
      
      // Check if there are more items
      hasMore = (data.items || []).length === limit;
      offset += limit;
    }

    // Transform Webflow items to our format
    const vas = allItems.map(item => transformVAItem(item));

    return vas;
  } catch (error) {
    console.error('Error fetching VAs from Webflow:', error);
    throw error;
  }
}

/**
 * Transform Webflow item to our VA format
 * @param {Object} item - Webflow collection item
 * @returns {Object} Transformed VA object
 */
function transformVAItem(item) {
  const fieldData = item.fieldData || {};

  // Extract specializations (multi-reference)
  const specializations = [];
  if (fieldData.specialization && Array.isArray(fieldData.specialization)) {
    // If it's an array of objects with 'id' or strings
    specializations.push(...fieldData.specialization.map(s => 
      typeof s === 'string' ? s : (s.name || s.id || '')
    ).filter(Boolean));
  } else if (fieldData['specialization-name']) {
    specializations.push(fieldData['specialization-name']);
  } else if (fieldData['skills-tags']) {
    // Fallback to skills-tags if available
    const tags = fieldData['skills-tags'];
    specializations.push(...(typeof tags === 'string' ? tags.split(',').map(s => s.trim()) : tags || []));
  }

  // Extract tools
  const tools = [];
  if (fieldData['tools-tags']) {
    const toolsData = fieldData['tools-tags'];
    tools.push(...(typeof toolsData === 'string' ? toolsData.split(',').map(t => t.trim()) : toolsData || []));
  }

  // Extract languages
  const languages = [];
  if (fieldData.languages) {
    const langs = fieldData.languages;
    languages.push(...(typeof langs === 'string' ? langs.split(',').map(l => l.trim()) : langs || []));
  }

  // Extract main category
  let mainCategory = null;
  if (fieldData['main-category']) {
    mainCategory = fieldData['main-category'];
  } else if (fieldData['main-categories'] && Array.isArray(fieldData['main-categories'])) {
    // If it's a multi-reference, get the first one
    const firstCategory = fieldData['main-categories'][0];
    mainCategory = typeof firstCategory === 'string' ? firstCategory : (firstCategory.name || firstCategory.id);
  }

  return {
    id: item.id,
    name: fieldData.name || '',
    mainCategory: mainCategory,
    experienceYears: fieldData['experience-years'] || '',
    languages: languages,
    availability: fieldData.availability || '',
    specializations: specializations,
    tools: tools,
    summary: fieldData.summary || '',
    tagline: fieldData.tagline || '',
    thumbnail: fieldData['thumbnail-description'] || '',
    image: fieldData.image || fieldData['image-url'] || '',
    profileSlug: fieldData['profile-slug'] || fieldData['profile-slug-2'] || '',
    slug: fieldData.slug || '',
    videoUrl: fieldData.video || fieldData['video-url'] || '',
    discType: fieldData['disc-type'] || fieldData['disc-badge'] || '',
    englishScore: fieldData['english-score'] || '',
    englishLevel: fieldData['english-level'] || ''
  };
}

/**
 * Save VAs to cache file
 * @param {Array} vas - Array of VA objects
 */
export function saveVAsToCache(vas) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const cacheData = {
      lastSync: new Date().toISOString(),
      vas: vas
    };

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log(`✅ Cached ${vas.length} VAs to ${CACHE_FILE}`);
  } catch (error) {
    console.error('Error saving cache:', error);
    throw error;
  }
}

/**
 * Load VAs from cache file
 * @returns {Array|null} Array of VA objects or null if cache doesn't exist
 */
export function loadVAsFromCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return null;
    }

    const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`📦 Loaded ${cacheData.vas.length} VAs from cache (synced: ${cacheData.lastSync})`);
    return cacheData.vas;
  } catch (error) {
    console.error('Error loading cache:', error);
    return null;
  }
}

/**
 * Sync VAs from Webflow and update cache
 * @returns {Promise<Array>} Array of synced VA objects
 */
export async function syncVAs() {
  console.log('🔄 Syncing VAs from Webflow CMS...');
  
  try {
    const vas = await fetchVAsFromWebflow();
    saveVAsToCache(vas);
    return vas;
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

/**
 * Get VAs (from cache or sync)
 * @param {boolean} forceSync - Force sync even if cache exists
 * @returns {Promise<Array>} Array of VA objects
 */
export async function getVAs(forceSync = false) {
  if (forceSync) {
    return await syncVAs();
  }

  // Try to load from cache first
  const cachedVAs = loadVAsFromCache();
  if (cachedVAs) {
    return cachedVAs;
  }

  // If no cache, sync from Webflow
  console.log('⚠️  No cache found, syncing from Webflow...');
  return await syncVAs();
}

