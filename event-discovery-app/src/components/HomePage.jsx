import React from 'react';
import { MapPin, Calendar, Search, Clock, Star, Heart, ArrowRight } from 'lucide-react';

export default function HomePage({
  categories,
  filteredEvents,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  savedEvents,
  setSelectedEvent,
  toggleSaveEvent,
  isLoggedIn,
  setShowLoginModal,
  setCurrentPage
}) {
  return (
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
}