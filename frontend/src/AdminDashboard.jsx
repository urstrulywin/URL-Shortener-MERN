import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

function AdminDashboard() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    shortUrl: null
  });
  const { token } = useContext(AuthContext);

  const fetchUrls = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/admin/urls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch URLs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUrls();
  }, [token]);

  const handleDeleteClick = (shortUrl) => {
    setDeleteModal({ show: true, shortUrl });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:${import.meta.env.VITE_PORT}/admin/urls/${deleteModal.shortUrl}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('URL deleted successfully');
      fetchUrls();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete URL');
    } finally {
      setDeleteModal({ show: false, shortUrl: null });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <section className="max-w-6xl mx-auto mt-8 p-6">
      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-3">Confirm Deletion</h3>
            <p className="text-gray-300 mb-4">Are you sure you want to delete this URL?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal({ show: false, shortUrl: null })}
                className="px-3 py-1 border border-gray-600 rounded text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="backdrop-blur-lg bg-indigo-900/20 rounded-xl shadow-xl border border-indigo-400/20 p-6">
        <h2 className="text-2xl font-bold text-indigo-100 mb-6">URI Management Dashboard</h2>
        
        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 backdrop-blur-sm bg-rose-500/30 border border-rose-400/40 rounded-lg text-rose-100">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 backdrop-blur-sm bg-emerald-500/30 border border-emerald-400/40 rounded-lg text-emerald-100">
            {success}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-400"></div>
          </div>
        ) : (
          urls.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-indigo-400/20">
              <table className="min-w-full divide-y divide-indigo-400/20 backdrop-blur-sm">
                <thead className="bg-indigo-900/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Short URL</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Original URL</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Visits</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-400/10">
                  {urls.map((url) => (
                    <tr key={url._id} className="hover:bg-indigo-900/10 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <a 
                          href={`http://localhost:${import.meta.env.VITE_PORT}/${url.shortURL}`}
                          className="text-cyan-300 hover:text-cyan-200 hover:underline"
                        >
                          {url.shortURL}
                        </a>
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate text-indigo-100">
                        {url.longURL}
                      </td>
                      <td className="px-4 py-3 text-indigo-100">
                        {url.visitCount?.length || 0}
                      </td>
                      <td className="px-4 py-3 text-indigo-200/80 text-sm">
                        {formatDate(url.createdAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteClick(url.shortURL)}
                          className="px-3 py-1 bg-red-600/90 hover:bg-red-700/90 text-white rounded-md text-sm transition-all hover:shadow-[0_0_8px_-2px_rgba(244,63,94,0.5)]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-indigo-200/70 backdrop-blur-sm bg-indigo-900/10 rounded-lg">
              No URLs found in the database
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;