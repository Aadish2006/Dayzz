import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
      >
        Logout
      </button>
      <p className="mt-4 text-gray-600">
        🚧 Future sections will include Habit Tracker, Diary Editor, and AI Insights.
      </p>
    </div>
  );
}
