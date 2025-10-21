// frontend/src/components/LogoutButton.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const logoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-4a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export default function LogoutButton({ className = "" }) {
  const { logout } = useContext(AuthContext);

  return (
    <button
      onClick={logout}
      className={`flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200 ${className}`}
    >
      {logoutIcon}
      Logout
    </button>
  );
}