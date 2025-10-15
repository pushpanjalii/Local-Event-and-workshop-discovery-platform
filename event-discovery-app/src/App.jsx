import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SavedPage from './components/SavedPage';
import CreateEventPage from './components/CreateEventPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            
            {/* Protected Routes - Require Login */}
            <Route 
              path="/saved" 
              element={
                <ProtectedRoute>
                  <SavedPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <CreateEventPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
