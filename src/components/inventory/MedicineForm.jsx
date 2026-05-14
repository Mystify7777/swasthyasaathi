import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  addMedicine,
  updateMedicine,
} from "../../services/inventoryService";

export default function MedicineForm({

  refreshMedicines,
  editingMedicine,
  clearEdit,

}) {

  const initialState = {
    medicineName: "",
    quantity: "",
    expiryDate: "",
  };

  const [formData, setFormData] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (editingMedicine) {
      setFormData(editingMedicine);
    } else {
      setFormData(initialState);
    }

  }, [editingMedicine]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (editingMedicine) {

        await updateMedicine(
          editingMedicine.id,
          formData
        );

        toast.success("Medicine updated");

        clearEdit();

      } else {

        await addMedicine({
          ...formData,
          createdAt: new Date(),
        });

        toast.success("Medicine added");
      }

      setFormData(initialState);

      refreshMedicines();

    } catch (error) {

      console.error(error);

      toast.error("Operation failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-purple-700">

          {editingMedicine
            ? "Edit Medicine"
            : "Add Medicine"}

        </h2>

        {editingMedicine && (

          <button
            type="button"
            onClick={clearEdit}
            className="text-red-500"
          >
            Cancel
          </button>

        )}

      </div>

      <input
        type="text"
        name="medicineName"
        placeholder="Medicine Name"
        value={formData.medicineName}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="date"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-700 text-white py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : editingMedicine
          ? "Update Medicine"
          : "Add Medicine"}
      </button>

    </form>
  );
}
