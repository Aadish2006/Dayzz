import express from "express";
import auth from "../middleware/auth.js";
import Habit from "../models/Habit.js";
const router = express.Router();
// Create habit
router.post("/", auth, async (req, res) => {
  try {
    const habit = new Habit({ ...req.body, user: req.user.id });
    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get user's habits
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Mark completion for a date
router.post("/:id/complete", auth, async (req, res) => {
  try {
    const { date } = req.body; // date in ISO
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!habit) return res.status(404).json({ msg: "Habit not found" });
    const d = new Date(date);
    // prevent duplicates
    const exists = habit.completedDates.find(
      (cd) => new Date(cd).toDateString() === d.toDateString()
    );
    if (!exists) {
      habit.completedDates.push(d);
      await habit.save();
    }
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// other routes: update, delete - omitted for brevity

export default router;
