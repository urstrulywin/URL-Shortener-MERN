import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/auth/login`, { username, password });
      login(response.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to log in');
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            id="username"
            type="text"
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            id="password"
            type="password"
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-200"
        >
          Login
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-500/30 border border-red-700 rounded-lg text-red-100">
          {error}
        </div>
      )}
    </section>
  );
}

export default Login;