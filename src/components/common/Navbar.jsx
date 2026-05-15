import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import InstallPrompt from "./InstallPrompt";

export default function Navbar() {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {

    await logout();

    navigate("/");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Patients",
      path: "/patients",
    },
    {
      label: "Reminders",
      path: "/reminders",
    },
    {
      label: "Inventory",
      path: "/inventory",
    },
  ];

  return (

    <nav className="bg-white shadow-sm px-6 py-4 flex flex-wrap items-center justify-between gap-4">

      <h1 className="text-2xl font-bold text-blue-700">
        SwasthyaSaathi
      </h1>

      <div className="flex flex-wrap items-center gap-3">

        {navItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {item.label}
          </NavLink>

        ))}

        <InstallPrompt />

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}
