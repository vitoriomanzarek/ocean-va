/**
 * API Endpoint: Sync VAs from Webflow
 * GET /api/sync/vas
 * 
 * Manually triggers synchronization of Virtual Assistants from Webflow CMS
 */

import { syncVAs } from '../../../lib/webflow-sync.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const vas = await syncVAs();

    return res.status(200).json({
      success: true,
      count: vas.length,
      message: `Successfully synced ${vas.length} Virtual Assistants`,
      lastSync: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error syncing VAs:', error);
    return res.status(500).json({ 
      error: 'Failed to sync Virtual Assistants',
      message: error.message 
    });
  }
}

