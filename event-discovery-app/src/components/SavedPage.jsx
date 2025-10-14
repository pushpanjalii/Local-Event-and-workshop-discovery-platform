import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function SavedPage({
  savedEvents,
  mockEvents,
  toggleSaveEvent,
  setCurrentPage
}) {
  return (
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
}
