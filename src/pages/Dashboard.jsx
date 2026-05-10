import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {

    await logout();

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-1">
            Welcome, {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}