/**
 * Session Storage Module
 * Shared in-memory session storage for all API endpoints
 * 
 * In production, replace with Redis or database
 */

// In-memory session storage
const sessions = new Map();

/**
 * Get session by ID
 * @param {string} sessionId - Session identifier
 * @returns {Object|null} Session object or null if not found
 */
export function getSession(sessionId) {
  return sessions.get(sessionId) || null;
}

/**
 * Set/Update session
 * @param {string} sessionId - Session identifier
 * @param {Object} session - Session object
 */
export function setSession(sessionId, session) {
  sessions.set(sessionId, session);
}

/**
 * Create a new session
 * @param {string} sessionId - Optional session ID (will generate if not provided)
 * @returns {Object} New session object
 */
export function createSession(sessionId = null) {
  const id = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session = {
    sessionId: id,
    createdAt: new Date().toISOString(),
    conversationHistory: [],
    matchingCriteria: {},
    currentQuestionIndex: 0
  };

  sessions.set(id, session);
  return session;
}

/**
 * Delete session
 * @param {string} sessionId - Session identifier
 * @returns {boolean} True if session was deleted, false if not found
 */
export function deleteSession(sessionId) {
  return sessions.delete(sessionId);
}

/**
 * Get all sessions (for debugging/admin purposes)
 * @returns {Array} Array of session objects
 */
export function getAllSessions() {
  return Array.from(sessions.values());
}

/**
 * Clean up old sessions (older than specified hours)
 * @param {number} hours - Hours after which sessions expire
 */
export function cleanupOldSessions(hours = 24) {
  const now = Date.now();
  const expireTime = hours * 60 * 60 * 1000; // Convert to milliseconds

  for (const [sessionId, session] of sessions.entries()) {
    const sessionAge = now - new Date(session.createdAt).getTime();
    if (sessionAge > expireTime) {
      sessions.delete(sessionId);
    }
  }
}

// Clean up old sessions every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    cleanupOldSessions(24);
  }, 60 * 60 * 1000); // Every hour
}

export default {
  getSession,
  setSession,
  createSession,
  deleteSession,
  getAllSessions,
  cleanupOldSessions
};

