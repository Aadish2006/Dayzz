import { useState, useEffect } from "react";
// Removed: import { useContext } from "react"; // AuthContext is only needed in LogoutButton now
import AddHabit from "../components/AddHabit";
import DiaryEditor from "../components/DiaryEditor";
import HabitCalendar from "../components/HabitCalendar";
import HabitSlider from "../components/HabitSlider";
import LogoutButton from "./LogoutButton";
import api from "../api/axios";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await api.get('/habits'); // Fetches user habits
      setHabits(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching habits:", error.response?.data?.msg || error);
      setLoading(false);
    }
  };

  const handleHabitAdded = (newHabit) => {
    setHabits((prevHabits) => [newHabit, ...prevHabits]);
  };

  const handleHabitComplete = (id, date) => {
    setHabits((prevHabits) => 
      prevHabits.map((habit) => 
        habit._id === id
          ? { ...habit, completedDates: [...habit.completedDates, date] }
          : habit
      )
    );
  };

  // Mock function for saving a diary entry
  const handleDiarySaved = (entry) => {
    console.log("Diary entry saved:", entry);
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-indigo-600">Loading dashboard...</h1>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-800">Dayzz Dashboard</h1>
        {/* Modular Logout Button */}
        <LogoutButton />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Habit Management Section (Col 1/3) */}
        <div className="lg:col-span-1 space-y-8">
          <AddHabit onHabitAdded={handleHabitAdded} />

          <DiaryEditor 
            onEntrySaved={handleDiarySaved} 
            availableHabits={habits.map(h => ({ _id: h._id, title: h.title }))}
          />
        </div>

        {/* Habits & Calendar Section (Col 2/3) */}
        <div className="lg:col-span-2 space-y-8">
          <HabitSlider habits={habits} onHabitComplete={handleHabitComplete} />

          <h2 className="text-2xl font-bold mb-4 pt-4 text-gray-800 border-t border-indigo-100">Weekly Habit Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.slice(0, 2).map((habit) => (
              <HabitCalendar key={habit._id} habit={habit} />
            ))}
            {habits.length === 0 && (
                <p className="text-gray-500 italic w-full text-center py-4 col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    Add a habit to see your calendar progress here.
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}