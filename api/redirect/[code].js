// api/redirect/[code].js - Vercel serverless function for URL redirection

// In production, this would connect to your database
// For now, we'll use the same in-memory storage (note: this won't persist across deployments)
import { kv } from '@vercel/kv';
const urlData = await kv.get(code);
let urlDatabase = new Map();

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Short code is required' });
  }

  try {
    // In production, fetch from your database
    const urlData = urlDatabase.get(code);

    if (!urlData) {
      // Return a 404 page or redirect to your main site
      return res.status(404).json({ 
        error: 'Short URL not found',
        message: 'This short URL does not exist or has expired.'
      });
    }

    // Increment click count
    urlData.clicks = (urlData.clicks || 0) + 1;
    urlData.lastAccessed = new Date().toISOString();
    
    // Update the database
    urlDatabase.set(code, urlData);

    // Redirect to the original URL
    res.redirect(302, urlData.originalUrl);

  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}