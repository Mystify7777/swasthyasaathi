import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {

    await logout();

    navigate("/");
  };

const cards = [
  {
    title: "Patients",
    value: "120",
    color: "bg-blue-500",
    path: "/patients",
  },
  {
    title: "Vaccinations Due",
    value: "18",
    color: "bg-yellow-500",
  },
  {
    title: "Low Stock Medicines",
    value: "5",
    color: "bg-red-500",
  },
];

  return (

    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            SwasthyaSaathi
          </h1>

          <p className="text-gray-500 text-sm">
            Welcome, {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </header>

      <main className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {cards.map((card) => (

            <div
  key={card.title}
  onClick={() => card.path && navigate(card.path)}
  className={`${card.color} text-white p-6 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition`}
>
              <h3 className="text-lg font-semibold">
                {card.title}
              </h3>

              <p className="text-4xl font-bold mt-4">
                {card.value}
              </p>
            </div>

          ))}

        </div>

      </main>

    </div>
  );
}