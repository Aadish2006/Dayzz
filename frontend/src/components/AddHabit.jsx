import React, { useState } from 'react';
import api from '../api/axios';

const frequencies = ['daily', 'weekly', 'monthly'];
const categories = ['health', 'finance', 'work', 'personal'];

export default function AddHabit({ onHabitAdded }) {
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    frequency: frequencies[0],
    goal: 1,
    reward: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await api.post('/habits', form);
      onHabitAdded(res.data); // Notify parent component
      setForm({
        title: '',
        category: categories[0],
        frequency: frequencies[0],
        goal: 1,
        reward: '',
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add habit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-indigo-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Habit</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Habit Title (e.g., Read for 30 min)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          value={form.title}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            {frequencies.map((f) => (
              <option key={f} value={f}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          name="goal"
          placeholder="Goal (e.g., 1 time/day)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          value={form.goal}
          onChange={handleChange}
          min="1"
        />
        <input
          type="text"
          name="reward"
          placeholder="Reward (e.g., A good night's sleep)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          value={form.reward}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Habit added successfully!</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Save Habit'}
        </button>
      </form>
    </div>
  );
}