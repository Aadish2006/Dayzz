import express from "express";
import auth from "../middleware/auth.js";
import Diary from "../models/Diary.js";
const router = express.Router();

// Create or update diary by date
router.post("/", auth, async (req, res) => {
  try {
    const { date, content, mood, relatedHabits } = req.body;
    const d = new Date(date);
    let entry = await Diary.findOne({ user: req.user.id, date: d });
    if (entry) {
      entry.content = content;
      entry.mood = mood;
      entry.relatedHabits = relatedHabits || [];
      await entry.save();
    } else {
      entry = new Diary({
        user: req.user.id,
        date: d,
        content,
        mood,
        relatedHabits,
      });
      await entry.save();
    }
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get diary entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Diary.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
