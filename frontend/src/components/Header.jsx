import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
function Header() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="text-center py-6">
      <div className="flex justify-between items-center px-4">
        <Link to="/" className="text-4xl font-bold">
          <span className="text-cyan-400">Short </span>
          <span className="text-white">N</span>
          <span className="text-cyan-400"> Fast</span>
        </Link>
        <div className="flex items-center space-x-6">
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                `hover:text-cyan-400 ${isActive ? 'text-cyan-400 font-medium border-b-2 border-cyan-400' : 'text-white'}`
                }
            >
                Home
            </NavLink>
            
            {token ? (
                <>
                <NavLink 
                    to="/admin" 
                    className={({ isActive }) => 
                    `hover:text-cyan-400 ${isActive ? 'text-cyan-400 font-medium border-b-2 border-cyan-400' : 'text-white'}`
                    }
                >
                    Dashboard
                </NavLink>
                <button 
                    onClick={handleLogout} 
                    className="hover:text-cyan-400 text-white"
                >
                    Logout
                </button>
                </>
            ) : (
                <NavLink 
                to="/login" 
                className={({ isActive }) => 
                    `hover:text-cyan-400 ${isActive ? 'text-cyan-400 font-medium border-b-2 border-cyan-400' : 'text-white'}`
                }
                >
                Admin Login
                </NavLink>
            )}
            </div>
      </div>
    </header>
  );
}

export default Header;