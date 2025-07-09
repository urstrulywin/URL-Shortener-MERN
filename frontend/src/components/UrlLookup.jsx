
import React, { useState } from 'react';
import axios from 'axios';

function UrlLookup() {
  const [shortCode, setShortCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  
  const handleLookup = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    if (!shortCode.trim()) {
      setError('Please enter a short URL code');
      return;
    }
    
    // Extract code if user entered full URL
    let code = shortCode;
    if (shortCode.includes('/')) {
      try {
        const url = new URL(shortCode);
        code = url.pathname.replace('/', '');
      } catch (e) {
        code = shortCode.split('/').pop();
      }
    }
    
    setIsLoading(true);
    
    try {
      // Redirect to the short URL
      window.open(`${import.meta.env.VITE_BACKEND_URL}/${code}`, '_blank');
      setShowInfo(true);
      setTimeout(() => setShowInfo(false), 5000);
    } catch (err) {
      console.error('Error looking up URL:', err);
      setError('Failed to look up URL');
    } finally {
      setIsLoading(false);
      setShortCode('');
    }
  };
  
  return (
    <section className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">Visit a Short URL</h2>
      
      <form onSubmit={handleLookup}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="input-field flex-grow"
            placeholder="Enter a short code or URL (e.g., abc123 or http://localhost:6000/abc123)"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="neon-button whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? 'Opening...' : 'Visit URL'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-500/30 border border-red-700 rounded-lg text-red-100">
          {error}
        </div>
      )}
      
      {showInfo && (
        <div className="mt-4 p-3 bg-cyan-500/20 border border-cyan-700 rounded-lg">
          Opening URL in a new tab. If nothing happens, please check your popup blocker.
        </div>
      )}
    </section>
  );
}

export default UrlLookup;