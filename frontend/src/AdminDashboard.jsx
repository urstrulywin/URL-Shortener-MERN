import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function AdminDashboard() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        console.log('Fetching URLs with token:', token); // Debug log
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/admin/urls`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('URLs response:', response.data); // Debug log
        setUrls(response.data);
      } catch (err) {
        console.error('Error fetching URLs:', err); // Detailed error log
        setError(err.response?.data?.error || 'Failed to fetch URLs');
      }
    };
    
    if (token) {
      fetchUrls();
    }
  }, [token]); //i think urls

  return (
    <section className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard - URL List</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-500/30 border border-red-700 rounded-lg text-red-100">
          {error}
        </div>
      )}
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3">Short URL</th>
                <th className="p-3">Long URL</th>
                <th className="p-3">Visit Count</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.shortURL} className="border-t border-gray-600">
                  <td className="p-3">
                    <a href={`http://localhost:${import.meta.env.VITE_PORT}/${url.shortURL}`}
                      className="text-cyan-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer" >
                      {url.shortURL}
                    </a>
                  </td>
                  <td className="p-3">{url.longURL}</td>
                  <td className="p-3">{url.visitCount.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;