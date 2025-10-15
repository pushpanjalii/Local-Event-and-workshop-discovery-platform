import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="text-3xl">🎯</div>
          <h1 className="text-2xl font-bold hidden sm:block">EventHub</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`hover:text-purple-200 transition font-semibold ${isActive('/') ? 'text-yellow-300' : ''}`}
          >
            Browse
          </Link>
          {isLoggedIn && (
            <>
              <Link 
                to="/saved" 
                className={`hover:text-purple-200 transition font-semibold ${isActive('/saved') ? 'text-yellow-300' : ''}`}
              >
                Saved
              </Link>
              <Link 
                to="/create" 
                className={`hover:text-purple-200 transition font-semibold ${isActive('/create') ? 'text-yellow-300' : ''}`}
              >
                Create Event
              </Link>
              <Link 
                to="/profile" 
                className={`hover:text-purple-200 transition font-semibold ${isActive('/profile') ? 'text-yellow-300' : ''}`}
              >
                Profile
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link 
              to="/login"
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm">👤 {user?.name || 'User'}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-purple-500 rounded-lg transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-purple-700 px-4 py-4 space-y-2">
          <Link 
            to="/" 
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left p-2 hover:bg-purple-600 rounded"
          >
            Browse
          </Link>
          {isLoggedIn && (
            <>
              <Link 
                to="/saved" 
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left p-2 hover:bg-purple-600 rounded"
              >
                Saved
              </Link>
              <Link 
                to="/create" 
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left p-2 hover:bg-purple-600 rounded"
              >
                Create Event
              </Link>
              <Link 
                to="/profile" 
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left p-2 hover:bg-purple-600 rounded"
              >
                Profile
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}