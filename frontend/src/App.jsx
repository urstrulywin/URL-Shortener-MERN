import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import UrlShortener from './components/UrlShortener.jsx';
import UrlLookup from './components/UrlLookup.jsx'
import Login from './Login.jsx';
import AdminDashboard from './AdminDashboard.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <nav className="p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Short N Fast</Link>
          <div>
            <Link to="/" className="mr-4 hover:text-cyan-400">Home</Link>
            <AuthNav />
          </div>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/" element={<UrlLookup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <footer className="p-4 text-center">
          Made by Vishnu
        </footer>
      </div>
    </AuthProvider>
  );
}

// Component to handle navigation based on auth state
const AuthNav = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return token ? (
    <>
      <Link to="/admin" className="mr-4 hover:text-cyan-400">Admin Dashboard</Link>
      <button onClick={handleLogout} className="hover:text-cyan-400">Logout</button>
    </>
  ) : (
    <Link to="/login" className="hover:text-cyan-400">Admin Login</Link>
  );
};

// Protected route for admin dashboard
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export default App;