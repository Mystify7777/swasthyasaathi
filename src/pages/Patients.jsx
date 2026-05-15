import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { useData } from "../context/useData";
import PatientForm from "../components/patients/PatientForm";
import PatientList from "../components/patients/PatientList";
import Navbar from "../components/common/Navbar";
import ConfirmModal from "../components/common/ConfirmModal";

import {
  deletePatient,
} from "../services/patientService";

export default function Patients() {

  const {
    patients,
    loading,
    refreshPatients,
  } = useData();

  const [search, setSearch] = useState("");

  const [editingPatient, setEditingPatient] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState(null);

  useEffect(() => {

    if (patients.length === 0) {
      refreshPatients();
    }

  }, []);

  const handleDeleteClick =
    (patient) => {

      setSelectedPatient(patient);

      setShowDeleteModal(true);
    };

  const confirmDelete =
    async () => {

      if (!selectedPatient) return;

      try {

        await deletePatient(
          selectedPatient.id
        );

        toast.success(
          "Patient deleted successfully"
        );

        refreshPatients();

      } catch (error) {

        toast.error(
          "Failed to delete patient"
        );

      } finally {

        setShowDeleteModal(false);

        setSelectedPatient(null);
      }
    };

  const cancelDelete = () => {

    setShowDeleteModal(false);

    setSelectedPatient(null);
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
            refreshPatients={refreshPatients}
            editingPatient={editingPatient}
            clearEdit={clearEdit}
          />

          <PatientList
            patients={filteredPatients}
            loading={loading}
            onDelete={handleDeleteClick}
            onEdit={handleEdit}
            searchQuery={search}
          />

        </div>

      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Patient?"
        message={`This will permanently remove ${selectedPatient?.name || "this patient"} and related follow-up data from your list.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

    </>
  );
}