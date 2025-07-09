import React, { useState } from 'react';
import axios from 'axios';
import UrlCard from './UrlCard';

function UrlShortener() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [error, setError] = useState('');
  
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setShortenedUrl(null);
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    if (!validateUrl(url)) {
      console.log('Invalid URL entered:', url); // Debug log
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/url`, { url });
      setShortenedUrl({
        shortURL: response.data.shortURL,
        longURL: response.data.longURL
      });
      setUrl('');
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">Shorten Your URL</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="input-field flex-grow"
            placeholder="Enter a long URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="neon-button whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              'Shorten URL'
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-500/30 border border-red-700 rounded-lg text-red-100">
          {error}
        </div>
      )}
      
      {shortenedUrl && <UrlCard {...shortenedUrl} />}
    </section>
  );
}

export default UrlShortener;