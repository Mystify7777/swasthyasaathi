import MedicineCard from "./MedicineCard";
import CardSkeleton from "../skeletons/CardSkeleton";

export default function MedicineList({

  medicines,
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
