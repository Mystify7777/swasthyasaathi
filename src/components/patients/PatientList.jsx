import PatientCard from "./PatientCard";
import CardSkeleton from "../skeletons/CardSkeleton";

export default function PatientList({

  patients,
  loading,
  onDelete,
  onEdit,
  searchQuery,

}) {

  if (loading) {

    return (

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {[1,2,3,4].map((item) => (
          <CardSkeleton key={item} />
        ))}

      </div>
    );
  }

  if (patients.length === 0) {

    const hasSearchQuery =
      searchQuery && searchQuery.trim().length > 0;

    return (

      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <h2 className="text-2xl font-bold text-blue-700">
          {hasSearchQuery
            ? "No Patients Matched Your Search"
            : "No Patients Added Yet"}
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          {hasSearchQuery
            ? "Try a different keyword or clear the search to see all patient records."
            : "Start by adding patient records to track vaccinations, reminders, and healthcare follow-ups."}
        </p>

        <div className="mt-6 text-5xl">
          {hasSearchQuery ? "🔎" : "👩‍⚕️"}
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Use the form above to get started.
        </p>

      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {patients.map((patient) => (

        <PatientCard
          key={patient.id}
          patient={patient}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </div>
  );
}
