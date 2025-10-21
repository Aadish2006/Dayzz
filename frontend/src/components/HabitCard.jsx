import React, { useState } from 'react';
import api from '../api/axios'; // Assuming this import

const checkmarkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function HabitCard({ habit, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isCompletedToday = habit.completedDates.some(dateStr => {
    const date = new Date(dateStr).toDateString();
    const today = new Date().toDateString();
    return date === today;
  });

  const handleComplete = async () => {
    if (isCompletedToday) return; // Already completed
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString();
      await api.post(`/habits/${habit._id}/complete`, { date: today });
      onComplete(habit._id, today); // Notify parent to update state
    } catch (err) {
      setError('Failed to mark habit complete.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-indigo-100 hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{habit.title}</h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            isCompletedToday
              ? 'bg-green-100 text-green-600'
              : 'bg-indigo-100 text-indigo-600'
          }`}
        >
          {habit.frequency}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Goal: {habit.goal} {habit.category ? `(${habit.category})` : ''}
      </p>
      <p className="text-sm text-gray-700 mt-3">Reward: {habit.reward || 'None'}</p>
      
      {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

      <button
        onClick={handleComplete}
        disabled={isCompletedToday || loading}
        className={`mt-4 w-full flex items-center justify-center p-2 rounded-lg text-white text-sm transition ${
          isCompletedToday
            ? 'bg-green-500 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? (
          'Processing...'
        ) : isCompletedToday ? (
          <>
            {checkmarkIcon}
            Completed Today
          </>
        ) : (
          'Mark Complete'
        )}
      </button>
    </div>
  );
}