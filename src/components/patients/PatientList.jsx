import PatientCard from "./PatientCard";
import CardSkeleton from "../skeletons/CardSkeleton";

export default function PatientList({

  patients,
  loading,
  onDelete,
  onEdit,

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

      searchQuery,
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <h2 className="text-2xl font-bold text-blue-700">
          No Patients Added Yet
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">

          Start by adding patient records to track
          vaccinations, reminders, and healthcare follow-ups.

        </p>
        const hasSearchQuery = searchQuery && searchQuery.trim().length > 0;

        <div className="mt-6 text-5xl">
          👩‍⚕️
              {hasSearchQuery
                ? "No Patients Matched Your Search"
                : "No Patients Added Yet"}

      </div>
              {hasSearchQuery
                ? "Try a different keyword or clear the search to see all patient records."
                : "Start by adding patient records to track vaccinations, reminders, and healthcare follow-ups."}

  return (
              {hasSearchQuery ? "🔎" : "👩‍⚕️"}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-sm text-gray-400 mt-4">
              Use the form above to get started.
            </p>
            {hasSearchQuery && (
              <p className="text-sm text-gray-400 mt-2">
                Use the search box above to try another name.
              </p>
            )}

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
