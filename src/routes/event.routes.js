import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addEventReview,
} from "../controllers/EventController.js";
import protect from "../middlewares/auth.middleware.js";


const router = express.Router();


// Event routes     
router.post("/", protect, createEvent);                // Create Event (Organizer only)
router.get("/", getAllEvents);                         // Get all events (with filters)
router.get("/:id", getEventById);                      // Get single event by ID
router.put("/:id", protect, updateEvent);              // Update event (only by organizer)
router.delete("/:id", protect, deleteEvent);           // Delete event (only by organizer)
router.post("/:id/review", protect, addEventReview);   // Add review to event

export default router;
// Note: The 'protect' middleware ensures that only authenticated users can create, update, delete events or add reviews.