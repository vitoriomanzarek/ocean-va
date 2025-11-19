/**
 * Webflow Data API Client
 * Handles authentication and API calls to Webflow
 */

const API_BASE_URL = 'https://api.webflow.com/v2';

class WebflowApiClient {
  constructor(token) {
    if (!token) {
      throw new Error('WEBFLOW_API_TOKEN is required');
    }
    this.token = token;
  }

  /**
   * Make an authenticated request to the Webflow API
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Webflow API Error (${response.status}): ${error.message || JSON.stringify(error)}`);
      }

      // Handle empty responses (e.g., DELETE requests)
      const contentLength = response.headers.get('content-length');
      if (contentLength === '0' || response.status === 204) {
        return { success: true };
      }

      const text = await response.text();
      if (!text) {
        return { success: true };
      }

      return JSON.parse(text);
    } catch (error) {
      console.error(`API Request Failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Get all sites
   */
  async getSites() {
    return this.request('/sites');
  }

  /**
   * Get site by ID
   */
  async getSite(siteId) {
    return this.request(`/sites/${siteId}`);
  }

  /**
   * Get all collections for a site
   */
  async getCollections(siteId) {
    return this.request(`/sites/${siteId}/collections`);
  }

  /**
   * Get a specific collection
   */
  async getCollection(collectionId) {
    return this.request(`/collections/${collectionId}`);
  }

  /**
   * Get all items in a collection
   */
  async getCollectionItems(collectionId, options = {}) {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit);
    if (options.offset) params.append('offset', options.offset);
    if (options.sort) params.append('sort', options.sort);

    const query = params.toString();
    const endpoint = `/collections/${collectionId}/items${query ? `?${query}` : ''}`;
    return this.request(endpoint);
  }

  /**
   * Get a single item from a collection
   */
  async getCollectionItem(collectionId, itemId) {
    return this.request(`/collections/${collectionId}/items/${itemId}`);
  }

  /**
   * Create a new item in a collection
   */
  async createCollectionItem(collectionId, fieldData, options = {}) {
    const body = {
      fieldData,
      isArchived: options.isArchived || false,
      isDraft: options.isDraft !== false, // Draft by default
    };

    return this.request(`/collections/${collectionId}/items`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * Update an existing item in a collection
   */
  async updateCollectionItem(collectionId, itemId, fieldData, options = {}) {
    const body = {
      fieldData,
      isArchived: options.isArchived || false,
      isDraft: options.isDraft !== false, // Draft by default
    };

    return this.request(`/collections/${collectionId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  /**
   * Delete an item from a collection
   */
  async deleteCollectionItem(collectionId, itemId) {
    return this.request(`/collections/${collectionId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Publish items (make them live)
   */
  async publishItems(collectionId, itemIds) {
    const body = {
      itemIds,
    };

    return this.request(`/collections/${collectionId}/items/publish`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export default WebflowApiClient;
