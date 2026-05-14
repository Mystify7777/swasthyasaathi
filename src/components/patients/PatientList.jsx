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

    return (
      <div className="text-center text-gray-500 py-10">
        No patients found
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
