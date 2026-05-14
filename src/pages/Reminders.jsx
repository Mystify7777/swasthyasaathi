import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { getPatients } from "../services/patientService";

export default function Reminders() {

  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {

    try {

      const data = await getPatients();

      setPatients(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load reminders");
    }
  };

  useEffect(() => {

    fetchPatients();

  }, []);

  const today = new Date();

  const dueToday = patients.filter((patient) => {

    if (!patient.nextVaccinationDate) return false;

    const vaccineDate = new Date(
      patient.nextVaccinationDate
    );

    return (
      vaccineDate.toDateString() ===
      today.toDateString()
    );
  });

  const overdue = patients.filter((patient) => {

    if (!patient.nextVaccinationDate) return false;

    const vaccineDate = new Date(
      patient.nextVaccinationDate
    );

    return vaccineDate < today;
  });

  const upcoming = patients.filter((patient) => {

    if (!patient.nextVaccinationDate) return false;

    const vaccineDate = new Date(
      patient.nextVaccinationDate
    );

    return vaccineDate > today;
  });

  const renderPatientCard = (patient, color) => (

    <div
      key={patient.id}
      className={`p-5 rounded-2xl shadow-md text-white ${color}`}
    >

      <h3 className="text-xl font-bold">
        {patient.name}
      </h3>

      <div className="mt-3 space-y-1">

        <p>
          Village: {patient.village}
        </p>

        <p>
          Vaccine Date:{" "}
          {patient.nextVaccinationDate}
        </p>

      </div>

    </div>
  );

  return (

    <>
      <Toaster />

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto space-y-10">

          <h1 className="text-3xl font-bold text-blue-700">
            Vaccination Reminders
          </h1>

          <section>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Overdue Vaccinations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {overdue.length > 0
                ? overdue.map((patient) =>
                    renderPatientCard(
                      patient,
                      "bg-red-500"
                    )
                  )
                : (
                  <p className="text-gray-500">
                    No overdue vaccinations
                  </p>
                )}

            </div>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-yellow-600 mb-4">
              Due Today
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {dueToday.length > 0
                ? dueToday.map((patient) =>
                    renderPatientCard(
                      patient,
                      "bg-yellow-500"
                    )
                  )
                : (
                  <p className="text-gray-500">
                    No vaccinations due today
                  </p>
                )}

            </div>

          </section>

          <section>

            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Upcoming Vaccinations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {upcoming.length > 0
                ? upcoming.map((patient) =>
                    renderPatientCard(
                      patient,
                      "bg-green-500"
                    )
                  )
                : (
                  <p className="text-gray-500">
                    No upcoming vaccinations
                  </p>
                )}

            </div>

          </section>

        </div>

      </div>
    </>
  );
}
