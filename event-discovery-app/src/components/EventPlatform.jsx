import React, { useState } from 'react';
import { MapPin, Calendar, Search, Menu, X, Heart, Star, Clock, ArrowRight } from 'lucide-react';

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

  // HEADER COMPONENT
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

  // LOGIN MODAL
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

  // HOME PAGE
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Local Events Near You</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl">Find unique workshops, classes, and events happening in your community. Connect with local enthusiasts and expand your horizons.</p>
          
          <div className="flex gap-3 flex-wrap">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition flex items-center gap-2">
              <Search size={20} /> Explore Events
            </button>
            <button 
              onClick={() => {
                if(isLoggedIn) setCurrentPage('create');
                else setShowLoginModal(true);
              }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Create Event
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white shadow-md sticky top-20 z-30 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events, organizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <select className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none appearance-none bg-white cursor-pointer">
                <option>Delhi, India (5 km)</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <select className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none appearance-none bg-white cursor-pointer">
                <option>Any Date</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-6xl">
                {event.image}
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{event.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if(!isLoggedIn) {
                        setShowLoginModal(true);
                      } else {
                        toggleSaveEvent(event.id);
                      }
                    }}
                    className="p-2 hover:bg-purple-100 rounded-lg transition"
                  >
                    <Heart
                      size={20}
                      className={savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-3">{event.organizer}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{event.distance}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{event.rating}</span>
                    <span className="text-xs text-gray-600">({event.reviews})</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{event.price}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // EVENT DETAILS MODAL
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

  // SAVED EVENTS PAGE
  const SavedPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Your Saved Events</h2>
        
        {savedEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📌</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No saved events yet</h3>
            <p className="text-gray-600 mb-6">Start exploring and save your favorite events to see them here.</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.filter(e => savedEvents.includes(e.id)).map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-6xl">
                  {event.image}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{event.organizer}</p>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} /> {event.distance}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveEvent(event.id)}
                    className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
                  >
                    Remove from Saved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // CREATE EVENT PAGE
  const CreateEventPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8">
            <h2 className="text-3xl font-bold">Create Your Event</h2>
            <p className="text-orange-100 mt-2">Share your workshop or event with the community</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                <input type="text" placeholder="Your event title..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none bg-white cursor-pointer">
                  <option>Arts</option>
                  <option>Tech</option>
                  <option>Health</option>
                  <option>Education</option>
                  <option>Music</option>
                  <option>Sports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                <input type="time" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input type="text" placeholder="City, Area..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                <input type="number" placeholder="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea rows="5" placeholder="Describe your event..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none transition"></textarea>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setCurrentPage('home')} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // PROFILE PAGE
  const ProfilePage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="text-6xl">👤</div>
              <div>
                <h2 className="text-3xl font-bold">{userName}</h2>
                <p className="text-purple-100 mt-2 capitalize">{userRole === 'organizer' ? 'Event Organizer' : 'Event Enthusiast'}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="border-b pb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Username</label>
                  <p className="text-lg text-gray-900 mt-2 font-semibold">{userName}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Account Type</label>
                  <p className="text-lg text-gray-900 mt-2 font-semibold capitalize">{userRole === 'organizer' ? 'Event Organizer' : 'Regular User'}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Activity Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Events Saved</p>
                  <p className="text-4xl font-bold text-purple-600">{savedEvents.length}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Events Attended</p>
                  <p className="text-4xl font-bold text-blue-600">5</p>
                </div>
                {userRole === 'organizer' && (
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <p className="text-gray-600 text-sm font-semibold mb-2">Events Created</p>
                    <p className="text-4xl font-bold text-orange-600">3</p>
                  </div>
                )}
              </div>
            </div>

            {userRole === 'organizer' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Events</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-600">
                    <h4 className="font-bold text-gray-900">Advanced React Workshop</h4>
                    <p className="text-sm text-gray-600 mt-2">24 attendees • ₹500</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border-l-4 border-orange-600">
                    <h4 className="font-bold text-gray-900">Web Design Bootcamp</h4>
                    <p className="text-sm text-gray-600 mt-2">18 attendees • ₹1200</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setCurrentPage('home')} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                Back to Home
              </button>
              <button onClick={handleLogout} className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // RENDER PAGE BASED ON STATE
  return (
    <>
      <Header />
      <LoginModal />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'saved' && isLoggedIn && <SavedPage />}
      {currentPage === 'create' && isLoggedIn && <CreateEventPage />}
      {currentPage === 'profile' && isLoggedIn && <ProfilePage />}
      <EventDetailsModal />
    </>
  );
}