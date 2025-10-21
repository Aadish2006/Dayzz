import mongoose from "mongoose";
const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: String },
  frequency: { type: String, default: "daily" },
  goal: { type: Number, default: 1 },
  completedDates: { type: [Date], default: [] },
  reward: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Habit", HabitSchema);
