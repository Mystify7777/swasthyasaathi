import PatientCard from "./PatientCard";

export default function PatientList({

  patients,
  onDelete,
  onEdit,

}) {

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
