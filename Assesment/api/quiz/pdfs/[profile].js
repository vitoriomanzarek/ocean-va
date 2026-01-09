/**
 * API Route: Serve PDF HTML files
 * GET /api/quiz/pdfs/[profile]
 * 
 * Serves the PDF HTML files for each profile
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfFiles = {
  'profile-a-case-study': 'profile-a-case-study.html',
  'profile-b-10-tasks-guide': 'profile-b-10-tasks-guide.html',
  'profile-c-rescue-plan': 'profile-c-rescue-plan.html',
  'profile-d-complete-guide': 'profile-d-complete-guide.html'
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  try {
    // Get profile from query or path
    const { profile } = req.query;
    
    // Map profile letters to filenames
    const profileMap = {
      'A': 'profile-a-case-study',
      'B': 'profile-b-10-tasks-guide',
      'C': 'profile-c-rescue-plan',
      'D': 'profile-d-complete-guide'
    };
    
    const profileKey = profileMap[profile] || profile || 'profile-d-complete-guide';
    const fileName = pdfFiles[profileKey] || pdfFiles['profile-d-complete-guide'];
    
    // Read the HTML file
    const htmlPath = join(__dirname, '..', '..', '..', 'public', 'quiz', 'pdfs', fileName);
    const html = await readFile(htmlPath, 'utf-8');
    
    // Set content type
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // Send the HTML
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error serving PDF:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to serve PDF content'
    });
  }
}

