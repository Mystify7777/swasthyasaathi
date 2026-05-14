import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import MedicineForm from "../components/inventory/MedicineForm";
import MedicineList from "../components/inventory/MedicineList";

import {
  getMedicines,
  deleteMedicine,
} from "../services/inventoryService";

export default function Inventory() {

  const { user } = useAuth();

  const [medicines, setMedicines] =
    useState([]);

  const [editingMedicine, setEditingMedicine] =
    useState(null);

  const [search, setSearch] = useState("");

  const fetchMedicines = async () => {

    if (!user) return;

    try {

      const data = await getMedicines(user.uid);

      setMedicines(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to fetch medicines");
    }
  };

  useEffect(() => {

    fetchMedicines();

  }, [user]);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this medicine?"
    );

    if (!confirmDelete) return;

    try {

      await deleteMedicine(id);

      toast.success("Medicine deleted");

      fetchMedicines();

    } catch (error) {

      console.error(error);

      toast.error("Delete failed");
    }
  };

  const handleEdit = (medicine) => {

    setEditingMedicine(medicine);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearEdit = () => {

    setEditingMedicine(null);
  };

  const filteredMedicines =
    medicines.filter((medicine) =>
      medicine.medicineName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const lowStockCount = medicines.filter(
    (m) => Number(m.quantity) < 10
  ).length;

  const expiredCount = medicines.filter((m) => {

    return (
      new Date(m.expiryDate)
      < new Date()
    );
  }).length;

  return (

    <>
      <Navbar />
      <Toaster />

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h1 className="text-3xl font-bold text-purple-700">
              Medicine Inventory
            </h1>

            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-80"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-red-500 text-white p-5 rounded-2xl shadow-md">

              <h3 className="text-lg font-semibold">
                Low Stock Medicines
              </h3>

              <p className="text-4xl font-bold mt-3">
                {lowStockCount}
              </p>

            </div>

            <div className="bg-yellow-500 text-white p-5 rounded-2xl shadow-md">

              <h3 className="text-lg font-semibold">
                Expired Medicines
              </h3>

              <p className="text-4xl font-bold mt-3">
                {expiredCount}
              </p>

            </div>

          </div>

          <MedicineForm
            refreshMedicines={fetchMedicines}
            editingMedicine={editingMedicine}
            clearEdit={clearEdit}
          />

          <MedicineList
            medicines={filteredMedicines}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

        </div>

      </div>
    </>
  );
}
