// FILE: src/components/EventPlatform.jsx

import React, { useState } from 'react';
import { Menu, X, Heart, Star } from 'lucide-react';
import HomePage from './HomePage.jsx';
import SavedPage from './SavedPage.jsx';
import CreateEventPage from './CreateEventPage.jsx';
import ProfilePage from './ProfilePage.jsx';

export default function EventPlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [userName, setUserName] = useState('');

  const categories = ['All', 'Arts', 'Tech', 'Health', 'Education', 'Music', 'Sports'];
  
  const mockEvents = [
    {
      id: 1,
      title: 'Advanced React Workshop',
      organizer: 'Tech Hub',
      category: 'Tech',
      date: '2025-10-20',
      time: '2:00 PM',
      location: 'Delhi, India',
      distance: '2.5 km',
      price: '₹500',
      attendees: 24,
      rating: 4.8,
      reviews: 12,
      image: '🚀',
      description: 'Learn advanced React patterns, hooks, and performance optimization.',
      isSaved: false
    },
    {
      id: 2,
      title: 'Pottery & Ceramics Class',
      organizer: 'Creative Arts Studio',
      category: 'Arts',
      date: '2025-10-19',
      time: '6:00 PM',
      location: 'Delhi, India',
      distance: '1.2 km',
      price: '₹300',
      attendees: 15,
      rating: 4.6,
      reviews: 8,
      image: '🎨',
      description: 'Beginner-friendly pottery class for all skill levels.',
      isSaved: false
    },
    {
      id: 3,
      title: 'Morning Yoga Session',
      organizer: 'Wellness Center',
      category: 'Health',
      date: '2025-10-21',
      time: '7:00 AM',
      location: 'Delhi, India',
      distance: '3.1 km',
      price: 'Free',
      attendees: 32,
      rating: 4.9,
      reviews: 24,
      image: '🧘',
      description: 'Relaxing yoga session to start your day right.',
      isSaved: false
    },
    {
      id: 4,
      title: 'Jazz Night Live',
      organizer: 'The Blue Note',
      category: 'Music',
      date: '2025-10-22',
      time: '8:00 PM',
      location: 'Delhi, India',
      distance: '4.5 km',
      price: '₹1000',
      attendees: 120,
      rating: 4.7,
      reviews: 45,
      image: '🎵',
      description: 'Live jazz performance from local artists.',
      isSaved: false
    },
    {
      id: 5,
      title: 'Digital Marketing Masterclass',
      organizer: 'Growth Academy',
      category: 'Education',
      date: '2025-10-25',
      time: '10:00 AM',
      location: 'Delhi, India',
      distance: '2.8 km',
      price: '₹800',
      attendees: 45,
      rating: 4.5,
      reviews: 18,
      image: '📱',
      description: 'Master the latest digital marketing strategies and tools.',
      isSaved: false
    },
    {
      id: 6,
      title: 'Football Tournament',
      organizer: 'Sports League',
      category: 'Sports',
      date: '2025-10-23',
      time: '4:00 PM',
      location: 'Delhi, India',
      distance: '5.2 km',
      price: 'Free',
      attendees: 200,
      rating: 4.4,
      reviews: 32,
      image: '⚽',
      description: 'Join the competitive football tournament.',
      isSaved: false
    }
  ];

  const toggleSaveEvent = (eventId) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleLogin = (email, role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(email.split('@')[0] || 'User');
    setShowLoginModal(false);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setUserName('');
    setCurrentPage('home');
  };

  const filteredEvents = mockEvents.filter(event => {
    const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
    const searchMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // ======== HEADER COMPONENT ========
  const Header = () => (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="text-3xl">🎯</div>
          <h1 className="text-2xl font-bold hidden sm:block">EventHub</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-purple-200 transition font-semibold">Browse</button>
          {isLoggedIn && <button onClick={() => setCurrentPage('saved')} className="hover:text-purple-200 transition font-semibold">Saved</button>}
          {isLoggedIn && <button onClick={() => setCurrentPage('create')} className="hover:text-purple-200 transition font-semibold">Create Event</button>}
          {isLoggedIn && <button onClick={() => setCurrentPage('profile')} className="hover:text-purple-200 transition font-semibold">Profile</button>}
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm">👤 {userName}</span>
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
          <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-purple-600 rounded">Browse</button>
          {isLoggedIn && <button onClick={() => { setCurrentPage('saved'); setMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-purple-600 rounded">Saved</button>}
          {isLoggedIn && <button onClick={() => { setCurrentPage('create'); setMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-purple-600 rounded">Create Event</button>}
          {isLoggedIn && <button onClick={() => { setCurrentPage('profile'); setMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-purple-600 rounded">Profile</button>}
        </div>
      )}
    </header>
  );

  // ======== LOGIN MODAL ========
  const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    return (
      showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-purple-100 mt-2">Login to EventHub</p>
            </div>
            
            <div className="p-8 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition" 
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition" 
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Login As</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none appearance-none bg-white"
                >
                  <option value="user">Regular User</option>
                  <option value="organizer">Event Organizer</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => {
                    if(email && password) {
                      handleLogin(email, role);
                    } else {
                      alert('Please fill all fields');
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  // ======== EVENT DETAILS MODAL ========
  const EventDetailsModal = () => (
    selectedEvent && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
          <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-8xl relative">
            {selectedEvent.image}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <p className="text-lg text-gray-600 mt-2">by {selectedEvent.organizer}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl">📅</div>
                <p className="text-xs text-gray-600 mt-2">Date</p>
                <p className="font-bold text-gray-900">{new Date(selectedEvent.date).toLocaleDateString()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl">⏰</div>
                <p className="text-xs text-gray-600 mt-2">Time</p>
                <p className="font-bold text-gray-900">{selectedEvent.time}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl">📍</div>
                <p className="text-xs text-gray-600 mt-2">Distance</p>
                <p className="font-bold text-gray-900">{selectedEvent.distance}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl">👥</div>
                <p className="text-xs text-gray-600 mt-2">Attendees</p>
                <p className="font-bold text-gray-900">{selectedEvent.attendees}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">About this event</h3>
              <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Ratings & Reviews</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(selectedEvent.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedEvent.rating}</p>
                  <p className="text-sm text-gray-600">{selectedEvent.reviews} reviews</p>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Amazing experience!</span> - Really enjoyed the workshop</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Highly recommended</span> - Great instructor and fun atmosphere</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t flex-wrap">
              <button
                onClick={() => {
                  if(!isLoggedIn) {
                    setShowLoginModal(true);
                  } else {
                    toggleSaveEvent(selectedEvent.id);
                  }
                }}
                className={`flex-1 min-w-[150px] py-3 rounded-lg font-semibold transition border-2 flex items-center justify-center gap-2 ${
                  savedEvents.includes(selectedEvent.id)
                    ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <Heart size={20} fill={savedEvents.includes(selectedEvent.id) ? 'currentColor' : 'none'} />
                {savedEvents.includes(selectedEvent.id) ? 'Saved' : 'Save Event'}
              </button>
              <button className="flex-1 min-w-[150px] bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // ======== RENDER MAIN APP ========
  return (
    <>
      <Header />
      <LoginModal />
      
      {currentPage === 'home' && (
        <HomePage
          categories={categories}
          filteredEvents={filteredEvents}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          savedEvents={savedEvents}
          setSelectedEvent={setSelectedEvent}
          toggleSaveEvent={toggleSaveEvent}
          isLoggedIn={isLoggedIn}
          setShowLoginModal={setShowLoginModal}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'saved' && isLoggedIn && (
        <SavedPage
          savedEvents={savedEvents}
          mockEvents={mockEvents}
          toggleSaveEvent={toggleSaveEvent}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'create' && isLoggedIn && (
        <CreateEventPage 
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'profile' && isLoggedIn && (
        <ProfilePage
          userName={userName}
          userRole={userRole}
          savedEvents={savedEvents}
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
        />
      )}

      <EventDetailsModal />
    </>
  );
}