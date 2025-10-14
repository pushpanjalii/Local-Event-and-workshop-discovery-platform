import React, { use } from 'react';
import { AuthProvider } from './context/AuthContext';
import EventPlatform from './components/EventPlatform';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <EventPlatform />
    </AuthProvider>
  );
}

export default App;