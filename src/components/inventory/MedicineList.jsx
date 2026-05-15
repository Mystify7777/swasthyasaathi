import MedicineCard from "./MedicineCard";
import CardSkeleton from "../skeletons/CardSkeleton";

export default function MedicineList({

  medicines,
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

  if (medicines.length === 0) {

    const hasSearchQuery =
      searchQuery && searchQuery.trim().length > 0;

    return (

      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <h2 className="text-2xl font-bold text-purple-700">
          {hasSearchQuery
            ? "No Medicines Matched Your Search"
            : "No Medicines Added Yet"}
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">

          {hasSearchQuery
            ? "Try a different keyword or clear the search to see all medicines."
            : "Add medicine stock to monitor inventory, expiry dates, and low stock alerts."}

        </p>

        <div className="mt-6 text-5xl">
          {hasSearchQuery ? "🔎" : "💊"}
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Use the form above to get started.
        </p>

        {hasSearchQuery && (

          <p className="text-sm text-gray-400 mt-2">
            Use the search box above to try another medicine.
          </p>

        )}

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
