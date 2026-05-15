import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import { validatePatient } from "../../utils/validators";

import {
  addPatient,
  updatePatient,
} from "../../services/patientService";

export default function PatientForm({

  refreshPatients,
  editingPatient,
  clearEdit,

}) {

  const { user } = useAuth();

  const initialState = {
    name: "",
    age: "",
    village: "",
    phone: "",
    pregnancyStatus: false,
    nextVaccinationDate: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (editingPatient) {
      setFormData(editingPatient);
    } else {
      setFormData(initialState);
    }

  }, [editingPatient]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : typeof value === "string"
        ? value.trimStart()
        : value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const sanitizedData = {
        ...formData,
        name: formData.name.trim(),
        village: formData.village.trim(),
        phone: formData.phone.trim(),
      };

      const validationError =
        validatePatient(sanitizedData);

      if (validationError) {

        toast.error(validationError);

        return;
      }

      setLoading(true);

      if (editingPatient) {

        await updatePatient(
          editingPatient.id,
          sanitizedData
        );

        toast.success("Patient updated");

        clearEdit();

      } else {

        await addPatient({
          ...sanitizedData,
          userId: user.uid,
          createdAt: new Date(),
        });

        toast.success("Patient added");
      }

      setFormData(initialState);

      refreshPatients();

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

        <h2 className="text-2xl font-bold text-blue-700">

          {editingPatient
            ? "Edit Patient"
            : "Add Patient"}

        </h2>

        {editingPatient && (

          <button
            type="button"
            onClick={clearEdit}
            className="text-red-500 font-medium"
          >
            Cancel
          </button>

        )}

      </div>

      <input
        type="text"
        maxLength={50}
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
        min="0"
        max="120"
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
        type="tel"
        inputMode="numeric"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        maxLength={10}
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

        Patient is pregnant

      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : editingPatient
          ? "Update Patient"
          : "Add Patient"}
      </button>

    </form>
  );
}