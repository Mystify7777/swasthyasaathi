export default function PatientCard({

  patient,
  onDelete,
  onEdit,

}) {

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">

      <div className="flex items-center justify-between">

        <h3 className="text-xl font-bold text-blue-700">
          {patient.name}
        </h3>

        <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          {patient.vaccinationStatus}
        </span>

      </div>

      <div className="space-y-1 text-gray-600">

        <p>
          <strong>Age:</strong> {patient.age}
        </p>

        <p>
          <strong>Village:</strong> {patient.village}
        </p>

        <p>
          <strong>Phone:</strong> {patient.phone}
        </p>

        <p>
          <strong>Vaccination:</strong>{" "}
          {patient.nextVaccinationDate || "N/A"}
        </p>

      </div>

      <div className="flex gap-3 pt-3">

        <button
          onClick={() => onEdit(patient)}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(patient.id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}
