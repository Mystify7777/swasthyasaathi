import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import PatientForm from "../components/patients/PatientForm";
import PatientList from "../components/patients/PatientList";
import Navbar from "../components/common/Navbar";

import {
  getPatients,
  deletePatient,
} from "../services/patientService";

export default function Patients() {

  const { user } = useAuth();

  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [editingPatient, setEditingPatient] =
    useState(null);

  const fetchPatients = async () => {

    if (!user) return;

    try {

      const data = await getPatients(user.uid);

      setPatients(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to fetch patients");
    }
  };

  useEffect(() => {

    fetchPatients();

  }, [user]);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {

      await deletePatient(id);

      toast.success("Patient deleted");

      fetchPatients();

    } catch (error) {

      console.error(error);

      toast.error("Delete failed");
    }
  };

  const handleEdit = (patient) => {

    setEditingPatient(patient);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearEdit = () => {

    setEditingPatient(null);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (

    <>
      <Navbar />
      <Toaster />

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h1 className="text-3xl font-bold text-blue-700">
              Patients
            </h1>

            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-80"
            />

          </div>

          <PatientForm
            refreshPatients={fetchPatients}
            editingPatient={editingPatient}
            clearEdit={clearEdit}
          />

          <PatientList
            patients={filteredPatients}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

        </div>

      </div>
    </>
  );
}