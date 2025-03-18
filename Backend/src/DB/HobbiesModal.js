const mongoose = require("mongoose");


const Hobbies = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hobbyName: { type: String, required: true },
  type: { type: String, enum: ["streak", "progress"], required: true },
  subtype: { type: String },
  streakCount: { type: Number, default: 0 },
  lastupdated: { type: Date },
  progress: {
    unit: { type: String },
    totalGoal: { type: Number },
    currentProgress: { type: Number, default: 0 },
    goal: { type: String },
    startDate: { type: Date, default: Date.now },
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hobbies", Hobbies);

