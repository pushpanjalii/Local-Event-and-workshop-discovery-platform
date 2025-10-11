import Event from "../models/Event.models.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Only organizers can create events" });
    }

    const event = new Event({
      ...req.body,
      organizer: req.user._id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}; //what feilds are required to create an event? title, description, date, time, location, category, price, image(optional)


export const getAllEvents = async (req, res) => {
  try {
    const { category, city, keyword } = req.query;
    const query = {};

    if (category) query.category = category;
    if (city) query.city = city;
    if (keyword) query.title = { $regex: keyword, $options: "i" }; // Case-insensitive search for keyword in title

    const events = await Event.find(query).populate("organizer", "name email"); //where name and email are the fields we want to populate.
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    Object.assign(event, req.body);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addEventReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyReviewed = event.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed)
      return res.status(400).json({ message: "You have already reviewed this event" });

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    event.reviews.push(review);

    // Calculate average rating correctly
    event.averageRating =
      event.reviews.reduce((acc, item) => acc + item.rating, 0) /
      event.reviews.length;

    await event.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
