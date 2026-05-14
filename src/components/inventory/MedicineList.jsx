import MedicineCard from "./MedicineCard";

export default function MedicineList({

  medicines,
  onDelete,
  onEdit,

}) {

  if (medicines.length === 0) {

    return (
      <div className="text-center text-gray-500 py-10">
        No medicines found
      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {medicines.map((medicine) => (

        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </div>
  );
}
