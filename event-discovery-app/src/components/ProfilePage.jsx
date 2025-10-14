import React from 'react';

export default function ProfilePage({
  userName,
  userRole,
  savedEvents,
  setCurrentPage,
  handleLogout
}) {
  return (
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
              <button 
                onClick={() => setCurrentPage('home')} 
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Back to Home
              </button>
              <button 
                onClick={handleLogout} 
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}