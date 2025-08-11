// api/shorten.js - Vercel serverless function for URL shortening
import { kv } from '@vercel/kv';
await kv.set(shortCode, { originalUrl, createdAt: new Date().toISOString(), clicks: 0 });
let urlDatabase = new Map(); // In production, use a proper database

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalUrl, shortCode } = req.body;

    // Validation
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Validate short code
    if (shortCode) {
      if (shortCode.length > 20) {
        return res.status(400).json({ error: 'Short code too long (max 20 characters)' });
      }
      
      if (!/^[a-zA-Z0-9_-]+$/.test(shortCode)) {
        return res.status(400).json({ error: 'Short code can only contain letters, numbers, hyphens, and underscores' });
      }

      // Check if short code already exists
      if (urlDatabase.has(shortCode)) {
        return res.status(400).json({ error: 'Short code already exists. Please choose another.' });
      }
    }

    const finalShortCode = shortCode || generateRandomCode();

    // Store in database (in production, use a proper database)
    urlDatabase.set(finalShortCode, {
      originalUrl,
      shortCode: finalShortCode,
      createdAt: new Date().toISOString(),
      clicks: 0
    });

    res.status(200).json({
      success: true,
      shortCode: finalShortCode,
      originalUrl,
      shortUrl: `/q/${finalShortCode}`
    });

  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateRandomCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}