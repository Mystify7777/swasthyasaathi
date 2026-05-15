import {
  getVaccinationStatus,
} from "../../utils/dateUtils";

export default function PatientCard({

  patient,
  onDelete,
  onEdit,

}) {

  const status = getVaccinationStatus(
    patient.nextVaccinationDate
  );

  const isPregnant =
    Boolean(patient.pregnant ?? patient.pregnancyStatus);

  const statusClasses =
    status === "Overdue"
      ? "bg-red-100 text-red-700"
      : status === "Due Today"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">

      <div className="flex items-start justify-between gap-3">

        <h3 className="text-xl font-bold text-blue-700">
          {patient.name}
        </h3>

        <div className="flex gap-2 flex-wrap justify-end">

          {isPregnant && (

            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
              Pregnant
            </span>

          )}

          <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusClasses}`}>
            {status}
          </span>

        </div>

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
