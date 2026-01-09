/**
 * API Route: Serve Quiz Landing Page
 * GET /
 * 
 * Serves the quiz landing page HTML
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  try {
    // Read the HTML file from public folder
    const htmlPath = join(__dirname, '..', 'public', 'index.html');
    const html = await readFile(htmlPath, 'utf-8');
    
    // Set content type
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // Send the HTML
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error serving index.html:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to serve landing page'
    });
  }
}

