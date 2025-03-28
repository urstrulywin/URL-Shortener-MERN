
import React, { useState } from 'react';

function UrlCard({ shortURL, longURL }) {
  const [copied, setCopied] = useState(false);
  const fullShortUrl = `http://localhost:${import.meta.env.VITE_PORT}/${shortURL}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy: ' + err);
    }
  };

  return (
    <div className="glass-card p-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow overflow-hidden">
          <h3 className="font-bold text-lg text-cyan-400 mb-1">Your Shortened URL</h3>
          <a 
            href={fullShortUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 transition-colors"
          >
            {fullShortUrl}
          </a>
          <p className="text-gray-400 text-sm mt-2 truncate" title={longURL}>
            Original: {longURL}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className={`${
            copied ? 'bg-green-500 hover:bg-green-600' : 'bg-cyan-500 hover:bg-cyan-600'
          } px-4 py-2 rounded-lg transition duration-300 min-w-[100px] text-center`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default UrlCard;