/**
 * API Route: Upload Image to Webflow Assets
 * 
 * Handles image file uploads from the VA creation form
 * Uploads images to Webflow Assets and returns the CDN URL
 * 
 * Last updated: 2025-01-XX
 */

import 'dotenv/config';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const SITE_ID = process.env.WEBFLOW_SITE_ID || '66e9b3f71eb321a17e92218a';

/**
 * Upload image to Webflow Assets
 * Uses Webflow API v2 to upload assets
 */
async function uploadToWebflow(fileBuffer, fileName, mimeType) {
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('WEBFLOW_API_TOKEN not configured');
  }

  try {
    // Step 1: Request upload URL from Webflow
    const uploadRequestResponse = await fetch(
      `${WEBFLOW_API_BASE}/sites/${SITE_ID}/assets/upload`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept-Version': '1.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: fileName,
          fileSize: fileBuffer.length,
          contentType: mimeType
        })
      }
    );

    if (!uploadRequestResponse.ok) {
      const errorText = await uploadRequestResponse.text();
      console.error('Upload request error:', errorText);
      throw new Error(`Webflow upload request failed: ${uploadRequestResponse.status} - ${errorText}`);
    }

    const uploadData = await uploadRequestResponse.json();
    
    if (!uploadData.uploadUrl || !uploadData.assetId) {
      throw new Error('Invalid response from Webflow upload request');
    }

    // Step 2: Upload file to the provided URL (S3)
    const uploadResponse = await fetch(uploadData.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileBuffer.length.toString()
      },
      body: fileBuffer
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('File upload error:', errorText);
      throw new Error(`File upload failed: ${uploadResponse.status} - ${errorText}`);
    }

    // Step 3: Get the asset details
    const assetResponse = await fetch(
      `${WEBFLOW_API_BASE}/sites/${SITE_ID}/assets/${uploadData.assetId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept-Version': '1.0',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!assetResponse.ok) {
      const errorText = await assetResponse.text();
      console.error('Asset details error:', errorText);
      // If we can't get details, return what we have
      return {
        url: uploadData.url || uploadData.uploadUrl,
        assetId: uploadData.assetId,
        fileName: fileName
      };
    }

    const asset = await assetResponse.json();
    
    return {
      url: asset.url || asset.displayName || uploadData.url,
      assetId: asset.id || uploadData.assetId,
      fileName: asset.fileName || fileName
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174',
    'https://ocean-va.vercel.app',
    'https://www.oceanvirtualassistant.com'
  ];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if file is provided
    if (!req.body || !req.body.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Extract file data from base64
    const { file, fileName, mimeType } = req.body;

    if (!file || !fileName || !mimeType) {
      return res.status(400).json({ error: 'Missing file data' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(mimeType)) {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }

    // Convert base64 to buffer
    const base64Data = file.split(',')[1] || file; // Remove data:image/...;base64, prefix if present
    const fileBuffer = Buffer.from(base64Data, 'base64');

    // Validate file size (max 1MB)
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (fileBuffer.length > maxSize) {
      return res.status(400).json({ error: 'File size exceeds 1MB limit' });
    }

    // Upload to Webflow
    const result = await uploadToWebflow(fileBuffer, fileName, mimeType);

    return res.status(200).json({
      success: true,
      url: result.url,
      assetId: result.assetId,
      fileName: result.fileName
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({
      error: 'Failed to upload image',
      message: error.message
    });
  }
}
