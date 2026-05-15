import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useData } from "../context/useData";
import Navbar from "../components/common/Navbar";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

export default function Dashboard() {

  const {
    patients,
    medicines,
    refreshPatients,
    refreshMedicines,
    loading,
  } = useData();

  const navigate = useNavigate();

  useEffect(() => {

    if (patients.length === 0) {
      refreshPatients();
    }

    if (medicines.length === 0) {
      refreshMedicines();
    }

  }, [
    patients.length,
    medicines.length,
    refreshPatients,
    refreshMedicines,
  ]);

  useEffect(() => {

    const preloadRoutes = () => {
      import("./Patients");
      import("./Inventory");
    };

    const runOnIdle = () => {

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadRoutes);
      } else {
        preloadRoutes();
      }
    };

    const timeoutId = setTimeout(runOnIdle, 2000);

    return () => clearTimeout(timeoutId);

  }, []);

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

  const overdueVaccinations = patients.filter((p) => {

    if (!p.nextVaccinationDate) return false;

    return (
      new Date(
        p.nextVaccinationDate
      ) < today
    );
  });

  const lowStockMedicines = medicines.filter(
    (m) => Number(m.quantity) < 10
  );

  const stats = {
    patients: patients.length,
    dueVaccinations: dueVaccinations.length,
    overdueVaccinations: overdueVaccinations.length,
    lowStockMedicines: lowStockMedicines.length,
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

      <Navbar />

      <main className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          Dashboard
        </h2>

        {loading ? (

          <DashboardSkeleton />

        ) : (

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

        )}

      </main>

    </div>
  );
}