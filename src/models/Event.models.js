import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  location: String,
  city: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      comment: String,
    },
  ],
});

export default mongoose.model("Event", eventSchema);