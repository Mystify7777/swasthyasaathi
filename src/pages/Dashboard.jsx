import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { getPatients } from "../services/patientService";
import { getMedicines } from "../services/inventoryService";

export default function Dashboard() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    patients: 0,
    dueVaccinations: 0,
    overdueVaccinations: 0,
    lowStockMedicines: 0,
  });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    const patients = await getPatients();

    const medicines = await getMedicines();

    const today = new Date();

    const dueVaccinations = patients.filter((p) => {

      if (!p.nextVaccinationDate) return false;

      return (
        new Date(
          p.nextVaccinationDate
        ).toDateString() ===
        today.toDateString()
      );
    });

    const overdueVaccinations =
      patients.filter((p) => {

        if (!p.nextVaccinationDate)
          return false;

        return (
          new Date(
            p.nextVaccinationDate
          ) < today
        );
      });

    const lowStockMedicines =
      medicines.filter(
        (m) => Number(m.quantity) < 10
      );

    setStats({
      patients: patients.length,
      dueVaccinations:
        dueVaccinations.length,
      overdueVaccinations:
        overdueVaccinations.length,
      lowStockMedicines:
        lowStockMedicines.length,
    });
  };

  const handleLogout = async () => {

    await logout();

    navigate("/");
  };

  const cards = [
    {
      title: "Patients",
      value: stats.patients,
      color: "bg-blue-500",
      path: "/patients",
    },
    {
      title: "Due Today",
      value: stats.dueVaccinations,
      color: "bg-yellow-500",
      path: "/reminders",
    },
    {
      title: "Overdue",
      value: stats.overdueVaccinations,
      color: "bg-red-500",
      path: "/reminders",
    },
    {
      title: "Low Stock Medicines",
      value: stats.lowStockMedicines,
      color: "bg-purple-500",
      path: "/inventory",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((card) => (

            <div
              key={card.title}
              onClick={() => navigate(card.path)}
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