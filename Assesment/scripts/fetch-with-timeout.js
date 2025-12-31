/**
 * Helper function for fetch with timeout
 * Prevents scripts from hanging indefinitely on network errors
 */

/**
 * Fetch with timeout wrapper
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options (headers, method, body, etc.)
 * @param {number} timeoutMs - Timeout in milliseconds (default: 30000 = 30s)
 * @returns {Promise<Response>} Fetch response
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle timeout errors
    if (error.name === 'AbortError') {
      const timeoutError = new Error(`Network timeout: Request to ${url} took too long (>${timeoutMs}ms). Please check your internet connection.`);
      timeoutError.name = 'TimeoutError';
      throw timeoutError;
    }
    
    // Handle other network errors
    if (error.message.includes('fetch failed') || 
        error.message.includes('ECONNREFUSED') || 
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('ENOTFOUND') ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND') {
      const networkError = new Error(`Network connection error: Unable to connect to ${url}. ${error.message}. Please check your internet connection.`);
      networkError.name = 'NetworkError';
      throw networkError;
    }
    
    // Re-throw other errors
    throw error;
  }
}

export default fetchWithTimeout;

