import React from 'react';

// Helper function to generate the last 7 days (including today)
const getLast7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d,
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateString: d.toDateString(),
    });
  }
  return days.reverse();
};

export default function HabitCalendar({ habit }) {
  const last7Days = getLast7Days();

  // Convert completedDates to an array of date strings for quick lookup
  const completedDatesSet = new Set(
    habit.completedDates.map((d) => new Date(d).toDateString())
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-indigo-100">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        {habit.title} Progress (7 Days)
      </h3>
      <div className="flex justify-between space-x-2">
        {last7Days.map((day) => {
          const isCompleted = completedDatesSet.has(day.dateString);
          const isToday = day.dateString === new Date().toDateString();

          return (
            <div
              key={day.dateString}
              className={`flex flex-col items-center p-2 rounded-lg transition duration-200 ${
                isCompleted
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-gray-50 border border-gray-200'
              } ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
              title={isCompleted ? 'Completed' : 'Missed'}
            >
              <span className="text-xs font-medium text-gray-500">
                {day.day}
              </span>
              <span
                className={`w-6 h-6 mt-1 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                {isCompleted ? '✓' : '✗'}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 mt-3 text-center">
        Streak: <span className="font-semibold text-indigo-600">3 days</span> (Mock data)
      </p>
    </div>
  );
}