import React from 'react';
import HabitCard from './HabitCard'; // Assuming HabitCard is imported

export default function HabitSlider({ habits, onHabitComplete }) {
  return (
    <div className="p-4 bg-white shadow-2xl rounded-2xl border border-indigo-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Active Habits</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-50">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div key={habit._id} className="min-w-[280px]">
              <HabitCard habit={habit} onComplete={onHabitComplete} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic w-full text-center py-4">
            No habits added yet. Start by adding one above!
          </p>
        )}
      </div>
      <style jsx>{`
        /* Custom scrollbar for better aesthetics, might need to install 'tailwind-scrollbar' plugin */
        /* You can replace this with a more universal solution if needed */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #a5b4fc #eef2ff;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #a5b4fc;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #eef2ff;
        }
      `}</style>
    </div>
  );
}