import api from './Api.js';

export const eventService = {
  getEvents: async (filters = {}) => {
    try {
      const response = await api.get('/events', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  searchEvents: async (query) => {
    try {
      const response = await api.get('/events/search', { params: { query } });
      return response.data;
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  saveEvent: async (eventId) => {
    try {
      const response = await api.post(`/events/${eventId}/save`);
      return response.data;
    } catch (error) {
      console.error('Error saving event:', error);
      throw error;
    }
  },

  unsaveEvent: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}/unsave`);
      return response.data;
    } catch (error) {
      console.error('Error unsaving event:', error);
      throw error;
    }
  },

  addReview: async (eventId, reviewData) => {
    try {
      const response = await api.post(`/events/${eventId}/review`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }
};