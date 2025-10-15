import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search, Clock, Star, Heart, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { eventService } from '../services/eventService';

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [categories] = useState(['All', 'Arts', 'Tech', 'Health', 'Education', 'Music', 'Sports']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // Use mock data if backend fails
      setEvents(getMockEvents());
    }
    setLoading(false);
  };

  const getMockEvents = () => [
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
      description: 'Learn advanced React patterns, hooks, and performance optimization.'
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
      description: 'Beginner-friendly pottery class for all skill levels.'
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
      description: 'Relaxing yoga session to start your day right.'
    }
  ];

  const toggleSaveEvent = async (eventId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      if (savedEvents.includes(eventId)) {
        await eventService.unsaveEvent(eventId);
        setSavedEvents(prev => prev.filter(id => id !== eventId));
      } else {
        await eventService.saveEvent(eventId);
        setSavedEvents(prev => [...prev, eventId]);
      }
    } catch (error) {
      console.error('Failed to save/unsave event:', error);
    }
  };

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
    const searchMatch = event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       event.organizer?.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Local Events Near You</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl">Find unique workshops, classes, and events happening in your community.</p>
          
          <div className="flex gap-3 flex-wrap">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition flex items-center gap-2">
              <Search size={20} /> Explore Events
            </button>
            <button 
              onClick={() => isLoggedIn ? navigate('/create') : navigate('/login')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Create Event
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
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

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl font-bold text-purple-600">Loading events...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-6xl">
                  {event.image || '🎉'}
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{event.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveEvent(event.id);
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
                      <span>{event.distance || event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{event.rating || 4.5}</span>
                      <span className="text-xs text-gray-600">({event.reviews || 0})</span>
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
        )}
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-8xl relative">
              {selectedEvent.image || '🎉'}
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
                  <p className="text-xs text-gray-600 mt-2">Location</p>
                  <p className="font-bold text-gray-900">{selectedEvent.distance || selectedEvent.location}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl">👥</div>
                  <p className="text-xs text-gray-600 mt-2">Attendees</p>
                  <p className="font-bold text-gray-900">{selectedEvent.attendees || 0}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About this event</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="flex gap-4 pt-4 border-t flex-wrap">
                <button
                  onClick={() => toggleSaveEvent(selectedEvent.id)}
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
      )}
    </div>
  );
}