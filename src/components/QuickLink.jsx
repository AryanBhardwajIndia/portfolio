import React, { useState } from 'react';
import './QuickLink.css';

const QuickLink = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recentLinks, setRecentLinks] = useState([]);

  const generateShortCode = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const shortenUrl = async () => {
    setError('');
    setSuccess('');

    if (!originalUrl) {
      setError('Please enter a URL to shorten');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setIsLoading(true);

    try {
      const codeToUse = customCode || generateShortCode();
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl,
          shortCode: codeToUse,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const fullShortUrl = `${window.location.origin}/q/${data.shortCode}`;
        setShortenedUrl(fullShortUrl);
        setShortCode(data.shortCode);
        setSuccess('URL shortened successfully!');
        
        // Add to recent links
        const newLink = {
          original: originalUrl,
          shortened: fullShortUrl,
          code: data.shortCode,
          timestamp: new Date().toLocaleString()
        };
        setRecentLinks(prev => [newLink, ...prev.slice(0, 4)]);
        
        // Clear form
        setOriginalUrl('');
        setCustomCode('');
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Copied to clipboard!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="quicklink-container">
      <div className="quicklink-header">
        <h1>QuickLink</h1>
        <p>Transform long URLs into short, shareable links</p>
      </div>

      <div className="quicklink-main">
        <div className="url-input-section">
          <div className="input-group">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="url-input"
            />
            <button
              onClick={shortenUrl}
              disabled={isLoading}
              className={`shorten-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Shorten'
              )}
            </button>
          </div>

          <div className="custom-code-section">
            <input
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.replace(/\s/g, ''))}
              placeholder="Custom alias (optional)"
              className="custom-input"
              maxLength={20}
            />
            <span className="custom-help">Leave empty for random code</span>
          </div>
        </div>

        {error && (
          <div className="message error-message">
            <span className="message-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="message success-message">
            <span className="message-icon">✅</span>
            {success}
          </div>
        )}

        {shortenedUrl && (
          <div className="result-section">
            <h3>Your shortened URL:</h3>
            <div className="result-container">
              <input
                type="text"
                value={shortenedUrl}
                readOnly
                className="result-input"
              />
              <button
                onClick={() => copyToClipboard(shortenedUrl)}
                className="copy-btn"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {recentLinks.length > 0 && (
          <div className="recent-links">
            <h3>Recent Links</h3>
            <div className="links-list">
              {recentLinks.map((link, index) => (
                <div key={index} className="link-item">
                  <div className="link-details">
                    <div className="original-url">
                      {link.original.length > 40 
                        ? link.original.substring(0, 40) + '...' 
                        : link.original}
                    </div>
                    <div className="shortened-url">
                      <span onClick={() => copyToClipboard(link.shortened)} className="clickable">
                        {link.shortened}
                      </span>
                    </div>
                    <div className="timestamp">{link.timestamp}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(link.shortened)}
                    className="mini-copy-btn"
                  >
                    📋
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="quicklink-footer">
        <p>Built with ❤️ for quick and easy link shortening</p>
      </div>
    </div>
  );
};

export default QuickLink;