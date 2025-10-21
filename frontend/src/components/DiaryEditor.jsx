import React, { useState } from 'react';
import api from '../api/axios';

const moods = ['😊 Happy', '😐 Neutral', '😔 Sad', '😡 Angry', '🧘 Calm'];
const todayDate = new Date().toISOString().split('T')[0];

export default function DiaryEditor({ onEntrySaved, availableHabits = [] }) {
  const [form, setForm] = useState({
    date: todayDate,
    content: '',
    mood: moods[0],
    relatedHabits: [], // Use habit IDs from availableHabits
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
    setError('');
  };

  const handleHabitToggle = (habitId) => {
    setForm((prev) => ({
      ...prev,
      relatedHabits: prev.relatedHabits.includes(habitId)
        ? prev.relatedHabits.filter((id) => id !== habitId)
        : [...prev.relatedHabits, habitId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await api.post('/diary', form);
      onEntrySaved(res.data); // Notify parent
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save diary entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-indigo-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Daily Diary</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          >
            {moods.map((m) => (
              <option key={m} value={m.split(' ')[1]}>
                {m}
              </option>
            ))}
          </select>
        </div>
        
        <textarea
          name="content"
          placeholder="What's on your mind today?"
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-indigo-500 focus:border-indigo-500"
          value={form.content}
          onChange={handleChange}
          required
        />

        {availableHabits.length > 0 && (
          <div className="pt-2">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Relate Habits:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableHabits.map((habit) => (
                <span
                  key={habit._id}
                  onClick={() => handleHabitToggle(habit._id)}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer transition ${
                    form.relatedHabits.includes(habit._id)
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {habit.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Diary entry saved!</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}