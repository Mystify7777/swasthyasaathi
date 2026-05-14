import { useState } from "react";

import toast from "react-hot-toast";

import { addPatient } from "../../services/patientService";

export default function PatientForm({ refreshPatients }) {

  const initialState = {
    name: "",
    age: "",
    village: "",
    phone: "",
    pregnancyStatus: false,
    vaccinationStatus: "Pending",
    nextVaccinationDate: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await addPatient({
        ...formData,
        createdAt: new Date(),
      });

      toast.success("Patient added successfully");

      setFormData(initialState);

      refreshPatients();

    } catch (error) {

      console.error(error);

      toast.error("Failed to add patient");

    } finally {

      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >

      <h2 className="text-2xl font-bold text-blue-700">
        Add Patient
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="text"
        name="village"
        placeholder="Village"
        value={formData.village}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="date"
        name="nextVaccinationDate"
        value={formData.nextVaccinationDate}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          name="pregnancyStatus"
          checked={formData.pregnancyStatus}
          onChange={handleChange}
        />

        Pregnant

      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
      >
        {loading ? "Saving..." : "Add Patient"}
      </button>

    </form>
  );
}
