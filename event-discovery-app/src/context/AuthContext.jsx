import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsLoggedIn(true);
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setUserRole(userData.role || 'user');
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUser({ email, name: email.split('@')[0], role });
    localStorage.setItem('token', 'mock-token-' + Date.now());
    localStorage.setItem('user', JSON.stringify({ email, role }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserRole('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      userRole,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};