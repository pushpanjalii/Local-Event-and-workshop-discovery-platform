import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('attendee');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
console.log('yha aa rha hai')
    try {
      if (isRegister) {
        console.log('yha ayay')
        // Register new user
        // await authService.register(email, password, name, role);
        // // After registration, login automatically
        // const response = await authService.login(email, password);

        const registerData={
          email,
          password,
          fullName:name,
          role
        }
        console.log(registerData,'see data at register')
              const response = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const result = await response.json();
      console.log(result,'see result');
      if (result.success) {
        // Handle successful login
        navigate('/');
        console.log('register', data);
      } else {
        // Handle login error
        console.error('Login failed:', data.message);
      }
        login(response.user, response.token);
        navigate('/');
      } else {
        // Login existing user
        // const response = await authService.login(email, password);
        // login(response.user, response.token);
           try {
const data={
  email:email,
  password:password,
  role:role,
  
}
console.log(data,'data')
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        // Handle successful login
        navigate('/');
        console.log('Login successful:', data);
      } else {
        // Handle login error
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
        // navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <h2 className="text-3xl font-bold">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-purple-100 mt-2">{isRegister ? 'Join EventHub today' : 'Login to EventHub'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Full Name</label>
              <input 
                type="text"  
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                required={isRegister}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
            <input 
              type="email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
            <input 
              type="password"  
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Account Type</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none appearance-none bg-white"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Event Organizer</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login')}
          </button>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}