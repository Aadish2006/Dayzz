import mongoose from "mongoose";
const DiarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    content: { type: String, default: "" },
    mood: { type: String },
    relatedHabits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  },
  { timestamps: true }
);
const Diary = mongoose.model("Diary", DiarySchema);
export default Diary;
