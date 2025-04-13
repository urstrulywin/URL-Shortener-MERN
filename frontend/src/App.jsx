import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './components/Home';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 to-blue-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  console.log('ProtectedRoute - token exists:', !!token); // Debug log
  
  if (!token) {
    console.log('Redirecting to login...');
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default App;